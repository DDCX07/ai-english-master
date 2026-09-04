/**
 * 统一数据访问层（Data Access Layer）
 *
 * 所有页面读写学习记录都必须经过这个文件，不允许直接调用 storage/localStorage。
 *
 * 同步策略：本地优先 + 写穿（write-through）
 * - localStorage 始终是第一数据源，页面同步读它，离线也能用
 * - 登录后，每次写操作异步推送一份到 Supabase（换浏览器登录可恢复）
 * - 未登录 / Supabase 不可用时，自动降级为纯本地模式，功能不受影响
 *
 * 目前管理的数据：
 * - 练习记录：listening / translation / oral / writing / grammar / reading / mockExam
 * - 词汇学习进度：vocabProgress（每个词的掌握状态）
 * - 学习打卡：studyDays（每天是否学过，用于计算连续天数）
 * - 汇总统计：getStats()（仪表盘和词汇页的数字都来自这里）
 */

// 各练习模块对应的存储键（沿用旧键名，历史数据不用迁移）
const API_MODULE_KEYS = {
  listening: 'listeningHistory',
  translation: 'translationHistory',
  oral: 'oralHistory',
  writing: 'writingHistory',
  grammar: 'grammarPracticeResults',
  reading: 'readingHistory',
  mockExam: 'mockExamHistory',
  aiReading: 'aiLessonHistory'
};

