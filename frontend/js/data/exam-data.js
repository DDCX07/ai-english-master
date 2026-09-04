/**
 * Mock Exam Data — 真题题库
 *
 * 全部来自历年四六级考试真题的仔细阅读（Reading Comprehension Section C）部分：
 * - 2025年12月 四级 第1套（服药时间 / 美国人工作到70多岁）
 * - 2025年12月 六级 第1套（友谊与个人主义 / 马丁·路德·金与公平）
 * - 2024年12月 四级 第1套（财商教育 / 巧克力与全球变暖）
 *
 * 解析均依据原文原句，可在对应真题 PDF（sources 文件夹）中核对。
 */

const examData = {
  title: "CET Real Exam Bank",
  duration: 40,
  passingScore: 60,
  questions: [
    // ==================== 2025年12月 四级 第1套 · Passage One（服药时间） ====================
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "What do we learn from the passage about the timing of our behaviors?",
      options: [
        "It has a considerable impact on our health.",
        "It confines us to a 24-hour day-night cycle.",
        "It requires us to follow a particular rhythm.",
        "It holds the key to all human body functions."
      ],
      correctAnswer: 0,
      explanation: "原文第一段：the timing of behaviors like exercise or food intake can significantly influence your health（锻炼、进食等行为发生的时间会显著影响健康）。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "What does the author say about the proteins in our body?",
      options: [
        "They can modify the effects of medicines in different ways.",
        "They can reduce unwanted side effects of certain medicines.",
        "Their reaction to medicines changes during the day-night cycle.",
        "Their design determines how differently they react to medicines."
      ],
      correctAnswer: 2,
      explanation: "原文第二段：the specific proteins a drug is designed to modify can react differently to the medicine over the course of a 24-hour period（药物靶向的蛋白质在24小时周期内对药物的反应会发生变化）。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "What do doctors do when prescribing medicine for people?",
      options: [
        "They give little thought to the time of taking it for maximum effect.",
        "They rarely consider which medicine works better for which patient.",
        "They tell patients its possible side effects during a period of 24 hours.",
        "They tell patients to comply with the directions of drug manufacturers."
      ],
      correctAnswer: 0,
      explanation: "原文第三段：When doctors prescribe medicine for people, they rarely consider the best time to take it（医生开药时很少考虑服药的最佳时间）。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "Why do doctors advise patients to take most drugs in the morning or in the evening?",
      options: [
        "To discourage them from making complaints.",
        "To ensure they take the drugs as instructed.",
        "To comply with new research findings strictly.",
        "To guarantee the maximum effect of the drugs."
      ],
      correctAnswer: 1,
      explanation: "原文第三段末：patients are directed to take most drugs during the morning or evening primarily to ensure compliance（主要是为了确保病人遵医嘱服药）。compliance = 遵从。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "What does the author suggest near the end of the passage?",
      options: [
        "Considering drug-taking timing when prescribing drugs for patients.",
        "Making treatments less complex by taking drug timing into account.",
        "Conducting more studies to find out the best timing for treating different diseases.",
        "Finding out the most effective drugs for treating diseases through further research."
      ],
      correctAnswer: 2,
      explanation: "原文结尾段首句：More research is needed to determine the best times to administer treatments for different diseases（需要开展更多研究来确定治疗不同疾病的最佳给药时间）。"
    },

    // ==================== 2025年12月 四级 第1套 · Passage Two（工作到70多岁） ====================
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "What do we learn from the passage about the economics professor and her hairdresser?",
      options: [
        "They differ in their reasons for continuing to work.",
        "They are both committed to working into their 70s.",
        "They are happy about their current financial situation.",
        "They hold different views about postponing retirement."
      ],
      correctAnswer: 0,
      explanation: "原文第一段：经济学教授继续工作是因为 she wants to（她想工作），而理发师是 She needs the money（她需要钱）——两人继续工作的原因不同。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "What is one of the reasons for people to delay retirement?",
      options: [
        "More and more people have switched to less intellectually challenging jobs.",
        "The number of jobs suitable for older people has increased in the private sector.",
        "The rate of wage increase in terms of purchasing power has slowed down for years.",
        "More and more people in the workplace find it hard to rely on traditional pensions."
      ],
      correctAnswer: 2,
      explanation: "原文第三段：years of slow rise in real wages（实际工资多年增长缓慢）。real wages 即按购买力计算的工资，对应 C 项 the rate of wage increase in terms of purchasing power has slowed down。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "What is the general trend in people delaying retirement?",
      options: [
        "The higher their earnings, the more likely they are tempted to delay retirement.",
        "Those who have more job satisfaction tend to retire later than those who have less.",
        "More men than women are likely to stay in the labor force until their late seventies.",
        "The higher their educational level, the more likely they are to delay retirement."
      ],
      correctAnswer: 3,
      explanation: "原文倒数第三段：学士学位者70多岁仍在工作的比例近 20%，修过部分大学课程者约 15%，高中及以下学历者约 10%——教育水平越高，延迟退休比例越高。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "What is the chief reason for college-educated workers delaying retirement according to an economist?",
      options: [
        "Enjoying financial security.",
        "Staying connected socially.",
        "Contributing more professionally.",
        "Increasing social security payments."
      ],
      correctAnswer: 1,
      explanation: "原文：many college-educated workers are choosing to stay in the labor force more for social benefits than for financial reasons（受过大学教育的劳动者继续工作更多是出于社交方面的益处而非经济原因）。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2025年12月四级第1套",
      question: "What does the passage say about people doing manual work?",
      options: [
        "They are eager to enjoy life after retiring.",
        "They are likely to have financial troubles.",
        "They generally don't enjoy doing it.",
        "They tend to anticipate retirement."
      ],
      correctAnswer: 3,
      explanation: "原文末段：Workers in more physical jobs... may be more likely to look forward to retiring（从事体力劳动的工人更可能期盼退休）。look forward to = anticipate。"
    },

    // ==================== 2025年12月 六级 第1套 · Passage One（友谊与个人主义） ====================
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "What often happens when people are eager to pursue individual success?",
      options: [
        "They lack a shoulder to cry on.",
        "They have no soul to confide in.",
        "They cannot find reliable friends.",
        "They ignore their ties with friends."
      ],
      correctAnswer: 3,
      explanation: "原文第一段：in our eagerness to seek individual success, we lose friends along the way（在追求个人成功的急切中，我们会在路上失去朋友），即忽视与朋友的联系。"
    },
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "What does the author advise people to do in their pursuit of radical individualism?",
      options: [
        "Reexamine its detrimental effects.",
        "Shrug off the loss of their loved ones.",
        "Avoid the chaos and turmoil involved.",
        "Remove aggressive obstacles in the way."
      ],
      correctAnswer: 0,
      explanation: "原文第二段末：We must reevaluate the harm of radical, individual freedom（我们必须重新评估激进的个人自由之害）。reevaluate the harm = reexamine its detrimental effects。"
    },
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "What is American society's assumption of personal achievement?",
      options: [
        "It is to be duly celebrated and highly commended.",
        "It is a sure way to fulfill a person's dream.",
        "It revolves around an individualistic culture.",
        "It reflects a person's exceptional endeavor."
      ],
      correctAnswer: 3,
      explanation: "原文第四段：celebrate personal achievement... based on the assumption that winning or succeeding is a consequence of working harder than the next person（社会赞美个人成就的前提是：成功是因为比别人更努力），即成就是个人非凡努力的结果。"
    },
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "What is preached in many success stories?",
      options: [
        "Attaching importance to academic gains on the road to success.",
        "Investing one's time in work instead of connecting with friends.",
        "Trying to strengthen friendships in one's pursuit of personal success.",
        "Excelling in academic performance to get into a prestigious college."
      ],
      correctAnswer: 1,
      explanation: "原文第五段：Spend too much time with friends? You're losing time better utilized on your achievements. Invest time in your relationships? Invest time in your work instead（把时间花在工作上而不是朋友身上）。"
    },
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "What can we infer from the passage regarding the pursuit of success?",
      options: [
        "No one can succeed without pushing limits.",
        "No one can afford to neglect close friends.",
        "Collectivism is superior to individualism.",
        "Success experts often lead people to ruin."
      ],
      correctAnswer: 1,
      explanation: "原文后两段：We cannot be complacent with losing friendships because they are our anchors；having people to support and love you... is far more important than any end result（朋友是锚，有人支持远比结果重要）——不能忽视亲近的朋友。"
    },

    // ==================== 2025年12月 六级 第1套 · Passage Two（马丁·路德·金与公平） ====================
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "What does the author think about today's America?",
      options: [
        "It is struggling to transform fiction into reality.",
        "It has been the focus of many vital conversations.",
        "It still has a long way to go before equity can be truly realized.",
        "It has got to a point where people disagree on nearly every issue."
      ],
      correctAnswer: 2,
      explanation: "原文第二段：our society is still struggling to separate truth from fantasy... America is at a crossroads（社会仍在挣扎，美国处在十字路口），结合全文主题——真正的公平尚未实现，仍有很长的路要走。"
    },
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "What do we learn from the passage about black students in the past 20 years?",
      options: [
        "They have been unfairly treated regarding higher education.",
        "They have been battling hard to address equity issues.",
        "They have boosted their lifetime incomes by billions of dollars.",
        "They have come to see the consequences of racial discrimination."
      ],
      correctAnswer: 0,
      explanation: "原文第三段：Black students could have increased their lifetime incomes $90-113 billion if equity issues related to higher education had been adequately addressed（如果高等教育公平问题得到妥善解决，黑人学生本可多挣 900-1130 亿美元）——虚拟语气说明他们在高等教育方面受到了不公平对待。"
    },
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "How can Americans bridge the differences that divide them?",
      options: [
        "By dealing with the thorny issues confronting them.",
        "By seizing every chance to enhance racial harmony.",
        "By continuing to pursue Martin Luther King Jr.'s cause.",
        "By striving to identify exceedingly valuable opportunities."
      ],
      correctAnswer: 2,
      explanation: "原文第四段末：by honoring King's legacy, we can get our country back on the path toward true equity（继承金的遗产，才能重回通往真正公平的道路），即继续推进马丁·路德·金的事业。"
    },
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "How do most Americans view America as a nation according to a recent survey?",
      options: [
        "It is compelled to address its historical social issues.",
        "It is delaying advancements toward racial equality.",
        "It has kept itself from polarization.",
        "It has become increasingly split."
      ],
      correctAnswer: 3,
      explanation: "原文：77 percent of Americans believe the nation is more divided than ever before（77% 的美国人认为国家比以往任何时候都更加分裂）。divided = split。"
    },
    {
      type: "reading",
      level: "CET-6",
      source: "2025年12月六级第1套",
      question: "What does the author suggest Americans do?",
      options: [
        "Ensure the well-being of their children and grandchildren.",
        "Make joint efforts to tackle the nation's equity issues.",
        "Restrain their intolerance and discrimination.",
        "Restore social order for a harmonious nation."
      ],
      correctAnswer: 1,
      explanation: "原文结尾：let's commit to working together to disrupt the status quo... build a better, more inclusive nation（共同致力于打破现状、建设更包容的国家）——即共同努力解决公平问题。"
    },

    // ==================== 2024年12月 四级 第1套 · Passage One（财商教育） ====================
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "What has the author come to realise since entering university?",
      options: [
        "He needs a crash course on financial terms.",
        "He is very much lacking in financial literacy.",
        "It requires consistent education to be financially independent.",
        "It is unrealistic to give all Australian youth a financial education."
      ],
      correctAnswer: 1,
      explanation: "原文第一段：I've come to realise just how little I know about money（我意识到自己对钱的知识多么匮乏），即非常缺乏财商素养。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "How did the author feel in today's money world?",
      options: [
        "Badly equipped to survive.",
        "Ignorant of financial literature.",
        "Barely capable of moving ahead.",
        "Overwhelmed by the resources online."
      ],
      correctAnswer: 0,
      explanation: "原文第四段：I was sailing the financial seas with no skills and no life jacket（在没有技能、没有救生衣的情况下航行于金融海洋）——装备严重不足，难以应对。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "What did the author realise after talking to his friends?",
      options: [
        "They were as keen as he was on financial matters.",
        "The schooling system was to blame for his trouble.",
        "High schoolers knew nothing about the modern financial world.",
        "Financial courses were as unpopular as compulsory English classes."
      ],
      correctAnswer: 1,
      explanation: "原文第五段：it wasn't my ignorance but the lack of financial education in our schooling system that is leaving high schoolers seriously behind（不是我无知，而是学校教育体系缺乏财商教育）——责任在学校教育体系。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "What is the author's idea of a financial education course?",
      options: [
        "It should foresee students' needs after graduation.",
        "It should provide students with some basic knowledge.",
        "It should be taught the same way as English is taught.",
        "It should be integrated into high school education."
      ],
      correctAnswer: 3,
      explanation: "原文第七段：It shouldn't be just a one-day event but a course integrated throughout the whole of high school（不应只是一次性活动，而应是贯穿整个高中的课程）。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "What would financial literacy do to young people?",
      options: [
        "Allow them to enter adulthood with financial security.",
        "Enable them to look after themselves without worrying about money.",
        "Render them confident and secure in terms of money management.",
        "Help them become familiar with the world of money."
      ],
      correctAnswer: 2,
      explanation: "原文末段：enter adulthood with confidence and security so that they are able to manage their own money（自信、安心地步入成年，能够管理自己的钱财）——即在资金管理方面自信而有安全感。"
    },

    // ==================== 2024年12月 四级 第1套 · Passage Two（巧克力与全球变暖） ====================
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "What do people believe chocolates can do?",
      options: [
        "Cheer them up instantly.",
        "Create happy calories.",
        "Conceal emotional distress.",
        "Relieve them of heart trouble."
      ],
      correctAnswer: 0,
      explanation: "原文第一段：We all have faith in chocolates to delight us in an instant（我们都相信巧克力能立刻让我们开心起来）。delight in an instant = cheer up instantly。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "What was scientists' recent assertion about chocolates?",
      options: [
        "They could become a rare treat in the near future.",
        "They could calm people down a bit in times of crisis.",
        "They could prevent people from getting heartbroken.",
        "They could become unavailable in less than 30 years."
      ],
      correctAnswer: 3,
      explanation: "原文第二段：scientists claimed that they can become extinct by 2050（科学家称巧克力可能到 2050 年灭绝）——从现在算不足 30 年，即 30 年内可能消失。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "What would happen if the cacao farms were shifted to cooler mountainous areas?",
      options: [
        "The natural habitat of wildlife there would be ruined.",
        "The cacao farmers would have a tough time to adapt.",
        "The rainforests would be shrinking dramatically.",
        "The quality of cocoa beans would suffer greatly."
      ],
      correctAnswer: 0,
      explanation: "原文第四段：farms will then have to be shifted to cooler mountainous areas, which are the natural habitat of wildlife（可可农场将不得不迁往更凉快的山区，而那里是野生动物的天然栖息地）——会破坏野生动物栖息地。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "What do we learn about the cacao farms in the crisis of global warming?",
      options: [
        "They try to seek help from gene-editing scientists.",
        "They decide to move to cooler mountainous areas.",
        "They have suffered a lot due to a decrease in produce.",
        "They have benefited by raising prices of cocoa beans."
      ],
      correctAnswer: 2,
      explanation: "原文第五段：the crisis of global warming has already had a serious negative impact on cacao farms' yields（全球变暖危机已严重影响可可农场产量）——产量下降损失惨重。"
    },
    {
      type: "reading",
      level: "CET-4",
      source: "2024年12月四级第1套",
      question: "What are scientists trying to do in the University of California's new bio-sciences building?",
      options: [
        "Build rows of refrigerated greenhouses for research on cacao seedlings.",
        "Gene-edit cacao seedlings for them to withstand a drier, warmer climate.",
        "Produce chocolates with the latest gene-editing technology.",
        "Transplant the genes of tougher plants to cacao seedlings."
      ],
      correctAnswer: 1,
      explanation: "原文末段：make tiny, precise changes to the DNA of the seedlings to make the cocoa crops survive in warmer and drier climates（对幼苗 DNA 做微小精确的修改，使可可作物能在更暖更干的气候中存活）——即基因编辑使其耐旱耐热。"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = examData;
}
