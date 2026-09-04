/**
 * 中英文界面切换（i18n）
 * Chinese / English UI Language Toggle
 *
 * 用法：
 * 1. 在页面中引入这个文件（放在 helpers.js 之后）
 * 2. 页面右上角会自动出现 "中文 / EN" 切换按钮
 * 3. 选择会保存在浏览器中，下次打开自动生效
 *
 * 原理：
 * - 页面里所有界面文字（英文）和这里的词典做精确匹配，匹配上就替换成中文
 * - 学习内容（单词、文章、题目、原文）不会被动到
 * - 动态生成的内容（题目卡片、菜单等）通过 MutationObserver 自动翻译
 * - 想翻译新的文字，往下面 i18nPhrases 里加一条 "English": "中文" 即可
 */

// ============ 词典：英文 → 中文 ============
const i18nPhrases = {
  // 页面标题
  'AI English Master - Dashboard': 'AI English Master - 仪表盘',
  'AI English Master - Vocabulary': 'AI English Master - 词汇学习',
  'AI English Master - Listening Practice': 'AI English Master - 听力练习',
  'AI English Master - Reading Comprehension': 'AI English Master - 阅读理解',
  'AI English Master - Mock Exam': 'AI English Master - 模拟考试',
  'AI English Master - Grammar Learning': 'AI English Master - 语法学习',
  'AI English Master - Writing Practice': 'AI English Master - 写作练习',
  'AI English Master - Translation Practice': 'AI English Master - 翻译练习',
  'AI English Master - Oral Practice': 'AI English Master - 口语练习',

  // 侧边栏 / 通用
  'CET-6 Prep Mode': 'CET-6 备考模式',
  'Mock Exam Mode': '模拟考试模式',
  'Grammar Learning': '语法学习',
  'Dashboard': '仪表盘',
  'Vocabulary': '词汇',
  'Listening': '听力',
  'Reading': '阅读',
  'Writing': '写作',
  'Translation': '翻译',
  'Grammar': '语法',
  'Oral Practice': '口语练习',
  'Mock Exam': '模拟考试',
  'Word Bank': '词库',
  'Incorrect Book': '错题本',
  'Notebook': '笔记本',
  'Settings': '设置',
  'Help': '帮助',
  'Suggestion Box': '建议箱',
  'Start Mock Exam': '开始模拟考试',
  'Submit Exam': '提交考试',
  'Start Grammar Quiz': '开始语法练习',

  // 仪表盘
  'Study Plan': '学习计划',
  'Mock Tests': '模拟测试',
  'Resources': '学习资源',
  'Search...': '搜索...',
  'Upgrade Pro': '升级专业版',
  "Today's Streak": '今日打卡',
  'Cumulative Words': '累计单词',
  'Exam Countdown (CET-6)': '考试倒计时（CET-6）',
  'Exam Countdown': '考试倒计时',
  'DAYS': '天',
  'DAYS LEFT': '天后考试',
  'WORDS': '个单词',
  'Core Modules': '核心模块',
  'Listening Practice': '听力练习',
  'Daily dictation and comprehension exercises.': '每日听写与理解练习。',
  'Reading Comprehension': '阅读理解',
  'Long-form articles and rapid reading tests.': '长篇文章与快速阅读测试。',
  'Translation Practice': '翻译练习',
  'Smart translation with AI feedback.': 'AI 智能翻译批改。',
  "Today's Tasks": '今日任务',
  'Edit goals': '编辑目标',

  // 词汇页
  'Vocabulary Learning': '词汇学习',
  'My Progress': '我的进度',
  "Today's Words": '今日单词',
  'Word List': '单词列表',
  'Word': '单词',
  'Meaning': '释义',
  'Status': '状态',
  'Action': '操作',
  'Learning': '学习中',
  'Pending': '待学习',
  'Hard': '较难',
  'Normal': '一般',
  'Easy': '简单',
  'Practice': '练习',

  // 阅读页
  'Submit Answers': '提交答案',
  'Show Explanation': '显示解析',
  'Comprehension Questions': '理解题',
  'Your Results': '你的成绩',
  'Try Again': '再试一次',

  // 写作页
  'Writing Practice': '写作练习',
  'My Writings': '我的写作',
  'Choose a Writing Task': '选择写作任务',
  'Your Essay': '你的作文',
  'Submit Writing': '提交作文',
  'Feedback': '写作反馈',
  'Sample Essay': '范文',
  'Show Sample Essay': '查看范文',
  'Hide Sample Essay': '收起范文',
  'Outline': '写作提纲',
  'Useful Phrases': '常用表达',
  'Writing Tips': '写作提示',
  'Choose Another Task': '选择其他题目',
  'Completed': '已完成',

  // 翻译页
  'My Records': '我的记录',
  'Show Hint': '显示提示',
  'Hide Hint': '收起提示',
  'Skip': '跳过',
  'Check Answer': '核对答案',
  'Score': '得分',
  'Key Expressions': '关键表达',
  'Reference Translation': '参考译文',
  'Translation Notes': '考点说明',
  'Next Sentence': '下一句',
  'Level:': '级别：',
  'Topic:': '话题：',

  // 口语页
  'Listen First': '先听示范',
  'Next One': '下一个',
  'Record Again': '再录一次',

  // 模拟考试页
  'Question Navigation': '题目导航',
  'Answered:': '已答：',
  'CET-6 Mock Exam': 'CET-6 模拟考试',
  'Reading · Real Exams': '仔细阅读 · 真题',
  'CET-6 Mock Examination': 'CET-6 全真模拟考试',
  'Exam Information': '考试信息',
  'Duration: 40 minutes': '考试时长：40 分钟',
  'Level: CET-6': '级别：CET-6',
  'Passing Score: 60%': '及格分数：60%',
  'Instructions:': '考试说明：',
  'Start Exam': '开始考试',
  'Previous': '上一题',
  'Next': '下一题',
  'Finish': '完成考试',
  'Exam Completed!': '考试完成！',
  'Your Score': '你的得分',
  'Correct': '答对',
  'Time Used': '用时',
  'Review Answers': '查看答案',
  'Excellent!': '优秀！',
  'Good Job!': '干得好！',
  'Keep Trying!': '继续努力！',
  'Flagged': '已标记',

  // 语法页
  'English Grammar': '英语语法',
  'Search grammar topics...': '搜索语法主题...',
  'Grammar Modules': '语法模块',
  'Grammar Topics': '语法主题',
  'All Topics': '全部主题',
  'Tenses': '时态',
  'Subjunctive': '虚拟语气',
  'Passive Voice': '被动语态',
  'Relative Clauses': '定语从句',
  'Conditionals': '条件句',
  '-ing vs to': '动名词与不定式',
  'Articles': '冠词',
  'Prepositions': '介词',

  // 语法专题名称（grammar-data.js 里的 title，跟随语言切换）
  'Present Simple': '一般现在时',
  'Present Continuous': '现在进行时',
  'Past Simple': '一般过去时',
  'Present Perfect': '现在完成时',
  'Past Perfect': '过去完成时',
  'Present Subjunctive': '现在虚拟语气',
  'Past Subjunctive (Type 2 Conditional)': '与现在事实相反的虚拟语气（第二条件句）',
  'Past Perfect Subjunctive (Type 3 Conditional)': '与过去事实相反的虚拟语气（第三条件句）',
  'Present Passive': '一般被动语态',
  'Modal Passive': '情态动词被动语态',
  'Defining Relative Clauses': '限制性定语从句',
  'Non-defining Relative Clauses': '非限制性定语从句',
  'Zero Conditional': '零条件句',
  'First Conditional': '第一条件句',
  'Second Conditional': '第二条件句',
  'Third Conditional': '第三条件句',
  'Verbs followed by Gerund (-ing)': '后接动名词（-ing）的动词',
  'Verbs followed by Infinitive (to + verb)': '后接不定式（to do）的动词',
  'Verbs with both forms (different meanings)': '两种形式皆可但含义不同的动词',
  'Definite Article (the)': '定冠词（the）',
  'Indefinite Articles (a/an)': '不定冠词（a/an）',
  'Zero Article': '零冠词',
  'Time Prepositions': '时间介词',
  'Place Prepositions': '地点方位介词',
  'Description': '详细说明',
  'Examples': '例句',
  'Key Points': '要点',
  'Common Mistakes': '常见错误',
  'Mark as Learned': '标记为已学',
  'Practice This': '练习此语法',
  'No examples available.': '暂无例句。',
  'No key points available.': '暂无要点。',
  'No common mistakes listed.': '暂无常见错误。',

  // AI 学案页（AI 外刊精读）
  'AI Reading': 'AI 外刊精读',
  'AI Reading Lesson': 'AI 外刊精读',
  'AI English Master - AI Reading Lesson': 'AI English Master - AI 外刊精读',
  'My Lessons': '我的学案',
  "Generate Today's Lesson": '生成今日学案',
  'Generating your lesson...': '正在生成你的学案…',
  'Generation Failed': '生成失败',
  'Retry': '重试',
  'Back': '返回',
  'Article': '文章原文',
  'Key Sentence': '核心句子',
  'Another Level': '换个难度',
  'Recent Lessons': '最近学案',
  'Source:': '来源：',

  // 听力页
  'All': '全部',
  'Conversations': '对话',
  'Lectures': '讲座',
  'News': '新闻',
  'Total Completed': '已完成练习',
  'LESSONS': '篇',
  'Accuracy Rate': '正确率',
  'AVERAGE': '平均',
  'Total Time': '总用时',
  'PRACTICED': '练习时长',
  'Current Streak': '连续打卡',
  'Choose Your Practice': '选择练习材料',
  'Back to List': '返回列表',
  'Speed:': '语速：',
  'Questions': '题目',
  'Transcript': '听力原文',
  'Choose Another': '选择其他练习',
  'Stats': '统计',
  'Now Reading · TTS Mode': '正在朗读 · 语音模式',
  'Backward 10s': '后退10秒',
  'Forward 10s': '前进10秒',
  'Play/Pause': '播放/暂停',
  'Mute': '静音',

  // 无障碍标签
  'Notifications': '通知',
  'History': '历史记录',
  'Sound': '发音',
  'Search': '搜索'
};

