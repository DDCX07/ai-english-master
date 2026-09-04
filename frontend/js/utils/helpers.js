/**
 * 工具函数库
 * Utility Functions
 */

/**
 * 格式化数字（加逗号分隔）
 * @param {number} num - 数字
 * @returns {string} 格式化后的字符串
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 格式化日期
 * @param {Date|string|number} date - 日期
 * @param {string} format - 格式 'YYYY-MM-DD' 或 'MM/DD'
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
}

/**
 * 计算两个日期之间的天数差
 * @param {Date|string} date1 - 日期1
 * @param {Date|string} date2 - 日期2
 * @returns {number} 天数差
 */
function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = d2 - d1;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * 显示提示消息（Toast）
 * @param {string} message - 消息内容
 * @param {string} type - 类型 'success' | 'error' | 'info'
 */
function showToast(message, type = 'info') {
  // 创建toast元素
  const toast = document.createElement('div');
  toast.className = `ai-toast ai-toast--${type}`;
  toast.textContent = message;

  // 添加样式
  Object.assign(toast.style, {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ba1a1a' : '#004ac6',
    color: 'white',
    fontWeight: '600',
    zIndex: '1000',
    animation: 'slideIn 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  });

  document.body.appendChild(toast);

  // 3秒后自动消失
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * 确认对话框
 * @param {string} message - 确认消息
 * @returns {Promise<boolean>} 用户是否确认
 */
function confirm(message) {
  return Promise.resolve(window.confirm(message));
}

/**
 * 获取随机元素
 * @param {Array} array - 数组
 * @returns {*} 随机元素
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 打乱数组
 * @param {Array} array - 数组
 * @returns {Array} 打乱后的新数组
 */
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, delay = 300) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func.apply(this, args);
  };
}

/**
 * 本地存储工具
 */
const storage = {
  /**
   * 保存数据到本地存储
   * @param {string} key - 键名
   * @param {*} value - 值
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('保存数据失败:', e);
    }
  },

  /**
   * 从本地存储获取数据
   * @param {string} key - 键名
   * @param {*} defaultValue - 默认值
   * @returns {*} 保存的值
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('读取数据失败:', e);
      return defaultValue;
    }
  },

  /**
   * 删除本地存储的数据
   * @param {string} key - 键名
   */
  remove(key) {
    localStorage.removeItem(key);
  }
};

// 用户学习数据的读写已迁移到 js/utils/api.js（统一数据层）
// 页面里请使用 api.getStats() / api.addRecord() / api.recordWord()，
// 不要再往 localStorage 里直接写学习数据。

// 在页面加载时添加动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
