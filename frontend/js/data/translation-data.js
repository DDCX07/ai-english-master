/**
 * Translation Practice Data
 * 中译英句子翻译练习（CET-4 / CET-6 / IELTS）
 *
 * 每条数据包含：
 * - chinese: 中文原句
 * - english: 参考译文
 * - keywords: 得分点（用户译文里应出现的关键表达）
 *             用 | 分隔多个可选表达，命中任意一个即得分
 * - note: 考点说明
 */

const translationData = {
  categories: ['生活与社会', '经济与科技', '教育与文化'],
  items: [
    // ============ CET-4 ============
    {
      id: 1,
      level: 'CET-4',
      category: '生活与社会',
      chinese: '随着经济的快速发展，人们的生活水平有了显著提高。',
      english: 'With the rapid development of the economy, people\'s living standards have improved significantly.',
      keywords: ['with the rapid development', 'living standards | quality of life', 'significantly | greatly'],
      note: '【考点】"随着……" 用 with 短语开头，比 as 引导的从句更简洁。'
    },
    {
      id: 2,
      level: 'CET-4',
      category: '生活与社会',
      chinese: '春节是中国最重要的传统节日。',
      english: 'The Spring Festival is the most important traditional festival in China.',
      keywords: ['spring festival', 'the most important', 'traditional festival'],
      note: '【考点】最高级 the most important + 传统节日 traditional festival。'
    },
    {
      id: 3,
      level: 'CET-4',
      category: '生活与社会',
      chinese: '这座城市以其悠久的历史和美丽的风景而闻名。',
      english: 'This city is famous for its long history and beautiful scenery.',
      keywords: ['famous for | known for', 'long history', 'beautiful scenery'],
      note: '【考点】"以……而闻名" be famous for / be known for。'
    },
    {
      id: 4,
      level: 'CET-4',
      category: '生活与社会',
      chinese: '保护环境是我们每个人的责任。',
      english: 'Protecting the environment is the responsibility of every one of us.',
      keywords: ['protecting the environment | to protect the environment', 'responsibility | duty'],
      note: '【考点】动名词短语 Protecting... 作主语，谓语用单数。'
    },
    {
      id: 5,
      level: 'CET-4',
      category: '经济与科技',
      chinese: '越来越多的中国人出国旅游。',
      english: 'More and more Chinese people travel abroad.',
      keywords: ['more and more | an increasing number of', 'travel abroad | go abroad'],
      note: '【考点】"越来越多" more and more 或高级表达 an increasing number of。'
    },
    {
      id: 6,
      level: 'CET-4',
      category: '经济与科技',
      chinese: '手机的普及改变了人们的交流方式。',
      english: 'The popularity of mobile phones has changed the way people communicate.',
      keywords: ['popularity | wide use', 'has changed | have changed', 'the way people communicate | how people communicate'],
      note: '【考点】"改变已经发生" 用现在完成时；"的方式" the way... 结构。'
    },
    {
      id: 7,
      level: 'CET-4',
      category: '经济与科技',
      chinese: '中国的高铁技术处于世界领先地位。',
      english: 'China\'s high-speed railway technology is among the best in the world.',
      keywords: ['high-speed railway | high-speed rail', 'among the best | leading'],
      note: '【考点】"处于领先地位" be among the best / take the lead。'
    },
    {
      id: 8,
      level: 'CET-4',
      category: '经济与科技',
      chinese: '许多年轻人喜欢在网上购物。',
      english: 'Many young people enjoy shopping online.',
      keywords: ['many young people', 'enjoy shopping online | like to shop online'],
      note: '【考点】enjoy 后接动名词 doing；"网购" shop online。'
    },
    {
      id: 9,
      level: 'CET-4',
      category: '教育与文化',
      chinese: '读书可以帮助我们开阔眼界。',
      english: 'Reading can help us broaden our horizons.',
      keywords: ['reading | reading books', 'broaden | widen', 'horizons | minds'],
      note: '【考点】"开阔眼界" broaden one\'s horizons 是固定搭配。'
    },
    {
      id: 10,
      level: 'CET-4',
      category: '教育与文化',
      chinese: '长城是世界上最伟大的建筑之一。',
      english: 'The Great Wall is one of the greatest buildings in the world.',
      keywords: ['the great wall', 'one of the greatest', 'in the world'],
      note: '【考点】"之一" one of + 最高级 + 复数名词。'
    },
    // ============ CET-6 ============
    {
      id: 11,
      level: 'CET-6',
      category: '生活与社会',
      chinese: '只有通过不断的练习，我们才能提高英语水平。',
      english: 'Only through constant practice can we improve our English.',
      keywords: ['only through', 'constant practice', 'can we | will we'],
      note: '【考点】Only + 状语位于句首时，主句要部分倒装（can we improve）。'
    },
    {
      id: 12,
      level: 'CET-6',
      category: '生活与社会',
      chinese: '我们决不能忽视心理健康问题。',
      english: 'By no means can we ignore mental health problems.',
      keywords: ['by no means | never', 'ignore | neglect', 'mental health'],
      note: '【考点】否定副词 By no means 放句首同样引起部分倒装。'
    },
    {
      id: 13,
      level: 'CET-6',
      category: '生活与社会',
      chinese: '由于天气不好，运动会不得不推迟。',
      english: 'Due to the bad weather, the sports meeting had to be postponed.',
      keywords: ['due to | because of | owing to', 'had to be postponed | was postponed'],
      note: '【考点】"不得不" had to；"推迟" postpone 常用被动。'
    },
    {
      id: 14,
      level: 'CET-6',
      category: '生活与社会',
      chinese: '越是努力工作，你就越有可能成功。',
      english: 'The harder you work, the more likely you are to succeed.',
      keywords: ['the harder', 'the more likely', 'to succeed | succeed'],
      note: '【考点】"越……越……" 用 the + 比较级，the + 比较级 结构。'
    },
    {
      id: 15,
      level: 'CET-6',
      category: '经济与科技',
      chinese: '人工智能正在深刻地改变我们的生活。',
      english: 'Artificial intelligence is profoundly changing our lives.',
      keywords: ['artificial intelligence', 'profoundly | greatly | significantly', 'changing our lives | transform'],
      note: '【考点】进行时表示正在发生的影响；"深刻地" profoundly。'
    },
    {
      id: 16,
      level: 'CET-6',
      category: '经济与科技',
      chinese: '毫无疑问，科技的发展既带来了机遇也带来了挑战。',
      english: 'There is no doubt that the development of technology has brought both opportunities and challenges.',
      keywords: ['no doubt', 'has brought | brings', 'both opportunities and challenges'],
      note: '【考点】"毫无疑问" There is no doubt that...；"既……也……" both...and...。'
    },
    {
      id: 17,
      level: 'CET-6',
      category: '经济与科技',
      chinese: '我们应该采取措施防止这种情况再次发生。',
      english: 'We should take measures to prevent this from happening again.',
      keywords: ['take measures | take action', 'prevent', 'from happening again'],
      note: '【考点】"采取措施" take measures；"防止……发生" prevent...from doing。'
    },
    {
      id: 18,
      level: 'CET-6',
      category: '经济与科技',
      chinese: '智能手机已经成为人们日常生活中不可缺少的一部分。',
      english: 'Smartphones have become an indispensable part of people\'s daily lives.',
      keywords: ['have become | have turned into', 'indispensable | essential', 'daily lives | daily life'],
      note: '【考点】"不可缺少的" indispensable / essential；"日常生活" daily life。'
    },
    {
      id: 19,
      level: 'CET-6',
      category: '教育与文化',
      chinese: '教育在个人发展中扮演着重要角色。',
      english: 'Education plays an important role in personal development.',
      keywords: ['plays an important role | plays a significant role', 'personal development'],
      note: '【考点】"扮演重要角色" play an important role in...。'
    },
    {
      id: 20,
      level: 'CET-6',
      category: '教育与文化',
      chinese: '只要坚持练习，你的口语就会不断进步。',
      english: 'As long as you keep practicing, your spoken English will keep improving.',
      keywords: ['as long as', 'keep practicing | keep practising | practice regularly', 'spoken english | oral english'],
      note: '【考点】"只要" as long as 引导条件状语从句；"口语" spoken English。'
    },
    {
      id: 21,
      level: 'CET-6',
      category: '教育与文化',
      chinese: '这个问题值得进一步讨论。',
      english: 'This problem deserves further discussion.',
      keywords: ['deserves | worth', 'further discussion | further discussing'],
      note: '【考点】"值得" deserve / be worth 两种表达；worth 后接动名词。'
    },
    {
      id: 22,
      level: 'CET-6',
      category: '教育与文化',
      chinese: '在当今竞争激烈的社会中，终身学习变得越来越重要。',
      english: 'In today\'s competitive society, lifelong learning is becoming increasingly important.',
      keywords: ['competitive society', 'lifelong learning', 'increasingly important | more and more important'],
      note: '【考点】"终身学习" lifelong learning；"越来越" increasingly + 形容词。'
    },
    // ============ IELTS ============
    {
      id: 23,
      level: 'IELTS',
      category: '生活与社会',
      chinese: '一些人认为网络教育终将取代传统课堂。',
      english: 'Some people believe that online education will eventually replace traditional classrooms.',
      keywords: ['some people believe | some people argue', 'eventually | finally', 'replace traditional classrooms | replace traditional education'],
      note: '【考点】宾语从句 that...；"终将" eventually。'
    },
    {
      id: 24,
      level: 'IELTS',
      category: '生活与社会',
      chinese: '政府应当鼓励公众参与环境保护。',
      english: 'The government should encourage the public to participate in environmental protection.',
      keywords: ['encourage', 'participate in | take part in | get involved in', 'environmental protection | protecting the environment'],
      note: '【考点】"鼓励某人做某事" encourage sb. to do；"参与" participate in。'
    },
    {
      id: 25,
      level: 'IELTS',
      category: '经济与科技',
      chinese: '科技进步的双刃剑效应值得我们认真思考。',
      english: 'The double-edged effect of technological progress deserves our careful consideration.',
      keywords: ['double-edged', 'technological progress | the advancement of technology', 'deserves | is worth'],
      note: '【考点】"双刃剑" double-edged sword / double-edged effect，写作高频表达。'
    },
    {
      id: 26,
      level: 'IELTS',
      category: '经济与科技',
      chinese: '如何在发展经济的同时保护环境，是各国共同面临的难题。',
      english: 'How to protect the environment while developing the economy is a challenge faced by all countries.',
      keywords: ['protect the environment | protecting the environment', 'while developing | while we develop', 'challenge | problem | difficult issue'],
      note: '【考点】疑问词 + 不定式 How to... 作主语；while doing 伴随结构。'
    },
    {
      id: 27,
      level: 'IELTS',
      category: '教育与文化',
      chinese: '教育的目的不仅是传授知识，更是培养独立思考的能力。',
      english: 'The purpose of education is not only to impart knowledge but also to cultivate the ability to think independently.',
      keywords: ['not only | more than', 'impart | pass on | transmit', 'think independently | independent thinking'],
      note: '【考点】"不仅……更……" not only...but also...；"传授知识" impart knowledge。'
    },
    {
      id: 28,
      level: 'IELTS',
      category: '教育与文化',
      chinese: '跨文化交流有助于消除偏见、增进相互理解。',
      english: 'Cross-cultural communication helps eliminate prejudice and promote mutual understanding.',
      keywords: ['cross-cultural | intercultural', 'eliminate | reduce | remove', 'mutual understanding'],
      note: '【考点】"跨文化的" cross-cultural；"增进相互理解" promote mutual understanding。'
    }
  ]
};

