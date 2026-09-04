// === backend/src/controllers/authController.js ===
// 用户认证：支持 邮箱 / 手机号 注册与登录（兼容旧用户名账号）
// 安全设计：
// - 密码 bcrypt 哈希存储（cost 10）
// - 登录失败 5 次锁定账号 15 分钟（防爆破）
// - 登录失败提示统一为"账号或密码错误"，不泄露账号是否存在
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { nowIso } = require('../utils/date');

const JWT_SECRET = process.env.JWT_SECRET || 'ai-english-dev-secret-2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const MAX_FAILED_ATTEMPTS = 5;  // 连续失败 N 次后锁定
const LOCK_MINUTES = 15;        // 锁定时长（分钟）

/** 把 Date 格式化为与 nowIso() 一致的本地时间字符串（保证可直接字符串比较） */
function localDateTime(d) {
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

// ---------- 格式识别与校验 ----------

const RE_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RE_PHONE = /^1[3-9]\d{9}$/;                                  // 中国大陆手机号
const RE_USERNAME = /^[a-zA-Z0-9_一-龥]{2,20}$/;                   // 昵称（仅注册时可自定义）

/** 判断账号类型：'email' | 'phone' | 'username' | null（格式都不对） */
function accountType(account) {
  if (typeof account !== 'string') return null;
  const v = account.trim();
  if (RE_EMAIL.test(v)) return 'email';
  if (RE_PHONE.test(v)) return 'phone';
  if (RE_USERNAME.test(v)) return 'username';
  return null;
}

/** 注册密码强度：8-64 位，需同时包含字母和数字 */
function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8 || password.length > 64) {
    return '密码需为 8-64 位，且同时包含字母和数字';
  }
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return '密码需为 8-64 位，且同时包含字母和数字';
  }
  return null;
}

/** 由邮箱/手机号生成默认昵称 */
function defaultNickname(type, account) {
  if (type === 'email') return account.split('@')[0].slice(0, 20);
  return '用户' + account.slice(-4); // 手机号后 4 位
}

/** 签发 token */
function signToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/** 对外输出的用户信息（绝不含密码哈希） */
function publicUser(row) {
  return {
    id: row.id,
    username: row.username,
    email: row.email || '',
    phone: row.phone || ''
  };
}

// ---------- 注册 ----------

