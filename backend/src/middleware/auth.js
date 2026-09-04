// === backend/src/middleware/auth.js ===
// JWT 校验中间件：除注册/登录外的所有接口都经过这里
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ai-english-dev-secret-2026';

module.exports = function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.fail('未登录，请先登录获取 token', 401);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id, username: payload.username };
    return next();
  } catch (err) {
    const expired = err.name === 'TokenExpiredError';
    return res.fail(expired ? '登录已过期，请重新登录' : '无效的 token，请重新登录', 401);
  }
};
