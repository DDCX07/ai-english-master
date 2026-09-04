// === backend/src/routes/exams.js ===
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/examController');

// 本路由文件下全部接口需要登录
router.use(auth);

// GET  /api/exams/scores   成绩列表（?exam_type=）
router.get('/scores', ctrl.getScores);

// POST /api/exams/scores   提交考试成绩
router.post('/scores', ctrl.addScore);

module.exports = router;
