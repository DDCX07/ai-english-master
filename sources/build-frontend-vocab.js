/**
 * 把 cet4_final.json / cet6_final.json 构建成前端词库文件
 * frontend/js/data/vocabulary-data.js。
 *
 * 结构与旧版兼容：vocabularyData = { cet4: [...], cet6: [...] }，
 * 但词条字段升级为新 9 字段格式（word/phonetic/meanings/root/
 * synonyms/examples/word_forms/memory_aid），level 由所属数组决定不再重复存。
 *
 * 用法：node build-frontend-vocab.js
 */

const fs = require('fs');
const path = require('path');
const DIR = __dirname;

const slim = e => ({
  word: e.word,
  phonetic: e.phonetic || '',
  meanings: e.meanings || [],
  root: e.root || '',
  synonyms: e.synonyms || [],
  examples: e.examples || [],
  word_forms: e.word_forms || '',
  memory_aid: e.memory_aid || ''
});

const cet4 = JSON.parse(fs.readFileSync(path.join(DIR, 'cet4_final.json'), 'utf8')).map(slim);
const cet6 = JSON.parse(fs.readFileSync(path.join(DIR, 'cet6_final.json'), 'utf8')).map(slim);

const out = `/**
 * 单词数据（新版·结构化词库）
 *
 * 来源（构建脚本 sources/build-frontend-vocab.js 生成，勿手改）：
 *   - 词表基准：CET-4 词汇表 docx / 六级带音标 PDF（${cet4.length} / ${cet6.length} 词）
 *   - 词根词缀/词义分析/记忆辅助/变形：DictionaryByGPT4（GitHub 开源）
 *   - 音标/近义词/短语例句：KyleBing/english-vocabulary（有道导出）
 *   - 兜底：旧版词库释义与音标
 *
 * 词条字段：
 *   word        单词（小写）
 *   phonetic    音标
 *   meanings    释义数组
 *   root        词根词缀解析（【词根】/【词缀】分段）
 *   synonyms    近义词数组
 *   examples    例句数组（英文（中文翻译）格式）
 *   word_forms  单词变形说明
 *   memory_aid  记忆辅助
 */

const vocabularyData = {
  cet4: ${JSON.stringify(cet4)},
  cet6: ${JSON.stringify(cet6)}
};
`;

const target = path.join(DIR, '../frontend/js/data/vocabulary-data.js');
fs.writeFileSync(target, out);
console.log('已生成', target);
console.log('cet4:', cet4.length, '词 | cet6:', cet6.length, '词 | 文件大小:',
  (fs.statSync(target).size / 1048576).toFixed(1) + 'MB');
