# AI English Master 部署规划

> 目标：把「本地优先 + 写穿同步」的个人学习网站逐步推向可公网访问的生产部署。
> 原则：**本地先行，按需上云**——每一阶段只引入当前确实需要的复杂度。
> 最后更新：2026-08-20

---

## 0. 现状盘点

| 组件 | 现状 |
|---|---|
| 前端 | 纯静态 HTML/CSS/JS（`frontend/`），数据内嵌在 `js/data/*.js`，localStorage 记录 |
| 后端 | Express + better-sqlite3 + JWT（`backend/`），本地 3000 端口，静态分发 + 同步 API |
| 数据库 | 单文件 SQLite（`backend/data/*.db`），无迁移脚本 |
| 静态资源 | 音频 66MB+（`frontend/assets/audio/`），随代码一起分发 |
| 用户 | 单用户（自己），无公网暴露 |

当前架构的最大优点是**部署单元极简**：一个 Node 进程 + 一个 DB 文件 + 一堆静态文件，任何方案都从这个基线出发。

---

## 1. 数据库选型

### 结论：近期继续 SQLite，多用户上线时迁 PostgreSQL（托管服务优先 Supabase）

| 方案 | 优点 | 缺点 | 适用阶段 |
|---|---|---|---|
| **SQLite（现状）** | 零运维、单文件备份（`cp` 即可）、better-sqlite3 同步 API 性能极好 | 并发写弱（单写者）、不能多机水平扩展 | ✅ 现在——单用户写穿同步完全够用 |
| **PostgreSQL（自建）** | 功能全、并发强 | 需自己管备份/升级/连接池 | ❌ 个人项目不推荐自建 |
| **Supabase** | 免费层 500MB 数据库 + 自带 Auth/Storage/REST；Postgres 生态； Dashboard 直观 | 免费层项目 7 天不活跃会暂停（现为可恢复）；国内直连速度一般 | ✅ 多用户首选 |
| **Neon** | Serverless Postgres，按量计费，数据库分支（branching）适合开发实验 | 无内置 Auth/Storage（需另配）；冷启动偶有延迟 | 备选：只要数据库不要全家桶时 |

### 决策依据

1. **数据规模**：学习记录是典型的低写入量场景（每次做题一条），SQLite 单机支撑数万 QPS 读 + 单写者毫无压力。现在迁移纯属于过度设计。
2. **迁移触发条件**（满足其一再迁）：
   - 出现 ≥2 个并发写入端（如多设备同时在线写、或开放注册后多用户）
   - 需要服务端复杂查询/聚合（学习报表、跨用户统计）
   - 需要行级权限（RLS）做多用户数据隔离
3. **为什么 Supabase 优先**：本项目已经需要「数据库 + 认证 + 文件存储」三件套，Supabase 一站全给，免费层对个人项目绰绰有余；Neon 只解决数据库一件。

### 迁移路径（到时照做即可）

```
SQLite (better-sqlite3)          PostgreSQL (pg / Prisma)
─────────────────────────        ─────────────────────────────
1. 用 pg-schema.sql 建表（把当前     1. 导出：sqlite3 .dump 转 SQL
   users/records 表翻成 PG DDL）    2. 改写：AUTOINCREMENT→IDENTITY，
2. 写一次性脚本 sqlite→pg 搬数据        INTEGER 时间戳→timestamptz
3. backend/src 里把 better-sqlite3    3. 验证记录条数一致后切流量
   调用替换成 pg（接口层不变）
```

**预防性工作（现在就做，成本≈0）**：
- [ ] 所有 SQL 收敛到 `backend/src/utils/` 或 controller 内的少量函数，不要散落
- [ ] 时间统一存 ISO 字符串/Unix 秒，避免 SQLite 日期函数依赖
- [ ] 加一份 `backend/data/schema.sql` 作为唯一 schema 事实源

---

## 2. 文件存储选型

### 待存储资产

| 资产 | 大小 | 访问模式 |
|---|---|---|
| 听力/单词音频 | 66MB+，只增不改 | 公网只读、前端直接 `<audio>` 拉取 |
| 未来：用户语音跟读录音、TTS 缓存 | 不可控 | 私有读写、需鉴权 |

### 结论：阶段一音频直接跟静态站走；阶段二国内用腾讯 COS，海外/自用用 Cloudflare R2

