/**
 * 从 KyleBing/english-vocabulary 的 full_line_jsonl（有道词典导出格式）
 * 提取四六级单词的音标/释义/近义词/例句/短语。
 *
 * 用法：node extract-kyle-vocab.js
 * 输入：kyle_cet4_raw.jsonl / kyle_cet6_raw.jsonl（同目录）
 * 输出：kyle_cet4.json  / kyle_cet6.json
 *
 * 源数据结构（NDJSON，每行一条）：
 *   headWord                          单词
 *   content.word.content.ukphone      英式音标
 *   content.word.content.usphone      美式音标
 *   content.word.content.trans[]      释义 [{pos, tranCn}]
 *   content.word.content.syno.synos[] 近义词 [{pos, tran, hwds:[{w}]}]
 *   content.word.content.sentence     普通例句 [{sContent, sCn}]
 *   content.word.content.phrase       短语 [{pContent, pCn}]
 * 源里还有但本脚本未提取（备用）：realExamSentence 真题例句、
 * exam 真题选择题、remMethod 记忆法、relWord 同根词。
 */

const fs = require('fs');
const path = require('path');

/** 单个文件 → 简化结构数组 */
function extract(file) {
  const lines = fs.readFileSync(path.join(__dirname, file), 'utf8')
    .split('\n').filter(l => l.trim());

  const out = [];

  lines.forEach(l => {
    const e = JSON.parse(l);
    const word = String(e.headWord || '').trim().toLowerCase();
    if (!word) return;

    const c = (e.content && e.content.word && e.content.word.content) || {};

    // 释义：trans[] 的 tranCn
    const meanings = (c.trans || [])
      .map(t => (t.tranCn || '').trim())
      .filter(Boolean);

    // 近义词：所有词性下的 hwds 拍平 + 去重
    const synonyms = [];
    const synSeen = new Set();
    (((c.syno || {}).synos) || []).forEach(s =>
      (s.hwds || []).forEach(h => {
        const w = (h.w || '').trim().toLowerCase();
        if (w && w !== word && !synSeen.has(w)) { synSeen.add(w); synonyms.push(w); }
      }));

    // 例句：sContent（sCn）——中文翻译跟在括号里
    const examples = ((((c.sentence || {}).sentences) || [])
      .map(s => {
        const en = (s.sContent || '').trim();
        const cn = (s.sCn || '').trim();
        if (!en) return null;
        return cn ? en + '（' + cn + '）' : en;
      }))
      .filter(Boolean);

    // 短语：pContent（pCn）
    const phrases = ((((c.phrase || {}).phrases) || [])
      .map(p => {
        const en = (p.pContent || '').trim();
        const cn = (p.pCn || '').trim();
        if (!en) return null;
        return cn ? en + '（' + cn + '）' : en;
      }))
      .filter(Boolean);

    out.push({
      word,
      phonetic_uk: (c.ukphone || '').trim(),
      phonetic_us: (c.usphone || '').trim(),
      meanings,
      synonyms,
      examples,
      phrases
    });
  });

  // 同词多册：内容最丰富的一条胜出（例句/短语/近义词越多分越高，音标释义保底加分）
  const richness = e =>
    e.meanings.length * 2 + e.synonyms.length + e.examples.length + e.phrases.length
    + (e.phonetic_uk ? 1 : 0) + (e.phonetic_us ? 1 : 0);
  const best = new Map();
  let dup = 0;
  out.forEach(e => {
    const prev = best.get(e.word);
    if (!prev) { best.set(e.word, e); return; }
    dup++;
    if (richness(e) > richness(prev)) best.set(e.word, e);
  });

  return { list: [...best.values()], raw: lines.length, dup };
}

// ============ 主流程 ============

[['kyle_cet4_raw.jsonl', 'kyle_cet4.json', 'CET-4'],
 ['kyle_cet6_raw.jsonl', 'kyle_cet6.json', 'CET-6']].forEach(([inFile, outFile, label]) => {
  const { list, raw, dup } = extract(inFile);
  fs.writeFileSync(path.join(__dirname, outFile), JSON.stringify(list, null, 2));

  const filled = f => list.filter(w => Array.isArray(w[f]) ? w[f].length : w[f]).length;
  console.log('=== ' + label + ' ===');
  console.log('原始行数:', raw, '| 输出词数(去重后):', list.length, '| 剔除重复:', dup);
  console.log('有英式音标:', filled('phonetic_uk'), '| 有美式音标:', filled('phonetic_us'));
  console.log('有释义:', filled('meanings'), '| 有近义词:', filled('synonyms'),
    '| 有例句:', filled('examples'), '| 有短语:', filled('phrases'));
  console.log('文件大小:', (fs.statSync(path.join(__dirname, outFile)).size / 1048576).toFixed(1) + 'MB');
  console.log('--- 前 3 个单词简化结构 ---');
  console.log(JSON.stringify(list.slice(0, 3), null, 2));
  console.log();
});
