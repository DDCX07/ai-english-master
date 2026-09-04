// === backend/src/routes/auth.js ===
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');

// POST /api/auth/register  注册
router.post('/register', ctrl.register);

// POST /api/auth/login    登录，返回 token
router.post('/login', ctrl.login);

// GET  /api/auth/me       获取当前用户信息（需要 JWT）
router.get('/me', require('../middleware/auth'), ctrl.me);

// PUT  /api/auth/profile  修改昵称（需要 JWT）
router.put('/profile', require('../middleware/auth'), ctrl.updateProfile);

// POST /api/auth/change-password  修改密码（需要 JWT）
router.post('/change-password', require('../middleware/auth'), ctrl.changePassword);

module.exports = router;
