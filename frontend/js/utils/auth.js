/**
 * 登录 / 注册模块（Supabase Auth 版）
 *
 * 功能：
 * - 侧边栏/顶栏头像点击 → 弹出登录/注册弹窗（所有页面自动生效，无需改 HTML）
 * - 注册/登录走 Supabase（邮箱 + 密码），profiles 表由数据库触发器自动建档
 * - 登录状态由 Supabase 持久化（persistSession），刷新页面不掉线
 * - 退出登录：只清账号信息，本地学习数据保留
 *
 * 依赖：helpers.js（storage/showToast）、supabase-client.js（全局 sb）
 */

const auth = {
  /** 读取已登录用户信息 { id, username, email } */
  user() {
    try { return JSON.parse(localStorage.getItem('authUser') || 'null'); } catch (e) { return null; }
  },

  _setUser(u) {
    if (u) localStorage.setItem('authUser', JSON.stringify(u));
    else localStorage.removeItem('authUser');
  },

  isLoggedIn() {
    return !!this.user();
  },

  /** Supabase 是否已配置（没填钥匙时所有账号操作直接报友好错误） */
  _ready() {
    if (!sb) {
      return 'Supabase 尚未配置：请编辑 js/utils/supabase-client.js，填入 Project URL 和 anon key';
    }
    return null;
  },

  /** 把 Supabase 的错误信息翻译成人话 */
  _translateError(err) {
    const msg = (err && (err.message || err.error_description || err.msg)) || '';
    if (/Invalid login credentials/i.test(msg)) return '邮箱或密码不正确';
    if (/already registered|already exists/i.test(msg)) return '该邮箱已注册，请直接登录';
    if (/Password should be at least/i.test(msg)) return '密码至少 6 位';
    if (/not confirmed|Email not confirmed/i.test(msg)) return '邮箱尚未验证，请先到注册邮箱点击确认邮件';
    if (/invalid format|is invalid/i.test(msg)) return '邮箱格式不正确';
    if (/rate limit/i.test(msg)) return '操作太频繁，请稍后再试';
    if (/Failed to fetch|NetworkError/i.test(msg)) return '无法连接 Supabase，请检查网络';
    return msg || '操作失败，请稍后再试';
  },

  /**
   * 注册（邮箱 + 密码 + 昵称）
   * 昵称通过 options.data 传给 Supabase，数据库触发器会拿它在 profiles 建档
   */
  async register(email, password, nickname) {
    const notReady = this._ready();
    if (notReady) return { success: false, message: notReady };

    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: { data: { username: nickname || undefined } }
    });
    if (error) return { success: false, message: this._translateError(error) };

    // 邮箱验证开关打开时，不会立刻有会话，需要先去点确认邮件
    if (!data.session) {
      return { success: false, needConfirm: true, message: '注册成功！请到邮箱点击确认邮件后再登录' };
    }
    await this._afterLogin(data.session.user);
    return { success: true };
  },

  /** 登录（邮箱 + 密码） */
  async login(email, password) {
    const notReady = this._ready();
    if (notReady) return { success: false, message: notReady };

    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return { success: false, message: this._translateError(error) };

    await this._afterLogin(data.user);
    return { success: true };
  },

  /** 登录后：拉取 profiles 里的昵称，存到本地；并标记需要做一次云端双向同步 */
  async _afterLogin(user) {
    let username = (user.email || '').split('@')[0];
    try {
      const { data: profile } = await sb.from('profiles').select('username').eq('id', user.id).single();
      if (profile && profile.username) username = profile.username;
    } catch (e) { /* profiles 还没建好时用邮箱前缀兜底 */ }

    this._setUser({ id: user.id, username, email: user.email || '' });
    localStorage.setItem('pendingCloudSync', '1');
  },

  /** 退出登录：清账号信息，本地学习数据保留 */
  async logout() {
    if (sb) { try { await sb.auth.signOut(); } catch (e) { /* 忽略网络错误 */ } }
    this._setUser(null);
    showToast('已退出登录（本地数据保留）', 'info');
    setTimeout(() => location.reload(), 600);
  },

  /**
   * 页面加载时恢复会话：
   * Supabase 里有会话但本地没有 → 从 profiles 拉昵称补上（换浏览器/清过缓存的场景）
   * Supabase 会话已失效但本地还留着 → 清掉本地，按未登录处理
   */
  async restoreSession() {
    if (!sb) return;
    const { data } = await sb.auth.getSession();
    if (data && data.session) {
      if (!this.user()) await this._afterLogin(data.session.user);
    } else {
      this._setUser(null);
    }
  },

  /** 修改昵称：写 profiles 表，成功后同步更新本地并刷新头像/侧边栏入口 */
  async updateNickname(nickname) {
    const notReady = this._ready();
    if (notReady) return { success: false, message: notReady };
    const user = this.user();
    if (!user) return { success: false, message: '请先登录' };

    const { error } = await sb.from('profiles')
      .update({ username: nickname }).eq('id', user.id);
    if (error) return { success: false, message: this._translateError(error) };

    this._setUser(Object.assign({}, user, { username: nickname }));
    if (typeof renderAccountEntry === 'function') renderAccountEntry();
    if (typeof renderAuthAvatar === 'function') renderAuthAvatar();
    return { success: true };
  },

  /**
   * 修改密码：Supabase 没有"验旧密码再改"的接口，
   * 这里先用旧密码重新登录一次来验明正身，再更新为新密码
   */
  async changePassword(oldPassword, newPassword) {
    const notReady = this._ready();
    if (notReady) return { success: false, message: notReady };
    const user = this.user();
    if (!user) return { success: false, message: '请先登录' };
    if (!oldPassword) return { success: false, message: '请输入原密码' };

    const { error: oldErr } = await sb.auth
      .signInWithPassword({ email: user.email, password: oldPassword });
    if (oldErr) return { success: false, message: '原密码不正确' };

    const { error } = await sb.auth.updateUser({ password: newPassword });
    if (error) return { success: false, message: this._translateError(error) };
    return { success: true };
  }
};

