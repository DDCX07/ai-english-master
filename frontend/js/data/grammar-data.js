/**
 * Grammar Points Data
 * English Grammar Knowledge for CET-4/6
 */

const grammarData = {
  // Tenses and Aspects
  tenses: [
    {
      id: 1,
      title: "Present Simple",
      level: "CET-4",
      description: "Used for habits, general truths, and permanent situations.",
      examples: [
        "I study English every day.",
        "The sun rises in the east.",
        "She works as a teacher."
      ],
      keyPoints: ["Use for habits and routines", "Use for general truths", "Third person singular adds -s/es"],
      commonMistakes: ["Forgetting -s in third person singular", "Using present continuous for habits"]
    },
    {
      id: 2,
      title: "Present Continuous",
      level: "CET-4",
      description: "Used for actions happening now or temporary situations.",
      examples: [
        "I am studying English now.",
        "They are working on a project this week.",
        "She is reading a book at the moment."
      ],
      keyPoints: ["Form: am/is/are + verb-ing", "Use for actions happening now", "Use for temporary situations"],
      commonMistakes: ["Using it for habits", "Forgetting the helping verb"]
    },
    {
      id: 3,
      title: "Past Simple",
      level: "CET-4",
      description: "Used for completed actions in the past.",
      examples: [
        "I studied English yesterday.",
        "She went to Paris last year.",
        "They finished the project two weeks ago."
      ],
      keyPoints: ["Regular verbs add -ed", "Irregular verbs have special forms", "Use with specific time expressions"],
      commonMistakes: ["Using past simple instead of past perfect", "Incorrect irregular verb forms"]
    },
    {
      id: 4,
      title: "Present Perfect",
      level: "CET-6",
      description: "Used for actions with present relevance or unspecified past time.",
      examples: [
        "I have studied English for ten years.",
        "She has just arrived.",
        "They have never been to Japan."
      ],
      keyPoints: ["Form: have/has + past participle", "Connects past to present", "Used with 'for', 'since', 'just', 'already'"],
      commonMistakes: ["Using with specific past time expressions", "Confusing with past simple"]
    },
    {
      id: 5,
      title: "Past Perfect",
      level: "CET-6",
      description: "Used for actions completed before another past action.",
      examples: [
        "I had studied English before I moved to England.",
        "She had already left when we arrived.",
        "They had finished dinner by the time he came."
      ],
      keyPoints: ["Form: had + past participle", "Shows sequence of past events", "Used with 'by the time', 'before', 'after'"],
      commonMistakes: ["Using when simple past is sufficient", "Confusing with past perfect continuous"]
    }
  ],

  // Subjunctive Mood
  subjunctive: [
    {
      id: 1,
      title: "Present Subjunctive",
      level: "CET-6",
      description: "Used after certain verbs and expressions to suggest importance or necessity.",
      examples: [
        "It is important that he be told the truth.",
        "I suggest that she study harder.",
        "The doctor recommended that he quit smoking."
      ],
      keyPoints: ["Form: base form of verb", "Used after 'suggest', 'recommend', 'demand', 'insist'", "No -s in third person singular"],
      commonMistakes: ["Adding -s to third person", "Using 'should + verb'"]
    },
    {
      id: 2,
      title: "Past Subjunctive (Type 2 Conditional)",
      level: "CET-6",
      description: "Used for hypothetical or unlikely present/future situations.",
      examples: [
        "If I were rich, I would buy a big house.",
        "I wish I knew the answer.",
        "It is time that we went home."
      ],
      keyPoints: ["Use 'were' for all persons", "Use 'would/could/might + base verb'", "Used in 'if' clauses and 'wish'"],
      commonMistakes: ["Using 'was' instead of 'were'", "Using present tense in result clause"]
    },
    {
      id: 3,
      title: "Past Perfect Subjunctive (Type 3 Conditional)",
      level: "CET-6",
      description: "Used for hypothetical past situations.",
      examples: [
        "If I had known, I would have told you.",
        "I wish I had studied harder.",
        "Had he been more careful, he wouldn't have made that mistake."
      ],
      keyPoints: ["Use 'had + past participle' in if-clause", "Use 'would/could/might have + past participle'", "Can use inversion: 'Had I known...'"],
      commonMistakes: ["Using past perfect instead of past perfect subjunctive", "Forgetting 'have' in result clause"]
    }
  ],

  // Passive Voice
  passive: [
    {
      id: 1,
      title: "Present Passive",
      level: "CET-4",
      description: "Used when the focus is on the action, not the doer.",
      examples: [
        "English is spoken all over the world.",
        "The book is being read by many students.",
        "The cake has been eaten."
      ],
      keyPoints: ["Form: be + past participle", "Object becomes subject", "Can include agent with 'by'"],
      commonMistakes: ["Forgetting the 'be' verb", "Using active form instead"]
    },
    {
      id: 2,
      title: "Modal Passive",
      level: "CET-6",
      description: "Passive voice with modal verbs.",
      examples: [
        "The work can be done tomorrow.",
        "It must be finished by Friday.",
        "This should have been completed earlier."
      ],
      keyPoints: ["Form: modal + be + past participle", "Perfect forms: modal + have been + past participle", "Used for possibility, necessity, obligation"],
      commonMistakes: ["Forgetting 'be' before past participle", "Incorrect modal choice"]
    }
  ],

  // Relative Clauses
  relativeClauses: [
    {
      id: 1,
      title: "Defining Relative Clauses",
      level: "CET-4",
      description: "Clauses that define or identify the noun they modify.",
      examples: [
        "The man who called you is my uncle.",
        "The book that I bought is interesting.",
        "The city where I was born is beautiful."
      ],
      keyPoints: ["Use 'who/that' for people", "Use 'which/that' for things", "Use 'where' for places"],
      commonMistakes: ["Using 'which' for people", "Omitting necessary relative pronouns"]
    },
    {
      id: 2,
      title: "Non-defining Relative Clauses",
      level: "CET-6",
      description: "Clauses that add extra information about a noun.",
      examples: [
        "My father, who is a doctor, works at a hospital.",
        "The book, which I bought yesterday, is very interesting.",
        "London, where I lived for five years, is a great city."
      ],
      keyPoints: ["Separated by commas", "Cannot use 'that'", "Relative pronoun cannot be omitted"],
      commonMistakes: ["Using 'that'", "Omitting the relative pronoun", "No commas"]
    }
  ],

  // Conditionals
  conditionals: [
    {
      id: 1,
      title: "Zero Conditional",
      level: "CET-4",
      description: "General truths and scientific facts.",
      examples: [
        "If you heat water to 100°C, it boils.",
        "If you mix red and blue, you get purple.",
        "If plants don't get water, they die."
      ],
      keyPoints: ["If + present simple, present simple", "For facts and habits", "When can replace if"],
      commonMistakes: ["Using will in result clause"]
    },
    {
      id: 2,
      title: "First Conditional",
      level: "CET-4",
      description: "Real possibilities in the future.",
      examples: [
        "If it rains tomorrow, I will stay home.",
        "If you study hard, you will pass the exam.",
        "She will call you if she has time."
      ],
      keyPoints: ["If + present simple, will + base verb", "For real possibilities", "Can use 'might', 'can' instead of 'will'"],
      commonMistakes: ["Using will in if-clause"]
    },
    {
      id: 3,
      title: "Second Conditional",
      level: "CET-6",
      description: "Unlikely or imaginary situations.",
      examples: [
        "If I won the lottery, I would travel the world.",
        "If I were you, I would accept the offer.",
        "If she had more time, she would learn French."
      ],
      keyPoints: ["If + past simple, would + base verb", "For unlikely situations", "Use 'were' for all persons"],
      commonMistakes: ["Using 'was' instead of 'were'", "Using present tense in if-clause"]
    },
    {
      id: 4,
      title: "Third Conditional",
      level: "CET-6",
      description: "Hypothetical past situations.",
      examples: [
        "If I had known, I would have helped you.",
        "If she had studied harder, she would have passed.",
        "They wouldn't have succeeded if we hadn't helped them."
      ],
      keyPoints: ["If + past perfect, would have + past participle", "For imaginary past", "Can use inversion"],
      commonMistakes: ["Using past perfect instead of past perfect in if-clause", "Forgetting 'have' in result"]
    }
  ],

  // Infinitives and Gerunds
  infinitivesGerunds: [
    {
      id: 1,
      title: "Verbs followed by Gerund (-ing)",
      level: "CET-4",
      description: "Common verbs that are always followed by -ing form.",
      examples: [
        "I enjoy reading books.",
        "She suggested going to the cinema.",
        "He admitted making a mistake."
      ],
      keyPoints: ["enjoy, finish, avoid, suggest, mind, practice", "No 'to' before -ing", "Used after prepositions"],
      commonMistakes: ["Using to + infinitive instead", "Forgetting the -ing"]
    },
    {
      id: 2,
      title: "Verbs followed by Infinitive (to + verb)",
      level: "CET-4",
      description: "Common verbs that are followed by to + base verb.",
      examples: [
        "I want to learn English.",
        "She decided to move to London.",
        "They hope to finish the project soon."
      ],
      keyPoints: ["want, hope, decide, plan, agree, refuse", "Always use 'to' before verb", "Base form after 'to'"],
      commonMistakes: ["Using gerund instead", "Forgetting 'to'"]
    },
    {
      id: 3,
      title: "Verbs with both forms (different meanings)",
      level: "CET-6",
      description: "Verbs that can be followed by both forms with different meanings.",
      examples: [
        "I remember locking the door. (past action)",
        "Remember to lock the door. (future action)",
        "She stopped smoking. (quit the habit)",
        "She stopped to smoke. (paused to do it)"
      ],
      keyPoints: ["remember, forget, stop, try, go on", "Gerund for past/completed actions", "Infinitive for future/purpose"],
      commonMistakes: ["Using wrong form for intended meaning", "Not knowing the difference in meaning"]
    }
  ],

  // Articles
  articles: [
    {
      id: 1,
      title: "Definite Article (the)",
      level: "CET-4",
      description: "Used to refer to specific nouns.",
      examples: [
        "The sun rises in the east.",
        "The book on the table is mine.",
        "I visited the Eiffel Tower last year."
      ],
      keyPoints: ["Used with specific nouns", "Used with unique items (sun, moon)", "Used with ordinal numbers"],
      commonMistakes: ["Omitting 'the' when required", "Using 'the' with general plurals"]
    },
    {
      id: 2,
      title: "Indefinite Articles (a/an)",
      level: "CET-4",
      description: "Used with singular countable nouns when mentioning them for the first time.",
      examples: [
        "I saw a bird in the garden.",
        "She is an excellent teacher.",
        "He wants to buy a car."
      ],
      keyPoints: ["Use 'a' before consonant sounds", "Use 'an' before vowel sounds", "Not used with uncountable nouns"],
      commonMistakes: ["Using 'an' before consonant sound", "Using with uncountable nouns"]
    },
    {
      id: 3,
      title: "Zero Article",
      level: "CET-6",
      description: "When no article is used.",
      examples: [
        "I like music. (general)",
        "She speaks English. (languages)", "He goes to school. (institutions)"
      ],
      keyPoints: ["General plural nouns", "Uncountable nouns in general sense", "Most proper nouns"],
      commonMistakes: ["Using articles where not needed", "Omitting necessary articles"]
    }
  ],

  // Prepositions
  prepositions: [
    {
      id: 1,
      title: "Time Prepositions",
      level: "CET-4",
      description: "Prepositions used with time expressions.",
      examples: [
        "I'll see you at 5 PM.",
        "She was born in 1990.",
        "We met on Monday."
      ],
      keyPoints: ["at for precise time", "on for days and dates", "in for longer periods"],
      commonMistakes: ["Using wrong preposition for time expressions"]
    },
    {
      id: 2,
      title: "Place Prepositions",
      level: "CET-4",
      description: "Prepositions used for locations and positions.",
      examples: [
        "She is at school.",
        "He lives in London.",
        "The book is on the table."
      ],
      keyPoints: ["at for specific points/locations", "in for enclosed spaces/cities/countries", "on for surfaces"],
      commonMistakes: ["Confusing 'in' and 'at'", "Using wrong preposition for places"]
    }
  ]
};

// Export data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = grammarData;
}