// ============ 带数字的规则（如 "4 questions" → "4 道题"） ============
const i18nRulesEn2Zh = [
  { re: /^(\d+) questions$/, rep: '$1 道题' },
  { re: /^(\d+) topics$/, rep: '$1 个主题' },
  { re: /^(\d+) examples$/, rep: '$1 个例句' },
  { re: /^Question (\d+)$/, rep: '第 $1 题' },
  { re: /^(\d+)\/(\d+) completed$/, rep: '已完成 $1/$2' },
  { re: /^(\d+) min$/, rep: '$1 分钟' },
  { re: /^(\d+) words$/, rep: '$1 词' },
  { re: /^Total Questions: (\d+)$/, rep: '题目总数：$1' }
];

// 反向规则（切换回英文时使用）
const i18nRulesZh2En = [
  { re: /^(\d+) 道题$/, rep: '$1 questions' },
  { re: /^(\d+) 个主题$/, rep: '$1 topics' },
  { re: /^(\d+) 个例句$/, rep: '$1 examples' },
  { re: /^第 (\d+) 题$/, rep: 'Question $1' },
  { re: /^已完成 (\d+)\/(\d+)$/, rep: '$1/$2 completed' },
  { re: /^(\d+) 分钟$/, rep: '$1 min' },
  { re: /^(\d+) 词$/, rep: '$1 words' },
  { re: /^题目总数：(\d+)$/, rep: 'Total Questions: $1' }
];

