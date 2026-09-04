// === backend/src/controllers/progressController.js ===
const db = require('../config/db');
const { todayStr, nowIso } = require('../utils/date');

const LEVELS = ['CET-4', 'CET-6'];
const DIFFICULTIES = ['hard', 'normal', 'easy'];

/**
 * 计算连续打卡天数：从 study_days 表查当前用户全部日期，
 * 从今天（或昨天，今天还没打卡时）往前数，断档即停。
 * 与前端 api.js getStreak() 逻辑保持一致。
 */
function computeStreak(userId) {
  const rows = db.prepare('SELECT study_date FROM study_days WHERE user_id = ? ORDER BY study_date DESC')
    .all(userId);
  if (rows.length === 0) return 0;

  const dates = new Set(rows.map(r => r.study_date));
  // 锚点：今天打卡了就数到今天；否则允许从昨天开始数（昨天断了才是 0）
  let anchor = dates.has(todayStr()) ? 0 : -1;

  // 昨天也没打卡 → 连续中断
  if (!dates.has(todayStr(anchor))) return 0;

  let streak = 0;
  while (dates.has(todayStr(anchor - streak))) {
    streak++;
  }
  return streak;
}

/** 词汇统计：总数 / 已掌握 / 待复习 / 今日新词 */
function vocabStats(userId) {
  const today = todayStr();
  const row = db.prepare(`
    SELECT
      COUNT(*)                                                AS total,
      SUM(CASE WHEN difficulty IN ('easy', 'normal') THEN 1 ELSE 0 END) AS mastered,
      SUM(CASE WHEN difficulty = 'hard' THEN 1 ELSE 0 END)              AS review,
      SUM(CASE WHEN DATE(first_learned_at) = ? THEN 1 ELSE 0 END)       AS todayNew
    FROM progress WHERE user_id = ?
  `).get(today, userId);
  return {
    total: row.total || 0,
    mastered: row.mastered || 0,
    review: row.review || 0,
    todayNew: row.todayNew || 0
  };
}

/** GET /api/progress/stats 全站统计 */
exports.getStats = (req, res) => {
  const userId = req.user.id;
  const today = todayStr();

  // ---- 加权正确率 ----
  // 计数型记录（有 correct_count/total）：按题数加权
  // 分数型记录（只有 score）：按 score/100 计入
  const acc = db.prepare(`
    SELECT
      SUM(CASE WHEN total > 0 THEN correct_count ELSE 0 END) AS sumCorrect,
      SUM(CASE WHEN total > 0 THEN total ELSE 0 END)         AS sumTotal,
      SUM(CASE WHEN total > 0 THEN 0 ELSE 1 END)             AS scoreCount,
      SUM(CASE WHEN total > 0 THEN 0 ELSE score END)         AS sumScore
    FROM practice_history WHERE user_id = ?
  `).get(userId);

  // 阅读成绩按 score 计入
  const examAcc = db.prepare(`
    SELECT COUNT(*) AS cnt, SUM(score) AS sumScore
    FROM exam_scores WHERE user_id = ?
  `).get(userId);

  let correctUnits = (acc.sumCorrect || 0);
  let totalUnits = (acc.sumTotal || 0);
  if (acc.scoreCount > 0) {
    correctUnits += (acc.sumScore || 0) / 100;
    totalUnits += acc.scoreCount;
  }
  if (examAcc.cnt > 0) {
    correctUnits += (examAcc.sumScore || 0) / 100;
    totalUnits += examAcc.cnt;
  }
  const accuracy = totalUnits > 0 ? Math.round(correctUnits / totalUnits * 100) : 0;

  // ---- 今日活动 ----
  const countToday = (sql, ...params) =>
    db.prepare(sql).get(...params).cnt || 0;

  const todayActivity = {
    words: vocabStats(userId).todayNew,
    listeningQuestions: countToday(
      `SELECT SUM(COALESCE(total, 1)) AS cnt FROM practice_history
       WHERE user_id = ? AND module = 'listening' AND DATE(created_at) = ?`,
      userId, today),
    reading: countToday(
      `SELECT COUNT(*) AS cnt FROM exam_scores
       WHERE user_id = ? AND exam_type = 'reading' AND DATE(created_at) = ?`,
      userId, today),
    writing: countToday(
      `SELECT COUNT(*) AS cnt FROM practice_history
       WHERE user_id = ? AND module = 'writing' AND DATE(created_at) = ?`,
      userId, today),
    translation: countToday(
      `SELECT COUNT(*) AS cnt FROM practice_history
       WHERE user_id = ? AND module = 'translation' AND DATE(created_at) = ?`,
      userId, today),
    oral: countToday(
      `SELECT COUNT(*) AS cnt FROM practice_history
       WHERE user_id = ? AND module = 'oral' AND DATE(created_at) = ?`,
      userId, today)
  };

  return res.ok({
    streak: computeStreak(userId),
    vocab: vocabStats(userId),
    accuracy,
    today: todayActivity
  });
};

