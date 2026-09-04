-- ============================================================
-- AI English Master · Supabase 建表脚本（一次性全部运行）
-- 设计原则：
--   1. 题库不上库（已在前端 reading-data.js 等文件里，随网站发版）
--   2. 只存"用户自己的数据"，全部开启 RLS 行级安全
--   3. 7 个练习模块共用一张记录表（detail 字段用 jsonb 存各自差异）
-- ============================================================

-- 通用：自动更新 updated_at 的触发器函数
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------
-- ① profiles：用户资料（注册成功后自动创建一行）
-- ------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  username    text not null default '同学',
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- ② user_settings：设置页的全部偏好（每人一行）
--    字段名与前端 localStorage 的 userSettings 一一对应
-- ------------------------------------------------------------
create table public.user_settings (
  user_id        uuid primary key references auth.users on delete cascade,
  prep_level     text not null default 'CET-6'
                 check (prep_level in ('CET-4', 'CET-6')),
  daily_word_goal int not null default 20,
  daily_minutes  jsonb not null default '{"listening":15,"reading":15,"writing":10,"oral":10}',
  daily_reminder boolean not null default false,
  reminder_time  time not null default '20:00',
  font_size      text not null default 'medium'
                 check (font_size in ('small', 'medium', 'large')),
  dark_mode      boolean not null default false,
  updated_at     timestamptz not null default now()
);
create trigger trg_settings_updated before update on public.user_settings
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- ③ user_checkins：每日打卡（一天最多一行，study_seconds 可累加）
--    连续打卡天数由前端根据这张表计算
-- ------------------------------------------------------------
create table public.user_checkins (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users on delete cascade,
  checkin_date  date not null,
  study_seconds int not null default 0,
  created_at    timestamptz not null default now(),
  unique (user_id, checkin_date)
);
create index idx_checkins_user_date on public.user_checkins (user_id, checkin_date desc);

-- ------------------------------------------------------------
-- ④ user_vocab_progress：单词学习进度
--    不建外键指向词库表——词库在前端 JS 里，这里直接存单词文本
-- ------------------------------------------------------------
create table public.user_vocab_progress (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users on delete cascade,
  word              text not null,
  status            text not null default 'learning'
                    check (status in ('learning', 'mastered', 'familiar')),
  correct_count     int not null default 0,
  wrong_count       int not null default 0,
  last_reviewed_at  timestamptz not null default now(),
  unique (user_id, word)
);
create index idx_vocab_user on public.user_vocab_progress (user_id, last_reviewed_at desc);

-- ------------------------------------------------------------
-- ⑤ user_module_records：七个练习模块的统一记录表
--    item_id 对应前端数据里的 id（如阅读文章 "101"、写作任务 "task101"）
--    detail 存各模块差异字段：阅读的 answers 数组、写作的正文、
--    口语的识别文本等，全部以 jsonb 原样保存
-- ------------------------------------------------------------
create table public.user_module_records (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  module           text not null check (module in
                   ('listening', 'reading', 'writing', 'translation',
                    'grammar', 'oral', 'mock_exam')),
  item_id          text not null,
  score            int,                    -- 百分比得分（可空，写作草稿等无分）
  correct_count    int,
  total_count      int,
  duration_seconds int,                    -- 用时（秒）
  detail           jsonb not null default '{}',
  completed_at     timestamptz not null default now()
);
create index idx_records_user_module on public.user_module_records (user_id, module, completed_at desc);

-- ------------------------------------------------------------
-- ⑥ user_writing_drafts：写作草稿自动保存（每题一篇，反复覆盖）
-- ------------------------------------------------------------
create table public.user_writing_drafts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  task_id    text not null,
  content    text not null default '',
  updated_at timestamptz not null default now(),
  unique (user_id, task_id)
);
create trigger trg_drafts_updated before update on public.user_writing_drafts
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- 注册即自动建档：新用户注册成功时，
-- 自动在 profiles 和 user_settings 各插一行（免前端写注册逻辑）
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  values (new.id,
          coalesce(new.raw_user_meta_data ->> 'username',
                   split_part(coalesce(new.email, '同学'), '@', 1)));
  insert into public.user_settings (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- RLS 行级安全：所有表开启；用户只能读写自己的行
-- ============================================================
alter table public.profiles           enable row level security;
alter table public.user_settings      enable row level security;
alter table public.user_checkins      enable row level security;
alter table public.user_vocab_progress enable row level security;
alter table public.user_module_records enable row level security;
alter table public.user_writing_drafts enable row level security;

-- profiles：主键就是 user_id
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- 其余表：都用 user_id 字段判断归属
create policy "own settings" on public.user_settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own checkins" on public.user_checkins
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own vocab" on public.user_vocab_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own records" on public.user_module_records
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own drafts" on public.user_writing_drafts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
