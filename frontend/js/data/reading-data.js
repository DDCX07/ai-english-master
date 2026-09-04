/**
 * 阅读理解数据
 * Reading Comprehension Data
 */

const readingData = {
  articles: [
    {
      id: 1,
      title: "The Impact of Artificial Intelligence on Education",
      difficulty: "CET-6",
      wordCount: 486,
      suggestedTime: "8分钟",
      content: `
        <p>Artificial Intelligence (AI) is transforming education at an unprecedented pace. From personalized learning platforms to automated grading systems, AI technologies are reshaping how students learn and how teachers teach. This technological revolution brings both opportunities and challenges that educators and policymakers must carefully consider.</p>

        <p>One of the most significant benefits of AI in education is personalization. Traditional classrooms often struggle to accommodate diverse learning styles and paces. However, AI-powered adaptive learning systems can analyze individual student performance and tailor educational content accordingly. These systems identify knowledge gaps and provide targeted practice exercises, enabling students to learn at their own pace while ensuring they master fundamental concepts before advancing.</p>

        <p>Moreover, AI tools can dramatically reduce teachers' administrative workload. Automated grading systems, for instance, can evaluate objective tests and even provide feedback on written assignments using natural language processing. This efficiency allows educators to focus more on meaningful interactions with students, such as mentoring and facilitating discussions. However, critics argue that over-reliance on AI might diminish the human element that is crucial in education, particularly in subjects requiring creativity and emotional intelligence.</p>

        <p>Another concern is the digital divide. While AI educational tools offer tremendous potential, they require reliable internet access and modern devices—resources that remain unavailable in many underserved communities. Without addressing this inequality, AI adoption in education could exacerbate existing achievement gaps between privileged and disadvantaged students.</p>

        <p>Looking ahead, the integration of AI in education will likely accelerate. The key challenge lies in implementing these technologies thoughtfully, ensuring they enhance rather than replace human teachers. Education systems must invest in training teachers to work alongside AI tools effectively while maintaining the irreplaceable human connections that foster genuine learning and development.</p>
      `,
      questions: [
        {
          question: "According to the passage, what is one major benefit of AI in education?",
          options: [
            "It eliminates the need for human teachers entirely.",
            "It enables personalized learning experiences for students.",
            "It guarantees that all students will achieve perfect grades.",
            "It reduces the cost of education to zero."
          ],
          correctAnswer: 1,
          explanation: "文章第二段明确指出，AI在教育中的一个主要好处是能够提供个性化的学习体验（personalization）。AI系统可以根据学生的个人表现来调整教学内容。"
        },
        {
          question: "How does automated grading benefit teachers according to the text?",
          options: [
            "It allows them to work fewer hours and leave school earlier.",
            "It enables them to focus more on meaningful student interactions.",
            "It guarantees that all grading will be completely error-free.",
            "It eliminates the need for teachers to understand the subject matter."
          ],
          correctAnswer: 1,
          explanation: "文章第三段提到，自动评分系统可以让教师将更多时间投入到与学生的有意义的互动中，比如指导和促进讨论。"
        },
        {
          question: "What concern does the passage raise regarding AI in education?",
          options: [
            "AI systems are too expensive for any school to afford.",
            "AI might increase inequality between students with different resources.",
            "AI will make all educational materials obsolete within five years.",
            "AI cannot be used in subjects like mathematics or science."
          ],
          correctAnswer: 1,
          explanation: "文章第四段提到了数字鸿沟（digital divide）的问题，指出如果AI教育工具需要可靠的互联网和现代设备，这可能会加剧特权学生和弱势学生之间已有的成就差距。"
        },
        {
          question: "What does the author suggest about the future of AI in education?",
          options: [
            "AI will completely replace human teachers by 2030.",
            "AI integration should be rejected to preserve traditional methods.",
            "AI should enhance rather than replace human teachers.",
            "AI will only be useful for wealthy private schools."
          ],
          correctAnswer: 2,
          explanation: "文章最后一段明确指出，关键挑战在于深思熟虑地实施这些技术，确保它们增强而不是取代人类教师。"
        },
        {
          question: "What is the main idea of this passage?",
          options: [
            "AI technology is perfect and has no drawbacks in education.",
            "AI is transforming education and requires careful implementation.",
            "All schools must immediately adopt AI tools or risk failure.",
            "Traditional teaching methods are completely useless today."
          ],
          correctAnswer: 1,
          explanation: "整篇文章的主旨是讨论AI如何改变教育，以及这种改变带来的机遇和挑战，强调需要深思熟虑地实施。"
        }
      ]
    },
    {
      id: 2,
      title: "Climate Change and Urban Planning",
      difficulty: "CET-6",
      wordCount: 445,
      suggestedTime: "7分钟",
      content: `
        <p>As climate change intensifies, cities worldwide face unprecedented challenges. Rising sea levels, extreme weather events, and shifting temperature patterns are forcing urban planners to rethink how we design and manage metropolitan areas. The concept of "climate-resilient cities" has emerged as a critical framework for sustainable urban development in the 21st century.</p>

        <p>Climate-resilient urban planning involves multiple strategies. First, cities must invest in robust infrastructure capable of withstanding extreme weather. This includes elevating buildings in flood-prone areas, upgrading drainage systems, and reinforcing bridges and roads. For example, the Netherlands has pioneered innovative water management systems that combine traditional engineering with natural solutions like wetlands and floodplains.</p>

        <p>Second, urban green spaces play a vital role in climate adaptation. Parks, gardens, and green roofs help reduce the urban heat island effect, improve air quality, and manage stormwater. Singapore's "City in a Garden" approach demonstrates how integrating vegetation into urban design can enhance resilience while improving residents' quality of life.</p>

        <p>However, implementing climate-resilient measures faces significant obstacles. High costs often deter investment, particularly in developing regions where resources are already scarce. Additionally, complex governance structures and conflicting interests among stakeholders can delay or compromise necessary projects. Political will and public awareness are crucial for overcoming these barriers.</p>

        <p>Looking forward, successful climate adaptation will require collaboration across sectors and borders. Cities must share knowledge and best practices while tailoring solutions to local contexts. The time for incremental changes has passed; transformative action is necessary to ensure urban areas remain livable and sustainable in the face of climate change.</p>
      `,
      questions: [
        {
          question: "What is the main focus of this passage?",
          options: [
            "The history of urban planning since 1900.",
            "How cities can adapt to climate change.",
            "Why climate change is not actually happening.",
            "The best cities to visit as a tourist."
          ],
          correctAnswer: 1,
          explanation: "整篇文章讨论的是城市如何适应气候变化，提出了\"气候韧性城市\"的概念。"
        },
        {
          question: "What does the passage say about urban green spaces?",
          options: [
            "They are purely decorative and serve no practical purpose.",
            "They help reduce heat and improve air quality.",
            "They should be removed to make room for more buildings.",
            "They are too expensive for any city to maintain."
          ],
          correctAnswer: 1,
          explanation: "文章第三段明确指出，城市绿地有助于减少城市热岛效应、改善空气质量和管理雨水。"
        },
        {
          question: "What challenge does the passage mention for implementing climate-resilient measures?",
          options: [
            "Scientists have not yet proven that climate change exists.",
            "High costs and complex governance structures.",
            "City residents do not want any improvements.",
            "There are no available technologies to help."
          ],
          correctAnswer: 1,
          explanation: "文章第四段提到了实施气候韧性措施面临的障碍：高昂的成本和复杂的治理结构。"
        }
      ]
    },
    {
      id: 3,
      title: "The Evolution of Remote Work",
      difficulty: "CET-4",
      wordCount: 398,
      suggestedTime: "6分钟",
      content: `
        <p>Remote work has transformed from a niche perk to a mainstream work arrangement. The COVID-19 pandemic accelerated this shift dramatically, forcing companies worldwide to rapidly adopt distributed work models. What began as a temporary measure has evolved into a fundamental reimagining of the workplace.</p>

        <p>Proponents of remote work highlight numerous benefits. Employees enjoy greater flexibility, reduced commute times, and often improved work-life balance. Companies can access talent globally without geographical restrictions and potentially reduce overhead costs associated with maintaining physical offices. Studies have shown that remote workers often report higher job satisfaction and productivity when given appropriate support and resources.</p>

        <p>However, challenges persist. Some employees struggle with isolation and blurred boundaries between work and personal life. Collaboration and innovation can suffer without spontaneous in-person interactions. Additionally, not all jobs are suitable for remote arrangements, particularly those requiring specialized equipment or physical presence.</p>

        <p>The future of work will likely involve hybrid models that combine remote and in-person elements. Organizations are experimenting with various approaches—from fully remote teams to flexible schedules that allow employees to choose when they come into the office. What remains clear is that the traditional 9-to-5 office model is no longer the only option for many knowledge workers.</p>
      `,
      questions: [
        {
          question: "What accelerated the shift to remote work according to the passage?",
          options: [
            "Employee demands for more vacation time.",
            "The COVID-19 pandemic.",
            "New government regulations banning offices.",
            "Companies wanting to reduce electricity costs."
          ],
          correctAnswer: 1,
          explanation: "文章第一段明确指出，COVID-19大流行极大地加速了远程办公的转型。"
        },
        {
          question: "What benefit of remote work does the passage mention?",
          options: [
            "Employees never have to work at all.",
            "Reduced commute times and greater flexibility.",
            "Companies can stop paying all their employees.",
            "Everyone gets automatic promotions."
          ],
          correctAnswer: 1,
          explanation: "文章第二段提到，远程办公的好处包括更大的灵活性、减少通勤时间和改善工作与生活的平衡。"
        }
      ]
    },
    {
      id: 4,
      title: "The Future of Renewable Energy",
      difficulty: "CET-6",
      wordCount: 512,
      suggestedTime: "9分钟",
      content: `
        <p>As the world grapples with climate change, renewable energy sources have moved from niche alternatives to mainstream solutions. Solar, wind, and hydroelectric power now constitute significant portions of many nations' energy portfolios. This shift represents not just a technological transformation but a fundamental reimagining of how societies produce and consume energy.</p>

        <p>Solar energy has experienced particularly dramatic growth. The cost of photovoltaic panels has plummeted by nearly 90% over the past decade, making solar installations economically viable in regions that previously depended entirely on fossil fuels. Distributed solar systems—where households and businesses generate their own electricity—have further democratized energy production, reducing reliance on centralized utilities.</p>

        <p>Wind energy has also seen remarkable advances. Offshore wind farms, situated where winds are stronger and more consistent, can generate substantial amounts of clean electricity. European countries, particularly Denmark and the United Kingdom, have made massive investments in offshore wind, with some nations now generating over half their electricity from wind during favorable conditions.</p>

        <p>However, challenges remain. The intermittent nature of renewable sources—solar panels don't work at night, wind turbines require wind—creates supply stability issues. Energy storage technologies, particularly advanced batteries, are improving but still cannot cost-effectively store enough power to bridge extended periods of low generation. Additionally, existing transmission infrastructure was designed for centralized power plants and requires significant upgrades to accommodate distributed renewable sources.</p>

        <p>Looking forward, the transition to renewable energy will likely accelerate as technology improves and economies of scale drive costs down. The key challenge will be managing this transition in a way that maintains energy reliability while reducing carbon emissions. This may require maintaining some fossil fuel capacity as backup during the transition period—a reality that complicates the clean energy narrative but reflects the practical complexities of decarbonizing global energy systems.</p>
      `,
      questions: [
        {
          question: "What has happened to the cost of solar panels over the past decade?",
          options: [
            "It has increased significantly.",
            "It has remained about the same.",
            "It has decreased by nearly 90%.",
            "It has fluctuated unpredictably."
          ],
          correctAnswer: 2,
          explanation: "文章第二段明确指出，光伏板的成本在过去十年中下降了近90%。"
        },
        {
          question: "What advantage do offshore wind farms have according to the passage?",
          options: [
            "They are cheaper to build than onshore farms.",
            "They have stronger and more consistent winds.",
            "They don't require any maintenance.",
            "They can be built anywhere in the ocean."
          ],
          correctAnswer: 1,
          explanation: "文章第三段提到，海上风电场的优势是那里的风更强、更稳定。"
        },
        {
          question: "What is identified as a major challenge for renewable energy?",
          options: [
            "Renewable sources are too expensive.",
            "Renewable energy is intermittent.",
            "People don't want to use renewable energy.",
            "Renewable sources produce too much power."
          ],
          correctAnswer: 1,
          explanation: "文章第四段指出，可再生能源的间歇性是一个主要挑战——太阳能板在晚上不工作，风力涡轮机需要风。"
        },
        {
          question: "What does the passage suggest about energy storage?",
          options: [
            "It has completely solved the intermittency problem.",
            "It is still too expensive to be practical.",
            "It needs further development to be fully effective.",
            "It is no longer needed for renewable energy."
          ],
          correctAnswer: 2,
          explanation: "文章第四段提到，储能技术虽然在改进，但仍不能以具有成本效益的方式储存足够的电力。"
        }
      ]
    },
    {
      id: 5,
      title: "Social Media and Mental Health",
      difficulty: "CET-6",
      wordCount: 478,
      suggestedTime: "8分钟",
      content: `
        <p>The relationship between social media use and mental health has become a subject of intense scientific scrutiny and public concern. As digital platforms increasingly mediate human interaction, researchers are investigating how constant connectivity affects psychological well-being, particularly among young people who have grown up with smartphones as extensions of themselves.</p>

        <p>Numerous studies have identified correlations between heavy social media use and increased rates of anxiety, depression, and loneliness. The mechanisms behind these associations appear multifaceted. Social comparison theory suggests that exposure to curated versions of others' lives leads individuals to evaluate themselves unfavorably. When people constantly encounter images of friends' vacations, achievements, and seemingly perfect relationships, they may experience diminished self-esteem and life satisfaction.</p>

        <p>Furthermore, social media platforms are designed to maximize engagement through algorithmic content delivery and intermittent reinforcement—the variable reward schedule that keeps users returning. This design creates addictive patterns of use that can disrupt sleep, reduce face-to-face social interaction, and foster obsessive checking behaviors. The constant need to present a polished online persona adds additional psychological stress.</p>

        <p>However, the relationship between social media and mental health is not uniformly negative. These platforms can provide valuable social support, particularly for individuals with rare conditions, marginalized identities, or limited local support networks. Online communities can offer connection, understanding, and resources that might be unavailable offline. Additionally, social media enables maintaining relationships across geographical distances and can facilitate activism and community organizing.</p>

        <p>The key distinction may lie in how people use these platforms. Passive consumption—scrolling through content without interacting—tends to produce more negative outcomes than active engagement, where users meaningfully connect with others. Digital literacy education and mindful use patterns may help maximize benefits while minimizing harms. As research continues to evolve, the focus should shift from whether social media is good or bad to understanding how different patterns of use affect different types of users.</p>
      `,
      questions: [
        {
          question: "What does social comparison theory suggest about social media?",
          options: [
            "Social media makes people more competitive.",
            "Exposure to others' curated lives can lower self-esteem.",
            "People naturally compare themselves to celebrities.",
            "Social comparison only affects teenagers."
          ],
          correctAnswer: 1,
          explanation: "文章第二段提到，社会比较理论表明，接触他人精心策划的生活版本会导致人们对自己做出不利的评价。"
        },
        {
          question: "How are social media platforms designed according to the passage?",
          options: [
            "To help people connect meaningfully.",
            "To maximize user engagement through addictive patterns.",
            "To protect users' mental health.",
            "To provide accurate information only."
          ],
          correctAnswer: 1,
          explanation: "文章第三段指出，社交媒体平台通过算法内容传递和间歇性强化来最大化参与度，这创造了成瘾的使用模式。"
        },
        {
          question: "What positive effect of social media does the passage mention?",
          options: [
            "It eliminates all feelings of loneliness.",
            "It guarantees better academic performance.",
            "It can provide valuable social support.",
            "It automatically solves mental health problems."
          ],
          correctAnswer: 2,
          explanation: "文章第四段提到，社交媒体可以为有罕见疾病、边缘化身份或当地支持网络有限的人提供宝贵的社会支持。"
        },
        {
          question: "What distinction does the passage make regarding social media use?",
          options: [
            "Between young and old users.",
            "Between different platforms.",
        "Between passive consumption and active engagement.",
            "Between morning and evening use."
          ],
          correctAnswer: 2,
          explanation: "文章最后一段指出，被动消费（无互动地滚动浏览内容）往往比主动参与产生更多的负面结果。"
        }
      ]
    },
    {
      id: 6,
      title: "The Rise of E-Commerce",
      difficulty: "CET-4",
      wordCount: 445,
      suggestedTime: "7分钟",
      content: `
        <p>E-commerce has fundamentally transformed how people shop and do business. What began as a novelty in the 1990s has become an integral part of the global economy. The convenience of browsing and purchasing from home, combined with increasingly sophisticated logistics networks, has made online shopping the preferred method for millions of consumers worldwide.</p>

        <p>The growth of e-commerce has disrupted traditional retail. Brick-and-mortar stores have faced intense competition, leading to widespread store closures and the bankruptcy of once-dominant chains. This retail apocalypse, as some have called it, has reshaped commercial landscapes in many communities, with malls and shopping strips struggling to maintain tenancy. However, physical retail hasn't disappeared but rather evolved—many successful online brands have opened physical locations, while traditional retailers have developed robust online presence.</p>

        <p>Consumer behavior has also shifted dramatically. The ability to compare prices instantly across multiple retailers has empowered consumers but squeezed retailer margins. Product reviews and ratings have become essential factors in purchase decisions, giving individual customers significant influence over brand reputations. The rise of mobile shopping has further blurred the line between online and offline commerce, with consumers using phones to research products while in physical stores.</p>

        <p>Looking ahead, e-commerce will likely continue growing as technology addresses current limitations. Virtual and augmented reality may allow online shoppers to virtually try clothes or see how furniture would look in their homes. Drone delivery and autonomous vehicles could transform last-mile logistics. However, questions about environmental impact, labor conditions in fulfillment centers, and the market dominance of a few large platforms remain important considerations for the future of digital commerce.</p>
      `,
      questions: [
        {
          question: "What has happened to traditional retail due to e-commerce?",
          options: [
            "It has completely disappeared.",
            "It has faced intense competition and store closures.",
            "It has become more profitable than online retail.",
            "It has stopped using technology."
          ],
          correctAnswer: 1,
          explanation: "文章第二段提到，电子商务的增长给传统零售带来了激烈的竞争，导致大量商店倒闭。"
        },
        {
          question: "How have product reviews affected online shopping?",
          options: [
            "They are rarely read by consumers.",
            "They have become essential factors in purchase decisions.",
            "They always increase product prices.",
            "They are written only by manufacturers."
          ],
          correctAnswer: 1,
          explanation: "文章第三段提到，产品评论和评分已成为购买决策的重要因素。"
        },
        {
          question: "What might transform last-mile logistics according to the passage?",
          options: [
            "More physical stores.",
            "Drone delivery and autonomous vehicles.",
        "Better packaging materials.",
            "Slower shipping options."
      ],
      correctAnswer: 1,
      explanation: "文章第四段提到，无人机配送和自动驾驶车辆可能会改变最后一公里物流。"
      }
    ]
    },
    {
      id: 7,
      title: "Space Exploration in the 21st Century",
      difficulty: "CET-6",
      wordCount: 498,
      suggestedTime: "8分钟",
      content: `
        <p>Space exploration has entered a new era characterized by both increased international cooperation and growing commercial involvement. While government agencies like NASA and ESA continue to push scientific boundaries, private companies have emerged as major players, dramatically reducing launch costs and opening access to space for purposes beyond traditional scientific missions.</p>

        <p>The rise of private space companies represents a fundamental shift in how humanity accesses space. Reusable rockets, pioneered by companies like SpaceX, have slashed launch costs by orders of magnitude. This cost reduction has enabled new business models, including satellite internet constellations, commercial human spaceflight, and proposed lunar tourism. The era when only governments could afford space operations appears to be ending.</p>

        <p>International cooperation remains essential for ambitious projects. The International Space Station serves as a model for collaborative space endeavors, hosting astronauts from numerous countries. Future plans for lunar bases and Mars missions will likely require even broader partnerships, sharing costs, expertise, and risks among participating nations. China's rapidly advancing space program adds another dimension to international space dynamics.</p>

        <p>Scientific objectives continue to drive exploration. Robotic missions to Mars have searched for signs of past life, while telescopes like the James Webb Space Telescope promise to revolutionize our understanding of the universe. These scientific pursuits, while expensive, yield fundamental knowledge about our cosmic context and potential future human habitation beyond Earth.</p>

        <p>However, questions about space governance and sustainability have emerged. As space becomes more crowded with satellites and debris, collision risks increase. The lack of clear international frameworks for resource extraction, territorial claims, and military activities in space creates potential for conflict. Additionally, the environmental impact of rocket launches and space debris raises concerns about preserving space for future generations.</p>
      `,
      questions: [
        {
          question: "What has enabled new business models in space according to the passage?",
          options: [
            "Increased government funding only.",
            "Reusable rockets reducing launch costs.",
            "International agreements banning private companies.",
            "Scientific discoveries on Mars."
          ],
          correctAnswer: 1,
          explanation: "文章第二段提到，可重复使用的火箭大幅降低了发射成本，使新的商业模式成为可能。"
        },
        {
          question: "What does the passage say about international cooperation in space?",
          options: [
            "It is no longer necessary.",
            "It remains essential for ambitious projects.",
            "Only the US and Russia cooperate.",
            "It prevents private companies from operating."
      ],
      correctAnswer: 1,
      explanation: "文章第三段明确指出，国际合作对于雄心勃勃的项目仍然是必要的。"
        },
        {
          question: "What concerns does the passage raise about space sustainability?",
          options: [
            "There are no concerns mentioned.",
            "Only military activities are problematic.",
            "Satellite congestion, debris, and lack of governance frameworks.",
            "Space exploration is too expensive."
      ],
      correctAnswer: 2,
      explanation: "文章第五段提到了太空可持续性方面的担忧：卫星和碎片使太空变得拥挤、碰撞风险增加，以及缺乏明确的国际治理框架。"
        }
      ]
    },
    {
      id: 8,
      title: "The Psychology of Procrastination",
      difficulty: "CET-6",
      wordCount: 462,
      suggestedTime: "8分钟",
      content: `
        <p>Procrastination—the act of delaying tasks despite knowing the negative consequences—is a universal human experience. While often dismissed as simple laziness or poor time management, research reveals that procrastination has complex psychological roots involving emotion regulation, executive function, and even our relationship with our future selves.</p>

        <p>Contrary to popular belief, procrastination typically stems not from an inability to manage time but from an inability to manage emotions. When we face a task that makes us anxious, bored, or uncertain, our brains seek immediate relief through avoidance behaviors. Checking social media, cleaning our desks, or engaging in other seemingly productive activities provides short-term emotional escape at the cost of long-term progress.</p>

        <p>The temporal disconnect between our present and future selves exacerbates this tendency. Neurologically, we process our future selves more like strangers than as continuations of who we are now. This cognitive bias makes it easy to prioritize present comfort over future well-being. We intellectually know that studying today will help our future selves, but emotionally, we're helping a stranger.</p>

        <p>Perfectionism also plays a significant role. Fear of producing substandard work can prevent people from starting tasks at all. This paralysis is particularly common among high-achieving individuals who have internalized unrealistic standards. The irony, of course, is that delaying until the last minute often guarantees the mediocre performance that perfectionists originally feared.</p>

        <p>Understanding procrastination as an emotional regulation problem rather than a time management problem points toward different solutions. Rather than simply scheduling tasks more carefully, procrastinators might benefit from practices that help them tolerate uncomfortable emotions: mindfulness, self-compassion, and breaking tasks into smaller, less intimidating pieces. Recognizing that action often precedes motivation—rather than waiting for motivation to strike before acting—can also help break the cycle of delay and guilt.</p>
      `,
      questions: [
        {
          question: "According to the passage, what typically causes procrastination?",
          options: [
            "Poor time management skills.",
            "An inability to manage emotions.",
            "Too much work to complete.",
            "Not caring about the consequences."
          ],
          correctAnswer: 1,
      explanation: "文章第二段明确指出，拖延通常不是源于时间管理能力不足，而是源于情绪管理能力不足。"
        },
        {
          question: "How do our brains process our future selves according to the passage?",
          options: [
            "As identical to our present selves.",
            "More like strangers than as continuations of ourselves.",
            "With great care and consideration.",
            "Exactly like our family members."
      ],
      correctAnswer: 1,
      explanation: "文章第三段提到，从神经学上讲，我们处理未来自我时更像是处理陌生人，而不是对现在自己的延续。"
        },
        {
          question: "What role does perfectionism play in procrastination?",
          options: [
            "It helps people start tasks earlier.",
            "It can prevent people from starting tasks due to fear of substandard work.",
            "It has no connection to procrastination.",
            "It only affects students, not adults."
      ],
      correctAnswer: 1,
      explanation: "文章第四段提到，完美主义起着重要作用，对产出不完美工作的恐惧可能会让人完全无法开始任务。"
        },
        {
          question: "What solution does the passage suggest for procrastination?",
          options: [
            "Simply create better schedules.",
            "Understanding it as emotional regulation and practicing tolerance of uncomfortable emotions.",
            "Wait for motivation to strike before acting.",
            "Avoid tasks that make you anxious."
      ],
      correctAnswer: 1,
      explanation: "文章第五段指出，将拖延理解为情绪调节问题而不是时间管理问题，指向了不同的解决方案，比如练习正念和自我同情。"
        }
      ]
    },
    {
      id: 101,
      title: "School Absence: Signal, Not Cause",
      difficulty: "CET-6",
      exam: "2025年6月真题（第1套）",
      wordCount: 432,
      suggestedTime: 8,
      content: `
        <p>Nationally, one in six children miss 15 or more days of school in a year. Education officials have deplored all this missed instruction. These chronically absent students suffer academically because of all the classroom instruction they miss out on. In 2015, the US secretary of education responded to this crisis, urging communities to support every student to attend every day and be successful in school. His open letter stated that missing 10% of school days in a year for any reason — excused or unexcused — is a primary cause of low academic achievement.</p>

        <p>Worrying about whether children attend school makes sense. After all, if students don't show up, teachers can't teach them. But what if America's attendance crisis is about much more than students missing class? What if, instead, it is a reflection of family and community crises these students face — such as being ejected from the family apartment, fearing for their safety in their neighborhood or suffering an illness?</p>

        <p>As social scientists we investigated how excused and unexcused absences relate to children's academic achievement. We find that absences excused by a parent do little to harm children's learning. In fact, children with no unexcused absences — but 15 to 18 excused absences — have test scores equal to their peers who have no absences. Meanwhile, the average child with even just one unexcused absence does much worse academically than peers with none. We believe unexcused absence is a strong signal of the many challenges children and families face, including economic and medical hardships.</p>

        <p>Unexcused absences can be a powerful signal of how those out-of-school challenges affect children's academic progress. Our evidence suggests unexcused absences are problematic, but for a different reason than people often think. Absence from school, and especially unexcused absence, matters mainly as a signal of many crises children and their families may be facing. It matters less as a cause of lower student achievement due to missed instruction.</p>

        <p>How we choose to think of school absences matters for educational policy. School attendance policies typically hold schools and families accountable for the days children miss, regardless of whether they were excused or unexcused absences. These policies assume that missing school for any reason harms children academically because they are missing classroom instruction. They also assume that schools will be able to effectively intervene by reducing student absences. We find neither to be the case. As a result, these attendance policies end up disproportionately punishing families dealing with out-of-school crises in their lives and pressuring schools who serve them to get students to school more often.</p>

        <p>We instead suggest using unexcused absence from school as a signal to channel resources to the children and families who need them most.</p>
      `,
      questions: [
        {
          question: "What does the US secretary of education say in his open letter?",
          options: [
            "It is of vital importance to respond promptly to the school absence crisis.",
            "The academic performance of chronically absent students is deplorable.",
            "Low academic achievement is mainly attributed to school absences.",
            "The effect of school absences on American education is worrisome."
          ],
          correctAnswer: 2,
          explanation: "文章第一段明确指出，教育部长的公开信中提到，缺课10%（无论理由是否正当）是低学业成绩的主要原因。答案C选项'Low academic achievement is mainly attributed to school absences'与此一致，对应选项C（下标2）。"
        },
        {
          question: "What do the authors find about school absences?",
          options: [
            "Excused school absences have little impact on children's learning.",
            "There is little difference between unexcused and excused absences.",
            "Excused absences lead to comparatively better school performance.",
            "Unexcused absences are a big challenge to both schools and families."
          ],
          correctAnswer: 0,
          explanation: "文章第三段指出，父母准许的缺课对孩子的学习几乎没有影响（'absences excused by a parent do little to harm children's learning'）。这对应A选项，下标为0。"
        },
        {
          question: "What do the authors believe concerning unexcused school absences?",
          options: [
            "They are likely to cause a decrease in students' academic achievements due to missed instruction.",
            "They point directly to many of the out-of-school challenges confronting children and their families.",
            "They are matters the American government typically ignores when formulating educational policies.",
            "They give a clear signal to children and their families of the crises they are likely to face in the future."
          ],
          correctAnswer: 1,
          explanation: "文章第四段明确指出，无正当理由的缺课是儿童和家庭面临的许多挑战的'强烈信号'（'strong signal of the many challenges children and families face'）。这对应B选项，下标为1。"
        },
        {
          question: "What is the assumption underlying education policies in the US?",
          options: [
            "Children's academic performance depends on reducing the number of absences.",
            "Schools can boost children's academic performance by effective intervention.",
            "Schools as well as families should be held responsible for out-of-school crises.",
            "Children's academic performance is closely related to the quality of instruction."
          ],
          correctAnswer: 1,
          explanation: "定位第五段：出勤政策'还假设学校能够通过减少学生缺课来进行有效干预'（'They also assume that schools will be able to effectively intervene by reducing student absences'）。B选项将 effectively intervene 同义替换为 effective intervention，故选B。注意作者紧接着说'我们发现这两条假设都不成立'（We find neither to be the case）。"
        },
        {
          question: "What do the authors suggest doing regarding school absences?",
          options: [
            "Identifying their underlying causes.",
            "Reframing school attendance policies.",
            "Directing resources to helping needy children.",
            "Pressuring schools to reduce unexcused ones."
          ],
          correctAnswer: 2,
          explanation: "文章最后一段明确建议，应将无正当理由的缺课作为信号，'将资源引导到最需要的儿童和家庭'（'channel resources to the children and families who need them most'）。这对应C选项，下标为2。"
        }
      ]
    },
    {
      id: 102,
      title: "The Passion Principle: Rethinking Career Advice",
      difficulty: "CET-6",
      exam: "2025年6月真题（第1套）",
      wordCount: 398,
      suggestedTime: 8,
      content: `
        <p>After earning a bachelor's degree, I was determined to do what I love. I headed straight to graduate school to investigate the social problems that fascinated me. For almost a decade, I told everyone I encountered that they should do the same. "Follow your passion," I counseled. "You can figure out the employment stuff later."</p>

        <p>It wasn't until I began to research this widely accepted career advice that I understood how problematic it really was. As a sociologist, I interviewed college students and professional workers to learn what it really meant to pursue their dreams, which I will refer to here as the passion principle. I was stunned by what I found out about this principle in the research for my new book.</p>

        <p>Surveys show the American public has long held the passion principle in high regard as a career decision-making priority. And its popularity is even stronger among those facing job instability. Advocates of the passion principle found it compelling because they believed that following one's passion can provide workers with both the motivation necessary to work hard and a place to find fulfillment.</p>

        <p>Yet, what I found is that following one's passion does not necessarily lead to fulfillment, but is one of the most powerful cultural forces perpetuating overwork. I also found that promoting the pursuit of one's passion helps perpetuate social inequalities due to the fact that not everyone has the same economic resources to allow them to pursue their passion with ease.</p>

        <p>While the passion principle is broadly popular, not everyone has the necessary resources to turn their passion into a stable, good-paying job. Passion-seekers from wealthy families are better able to wait until a job they are passionate about comes along without worrying about student loans in the meantime. They are also better situated to take unpaid internships to get their foot in the door while their parents pay their rent. And they often have access to parents' social networks to help them find jobs.</p>

        <p>Surveys revealed that working-class and first-generation college graduates, regardless of their career field, are more likely than their wealthier peers to end up in low-paying unskilled jobs when they pursue their passion. Colleges, workplaces and career counselors who promote the "follow your passion" path for everyone, without leveling the playing field, help perpetuate socioeconomic inequalities among career aspirants.</p>

        <p>It's not just well-off passion-seekers who benefit from the passion principle. Employers of passionate workers do, too. Potential employers showed greater interest in passionate applicants in part because they believed the applicants would work hard at their jobs without expecting an increase in pay. They even sacrifice a good salary, job stability and leisure time to work in a job they love.</p>
      `,
      questions: [
        {
          question: "What did the author advise people to do for almost a decade?",
          options: [
            "Figure out what is the most fascinating job.",
            "Follow widely accepted career counsel.",
            "Pursue their careers with passion.",
            "Do whatever they are zealous for."
          ],
          correctAnswer: 3,
          explanation: "文章第一段明确指出，作者在近十年时间里告诉每个人要'追随你的热情'（'Follow your passion'），这对应D选项'Do whatever they are zealous for'，下标为3。"
        },
        {
          question: "How did the author feel about the passion principle through his research?",
          options: [
            "He was astonished by its consequences.",
            "He was further convinced of its soundness.",
            "He was actually right to follow it through.",
            "He was struck by its broad popularity."
          ],
          correctAnswer: 3,
          explanation: "定位第二段末至第三段：作者说'我在为新书做研究时，对关于这一原则的发现感到震惊'（I was stunned by what I found out about this principle），紧接着第三段说明发现的内容之一——' surveys 显示美国公众长期以来高度推崇 passion principle，其流行程度甚至更高'。D选项'He was struck by its broad popularity'中 struck 同义替换 stunned，broad popularity 对应 its popularity is even stronger，故选D。"
        },
        {
          question: "What is important to turning one's passion into a stable, good-paying job?",
          options: [
            "Willingness to take unpaid internships and low-paying jobs.",
            "Full academic preparedness and sound career counseling.",
            "Hard work and sacrifice of leisure time.",
            "Financial backing and social connections."
          ],
          correctAnswer: 3,
          explanation: "文章第五段指出，富裕家庭的热情追求者'能够等到他们热衷的工作出现，而不必担心学生贷款'，'能够做无薪实习'，'通常能接触到父母的社交网络'。这些都需要经济支持和社会关系，对应D选项，下标为3。"
        },
        {
          question: "What happens when everyone is encouraged to follow their passion?",
          options: [
            "Many more career aspirants end up unemployed.",
            "People are less concerned with socioeconomic inequality.",
            "Socioeconomic inequality is likely to persist.",
            "Career counselors are going to lose credibility."
          ],
          correctAnswer: 2,
          explanation: "文章第六段明确指出，推广'追随热情'路径'帮助延续了求职者之间的社会经济不平等'（'help perpetuate socioeconomic inequalities among career aspirants'）。C选项对应这一观点，下标为2。"
        },
        {
          question: "What does the author say about employers of passionate workers?",
          options: [
            "They provide these workers with job stability and a good salary.",
            "They exploit these workers' passion to benefit themselves.",
            "They level the playing field for these workers to reach their goals.",
            "They encourage these workers to realize their aspirations."
          ],
          correctAnswer: 1,
          explanation: "文章最后一段指出，雇主对热情的求职者更感兴趣，部分原因是因为他们相信这些求职者'会努力工作而不期望加薪'（'would work hard at their jobs without expecting an increase in pay'），这实际上是在利用工人的热情为自己谋利。B选项对应这一点，下标为1。"
        }
      ]
    },
    {
      id: 103,
      title: "Simulators and Organizational Change",
      difficulty: "CET-6",
      exam: "2025年6月真题（第2套）",
      wordCount: 425,
      suggestedTime: 8,
      content: `
        <p>Simulators are most often utilized within industries such as nuclear power, aviation and surgery where failure results in disastrous consequences. To maximize the value from a simulation learning experience, participants should immediately and directly apply their learning to a specific intervention within their organization.</p>

        <p>Most organizations aspire to deploy significant change programs, only to find them nearly impossible to implement. That is largely because successful change requires more than a vision, it requires a workforce that not only doesn't resist change, but embraces it. To achieve success, an organization must build a transformation program that will allow change to be rapidly pulled across its departments and throughout its layers.</p>

        <p>Regardless of the level of senior management commitment, unless key thought leaders at all levels embrace the change, the initiative will wither and die. To create this kind of widespread passion, learning leaders must expose the workforce to what could be, which will enable them to rethink their mental models, enable them to break free from their deep-rooted paradigms and embrace the opportunity to learn.</p>

        <p>Allowing participants to enter a simulated environment provides them with the opportunity to experience alternative realities which can prompt them to rethink their current beliefs. Behavioral change is not easy for most adults. Lectures, training programs and workshops can explain the intellectual elements of transformation, but they are seldom effective at getting to the behavioral aspects that lie at the heart of a significant change initiative.</p>

        <p>Further, under normal working conditions, managers rarely see the full effect of their employee development efforts. As such, an intervention like a simulation can provide the stimulus for change. An effective simulation can be better than experience as a learning tool because it accelerates time, compresses space, and unlike reality, is specifically designed to maximize participant learning.</p>

        <p>Simulations provide an immersive learning experience where skills, processes and knowledge all can be highlighted in a way reality cannot. The ability to explore, experiment and repeatedly apply new knowledge in unlimited, risk-free models is what makes simulation one of the most productive forms of learning. Well-designed simulations can enable individuals and groups to develop a deep level of understanding about how their decisions and intuitive responses to business stimuli affect their fellow participants and the organization as a whole.</p>

        <p>To reap the benefits, however, simulations must feel like reality. At the end of the successful simulation, participants must declare "this is us." If they don't, they will view the experience as a game, which can be difficult to apply on the job, or worse, irrelevant to everyday work tasks. To maximize benefits from simulation, participants should immediately apply the learning from the experience to forge a smooth link between learning and doing.</p>
      `,
      questions: [
        {
          question: "What do we learn about successful changes in organizations?",
          options: [
            "They can be immediately implemented with great ease.",
            "They are usually led by organization leaders of vision.",
            "They call for enthusiastic support from the workforce.",
            "They often result from simulation learning experiences."
          ],
          correctAnswer: 2,
          explanation: "文章第二段明确指出，成功的变革需要'一支不仅不抵制变革，而且拥抱变革的员工队伍'（'a workforce that not only doesn't resist change, but embraces it'）。C选项对应这一观点，下标为2。"
        },
        {
          question: "What should learning leaders do to arouse learners' passion for change?",
          options: [
            "Allow them to see what could possibly be achieved.",
            "Help them break free from their old paradigms.",
            "Encourage them to rethink their thought models.",
            "Stimulate them to embrace fresh opportunities."
          ],
          correctAnswer: 0,
          explanation: "文章第三段指出，学习领导者必须'让员工接触到可能实现的目标'（'expose the workforce to what could be'），从而激发他们对变革的热情。A选项对应这一做法，下标为0。"
        },
        {
          question: "What does the passage say about lectures, training programs and workshops?",
          options: [
            "They are generally incapable of changing workers' behaviors on the job.",
            "They are interventions different from simulations in creating stimuli for change.",
            "They aim at transforming the behaviors of the workers in an organization.",
            "They help managers achieve the full effect of employee development efforts."
          ],
          correctAnswer: 0,
          explanation: "文章第四段提到，讲座、培训项目和研讨会'很少能够触及重大变革倡议核心的行为方面'（'are seldom effective at getting to the behavioral aspects that lie at the heart of a significant change initiative'）。A选项对应这一观点，下标为0。"
        },
        {
          question: "What makes simulation one of the most fruitful forms of learning?",
          options: [
            "Its capability of saving time by accelerating the immersive learning experience.",
            "Its potential for learners to examine their skills, knowledge and learning process.",
            "Its capability of providing all participants with a practical learning experience.",
            "Its potential for learners to explore, experiment and practice without any risk."
          ],
          correctAnswer: 3,
          explanation: "文章第六段强调，模拟'能够探索、实验并反复应用新知识于无风险的模型中'（'ability to explore, experiment and repeatedly apply new knowledge in unlimited, risk-free models'），这使其成为最富有成效的学习形式之一。D选项对应这一优势，下标为3。"
        },
        {
          question: "What should participants do in a simulation to reap the greatest benefits possible?",
          options: [
            "Take the experience as a mere game.",
            "Apply promptly what they learn to their jobs.",
            "Develop a deep level of understanding.",
            "Strive to connect closely with their leaders."
          ],
          correctAnswer: 1,
          explanation: "文章最后一段明确建议，参与者应该'立即将经验中的学习应用到工作中'（'immediately apply the learning from the experience'），以便在学习与行动之间建立顺畅联系。B选项对应这一做法，下标为1。"
        }
      ]
    },
    {
      id: 104,
      title: "GDP vs. Real Wealth: Rethinking Progress",
      difficulty: "CET-6",
      exam: "2025年6月真题（第2套）",
      wordCount: 412,
      suggestedTime: 8,
      content: `
        <p>GDP growth is not a good indicator of how well a country is performing, and should not be the primary goal of governments. Unlimited growth is not sustainable and economic thinking is moving toward the idea that we should aim for sustainability in our economic models. But while a sustainable economy is vital to our future, it is a means to an end, not an end in itself.</p>

        <p>The idea that governments should focus on happiness has its critics. There are concerns about how happiness can be measured. Is happiness not a fleeting and subjective psychological state? Don't different people experience different levels of happiness? Even on the broadest interpretation of "happiness" as prosperity or "life satisfaction", people want different things. Of course, governments cannot impose life satisfaction on citizens. But our happiness relies on collaborative efforts as a society. A government's obligation lies in creating conditions that promote prosperity. And there is good reason to suppose that such conditions exist, are globally applicable, and are discoverable through research.</p>

        <p>In a recently published article, philosopher Julian Baggini suggests we should focus on "real wealth" for citizens, which does not depend on GDP growth. Access is key: people do not need to own, but rather access things that enable them to live well. Technological advances and changes in social behavior enable us to make more efficient use of the assets that we already have. And focusing on access to the resources people need to live better lives could help reduce inequality.</p>

        <p>As far as it goes, this has much in common with proposals tabled by "happiness" advocates. But it sets the bar far too low for what governments can and should be doing for their citizens. For example, it's not clear how a "real wealth" economy would remedy the epidemic of mental ill-health that plagues our society. In Western countries, at least — poor mental health is more detrimental to wellbeing than poverty.</p>

        <p>Over and above a vastly improved provision of therapeutic mental healthcare, there are preventative measures for improving mental health that governments could and should adopt. The WHO recommends establishing institutions that facilitate community participation — educational programs and interventions that provide skills for promoting mental wellbeing. It says a lot, however, that the WHO feels the need to appeal to the economic benefits of improving mental health to persuade governments that the cost of taking proposed measures is justified.</p>

        <p>As long as the economy is their priority, governments need go no further than ensuring citizens' continued productivity. To demand that governments set the "happiness" of citizens as their highest priority is to demand that they view citizens as ends in themselves.</p>
      `,
      questions: [
        {
          question: "What does the passage say is the more recent thinking of economic growth?",
          options: [
            "It should be made sustainable.",
            "It is vital to the future of humanity.",
            "It should be governments' chief concern.",
            "It is an indicator of government performance."
          ],
          correctAnswer: 0,
          explanation: "文章第一段明确指出，经济思维正朝着'我们应该在经济模型中以可持续性为目标'（'aim for sustainability in our economic models'）的方向发展。A选项对应这一观点，下标为0。"
        },
        {
          question: "Why are some people opposed to the idea that governments should focus on happiness?",
          options: [
            "Governments cannot impose happiness on citizens.",
            "People's happiness is built upon their own endeavor.",
            "Happiness means different things to different people.",
            "Happiness depends on sustainable economic growth."
          ],
          correctAnswer: 2,
          explanation: "文章第二段提到，人们对政府关注幸福的想法有担忧，因为'幸福是否不是一个短暂而主观的心理状态？'（'Is happiness not a fleeting and subjective psychological state?'），'不同的人是否经历不同水平的幸福？'这些问题表明幸福对不同人有不同含义。C选项对应这一反对理由，下标为2。"
        },
        {
          question: "What does philosopher Julian Baggini suggest governments do in a recently published article?",
          options: [
            "Try to reduce inequality between the rich and the poor.",
            "Provide people with access to resources for a better life.",
            "Change people's behaviors to put social wealth to better use.",
            "Make use of advanced technologies to improve people's lives."
          ],
          correctAnswer: 1,
          explanation: "文章第三段明确指出，哲学家Julian Baggini建议政府关注公民的'真实财富'，关键是'使用权'（'Access is key'），人们不需要拥有，而是需要'能够获得使他们过上美好生活的资源'（'access things that enable them to live well'）。B选项对应这一建议，下标为1。"
        },
        {
          question: "Why does the WHO feel the need to appeal to the economic benefits of improving mental health to justify its recommendations?",
          options: [
            "Mental health programs cannot be executed without GDP growth.",
            "Psychological interventions are conducive to people's wellbeing.",
            "Poor mental health is detrimental to a nation's economic system.",
            "Governments still take economic development as their priority."
          ],
          correctAnswer: 3,
          explanation: "文章第五段提到，WHO感到需要通过呼吁改善心理健康的经济效益来证明其建议的合理性，'这说明了很多问题'（'It says a lot'），暗示政府仍然将经济作为优先事项。D选项对应这一分析，下标为3。"
        },
        {
          question: "What message does the author try to convey at the end of the passage?",
          options: [
            "Governments' goal should be prosperity-driven.",
            "Governments' goal should be people-oriented.",
            "Governments should consider citizens' views in decision-making.",
            "Governments should set sustained productivity as their top priority."
          ],
          correctAnswer: 1,
          explanation: "文章最后一段明确指出，要求政府将公民的'幸福'作为最高优先事项，就是要求政府'将公民视为目的本身'（'view citizens as ends in themselves'）。这意味着政府的目标应该以人为本，B选项对应这一理念，下标为1。"
        }
      ]
    },
    {
      id: 105,
      title: "Pandas: The Sweet Spot of Conservation",
      difficulty: "CET-4",
      exam: "2025年6月真题（第1套）",
      wordCount: 378,
      suggestedTime: 8,
      content: `
        <p>New research suggests that pandas may be at risk of dying out because they are too comfortable. Experts say too much happiness can stop the bears from searching for new mates. Environmentalists have long believed that building roads or homes near the bears may threaten their survival by "reducing or fragmenting their natural habitats", The Times reported.</p>

        <p>But the new research suggests that a "modest degree of discomfort and fragmentation" may actually help preserve panda populations. The research was conducted by scientists from Michigan State University. It concluded that pandas fail to wander off in search of new mates if they find their habitat too comfortable, resulting in a lack of vital genetic diversity.</p>

        <p>For their study — outlined in a paper in the journal Conservation Biology — the team looked at genetic diversity and spread among a Chinese panda population. The ideal level of perfectly livable habitat was found to be only 80% of an area, with the remainder either too harsh or too affected by human activity.</p>

        <p>The experts concluded that pandas should ideally "be happy enough to thrive, but not so content that they don't want to move around and find new mates". Their conclusions about what The Guardian described as this "sweet spot" are in line with the so-called Goldilocks principle: that there can be just the right amount of something.</p>

        <p>The concept has been applied to a wide range of disciplines, from developmental psychology to economics and engineering. Claudio Sillero, a professor of conservation biology at Oxford University, told the newspaper that the new findings could have implications beyond panda conservation.</p>

        <p>"Most large animals that eat meat live in increasingly fragmented landscapes," said Sillero, who was not involved in the research. "It may well be that the messy nature of their relationship with human efforts induces more animals to scatter or travel further, and might result in greater genetic connectivity and enhanced population persistence."</p>

        <p>The most recent count of pandas found that there were more than 1,800 left in the wild, putting them on the list of vulnerable, but not endangered, species.</p>
      `,
      questions: [
        {
          question: "What do we learn from new research about pandas?",
          options: [
            "They are losing habitat due to the building of roads and houses.",
            "They have stopped seeking new mates for reproduction.",
            "They may not adapt to the fragmentation of their habitat.",
            "They may cease to exist as a result of enjoying too good a life."
          ],
          correctAnswer: 3,
          explanation: "文章第一段明确指出，最新研究表明熊猫'可能因为太舒适而面临灭绝的风险'（'may be at risk of dying out because they are too comfortable'）。D选项对应这一发现，下标为3。"
        },
        {
          question: "What can we conclude from the new research by scientists at Michigan State University?",
          options: [
            "Environmentalists' long-time belief regarding panda conservation may be misleading.",
            "Housing development near pandas' homes may threaten their survival.",
            "Pandas' natural habitats are becoming less suitable for reproduction.",
            "The increased panda population is attributed to the fragmentation of their habitat."
          ],
          correctAnswer: 0,
          explanation: "文章第二段指出，最新研究表明'适度的不适和栖息地破碎化实际上可能有助于保护熊猫种群'（'a modest degree of discomfort and fragmentation may actually help preserve panda populations'），这与环保主义者长期以来的信念相反。A选项对应这一结论，下标为0。"
        },
        {
          question: "What is the experts' conclusion regarding pandas?",
          options: [
            "It is urgent to provide an ideal habitat for them to thrive.",
            "It is very important to preserve their genetic diversity.",
            "Their chances of finding new mates have a lot to do with their habitat.",
            "Their environment for survival has been continuously worsening."
          ],
          correctAnswer: 2,
          explanation: "文章第四段明确指出，专家得出的结论是熊猫应该'快乐到足以茁壮成长，但不能太满足以至于不想四处移动寻找新配偶'（'be happy enough to thrive, but not so content that they don't want to move around and find new mates'）。C选项对应这一结论，下标为2。"
        },
        {
          question: "What can we infer from the passage about the Goldilocks principle?",
          options: [
            "It needs to be confirmed by more studies on pandas.",
            "It applies to the preservation of pandas too.",
            "It has implications for future panda research.",
            "It can be used to locate the right spot for pandas."
          ],
          correctAnswer: 1,
          explanation: "文章第四段提到，专家的结论与所谓的'金发姑娘原则'（Goldilocks principle）一致，即'某样东西可以有恰到好处的量'。这表明该原则也适用于熊猫保护，B选项对应这一推论，下标为1。"
        },
        {
          question: "What can the new findings do according to Professor Sillero?",
          options: [
            "Help discover new ways for the conservation of pandas.",
            "Help remove pandas from the list of endangered species.",
            "Shed light on the conservation of most large meat-eating animals.",
            "Show the complexity of interactions between humans and animals."
          ],
          correctAnswer: 2,
          explanation: "文章第六段提到，Sillero教授认为新发现'可能对熊猫保护之外也有启示'（'could have implications beyond panda conservation'），特别是对大多数大型食肉动物的保护。C选项对应这一观点，下标为2。"
        }
      ]
    },
    {
      id: 106,
      title: "Grit: The True Key to Success",
      difficulty: "CET-4",
      exam: "2025年6月真题（第1套）",
      wordCount: 356,
      suggestedTime: 8,
      content: `
        <p>With those born with natural talents, it feels as if they excel without really trying. But what about those of us who don't have a natural talent? We've been told all our lives that if you work hard, you too can succeed. But with the release of Angela Duckworth's Grit, we are given a new key to success.</p>

        <p>"As much as talent counts, effort counts twice," says Duckworth in Grit. She introduces a new concept that talent may be overrated, and if you want real success, what you need is grit, the perfect combination of passion and persistence. Even if you have natural talent, it's nothing without grit. Duckworth says grit is the difference between success and failure. A person who has grit is more likely to succeed than a person who does not.</p>

        <p>When we think about attaining success — whether it's landing that job or learning that new skill — our thoughts are immediately burdened by all the things we must first learn. If you want that new job, you have to learn the job skills, then the interview skills, then the dress part — and you must be perfect at all of them.</p>

        <p>Grit is different because it tells us that perfection isn't the goal. Grit lifts the unreasonable expectations off our shoulders. Grit tells us that the door is open wider than we first thought possible. Grit allows us to redefine our goals. Think about it: what's something you've always wanted to do, but gave up because you "don't have the skills for it"? What's something you love but aren't good at?</p>

        <p>The real workings of grit are to have sustainable passion and continue to try. Effort means more than your natural ability. Even if you haven't mastered a skill, grit tells you that you can still succeed if you can transform your passion into action. In a way, Duckworth is giving new hope to people who have shut the doors on their dreams. She is saying it is possible that you can accomplish anything. If at first you fail, then try one more time with grit.</p>
      `,
      questions: [
        {
          question: "What does the passage say about people born with natural talents?",
          options: [
            "They seem to outdo others without hard work.",
            "They appear to know all the secrets to success.",
            "They feel it only too logical to succeed.",
            "They are bound to excel effortlessly."
          ],
          correctAnswer: 0,
          explanation: "文章第一段明确指出，有天赋的人'似乎不需要真正努力就能表现出色'（'excel without really trying'）。A选项对应这一描述，下标为0。"
        },
        {
          question: "What does Duckworth say about talent?",
          options: [
            "It is a new concept much too overrated.",
            "It proves necessary for big achievements.",
            "It plays a lesser role in one's success.",
            "It is a guarantee for real success in life."
          ],
          correctAnswer: 2,
          explanation: "文章第二段提到，Duckworth提出了一个新概念，即'天赋可能被高估了'（'talent may be overrated'），并且说'努力比天赋重要两倍'（'effort counts twice'）。C选项对应这一观点，下标为2。"
        },
        {
          question: "What does the passage say about people thinking of attaining success?",
          options: [
            "They are puzzled how to present their best to the employer.",
            "They are burdened by their expectation of perfection.",
            "They will try hard to land a job that fits their skills best.",
            "They will find themselves lacking in all the skills they need."
          ],
          correctAnswer: 1,
          explanation: "文章第三段指出，当我们思考获得成功时，我们的思想'立刻被我们必须首先学习的所有事情所负担'（'immediately burdened by all the things we must first learn'），并且必须'在所有方面都完美'。这表明人们被完美主义期望所负担，B选项对应这一分析，下标为1。"
        },
        {
          question: "How does the author think grit can be helpful to us?",
          options: [
            "It allows us to know what we are good at.",
            "It opens our eyes to new opportunities.",
            "It focuses our attention on what we do.",
            "It lets us reconsider the goals to achieve."
          ],
          correctAnswer: 3,
          explanation: "文章第四段明确指出，坚毅'允许我们重新定义我们的目标'（'allows us to redefine our goals'），这表明它有助于我们重新考虑要实现的目标。D选项对应这一功能，下标为3。"
        },
        {
          question: "What message does Duckworth try to convey in her book Grit?",
          options: [
            "We should perfect ourselves to ensure success.",
            "We should stay persistent even in face of failures.",
            "We can never master a skill without constant practice.",
            "We can never expect to reach our goals without passion."
          ],
          correctAnswer: 1,
          explanation: "文章最后一段明确指出，Duckworth在书中传达的信息是'如果你一开始失败了，那么用坚毅再试一次'（'If at first you fail, then try one more time with grit'）。这强调了在失败面前要坚持不懈，B选项对应这一信息，下标为1。"
        }
      ]
    },
    {
      id: 107,
      title: "Power Clothing: Dress for Success",
      difficulty: "CET-4",
      exam: "2025年6月真题（第2套）",
      wordCount: 365,
      suggestedTime: 8,
      content: `
        <p>We all take a little extra effort to look nice for special occasions. But most of us have conflicting feelings about dressing up and feel guilty about taking the time to focus on clothes. Science now suggests the right dress may give ourselves the extra edge in our professional and personal lives.</p>

        <p>We hear sayings like "dress for the job you want; not the job you have". Most people don't really believe in them, but research into the impact of clothes on behavior now suggests that there may actually be a grain of truth in these sayings. Science says that the clothes we wear affect our behavior, our mood and even the way we interact with others because of the symbolic meaning that we assign to different types of clothing.</p>

        <p>We consider some clothes to be powerful, some to be fun, and so on. We even evaluate people whom we have just met based on their clothes. We also evaluate ourselves based on what we are wearing because of the way they make us feel. This means that the experience of wearing something affects our attitudes and our choice of behavior.</p>

        <p>There's a reason tailored jackets are associated with being 'dressed for success'. It seems that wearing formal office wear puts us in the right frame of mind to conduct business. Wearing power clothing makes us feel more confident and even increases hormones needed for displaying dominance. This in turn helps us become better negotiators and abstract thinkers.</p>

        <p>While a good suit works wonders for our performance in the boardroom, wearing formal wear isn't a great idea when we want to socialize. Studies have found that people tend to be less open and less able to relax when they wear formal clothes. On the other hand, a casual dress helps us become more friendly and creative. These findings support the idea of wearing business casuals on a Friday; since colleagues are most likely to take out time to socialize on the last work day of the week. I mean, who wants to hang out with people in their suits?</p>
      `,
      questions: [
        {
          question: "What does science suggest the right dress may do?",
          options: [
            "Add to our advantage in work and life.",
            "Enable us to look a lot more attractive.",
            "Help us to enjoy a fuller personal life.",
            "Provide extra energy for what we do."
          ],
          correctAnswer: 0,
          explanation: "文章第一段明确指出，科学表明得体的着装'可能给我们的职业和个人生活带来额外优势'（'give ourselves the extra edge in our professional and personal lives'）。A选项对应这一观点，下标为0。"
        },
        {
          question: "Why does science say the clothes one wears may affect their interaction with others?",
          options: [
            "Clothes usually represent one's social and economic status.",
            "Clothes largely determine one's likability by people around.",
            "Different types of clothing markedly reflect different personalities.",
            "Different types of clothing convey different messages symbolically."
          ],
          correctAnswer: 3,
          explanation: "文章第二段明确指出，我们穿的衣服影响我们的行为、情绪甚至与他人的互动方式，是'因为我们要为不同类型的服装赋予象征意义'（'because of the symbolic meaning that we assign to different types of clothing'）。D选项对应这一解释，下标为3。"
        },
        {
          question: "How do the clothes we wear sway our evaluation of ourselves?",
          options: [
            "By exerting an effect on our power of judgment.",
            "By impacting how we feel about ourselves.",
            "By affecting what we take as the basis for assessment.",
            "By influencing our interpretation of symbolic messages."
          ],
          correctAnswer: 1,
          explanation: "文章第三段提到，'我们也根据我们穿的衣服来评价自己，因为它们让我们产生某种感觉'（'We also evaluate ourselves based on what we are wearing because of the way they make us feel'）。B选项对应这一机制，下标为1。"
        },
        {
          question: "Why does the author say tailored jackets are associated with being 'dressed for success'?",
          options: [
            "They are necessary for formal business dealings.",
            "They may help people concentrate on their business.",
            "They are vital to keeping a dominant position in business transactions.",
            "They may enable people to have the right mentality for doing business."
          ],
          correctAnswer: 3,
          explanation: "文章第四段指出，穿正式办公装'让我们处于进行商务的正确心态'（'puts us in the right frame of mind to conduct business'），这就是为什么定制夹克与'成功着装'相关联。D选项对应这一解释，下标为3。"
        },
        {
          question: "What are people advised to do when they want to socialize?",
          options: [
            "Focus on clothing.",
            "Wear a good suit.",
            "Dress casually.",
            "Look unusual."
          ],
          correctAnswer: 2,
          explanation: "文章最后一段明确建议，当人们想要社交时，'休闲装扮有助于我们变得更友好和更有创造力'（'a casual dress helps us become more friendly and creative'）。C选项对应这一建议，下标为2。"
        }
      ]
    },
    {
      id: 108,
      title: "Opera and Classical Music: Still Relevant Today",
      difficulty: "CET-4",
      exam: "2025年6月真题（第2套）",
      wordCount: 382,
      suggestedTime: 8,
      content: `
        <p>With the rise of pop music, jazz, and electronic music, both opera and classical music started to fade away from the public eye. Some people are beginning to wonder whether opera and classical music are still relevant to the modern world of music. Granted, you will not typically see today's teenagers lending their ears to Bach anytime soon, but there are some major indicators that both opera and classical music are now still quite alive.</p>

        <p>The most major indicator of classical music's importance in society today is the fact that much of the popular music that is currently being produced uses similar beats, harmonies, and melodies as those that were used in some of classical music's best works. Even so, it can be difficult for those who do not study music theory to see this as an indicator, since it is subtle and just shows the impact symphonic orchestras have had on society's taste in music.</p>

        <p>A better example for the relevance of opera and classical music can be seen in the invention of the rock opera. Opera, in its simplest definition, is telling a story using music as its form. The art of telling a story using music has not faded in the least bit. In fact, sometimes actual orchestras are used for major parts of the opera itself. Some of the world's greatest hits have been parts of rock operas.</p>

        <p>Fans of classical music can also tell you that there are few types of music that are more expressive. So, it should come as no surprise to anyone that classical music pieces are still used as background music in modern movies. Symphonic orchestra compositions have also been created solely for the purpose of being included in major motion pictures. These are often very well received amongst mainstream music fans.</p>

        <p>Classical music and opera are the very foundation of what our modern music is based upon. Considering the huge impact they have had on our current society, it is without doubt that we can expect them to continue to remain important for centuries to come.</p>
      `,
      questions: [
        {
          question: "What does the author think of classical music and opera in today's world?",
          options: [
            "They still make their presence felt.",
            "They have given way to electronic music.",
            "They will not fade away from the public eye.",
            "They are no longer relevant to teenagers' lives."
          ],
          correctAnswer: 0,
          explanation: "文章第一段明确指出，虽然歌剧和古典音乐看似从公众视野中消失，但'有一些主要迹象表明，歌剧和古典音乐现在仍然很有活力'（'there are some major indicators that both opera and classical music are now still quite alive'）。A选项对应这一观点，下标为0。"
        },
        {
          question: "What do we learn about much of the popular music currently produced?",
          options: [
            "It can be difficult for many classical music fans to appreciate.",
            "It can be seen as an indicator of refinement on classical music.",
            "It caters to society's taste in music in a more subtle way than classical music.",
            "It contains elements similar to those in some masterpieces of classical music."
          ],
          correctAnswer: 3,
          explanation: "文章第二段明确指出，目前生产的许多流行音乐使用了与古典音乐最佳作品'相似的节拍、和声和旋律'（'similar beats, harmonies, and melodies'）。D选项对应这一特点，下标为3。"
        },
        {
          question: "Why does the author mention the invention of the rock opera?",
          options: [
            "To illustrate how to tell a story using music.",
            "To present the simplest definition of opera.",
            "To show the relevance of opera and classical music.",
            "To justify the necessity of using orchestras in opera."
          ],
          correctAnswer: 2,
          explanation: "文章第三段提到，摇滚歌剧的发明是歌剧和古典音乐相关性的'更好的例子'（'A better example for the relevance of opera and classical music'）。C选项对应这一目的，下标为2。"
        },
        {
          question: "Why are classical music pieces still used as background music in modern movies?",
          options: [
            "There are few types of music for movie producers to choose from.",
            "They are considered to be the most expressive type of music.",
            "They are well received by movie fans from all over the world.",
            "They are essential for movies to become the world's greatest hits."
          ],
          correctAnswer: 1,
          explanation: "文章第四段提到，古典音乐爱好者会告诉你，'很少有比古典音乐更具表现力的音乐类型'（'there are few types of music that are more expressive'）。这就是为什么古典音乐仍被用作电影背景音乐。B选项对应这一原因，下标为1。"
        },
        {
          question: "What do we learn about our modern music?",
          options: [
            "It could not have come into being without classical music and opera as its foundation.",
            "It cannot outcompete classical music and opera in its impact on our current society.",
            "It will not enjoy as much popularity as classical music and opera among music fans.",
            "It might not be able to rival classical music and opera in importance for centuries to come."
          ],
          correctAnswer: 0,
          explanation: "文章最后一段明确指出，'古典音乐和歌剧是我们现代音乐所基于的基础'（'Classical music and opera are the very foundation of what our modern music is based upon'）。没有这个基础，现代音乐就不可能存在。A选项对应这一观点，下标为0。"
        }
      ]
    },
    {
      id: 109,
      title: 'Drug Timing: A New Frontier in Treatment',
      difficulty: 'CET-4',
      exam: '2025年12月真题（第1套）',
      wordCount: 345,
      suggestedTime: 8,
      content: `
<p>All living organisms on Earth are exposed to a 24-hour day-night cycle. This cycle is the reason why people rest at night and are active during the day. Consequently, all human body functions also follow this daily rhythm, and the timing of behaviors like exercise or food intake can significantly influence your health. For example, eating at night can lead to weight gain over time because food intake at night leads to increased fat storage.</p>

<p>Many drug targets in the body follow a 24-hour cycle, too. This means that the specific proteins a drug is designed to modify can react differently to the medicine over the course of a 24-hour time period. Because how the body responds to a drug can differ depending on the time it is taken, it logically follows that taking medicines at specific times could help increase their effectiveness and reduce unwanted side effects.</p>

<p>When doctors prescribe medicine for people, they rarely consider the best time to take it. There are two main reasons for that oversight. First, many physicians are not aware that some drugs work better during a specific time of the day. And second, most drugs have not been studied for possible different effects during a 24-hour cycle. Therefore, patients are directed to take most drugs during the morning or evening primarily to ensure compliance.</p>

<p>Over 50 years ago, researchers found that the cholesterol drug simvastatin is more effective at lowering cholesterol levels when taken at night rather than during the day. This is because the liver enzyme (酶) these drugs target is more active at night. Taking medicine at the wrong time can even cause harm. My colleagues and I wondered whether midazolam, the most common sedative (镇静剂) used in surgical procedures worldwide, might interfere with the internal clock that protects the heart at night.</p>

<p>Currently, there are no guidelines regarding when midazolam should be administered. More research is needed to determine the best times to administer treatments for different diseases. I believe taking drug timing into account could help make treatments more effective and help more people worldwide.</p>
      `,
      questions: [
        {
          question: 'What do we learn from the passage about the timing of our behaviors?',
          options: ['It has a considerable impact on our health.', 'It confines us to a 24-hour day-night cycle.', 'It requires us to follow a particular rhythm.', 'It holds the key to all human body functions.'],
          correctAnswer: 0,
          explanation: '第一段指出，锻炼或进食等行为的时间安排会显著影响健康（\'the timing of behaviors like exercise or food intake can significantly influence your health\'），并举例夜间进食导致增重。对应A选项，下标0。'
        },
        {
          question: 'What does the author say about the proteins in our body?',
          options: ['They can modify the effects of medicines in different ways.', 'They can reduce unwanted side effects of certain medicines.', 'Their reaction to medicines changes during the day-night cycle.', 'Their design determines how differently they react to medicines.'],
          correctAnswer: 2,
          explanation: '第二段说明，药物要作用的蛋白质在24小时周期内对药物的反应不同（\'can react differently to the medicine over the course of a 24-hour time period\'）。对应C选项，下标2。'
        },
        {
          question: 'What do doctors do when prescribing medicine for people?',
          options: ['They give little thought to the time of taking it for maximum effect.', 'They rarely consider which medicine works better for which patient.', 'They tell patients its possible side effects during a period of 24 hours.', 'They tell patients to comply with the directions of drug manufacturers.'],
          correctAnswer: 0,
          explanation: '第三段首句指出，医生开药时很少考虑最佳服药时间（\'they rarely consider the best time to take it\'）。对应A选项，下标0。'
        },
        {
          question: 'Why do doctors advise patients to take most drugs in the morning or in the evening?',
          options: ['To discourage them from making complaints.', 'To ensure they take the drugs as instructed.', 'To comply with new research findings strictly.', 'To guarantee the maximum effect of the drugs.'],
          correctAnswer: 1,
          explanation: '第三段末句指出，让患者早晚服药主要是为了确保遵医嘱（\'primarily to ensure compliance\'）。对应B选项，下标1。'
        },
        {
          question: 'What does the author suggest near the end of the passage?',
          options: ['Considering drug-taking timing when prescribing drugs for patients.', 'Making treatments less complex by taking drug timing into account.', 'Conducting more studies to find out the best timing for treating different diseases.', 'Finding out the most effective drugs for treating diseases through further research.'],
          correctAnswer: 2,
          explanation: '末段指出，还需要更多研究来确定不同疾病治疗的最佳时间（\'More research is needed to determine the best times to administer treatments for different diseases\'）。对应C选项，下标2。'
        }
      ]
    },
    {
      id: 110,
      title: 'Americans Working Into Their 70s',
      difficulty: 'CET-4',
      exam: '2025年12月真题（第1套）',
      wordCount: 352,
      suggestedTime: 8,
      content: `
<p>Katharine Abraham, an economics professor, was chatting with her hairdresser (理发师) about retirement plans. The economist said she plans to continue working because she wants to. The hairdresser agreed but for a different reason: She needs the money. Both scenarios (情况) are contributing to a big increase in the number of people in the U.S. working into their 70s. Over the past 20 years, the share of Americans working in their 70s has risen from less than 10% to nearly 15%.</p>

<p>In addition to people being healthier and living much longer, economists say that a combination of financial considerations such as years of slow rise in real wages and a shift away from traditional pensions in the private sector are some of the reasons people delay retirement. The decline of manufacturing and the increase in the number of people working in less labor-intensive occupations also has contributed to the trend, says Abraham, who researches work and retirement decisions of older Americans. “Which matters more depends on what your history up until that point has been in the type of work you’re doing,” Abraham says.</p>

<p>The overall trend is hitting Americans of all different levels of educational attainment, although the percentages vary by category. The share of Americans with bachelor’s degrees who were working into their 70s reached nearly 20% in 2018. For those with a high school degree or less, the proportion of those working in their 70s had risen to around 10%, while those with some college education were in the middle at around 15%.</p>

<p>Martin Neil Baily, an economist who is leading a research project on retirement security, notes that quitting a career can lead to feelings of isolation and loneliness, particularly for men. He suggests that many college-educated workers are choosing to stay in the labor force more for social benefits than for financial reasons. They’re also more likely to be in professional occupations where they tend to enjoy their work more. Workers in more physical jobs, meanwhile, may be more likely to look forward to retiring, Baily says, suggesting those who stay on are more likely doing so for financial reasons.</p>
      `,
      questions: [
        {
          question: 'What do we learn from the passage about the economics professor and her hairdresser?',
          options: ['They differ in their reasons for continuing to work.', 'They are both committed to working into their 70s.', 'They are happy about their current financial situation.', 'They hold different views about postponing retirement.'],
          correctAnswer: 0,
          explanation: '第一段对比两人：教授继续工作是因为愿意（\'because she wants to\'），理发师是因为需要钱（\'She needs the money\'），即两人继续工作的原因不同。对应A选项，下标0。'
        },
        {
          question: 'What is one of the reasons for people to delay retirement?',
          options: ['More and more people have switched to less intellectually challenging jobs.', 'The number of jobs suitable for older people has increased in the private sector.', 'The rate of wage increase in terms of purchasing power has slowed down for years.', 'More and more people in the workplace find it hard to rely on traditional pensions.'],
          correctAnswer: 2,
          explanation: '第二段指出，实际工资多年增长缓慢（\'years of slow rise in real wages\'）是人们延迟退休的财务原因之一，real wages 即按购买力衡量的工资。对应C选项，下标2。'
        },
        {
          question: 'What is the general trend in people delaying retirement?',
          options: ['The higher their earnings, the more likely they are tempted to delay retirement.', 'Those who have more job satisfaction tend to retire later than those who have less.', 'More men than women are likely to stay in the labor force until their late seventies.', 'The higher their educational level, the more likely they are to delay retirement.'],
          correctAnswer: 3,
          explanation: '第三段给出数据：本科学历者70岁后仍在工作的比例接近20%，高中及以下约10%，受部分大学教育者居中约15%，说明学历越高越可能延迟退休。对应D选项，下标3。'
        },
        {
          question: 'What is the chief reason for college-educated workers delaying retirement according to an economist?',
          options: ['Enjoying financial security.', 'Staying connected socially.', 'Contributing more professionally.', 'Increasing social security payments.'],
          correctAnswer: 1,
          explanation: '末段指出，受过大学教育的劳动者选择留在劳动力市场更多是为了社交方面的好处而非经济原因（\'more for social benefits than for financial reasons\'）。对应B选项，下标1。'
        },
        {
          question: 'What does the passage say about people doing manual work?',
          options: ['They are eager to enjoy life after retiring.', 'They are likely to have financial troubles.', 'They generally don’t enjoy doing it.', 'They tend to anticipate retirement.'],
          correctAnswer: 3,
          explanation: '末段指出，从事体力劳动的工作者更可能盼望退休（\'may be more likely to look forward to retiring\'）。对应D选项，下标3。'
        }
      ]
    },
    {
      id: 111,
      title: 'Losing Friends on the Road to Success?',
      difficulty: 'CET-6',
      exam: '2025年12月真题（第1套）',
      wordCount: 455,
      suggestedTime: 9,
      content: `
<p>Many see friendships as a comfort blanket: a shoulder to cry on, a reliable soul to confide in. However, more often than not, in our eagerness to seek individual success, we lose friends along the way and that has become part of the process.</p>

<p>The chaos and never-ending turmoil that accompanies everyday life is an aggressive obstacle in the pursuit of stable friendships. As students, we use this excuse to shrug off losing people who we once thought to be loved ones.</p>

<p>Instead of viewing our lives as a race, where everyone is on their own path to some form of success, we must relearn to value the connections we make along the track. We must reevaluate the harm of radical, individual freedom.</p>

<p>Radical individualism elevates the freedom of the individual over the collective. It argues, for instance, that universal healthcare, an example of collectivism, threatened the dream of many Americans. Many of us have fallen victim to an individualistic culture.</p>

<p>Society tends to celebrate personal achievement and commend it based on the assumption that winning or succeeding is a consequence of working harder than the next person. As a society, we idolize the concept of “losing friends on the road to success”.</p>

<p>I remember hearing in high school, “Don’t worry about losing friendships, just focus on study and getting into college. That’s all that will matter in the long run,” a sentiment that is not unique to my experience. It’s preached in many success stories, and it’s embedded in the way we see growth.</p>

<p>Motivational speakers will push their audience to be complacent to the inevitable end of losing friends. Spend too much time with friends? You’re losing time better utilized on your achievements. Invest time in your relationships? Invest time in your work instead. This constant need to succeed has blinded us from seeing through the whirlwind of change that accompanies our everyday lives. We are expected to tangibly succeed, earn awards, get higher positions, earn better grades. In order to succeed, we lose friends, and that has sadly become normalized.</p>

<p>We cannot be complacent with losing friendships because they are our anchors. Yes, pursue success. Challenge yourself. Push limits. But contrary to all the self-proclaimed success experts, doing it alone does not make you more successful or any better than someone who achieved it with the help of others. Put effort into fostering healthy relationships, and maintaining them through your busy schedule that seems like it leaves no time for anyone else. Although we may be living in a society that treasures the independent pursuit of achievement, having people to support and love you on the way is far more important than any end result.</p>
      `,
      questions: [
        {
          question: 'What often happens when people are eager to pursue individual success?',
          options: ['They lack a shoulder to cry on.', 'They have no soul to confide in.', 'They cannot find reliable friends.', 'They ignore their ties with friends.'],
          correctAnswer: 3,
          explanation: '首段指出，人们在急于追求个人成功的过程中往往会一路失去朋友（\'we lose friends along the way\'），即忽视了与朋友之间的联结。对应D选项，下标3。'
        },
        {
          question: 'What does the author advise people to do in their pursuit of radical individualism?',
          options: ['Reexamine its detrimental effects.', 'Shrug off the loss of their loved ones.', 'Avoid the chaos and turmoil involved.', 'Remove aggressive obstacles in the way.'],
          correctAnswer: 0,
          explanation: '第三段指出，我们必须重新评估极端个人自由的危害（\'We must reevaluate the harm of radical, individual freedom\'）。对应A选项，下标0。'
        },
        {
          question: 'What is American society’s assumption of personal achievement?',
          options: ['It is to be duly celebrated and highly commended.', 'It is a sure way to fulfill a person’s dream.', 'It revolves around an individualistic culture.', 'It reflects a person’s exceptional endeavor.'],
          correctAnswer: 3,
          explanation: '第五段指出，社会褒奖个人成就的前提假设是：成功源于比他人更努力（\'winning or succeeding is a consequence of working harder than the next person\'），即成功体现了个人非凡的努力。对应D选项，下标3。'
        },
        {
          question: 'What is preached in many success stories?',
          options: ['Attaching importance to academic gains on the road to success.', 'Investing one’s time in work instead of connecting with friends.', 'Trying to strengthen friendships in one’s pursuit of personal success.', 'Excelling in academic performance to get into a prestigious college.'],
          correctAnswer: 0,
          explanation: '第六段作者回忆高中时听到的话“别担心失去友谊，专心学习和考上大学就行”，并说这种论调在许多成功学故事里被宣扬（\'It’s preached in many success stories\'），即强调在成功路上要重视学业成绩。对应A选项，下标0。'
        },
        {
          question: 'What can we infer from the passage regarding the pursuit of success?',
          options: ['No one can succeed without pushing limits.', 'No one can afford to neglect close friends.', 'Collectivism is superior to individualism.', 'Success experts often lead people to ruin.'],
          correctAnswer: 1,
          explanation: '末段指出，路上有人支持你、爱你比任何结果都重要（\'having people to support and love you on the way is far more important than any end result\'），可推知没有人能忽视亲密朋友。对应B选项，下标1。'
        }
      ]
    },
    {
      id: 112,
      title: 'Honoring King’s Legacy: The Battle for Equity',
      difficulty: 'CET-6',
      exam: '2025年12月真题（第1套）',
      wordCount: 457,
      suggestedTime: 9,
      content: `
<p>During his acceptance speech for the Nobel Peace Prize, Martin Luther King Jr. said, “I believe that unarmed truth and unconditional love will have the final word in reality.” More than five decades later, our society is still struggling to separate truth from fantasy, fact from fiction. From disputes over the climate change to debates about how slavery is taught, America is at a crossroads. And the battle for equity is at the heart of these vital conversations.</p>

<p>Study after study shows that inequity has had appalling consequences. A 2020 report by Citi indicated that “Black students could have increased their lifetime incomes $90 – $113 billion” if equity issues related to higher education had been adequately addressed over the past two decades. This statistic represents a flood of issues we’ve failed to confront as a nation. It also highlights one truth: We’re missing out on valuable opportunities to bridge the differences that divide us.</p>

<p>However, by honoring King’s legacy, we can get our country back on the path toward true equity. Students — and adults for that matter — simply cannot understand the conflicts we have today without understanding what caused them in the first place. That means we have a responsibility to help them make connections between US history and current events. It also means giving them the tools they need to address inequity and bias in their own lives. Adherence to these principles, along with a commitment to truthful dialogue, can help every student better appreciate how far we’ve come and more clearly see the roads we have yet to travel.</p>

<p>With more truthful analysis of the need for more qualified, diverse educators, we can improve our recruiting, training, and retention strategies for schools across the country. Unfortunately, our deeply rooted divisions are delaying these advancements. A recent survey found that 77 percent of Americans believe the nation is “more divided than ever before”. But reports of increased polarization shouldn’t persuade us to look away from one another. Instead, they should compel us to address our shared issues head-on. We are not, as some would suggest, living in a “post-racial society”. We simply cannot afford to keep our heads buried in the sand when it comes to racial inequity. Unless we get honest about intolerance, bias, and how these social diseases impact the ways we treat one another, injustice will continue to haunt us. But our children and our grandchildren deserve better.</p>

<p>On this Martin Luther King Day and beyond, let’s commit to working together to disrupt the status quo. Let’s continue to build a better, more inclusive nation; and in the words of Martin Luther King Jr., “A society at peace with itself, a society that can live with its conscience.”</p>
      `,
      questions: [
        {
          question: 'What does the author think about today’s America?',
          options: ['It is struggling to transform fiction into reality.', 'It has been the focus of many vital conversations.', 'It still has a long way to go before equity can be truly realized.', 'It has got to a point where people disagree on nearly every issue.'],
          correctAnswer: 2,
          explanation: '首段指出，五十多年过去，社会仍在努力分辨真相与幻想，美国正处于十字路口，而公平之战是这些重要讨论的核心，说明真正实现公平仍任重道远。对应C选项，下标2。'
        },
        {
          question: 'What do we learn from the passage about black students in the past 20 years?',
          options: ['They have been unfairly treated regarding higher education.', 'They have been battling hard to address equity issues.', 'They have boosted their lifetime incomes by billions of dollars.', 'They have come to see the consequences of racial discrimination.'],
          correctAnswer: 0,
          explanation: '第二段引用花旗银行报告：如果过去二十年高等教育相关的公平问题得到充分解决，黑人学生的终生收入本可增加900亿至1130亿美元，反证他们在高等教育上受到了不公对待。对应A选项，下标0。'
        },
        {
          question: 'How can Americans bridge the differences that divide them?',
          options: ['By dealing with the thorny issues confronting them.', 'By seizing every chance to enhance racial harmony.', 'By continuing to pursue Martin Luther King Jr.’s cause.', 'By striving to identify exceedingly valuable opportunities.'],
          correctAnswer: 2,
          explanation: '第三段指出，通过尊崇金的遗志（\'by honoring King’s legacy\'），国家才能重回真正公平之路，即继续追随马丁·路德·金的事业。对应C选项，下标2。'
        },
        {
          question: 'How do most Americans view America as a nation according to a recent survey?',
          options: ['It is compelled to address its historical social issues.', 'It is delaying advancements toward racial equality.', 'It has kept itself from polarization.', 'It has become increasingly split.'],
          correctAnswer: 3,
          explanation: '第四段引用最新调查：77%的美国人认为国家“比以往任何时候都更加分裂”（\'more divided than ever before\'）。对应D选项，下标3。'
        },
        {
          question: 'What does the author suggest Americans do?',
          options: ['Ensure the well-being of their children and grandchildren.', 'Make joint efforts to tackle the nation’s equity issues.', 'Restrain their intolerance and discrimination.', 'Restore social order for a harmonious nation.'],
          correctAnswer: 1,
          explanation: '末段呼吁大家承诺共同努力打破现状（\'let’s commit to working together to disrupt the status quo\'），携手建设更包容的国家，即共同应对国家的公平问题。对应B选项，下标1。'
        }
      ]
    },
    {
      id: 113,
      title: 'Why Schools Must Teach Money Skills',
      difficulty: 'CET-4',
      exam: '2024年12月真题（第1套）',
      wordCount: 362,
      suggestedTime: 9,
      content: `
<p>As a university student, I’ve come to realise just how little I know about money. I’ve come to the brutal realisation that Australia’s youth are being done a great disservice by not receiving any consistent financial education. Diving headfirst into the crash course of starting university, I’ve quickly tried to get myself up to speed with the financial terms of the modern era to help manage my personal finances.</p>

<p>I’ve read some financial education books, done some online learning, and have spoken to my nearest and dearest for their pearls of financial wisdom. There are undoubtedly hundreds of great resources out there for those wishing to improve their financial literacy, but while I was researching, I still kept wishing that I didn’t have to play catch-up with the money world. I felt that I was sailing the financial seas with no skills and no life jacket!</p>

<p>However, after talking to my friends who felt the same, I quickly realised that it wasn’t my ignorance but the lack of financial education in our schooling system that is leaving high schoolers seriously behind in the modern world of money.</p>

<p>Let’s compare a theoretical financial education subject to the standard compulsory English class. On average, English may not be the most popular subject, but it’s consistently on the schedule throughout high school, with all students graduating fluent in English. A financial education subject should do just the same. It shouldn’t be just a one-day event but a course integrated throughout the whole of high school that would allow students to gradually expand their financial literacy, and would prevent the need for a ‘catch up’ phase once we’re out on our own after graduation. In the same way that learning a language or new skills takes time, building financial skills requires practice and years to gradually accumulate bits and pieces of knowledge.</p>

<p>Giving young people the opportunity to become familiar with the world of money would provide them with a great advantage to enter adulthood with confidence and security so that they are able to manage their own money and look after themselves.</p>
      `,
      questions: [
        {
          question: 'What has the author come to realise since entering university?',
          options: ['They need a crash course on financial terms.', 'They are very much lacking in financial literacy.', 'It requires consistent education to be financially independent.', 'It is unrealistic to give all Australian youth a financial education.'],
          correctAnswer: 1,
          explanation: '首段作者说“我刚意识到自己对金钱知之甚少”（\'how little I know about money\'），即自己在理财素养上非常欠缺。对应B选项，下标1。'
        },
        {
          question: 'How did the author feel in today’s money world?',
          options: ['Badly equipped to survive.', 'Ignorant of financial literature.', 'Barely capable of moving ahead.', 'Overwhelmed by the resources online.'],
          correctAnswer: 0,
          explanation: '第二段作者形容自己“在没有技能也没有救生衣的情况下在金融海洋中航行”（\'sailing the financial seas with no skills and no life jacket\'），即装备极差、难以生存。对应A选项，下标0。'
        },
        {
          question: 'What did the author realise after talking to their friends?',
          options: ['Their friends were as keen as they were on financial matters.', 'The schooling system was to blame for their trouble.', 'High schoolers knew nothing about the modern financial world.', 'Financial courses were as unpopular as compulsory English classes.'],
          correctAnswer: 1,
          explanation: '第三段指出，问题不在作者无知，而在于学校教育体系缺乏财务教育（\'the lack of financial education in our schooling system\'），即学校体系是罪魁祸首。对应B选项，下标1。'
        },
        {
          question: 'What is the author’s idea of a financial education course?',
          options: ['It should foresee students’ needs after graduation.', 'It should provide students with some basic knowledge.', 'It should be taught the same way as English is taught.', 'It should be integrated into high school education.'],
          correctAnswer: 3,
          explanation: '第四段明确指出，财务教育不应只是为期一天的活动，而应“贯穿整个高中的一门课程”（\'a course integrated throughout the whole of high school\'）。对应D选项，下标3。'
        },
        {
          question: 'What would financial literacy do to young people?',
          options: ['Allow them to enter adulthood with financial security.', 'Enable them to look after themselves without worrying about money.', 'Render them confident and secure in terms of money management.', 'Help them become familiar with the world of money.'],
          correctAnswer: 0,
          explanation: '末段指出，让年轻人熟悉金钱世界能让他们“带着自信和保障步入成年”（\'enter adulthood with confidence and security\'）。对应A选项，下标0。'
        }
      ]
    },
    {
      id: 114,
      title: 'Can Science Save Chocolate from Extinction?',
      difficulty: 'CET-4',
      exam: '2024年12月真题（第1套）',
      wordCount: 354,
      suggestedTime: 9,
      content: `
<p>Chocolates save us from many things, especially emotional distress. They comfort us in times of trouble, calming down a racing heart by channelling happy calories inside us. We all have faith in chocolates to delight us in an instant! Recently, chocolate lovers were heartbroken as scientists claimed that they can become extinct by 2050!</p>

<p>But hey, we have some happy news for you. Scientists can still help save chocolates from dying out! If you are not aware as to why scientists made the statement about the death of this wonderful thing, let us tell you the facts. Chocolate trees, whose seeds are used to make chocolate, grow in the tropical plant world and require very specific weather conditions to prosper. Now, fifty percent of the world’s cocoa beans come from two countries in West Africa: Côte d’Ivoire and Ghana. Scientists believe that both of these countries will experience a 3.8 ℉ temperature increase by 2050 due to global warming, endangering the cacao farms in the rainforests.</p>

<p>These farms will then have to be shifted to cooler mountainous areas, which are the natural habitat of wildlife. This will lead to some tough decisions: whether to grow chocolate or save wildlife. Unfortunately, the crisis of global warming has already had a serious negative impact on cacao farms’ yields, leading to the prices of chocolates skyrocketing.</p>

<p>Scientists, however, are trying to find a long-term and eco-friendly solution to this problem! They are trying to modify the species with a gene-editing technology, which will transform the seedlings into a species that survives even in a drier and warmer climate. According to a report by The Business Insider, in the University of California’s new bio-sciences building, tiny green cacao seedlings are lined up in refrigerated greenhouses for a new experiment by using a technology called CRISPR. By manipulating the DNA of plants, this technology is already being used across the world to make plants tougher and cheaper. Similarly, in this unconventional experiment, scientists will make tiny, precise changes to the DNA of the seedlings to make the cocoa crops survive in warmer and drier climates.</p>
      `,
      questions: [
        {
          question: 'What do people believe chocolates can do?',
          options: ['Cheer them up instantly.', 'Create happy calories.', 'Conceal emotional distress.', 'Relieve them of heart trouble.'],
          correctAnswer: 0,
          explanation: '首段指出我们都相信巧克力能“瞬间带来愉悦”（\'delight us in an instant\'），即立刻让人开心起来。对应A选项，下标0。'
        },
        {
          question: 'What was scientists’ recent assertion about chocolates?',
          options: ['They could become a rare treat in the near future.', 'They could calm people down a bit in times of crisis.', 'They could prevent people from getting heartbroken.', 'They could become unavailable in less than 30 years.'],
          correctAnswer: 3,
          explanation: '首段末尾提到科学家宣称巧克力到2050年可能灭绝（\'become extinct by 2050\'），即不到30年就会买不到。对应D选项，下标3。'
        },
        {
          question: 'What would happen if the cacao farms were shifted to cooler mountainous areas?',
          options: ['The natural habitat of wildlife there would be ruined.', 'The cacao farmers would have a tough time to adapt.', 'The rainforests would be shrinking dramatically.', 'The quality of cocoa beans would suffer greatly.'],
          correctAnswer: 0,
          explanation: '第三段指出，较凉爽的山区是野生动物的自然栖息地（\'the natural habitat of wildlife\'），农场迁入将带来“种巧克力还是拯救野生动物”的两难，即那里的野生动物栖息地会被破坏。对应A选项，下标0。'
        },
        {
          question: 'What do we learn about the cacao farms in the crisis of global warming?',
          options: ['They try to seek help from gene-editing scientists.', 'They decide to move to cooler mountainous areas.', 'They have suffered a lot due to a decrease in produce.', 'They have benefited by raising prices of cocoa beans.'],
          correctAnswer: 2,
          explanation: '第三段指出，全球变暖已对可可农场的产量造成严重负面影响（\'a serious negative impact on cacao farms’ yields\'），即因减产而损失惨重。对应C选项，下标2。'
        },
        {
          question: 'What are scientists trying to do in the University of California’s new bio-sciences building?',
          options: ['Build rows of refrigerated greenhouses for research on cacao seedlings.', 'Gene-edit cacao seedlings for them to withstand a drier, warmer climate.', 'Produce chocolates with the latest gene-editing technology.', 'Transplant the genes of tougher plants to cacao seedlings.'],
          correctAnswer: 1,
          explanation: '末段指出，科学家用CRISPR对幼苗DNA做精确修改，让可可作物能在更温暖干燥的气候中存活（\'survive in warmer and drier climates\'）。对应B选项，下标1。'
        }
      ]
    },
    {
      id: 115,
      title: 'Why Do We Love Being Scared?',
      difficulty: 'CET-6',
      exam: '2024年12月真题（第1套）',
      wordCount: 460,
      suggestedTime: 9,
      content: `
<p>Imagine you’re an alien sent to Earth to document the behaviour of the mammals inhabiting the planet. You stumble into a movie theatre that’s showing the latest Hollywood horror film. Several dozen humans are gathered together in a dark, undecorated room. They’re all staring at a rectangular area on which patterns of light change rapidly. They are clearly in a state of high arousal. Their heart rate is elevated, they occasionally glance around nervously, and they sometimes jump collectively in their seats, and emit high-pitched warning calls. Eventually, the lights come up and the rectangular screen goes black. The humans stand up and leave the room, chatting and laughing, and showing signs of pleasure.</p>

<p>Why do these humans voluntarily expose themselves to what appears to be a deeply unpleasant experience? And why do they react so strongly to those patterns of light on a screen? I am fascinated with the paradox of horror — the strange fact that many people seek out scary entertainment. I think the answer to the puzzle lies in human nature. My research suggests that we humans evolved to find pleasure in situations that allow us to experience negative emotions in a safe context.</p>

<p>You can see these elements of horror in children’s games. Take hide-and-seek for example, which is a simulation of a predator-prey interaction. The kid hides and the adult pretends to be a predator, searching for the child while howling like a dangerous beast. This simulation gives the child crucial information about how to avoid becoming prey, and children tend to find that kind of activity deeply satisfying, presumably because it gives them a safe experience of a potentially catastrophic scenario. They find it pleasurable, and pleasure is evolution’s way of motivating us toward adaptive behaviour.</p>

<p>Horror is pleasurable to many people because it lets us play with negative emotions and develop coping strategies. We learn what it feels like to be truly afraid, and we learn how to handle negative emotion. How, then, does horror work? My research suggests that horror works by exploiting an ancient set of biological defence mechanisms — an evolved fear system, which we share with other animals. But humans are uniquely imaginative, and we use our evolved imagination to travel into virtual worlds that are full of danger.</p>

<p>There are good reasons for watching a horror film, even if you’re not a loyal horror fan. If you make it through the film in one piece, you’ll probably experience a strong sense of mastery, a sense that you were able to make it through an appalling experience. Anyway, watching a horror film makes you better at handling your own fear, and who knows when that will become critically relevant?</p>
      `,
      questions: [
        {
          question: 'What does the author say about people watching horror films in a movie theatre?',
          options: ['They are clearly in a state of high tension.', 'They are showing signs of high arousal.', 'They are living in a world of fantasy.', 'They are longing for pleasure.'],
          correctAnswer: 1,
          explanation: '首段描写观众“明显处于高度唤起状态”（\'clearly in a state of high arousal\'），心率上升、紧张张望、集体惊跳。对应B选项，下标1。'
        },
        {
          question: 'Why do many people seek out scary entertainment, according to the author’s research?',
          options: ['They gain experience in overcoming horror in real life.', 'They find joy in going through simulated horrible experiences.', 'They have learned from hide-and-seek as kids the thrill involved.', 'They have evolved to gain pleasure in escaping life-threatening situations.'],
          correctAnswer: 1,
          explanation: '第二段指出，人类进化出了在安全情境下体验负面情绪并从中获得快乐的能力（\'find pleasure in situations that allow us to experience negative emotions in a safe context\'），即在模拟的恐怖体验中找到乐趣。对应B选项，下标1。'
        },
        {
          question: 'What do children learn from hide-and-seek?',
          options: ['How to avoid falling prey to an attacker.', 'How to simulate a predator-prey interaction.', 'How to keep themselves from catastrophic errors.', 'How to turn a dangerous scenario into a safe one.'],
          correctAnswer: 0,
          explanation: '第三段指出，捉迷藏这种模拟让孩子获得“如何避免成为猎物的关键信息”（\'how to avoid becoming prey\'）。对应A选项，下标0。'
        },
        {
          question: 'Why is horror gratifying to many people?',
          options: ['It reminds them of an ancient set of biological defence mechanisms.', 'It triggers their imagination to travel into dangerous virtual worlds.', 'It allows them to learn what fear feels like and how to tackle it.', 'It activates their evolved fear system and their unique fantasy.'],
          correctAnswer: 2,
          explanation: '第四段指出，恐怖之所以令人愉悦，是因为它让我们玩味负面情绪并发展应对策略——我们体会真正的恐惧是什么感觉，也学会如何处理负面情绪。对应C选项，下标2。'
        },
        {
          question: 'What will one experience if they watch a horror film through without being hurt?',
          options: ['A strong sense of clear relevance.', 'A profound sense of good fortune.', 'A profound sense of intense relief.', 'A strong sense of being in control.'],
          correctAnswer: 3,
          explanation: '末段指出，完整看完恐怖片会体验到强烈的掌控感（\'a strong sense of mastery\'），即自己挺过了一场可怕经历的掌控感。对应D选项，下标3。'
        }
      ]
    },
    {
      id: 116,
      title: 'Beauty Filters and the Price of Perfection',
      difficulty: 'CET-6',
      exam: '2024年12月真题（第1套）',
      wordCount: 449,
      suggestedTime: 9,
      content: `
<p>An awakening has been taking place in the physical world against the beauty model that has been dictated to us for years. But in the digital arena, social media determines what is considered beautiful. The two opposing struggles are taking place in parallel.</p>

<p>In the physical world, the struggle goes against the underlying pressure exerted on women to conform to an unrealistic beauty ideal. As part of the struggle, various media outlets have presented women whose bodies don’t correspond to the so-called ideal. All those women who had previously been excluded from the covers of magazines, television series and the public agenda, have become “legitimate”. At the same time, a group of influencers have begun to upload to social media photos of themselves without makeup, and even photos in which they highlight supposed flaws. Technology has reshaped our beauty ideal and is doing a great job communicating that message to the masses.</p>

<p>One of the bizarre legacies of the past decade is the popularity of the “cyborg look”, which illustrates what Americans will look like in 2050. The cyborg look spread rapidly. Today, however, the Instagram face has become the new beauty ideal. The internalization of accepted beauty norms is much more effective when there is active involvement in the learning process. The active involvement of users is reflected in the gamified interaction offered by the social media platforms — the ability to like, write a comment, compare, share. Once the desired beauty ideal has been internalized, users are given tools or features to change their appearance to suit the accepted beauty ideal such as editing the image, choosing the ideal filter, the right background. A survey conducted in the United States revealed that more than 50% filter the images before posting them. And you will not be surprised to hear that the majority of them are women.</p>

<p>One of the significant consequences of obsessive filtering is the emerging tendency to treat oneself as an object to be observed and valued, in the same way another person observes and judges from the side. The effect of the filters is already far beyond amiable amusement. The filters and the entire game played on the networks affect the mental health of the users. According to a study, apps like Instagram, Snapchat and FaceTune allow users to achieve a level of perfection that was previously only observed in beauty magazines. Even though humanity has always cherished beauty, in the last decade our obsession with looks has reached an unprecedented peak. The time spent on social media creates an urge to achieve an impossible beauty ideal so powerful that the only thing that can fix it is not cosmetic intervention, but mental health care.</p>
      `,
      questions: [
        {
          question: 'What do we learn about beauty in the digital arena?',
          options: ['It dictates the taste of digital media.', 'It has been in the making for years.', 'It has ushered in a new awakening.', 'It is defined by social media.'],
          correctAnswer: 3,
          explanation: '首段指出，在数字领域，是社交媒体决定什么被视为美（\'social media determines what is considered beautiful\'）。对应D选项，下标3。'
        },
        {
          question: 'What does the passage say about beauty in the physical world?',
          options: ['Women are under constant pressure to keep up with beauty models.', 'Women are encouraged to pursue a beauty ideal that has never existed.', 'A fight is going on to remove pressure on women to conform to an absurd beauty ideal.', 'Media outlets have begun to present as beauty models trendy women without any makeup.'],
          correctAnswer: 2,
          explanation: '第二段指出，现实世界中的抗争针对的是强加给女性、要求其迎合不切实际审美标准的隐形压力（\'the struggle goes against the underlying pressure\'）。对应C选项，下标2。'
        },
        {
          question: 'What do we learn from the passage about the Instagram face?',
          options: ['It is now regarded as the new beauty ideal.', 'It is what most women will go after in 2050.', 'It is being much talked about on social media.', 'It is a perfect illustration of the ultimate beauty.'],
          correctAnswer: 0,
          explanation: '第三段明确指出，如今“Instagram脸已成为新的审美标准”（\'the Instagram face has become the new beauty ideal\'）。对应A选项，下标0。'
        },
        {
          question: 'What has obsessive filtering resulted in?',
          options: ['A good many women striving to reach an impossible level of perfection.', 'An urge to turn the entire game played on the network to one’s advantage.', 'A tendency to regard one’s body as an object of observation and judgment.', 'An increasing number of women filtering their images before uploading them.'],
          correctAnswer: 2,
          explanation: '第四段指出，沉迷滤镜的一个重要后果是人们倾向于把自己当作供人观察和评判的对象（\'treat oneself as an object to be observed and valued\'）。对应C选项，下标2。'
        },
        {
          question: 'What does the author want to emphasize at the end of the passage regarding people’s obsession with looks?',
          options: ['Cosmetic surgery should be made more accessible to the masses.', 'Psychological intervention should be introduced to alleviate it.', 'Their time spent on social media should be strictly controlled.', 'Its root cause should be meticulously examined and analyzed.'],
          correctAnswer: 1,
          explanation: '末段指出，这种执念强大到唯有心理健康干预而非美容手段才能解决（\'not cosmetic intervention, but mental health care\'）。对应B选项，下标1。'
        }
      ]
    }
  ]
};

// 导出数据（如果使用模块化）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = readingData;
}
