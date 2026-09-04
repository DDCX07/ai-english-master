// === backend/src/server.js ===
// 启动入口：加载环境变量，创建 Express 应用，监听端口
require('dotenv').config();

const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[server] AI English Master 后端已启动`);
  console.log(`[server] 前端页面:  http://localhost:${PORT}`);
  console.log(`[server] API 前缀:  http://localhost:${PORT}/api`);
  console.log(`[server] 数据库:    ${db.name}`);
});
