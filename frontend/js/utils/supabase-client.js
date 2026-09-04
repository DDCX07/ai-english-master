/**
 * Supabase 客户端（全站唯一入口）
 *
 * 使用方法：
 *  1. 打开 Supabase 控制台 → Project Settings → API
 *  2. 把 Project URL 粘贴到下面 SUPABASE_URL
 *  3. 把 anon public 钥匙粘贴到 SUPABASE_ANON_KEY
 *
 * 注意：anon key 是公开钥匙（数据安全由 RLS 保障），可以放前端；
 *      service_role 钥匙绝对不能出现在这里！
 *
 * 配好之后全站通过全局变量 sb 访问，例如：
 *   const { data, error } = await sb.from('user_settings').select('*').limit(1);
 */

const SUPABASE_URL = 'https://stugrunuaxzjzlffozbm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_QZeWESbgxgXl0cK4mz8vaQ_-nEVAorc';

let sb = null;

(function initSupabase() {
  if (typeof window.supabase === 'undefined') {
    console.warn('[supabase] CDN 未加载（缺少 @supabase/supabase-js script 标签）');
    return;
  }
  if (!/^https:\/\/.+\.supabase\.co$/.test(SUPABASE_URL)) {
    console.warn('[supabase] 尚未配置：请编辑 js/utils/supabase-client.js 填入 Project URL 和 anon key');
    return;
  }
  try {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,   // 登录状态存浏览器，刷新不掉线
        autoRefreshToken: true  // token 快过期时自动续期
      }
    });
  } catch (err) {
    console.error('[supabase] 初始化失败:', err);
  }
})();
