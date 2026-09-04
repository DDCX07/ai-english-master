/**
 * 本地测试：抓取链路（列表页 → 正文提取 → 按级别选篇截断）
 * 用法：cd worker && node test-scrape.mjs [level]
 * 只测抓取，不调智谱、不花钱。
 */
import { LEVELS, pickArticleForLevel } from './src/index.js';

const levels = process.argv[2] ? [parseInt(process.argv[2], 10)] : [1, 2, 3];

for (const level of levels) {
  const cfg = LEVELS[level];
  console.log(`\n===== Level ${level} (${cfg.label}) ← ${cfg.section} =====`);
  const t0 = Date.now();
  try {
    const a = await pickArticleForLevel(cfg);
    console.log(`标题  : ${a.title}`);
    console.log(`链接  : ${a.url}`);
    console.log(`词数  : ${a.wordCount}（要求 ${cfg.minWords}~${cfg.maxWords}）`);
    console.log(`段落数: ${a.paragraphs.length}`);
    console.log(`首段  : ${a.paragraphs[0].slice(0, 120)}...`);
    const ok = a.wordCount >= Math.min(cfg.minWords, 200);
    console.log(`判定  : ${ok ? '✅ 可用' : '⚠️ 词数偏少，看截断逻辑是否合理'}`);
  } catch (e) {
    console.log(`❌ 失败: ${e.message}`);
  }
  console.log(`耗时 ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}