/** POST /api/auth/register  body: { account, password, username? } */
// account 为邮箱或手机号（二选一，哪个方便用哪个）；username 为可选昵称
exports.register = (req, res) => {
  const { account, password, username } = req.body || {};

  const type = accountType(account);
  if (type !== 'email' && type !== 'phone') {
    return res.fail('请提供有效的邮箱或中国大陆手机号');
  }
  const invalidPwd = validatePassword(password);
  if (invalidPwd) return res.fail(invalidPwd);

  // 可选昵称校验
  if (username !== undefined && username !== null && username !== '') {
    if (typeof username !== 'string' || !RE_USERNAME.test(username.trim())) {
      return res.fail('昵称需为 2-20 位字母、数字、下划线或中文');
    }
  }
  const nickname = (username && String(username).trim()) || defaultNickname(type, account);

  // 唯一性检查：邮箱 / 手机号 / 昵称任一重复都拒绝
  const dup = db.prepare(`
    SELECT email, phone, username FROM users
    WHERE ${type === 'email' ? 'email' : 'phone'} = ?
       OR username = ?
  `).get(account, nickname);
  if (dup) {
    if (dup.email === account || dup.phone === account) {
      return res.fail('该邮箱/手机号已被注册', 409);
    }
    return res.fail('该昵称已被使用，请换一个', 409);
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const info = db.prepare(`
    INSERT INTO users (username, email, phone, password_hash, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    nickname,
    type === 'email' ? account : null,
    type === 'phone' ? account : null,
    passwordHash, nowIso(), nowIso()
  );

  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
  return res.ok({ token: signToken(row), user: publicUser(row) }, '注册成功');
};

// ---------- 登录 ----------

/** POST /api/auth/login  body: { account, password } */
// account 支持邮箱 / 手机号 / 旧用户名（向后兼容）
exports.login = (req, res) => {
  const { account, password } = req.body || {};

  const type = accountType(account);
  if (!type || typeof password !== 'string') {
    return res.fail('请提供账号（邮箱/手机号/用户名）和密码');
  }

  const row = db.prepare(`
    SELECT * FROM users WHERE ${type} = ?
  `).get(account.trim());

  // 统一错误信息 + 固定耗时的比较，避免账号枚举
  const fail = () => res.fail('账号或密码错误', 401);
  if (!row) {
    bcrypt.compareSync(password, '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidiu'); // 与真实比较耗时接近
    return fail();
  }

  // 锁定检查（locked_until 与 nowIso() 同为本地时间字符串，可直接比较）
  if (row.locked_until && row.locked_until > nowIso()) {
    const remain = new Date(row.locked_until.replace(' ', 'T')) - new Date(nowIso().replace(' ', 'T'));
    const mins = Math.max(1, Math.ceil(remain / 60000));
    return res.fail(`失败次数过多，账号已锁定，请约 ${mins} 分钟后再试`, 429);
  }

  if (!bcrypt.compareSync(password, row.password_hash)) {
    // 累计失败次数，达到上限则锁定
    const attempts = (row.failed_attempts || 0) + 1;
    const locked = attempts >= MAX_FAILED_ATTEMPTS;
    db.prepare(`
      UPDATE users SET failed_attempts = ?,
        locked_until = ?,
        updated_at = ?
      WHERE id = ?
    `).run(
      locked ? 0 : attempts,
      locked ? localDateTime(new Date(Date.now() + LOCK_MINUTES * 60000)) : null,
      nowIso(),
      row.id
    );
    if (locked) {
      return res.fail(`密码错误次数过多，账号已锁定 ${LOCK_MINUTES} 分钟`, 429);
    }
    return res.fail(`账号或密码错误（再错 ${MAX_FAILED_ATTEMPTS - attempts} 次将锁定 ${LOCK_MINUTES} 分钟）`, 401);
  }

  // 登录成功：清零失败计数
  db.prepare('UPDATE users SET failed_attempts = 0, locked_until = NULL, last_login_at = ?, updated_at = ? WHERE id = ?')
    .run(nowIso(), nowIso(), row.id);

  return res.ok({ token: signToken(row), user: publicUser(row) }, '登录成功');
};

// ---------- 当前用户 ----------

/** GET /api/auth/me 获取当前用户信息（需要 JWT） */
exports.me = (req, res) => {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!row) return res.fail('用户不存在', 401);
  return res.ok({
    id: row.id,
    username: row.username,
    email: row.email || '',
    phone: row.phone || '',
    created_at: row.created_at,
    last_login_at: row.last_login_at
  });
};

// ---------- 个人资料 ----------

/** PUT /api/auth/profile  修改昵称（需要 JWT） body: { username } */
exports.updateProfile = (req, res) => {
  const { username } = req.body || {};
  if (typeof username !== 'string' || !RE_USERNAME.test(username.trim())) {
    return res.fail('昵称需为 2-20 位字母、数字、下划线或中文');
  }
  const nickname = username.trim();

  const dup = db.prepare('SELECT id FROM users WHERE username = ? AND id != ?')
    .get(nickname, req.user.id);
  if (dup) return res.fail('该昵称已被使用，请换一个', 409);

  db.prepare('UPDATE users SET username = ?, updated_at = ? WHERE id = ?')
    .run(nickname, nowIso(), req.user.id);
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  return res.ok(publicUser(row), '昵称已更新');
};

/** POST /api/auth/change-password  修改密码（需要 JWT） body: { oldPassword, newPassword } */
exports.changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body || {};

  const invalidPwd = validatePassword(newPassword);
  if (invalidPwd) return res.fail('新密码' + invalidPwd.replace('密码', ''));

  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!row) return res.fail('用户不存在', 401);

  if (typeof oldPassword !== 'string' || !bcrypt.compareSync(oldPassword, row.password_hash)) {
    return res.fail('旧密码错误', 401);
  }
  if (oldPassword === newPassword) {
    return res.fail('新密码不能与旧密码相同');
  }

  db.prepare('UPDATE users SET password_hash = ?, failed_attempts = 0, locked_until = NULL, updated_at = ? WHERE id = ?')
    .run(bcrypt.hashSync(newPassword, 10), nowIso(), row.id);
  return res.ok(null, '密码已修改，下次登录请使用新密码');
};
