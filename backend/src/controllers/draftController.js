// === backend/src/controllers/draftController.js ===
const db = require('../config/db');
const { nowIso } = require('../utils/date');

/** GET /api/drafts/:taskId 取草稿（没有草稿时 data 为 null，前端按空处理） */
exports.getDraft = (req, res) => {
  const row = db.prepare('SELECT task_id, content, word_count, updated_at FROM drafts WHERE user_id = ? AND task_id = ?')
    .get(req.user.id, req.params.taskId);

  if (!row) return res.ok(null, '暂无草稿');
  return res.ok(row);
};

/** PUT /api/drafts/:taskId 保存/覆盖草稿（word_count 服务端自行计算） */
exports.saveDraft = (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;
  const { content } = req.body || {};

  if (typeof content !== 'string' || content.length > 100000) {
    return res.fail('content 必须为 100000 字符以内的字符串');
  }
  if (taskId.length > 200) {
    return res.fail('taskId 过长');
  }

  // 字数按空白切分计算，与前端写作页一致
  const wordCount = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;

  db.prepare(`
    INSERT INTO drafts (user_id, task_id, content, word_count, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT (user_id, task_id) DO UPDATE SET
      content    = excluded.content,
      word_count = excluded.word_count,
      updated_at = excluded.updated_at
  `).run(userId, taskId, content, wordCount, nowIso());

  const row = db.prepare('SELECT task_id, content, word_count, updated_at FROM drafts WHERE user_id = ? AND task_id = ?')
    .get(userId, taskId);
  return res.ok(row, '草稿已保存');
};

/** DELETE /api/drafts/:taskId 删除草稿（不存在也返回成功，幂等） */
exports.deleteDraft = (req, res) => {
  const info = db.prepare('DELETE FROM drafts WHERE user_id = ? AND task_id = ?')
    .run(req.user.id, req.params.taskId);
  return res.ok({ deleted: info.changes }, info.changes > 0 ? '草稿已删除' : '草稿不存在，无需删除');
};
