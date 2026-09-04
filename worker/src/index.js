/**
 * ============================================================
 * AI 学案生成 Worker
 * ------------------------------------------------------------
 * 流程（GET /api/lesson?level=1|2|3）：
 *   1. 查 KV 缓存（key: lesson:{level}:{北京时间日期}）→ 命中直接返回
 *   2. 未命中：按级别抓 China Daily 对应栏目列表页，解析当天文章链接
 *   3. 逐篇抓正文，取第一篇词数达标（>= 该级别下限）的文章，按上限截断
 *   4. 调智谱 GLM 生成结构化学案 JSON（三挡分级 Prompt）
 *   5. 写入 KV（TTL 7 天）并返回
 *
 * Cron（UTC 16:30 = 北京 00:30）每天预热三个级别，用户白天点击秒开。
 *
 * 安全说明：
 *   - 缓存 key 是「级别:日期」，每天每级最多真实调用一次智谱（之后全走 KV），
 *     接口无鉴权也不会被刷爆额度
 *   - ZHIPU_API_KEY 通过 `npx wrangler secret put ZHIPU_API_KEY` 设置，
 *     绝不写进代码或前端
 * ============================================================
 */

// ---------- 三挡难度配置 ----------
// section: China Daily 栏目列表页；minWords/maxWords: 原文词数范围
const LEVELS = {
  1: {
    label: 'CET-4',
    section: 'https://www.chinadaily.com.cn/culture',
    minWords: 250,
    maxWords: 350,
    topicHint: 'culture, life, campus, travel, food, festivals',
  },
  2: {
    label: 'CET-6',
    section: 'https://www.chinadaily.com.cn/world',
    minWords: 350,
    maxWords: 450,
    topicHint: 'society, technology, environment, health, education',
  },
  3: {
    label: 'CET-6+',
    section: 'https://www.chinadaily.com.cn/opinion',
    minWords: 450,
    maxWords: 600,
    topicHint: 'editorials, economics, international relations, in-depth analysis',
  },
};

// ---------- 工具 ----------
/** 北京时间日期字符串 YYYY-MM-DD（缓存按「天」轮换） */
function beijingToday() {
  // UTC+8，用 toLocaleString 转时区
  const d = new Date(Date.now() + 8 * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}

/** 数单词数（英文单词） */
function countWords(text) {
  return (text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || []).length;
}

/** HTML 转义（正文段落存纯文本，前端渲染时用） */
function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------- 抓取：栏目列表页 → 文章链接 ----------
/**
 * 从栏目列表页解析文章链接（按日期从新到旧）。
 * China Daily 文章 URL 形如 /a/202608/30/WS6a94284ce4b06d4aa055b410.html
 */
async function fetchArticleLinks(sectionUrl, limit = 10) {
  const res = await fetch(sectionUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LessonBot/1.0)' },
  });
  if (!res.ok) throw new Error(`列表页请求失败 HTTP ${res.status}`);
  const html = await res.text();

  // 提取所有文章链接并解析出日期部分
  const seen = new Set();
  const items = [];
  const re = /href="(?:(?:https?:)?\/\/www\.chinadaily\.com\.cn)?(\/a\/(\d{4})(\d{2})\/(\d{2})\/WS[A-Za-z0-9]+\.html)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const path = m[1];
    if (seen.has(path)) continue;
    seen.add(path);
    const dateStr = `${m[2]}-${m[3]}-${m[4]}`;
    items.push({ path, date: dateStr });
  }
  // 按日期从新到旧排序，取前 limit 篇作为候选
  items.sort((a, b) => (a.date < b.date ? 1 : -1));
  return items.slice(0, limit).map(it => 'https://www.chinadaily.com.cn' + it.path);
}

// ---------- 抓取：文章页 → 正文 ----------
/**
 * 提取文章标题和正文段落。
 * China Daily 文章页正文是一串 <p>，末尾一段是版权声明（按词数过滤掉）。
 */
async function fetchArticle(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LessonBot/1.0)' },
  });
  if (!res.ok) throw new Error(`文章页请求失败 HTTP ${res.status}`);
  const html = await res.text();

  // 标题：<title> 去掉尾部的 " - Opinion - Chinadaily.com.cn" 等
  let title = '';
  const tm = html.match(/<title>(.*?)<\/title>/s);
  if (tm) title = stripTags(tm[1])
    .replace(/\s*-\s*Chinadaily\.com\.cn.*$/i, '')
    .replace(/\s*-\s*(Opinion|World|Culture|Life|China|Sports|Business|Travel)\s*$/i, '')
    .trim();

  // 正文：去掉 script/style/figure 后取所有 <p>
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<figure[\s\S]*?<\/figure>/gi, '');
  const paragraphs = [];
  const pre = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let pm;
  while ((pm = pre.exec(cleaned)) !== null) {
    const text = stripTags(pm[1]);
    const words = countWords(text);
    // 过滤：太短的（图片说明/空段）和版权声明（含 Copyright / all rights reserved）
    if (words < 10) continue;
    if (/copyright|all rights reserved|reprint/i.test(text)) continue;
    paragraphs.push(text);
  }

  return { title, url, paragraphs, wordCount: paragraphs.reduce((s, p) => s + countWords(p), 0) };
}

