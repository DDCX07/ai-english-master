// === backend/src/routes/practice.js ===
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/practiceController');

// 本路由文件下全部接口需要登录
router.use(auth);

// GET  /api/practice/history   练习历史（?module=&limit=）
router.get('/history', ctrl.getHistory);

// POST /api/practice/history   新增练习记录
router.post('/history', ctrl.addRecord);

module.exports = router;