// ============ 登录/注册弹窗 ============

let authMode = 'login'; // 'login' | 'register'

function openLoginModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  syncAuthModalUI();   // 打开时强制 UI 与 authMode 同步，杜绝"注册表单配登录按钮"的错位
  document.getElementById('auth-error').classList.add('hidden');
  modal.classList.remove('hidden');
  document.getElementById('auth-account').focus();
}

function closeLoginModal() {
  document.getElementById('auth-modal').classList.add('hidden');
}

/** 设置模式（唯一入口）：authMode 与弹窗 UI 一起切换，永不错位 */
function setAuthMode(mode) {
  authMode = mode === 'register' ? 'register' : 'login';
  syncAuthModalUI();
}

/** 把弹窗所有 UI 元素同步到当前 authMode */
function syncAuthModalUI() {
  const isLogin = authMode === 'login';

  // 选项卡高亮
  const tabLogin = document.getElementById('auth-tab-login');
  const tabRegister = document.getElementById('auth-tab-register');
  if (tabLogin && tabRegister) {
    const active = 'flex-1 py-2 rounded-full text-sm font-semibold transition-colors ai-auth-tab--active';
    const inactive = 'flex-1 py-2 rounded-full text-sm font-semibold transition-colors ai-auth-tab--idle';
    tabLogin.className = isLogin ? active : inactive;
    tabRegister.className = isLogin ? inactive : active;
  }

  document.getElementById('auth-modal-title').textContent = isLogin ? '登录账号' : '注册新账号';
  document.getElementById('auth-submit-btn').textContent = isLogin ? '登录' : '注册';
  document.getElementById('auth-switch-text').textContent = isLogin ? '还没有账号？' : '已有账号？';
  const switchLink = document.querySelector('#auth-modal a[href="#"]');
  if (switchLink) switchLink.textContent = isLogin ? '注册新账号' : '直接登录';

  // 注册模式才显示昵称、确认密码，并切换浏览器密码管理器行为
  const nicknameRow = document.getElementById('auth-nickname-row');
  if (nicknameRow) nicknameRow.classList.toggle('hidden', isLogin);
  const confirmRow = document.getElementById('auth-confirm-row');
  if (confirmRow) confirmRow.classList.toggle('hidden', isLogin);
  const pwd = document.getElementById('auth-password');
  if (pwd) pwd.setAttribute('autocomplete', isLogin ? 'current-password' : 'new-password');
}

function toggleAuthMode(e) {
  if (e && e.preventDefault) e.preventDefault();
  setAuthMode(authMode === 'login' ? 'register' : 'login');
}

/** 邮箱格式校验（Supabase Auth 目前只用邮箱，手机号登录以后接了短信服务再开） */
function validateAccount(account) {
  if (!account) return '请输入邮箱';
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(account)) {
    return '请输入有效的邮箱地址（手机号登录暂未开放）';
  }
  return null;
}

