/**
 * 移动端适配：汉堡菜单 + 抽屉式侧边栏
 *
 * 页面只需引入这个文件（无需改 HTML）：
 * - 手机（<768px）时侧边栏默认收起，点右上角汉堡按钮滑出
 * - 展开时显示半透明遮罩，点遮罩或菜单项自动收起
 * - 主内容和顶栏自动变为全宽
 * 样式定义在 css/components.css 的 "移动端抽屉侧边栏" 部分
 */

const MOBILE_BREAKPOINT = 768;

function isMobileScreen() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

/**
 * 打开/收起侧边栏
 * @param {boolean|undefined} force 不传 = 切换状态
 */
function toggleSidebar(force) {
  const sidebar = document.querySelector('nav.ai-sidebar');
  const overlay = document.getElementById('ai-sidebar-overlay');
  if (!sidebar || !overlay) return;

  const open = typeof force === 'boolean'
    ? force
    : !sidebar.classList.contains('ai-sidebar--open');

  sidebar.classList.toggle('ai-sidebar--open', open);
  overlay.classList.toggle('hidden', !open);
}

// 注入汉堡按钮和遮罩（幂等，重复调用无副作用）
function injectMobileNav() {
  if (document.getElementById('ai-hamburger')) return;

  const header = document.querySelector('header');
  if (!header) return;

  // 汉堡按钮：插到顶栏最前面，只在手机上显示（样式见 components.css）
  const btn = document.createElement('button');
  btn.id = 'ai-hamburger';
  btn.className = 'ai-icon-btn ai-hamburger';
  btn.setAttribute('aria-label', '打开菜单');
  btn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
  btn.onclick = () => toggleSidebar();
  header.insertBefore(btn, header.firstChild);

  // 半透明遮罩：盖住内容区，点击收起
  const overlay = document.createElement('div');
  overlay.id = 'ai-sidebar-overlay';
  overlay.className = 'ai-sidebar-overlay hidden';
  overlay.onclick = () => toggleSidebar(false);
  document.body.appendChild(overlay);

  // 点击任意菜单项后自动收起（页面跳转前的视觉收尾）
  document.querySelectorAll('nav.ai-sidebar a').forEach(a => {
    a.addEventListener('click', () => toggleSidebar(false));
  });
}

// 旋转屏幕 / 拖大窗口回到桌面尺寸时，收起抽屉
window.addEventListener('resize', () => {
  if (!isMobileScreen()) toggleSidebar(false);
});

document.addEventListener('DOMContentLoaded', injectMobileNav);

/**
 * 全局外观偏好（在设置页 setting.html 修改，全站生效）：
 * - 字体大小：document.documentElement.style.fontSize（rem 布局整体缩放）
 * - 夜间模式：html 上加 dark-mode / dark 类
 * 设置存在 localStorage 的 userSettings 里，未设置时用默认值
 */
function applyGlobalAppearance() {
  if (typeof storage === 'undefined') return;
  let s = {};
  try { s = storage.get('userSettings', {}) || {}; } catch (e) { s = {}; }

  const FONT_SIZES = { small: '14px', medium: '16px', large: '18px' };
  if (s.fontSize && FONT_SIZES[s.fontSize]) {
    document.documentElement.style.fontSize = FONT_SIZES[s.fontSize];
  }
  // 用 toggle 而不是 add：恢复云端设置时可反复调用，能开也能关
  document.documentElement.classList.toggle('dark-mode', !!s.darkMode);
  document.documentElement.classList.toggle('dark', !!s.darkMode);   // Tailwind dark: 变体
}
document.addEventListener('DOMContentLoaded', applyGlobalAppearance);

// 登录后从云端恢复了设置偏好（api.js syncOnLogin）→ 当前页面立即套用
document.addEventListener('cloud-settings-applied', applyGlobalAppearance);

/**
 * 备考模式：把侧边栏 Logo 下的 "CET-x Prep Mode" 副标题变成可点击的切换开关
 * 点击在四级/六级之间切换，并通过 prep-level-change 事件通知各页面刷新
 */
function initPrepModeLabel() {
  const h1 = document.querySelector('nav.ai-sidebar h1');
  if (!h1 || typeof api === 'undefined') return;

  const label = h1.parentElement.querySelector('p');
  if (!label) return;

  label.id = 'ai-prep-label';
  label.style.cursor = 'pointer';
  label.title = '点击切换四级 / 六级备考模式';
  label.textContent = api.getPrepLevel() + ' Prep Mode';
  label.onclick = () => {
    api.setPrepLevel(api.getPrepLevel() === 'CET-6' ? 'CET-4' : 'CET-6');
    if (typeof showToast === 'function') {
      showToast('已切换到' + (api.getPrepLevel() === 'CET-6' ? '六级' : '四级') + '备考模式', 'success');
    }
  };

  // 其他入口（主页卡片、阅读页筛选）切换时，同步更新这个标签
  document.addEventListener('prep-level-change', () => {
    label.textContent = api.getPrepLevel() + ' Prep Mode';
  });
}
document.addEventListener('DOMContentLoaded', initPrepModeLabel);

// 兼容模块化导出（供 Node 环境测试用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { isMobileScreen, toggleSidebar, injectMobileNav, initPrepModeLabel };
}