/** POST /api/progress/checkin 每日打卡（幂等） */
exports.checkin = (req, res) => {
  const userId = req.user.id;
  const today = todayStr();

  const info = db.prepare('INSERT OR IGNORE INTO study_days (user_id, study_date) VALUES (?, ?)')
    .run(userId, today);

  const isNew = info.changes > 0;
  return res.ok(
    { isNew, streak: computeStreak(userId), studyDate: today },
    isNew ? '今日打卡成功' : '今天已经打卡过了'
  );
};

/** GET /api/progress/vocab 单词进度（?level= 筛选） */
exports.getVocab = (req, res) => {
  const userId = req.user.id;
  const { level } = req.query;

  if (level !== undefined && !LEVELS.includes(level)) {
    return res.fail(`无效的 level 参数，允许值: ${LEVELS.join(' / ')}`);
  }

  const rows = level
    ? db.prepare('SELECT word, level, difficulty, first_learned_at, last_reviewed_at FROM progress WHERE user_id = ? AND level = ? ORDER BY last_reviewed_at DESC').all(userId, level)
    : db.prepare('SELECT word, level, difficulty, first_learned_at, last_reviewed_at FROM progress WHERE user_id = ? ORDER BY last_reviewed_at DESC').all(userId);

  return res.ok({ total: rows.length, items: rows });
};

/** POST /api/progress/vocab 记录单词掌握情况（同词复习只更新） */
exports.recordVocab = (req, res) => {
  const userId = req.user.id;
  const { word, level, difficulty } = req.body || {};

  if (typeof word !== 'string' || !word.trim() || word.length > 100) {
    return res.fail('word 必须为 1-100 字符的字符串');
  }
  const safeLevel = level || 'CET-6';
  if (!LEVELS.includes(safeLevel)) {
    return res.fail(`无效的 level，允许值: ${LEVELS.join(' / ')}`);
  }
  if (!DIFFICULTIES.includes(difficulty)) {
    return res.fail(`无效的 difficulty，允许值: ${DIFFICULTIES.join(' / ')}`);
  }

  const now = nowIso();
  db.prepare(`
    INSERT INTO progress (user_id, word, level, difficulty, first_learned_at, last_reviewed_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT (user_id, word) DO UPDATE SET
      difficulty    = excluded.difficulty,
      last_reviewed_at = excluded.last_reviewed_at
  `).run(userId, word.trim(), safeLevel, difficulty, now, now);

  // 学习单词也算打卡
  db.prepare('INSERT OR IGNORE INTO study_days (user_id, study_date) VALUES (?, ?)')
    .run(userId, todayStr());

  const row = db.prepare('SELECT word, level, difficulty, first_learned_at, last_reviewed_at FROM progress WHERE user_id = ? AND word = ?')
    .get(userId, word.trim());

  return res.ok(row, '记录成功');
};
