/**
 * 建议箱模块
 *
 * 功能：
 * - 侧边栏「建议箱」按钮点击 → 弹出建议弹窗（所有页面自动生效）
 * - 用户提交的优化建议写入 Supabase site_suggestions 表
 * - 站长在 Supabase 控制台 → Table Editor → site_suggestions 查看
 *
 * 依赖：helpers.js（showToast）、supabase-client.js（全局 sb）、auth.js（auth，选填）
 */

/** 注入建议弹窗 DOM（幂等） */
function injectSuggestionModal() {
  if (document.getElementById('suggestion-modal')) return;

  const wrap = document.createElement('div');
  wrap.id = 'suggestion-modal';
  wrap.className = 'hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4';
  wrap.innerHTML = `
    <div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-2xl p-8 w-[420px] max-w-full">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-title-md text-title-md text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">mail</span>建议箱
        </h3>
        <button type="button" class="ai-icon-btn" onclick="closeSuggestionModal()" aria-label="关闭">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <form id="suggestion-form" class="flex flex-col gap-4">
        <label class="flex flex-col gap-2">
          <span class="font-label-sm text-label-sm text-outline">你的建议或遇到的问题</span>
          <textarea id="suggestion-content" class="ai-input" rows="5" required
                    minlength="5" maxlength="1000"
                    placeholder="例如：希望阅读页增加生词本导入功能……（5~1000 字）"></textarea>
        </label>
        <label class="flex flex-col gap-2">
          <span class="font-label-sm text-label-sm text-outline">联系方式（选填）</span>
          <input id="suggestion-contact" class="ai-input" type="text"
                 maxlength="100" placeholder="邮箱 / 微信，方便回复你"/>
        </label>
        <p id="suggestion-error" class="text-sm text-error hidden"></p>
        <button type="submit" class="ai-button ai-button--primary ai-button--full" id="suggestion-submit-btn">提交建议</button>
        <p class="text-xs text-outline mt-1 text-center leading-5">
          每一条建议站长都会认真看，感谢你的反馈！
        </p>
      </form>
    </div>`;
  document.body.appendChild(wrap);

  document.getElementById('suggestion-form').addEventListener('submit', submitSuggestion);
  // 点击遮罩空白处关闭
  wrap.addEventListener('click', e => {
    if (e.target === wrap) closeSuggestionModal();
  });
}

function openSuggestionModal() {
  injectSuggestionModal();
  // 已登录用户自动带上注册邮箱，方便回复
  const user = (typeof auth !== 'undefined' && auth.isLoggedIn()) ? auth.user() : null;
  const contact = document.getElementById('suggestion-contact');
  if (user && user.email && !contact.value) contact.value = user.email;
  document.getElementById('suggestion-error').classList.add('hidden');
  document.getElementById('suggestion-modal').classList.remove('hidden');
}

function closeSuggestionModal() {
  const modal = document.getElementById('suggestion-modal');
  if (modal) modal.classList.add('hidden');
}

/** 提交建议到 Supabase site_suggestions 表 */
async function submitSuggestion(e) {
  e.preventDefault();
  const content = document.getElementById('suggestion-content').value.trim();
  const contact = document.getElementById('suggestion-contact').value.trim();
  const errEl = document.getElementById('suggestion-error');
  const btn = document.getElementById('suggestion-submit-btn');

  if (content.length < 5) {
    errEl.textContent = '建议内容太短了，至少写 5 个字';
    errEl.classList.remove('hidden');
    return;
  }
  if (!sb) {
    errEl.textContent = '网络服务未连接，请稍后再试';
    errEl.classList.remove('hidden');
    return;
  }

  btn.disabled = true;
  btn.textContent = '提交中…';
  errEl.classList.add('hidden');

  const user = (typeof auth !== 'undefined' && auth.isLoggedIn()) ? auth.user() : null;
  const row = {
    content,
    contact: contact || null,
    user_id: user ? user.id : null,
    page: location.pathname.split('/').pop() || 'index.html'
  };

  const { error } = await sb.from('site_suggestions').insert(row);

  btn.disabled = false;
  btn.textContent = '提交建议';

  if (error) {
    errEl.textContent = /Failed to fetch|NetworkError/i.test(error.message || '')
      ? '网络异常，请稍后再试'
      : '提交失败，请稍后再试';
    errEl.classList.remove('hidden');
    return;
  }

  document.getElementById('suggestion-content').value = '';
  closeSuggestionModal();
  showToast('感谢你的建议，站长已经收到！', 'success');
}

// 绑定侧边栏「建议箱」按钮（按钮在每个页面静态存在，DOM 就绪后绑定）
(function initSuggestionBox() {
  const bind = () => {
    const btn = document.getElementById('suggestion-box-btn');
    if (btn) btn.addEventListener('click', e => {
      e.preventDefault();
      openSuggestionModal();
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
