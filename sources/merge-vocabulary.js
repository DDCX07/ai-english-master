/**
 * 指令三：三份数据合并，生成最终词库
 *
 * 以用户自己的单词表为主键（cet4_words.txt / cet6_words.txt，每行一个单词），
 * 从 DictionaryByGPT4（dictionary_gpt4.json：词根词缀/词义分析/例句/记忆辅助）
 * 和 KyleBing（kyle_cet4.json / kyle_cet6.json：音标/释义/近义词/例句/短语）
 * 匹配补充，输出 cet4_final.json / cet6_final.json。
 *
 * 用法：node merge-vocabulary.js（单词表放到本目录后运行）
 *
 * 字段合并规则：
 *   word        用户词表原文（小写）
 *   level       CET-4 / CET-6
 *   phonetic    KyleBing 音标，英式优先、美式兜底，统一包上 / /
 *   meanings    KyleBing 释义列表（GPT4 的词义分析是整段散文，不适合做列表）
 *   root        GPT4 词根+词缀分析合并（【词根】/【词缀】分段）
 *   synonyms    KyleBing 近义词
 *   examples    两个源的例句合并去重（GPT4 在前，KyleBing 在后）
 *   word_forms  GPT4 单词变形
 *   memory_aid  GPT4 记忆辅助
 * 某个源没匹配上 → 该源负责的字段为 null / []
 */

const fs = require('fs');
const path = require('path');
const DIR = __dirname;

/** 读单词表：每行一个单词，去空行/注释/首尾空白，去重保序 */
function readWordList(file) {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const seen = new Set();
  const list = [];
  raw.split('\n').forEach(l => {
    const w = l.trim().toLowerCase();
    if (!w || w.startsWith('#')) return;
    if (!seen.has(w)) { seen.add(w); list.push(w); }
  });
  return list;
}

/** JSON 数组 → {word: entry} 字典 */
function toDict(file) {
  const arr = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  const dict = {};
  arr.forEach(e => { dict[e.word.toLowerCase()] = e; });
  return dict;
}

/** GPT4 的词根+词缀两段合并成一段 */
function mergeRoot(gpt) {
  if (!gpt) return null;
  const parts = [];
  if (gpt.root_analysis) parts.push('【词根】' + gpt.root_analysis);
  if (gpt.prefix_suffix_analysis) parts.push('【词缀】' + gpt.prefix_suffix_analysis);
  return parts.length ? parts.join('\n\n') : null;
}

/** 两个源的例句合并去重 */
function mergeExamples(gpt, kyle) {
  const out = [];
  const seen = new Set();
  [...((gpt && gpt.examples) || []), ...((kyle && kyle.examples) || [])].forEach(ex => {
    const t = String(ex).trim();
    if (t && !seen.has(t)) { seen.add(t); out.push(t); }
  });
  return out;
}

/** 合并一个单词 */
function buildEntry(word, level, gpt, kyle) {
  const phone = kyle ? (kyle.phonetic_uk || kyle.phonetic_us || '') : '';
  return {
    word,
    level,
    phonetic: phone ? '/' + phone + '/' : null,
    meanings: kyle && kyle.meanings.length ? kyle.meanings : [],
    root: mergeRoot(gpt),
    synonyms: kyle && kyle.synonyms.length ? kyle.synonyms : [],
    examples: mergeExamples(gpt, kyle),
    word_forms: gpt && gpt.word_forms ? gpt.word_forms : null,
    memory_aid: gpt && gpt.memory_aid ? gpt.memory_aid : null
  };
}

function run(listFile, kyleFile, level, outFile, kyleFallbackFile) {
  const words = readWordList(listFile);
  const gptDict = toDict('dictionary_gpt4.json');
  const kyleDict = toDict(kyleFile);
  // 兜底字典（如六级的未匹配词回退查四级表；本级表优先）
  const kyleFallback = kyleFallbackFile ? toDict(kyleFallbackFile) : null;

  let hitGpt = 0, hitKyle = 0, hitByFallback = 0, hitBoth = 0, hitNone = 0;
  const missGpt = [], missKyle = [], missAll = [];
  const result = [];

  words.forEach(w => {
    const gpt = gptDict[w] || null;
    let kyle = kyleDict[w] || null;
    if (!kyle && kyleFallback && kyleFallback[w]) {
      kyle = kyleFallback[w];  // 本级表没有 → 回退表补（音标/近义词等）
      hitByFallback++;
    }
    if (gpt) hitGpt++; else missGpt.push(w);
    if (kyle) hitKyle++; else missKyle.push(w);
    if (gpt && kyle) hitBoth++;
    if (!gpt && !kyle) { hitNone++; missAll.push(w); }
    result.push(buildEntry(w, level, gpt, kyle));
  });

  fs.writeFileSync(path.join(DIR, outFile), JSON.stringify(result, null, 2));

  console.log('=== ' + level + ' → ' + outFile + ' ===');
  console.log('总单词数:', words.length);
  console.log('匹配到 GPT4:', hitGpt, '| 匹配到 KyleBing(含回退):', hitKyle,
    kyleFallbackFile ? '（其中 ' + hitByFallback + ' 个由四级表回退补齐）' : '');
  console.log('两个都匹配:', hitBoth, '| 都没匹配:', hitNone);
  const show = (name, arr) => {
    console.log(name + '（' + arr.length + ' 个）' + (arr.length > 50 ? '，仅列前 50：' : '：'));
    console.log(arr.length ? '  ' + arr.slice(0, 50).join(', ') : '  （无）');
  };
  show('GPT4 未匹配', missGpt);
  show('KyleBing 未匹配', missKyle);
  show('两边都未匹配', missAll);
  console.log();
}

run('cet4_words.txt', 'kyle_cet4.json', 'CET-4', 'cet4_final.json');
// 六级：本级表查不到的词回退查四级表（六级词表传统上包含四级基础词）
run('cet6_words.txt', 'kyle_cet6.json', 'CET-6', 'cet6_final.json', 'kyle_cet4.json');
