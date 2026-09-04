/**
 * Writing Practice Data
 * CET-4 / CET-6 / IELTS writing tasks
 *
 * 每个任务包含：题目要求、写作提纲、范文、常用表达、写作提示
 */

const writingData = {
  tasks: [
    {
      id: 1,
      type: "essay",
      level: "CET-6",
      title: "The Impact of Mobile Payment",
      timeLimit: 30,
      suggestedWords: "150-200",
      prompt: "For this part, you are allowed 30 minutes to write an essay on the impact of mobile payment. You should write at least 150 words but no more than 200 words. Base your essay on the outline given below in Chinese.",
      promptCN: "请就移动支付（mobile payment）对日常生活的影响写一篇短文：1) 移动支付带来的便利；2) 移动支付可能存在的问题；3) 你的看法。",
      outline: [
        "Introduction: mobile payment has become part of daily life",
        "Benefits: convenience, speed, no need to carry cash",
        "Problems: privacy risks, elderly people may feel excluded",
        "Conclusion: embrace it while managing the risks"
      ],
      sampleEssay: "With a simple scan of a QR code, people in China can pay for almost everything, from a cup of coffee to a monthly rent. Mobile payment has quietly reshaped the way we live.\n\nThe benefits are obvious. It is fast, convenient and eliminates the need to carry cash or wait for change. For small businesses, it reduces the risk of receiving fake banknotes and makes daily accounting much easier.\n\nHowever, mobile payment is not without problems. Personal information may be leaked or misused by third parties. Moreover, some elderly people who are unfamiliar with smartphones find themselves excluded in an increasingly cashless society.\n\nIn my view, mobile payment is an irreversible trend that has brought great convenience to our lives. What we should do is to strengthen data protection and help those who are less tech-savvy, so that no one is left behind in this digital transformation.",
      usefulPhrases: [
        "With a simple scan of a QR code, ...",
        "has quietly reshaped the way we ...",
        "The benefits are obvious.",
        "However, ... is not without problems.",
        "In my view, ... is an irreversible trend."
      ],
      tips: [
        "开头用具体场景引入话题，比空泛的定义更吸引人",
        "主体段落每段只谈一个方面，用 However/Moreover 等连接词过渡",
        "结尾给出自己的观点，并简要提出建议"
      ]
    },
    {
      id: 2,
      type: "essay",
      level: "CET-6",
      title: "On College Students' Mental Health",
      timeLimit: 30,
      suggestedWords: "150-200",
      prompt: "For this part, you are allowed 30 minutes to write an essay on college students' mental health. You should write at least 150 words but no more than 200 words.",
      promptCN: "请就大学生心理健康问题写一篇短文：1) 大学生心理健康的重要性；2) 学校应采取的措施；3) 学生自己可以怎么做。",
      outline: [
        "Importance: mental health affects study, relationships and future career",
        "What universities can do: counseling services, mental health courses",
        "What students can do: exercise, talk to friends, seek help early",
        "Conclusion: a healthy mind is as important as good grades"
      ],
      sampleEssay: "In recent years, mental health has become a growing concern on campus. Academic pressure, job hunting and interpersonal relationships all weigh heavily on college students.\n\nMental health matters as much as physical health. A student suffering from anxiety or depression can hardly concentrate on study or enjoy campus life, which may further affect his or her future career.\n\nUniversities should play an active role. Professional counseling services should be easy to reach, and mental health courses can help students understand and manage their emotions. More importantly, seeking help should be seen as a sign of courage rather than weakness.\n\nAs students ourselves, we can stay mentally healthy by exercising regularly, keeping in touch with friends and family, and talking about our worries instead of hiding them. Remember, a healthy mind is the foundation of everything we hope to achieve in college.",
      usefulPhrases: [
        "Mental health has become a growing concern.",
        "weigh heavily on ...",
        "play an active role in ...",
        "More importantly, ...",
        "is the foundation of ..."
      ],
      tips: [
        "议论文三段式：提出问题 → 分析原因/措施 → 总结观点",
        "每段首句是主题句（topic sentence），阅卷老师重点看首句",
        "避免绝对化表达，用 may / can / should 等更严谨"
      ]
    },
    {
      id: 3,
      type: "letter",
      level: "CET-4",
      title: "A Letter of Application",
      timeLimit: 25,
      suggestedWords: "120-180",
      prompt: "For this part, you are allowed 25 minutes to write a letter of application for an internship position at a foreign trade company. Introduce yourself and explain why you are a good candidate.",
      promptCN: "写一封申请信，应聘某外贸公司的实习岗位：1) 自我介绍；2) 说明自己的优势；3) 表达希望获得面试机会。",
      outline: [
        "Dear Sir or Madam: state the purpose of writing",
        "Paragraph 1: who you are, what position you are applying for",
        "Paragraph 2: your qualifications (major, English skills, experience)",
        "Closing: express hope for an interview, thank the reader"
      ],
      sampleEssay: "Dear Sir or Madam,\n\nI am writing to apply for the internship position of sales assistant advertised on your company's website. I am a junior majoring in Business English at Nanjing University, and I believe my background makes me a suitable candidate.\n\nDuring the past three years, I have developed solid language skills, passing CET-6 with a high score. Last summer, I worked as a volunteer at an international trade fair, where I communicated with foreign visitors and helped translate product materials. This experience taught me how to work under pressure and cooperate with a team.\n\nI would be grateful if you could offer me an opportunity for an interview at your convenience. I am available every afternoon and can be reached at 138-0000-0000.\n\nThank you for your time and consideration. I look forward to your reply.\n\nYours sincerely,\nLi Ming",
      usefulPhrases: [
        "I am writing to apply for ...",
        "I believe my background makes me a suitable candidate.",
        "This experience taught me ...",
        "I would be grateful if you could ...",
        "Thank you for your time and consideration."
      ],
      tips: [
        "书信格式分：称呼、正文、结束语、签名四部分",
        "申请信多用礼貌用语：would be grateful / at your convenience",
        "结尾固定落款 Yours sincerely + 姓名（考试中通常用 Li Ming）"
      ]
    },
    {
      id: 4,
      type: "graph",
      level: "CET-6",
      title: "Describing a Chart: Bike-sharing",
      timeLimit: 30,
      suggestedWords: "150-180",
      prompt: "The chart below shows the number of shared bikes used in a city from 2019 to 2023. Write an essay to describe the chart and analyze the reasons behind the changes.",
      promptCN: "下图展示了某市 2019-2023 年共享单车使用量变化（先升后降再回升）。请描述图表数据并分析变化原因。",
      chart: [
        { year: 2019, value: 20, unit: "million rides" },
        { year: 2020, value: 45, unit: "million rides" },
        { year: 2021, value: 60, unit: "million rides" },
        { year: 2022, value: 38, unit: "million rides" },
        { year: 2023, value: 52, unit: "million rides" }
      ],
      outline: [
        "Opening: what the chart is about and the overall trend",
        "Describe the key numbers: rise from 20 million to a peak of 60 million",
        "Explain the drop in 2022 and the recovery in 2023",
        "Conclusion: predict or comment on the future"
      ],
      sampleEssay: "The chart illustrates the number of shared-bike rides in a certain city between 2019 and 2023. Overall, the figure experienced a dramatic rise, a sharp drop and then a steady recovery.\n\nIn 2019, there were only 20 million rides. The number then climbed rapidly to 45 million in 2020 and reached a peak of 60 million in 2021, as bike-sharing became a cheap and convenient solution to the last-mile problem.\n\nHowever, the year 2022 witnessed a decline to 38 million. This was mainly because many shared bikes were poorly maintained, and some users lost confidence in the service. Fortunately, with better management and stricter parking rules, the figure picked up again to 52 million in 2023.\n\nFrom the chart we can see that the fate of bike-sharing depends largely on service quality. If companies continue to improve maintenance and user experience, the number is likely to keep growing in the coming years.",
      usefulPhrases: [
        "The chart illustrates the number of ... between ... and ...",
        "Overall, the figure experienced a dramatic rise.",
        "climbed rapidly to / reached a peak of",
        "witnessed a decline to ...",
        "picked up again to ..."
      ],
      tips: [
        "图表作文第一段必须总体概括趋势（overall trend）",
        "数据描述动词替换：rise / climb / peak / decline / drop / recover",
        "第二段描述数据，第三段分析原因，不要混在一起"
      ]
    },
    {
      id: 5,
      type: "essay",
      level: "IELTS",
      title: "Online Education: Blessing or Challenge?",
      timeLimit: 40,
      suggestedWords: "250+",
      prompt: "Some people believe that online education will eventually replace traditional classrooms, while others disagree. Discuss both views and give your own opinion. Write at least 250 words.",
      promptCN: "有人认为在线教育终将取代传统课堂，也有人不同意。请讨论两种观点并给出你的看法。至少 250 词。",
      outline: [
        "Introduction: paraphrase the topic, state that both sides will be discussed",
        "View 1: flexibility, lower cost, access to quality resources anywhere",
        "View 2: lack of interaction, self-discipline required, hands-on subjects",
        "Your opinion: a blended model is the future",
        "Conclusion: restate your position"
      ],
      sampleEssay: "Whether online education will replace traditional classrooms has sparked heated debate. While some praise its flexibility, others insist that face-to-face learning cannot be substituted.\n\nSupporters of online education point out its remarkable flexibility. Students can watch recorded lectures at any time and learn at their own pace, which is particularly valuable for working adults. In addition, online courses are generally more affordable and give learners access to top teachers regardless of where they live.\n\nOpponents, however, argue that education is more than delivering information. In a physical classroom, students receive immediate feedback, take part in discussions and build social skills. Moreover, online learning demands strong self-discipline, and subjects such as chemistry experiments or medical training simply cannot be taught through a screen.\n\nIn my opinion, the future lies in a blended model rather than a complete replacement. Technology should be used to make learning more flexible and personalized, while classrooms continue to provide interaction, motivation and hands-on practice.\n\nIn conclusion, although online education brings undeniable benefits, it is more likely to complement traditional classrooms than to replace them entirely.",
      usefulPhrases: [
        "has sparked heated debate",
        "point out its remarkable flexibility",
        "Opponents, however, argue that ...",
        "In my opinion, the future lies in ...",
        "it is more likely to complement ... than to replace ..."
      ],
      tips: [
        "Discuss both views 题型必须两方观点都写，缺一方直接扣分",
        "主体段每段 4-6 句：观点句 + 解释 + 例子/细节",
        "自己的观点可以放在第四段单独写，结论段再换个说法重申"
      ]
    },
    {
      id: 6,
      type: "essay",
      level: "CET-4",
      title: "The Importance of Physical Exercise",
      timeLimit: 30,
      suggestedWords: "120-180",
      prompt: "For this part, you are allowed 30 minutes to write an essay on the importance of physical exercise for college students. You should write at least 120 words but no more than 180 words.",
      promptCN: "请就体育锻炼对大学生的重要性写一篇短文：1) 锻炼的好处；2) 大学生缺乏锻炼的原因；3) 你的建议。",
      outline: [
        "Benefits: stronger body, better mood, higher efficiency in study",
        "Reasons for lack of exercise: heavy coursework, smartphones, laziness",
        "Suggestions: make a plan, exercise with friends, start small",
        "Conclusion: exercise is an investment in yourself"
      ],
      sampleEssay: "As the saying goes, a sound mind lives in a sound body. Physical exercise is essential for college students, yet many of us spend the whole day sitting in classrooms or staring at screens.\n\nRegular exercise brings obvious benefits. It strengthens our bodies, reduces stress and helps us sleep better. Research also shows that students who exercise regularly can concentrate longer and study more efficiently.\n\nUnfortunately, heavy coursework and the attraction of smartphones keep many students away from sports grounds. Some even regard exercise as a waste of time.\n\nIn my opinion, exercise is not a waste of time but an investment. We can start with something easy, such as jogging for twenty minutes three times a week or taking the stairs instead of the lift. Exercising with friends also makes it easier to keep the habit. Let us take action now, for a healthy body is the solid foundation of both study and life.",
      usefulPhrases: [
        "As the saying goes, ...",
        "is essential for ...",
        "Research also shows that ...",
        "regard ... as a waste of time",
        "take action now"
      ],
      tips: [
        "谚语开头（As the saying goes）是加分项，但要用得自然",
        "原因分析可用 Unfortunately / Moreover 递进",
        "建议段给出具体可行的做法，比空喊口号更有说服力"
      ]
    },
    // ============ 2025年6月真题 ============
    {
      id: 101,
      type: "essay",
      level: "CET-6",
      exam: "2025年6月真题（第1套）",
      title: "Using Social Media Properly and Responsibly",
      timeLimit: 30,
      suggestedWords: "150-200",
      prompt: "For this part, you are allowed 30 minutes to write an essay that begins with the sentence \"As social media is used more and more extensively, there is a growing awareness of the importance of using it properly and responsibly.\" You should write at least 150 words but no more than 200 words, excluding the given opening sentence.",
      promptCN: "以指定句子开头写一篇议论文：\"As social media is used more and more extensively, there is a growing awareness of the importance of using it properly and responsibly.\"（随着社交媒体使用越来越广泛，人们越来越意识到合理、负责任地使用它的重要性。）论述如何正确、负责任地使用社交媒体。",
      outline: [
        "Opening: use the given sentence, then state why this awareness matters",
        "Point 1: cultivate digital mindfulness — evaluate information critically",
        "Point 2: set intentional usage boundaries — tech-free hours, curated feeds",
        "Point 3: promote digital literacy programs — cyber ethics, privacy, verification",
        "Conclusion: engage with social media through critical awareness"
      ],
      sampleEssay: "As social media is used more and more extensively, there is a growing awareness of the importance of using it properly and responsibly. This awareness arises from the need to balance its benefits with potential risks to personal life and society.\n\nFirst, we should cultivate digital mindfulness. This helps us critically evaluate information sources, even when facing algorithm-driven echo chambers or viral misinformation. Second, it is helpful to establish intentional usage boundaries. For example, designating tech-free hours and curating feeds to prioritize educational content can reduce digital fatigue while enhancing knowledge acquisition. Third, implementing systemic digital literacy programs is essential. With age-appropriate curricula covering cyber ethics, privacy protection, and content verification techniques, citizens are more likely to become discerning digital citizens instead of feeling vulnerable to manipulation or anxiety.\n\nIn conclusion, by taking collaborative action, we can turn digital landscapes into catalysts for informed societal progress. It is time to engage with social media through critical awareness and ethical praxis.",
      usefulPhrases: [
        "there is a growing awareness of ...",
        "arises from the need to balance ... with ...",
        "cultivate digital mindfulness",
        "designating tech-free hours",
        "It is time to engage with ... through ..."
      ],
      tips: [
        "开头句已给定，第一段只需接着开头句补1-2句点明主题，不要再改写题目句",
        "主体段用 First / Second / Third 分层论述，每层给出具体做法+例证",
        "结尾用 collaborative action / critical awareness 等提升立意，呼应开头"
      ]
    },
    {
      id: 102,
      type: "essay",
      level: "CET-6",
      exam: "2025年6月真题（第2套）",
      title: "Better Prepared for Future Career",
      timeLimit: 30,
      suggestedWords: "150-200",
      prompt: "For this part, you are allowed 30 minutes to write an essay that begins with the sentence \"As requirements for job applications are getting increasingly higher, college students ought to be better prepared for their future career.\" You should write at least 150 words but no more than 200 words, excluding the given opening sentence.",
      promptCN: "以指定句子开头写一篇议论文：\"As requirements for job applications are getting increasingly higher, college students ought to be better prepared for their future career.\"（随着求职要求越来越高，大学生应当为未来职业做更好的准备。）论述大学生应如何为职业发展做准备。",
      outline: [
        "Opening: use the given sentence, define what preparation involves",
        "Point 1: strengthen professional knowledge through systematic learning",
        "Point 2: develop transferable skills — internships, campus activities",
        "Point 3: stay updated on industry trends — forums, seminars, AI skills",
        "Conclusion: combine academic proficiency, practical exposure and soft skills"
      ],
      sampleEssay: "As the requirement of job application is increasing, students ought to be better prepared for future career. This preparation involves not only academic excellence but also the cultivation of practical skills and a forward-looking mindset.\n\nFirst, students should strengthen their professional knowledge through systematic learning. Majoring in engineering, for example, requires mastering core courses and participating in laboratory projects to apply theories in practice. Second, developing transferable skills is equally vital. Communication, teamwork, and problem-solving abilities gained from internships or campus activities help adapt to diverse work environments. Take a marketing internship: negotiating with clients directly enhances interpersonal skills beyond textbooks. Third, staying updated on industry trends matters. Following professional forums or attending career seminars allows students to align their goals with market demands, such as learning AI-related skills for future tech jobs.\n\nIn conclusion, college students should proactively equip themselves with a combination of academic proficiency, practical exposure, and soft skills to thrive in the competitive job market.",
      usefulPhrases: [
        "involves not only ... but also ...",
        "strengthen professional knowledge through systematic learning",
        "developing transferable skills is equally vital",
        "align their goals with market demands",
        "equip themselves with a combination of ..."
      ],
      tips: [
        "三个论点分别对应知识、技能、视野，层次清晰不重叠",
        "每点都带具体例子（engineering / marketing internship / AI skills），避免空谈",
        "结尾用 thrive in the competitive job market 收束，与开头呼应"
      ]
    },
    {
      id: 103,
      type: "essay",
      level: "CET-4",
      exam: "2025年6月真题（第1套）",
      title: "Cross-cultural Communication Abilities",
      timeLimit: 30,
      suggestedWords: "120-180",
      prompt: "Suppose your university is organizing a forum on the development of students' cross-cultural communication abilities. You are now to write an essay to express your view. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
      promptCN: "假设学校正在举办一个关于培养大学生跨文化交流能力的论坛，请写一篇文章表达你的观点：1) 开设多元文化课程；2) 参与实践活动（留学、国际志愿服务）；3) 利用数字工具（在线语言交换、文化论坛）。",
      outline: [
        "Introduction: cross-cultural abilities are vital in a globalized world",
        "Point 1: diverse cultural courses (international communication, foreign literature)",
        "Point 2: practical experiences — study abroad, international volunteering",
        "Point 3: digital tools — online language exchanges, cultural forums",
        "Conclusion: theoretical learning + practical engagement"
      ],
      sampleEssay: "In a globalized world, cultivating students' cross-cultural abilities has become increasingly vital for their future development.\n\nFirst, universities should offer diverse cultural courses, such as international communication and foreign literature, to help students understand different cultural backgrounds. Taking a course on Western etiquette, for example, can prevent misunderstandings in global interactions. Second, practical experiences matter. Participating in study abroad programs or international volunteer activities allows students to immerse themselves in real-life cross-cultural scenarios, enhancing their adaptability. Third, leveraging digital tools like online language exchanges or cultural forums helps students connect with people from various cultures, fostering empathy and open-mindedness.\n\nIn conclusion, developing cross-cultural abilities requires a combination of theoretical learning and practical engagement. By equipping students with such skills, universities enable them to thrive in an interconnected global society.",
      usefulPhrases: [
        "has become increasingly vital for ...",
        "immerse themselves in real-life cross-cultural scenarios",
        "leveraging digital tools",
        "fostering empathy and open-mindedness",
        "a combination of theoretical learning and practical engagement"
      ],
      tips: [
        "四级议论文120-180词，三个论点各写2-3句即可，不要超字数",
        "每点用 such as / like 给出具体课程或活动，让内容充实",
        "enable them to thrive in ... 是四级议论文常用结尾句式"
      ]
    },
    {
      id: 104,
      type: "essay",
      level: "CET-4",
      exam: "2025年6月真题（第2套）",
      title: "Should College Chinese Be Compulsory?",
      timeLimit: 30,
      suggestedWords: "120-180",
      prompt: "Suppose your university is seeking students' opinions on the necessity of making College Chinese a compulsory course. You are now to write an essay to express your view. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
      promptCN: "假设学校正在征求学生对\"是否有必要将《大学语文》设为必修课\"的意见，请写一篇文章表达你的观点：1) 语文课帮助学生了解中国文化；2) 语文课提升学生的语言表达能力；3) 结论：应该设为必修课。",
      outline: [
        "Introduction: state your position — it is necessary",
        "Point 1: learning Chinese culture through classics (Confucius' Analects, Tang poems)",
        "Point 2: improving language skills — essays and speeches help expression",
        "Conclusion: universities should make it compulsory"
      ],
      sampleEssay: "Nowadays, more people realize the importance of College Chinese in universities. It's necessary to make it a required course for all college students.\n\nFirst, College Chinese helps students learn about Chinese culture. By reading classic stories and poems, students can know more about traditional ideas like kindness and honesty. For example, Confucius' Analects tells people to be kind to others, and Tang poems show beautiful Chinese scenery. These lessons help students understand where they come from. Second, this course improves students' language skills. Writing essays and giving speeches in class make students better at expressing ideas. Good Chinese skills are useful for writing reports at work or talking with others in daily life.\n\nIn short, College Chinese is important for both culture and life. It helps students love their culture and communicate well. Universities should make it a compulsory course so that all students can benefit from it.",
      usefulPhrases: [
        "It's necessary to make it a required course",
        "know more about traditional ideas like ...",
        "be better at expressing ideas",
        "be useful for ... or ...",
        "so that all students can benefit from it"
      ],
      tips: [
        "观点题开头就亮明立场（necessary / not necessary），不要骑墙",
        "四级语言不必追求高级词汇，把 Confucius' Analects 等具体例子写准更得分",
        "In short / In conclusion 简洁收尾，重申立场即可"
      ]
    },
    {
      id: 105,
      type: "essay",
      level: 'CET-4',
      exam: '2025年12月真题（第1套）',
      title: 'How the Student Union Can Enrich Student Life',
      timeLimit: 30,
      suggestedWords: "150-200",
      prompt: 'Suppose the student union of your university is collecting opinions on improving its work for the coming year. You are now to write a response by suggesting how it can better enrich student life. You will have 30 minutes to write the response. You should write at least 120 words but no more than 180 words.',
      promptCN: '假设你校学生会正在就明年工作的改进征集意见。请你写一份回复，就学生会如何更好地丰富学生生活提出建议。不少于120词，不多于180词。',
      outline: [
   'Opening: express willingness to offer suggestions and name the key areas',
   'Point 1: organize more diverse campus activities — clubs, festivals, competitions',
   'Point 2: build channels for students\' voices — surveys, suggestion boxes, open meetings',
   'Point 3: provide practical support services — career talks, skill workshops, volunteering',
   'Conclusion: with these efforts, campus life will become more colorful and rewarding'
  ],
      sampleEssay: 'As a sophomore who cares deeply about campus life, I am glad that the student union is seeking opinions on its work for the coming year. Based on my own experience, I would like to offer a few suggestions on how it can better enrich student life.\n\nFirst, the student union could organize more diverse activities. Beyond the usual parties and ball games, events such as themed festivals, academic competitions and art exhibitions would appeal to students with different interests. Second, it should build smoother channels for students\' voices. Regular surveys, an online suggestion box and open meetings would help the union understand what students truly need, instead of relying on guesswork. Third, more practical support services are worth developing. Career talks, skill workshops and volunteer programs would prepare us for life after graduation while making our daily campus life more meaningful.\n\nI believe that with these efforts, the student union will win wider support, and our campus life will become more colorful and rewarding for everyone.',
      usefulPhrases: [
   'collect opinions on its work',
   'enrich student life',
   'appeal to students with different interests',
   'build smoother channels for students\' voices',
   'prepare us for life after graduation'
  ],
      tips: [
   '应用文（建议信）开头要点明身份和来意，语气礼貌诚恳',
   '主体段用 First / Second / Third 列出三条建议，每条建议+一句具体展开',
   '结尾展望效果即可，不必重复所有建议，控制在180词以内'
  ]
    },
    {
      id: 106,
      type: "essay",
      level: 'CET-6',
      exam: '2025年12月真题（第1套）',
      title: 'The Chinese Dream and Personal Self-Worth',
      timeLimit: 30,
      suggestedWords: "150-200",
      prompt: 'For this part, you are allowed 30 minutes to write an essay that begins with the sentence "While striving for the Chinese Dream, young people enjoy more opportunities to realize their self-worth." You can make comments, cite examples or use your personal experiences to develop your essay. You should write at least 150 words but no more than 200 words. You should copy the sentence given in quotes at the beginning of your essay.',
      promptCN: '以指定句子开头写一篇作文："While striving for the Chinese Dream, young people enjoy more opportunities to realize their self-worth."（在为实现中国梦而奋斗的过程中，年轻人拥有更多实现自我价值的机会。）可以发表评论、举例或结合个人经历展开论述。不少于150词，不多于200词，须抄写引号中的句子作为开头。',
      outline: [
   'Opening: copy the given sentence, then point out the two-way relationship between the national dream and personal worth',
   'Point 1: national development creates platforms — new industries, innovation programs, rural revitalization',
   'Point 2: personal growth in turn fuels the nation — cite young scientists, village officials or volunteers',
   'Point 3 (optional): add your own experience of seizing an opportunity',
   'Conclusion: individual dreams and the Chinese Dream advance together'
  ],
      sampleEssay: 'While striving for the Chinese Dream, young people enjoy more opportunities to realize their self-worth. This is because the pursuit of the national dream and the growth of individuals reinforce each other: as the country develops, it opens up platforms on which young people can shine.\n\nTo begin with, national development has created unprecedented opportunities. Emerging industries such as artificial intelligence and green energy, along with programs supporting innovation and rural revitalization, allow graduates to choose paths that match their talents. In turn, young people\'s achievements push the nation forward. Many young scientists contribute to breakthroughs in aerospace, while numerous graduates serve as village officials or volunteers, bringing knowledge and energy to less developed areas. From my own experience, joining a community service project not only helped local residents but also taught me skills and confidence that classrooms could hardly offer.\n\nIn short, realizing the Chinese Dream and achieving personal self-worth are two sides of the same coin. When young people devote their wisdom to the nation\'s cause, they find their own value shining at the same time.',
      usefulPhrases: [
   'enjoy more opportunities to realize their self-worth',
   'reinforce each other',
   'open up platforms on which young people can shine',
   'unprecedented opportunities',
   'two sides of the same coin'
  ],
      tips: [
   '开头句必须原样抄写，第一段接着补1-2句点明“国家发展”与“个人价值”互相成就的关系',
   '主体段从“国家提供机会”和“个人反哺国家”两个方向展开，举例宜具体（航天、乡村振兴、支教等）',
   '结尾用 two sides of the same coin 之类的习语收束，呼应题目句'
  ]
    },
    {
      id: 107,
      type: "essay",
      level: 'CET-4',
      exam: '2024年12月真题（第1套）',
      title: 'The Rise of Express Delivery in China',
      timeLimit: 30,
      suggestedWords: "150-200",
      prompt: 'Suppose the business school of your university is conducting a survey to collect students\' opinions on the express delivery service industry in China. You are to write a response about its recent development and its impact on people\'s lives. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.',
      promptCN: '假设你校商学院正在开展一项调查，收集学生对中国快递服务行业的看法。请你就其近期的发展及其对人们生活的影响写一份回复。不少于120词，不多于180词。',
      outline: [
   'Opening: note the rapid development of express delivery as a survey response',
   'Point 1: scale and technology — huge parcel volumes, smart lockers, same-city delivery in hours',
   'Point 2: impact on daily life — convenient shopping, supporting rural e-commerce and small businesses',
   'Point 3: remaining problems — packaging waste and courier workload deserve attention',
   'Conclusion: the industry has changed how we live and will keep improving'
  ],
      sampleEssay: 'As requested by the survey, I would like to share my views on the express delivery service industry in China, which has developed at a remarkable speed in recent years.\n\nToday, hundreds of millions of parcels are delivered across the country every day, and advanced technologies such as smart lockers and real-time tracking have made the process faster and safer. This development has profoundly changed people\'s lives. We can order almost anything online and receive it within a day or two, which saves time and offers a wider range of choices. Moreover, express delivery supports rural e-commerce, helping farmers sell their products to distant cities and boosting small businesses in towns. However, problems remain: excessive packaging causes waste, and couriers often work under great pressure, so these issues deserve the attention of both companies and consumers.\n\nIn conclusion, the express delivery industry has become an essential part of daily life in China. I believe that with greener packaging and better working conditions, it will serve people even better in the future.',
      usefulPhrases: [
   'develop at a remarkable speed',
   'smart lockers and real-time tracking',
   'has profoundly changed people\'s lives',
   'supports rural e-commerce',
   'an essential part of daily life'
  ],
      tips: [
   '这是一份“回复调查”式应用文，开头用 As requested by the survey 之类的句子点明来意',
   '按题目要求覆盖两方面：近期发展（规模、技术）+ 对生活的影响（便利、助农），再补一句问题体现思辨',
   '结尾简短展望，总词数控制在180词以内'
  ]
    },
    {
      id: 108,
      type: "essay",
      level: 'CET-6',
      exam: '2024年12月真题（第1套）',
      title: 'Realistic Goals and Persistent Effort',
      timeLimit: 30,
      suggestedWords: "150-200",
      prompt: 'For this part, you are allowed 30 minutes to write an essay that begins with the sentence "To increase the likelihood of success, one should set realistic goals and work persistently towards them." You can make comments, cite examples or use your personal experiences to develop your essay. You should write at least 150 words but no more than 200 words. You should copy the sentence given in quotes at the beginning of your essay.',
      promptCN: '以指定句子开头写一篇作文："To increase the likelihood of success, one should set realistic goals and work persistently towards them."（要提高成功的可能性，就应当设定切实可行的目标，并坚持不懈地为之努力。）可以发表评论、举例或结合个人经历展开论述。不少于150词，不多于200词，须抄写引号中的句子作为开头。',
      outline: [
   'Opening: copy the given sentence, then explain why goals and persistence decide success',
   'Point 1: realistic goals keep motivation alive — overly ambitious ones lead to frustration',
   'Point 2: persistent effort turns goals into results — cite learning English or marathon training as an example',
   'Point 3 (optional): add your own experience of a goal achieved step by step',
   'Conclusion: success favors those who plan sensibly and never give up'
  ],
      sampleEssay: 'To increase the likelihood of success, one should set realistic goals and work persistently towards them. In my view, these two elements are like the compass and the engine of a journey: the former points us in the right direction, while the latter keeps us moving forward.\n\nRealistic goals matter because they keep our motivation alive. If a beginner aims to master a foreign language within a month, failure is almost certain, and frustration may follow. By contrast, a modest plan — say, memorizing twenty words a day — builds confidence step by step. Persistence, meanwhile, is what turns plans into results. Take my own experience of preparing for the CET-6: I practiced listening every morning for three months, and my score rose steadily until I finally passed. Small daily efforts, repeated over time, achieve what sudden bursts of enthusiasm cannot.\n\nIn conclusion, success seldom comes from luck or grand ambitions alone. It favors those who set sensible targets and refuse to give up, for realistic goals show us the way and persistence carries us all the way there.',
      usefulPhrases: [
   'set realistic goals and work persistently towards them',
   'like the compass and the engine of a journey',
   'keep our motivation alive',
   'small daily efforts, repeated over time',
   'success seldom comes from luck or grand ambitions alone'
  ],
      tips: [
   '开头句必须原样抄写；第一段用一个比喻（指南针与引擎）把“目标”和“坚持”的关系讲清',
   '主体段一层讲合理目标（反面例子：一个月学一门语言），一层讲坚持（正面例子：备考六级）',
   '结尾用一句总结句升华，避免简单重复开头'
  ]
    }
  ]
};

// 工具函数：按类型/级别筛选
function getWritingTasksByLevel(level) {
  return writingData.tasks.filter(t => t.level === level);
}

function getWritingTasksByType(type) {
  return writingData.tasks.filter(t => t.type === type);
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { writingData, getWritingTasksByLevel, getWritingTasksByType };
}
