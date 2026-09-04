// === backend/src/middleware/response.js ===
// 统一响应格式：所有接口都返回 { success, data, message }
module.exports = function responseMiddleware(req, res, next) {
  /**
   * 成功响应：res.ok(data, message)
   * 输出 { success: true, data, message }
   */
  res.ok = (data = null, message = 'ok') => {
    res.json({ success: true, data, message });
  };

  /**
   * 失败响应：res.fail(message, status)
   * 输出 { success: false, message }
   */
  res.fail = (message = '请求失败', status = 400) => {
    res.status(status).json({ success: false, message });
  };

  next();
};
