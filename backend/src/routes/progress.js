// === backend/src/routes/progress.js ===
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/progressController');

// 本路由文件下全部接口需要登录
router.use(auth);

// GET  /api/progress/stats     全站统计（streak/词汇量/正确率/今日活动）
router.get('/stats', ctrl.getStats);

// POST /api/progress/checkin   每日打卡（幂等）
router.post('/checkin', ctrl.checkin);

// GET  /api/progress/vocab     单词进度（?level= 筛选）
router.get('/vocab', ctrl.getVocab);

// POST /api/progress/vocab     记录单词掌握情况
router.post('/vocab', ctrl.recordVocab);

module.exports = router;
