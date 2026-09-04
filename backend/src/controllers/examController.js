// === backend/src/controllers/examController.js ===
const db = require('../config/db');
const { todayStr } = require('../utils/date');

const EXAM_TYPES = ['mock', 'reading'];

const safeInt = (v, max) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= 0 && n <= max ? n : null;
};

/** GET /api/exams/scores 成绩列表（?exam_type=） */
exports.getScores = (req, res) => {
  const userId = req.user.id;
  const { exam_type: examType } = req.query;

  if (examType !== undefined && !EXAM_TYPES.includes(examType)) {
    return res.fail(`无效的 exam_type，允许值: ${EXAM_TYPES.join(' / ')}`);
  }

  const rows = examType
    ? db.prepare('SELECT * FROM exam_scores WHERE user_id = ? AND exam_type = ? ORDER BY created_at DESC, id DESC').all(userId, examType)
    : db.prepare('SELECT * FROM exam_scores WHERE user_id = ? ORDER BY created_at DESC, id DESC').all(userId);

  return res.ok({ total: rows.length, items: rows });
};

/** POST /api/exams/scores 提交一次考试成绩 */
exports.addScore = (req, res) => {
  const userId = req.user.id;
  const { exam_type: examType, score, correctCount, total, timeUsed } = req.body || {};

  if (!EXAM_TYPES.includes(examType)) {
    return res.fail(`无效的 exam_type，允许值: ${EXAM_TYPES.join(' / ')}`);
  }
  const safeScore = safeInt(score, 100);
  if (safeScore === null) return res.fail('score 需为 0-100 的数字');
  const safeCorrect = correctCount === undefined ? 0 : safeInt(correctCount, 10000);
  if (safeCorrect === null) return res.fail('correctCount 需为非负数字');
  const safeTotal = total === undefined ? 0 : safeInt(total, 10000);
  if (safeTotal === null) return res.fail('total 需为非负数字');
  const safeTime = timeUsed === undefined ? 0 : safeInt(timeUsed, 24 * 3600);
  if (safeTime === null) return res.fail('timeUsed 需为 0-86400 的秒数');

  const info = db.prepare(`
    INSERT INTO exam_scores (user_id, exam_type, score, correct_count, total, time_used)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(userId, examType, safeScore, safeCorrect, safeTotal, safeTime);

  // 考试也算打卡
  db.prepare('INSERT OR IGNORE INTO study_days (user_id, study_date) VALUES (?, ?)')
    .run(userId, todayStr());

  const row = db.prepare('SELECT * FROM exam_scores WHERE id = ?').get(info.lastInsertRowid);
  return res.ok(row, '成绩已保存');
};