| 方案 | 优点 | 缺点 | 判断 |
|---|---|---|---|
| **随静态站分发（现状）** | 零成本零运维，本地/局域网已够用 | 66MB 会让每次部署变重；公网带宽贵 | ✅ 现在 |
| **腾讯云 COS** | 国内速度最好、CDN 便宜、有免费额度（6个月） | 需实名+备案域名才能绑 CDN；按量计费要盯 | ✅ 国内正式上线首选 |
| **七牛云 Kodo** | 10GB 免费存储+CDN 流量，个人友好 | 免费额度到期政策多变 | 备选（注册即送的免费空间对 66MB 绰绰有余） |
| **Cloudflare R2** | **零出口流量费**（对音频这种大流量是杀手级）、S3 API 兼容、免备案 | 国内直连速度不稳定（无备案域名时） | ✅ 海外/自用首选 |
| **Google Drive** | 免费 15GB | **不适合**：无直链（要 OAuth/代理）、API 限流、随时改版 | ❌ 排除 |
| **百度网盘** | 容量大 | **不适合**：无正经开放 API、直链秒失效、下载限速 | ❌ 排除 |

### 设计要求（无论选哪家，现在就把接口留好）

前端统一走 `RESOLVE_AUDIO_URL(id)` 这类间接层，而不是硬编码 `/assets/audio/xxx.mp3`：

```js
// js/utils/api.js 里预留
function resolveAudioUrl(name) {
  // 阶段一：return `assets/audio/${name}`;
  // 阶段二：return `${CDN_BASE}/${name}`;   // COS/R2 换一行配置
}
```

- 公网只读资源：桶策略设 public-read + 前缀缓存头 `Cache-Control: max-age=31536000`（文件名带 hash 则可永久缓存）
- 用户私有录音：用各家的**预签名 URL**（COS 临时密钥 / R2 presigned PUT），前端直传，不经过 Express 中转

---

## 3. 服务器与应用托管

### 结论：按「需求梯度」选，不要一步到位

| 阶段 | 需求 | 推荐方案 | 成本 |
|---|---|---|---|
| **A. 本地/局域网（现在）** | 自己用，手机同步 | ✅ 维持现状：WSL2 里 `node src/server.js`，局域网 IP 访问；加 `pm2` 守护 | 0 |
| **B. 公网自用** | 外出也能访问 | **Cloudflare Tunnel**（cloudflared）：无需公网 IP、无需开端口、自带 HTTPS；免费 | 0 |
| **C. 公网多人** | 稳定 SLA、国内访问速度 | 国内轻量云服务器（腾讯/阿里轻量 2C2G，约 ¥50-100/月）+ 域名备案 + Nginx 反代 + pm2/systemd；或**完全托管**：前端 Cloudflare Pages / Vercel + 后端 Fly.io / Render | ¥0-100/月 |

### 阶段 B 落地清单（最可能的下一步，半小时工作量）

```bash
# 1. cloudflared 隧道把本地 3000 映射到公网域名
cloudflared tunnel --url http://localhost:3000
# 2. 生产配置三件套
#    a) .env 里 JWT_SECRET 换成 openssl rand -hex 32 生成的强随机值
#    b) Express 只监听 127.0.0.1（由隧道转发，不直接暴露）
#    c) CORS 白名单收紧到实际域名
# 3. pm2 守护进程 + 开机自启
pm2 start src/server.js --name ai-english && pm2 save && pm2 startup
```

### 阶段 C 的托管拆分建议

前端（纯静态）与后端（API）分开托管最省心：

```
Cloudflare Pages / Vercel  ←  frontend/（含音频，或音频指到 COS/R2）
        │  /api/* 反代
        ▼
Fly.io / Render / 国内轻量云 ← backend/（Node + SQLite 卷 或 Supabase）
```

---

## 4. 安全清单（上线前必做）

- [ ] `JWT_SECRET` 改为强随机值并只放 `.env`（`.env` 已在 `.gitignore`）
- [ ] SQLite 文件路径不可通过 URL 访问到（Express 静态目录只挂 `frontend/`）
- [ ] 登录接口加限流（如每 IP 10 次/分钟，`express-rate-limit`）
- [ ] 密码哈希已有 bcryptjs ✅，确认 cost ≥ 10
- [ ] HTTPS：Cloudflare Tunnel/Pages 自带；自建则 certbot 一键
- [ ] 每日备份：`sqlite3 x.db ".backup backup.db"` + 定时推送到对象存储/网盘

---

## 5. 总路线图

```
2026 Q3（现在）      本地完善功能；schema.sql 收敛；音频 URL 间接层
2026 Q4  阶段B      Cloudflare Tunnel 公网自用；pm2；安全清单；每日备份
2027 之后 阶段C      开放多用户 → Supabase（PG+Auth）+ COS/R2 音频分离
                     → 静态站 Pages + API 云托管
```

**一句话版本：SQLite 用到多用户为止，Supabase 是那时的默认答案；音频先跟站走、大了上 R2（海外）或 COS（国内）；服务器用 Cloudflare Tunnel 免费过桥，正式上线再买轻量云。**
