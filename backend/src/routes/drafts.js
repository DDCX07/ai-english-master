// === backend/src/routes/drafts.js ===
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/draftController');

// 本路由文件下全部接口需要登录
router.use(auth);

// GET    /api/drafts/:taskId   取草稿
router.get('/:taskId', ctrl.getDraft);

// PUT    /api/drafts/:taskId   保存/覆盖草稿
router.put('/:taskId', ctrl.saveDraft);

// DELETE /api/drafts/:taskId   删除草稿
router.delete('/:taskId', ctrl.deleteDraft);

module.exports = router;