// ============ 真题段落翻译（2025年6月 四六级） ============
// 段落级整篇翻译，keywords 为全篇得分点（命中任意一个可选表达即得分）
translationData.passages = [
  {
    id: 201,
    level: 'CET-6',
    exam: '2025年6月真题（第1套）',
    category: '经济与科技',
    title: '天宫空间站',
    chinese: '天宫空间站（Tiangong Space Station）是中国首个太空实验室，拥有110多立方米使用空间，可驻留三名宇航员，在距地球表面400—450公里的轨道上运行。天宫空间站已实施180多个科学研究与应用项目，涉及空间生命科学、太空医学、空间材料科学等领域。天宫空间站的研究成果在我国得到了广泛应用，产生了显著的经济效益。例如，太空育种创造的直接经济效益高达数千亿元。这不仅标志中国在航天技术上取得了巨大进步，也表明中国为全球的太空研究和应用做出了重大贡献。',
    english: 'The Tiangong Space Station, China\'s first space laboratory, boasts over 110 cubic meters of usable space and can accommodate three astronauts. It operates in orbit at an altitude of 400-450 kilometers above Earth\'s surface. The Tiangong Space Station has already carried out more than 180 scientific research and application projects, covering fields such as space life science, space medicine, and space materials science. The research findings from the Tiangong Space Station have been widely applied in China, generating significant economic benefits. For instance, space breeding alone has created direct economic benefits amounting to hundreds of billions of yuan. This not only marks China\'s enormous progress in aerospace technology but also demonstrates its significant contributions to global space research and applications.',
    keywords: [
      'first space laboratory',
      'more than 110 cubic meters | over 110 cubic meters',
      'accommodate three astronauts',
      'orbit',
      'carried out | conducted | implemented',
      'space life science | space medicine | space materials science',
      'widely applied | widely used',
      'economic benefits',
      'hundreds of billions of yuan',
      'not only marks | not only signifies',
      'contributions to global space research | contributions to global space'
    ],
    note: '【考点】"中国首个……" 同位语结构（China\'s first space laboratory）；"涉及……领域" covering fields such as...；"数千亿元" hundreds of billions of yuan（注意百亿级数量换算）；"不仅……也……" not only...but also... 句式。'
  },
  {
    id: 202,
    level: 'CET-6',
    exam: '2025年6月真题（第2套）',
    category: '生活与社会',
    title: '南水北调工程',
    chinese: '自古以来，中国的水资源北缺南丰，分布极不均衡。为了有效解决北方严重缺水问题，中国政府实施了南水北调工程（the South-to-North Water Diversion Project）。这是一项跨区域配置水资源的宏大水利工程。历经数十年的规划与筹备，工程于2002年开工建设，分为东、中、西三条线路，总长4350公里，惠及人口将超过4亿。自2014年通水以来，工程向北方调水累计已超500亿立方米，为北方地区的人民提供了可靠的水资源，同时也极大地改善了这一地区的生态环境，促进了经济的可持续健康发展。',
    english: 'Since ancient times, water resources in China have been scarce in the north and abundant in the south, with an extremely uneven distribution. To effectively solve the serious water shortage problem in the north, the Chinese government has implemented the South-to-North Water Diversion Project. This is a grand water conservancy project for the cross-regional allocation of water resources. After decades of planning and preparation, the project started construction in 2002 and is divided into three lines: the east, middle and west, with a total length of 4,350 kilometers, benefiting a population of over 400 million. Since the water supply was put into operation in 2014, the project has transported over 50 billion cubic meters of water to the north, providing reliable water resources for the people in the northern regions. At the same time, it has greatly improved the ecological environment of this area and promoted the sustainable and healthy development of the economy.',
    keywords: [
      'scarce in the north and abundant in the south',
      'uneven distribution',
      'South-to-North Water Diversion Project',
      'water conservancy project',
      'cross-regional allocation | cross-regional distribution',
      'started construction in 2002 | began construction in 2002',
      'total length of 4,350 kilometers | total length of 4350 kilometers',
      'over 400 million | more than 400 million',
      '50 billion cubic meters',
      'ecological environment',
      'sustainable'
    ],
    note: '【考点】"北缺南丰" scarce in the north and abundant in the south 对仗表达；"水利工程" water conservancy project（固定术语）；"惠及人口超过4亿" 现在分词伴随 benefiting a population of over 400 million；"500亿立方米" 50 billion cubic meters（亿↔billion 换算）；"可持续健康发展" sustainable and healthy development。'
  },
  {
    id: 203,
    level: 'CET-4',
    exam: '2025年6月真题（第1套）',
    category: '经济与科技',
    title: '杂交水稻之父袁隆平',
    chinese: '被誉为"杂交水稻（hybrid rice）之父"的袁隆平和他的科研团队克服重重困难，研发出了一种超级杂交水稻。这项技术获得了举世公认的巨大成功。通过这项技术的应用，水稻抗旱抗病能力更强，能适应不同的气候和土壤条件，产量可提高20%至30%。超级杂交水稻营养丰富，口感更佳。目前，这项技术已经在许多国家得到广泛应用，为全球粮食安全做出了重大贡献。',
    english: 'Yuan Longping, known as the "Father of Hybrid Rice," and his research team overcame numerous difficulties to develop a super hybrid rice. This technology has achieved globally recognized great success. Through the application of this technology, rice has stronger drought and disease resistance, can adapt to different climatic and soil conditions, and its yield can be increased by 20%-30%. Super hybrid rice is rich in nutrition and has a better taste. At present, this technology has been widely applied in many countries, making significant contributions to global food security.',
    keywords: [
      'Father of Hybrid Rice',
      'overcame numerous difficulties | overcame many difficulties',
      'super hybrid rice',
      'globally recognized',
      'drought and disease resistance',
      'climatic and soil conditions | climate and soil conditions',
      'yield',
      'rich in nutrition | rich in nutrients',
      'better taste',
      'widely applied | widely used',
      'food security'
    ],
    note: '【考点】"被誉为……之父" known as the "Father of..." 同位语插入结构；"抗旱抗病能力" drought and disease resistance（名词化表达）；"产量可提高20%至30%" its yield can be increased by 20%-30%（被动+by幅度）；"为……做出重大贡献" making significant contributions to...（分词作状语表结果）。'
  },
  {
    id: 204,
    level: 'CET-4',
    exam: '2025年6月真题（第2套）',
    category: '生活与社会',
    title: '15分钟便民生活圈',
    chinese: '近年来，中国越来越多的城市着力打造"15分钟便民生活圈"（convenient living circles）。社区居民步行15分钟就能享受到日常所需的公共服务。生活圈内建有便利店、公园、健身场地、图书馆、学校、社区食堂、诊所等。生活圈的建立能够为居民提供更加便利、舒适、友好、愉悦的生活环境，更好地满足城市居民多元化的日常生活服务需求，提升居民的生活品质和幸福感。',
    english: 'In recent years, more and more cities in China have been committed to building "15-minute convenient living circles." Community residents can enjoy the daily public services they need within a 15-minute walk. Inside the living circles, there are convenience stores, parks, fitness grounds, libraries, schools, community canteens, clinics and so on. The establishment of living circles can provide residents with a more convenient, comfortable, friendly and pleasant living environment, better meet the diversified daily service needs of urban residents, and improve their quality of life and sense of happiness.',
    keywords: [
      'more and more cities | a growing number of cities',
      'convenient living circles',
      'public services',
      'within a 15-minute walk | a 15-minute walk',
      'convenience stores',
      'fitness grounds | fitness venues',
      'community canteens',
      'pleasant living environment',
      'diversified | diverse',
      'quality of life',
      'sense of happiness | sense of well-being | well-being'
    ],
    note: '【考点】"着力打造" be committed to building（to 为介词后接动名词）；"步行15分钟" within a 15-minute walk（注意连字符构词）；并列名词"便利店、公园……诊所等"用 and so on 收尾；"提升生活品质和幸福感" improve quality of life and sense of happiness（四字格对仗直译即可）。'
  }
];

// 工具函数
function getTranslationItems(level, category) {
  return translationData.items.filter(item => {
    if (level !== 'all' && item.level !== level) return false;
    if (category !== 'all' && item.category !== category) return false;
    return true;
  });
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translationData, getTranslationItems };
}