async function submitAuth(e) {
  e.preventDefault();
  const email = document.getElementById('auth-account').value.trim();
  const password = document.getElementById('auth-password').value;
  const confirm = document.getElementById('auth-confirm') ? document.getElementById('auth-confirm').value : '';
  const nickname = document.getElementById('auth-nickname') ? document.getElementById('auth-nickname').value.trim() : '';
  const errEl = document.getElementById('auth-error');
  const btn = document.getElementById('auth-submit-btn');

  errEl.classList.add('hidden');

  // 前端先校验，减少无效请求
  const accountErr = validateAccount(email);
  if (accountErr) {
    errEl.textContent = accountErr;
    errEl.classList.remove('hidden');
    return;
  }
  if (authMode === 'register') {
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      errEl.textContent = '密码需为 8-64 位，且同时包含字母和数字';
      errEl.classList.remove('hidden');
      return;
    }
    if (password !== confirm) {
      errEl.textContent = '两次输入的密码不一致';
      errEl.classList.remove('hidden');
      return;
    }
    if (nickname && !/^[一-龥a-zA-Z0-9_]{2,20}$/.test(nickname)) {
      errEl.textContent = '昵称需为 2-20 位，仅限中文、字母、数字、下划线';
      errEl.classList.remove('hidden');
      return;
    }
  }

  btn.disabled = true;
  btn.textContent = '请稍候…';

  const res = authMode === 'login'
    ? await auth.login(email, password)
    : await auth.register(email, password, nickname);

  btn.disabled = false;
  btn.textContent = authMode === 'login' ? '登录' : '注册';

  if (res.success) {
    closeLoginModal();
    showToast('欢迎，' + auth.user().username + '！', 'success');
    setTimeout(() => location.reload(), 1200);
  } else {
    errEl.textContent = res.message || '操作失败';
    errEl.classList.remove('hidden');
  }
}

/** 注入弹窗 DOM（幂等） */
function injectLoginModal() {
  if (document.getElementById('auth-modal')) return;

  const wrap = document.createElement('div');
  wrap.id = 'auth-modal';
  wrap.className = 'hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4';
  wrap.innerHTML = `
    <div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-2xl p-8 w-[380px] max-w-full">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-title-md text-title-md text-on-surface" id="auth-modal-title">登录账号</h3>
        <button type="button" class="ai-icon-btn" onclick="closeLoginModal()" aria-label="关闭">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- 登录 / 注册 选项卡：当前模式一目了然 -->
      <div class="flex gap-1 mb-6 p-1 rounded-full" style="background:var(--ai-surface-container,#eceef0);" role="tablist">
        <button type="button" id="auth-tab-login" class="ai-auth-tab--active flex-1 py-2 rounded-full text-sm font-semibold transition-colors"
                onclick="setAuthMode('login')">登录</button>
        <button type="button" id="auth-tab-register" class="ai-auth-tab--idle flex-1 py-2 rounded-full text-sm font-semibold transition-colors"
                onclick="setAuthMode('register')">注册</button>
      </div>

      <form id="auth-form" class="flex flex-col gap-4">
        <label class="flex flex-col gap-2">
          <span class="font-label-sm text-label-sm text-outline">邮箱</span>
          <input id="auth-account" class="ai-input" autocomplete="username" type="email"
                 required maxlength="50" placeholder="用于登录和找回密码"/>
        </label>
        <label class="flex flex-col gap-2 hidden" id="auth-nickname-row">
          <span class="font-label-sm text-label-sm text-outline">昵称（选填）</span>
          <input id="auth-nickname" class="ai-input" autocomplete="nickname"
                 maxlength="20" placeholder="不填则用邮箱前缀"/>
        </label>
        <label class="flex flex-col gap-2">
          <span class="font-label-sm text-label-sm text-outline">密码</span>
          <input id="auth-password" type="password" class="ai-input" autocomplete="current-password"
                 required minlength="6" maxlength="64" placeholder="至少 6 位"/>
        </label>
        <label class="flex flex-col gap-2 hidden" id="auth-confirm-row">
          <span class="font-label-sm text-label-sm text-outline">确认密码</span>
          <input id="auth-confirm" type="password" class="ai-input" autocomplete="new-password"
                 maxlength="64" placeholder="再输入一次密码"/>
          <span class="text-xs text-outline">注册密码需 8 位以上，同时包含字母和数字</span>
        </label>
        <p id="auth-error" class="text-sm text-error hidden"></p>
        <button type="submit" class="ai-button ai-button--primary ai-button--full" id="auth-submit-btn">登录</button>
      </form>

      <p class="text-sm text-on-surface-variant mt-4 text-center">
        <span id="auth-switch-text">还没有账号？</span>
        <a href="#" class="text-primary font-semibold" onclick="toggleAuthMode(event)">注册新账号</a>
      </p>
      <p class="text-xs text-outline mt-3 text-center leading-5">
        登录后学习记录同步到账号，换浏览器也不丢<br/>不登录也可以正常使用（数据只保存在本机）
      </p>
    </div>`;
  document.body.appendChild(wrap);

  document.getElementById('auth-form').addEventListener('submit', submitAuth);
  // 点击遮罩空白处关闭
  wrap.addEventListener('click', e => {
    if (e.target === wrap) closeLoginModal();
  });
}

