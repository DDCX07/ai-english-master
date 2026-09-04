/**
 * 把三批人工/AI 补全的数据（batch_1/2/3.json）填进最终词库的空词条。
 *
 * cet4_final.json / cet6_final.json 里"两源都未匹配"的词
 * 表现为 phonetic === null && meanings 为空——用批次数据补齐，
 * level 以目标文件为准（同一词在四六级批次里都有时按目标级别覆盖）。
 *
 * 用法：node fill-missing.js
 */

const fs = require('fs');
const path = require('path');
const DIR = __dirname;

// 批次 → {word: entry}（后批不覆盖前批）
const fillDict = {};
for (const f of ['batch_1.json', 'batch_2.json', 'batch_3.json']) {
  JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'))
    .forEach(e => { if (!fillDict[e.word]) fillDict[e.word] = e; });
}
console.log('补全数据共', Object.keys(fillDict).length, '个词');

[['cet4_final.json', 'CET-4'], ['cet6_final.json', 'CET-6']].forEach(([file, level]) => {
  const data = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  let filled = 0, stillBare = [];
  const bare = [];

  data.forEach(e => {
    if (e.phonetic === null && (!e.meanings || !e.meanings.length)) {
      const f = fillDict[e.word];
      if (f) {
        e.phonetic = f.phonetic || null;
        e.meanings = f.meanings || [];
        e.root = f.root || null;
        e.synonyms = f.synonyms || [];
        e.examples = f.examples || [];
        filled++;
      } else {
        stillBare.push(e.word);
      }
      bare.push(e.word);
    }
  });

  fs.writeFileSync(path.join(DIR, file), JSON.stringify(data, null, 2));
  console.log('=== ' + level + ' ===');
  console.log('空词条:', bare.length, '| 已补全:', filled, '| 仍缺失:', stillBare.length,
    stillBare.length ? '→ ' + stillBare.join(', ') : '');
});