const api = {
  // ============ 底层存取（将来换成后端接口时只改这两个方法） ============

  _get(key, defaultValue) {
    return storage.get(key, defaultValue);
  },

  _set(key, value) {
    storage.set(key, value);
  },

  // 通用计数器（如 listeningCompleted）
  getCount(key) {
    return this._get(key, 0);
  },

  // ============ 备考模式（CET-4 / CET-6，全局） ============

  /** 读取备考模式，默认 CET-6 */
  getPrepLevel() {
    const v = this._get('prepLevel', 'CET-6');
    return v === 'CET-4' ? 'CET-4' : 'CET-6';
  },

  /**
   * 设置备考模式并广播事件，各页面监听 prep-level-change 自行刷新
   * @param {string} level 'CET-4' | 'CET-6'
   */
  setPrepLevel(level) {
    const v = level === 'CET-4' ? 'CET-4' : 'CET-6';
    this._set('prepLevel', v);
    document.dispatchEvent(new CustomEvent('prep-level-change', { detail: { level: v } }));
  },

  // ============ Supabase 同步（本地优先 + 写穿） ============

  /** Supabase 客户端（supabase-client.js 提供的全局 sb；未配置返回 null） */
  _sb() {
    return (typeof sb !== 'undefined' && sb) ? sb : null;
  },

  /** 当前登录用户的 uuid（未登录返回 null） */
  _uid() {
    const u = (typeof auth !== 'undefined' && auth.isLoggedIn()) ? auth.user() : null;
    return u ? u.id : null;
  },

  /** 已登录 */
  isLoggedIn() {
    return !!this._uid();
  },

  /**
   * 写穿统一入口：登录后异步执行 Supabase 操作，
   * 失败只警告不打断页面（fire-and-forget）
   */
  async _run(label, fn) {
    const client = this._sb();
    const uid = this._uid();
    if (!client || !uid) return;
    try {
      const { error } = await fn(client, uid);
      if (error) console.warn('[api] 同步失败:', label, error.message);
    } catch (e) {
      console.warn('[api] 同步失败:', label, e.message || e);
    }
  },

  /**
   * 把一条本地练习记录映射成 user_module_records 的一行并推送
   * detail 字段原样存整条本地记录——换浏览器恢复时靠它还原
   */
  _syncRecord(module, record) {
    const r = record || {};
    this._run('记录 ' + module, (client, uid) =>
      client.from('user_module_records').insert({
        user_id: uid,
        module: module === 'mockExam' ? 'mock_exam' : module,
        item_id: String(r.itemId != null ? r.itemId
          : (r.topicId != null ? r.topicId
            : (r.title != null ? r.title : 'unknown'))),
        score: r.score != null ? r.score : (r.percentage != null ? r.percentage : null),
        correct_count: r.correctCount != null ? r.correctCount : (r.correct != null ? r.correct : null),
        total_count: r.total != null ? r.total : (r.totalQuestions != null ? r.totalQuestions : null),
        duration_seconds: r.timeUsed || null,
        completed_at: r.date ? new Date(r.date).toISOString() : undefined,
        detail: r
      }));
  },

  /** 打卡同步（每天最多推一次，避免每次写操作都请求） */
  _syncCheckin() {
    if (!this.isLoggedIn()) return;
    const today = formatDate(new Date());
    if (this._get('lastCheckinSync', '') === today) return;
    this._set('lastCheckinSync', today);
    this._run('打卡', (client, uid) =>
      client.from('user_checkins').upsert(
        { user_id: uid, checkin_date: today, study_seconds: 0 },
        { onConflict: 'user_id,checkin_date' }));
  },

  // ============ 写作草稿（本地 + 云端双写） ============

  /** 读取某任务的写作草稿 */
  getDraft(taskId) {
    return this._get('writingDraft_' + taskId, '') || '';
  },

  /** 保存草稿（本地立即生效，登录后异步推送到云端） */
  saveDraft(taskId, content) {
    this._set('writingDraft_' + taskId, content);
    this._run('草稿 ' + taskId, (client, uid) =>
      client.from('user_writing_drafts').upsert(
        { user_id: uid, task_id: String(taskId), content: String(content || '') },
        { onConflict: 'user_id,task_id' }));
  },

  /** 删除草稿 */
  deleteDraft(taskId) {
    this._set('writingDraft_' + taskId, '');
    this._run('删除草稿 ' + taskId, (client, uid) =>
      client.from('user_writing_drafts').delete().eq('task_id', String(taskId)));
  },

  // ============ 设置偏好同步（user_settings 表） ============

  /** 把本地 userSettings + prepLevel 映射成 user_settings 的一行 */
  _buildSettingsRow() {
    const s = this._get('userSettings', {}) || {};
    return {
      prep_level: this.getPrepLevel(),
      daily_word_goal: s.dailyWordGoal != null ? s.dailyWordGoal : 20,
      daily_minutes: s.dailyMinutes || { listening: 15, reading: 15, writing: 10, oral: 10 },
      daily_reminder: !!s.dailyReminder,
      reminder_time: s.reminderTime || '20:00',
      font_size: ['small', 'medium', 'large'].includes(s.fontSize) ? s.fontSize : 'medium',
      dark_mode: !!s.darkMode
    };
  },

  /** 设置写穿：setting.html 每次 saveSettings 后调用（未登录静默跳过） */
  syncSettings() {
    this._run('设置', (client, uid) =>
      client.from('user_settings').upsert(
        { user_id: uid, ...this._buildSettingsRow() },
        { onConflict: 'user_id' }));
  },

  /**
   * 云端设置 → 本地：只在"本机从没存过设置"时采用（换浏览器恢复场景）。
   * 本机改过设置则以本地为准（由 syncSettings 推上云端覆盖）。
   * @returns {boolean} true = 本次真的采用了云端设置
   */
  _applyCloudSettings(row) {
    if (!row) return false;
    let applied = false;

    if (this._get('userSettings', null) == null) {
      this._set('userSettings', {
        dailyReminder: !!row.daily_reminder,
        reminderTime: (row.reminder_time || '20:00').slice(0, 5),
        fontSize: ['small', 'medium', 'large'].includes(row.font_size) ? row.font_size : 'medium',
        darkMode: !!row.dark_mode,
        dailyWordGoal: row.daily_word_goal != null ? row.daily_word_goal : 20,
        dailyMinutes: row.daily_minutes || { listening: 15, reading: 15, writing: 10, oral: 10 }
      });
      applied = true;
    }
    if (this._get('prepLevel', null) == null && row.prep_level) {
      this._set('prepLevel', row.prep_level === 'CET-4' ? 'CET-4' : 'CET-6');
      applied = true;
    }
    return applied;
  },

  // ============ 练习记录 ============

  /**
   * 追加一条练习记录
   * @param {string} module listening|translation|oral|writing|grammar|reading|mockExam|aiReading
   * @param {object} record 记录内容（各页面自定义字段 + date）
   * @returns {Array} 追加后的完整记录数组
   */
  addRecord(module, record) {
    const key = API_MODULE_KEYS[module];
    if (!key) throw new Error('未知的练习模块: ' + module);

    const history = this._get(key, []) || [];
    history.push(record);
    this._set(key, history);

    // 听力额外维护完成篇数计数器（练习列表页的 x/10 进度用）
    if (module === 'listening') {
      this._set('listeningCompleted', this.getCount('listeningCompleted') + 1);
    }
    // 语法练习只保留最近 10 次（沿用旧逻辑）
    if (module === 'grammar') {
      this._set(key, history.slice(-10));
    }
    // AI 学案只保留最近 50 次（每天每级最多一篇，50 篇足够回看）
    if (module === 'aiReading') {
      this._set(key, history.slice(-50));
    }

    // 写穿：登录后把这条记录推送到后端
    this._syncRecord(module, record);

    this.touchDay();
    return this._get(key, []);
  },

  /**
   * 读取某模块的全部练习记录
   * @param {string} module
   * @returns {Array}
   */
  getRecords(module) {
    const key = API_MODULE_KEYS[module];
    if (!key) throw new Error('未知的练习模块: ' + module);
    return this._get(key, []) || [];
  },

  /**
   * 插入或更新一条练习记录：matcher 匹配到已有记录则浅合并，否则追加。
   * 用于"生成即记历史、提交后再补成绩"这类场景（如 AI 学案）。
   * @param {string} module 模块名
   * @param {object} record 要写入的字段
   * @param {Function} [matcher] (r) => boolean，匹配要更新的记录
   * @param {object} [opts] { skipSync: true } 只写本地，不推云端（未产生成绩的中间态）
   * @returns {Array} 更新后的完整记录数组
   */
  upsertRecord(module, record, matcher, opts) {
    const key = API_MODULE_KEYS[module];
    if (!key) throw new Error('未知的练习模块: ' + module);
    const history = this._get(key, []) || [];
    let merged = record;
    const idx = matcher ? history.findIndex(matcher) : -1;
    if (idx >= 0) {
      history[idx] = Object.assign({}, history[idx], record);
      merged = history[idx];
    } else {
      history.push(record);
    }
    this._set(key, module === 'aiReading' ? history.slice(-50) : history);
    if (!(opts && opts.skipSync)) this._syncRecord(module, merged);
    this.touchDay();
    return this._get(key, []);
  },

  // ============ 词汇学习进度 ============

  /**
   * 记录一个单词的掌握情况（词汇页每次点"认识/不认识/太简单"时调用）
   * @param {string} word 单词
   * @param {string} level 'CET-4' | 'CET-6'
   * @param {string} difficulty 'hard' | 'normal' | 'easy'
   */
  recordWord(word, level, difficulty) {
    const progress = this._get('vocabProgress', {}) || {};
    const today = formatDate(new Date());
    const prev = progress[word];
    progress[word] = {
      level,
      difficulty,
      firstDate: prev ? prev.firstDate : today, // 第一次学到这个词的日期
      lastDate: today
    };
    this._set('vocabProgress', progress);
    this._run('词汇 ' + word, (client, uid) =>
      client.from('user_vocab_progress').upsert({
        user_id: uid,
        word,
        prep_level: level === 'CET-4' ? 'CET-4' : 'CET-6',
        status: difficulty === 'hard' ? 'learning' : (difficulty === 'easy' ? 'familiar' : 'mastered'),
        first_reviewed_at: ((prev && prev.firstDate) || today) + 'T00:00:00Z',
        last_reviewed_at: today + 'T00:00:00Z'
      }, { onConflict: 'user_id,word' }));
    this.touchDay();
  },

  /** 获取全部词汇进度（以单词为键的对象） */
  getVocabProgress() {
    return this._get('vocabProgress', {}) || {};
  },

  /**
   * 词汇统计
   * @returns {{total:number, mastered:number, review:number, todayNew:number}}
   */
  getVocabStats() {
    const progress = this.getVocabProgress();
    const today = formatDate(new Date());
    let total = 0, mastered = 0, review = 0, todayNew = 0;
    Object.keys(progress).forEach(word => {
      const p = progress[word];
      total++;
      if (p.difficulty === 'hard') review++;
      else mastered++; // normal / easy 都算已掌握
      if (p.firstDate === today) todayNew++;
    });
    return { total, mastered, review, todayNew };
  },

  // ============ 学习打卡（连续天数） ============

  /**
   * 把今天标记为"学过"
   * @returns {boolean} true = 今天是第一次打卡，false = 今天已经打过卡
   */
  touchDay() {
    const days = this._get('studyDays', []) || [];
    const today = formatDate(new Date());
    if (!days.includes(today)) {
      days.push(today);
      this._set('studyDays', days);
      this._syncCheckin();
      return true;
    }
    return false;
  },

  /**
   * 每日打卡（每天首次访问时由页面自动调用）
   * @returns {boolean} true = 今天是第一次访问并完成打卡
   */
  checkIn() {
    return this.touchDay();
  },

  /** 连续学习天数（今天没学不断档，从昨天往回数） */
  getStreak() {
    const set = new Set(this._get('studyDays', []) || []);
    if (!set.size) return 0;

    const cursor = new Date();
    if (!set.has(formatDate(cursor))) {
      // 今天还没学：从昨天开始算，昨天也没学则连续天数为 0
      cursor.setDate(cursor.getDate() - 1);
      if (!set.has(formatDate(cursor))) return 0;
    }

    let streak = 0;
    while (set.has(formatDate(cursor))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  },

  // ============ 汇总统计（仪表盘 / 词汇页顶部数字） ============

  /**
   * 全站学习统计
   * @returns {{
   *   streak: number,              // 连续学习天数
   *   vocab: {total, mastered, review, todayNew},
   *   accuracy: number,            // 全站正确率（百分比，0-100）
   *   today: {                     // 今日各模块活动量
   *     words: number,             // 今日学过的单词数
   *     listeningQuestions: number,// 今日听力答题数
   *     reading: number,           // 今日完成阅读篇数
   *     writing: number,           // 今日提交作文数
   *     translation: number,       // 今日翻译句数
   *     oral: number               // 今日口语句数
   *   }
   * }}
   */
  getStats() {
    const todayStr = formatDate(new Date());
    const isToday = (record) => {
      if (!record || !record.date) return false;
      return formatDate(new Date(record.date)) === todayStr;
    };

    // 今日活动量
    const vocabProgress = this.getVocabProgress();
    let todayWords = 0;
    Object.keys(vocabProgress).forEach(word => {
      if (vocabProgress[word].lastDate === todayStr) todayWords++;
    });

    const listening = this.getRecords('listening');
    const todayListening = listening.filter(isToday);

    const today = {
      words: todayWords,
      listeningQuestions: todayListening.reduce((s, h) => s + (h.totalQuestions || 0), 0),
      reading: this.getRecords('reading').filter(isToday).length,
      writing: this.getRecords('writing').filter(isToday).length,
      translation: this.getRecords('translation').filter(isToday).length,
      oral: this.getRecords('oral').filter(isToday).length
    };

    // 全站正确率：计数型模块算对题数，百分比型模块按分数折算
    let correct = 0, total = 0;

    [['listening', 'correctCount', 'totalQuestions'],
     ['reading', 'correctCount', 'total'],
     ['grammar', 'correct', 'total'],
     ['mockExam', 'correctCount', 'total']].forEach(([module, cKey, tKey]) => {
      this.getRecords(module).forEach(h => {
        correct += h[cKey] || 0;
        total += h[tKey] || 0;
      });
    });

    [['translation', 'score'], ['oral', 'score']].forEach(([module, sKey]) => {
      this.getRecords(module).forEach(h => {
        if (typeof h[sKey] === 'number') {
          correct += h[sKey];
          total += 100;
        }
      });
    });

    // 词汇正确率（只算单词标记）：认识/太简单 = 对，不认识 = 错（每个单词一题，重复标记按最新状态覆盖）
    let vocabCorrect = 0, vocabTotal = 0;
    Object.keys(vocabProgress).forEach(word => {
      const d = vocabProgress[word].difficulty;
      if (!d) return;
      vocabTotal += 1;
      if (d !== 'hard') vocabCorrect += 1;
    });

    return {
      streak: this.getStreak(),
      vocab: this.getVocabStats(),
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      vocabAccuracy: vocabTotal > 0 ? Math.round((vocabCorrect / vocabTotal) * 100) : 0,
      today
    };
  },

  // ============ 语法学习标记 ============

  /** 已学习的语法点 id 列表 */
  getLearnedGrammar() {
    return this._get('learnedGrammar', []) || [];
  },

  /**
   * 标记语法点为已学习
   * @returns {boolean} true = 新标记，false = 之前已标记过
   */
  markGrammarLearned(topicId) {
    const learned = this.getLearnedGrammar();
    if (learned.includes(topicId)) return false;
    learned.push(topicId);
    this._set('learnedGrammar', learned);
    this._run('语法标记 ' + topicId, (client, uid) =>
      client.from('user_module_records').insert({
        user_id: uid,
        module: 'grammar',
        item_id: String(topicId),
        score: 100,
        detail: { grammarMark: true, date: formatDate(new Date()) }
      }));
    this.touchDay();
    return true;
  },

  // ============ 登录时的双向同步（合并本地与云端） ============

  /**
   * 登录后调用一次（由 auth.js 设标记、页面加载时触发）：
   * ① 拉取云端全部数据  ② 与本地合并（并集，不丢任何一边）
   * ③ 把合并结果整表覆盖回云端，保证两边完全一致
   * 换浏览器登录 → 云端数据恢复到本地；本地有未同步数据 → 推上云端
   */
  async syncOnLogin() {
    const client = this._sb();
    const uid = this._uid();
    if (!client || !uid) return { success: false };

    // ① 拉取云端数据（四张学习数据表 + 设置表）
    const [records, vocab, checkins, drafts, settings] = await Promise.all([
      client.from('user_module_records')
        .select('module,item_id,detail,completed_at').order('completed_at')
        .limit(5000),
      client.from('user_vocab_progress')
        .select('word,prep_level,status,first_reviewed_at,last_reviewed_at').limit(20000),
      client.from('user_checkins').select('checkin_date').limit(20000),
      client.from('user_writing_drafts').select('task_id,content').limit(1000),
      client.from('user_settings').select('*').limit(1)
    ]);
    if (records.error || vocab.error || checkins.error || drafts.error || settings.error) {
      console.warn('[api] 云端数据拉取失败',
        records.error || vocab.error || checkins.error || drafts.error || settings.error);
      return { success: false };
    }

    // ② 云端 → 本地格式
    const cloudGrammarMarks = [];
    const cloudRecords = {}; // module → 记录数组
    records.data.forEach(row => {
      const d = row.detail || {};
      if (d.grammarMark) { cloudGrammarMarks.push(String(row.item_id)); return; }
      const m = row.module === 'mock_exam' ? 'mockExam' : row.module;
      if (!API_MODULE_KEYS[m]) return;
      (cloudRecords[m] = cloudRecords[m] || []).push(d);
    });
    const cloudVocab = {};
    vocab.data.forEach(v => {
      cloudVocab[v.word] = {
        level: v.prep_level === 'CET-4' ? 'CET-4' : 'CET-6',
        difficulty: v.status === 'learning' ? 'hard' : (v.status === 'familiar' ? 'easy' : 'normal'),
        firstDate: (v.first_reviewed_at || '').slice(0, 10),
        lastDate: (v.last_reviewed_at || '').slice(0, 10)
      };
    });
    const cloudDrafts = {};
    drafts.data.forEach(dr => { cloudDrafts[dr.task_id] = dr.content || ''; });

    // ③ 合并（并集）
    // 练习记录：按"日期+题目+得分"去重后按时间排序
    const recKey = r => [
      r.date,
      r.itemId != null ? r.itemId : (r.topicId != null ? r.topicId : r.title),
      r.score != null ? r.score : r.percentage,
      r.correctCount != null ? r.correctCount : r.correct
    ].join('|');
    Object.keys(API_MODULE_KEYS).forEach(m => {
      const merged = [...(cloudRecords[m] || []), ...this.getRecords(m)];
      const seen = new Set();
      const unique = merged.filter(r => {
        const k = recKey(r);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
      unique.sort((a, b) => new Date(a.date) - new Date(b.date));
      // 语法练习沿用"只保留最近 10 次"的本地规则
      this._set(API_MODULE_KEYS[m], m === 'grammar' ? unique.slice(-10) : unique);
    });
    this._set('listeningCompleted',
      Math.max(this.getCount('listeningCompleted'), this.getRecords('listening').length));

    // 语法学习标记：并集
    this._set('learnedGrammar',
      [...new Set([...cloudGrammarMarks, ...this.getLearnedGrammar()])]);

    // 词汇进度：lastDate 更新的那份胜出
    const mergedVocab = Object.assign({}, cloudVocab);
    Object.keys(this.getVocabProgress()).forEach(w => {
      const c = mergedVocab[w], l = this.getVocabProgress()[w];
      if (!c || !l || (l.lastDate || '') >= (c.lastDate || '')) mergedVocab[w] = l;
    });
    this._set('vocabProgress', mergedVocab);

    // 打卡天数：并集
    this._set('studyDays', [...new Set([
      ...checkins.data.map(c => c.checkin_date),
      ...(this._get('studyDays', []) || [])
    ])].sort());

    // 写作草稿：本地非空优先（本机正在写的），否则用云端的
    const draftIds = new Set(Object.keys(cloudDrafts));
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf('writingDraft_') === 0) draftIds.add(k.slice('writingDraft_'.length));
    }
    const mergedDrafts = [];
    draftIds.forEach(tid => {
      const local = this.getDraft(tid);
      const content = local || cloudDrafts[tid] || '';
      if (content) {
        this._set('writingDraft_' + tid, content);
        mergedDrafts.push({ task_id: String(tid), content: String(content) });
      }
    });

    // 设置偏好：本机从没存过设置 → 采用云端的（换浏览器恢复）；否则本地为准
    const cloudSettingsApplied = this._applyCloudSettings(settings.data && settings.data[0]);
    if (cloudSettingsApplied) {
      // 让当前页面立即套用恢复出来的字号/夜间模式
      document.dispatchEvent(new CustomEvent('cloud-settings-applied'));
    }

    // ④ 合并结果整表覆盖回云端（先删自己的旧数据再插入，两边完全一致）
    const rows = [];
    Object.keys(API_MODULE_KEYS).forEach(m => {
      this.getRecords(m).forEach(r => rows.push({
        module: m === 'mockExam' ? 'mock_exam' : m,
        item_id: String(r.itemId != null ? r.itemId
          : (r.topicId != null ? r.topicId
            : (r.title != null ? r.title : 'unknown'))),
        score: r.score != null ? r.score : (r.percentage != null ? r.percentage : null),
        correct_count: r.correctCount != null ? r.correctCount : (r.correct != null ? r.correct : null),
        total_count: r.total != null ? r.total : (r.totalQuestions != null ? r.totalQuestions : null),
        duration_seconds: r.timeUsed || null,
        completed_at: r.date ? new Date(r.date).toISOString() : undefined,
        detail: r
      }));
    });
    this.getLearnedGrammar().forEach(tid => rows.push({
      module: 'grammar', item_id: String(tid), score: 100,
      detail: { grammarMark: true }
    }));

    const vocabRows = Object.keys(mergedVocab).map(w => ({
      word: w,
      prep_level: mergedVocab[w].level === 'CET-4' ? 'CET-4' : 'CET-6',
      status: mergedVocab[w].difficulty === 'hard' ? 'learning'
        : (mergedVocab[w].difficulty === 'easy' ? 'familiar' : 'mastered'),
      first_reviewed_at: (mergedVocab[w].firstDate || '1970-01-01') + 'T00:00:00Z',
      last_reviewed_at: (mergedVocab[w].lastDate || '1970-01-01') + 'T00:00:00Z'
    }));
    const checkinRows = (this._get('studyDays', []) || []).map(d => ({
      checkin_date: d, study_seconds: 0
    }));

    // 分批插入（每批 100 行，避免单次请求过大）
    const chunk = (arr) => {
      const out = [];
      for (let i = 0; i < arr.length; i += 100) out.push(arr.slice(i, i + 100).map(r => ({ user_id: uid, ...r })));
      return out;
    };

    const del = (table) => client.from(table).delete().eq('user_id', uid);
    await Promise.all([del('user_module_records'), del('user_vocab_progress'),
                       del('user_checkins'), del('user_writing_drafts')]);

    const pushAll = async (table, arr) => {
      for (const batch of chunk(arr)) {
        const { error } = await client.from(table).insert(batch);
        if (error) throw new Error(table + ': ' + error.message);
      }
    };
    try {
      await Promise.all([
        pushAll('user_module_records', rows),
        pushAll('user_vocab_progress', vocabRows),
        pushAll('user_checkins', checkinRows),
        pushAll('user_writing_drafts', mergedDrafts)
      ]);
    } catch (e) {
      console.warn('[api] 合并结果回推云端失败:', e.message);
      return { success: false };
    }

    // 设置一并推上云端（本地为准时覆盖云端的旧值）
    this.syncSettings();

    this._set('lastCheckinSync', formatDate(new Date()));
    return {
      success: true,
      records: rows.length,
      words: vocabRows.length,
      days: checkinRows.length,
      settingsApplied: cloudSettingsApplied
    };
  }
};

// ============ 自动打卡 + 侧边栏打卡徽章（每个页面自动生效） ============

// 在侧边栏 Logo 下方显示连续打卡天数徽章
function renderStreakBadge() {
  const sidebar = document.querySelector('nav.ai-sidebar');
  if (!sidebar) return;

  let badge = document.getElementById('streak-badge');
  if (!badge) {
    const logoBlock = sidebar.querySelector('div'); // Logo 区域
    if (!logoBlock) return;
    badge = document.createElement('div');
    badge.id = 'streak-badge';
    badge.className = 'mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-fixed-dim/40 w-fit';
    logoBlock.appendChild(badge);
  }

  const streak = api.getStreak();
  badge.innerHTML =
    '<span class="material-symbols-outlined text-[16px] text-tertiary-container" ' +
    'style="font-variation-settings:\'FILL\' 1;">local_fire_department</span>' +
    '<span class="font-label-sm text-label-sm text-on-surface-variant">连续打卡 ' + streak + ' 天</span>';
}

document.addEventListener('DOMContentLoaded', () => {
  // 每天首次访问自动打卡
  if (api.checkIn()) {
    showToast('今日打卡成功！已连续学习 ' + api.getStreak() + ' 天 🔥', 'success');
  }
  renderStreakBadge();

  // 登录（页面重载后）触发双向同步
  triggerCloudSync();
});

// ============ 登录后的云端同步触发（auth.js 也会直接调用） ============

let _cloudSyncStarted = false;

/**
 * 触发一次双向同步（幂等，每次页面生命周期最多跑一次）。
 * auth.js 在登录成功 / 恢复会话后设置 pendingCloudSync 标记并调用本函数；
 * 登录后页面会自动刷新，刷新回来由 DOMContentLoaded 再兜底触发一次。
 */
function triggerCloudSync() {
  if (_cloudSyncStarted) return;
  if (!api.isLoggedIn() || localStorage.getItem('pendingCloudSync') !== '1') return;
  _cloudSyncStarted = true;
  localStorage.removeItem('pendingCloudSync');
  showToast('正在同步学习数据…', 'info');

  api.syncOnLogin().then(res => {
    if (res.success) {
      renderStreakBadge();
      showToast('同步完成：' + res.records + ' 条记录 / '
        + res.words + ' 个单词 / ' + res.days + ' 天打卡已上云 ☁️', 'success');
    } else {
      localStorage.setItem('pendingCloudSync', '1'); // 下次打开页面自动重试
      showToast('云端同步失败，稍后打开任意页面会自动重试', 'info');
    }
  });
}

// 兼容模块化导出（供 Node 环境测试用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { api, API_MODULE_KEYS };
}
