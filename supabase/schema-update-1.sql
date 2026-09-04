-- ============================================================
-- 增量更新 ①（2026-08-22）：词汇进度表补两个恢复用字段
--
-- 背景：换浏览器登录时要从云端完整还原本地 vocabProgress，
-- 原表缺"词库级别"和"第一次学习的日期"两个字段。
-- 在 SQL Editor 里运行一次即可（可重复运行，不报错）。
-- ============================================================

alter table public.user_vocab_progress
  add column if not exists prep_level text not null default 'CET-6'
    check (prep_level in ('CET-4', 'CET-6')),
  add column if not exists first_reviewed_at timestamptz not null default now();
