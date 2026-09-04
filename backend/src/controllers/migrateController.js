// === backend/src/controllers/migrateController.js ===
// 一次性迁移：把前端 localStorage 旧数据导入后端
// 安全限制：1) 每用户限调一次  2) 只接受白名单键名  3) 单键条目数上限（配合全局 5MB body 限制）
const db = require('../config/db');
const { todayStr, nowIso, isDateStr } = require('../utils/date');

const MAX_ITEMS_PER_KEY = 5000;

// 只接受这些键名（与前端 api.js 实际使用的 localStorage 键一一对应）
const KNOWN_KEYS = [
  'vocabProgress',
  'studyDays',
  'readingHistory',
  'mockExamHistory',
  'listeningHistory',
  'oralHistory',
  'translationHistory',
  'writingHistory',
  'grammarPracticeResults',
  'learnedGrammar'
];
// 写作草稿键形如 writingDraft_task1，按前缀匹配
const DRAFT_PREFIX = 'writingDraft_';

// 模块历史键 → practice_history.module 映射
const HISTORY_MODULES = {
  listeningHistory: 'listening',
  oralHistory: 'oral',
  translationHistory: 'translation',
  writingHistory: 'writing',
  grammarPracticeResults: 'grammar'
};

const safeInt = (v, max, dft = null) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= 0 && n <= max ? n : dft;
};

/**
 * 把前端记录的 date（new Date().toISOString()，UTC 时间）转成本地时间字符串，
 * 避免 DATE(created_at) 按 UTC 切日导致"今日统计"错位；无效则返回 null
 */
