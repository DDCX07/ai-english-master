// === backend/src/routes/migrate.js ===
// 一次性迁移：把前端 localStorage 旧数据导入后端
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/migrateController');

// 需要登录
router.use(auth);

// POST /api/migrate/import   导入 localStorage 旧数据（限调一次）
router.post('/import', ctrl.importData);

module.exports = router;