// 反向词典：中文 → 英文（切换回英文时使用）
const i18nReverse = {};
Object.keys(i18nPhrases).forEach(en => {
  i18nReverse[i18nPhrases[en]] = en;
});

// ============ 核心逻辑 ============
let i18nLang = 'en';
let i18nTranslating = false;

try {
  // 默认中文（侧边栏等界面文字自动翻译成中文）；用户点右上角 "EN" 切换后会记住选择
  i18nLang = localStorage.getItem('siteLang') || 'zh';
} catch (e) { /* localStorage 不可用时默认中文 */ }

// 获取当前语言
function getLang() {
  return i18nLang;
}

// 翻译一段文字（找不到对应翻译时原样返回）
function translateText(text) {
  if (!text) return text;
  const trimmed = text.trim();
  if (!trimmed) return text;

  let result = trimmed;
  if (i18nLang === 'zh') {
    if (Object.prototype.hasOwnProperty.call(i18nPhrases, trimmed)) {
      result = i18nPhrases[trimmed];
    } else {
      for (const rule of i18nRulesEn2Zh) {
        if (rule.re.test(trimmed)) { result = trimmed.replace(rule.re, rule.rep); break; }
      }
    }
  } else {
    if (Object.prototype.hasOwnProperty.call(i18nReverse, trimmed)) {
      result = i18nReverse[trimmed];
    } else {
      for (const rule of i18nRulesZh2En) {
        if (rule.re.test(trimmed)) { result = trimmed.replace(rule.re, rule.rep); break; }
      }
    }
  }

  if (result === trimmed) return text;
  // 保留原文字的首尾空白
  const lead = (text.match(/^\s*/) || [''])[0];
  const tail = (text.match(/\s*$/) || [''])[0];
  return lead + result + tail;
}

