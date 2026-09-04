/**
 * 从 DictionaryByGPT4 的 gptwords.json（NDJSON，每行 {word, content}）
 * 提取词根/词缀/词义分析/例句等结构化数据。
 *
 * 用法：node extract-gpt4-dictionary.js
 * 输入：gptwords.json（同目录）
 * 输出：dictionary_gpt4.json
 *
 * content 是 GPT 生成的 Markdown，小节标题格式很不统一（约 8% 是变体），
 * 所以解析策略是"逐行识别标签"而不是死板匹配：
 *   1. 每行先剥掉 ### / ** / "1." 之类的前缀装饰
 *   2. 剩下的短文本（≤15 字符）命中标签词表 → 开启新小节
 *   3. 未命中 → 追加到当前小节
 */

const fs = require('fs');
const path = require('path');

// 标签词表：正则 → 规范字段名（先匹配先赢，组合标签排前面）
const LABELS = [
  ['root+affix', /词根.{0,4}词缀|词缀.{0,4}词根|词根\/?词缀|词根词缀/],
  ['meaning', /分析词义|词义分析|词义解析|词义解释|单词分析|单词解析|单词意义|单词释义|^词义$|Meaning/i],
  ['examples', /列举例句|例句|举例|例子|示例|Example/i],
  ['root', /词根|词源/],
  ['affix', /词缀/],
  ['history', /历史|文化背景|词源分析/],
  ['forms', /变形|形变|形态|词形|衍生|Inflection|Transformation/i],
  ['memory', /记忆|助记|忆辅助|Memory/i],
  ['story', /故事/],
];
// history 排在 forms 后是为了让"发展历史和文化背景"先被 history 抓走；
// 但"单词变形和固定搭配"不含"历史"，不受影响。

/** 剥掉一行开头的 Markdown 装饰：### / # / ** / 1. / 1、 等 */
function stripDecorations(line) {
  return line
    .replace(/^\s*#{1,6}\s*/, '')    // ### 标题
    .replace(/^\s*\*{1,2}\s*/, '')   // ** 加粗
    .replace(/^\s*\d{1,2}\\?[.、)]\s*/, '') // 1. / 1、 / 1) 编号
    .replace(/\*{1,2}\s*$/, '')      // 尾部 **
    .trim();
}

/** 识别一行是不是小节标题；是则返回字段名（+同行正文），否则返回 null */
function matchLabel(line) {
  const clean = stripDecorations(line);
  if (!clean || clean.length > 30) return null; // 太长的一定是正文

  // 形如"词根分析："或"词根分析：xxx"——标签部分在冒号前
  const colonSplit = clean.split(/[:：]/);
  const head = (colonSplit[0] || '').trim();
  const rest = colonSplit.length > 1 ? colonSplit.slice(1).join('：').trim() : null;

  for (const [field, re] of LABELS) {
    // 冒号前是标签（≤15 字），或整行就是标签
    if ((head.length <= 15 && re.test(head)) || (clean.length <= 15 && re.test(clean))) {
      return { field, rest };
    }
  }
  return null;
}

/** 把 content 切成 {字段: 正文} 的映射 */
function splitSections(content) {
  const sections = { _pre: [] }; // 第一个标签之前的内容归入 _pre（通常就是词义）
  let current = '_pre';

  content.split('\n').forEach(line => {
    // 正文里出现的行内标签（不在行首）不处理，只认行首
    const m = matchLabel(line);
    if (m) {
      if (m.field === 'root+affix') {
        // 组合小节：词根和词缀共用同一段正文
        sections.root = sections.root || [];
        sections.affix = sections.affix || [];
        current = '__combined';
        sections.__combined = [];
        return;
      }
      if (m.field === 'story' || m.field === 'history') {
        // 小故事/文化背景不在输出结构里，单独收着（不丢数据，只是不输出）
        sections[m.field] = sections[m.field] || [];
        current = m.field;
        return;
      }
      sections[m.field] = sections[m.field] || [];
      current = m.field;
      if (m.rest) sections[m.field].push(m.rest); // "词缀分析：无词缀"这种同行带正文
      return;
    }
    (sections[current] = sections[current] || []).push(line);
  });

  // 组合小节回填
  if (sections.__combined) {
    const text = sections.__combined.join('\n').trim();
    sections.root = (sections.root || []).concat(text ? [text] : []);
    sections.affix = (sections.affix || []).concat(text ? [text] : []);
    delete sections.__combined;
  }
  // 没有任何词义标签时，开头正文就当词义
  if (!sections.meaning) {
    sections.meaning = sections._pre;
    delete sections._pre;
  } else if ((sections._pre || []).join('').trim()) {
    sections.meaning = sections._pre.concat(sections.meaning);
  }
  return sections;
}

/** 压掉多余空行/空白 */
function cleanText(lines) {
  return (lines || []).join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

/** 从例句小节里抠出单条例句（支持 1. / 1、 / - / * 开头） */
function extractExamples(lines) {
  const text = (lines || []).join('\n');
  const out = [];
  text.split('\n').forEach(l => {
    const m = l.match(/^\s*(?:\d{1,2}\\?[.、)]|[-*])\s+(.+)/);
    if (m && /[a-zA-Z]/.test(m[1])) out.push(m[1].trim());
  });
  if (out.length) return out;
  // 兜底：按空行分段，取含英文的段
  return text.split(/\n{2,}/)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(p => p && /[a-zA-Z]/.test(p) && p.length < 500);
}

// ============ 主流程 ============

const raw = fs.readFileSync(path.join(__dirname, 'gptwords.json'), 'utf8');
const entries = raw.split('\n').filter(l => l.trim()).map(l => JSON.parse(l));

const result = [];
const seen = new Set();
let dupCount = 0;

entries.forEach(e => {
  const word = String(e.word || '').trim().toLowerCase();
  if (!word) return;
  if (seen.has(word)) { dupCount++; return; } // 去重，保留第一条
  seen.add(word);

  const sec = splitSections(e.content || '');
  result.push({
    word,
    meaning_analysis: cleanText(sec.meaning),
    root_analysis: cleanText(sec.root),
    prefix_suffix_analysis: cleanText(sec.affix),
    examples: extractExamples(sec.examples),
    word_forms: cleanText(sec.forms),
    memory_aid: cleanText(sec.memory)
  });
});

fs.writeFileSync(
  path.join(__dirname, 'dictionary_gpt4.json'),
  JSON.stringify(result, null, 2)
);

// ============ 统计 ============

const filled = (f) => result.filter(w => w[f] && (Array.isArray(w[f]) ? w[f].length : true)).length;
console.log('=== 统计 ===');
console.log('原始条目:', entries.length);
console.log('输出单词数(去重后):', result.length, '| 重复剔除:', dupCount);
console.log('有词义分析:', filled('meaning_analysis'));
console.log('有词根分析:', filled('root_analysis'));
console.log('有词缀分析:', filled('prefix_suffix_analysis'));
console.log('有例句:', filled('examples'));
console.log('有单词变形:', filled('word_forms'));
console.log('有记忆辅助:', filled('memory_aid'));
console.log('输出文件大小:', (fs.statSync(path.join(__dirname, 'dictionary_gpt4.json')).size / 1048576).toFixed(1) + 'MB');

console.log('\n=== 前 5 个单词的简化结构 ===');
console.log(JSON.stringify(result.slice(0, 5), null, 2));
