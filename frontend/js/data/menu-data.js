/**
 * 菜单配置数据
 * Menu Configuration Data
 *
 * 用法：
 * 在页面中引入这个文件，然后使用 renderMenu() 函数渲染菜单
 */

const menuItems = [
  // 主要学习模块
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    path: 'index.html',
    category: 'main'
  },
  {
    id: 'vocabulary',
    label: 'Vocabulary',
    icon: 'menu_book',
    path: 'vocabulary.html',
    category: 'main'
  },
  {
    id: 'listening',
    label: 'Listening',
    icon: 'headset',
    path: 'listening.html',
    category: 'main'
  },
  {
    id: 'reading',
    label: 'Reading',
    icon: 'article',
    path: 'reading.html',
    category: 'main'
  },
  {
    id: 'writing',
    label: 'Writing',
    icon: 'edit_note',
    path: 'writing.html',
    category: 'main'
  },
  {
    id: 'translation',
    label: 'Translation',
    icon: 'translate',
    path: 'translation.html',
    category: 'main'
  },
  {
    id: 'grammar',
    label: 'Grammar',
    icon: 'school',
    path: 'grammar.html',
    category: 'main'
  },
  {
    id: 'oral-practice',
    label: 'Oral Practice',
    icon: 'record_voice_over',
    path: 'oral.html',
    category: 'main'
  },
  {
    id: 'ai-lesson',
    label: 'AI Reading',
    icon: 'auto_awesome',
    path: 'ai-lesson.html',
    category: 'main'
  },
  // 练习模块
  {
    id: 'mock-exam',
    label: 'Mock Exam',
    icon: 'quiz',
    path: 'mock-exam.html',
    category: 'practice'
  },
  {
    id: 'word-bank',
    label: 'Word Bank',
    icon: 'bookmarks',
    path: 'word-bank.html',
    category: 'practice'
  },
  {
    id: 'incorrect-book',
    label: 'Incorrect Book',
    icon: 'error',
    path: 'incorrect.html',
    category: 'practice'
  },
  {
    id: 'notebook',
    label: 'Notebook',
    icon: 'note',
    path: 'notebook.html',
    category: 'practice'
  }
];

// 设置当前激活的菜单项
let currentActivePage = 'dashboard'; // 默认是dashboard

/**
 * 设置当前页面
 * @param {string} pageId - 页面ID
 */
function setActivePage(pageId) {
  currentActivePage = pageId;
  renderMenu();
}

/**
 * 渲染菜单
 * @param {string} containerId - 容器ID
 */
function renderMenu(containerId = 'ai-menu-list') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = menuItems
    .filter(item => item.category === 'main')
    .map(item => `
      <li>
        <a class="ai-menu-item ${item.id === currentActivePage ? 'ai-menu-item--active' : ''}"
           href="${item.path}"
           data-page="${item.id}">
          <span class="material-symbols-outlined">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      </li>
    `)
    .join('');

  // 已上线的页面（其余页面仍在开发中）
  const availablePages = [
    'index.html', 'vocabulary.html', 'listening.html',
    'reading.html', 'grammar.html', 'mock-exam.html', 'writing.html',
    'translation.html', 'oral.html', 'setting.html', 'ai-lesson.html'
  ];

  // 添加点击事件
  container.querySelectorAll('.ai-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.getAttribute('href');

      if (availablePages.includes(page)) {
        // 页面已存在，正常跳转
        window.location.href = page;
      } else {
        // 页面还在开发中
        if (typeof showToast === 'function') {
          showToast('该页面正在开发中，敬请期待！', 'info');
        }
      }
    });
  });
}

// 页面加载完成后自动渲染菜单
document.addEventListener('DOMContentLoaded', () => {
  // 根据当前URL自动设置激活页面
  // 文件名与菜单 id 不一致的在此映射（index.html → dashboard，oral.html → oral-practice）
  const pageAlias = { 'index': 'dashboard', 'oral': 'oral-practice', 'setting': 'settings' };
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  if (currentPage) {
    currentActivePage = pageAlias[currentPage] || currentPage;
  }
  renderMenu();
});