// 翻译某个区域内的所有界面文字（默认整个页面）
function applyI18n(root) {
  if (i18nTranslating) return;
  i18nTranslating = true;
  try {
    const scope = root || document.body;
    if (!scope) return;

    // 1. 遍历文本节点
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') {
          return NodeFilter.FILTER_REJECT;
        }
        // 跳过图标字体（ligature 名称不能翻译）
        if (parent.closest('.material-symbols-outlined')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
      const translated = translateText(node.nodeValue);
      if (translated !== node.nodeValue) node.nodeValue = translated;
    });

    // 2. 翻译输入框提示、悬停提示、无障碍标签
    if (scope.querySelectorAll) {
      scope.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el => {
        ['placeholder', 'title', 'aria-label'].forEach(attr => {
          const value = el.getAttribute(attr);
          if (value) {
            const translated = translateText(value);
            if (translated !== value) el.setAttribute(attr, translated);
          }
        });
      });
    }

    // 3. 翻译浏览器标签页标题
    if (scope === document.body) {
      const translated = translateText(document.title);
      if (translated !== document.title) document.title = translated;
    }
  } finally {
    i18nTranslating = false;
  }
}

// 切换语言（会立即翻译整个页面并记住选择）
function setLang(lang) {
  i18nLang = lang;
  try {
    localStorage.setItem('siteLang', lang);
  } catch (e) { /* 忽略存储失败 */ }
  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
  applyI18n();
  updateLangToggle();
}

function toggleLang() {
  setLang(i18nLang === 'zh' ? 'en' : 'zh');
}

// 更新切换按钮显示的文字
function updateLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = i18nLang === 'zh' ? 'EN' : '中文';
}

// 在顶部导航栏右侧自动插入语言切换按钮
function injectLangToggle() {
  if (document.getElementById('lang-toggle')) return;
  const header = document.querySelector('header');
  if (!header) return;

  const target = header.querySelector('div:last-child') || header;
  const btn = document.createElement('button');
  btn.id = 'lang-toggle';
  btn.className = 'ai-button ai-button--secondary';
  btn.style.whiteSpace = 'nowrap';
  btn.title = i18nLang === 'zh' ? 'Switch to English' : '切换为中文';
  btn.onclick = toggleLang;
  btn.textContent = i18nLang === 'zh' ? 'EN' : '中文';
  target.appendChild(btn);
}

// 监听页面变化，自动翻译动态生成的内容（题目卡片、菜单等）
const i18nObserver = new MutationObserver(mutations => {
  if (i18nLang !== 'zh' || i18nTranslating) return;
  for (const m of mutations) {
    if (m.type === 'characterData') {
      const translated = translateText(m.target.nodeValue);
      if (translated !== m.target.nodeValue) m.target.nodeValue = translated;
    } else {
      m.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const translated = translateText(node.nodeValue);
          if (translated !== node.nodeValue) node.nodeValue = translated;
        } else if (node.nodeType === Node.ELEMENT_NODE &&
                   !node.closest('.material-symbols-outlined') &&
                   node.id !== 'lang-toggle') {
          applyI18n(node);
        }
      });
    }
  }
});

// 页面加载完成后启动
document.addEventListener('DOMContentLoaded', () => {
  injectLangToggle();
  // 用 setTimeout 等页面自己的渲染逻辑先跑完，再整体翻译一次
  setTimeout(() => {
    if (i18nLang === 'zh') applyI18n();
    if (document.body) {
      i18nObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
  }, 0);
});

// 兼容模块化导出（供将来 Node 环境测试用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { i18nPhrases, translateText, getLang, setLang, toggleLang, applyI18n };
}
