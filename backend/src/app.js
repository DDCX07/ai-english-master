// === backend/src/app.js ===
// Express 应用：中间件注册 + 路由挂载 + 静态文件服务 + 全局错误处理
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// 统一响应格式中间件
const responseMiddleware = require('./middleware/response');

// 路由
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const practiceRoutes = require('./routes/practice');
const examRoutes = require('./routes/exams');
const draftRoutes = require('./routes/drafts');
const migrateRoutes = require('./routes/migrate');

const app = express();

// ---------- CORS ----------
// 开发阶段允许 VSCode Live Server (5500) 和本服务自身 (3000)
const ALLOWED_ORIGINS = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];
app.use(cors({
  origin(origin, callback) {
    // origin 为 undefined 时是同源请求 / curl / Postman，直接放行
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS 不允许的来源: ${origin}`));
  }
}));

// ---------- 请求体解析（限制 5MB，防超大 payload） ----------
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));

// ---------- 统一响应格式 ----------
app.use(responseMiddleware);

// ---------- API 路由 ----------
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/drafts', draftRoutes);
app.use('/api/migrate', migrateRoutes);

// ---------- 静态文件服务（前端页面） ----------
// backend/src/app.js → 上两级到项目根目录 → frontend/
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

// ---------- 404 处理 ----------
// API 请求返回 JSON 404；其他请求（前端路由）回落到首页
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: `接口不存在: ${req.method} ${req.path}` });
  }
  return res.status(404).sendFile(path.join(__dirname, '..', '..', 'frontend', 'index.html'));
});

// ---------- 全局错误处理 ----------
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[error]', err.message);
  const status = err.status || (err.type === 'entity.too.large' ? 413 : 500);
  res.status(status).json({
    success: false,
    message: status === 413 ? '请求体超过 5MB 限制' : `服务器内部错误: ${err.message}`
  });
});

module.exports = app;