/** 头像点击：未登录开登录弹窗，已登录开账号详情弹窗 */
function handleAvatarClick() {
  if (auth.isLoggedIn()) {
    openAccountModal();
  } else {
    setAuthMode('login');
    openLoginModal();
  }
}

/**
 * 头像渲染：
 * - 已登录 → 品牌蓝圆形 + 昵称首字母
 * - 未登录 → 渐变蓝圆形 + 白色人形图标
 */
function renderAuthAvatar() {
  const user = auth.user();
  document.querySelectorAll('img.ai-avatar').forEach(img => {
    const chip = document.createElement('div');
    if (user) {
      chip.className = 'ai-avatar';
      chip.style.cssText =
        'display:flex;align-items:center;justify-content:center;' +
        'background:#004ac6;color:#fff;font-weight:700;cursor:pointer;';
      chip.title = user.username + '（点击查看账号）';
      chip.textContent = (user.username || '?').charAt(0).toUpperCase();
    } else {
      // 未登录：胶囊按钮带"登录"二字，一眼可见
      chip.className = 'ai-avatar ai-avatar--guest';
      chip.style.cssText =
        'width:auto;border-radius:9999px;padding:0 14px;gap:6px;' +
        'font-size:14px;font-weight:600;white-space:nowrap;';
      chip.title = '点击登录 / 注册';
      chip.innerHTML =
        '<span class="material-symbols-outlined" style="font-size:20px;">person</span><span>登录</span>';
    }
    chip.addEventListener('click', handleAvatarClick);
    img.replaceWith(chip);
  });
}

// ============ 侧边栏账号入口（所有页面自动生效） ============

/** 在侧边栏底部 Settings/Help 上方注入账号入口 */
function injectAccountEntry() {
  const sidebar = document.querySelector('nav.ai-sidebar');
  if (!sidebar || document.getElementById('ai-account-entry')) return;
  const bottomUl = sidebar.querySelector('.mt-auto ul');
  if (!bottomUl) return;

  // index.html 侧边栏底部的旧占位头像去掉，避免与新入口重复
  const oldAvatar = sidebar.querySelector('img.ai-avatar');
  if (oldAvatar) {
    const wrap = oldAvatar.parentElement;
    oldAvatar.remove();
    // 头像外层容器若已空（原结构是"仅包一个头像的 div"）一并移除
    if (wrap && wrap !== sidebar && wrap.children.length === 0) {
      wrap.remove();
    }
  }

  const row = document.createElement('div');
  row.id = 'ai-account-entry';
  row.className = 'mt-stack-md';
  bottomUl.parentElement.insertBefore(row, bottomUl);
  renderAccountEntry();
}

/** 根据登录状态渲染账号入口内容 */
function renderAccountEntry() {
  const row = document.getElementById('ai-account-entry');
  if (!row) return;
  const user = auth.user();
  if (user) {
    row.innerHTML = `
      <div id="ai-account-btn" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors" title="账号详情">
        <div class="ai-avatar" style="display:flex;align-items:center;justify-content:center;background:#004ac6;color:#fff;font-weight:700;flex-shrink:0;">${(user.username || '?').charAt(0).toUpperCase()}</div>
        <div class="flex-1 min-w-0">
          <p class="text-body-md text-on-surface font-semibold truncate">${user.username}</p>
          <p class="font-label-sm text-label-sm text-outline">已登录 · 点击查看账号</p>
        </div>
      </div>`;
    document.getElementById('ai-account-btn').addEventListener('click', openAccountModal);
  } else {
    row.innerHTML = `
      <button id="ai-account-btn" class="ai-button ai-button--secondary ai-button--full">
        <span class="material-symbols-outlined">login</span><span>登录 / 注册</span>
      </button>`;
    document.getElementById('ai-account-btn').addEventListener('click', () => {
      setAuthMode('login');
      openLoginModal();
    });
  }
}

