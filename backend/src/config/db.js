// === backend/src/config/db.js ===
// SQLite 连接 + 建表语句（6 张表）
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new Database(path.join(DATA_DIR, 'app.db'));
db.name = path.join(DATA_DIR, 'app.db');

// 开启 WAL 模式：读写并发性能更好
db.pragma('journal_mode = WAL');
// 开启外键约束（SQLite 默认关闭）
db.pragma('foreign_keys = ON');

// ---------- 建表 ----------
db.exec(`
  -- 用户表（支持 用户名 / 邮箱 / 手机号 任一方式注册登录，至少绑定一种）
  CREATE TABLE IF NOT EXISTS users (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    username        TEXT,             -- 显示昵称，可自定义，不作为唯一登录凭证
    email           TEXT,             -- 邮箱（与手机号至少填一个）
    phone           TEXT,             -- 手机号
    password_hash   TEXT    NOT NULL,
    failed_attempts INTEGER NOT NULL DEFAULT 0,   -- 连续登录失败次数（防爆破）
    locked_until    TEXT,             -- 锁定截止时间（失败 5 次锁 15 分钟）
    last_login_at   TEXT,             -- 最近一次登录时间
    created_at      TEXT    NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
  );

  -- 部分唯一索引：昵称不允许重复（email/phone 的索引在下方迁移块统一创建，
  -- 因为存量旧表要先 ALTER 补列，列存在后才能建索引）
  CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username
    ON users(username) WHERE username IS NOT NULL AND username != '';

  -- 学习进度表（单词）
  CREATE TABLE IF NOT EXISTS progress (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    word             TEXT    NOT NULL,
    level            TEXT    NOT NULL DEFAULT 'CET-6',   -- 'CET-4' / 'CET-6'
    difficulty       TEXT    NOT NULL DEFAULT 'normal',  -- 'hard' / 'normal' / 'easy'
    first_learned_at TEXT    NOT NULL,
    last_reviewed_at TEXT    NOT NULL,
    UNIQUE (user_id, word)
  );

  -- 考试成绩表
  CREATE TABLE IF NOT EXISTS exam_scores (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exam_type     TEXT    NOT NULL,                      -- 'mock' / 'reading'
    score         INTEGER NOT NULL DEFAULT 0,
    correct_count INTEGER NOT NULL DEFAULT 0,
    total         INTEGER NOT NULL DEFAULT 0,
    time_used     INTEGER NOT NULL DEFAULT 0,            -- 秒
    created_at    TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
  );

  -- 写作草稿表
  CREATE TABLE IF NOT EXISTS drafts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id    TEXT    NOT NULL,
    content    TEXT    NOT NULL DEFAULT '',
    word_count INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT    NOT NULL DEFAULT (datetime('now', 'localtime')),
    UNIQUE (user_id, task_id)
  );

  -- 练习历史表
  CREATE TABLE IF NOT EXISTS practice_history (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    module        TEXT    NOT NULL,   -- 'listening'/'oral'/'translation'/'writing'/'grammar'/'grammar_mark'
    item_id       TEXT,
    score         INTEGER,
    correct_count INTEGER,
    total         INTEGER,
    extra_json    TEXT,               -- 模块特有字段（如 listenCount、paragraphs）
    created_at    TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
  );

  -- 学习打卡表
  CREATE TABLE IF NOT EXISTS study_days (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    study_date TEXT    NOT NULL,      -- 'YYYY-MM-DD'
    UNIQUE (user_id, study_date)
  );

  -- 常用查询索引
  CREATE INDEX IF NOT EXISTS idx_progress_user       ON progress(user_id);
  CREATE INDEX IF NOT EXISTS idx_practice_user_mod   ON practice_history(user_id, module);
  CREATE INDEX IF NOT EXISTS idx_practice_created    ON practice_history(user_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_exam_user_type      ON exam_scores(user_id, exam_type);
  CREATE INDEX IF NOT EXISTS idx_study_days_user     ON study_days(user_id, study_date);
`);

// ---------- 存量库迁移：给旧 users 表补新列（列已存在时静默跳过） ----------
// 旧表结构：id / username(UNIQUE NOT NULL) / password_hash / created_at
(function migrateUsersTable() {
  const columns = new Set(
    db.prepare("PRAGMA table_info(users)").all().map(c => c.name)
  );
  const addColumn = (name, ddl) => {
    if (!columns.has(name)) {
      db.exec(`ALTER TABLE users ADD COLUMN ${ddl}`);
    }
  };
  addColumn('email',           "email TEXT");
  addColumn('phone',           "phone TEXT");
  addColumn('failed_attempts', "failed_attempts INTEGER NOT NULL DEFAULT 0");
  addColumn('locked_until',    "locked_until TEXT");
  addColumn('last_login_at',   "last_login_at TEXT");
  // ALTER 不允许非常量 DEFAULT：先加可空列，再回填
  addColumn('updated_at',      "updated_at TEXT");
  db.prepare("UPDATE users SET updated_at = datetime('now', 'localtime') WHERE updated_at IS NULL").run();
  // 旧表的 username 是 UNIQUE NOT NULL（保留约束，旧行不受影响）；
  // 新逻辑里 username 只是昵称，唯一性由部分索引保证
  db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email
      ON users(email) WHERE email IS NOT NULL AND email != '';
    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone
      ON users(phone) WHERE phone IS NOT NULL AND phone != '';
  `);
})();

module.exports = db;