const toLocal = (v) => {
  if (typeof v === 'string' && v) {
    const d = new Date(v);
    if (!isNaN(d.getTime())) {
      const p = n => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
        `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    }
  }
  return null;
};

/** POST /api/migrate/import */
exports.importData = (req, res) => {
  const userId = req.user.id;

  // ---- 1. 限调一次：已迁移过直接拒绝 ----
  const done = db.prepare(`SELECT id FROM practice_history WHERE user_id = ? AND module = 'migrated'`)
    .get(userId);
  if (done) {
    return res.fail('该账号已迁移过 localStorage 数据，不能重复导入', 409);
  }

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.fail('请求体必须是 JSON 对象');
  }

  // ---- 2. 只接受白名单键名 ----
  const unknown = Object.keys(body).filter(
    k => !KNOWN_KEYS.includes(k) && !k.startsWith(DRAFT_PREFIX)
  );
  if (unknown.length > 0) {
    return res.fail(`包含不支持的键名: ${unknown.join(', ')}`);
  }

  const counts = {};

  // ---- 3. 事务内逐键导入 ----
  const migrate = db.transaction(() => {
    // 单词进度: { word: { level, difficulty, firstDate, lastDate } }
    const vp = body.vocabProgress;
    if (vp !== undefined) {
      if (vp === null || typeof vp !== 'object' || Array.isArray(vp)) {
        throw new Error('vocabProgress 格式错误');
      }
      const stmt = db.prepare(`
        INSERT INTO progress (user_id, word, level, difficulty, first_learned_at, last_reviewed_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT (user_id, word) DO UPDATE SET
          difficulty = excluded.difficulty, last_reviewed_at = excluded.last_reviewed_at
      `);
      let n = 0;
      for (const [word, info] of Object.entries(vp)) {
        if (n >= MAX_ITEMS_PER_KEY) break;
        if (typeof word !== 'string' || !word.trim() || word.length > 100) continue;
        if (!info || typeof info !== 'object') continue;
        const level = ['CET-4', 'CET-6'].includes(info.level) ? info.level : 'CET-6';
        const difficulty = ['hard', 'normal', 'easy'].includes(info.difficulty) ? info.difficulty : 'normal';
        const first = isDateStr(info.firstDate) ? info.firstDate : todayStr();
        const last = isDateStr(info.lastDate) ? info.lastDate : first;
        stmt.run(userId, word.trim(), level, difficulty, first, last);
        n++;
      }
      counts.vocabProgress = n;
    }

    // 打卡日期: ['YYYY-MM-DD', ...]
    if (body.studyDays !== undefined) {
      if (!Array.isArray(body.studyDays)) throw new Error('studyDays 格式错误');
      const stmt = db.prepare('INSERT OR IGNORE INTO study_days (user_id, study_date) VALUES (?, ?)');
      let n = 0;
      for (const d of body.studyDays) {
        if (n >= MAX_ITEMS_PER_KEY) break;
        if (!isDateStr(d)) continue;
        stmt.run(userId, d);
        n++;
      }
      counts.studyDays = n;
    }

    // 考试成绩: readingHistory / mockExamHistory 数组
    for (const [key, examType] of [['readingHistory', 'reading'], ['mockExamHistory', 'mock']]) {
      const arr = body[key];
      if (arr === undefined) continue;
      if (!Array.isArray(arr)) throw new Error(`${key} 格式错误`);
      const stmt = db.prepare(`
        INSERT INTO exam_scores (user_id, exam_type, score, correct_count, total, time_used, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      let n = 0;
      for (const item of arr.slice(0, MAX_ITEMS_PER_KEY)) {
        if (!item || typeof item !== 'object') continue;
        const score = safeInt(item.percentage !== undefined ? item.percentage : item.score, 100, 0);
        if (score === null) continue;
        stmt.run(
          userId, examType, score,
          safeInt(item.correctCount, 10000, 0) || 0,
          safeInt(item.total, 10000, 0) || 0,
          safeInt(item.timeUsed, 86400, 0) || 0,
          toLocal(item.date) || nowIso()
        );
        n++;
      }
      counts[key] = n;
    }

    // 模块练习历史: 五个数组 → practice_history
    for (const [key, moduleName] of Object.entries(HISTORY_MODULES)) {
      const arr = body[key];
      if (arr === undefined) continue;
      if (!Array.isArray(arr)) throw new Error(`${key} 格式错误`);
      const stmt = db.prepare(`
        INSERT INTO practice_history (user_id, module, item_id, score, correct_count, total, extra_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      let n = 0;
      for (const item of arr.slice(0, MAX_ITEMS_PER_KEY)) {
        if (!item || typeof item !== 'object') continue;
        const itemId = typeof item.itemId === 'string'
          ? item.itemId.slice(0, 200)
          : (typeof item.topicId === 'string' ? item.topicId.slice(0, 200) : null);
        const score = safeInt(item.score !== undefined ? item.score : item.percentage, 100);
        // 前端听力记录用 totalQuestions 字段，其余模块用 total
        const total = safeInt(item.total !== undefined ? item.total : item.totalQuestions, 10000);
        const extra = {};
        for (const field of ['listenCount', 'paragraphs', 'sentence', 'userText', 'result']) {
          if (item[field] !== undefined) extra[field] = item[field];
        }
        stmt.run(
          userId, moduleName, itemId, score,
          safeInt(item.correctCount, 10000),
          total,
          Object.keys(extra).length ? JSON.stringify(extra).slice(0, 50000) : null,
          toLocal(item.date) || nowIso()
        );
        n++;
      }
      counts[key] = n;
    }

    // 语法已学标记: ['语法点名称', ...] → practice_history (module='grammar_mark', score=100)
    if (body.learnedGrammar !== undefined) {
      if (!Array.isArray(body.learnedGrammar)) throw new Error('learnedGrammar 格式错误');
      const stmt = db.prepare(`
        INSERT INTO practice_history (user_id, module, item_id, score, extra_json)
        VALUES (?, 'grammar_mark', ?, 100, NULL)
      `);
      const seen = new Set();
      let n = 0;
      for (const name of body.learnedGrammar.slice(0, MAX_ITEMS_PER_KEY)) {
        if (typeof name !== 'string' || !name.trim() || name.length > 200) continue;
        if (seen.has(name)) continue;
        seen.add(name);
        stmt.run(userId, name.trim());
        n++;
      }
      counts.learnedGrammar = n;
    }

    // 写作草稿: { writingDraft_xxx: '草稿内容' }
    const draftKeys = Object.keys(body).filter(k => k.startsWith(DRAFT_PREFIX));
    if (draftKeys.length > 0) {
      const stmt = db.prepare(`
        INSERT INTO drafts (user_id, task_id, content, word_count, updated_at)
        VALUES (?, ?, ?, ?, datetime('now', 'localtime'))
        ON CONFLICT (user_id, task_id) DO UPDATE SET
          content = excluded.content, word_count = excluded.word_count, updated_at = excluded.updated_at
      `);
      let n = 0;
      for (const key of draftKeys) {
        if (n >= 500) break;
        const content = body[key];
        if (typeof content !== 'string' || content.length > 100000) continue;
        const taskId = key.slice(DRAFT_PREFIX.length) || 'default';
        const wordCount = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;
        stmt.run(userId, taskId, content, wordCount);
        n++;
      }
      counts.drafts = n;
    }

    // 打迁移完成标记（module='migrated'）
    db.prepare(`INSERT INTO practice_history (user_id, module, extra_json) VALUES (?, 'migrated', ?)`)
      .run(userId, JSON.stringify(counts));
  });

  try {
    migrate();
  } catch (err) {
    return res.fail(`迁移失败（数据已回滚）: ${err.message}`);
  }

  return res.ok(counts, '迁移完成');
};
