-- ============================================================
-- AI English Master · 划线功能 数据库迁移
-- 运行方式：Supabase Dashboard → SQL Editor 中运行（可重复运行，不报错）
--
-- 与现有 schema 的关系（schema.sql / schema-update-1.sql）：
-- - 复用公共函数 set_updated_at()（若需要 updated_at；本表暂无该列，故不挂触发器，
--   否则任何 UPDATE 都会因缺列报错）
-- - 表名沿用 user_ 前缀惯例（user_checkins / user_vocab_progress / ...）
-- - 划线数据当前存 localStorage，本表为后续云端同步预留
-- ============================================================

-- ① user_reading_highlights：用户在阅读文章时的手动划线标注
create table if not exists public.user_reading_highlights (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users on delete cascade,
  article_id    text not null,              -- 文章 ID（对应 reading-data.js 中的 id）
  text          text not null,              -- 被划线的文本内容
  color         text not null default 'yellow'
                check (color in ('yellow', 'green', 'blue', 'pink', 'orange')),
  created_at    timestamptz not null default now(),
  unique (user_id, article_id, text, color) -- 同一文章同一文本同一颜色不重复
);

create index if not exists idx_highlights_user_article
  on public.user_reading_highlights (user_id, article_id, created_at desc);

-- ② RLS 行级安全（与其他 user_ 表一致：只能读写自己的行）
alter table public.user_reading_highlights enable row level security;

drop policy if exists "own highlights" on public.user_reading_highlights;
create policy "own highlights" on public.user_reading_highlights
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