// ============ 账号详情弹窗 ============

function injectAccountModal() {
  if (document.getElementById('account-modal')) return;

  const wrap = document.createElement('div');
  wrap.id = 'account-modal';
  wrap.className = 'hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4';
  wrap.innerHTML = `
    <div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-2xl p-8 w-[380px] max-w-full">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-title-md text-title-md text-on-surface">账号详情</h3>
        <button type="button" class="ai-icon-btn" onclick="closeAccountModal()" aria-label="关闭">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="flex items-center gap-4 mb-6">
        <div id="account-modal-avatar" class="ai-avatar" style="display:flex;align-items:center;justify-content:center;background:#004ac6;color:#fff;font-weight:700;width:56px;height:56px;font-size:24px;"></div>
        <div class="min-w-0">
          <p id="account-modal-username" class="font-title-md text-title-md text-on-surface truncate"></p>
          <p class="font-label-sm text-label-sm text-outline mt-1">绑定邮箱：<span id="account-modal-bound">—</span></p>
          <p class="font-label-sm text-label-sm text-outline mt-1">注册时间：<span id="account-modal-created">—</span></p>
        </div>
      </div>

      <div class="bg-surface-container-low rounded-lg p-4 mb-6 text-sm text-on-surface-variant leading-6">
        学习记录已同步到此账号（词汇进度、练习历史、考试成绩、写作草稿）。<br/>
        未登录时的本地数据会在登录时自动合并上传。
      </div>

      <div class="flex flex-col gap-3">
        <button type="button" class="ai-button ai-button--secondary ai-button--full" onclick="closeAccountModal()">
          继续学习
        </button>
        <button type="button" id="account-logout-btn" class="ai-button ai-button--full"
                style="background:var(--ai-error,#ba1a1a);color:#fff;">
          <span class="material-symbols-outlined">logout</span><span>退出登录</span>
        </button>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  document.getElementById('account-logout-btn').addEventListener('click', () => {
    closeAccountModal();
    auth.logout();
  });
  wrap.addEventListener('click', e => {
    if (e.target === wrap) closeAccountModal();
  });
}

/** 脱敏显示：a***@qq.com */
function maskAccount(v) {
  if (!v || v.indexOf('@') < 0) return v || '—';
  const [name, domain] = v.split('@');
  return name.slice(0, 1) + '***@' + domain;
}

function openAccountModal() {
  const modal = document.getElementById('account-modal');
  const user = auth.user();
  if (!modal || !user) return;
  document.getElementById('account-modal-username').textContent = user.username;
  document.getElementById('account-modal-avatar').textContent =
    (user.username || '?').charAt(0).toUpperCase();
  document.getElementById('account-modal-bound').textContent = maskAccount(user.email);
  document.getElementById('account-modal-created').textContent = '—';
  modal.classList.remove('hidden');

  // 注册时间从 profiles 表获取
  if (sb) {
    sb.from('profiles').select('created_at').eq('id', user.id).single().then(({ data }) => {
      if (data && document.getElementById('account-modal-created')) {
        document.getElementById('account-modal-created').textContent =
          (data.created_at || '').slice(0, 10) || '—';
      }
    });
  }
}

function closeAccountModal() {
  const modal = document.getElementById('account-modal');
  if (modal) modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  injectLoginModal();
  injectAccountModal();
  injectAccountEntry();
  renderAuthAvatar();

  // 未替换的占位头像也可点击登录
  document.querySelectorAll('img.ai-avatar').forEach(img => {
    img.addEventListener('click', handleAvatarClick);
  });

  // 恢复 Supabase 会话（换浏览器后只要 Supabase 里还有会话/记住的 refresh token 就自动续上）
  auth.restoreSession().then(() => {
    renderAccountEntry();
    renderAuthAvatar();
    // 会话恢复出了登录态（换浏览器首次打开）→ 立即拉取云端数据到本地
    triggerCloudSync();
    // 未登录：自动弹出登录/注册窗口（等头像等元素渲染完再弹）
    if (!auth.isLoggedIn()) {
      setAuthMode('login');
      setTimeout(openLoginModal, 400);
    }
  });
});
