// === backend/src/controllers/practiceController.js ===
const db = require('../config/db');

const MODULES = ['listening', 'oral', 'translation', 'writing', 'grammar', 'grammar_mark'];

/** 把一行记录的 extra_json 解析回对象 */
function parseRow(row) {
  if (!row) return row;
  let extra = null;
  if (row.extra_json) {
    try { extra = JSON.parse(row.extra_json); } catch (e) { extra = null; }
  }
  return { ...row, extra_json: undefined, extra };
}

/** GET /api/practice/history 练习历史（?module=&limit=） */
exports.getHistory = (req, res) => {
  const userId = req.user.id;
  const { module } = req.query;
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 100, 1), 500);

  if (module !== undefined && !MODULES.includes(module)) {
    return res.fail(`无效的 module 参数，允许值: ${MODULES.join(' / ')}`);
  }

  const rows = module
    ? db.prepare('SELECT * FROM practice_history WHERE user_id = ? AND module = ? ORDER BY created_at DESC, id DESC LIMIT ?').all(userId, module, limit)
    : db.prepare('SELECT * FROM practice_history WHERE user_id = ? ORDER BY created_at DESC, id DESC LIMIT ?').all(userId, limit);

  return res.ok({ total: rows.length, items: rows.map(parseRow) });
};

/** POST /api/practice/history 新增一条练习记录 */
exports.addRecord = (req, res) => {
  const userId = req.user.id;
  const { module, itemId, score, correctCount, total, extra } = req.body || {};

  if (!MODULES.includes(module)) {
    return res.fail(`无效的 module，允许值: ${MODULES.join(' / ')}`);
  }
  if (itemId !== undefined && (typeof itemId !== 'string' || itemId.length > 200)) {
    return res.fail('itemId 必须为 200 字符以内的字符串');
  }

  const safeInt = (v, max) => {
    const n = Math.round(Number(v));
    return Number.isFinite(n) && n >= 0 && n <= max ? n : null;
  };
  const safeScore = score === undefined ? null : safeInt(score, 100);
  const safeCorrect = correctCount === undefined ? null : safeInt(correctCount, 10000);
  const safeTotal = total === undefined ? null : safeInt(total, 10000);
  if (score !== undefined && safeScore === null) return res.fail('score 需为 0-100 的数字');

  let extraJson = null;
  if (extra !== undefined && extra !== null) {
    try {
      extraJson = JSON.stringify(extra);
    } catch (e) {
      return res.fail('extra 无法序列化为 JSON');
    }
    if (extraJson.length > 50000) return res.fail('extra 字段过大');
  }

  const info = db.prepare(`
    INSERT INTO practice_history (user_id, module, item_id, score, correct_count, total, extra_json)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(userId, module, itemId || null, safeScore, safeCorrect, safeTotal, extraJson);

  // 做练习也算打卡
  db.prepare('INSERT OR IGNORE INTO study_days (user_id, study_date) VALUES (?, ?)')
    .run(userId, require('../utils/date').todayStr());

  const row = db.prepare('SELECT * FROM practice_history WHERE id = ?').get(info.lastInsertRowid);
  return res.ok(parseRow(row), '记录成功');
};
