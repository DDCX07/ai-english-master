/**
 * Oral Practice Data
 * 口语跟读练习（语音识别评分）
 *
 * 每条数据：一句/一段可以朗读的英文 + 发音提示
 */

const oralData = {
  categories: ['日常场景', '校园生活', '职场沟通', '雅思口语'],
  items: [
    // ============ 日常场景 ============
    {
      id: 1,
      level: 'CET-4',
      category: '日常场景',
      text: 'Good morning! It is such a beautiful day today. Would you like to go for a walk in the park?',
      tip: '注意连读：It is 常弱读成 It\'s；beautiful 的重音在第一音节 /ˈbjuːtɪfl/。'
    },
    {
      id: 2,
      level: 'CET-4',
      category: '日常场景',
      text: 'Excuse me, could you tell me how to get to the nearest subway station?',
      tip: '问路高频句型。nearest 注意 /nɪərɪst/ 有两个音节，不要读成 near-est。'
    },
    {
      id: 3,
      level: 'CET-4',
      category: '日常场景',
      text: 'I would like to order a beef noodle soup and a glass of orange juice, please.',
      tip: 'I would like to 可以连读成 I\'d like to，更自然。please 放句尾显得礼貌。'
    },
    {
      id: 4,
      level: 'CET-4',
      category: '日常场景',
      text: 'Sorry to bother you, but I think you may have taken my umbrella by mistake.',
      tip: '委婉指出问题的句型。bother 的 th 要咬舌发音。'
    },
    // ============ 校园生活 ============
    {
      id: 5,
      level: 'CET-4',
      category: '校园生活',
      text: 'Hi, Professor Smith. I was wondering if I could ask you a few questions about the assignment.',
      tip: '礼貌提问的黄金句型 I was wondering if...，语调末尾微微上扬。'
    },
    {
      id: 6,
      level: 'CET-4',
      category: '校园生活',
      text: 'The library closes at ten o\'clock in the evening during the exam week.',
      tip: '注意 closes /ˈkləʊzɪz/ 的发音；during 的重音在第一音节。'
    },
    {
      id: 7,
      level: 'CET-6',
      category: '校园生活',
      text: 'I really enjoyed your presentation, especially the part about renewable energy.',
      tip: 'especially 重音在第二音节 /ɪˈspeʃəli/，很多同学容易读错。'
    },
    {
      id: 8,
      level: 'CET-6',
      category: '校园生活',
      text: 'Could you explain what the professor meant by the feedback loop in the lecture?',
      tip: 'feedback loop 两个词重音都在前：FEEDback LOOP。'
    },
    {
      id: 9,
      level: 'CET-6',
      category: '校园生活',
      text: 'Working on a group project taught me how to communicate with people who have different opinions.',
      tip: '长句注意意群停顿：Working on a group project / taught me / how to communicate...。'
    },
    // ============ 职场沟通 ============
    {
      id: 10,
      level: 'CET-6',
      category: '职场沟通',
      text: 'Thank you for having me today. I have three years of experience in digital marketing.',
      tip: '面试自我介绍句型。experience 注意 /ɪkˈspɪəriəns/，不要漏掉中间音节。'
    },
    {
      id: 11,
      level: 'CET-6',
      category: '职场沟通',
      text: 'I am calling to inquire about the status of my application for the software engineer position.',
      tip: 'inquire 重音在第二音节 /ɪnˈkwaɪə/；application 四个音节 /ˌæplɪˈkeɪʃn/。'
    },
    {
      id: 12,
      level: 'CET-6',
      category: '职场沟通',
      text: 'We need to reschedule tomorrow\'s meeting to Friday afternoon. Would that work for you?',
      tip: 'reschedule /riːˈʃedjuːl/ 重音在第二音节。Would that work for you 是协商常用语。'
    },
    {
      id: 13,
      level: 'CET-6',
      category: '职场沟通',
      text: 'Based on the data we collected last quarter, I would suggest that we focus on younger customers.',
      tip: '会议汇报句型。quarter 读 /ˈkwɔːtə/，不发音的 r。'
    },
    // ============ 雅思口语 ============
    {
      id: 14,
      level: 'IELTS',
      category: '雅思口语',
      text: 'My hometown is a small city in the south, famous for its delicious food and friendly people.',
      tip: 'Part 1 家乡话题标准答案结构：位置 + 特色。delicious /dɪˈlɪʃəs/ 重音在中间。'
    },
    {
      id: 15,
      level: 'IELTS',
      category: '雅思口语',
      text: 'I would like to talk about a book that influenced me deeply. It taught me never to give up.',
      tip: 'Part 2 开头万能句。influenced 结尾的 -ced 读 /nst/。'
    },
    {
      id: 16,
      level: 'IELTS',
      category: '雅思口语',
      text: 'The most memorable trip I have ever taken was to Yunnan last spring with my best friends.',
      tip: '最高级 the most memorable 注意 memorable /ˈmemərəbl/ 只有四个音节。'
    },
    {
      id: 17,
      level: 'IELTS',
      category: '雅思口语',
      text: 'In my opinion, technology has made communication faster, but not necessarily deeper.',
      tip: 'Part 3 观点句。necessarily /ˈnesəsərəli/ 是发音难点，多练几遍。'
    },
    {
      id: 18,
      level: 'IELTS',
      category: '雅思口语',
      text: 'There is no doubt that reading habits have changed dramatically since the rise of smartphones.',
      tip: 'dramatically 重音在第二音节 /drəˈmætɪkli/，结尾 -cally 读 /kli/。'
    }
  ]
};

// 工具函数
function getOralItems(category) {
  return category === 'all'
    ? oralData.items
    : oralData.items.filter(item => item.category === category);
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { oralData, getOralItems };
}