/**
 * 按级别选一篇文章：从新到旧逐篇试，取第一篇词数达标的；
 * 全都不达标就取词数最多的一篇。最后按上限截断（整段截，不切半段）。
 */
async function pickArticleForLevel(levelCfg) {
  const links = await fetchArticleLinks(levelCfg.section);
  if (!links.length) throw new Error('列表页没有解析到文章链接');

  let best = null;
  for (const url of links) {
    try {
      const article = await fetchArticle(url);
      if (article.paragraphs.length < 3) continue; // 太短的不是正经文章
      if (!best || article.wordCount > best.wordCount) best = article;
      if (article.wordCount >= levelCfg.minWords) {
        best = article;
        break; // 第一篇达标的即可
      }
    } catch (e) {
      // 单篇失败跳过，继续下一篇
    }
  }
  if (!best) throw new Error('候选文章全部抓取失败');

  // 按上限整段截断
  let kept = [];
  let words = 0;
  for (const p of best.paragraphs) {
    const w = countWords(p);
    if (words + w > levelCfg.maxWords && kept.length >= 3) break; // 至少保留 3 段
    kept.push(p);
    words += w;
  }
  return { ...best, paragraphs: kept, wordCount: words };
}

// ---------- 智谱 GLM：结构化学案生成 ----------
/** 三挡分级 Prompt（词汇深度、题目类型随级别变化） */
function buildPrompt(level, levelCfg, article) {
  const text = article.paragraphs.join('\n\n');

  // 词汇字段随级别变化
  let vocabRule;
  if (level === 1) {
    vocabRule = `"vocabulary": 8 个四级核心词/短语，每个包含 word、phonetic（音标）、pos（词性）、meaningCn（简单中文释义）、meaningEn（留空 ""）、synonyms（留空 []）、example（基础例句）`;
  } else if (level === 2) {
    vocabRule = `"vocabulary": 8 个六级核心词/短语，每个包含 word、phonetic（音标）、pos（词性）、meaningCn（中文释义）、meaningEn（英文释义）、synonyms（1~2 个近义词及一句话辨析，格式如 "obtain (formal) — 较 gain 更正式"）、example（例句）`;
  } else {
    vocabRule = `"vocabulary": 8 个高级词/短语，每个包含 word、phonetic（音标）、pos（词性）、meaningCn（留空 ""）、meaningEn（纯英英释义，不留中文）、synonyms（近义词辨析）、example（例句）`;
  }

  // 题目类型随级别变化
  let questionRule;
  if (level === 1) {
    questionRule = `5 道四选一阅读理解题：3 道细节题、1 道主旨题、1 道词义猜测题`;
  } else if (level === 2) {
    questionRule = `5 道四选一阅读理解题：2 道细节题、1 道主旨题、1 道推理题、1 道词义猜测题`;
  } else {
    questionRule = `5 道四选一阅读理解题：1 道细节题、1 道主旨题、2 道推断题（Inference）、1 道作者态度题（Author's Attitude）`;
  }

  // 中文辅助随级别变化
  const summaryRule =
    level === 3
      ? `"summaryCn": 留空 ""（高级别不提供中文摘要，全英沉浸）`
      : `"summaryCn": 全文 2~3 句中文摘要，帮助理解文章大意`;

  return `你是一名四六级英语阅读命题专家。当前模式为 Level ${level}（${levelCfg.label}），请严格遵循该级别的词汇深度和出题难度。

阅读下面这篇来自 China Daily（${levelCfg.topicHint} 方向）的文章，生成一份英语精读学案，严格输出以下 JSON（不要输出任何 JSON 以外的内容，不要用 markdown 代码块包裹）：

{
  "title": "文章标题（原文）",
  "topic": "文章话题的英文短语，如 climate change",
  ${vocabRule},
  ${questionRule}，每题包含 question（题干）、options（恰好 4 个选项的数组）、answer（正确答案下标 0-3）、explanation（中文解析，必须引用原文定位句并说明同义替换）、qtype（题型英文缩写：detail/main/inference/attitude/guess）
  ${summaryRule},
  "keySentence": "文中最值得精读的一句话（英文原句）"
}

出题要求：
- 题目必须能从文章中找到明确依据，解析里引用原文句子（用引号标注）
- 干扰项要有迷惑性，不能一眼假
- 例句和题目语言的复杂度要与 Level ${level} 匹配
- 只使用文章中出现过的词汇出词义猜测题

文章标题：${article.title}
文章正文：
${text}`;
}

