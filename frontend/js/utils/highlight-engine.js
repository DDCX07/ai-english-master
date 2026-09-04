/**
 * highlight-engine.js — 统一划线引擎（全局模块，非 ES Module，与其他 js/utils 文件一致）
 *
 * 从 reading.html 的划线逻辑抽出来的通用版本，供 AI 外刊精读等"动态渲染文章"的页面复用。
 * 与 reading.html 保持同一套交互（划线模式 → 选中文本 → 确认划线）和同一套数据格式：
 *   - localStorage 键：highlights_<文章ID>
 *   - 记录结构：{ id, text, color, time }
 * 这样以后做云端同步（user_reading_highlights 表）时，真题阅读和 AI 学案可以共用一套读写。
 *
 * 页面接入方式：
 *   1. 引入本文件，并复制 reading.html 的划线 CSS 与 HTML（取色器 / 确认条 / 列表面板）
 *   2. const engine = HighlightEngine.create({ containerId: 'lesson-content' });
 *   3. 每次往容器里渲染新文章后调用：engine.load(articleId);
 *   4. 容器 HTML 里放好划线模式/划线列表按钮，onclick 调 engine.toggleMode()/engine.togglePanel()
 */

const HighlightEngine = (function () {

  const COLOR_MAP = {
    yellow: 'hl-yellow', green: 'hl-green', blue: 'hl-blue',
    pink: 'hl-pink', orange: 'hl-orange'
  };
  const DOT_COLORS = {
    yellow: '#fdd835', green: '#66bb6a', blue: '#42a5f5',
    pink: '#ec407a', orange: '#ffa726'
  };
  const COLOR_LABELS = { yellow: '黄色', green: '绿色', blue: '蓝色', pink: '粉色', orange: '橙色' };

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  /**
   * 创建一个划线引擎实例（每个文章容器一个）
   * @param {Object} options
   * @param {string} options.containerId 正文容器的 DOM id
   * @param {Function} [options.onChange] 划线变化回调（可用于页面刷新计数等）
   */
  function create(options) {
    const inst = {
      containerId: options.containerId,
      articleId: null,
      list: [],
      mode: false,
      color: 'yellow',
      pendingRange: null,
      pendingText: ''
    };

    function container() { return document.getElementById(inst.containerId); }

    function save() {
      if (!inst.articleId) return;
      localStorage.setItem('highlights_' + inst.articleId, JSON.stringify(inst.list));
      renderPanel();
      if (typeof options.onChange === 'function') options.onChange(inst.list);
    }

    /** 常见后缀（屈折 + 派生）：region→regional、govern→government、economy→economics 等 */
    const WORD_SUFFIXES = '(?:s|es|ed|d|ing|ly|er|ers|est|or|ors|ion|ions|al|ally|ity|ness|ment|ments|ive|ance|ence|ful|ize|izes|ized|izing|ise|ises|ised|ising|ation|ations)';

    /** 词根级匹配：命中原形 + 常见变形（studies/studied/managing/regional/economics 等） */
    function wordRegex(word, flags) {
      const e = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const alts = [e + WORD_SUFFIXES + '?'];
      if (/y$/i.test(word)) {
        const stem = e.replace(/y$/i, '');
        alts.push(stem + '(?:ies|ied|ying)');   // study → studies/studied
        alts.push(stem + '(?:ic|ics)');         // economy → economic/economics
      }
      if (/e$/i.test(word)) {
        const stem = e.replace(/e$/i, '');
        alts.push(stem + '(?:ing|ed)');         // manage → managing/managed
        alts.push(stem + '(?:ally|al)');        // culture → cultural(ly)
      }
      if (/[sfh]$/i.test(word)) {
        alts.push(e.replace(/([sfh])$/i, '') + '(?:ves)');  // leaf → leaves
      }
      return new RegExp('\\b(?:' + alts.join('|') + ')\\b', flags || 'g');
    }

    /** 只替换标签外的文本段：防止后续词匹配到前面注入的 class/data-highlight-id 属性 */
    function replaceOutsideTags(html, re, repl) {
      return html.split(/(<[^>]*>)/)
        .map(part => part.charAt(0) === '<' ? part : part.replace(re, repl))
        .join('');
    }

    /** 把已存划线用正则叠回正文（先还原为渲染时的干净原文，防止重复叠加） */
    function applyToContent() {
      const el = container();
      if (!el || !el.dataset.originalContent) return;
      el.innerHTML = el.dataset.originalContent;
      inst.list.forEach(hl => {
        const cls = COLOR_MAP[hl.color] || 'hl-yellow';
        // 自动标记的词汇按词根变形匹配；手动划线仍精确匹配原文
        const re = hl.fuzzy
          ? wordRegex(hl.text, 'gi')
          : new RegExp(hl.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        el.innerHTML = replaceOutsideTags(el.innerHTML, re,
          '<span class="' + cls + '" data-highlight-id="' + hl.id + '">$&</span>');
      });
    }

    /**
     * 渲染新文章后调用：绑定文章 ID、加载该文章已有划线并应用。
     * 注意：必须在正文已经渲染进容器之后调用（此刻 innerHTML 就是干净原文）。
     */
    function load(articleId) {
      inst.articleId = articleId;
      try {
        inst.list = JSON.parse(localStorage.getItem('highlights_' + articleId)) || [];
      } catch (e) { inst.list = []; }

      // 关闭上一篇文章遗留的划线模式与浮层
      if (inst.mode) toggleMode();
      closePanel();

      const el = container();
      if (!el) return;
      el.dataset.originalContent = el.innerHTML;
      applyToContent();
      renderPanel();
      if (typeof options.onChange === 'function') options.onChange(inst.list);
    }

    // ============ 划线模式 ============

    function toggleMode() {
      inst.mode = !inst.mode;
      const el = container();
      const btn = document.getElementById('highlight-toggle-btn');
      const picker = document.getElementById('highlight-color-picker');
      if (inst.mode) {
        if (el) el.classList.add('mark-mode');
        if (btn) btn.classList.add('highlight-active');
        if (picker) picker.classList.add('open');
        showToast('划线模式已开启：选中文本即可高亮标注', 'info');
      } else {
        if (el) el.classList.remove('mark-mode');
        if (btn) btn.classList.remove('highlight-active');
        if (picker) picker.classList.remove('open');
        hideToolbar();
      }
    }

    function togglePanel() {
      const panel = document.getElementById('highlight-panel');
      if (panel) panel.classList.toggle('open');
    }

    function closePanel() {
      const panel = document.getElementById('highlight-panel');
      if (panel) panel.classList.remove('open');
    }

    // ============ 划线列表面板 ============

    function renderPanel() {
      const body = document.getElementById('highlight-panel-body');
      const countEl = document.getElementById('highlight-count');
      if (!body) return;
      if (countEl) countEl.textContent = '(' + inst.list.length + ')';
      const statsText = document.getElementById('highlight-stats-text');
      if (statsText) statsText.textContent = '共 ' + inst.list.length + ' 条划线';

      if (!inst.list.length) {
        body.innerHTML = '<div id="highlight-panel-empty">暂无划线，点击划线模式按钮开始标注</div>';
        return;
      }
      body.innerHTML = inst.list.map(hl => {
        const cls = COLOR_MAP[hl.color] || 'hl-yellow';
        return `
        <div class="highlight-item ${cls}" id="hl-item-${hl.id}">
          <div class="highlight-item-text">${escapeHtml(hl.text)}</div>
          <div class="highlight-item-meta">
            <span>${COLOR_LABELS[hl.color] || '黄色'} · ${hl.time || ''}</span>
            <span class="highlight-item-delete" onclick="aiHighlight.deleteHighlight('${hl.id}')">删除</span>
          </div>
        </div>`;
      }).join('');
    }

    // ============ 选词捕获（mouseup → 确认条） ============

    document.addEventListener('mouseup', function (e) {
      if (!inst.mode) return;

      // 点在确认条/取色面板/列表面板上：不是重新划选，保留待确认的选区
      const toolbar = document.getElementById('highlight-toolbar');
      const picker = document.getElementById('highlight-color-picker');
      if ((toolbar && toolbar.contains(e.target)) || (picker && picker.contains(e.target))) {
        return;
      }

      const el = container();
      if (!el || !el.contains(e.target)) { hideToolbar(); return; }

      const selection = window.getSelection();
      const text = selection.toString().trim();
      if (text.length < 2) { hideToolbar(); return; }

      // 选区必须完整落在正文容器内
      let node = selection.anchorNode, inContent = false;
      while (node) {
        if (node === el) { inContent = true; break; }
        node = node.parentNode;
      }
      if (!inContent) { hideToolbar(); return; }

      showToolbar(e.clientX, e.clientY);
    });

    function showToolbar(x, y) {
      const toolbar = document.getElementById('highlight-toolbar');
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        inst.pendingRange = sel.getRangeAt(0).cloneRange(); // 抓拍副本，点确认时用
        inst.pendingText = sel.toString().trim();
      }
      toolbar.style.display = 'block';
      toolbar.style.left = Math.min(x, window.innerWidth - 180) + 'px';
      toolbar.style.top = (y - 40) + 'px';
    }

    function hideToolbar() {
      const toolbar = document.getElementById('highlight-toolbar');
      if (toolbar) toolbar.style.display = 'none';
      inst.pendingRange = null;
      inst.pendingText = '';
    }

    /** 对抓拍的选区应用高亮（跨元素选区自动降级为 extractContents 包裹） */
    function applyHighlight() {
      const text = inst.pendingText;
      const range = inst.pendingRange;
      if (!range || text.length < 2) { hideToolbar(); return; }

      const selection = window.getSelection();
      const spanId = 'hl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      let span;

      try {
        span = document.createElement('span');
        span.className = COLOR_MAP[inst.color] || 'hl-yellow';
        span.dataset.highlightId = spanId;
        range.surroundContents(span);
      } catch (e) {
        const fragment = range.extractContents();
        span = document.createElement('span');
        span.className = COLOR_MAP[inst.color] || 'hl-yellow';
        span.dataset.highlightId = spanId;
        span.appendChild(fragment);
        range.insertNode(span);
      }

      inst.list.push({
        id: spanId,
        text: text,
        color: inst.color,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      });
      save();

      selection.removeAllRanges();
      hideToolbar();
      showToast('划线标注已保存', 'success');
    }

    /** 删除单条划线（列表面板的"删除"） */
    function deleteHighlight(id) {
      inst.list = inst.list.filter(h => h.id !== id);
      save();
      const el = container();
      if (el) {
        const mark = el.querySelector('[data-highlight-id="' + id + '"]');
        if (mark) {
          const parent = mark.parentNode;
          parent.replaceChild(document.createTextNode(mark.textContent), mark);
          parent.normalize();
        }
      }
      showToast('划线已删除', 'info');
    }

    /** 清空当前文章所有划线 */
    function clearAll() {
      if (!inst.list.length) return;
      if (!confirm('确定要清空当前文章的所有划线吗？')) return;
      inst.list = [];
      save();
      applyToContent();
      hideToolbar();
      showToast('已清空所有划线', 'info');
    }

    // ============ 自动标记词汇（AI 词汇表一键划黄） ============

    /**
     * 把词表里的词在正文中批量标黄（按文本去重：已有同文本划线的词跳过）
     * @param {string[]} words 词汇列表
     * @returns {number} 本次新增标记数
     */
    function autoMark(words) {
      if (!words || !words.length) { showToast('该学案没有词汇列表', 'info'); return 0; }
      const lower = s => (s || '').toLowerCase();
      let added = 0;
      const missing = [];
      words.forEach(w => {
        const word = (w || '').trim();
        if (word.length < 2) return;
        // 与已有划线按文本去重（大小写不敏感）
        if (inst.list.some(h => lower(h.text) === lower(word))) return;
        // 词必须真的在正文里出现（含变形），否则会产生一条永远匹配不上的死划线
        if (!wordRegex(word, 'i').test(container().textContent)) {
          missing.push(word);
          return;
        }
        inst.list.push({
          id: 'hl_auto_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
          text: word,
          color: 'yellow',
          fuzzy: true,   // 词根级匹配：正文里的复数/时态/派生变形也能标上
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        });
        added++;
      });
      if (added > 0) {
        save();
        applyToContent();
        showToast(missing.length
          ? '已标记 ' + added + ' 个词汇；' + missing.join('、') + ' 在文中未以可识别形式出现'
          : '已自动标记 ' + added + ' 个词汇', 'success');
      } else if (missing.length) {
        showToast('这些词在文中没有以可识别的形式出现：' + missing.join('、'), 'info');
      } else {
        showToast('词汇都已标记过', 'info');
      }
      return added;
    }

    // ============ 取色器/确认条事件（创建实例时绑定一次） ============

    document.querySelectorAll('#highlight-color-picker .color-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#highlight-color-picker .color-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        inst.color = this.dataset.color;
        const dot = document.getElementById('toolbar-color-dot');
        if (dot) dot.style.background = DOT_COLORS[inst.color] || DOT_COLORS.yellow;
      });
    });

    // 在确认条/取色面板上按下鼠标时阻止默认行为，否则浏览器会清空文字选区
    document.addEventListener('mousedown', function (e) {
      const toolbar = document.getElementById('highlight-toolbar');
      const picker = document.getElementById('highlight-color-picker');
      if ((toolbar && toolbar.contains(e.target)) || (picker && picker.contains(e.target))) {
        e.preventDefault();
        return;
      }
      if (toolbar && toolbar.style.display === 'block' && !toolbar.contains(e.target)) {
        hideToolbar();
      }
    });

    return {
      load, toggleMode, togglePanel, closePanel,
      applyHighlight, deleteHighlight, clearAll, autoMark,
      get articleId() { return inst.articleId; },
      get list() { return inst.list; }
    };
  }

  return { create };
})();
