/**
 * 最终兜底：用旧词库 vocabulary-data.js 补齐新词库的残余空缺。
 *
 * 前两层（GPT4/KyleBing/手工批次）都填不上的字段：
 *   - 释义：旧库每个词都有 meaning（四级/六级都全）
 *   - 音标：旧库六级表 5523 词全带 phonetic，且涵盖四级词（完整大纲）
 *
 * 用法：node fill-from-old.js
 */

const fs = require('fs');
const path = require('path');
const DIR = __dirname;

// 旧词库 → {word: {phonetic, meaning}}（六级条目优先，带音标）
const src = fs.readFileSync(path.join(DIR, '../frontend/js/data/vocabulary-data.js'), 'utf8');
const old = new Function(src + '; return vocabularyData;')();
const oldDict = {};
[...(old.cet4 || []), ...(old.cet6 || [])].forEach(e => {
  const k = String(e.word).trim().toLowerCase();
  if (!oldDict[k]) oldDict[k] = e;
});
// cet6 条目带音标，覆盖 cet4 同词占位
(old.cet6 || []).forEach(e => { oldDict[String(e.word).trim().toLowerCase()] = e; });

['cet4_final.json', 'cet6_final.json'].forEach(file => {
  const data = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  let fillPhon = 0, fillMean = 0;

  data.forEach(e => {
    const o = oldDict[e.word];
    if (!o) return;
    if (e.phonetic == null && o.phonetic) { e.phonetic = o.phonetic; fillPhon++; }
    if ((!e.meanings || !e.meanings.length) && o.meaning) {
      // 旧释义是一整串（含词性前缀），按 n./v./adj./adv. 等切分成数组
      const parts = String(o.meaning)
        .split(/(?=[n|v|a|ad]{1,3}\.\s)/)
        .map(s => s.trim())
        .filter(Boolean);
      e.meanings = parts.length > 1 ? parts : [String(o.meaning).trim()];
      fillMean++;
    }
  });

  fs.writeFileSync(path.join(DIR, file), JSON.stringify(data, null, 2));
  console.log(file, '→ 补音标:', fillPhon, '| 补释义:', fillMean);
});