/** 调智谱 GLM 并解析/校验返回的 JSON */
async function generateLesson(model, zhipuUrl, apiKey, level, levelCfg, article) {
  const res = await fetch(zhipuUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'user', content: buildPrompt(level, levelCfg, article) },
      ],
      temperature: 0.6,
      max_tokens: 4096,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`智谱接口失败 HTTP ${res.status}: ${errText.slice(0, 200)}`);
  }
  const data = await res.json();
  const raw = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';

  // 容错解析：剥掉可能出现的 ```json 包裹
  const jsonStr = raw.replace(/```(?:json)?/gi, '').trim();
  const start = jsonStr.indexOf('{');
  const end = jsonStr.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('模型没有返回 JSON：' + raw.slice(0, 200));
  const lesson = JSON.parse(jsonStr.slice(start, end + 1));

  // 结构校验（字段缺失直接报错，不让半成品进缓存）
  if (!lesson.title || !Array.isArray(lesson.vocabulary) || !Array.isArray(lesson.questions)) {
    throw new Error('学案 JSON 结构不完整');
  }
  for (const q of lesson.questions) {
    if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 ||
        typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
      throw new Error('题目 JSON 结构不完整');
    }
  }

  // 组装最终学案（补上模型不需要管的元信息）
  return {
    id: 'ai_' + level + '_' + beijingToday().replace(/-/g, ''),
    level,                       // 1 | 2 | 3
    levelLabel: levelCfg.label,  // CET-4 | CET-6 | CET-6+
    title: lesson.title,
    topic: lesson.topic || '',
    source: 'China Daily',
    sourceUrl: article.url,
    date: beijingToday(),
    wordCount: article.wordCount,
    paragraphs: article.paragraphs,
    vocabulary: lesson.vocabulary,
    questions: lesson.questions,
    summaryCn: lesson.summaryCn || '',
    keySentence: lesson.keySentence || '',
  };
}

// ---------- 单个级别的完整生成流程 ----------
async function getOrGenerateLesson(env, level) {
  const levelCfg = LEVELS[level];
  if (!levelCfg) return null;

  const cacheKey = `lesson:${level}:${beijingToday()}`;

  // 1. 先查 KV 缓存
  const cached = await env.LESSONS.get(cacheKey);
  if (cached) {
    return { lesson: JSON.parse(cached), cached: true };
  }

  // 2. 抓文章
  const article = await pickArticleForLevel(levelCfg);

  // 3. 生成学案
  const lesson = await generateLesson(
    env.MODEL, env.ZHIPU_URL, env.ZHIPU_API_KEY, level, levelCfg, article
  );

  // 4. 写 KV 缓存（TTL 7 天）
  await env.LESSONS.put(cacheKey, JSON.stringify(lesson), { expirationTtl: 7 * 86400 });

  return { lesson, cached: false };
}

// ---------- CORS ----------
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // 只读接口且每天每级仅生成一次，无需锁域名
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS },
  });
}

// ---------- Worker 入口 ----------
// 命名导出仅供 Node 本地测试脚本使用（worker/test-scrape.mjs）
export { LEVELS, fetchArticleLinks, fetchArticle, pickArticleForLevel, generateLesson };

export default {
  async fetch(request, env) {
    // CORS 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // 健康检查
    if (url.pathname === '/health') {
      return json({ ok: true, time: new Date().toISOString() });
    }

    // 主接口：GET /api/lesson?level=1|2|3 [&date=YYYY-MM-DD 只读取回历史学案，不重新生成]
    if (url.pathname === '/api/lesson') {
      const level = parseInt(url.searchParams.get('level') || '', 10);
      if (!LEVELS[level]) {
        return json({ error: 'level 必须是 1、2 或 3' }, 400);
      }

      // 带日期 = 只查 KV 历史缓存（保留 7 天），绝不触发抓取/生成
      const date = (url.searchParams.get('date') || '').trim();
      if (date) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return json({ error: 'date 格式应为 YYYY-MM-DD' }, 400);
        }
        const historical = await env.LESSONS.get(`lesson:${level}:${date}`);
        if (!historical) {
          return json({ error: '该日期的学案不存在或已超过 7 天保留期' }, 404);
        }
        return json({ cached: true, lesson: JSON.parse(historical) });
      }

      try {
        const { lesson, cached } = await getOrGenerateLesson(env, level);
        return json({ cached, lesson });
      } catch (e) {
        return json({ error: '生成失败：' + e.message }, 502);
      }
    }

    // 测试抓取（不调智谱，不花钱）：GET /api/scrape-test?level=1
    if (url.pathname === '/api/scrape-test') {
      const level = parseInt(url.searchParams.get('level') || '', 10);
      if (!LEVELS[level]) return json({ error: 'level 必须是 1、2 或 3' }, 400);
      try {
        const article = await pickArticleForLevel(LEVELS[level]);
        return json({ level, title: article.title, url: article.url, wordCount: article.wordCount,
                      firstParagraph: article.paragraphs[0] });
      } catch (e) {
        return json({ error: e.message }, 502);
      }
    }

    return json({ error: '未知路径，可用：/api/lesson?level=1|2|3、/api/scrape-test?level=1|2|3、/health' }, 404);
  },

  // Cron 定时预热：每天凌晨生成三挡学案
  async scheduled(event, env) {
    for (const level of [1, 2, 3]) {
      try {
        await getOrGenerateLesson(env, level);
      } catch (e) {
        // 单级失败不影响其他级别，错误会出现在 Workers 日志里
        console.error(`Level ${level} 预热失败:`, e.message);
      }
    }
  },
};
