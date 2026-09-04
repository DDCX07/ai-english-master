/**
 * Grammar Practice Data
 * Exercises for practicing English grammar
 */

const grammarPracticeData = {
  // Tenses exercises
  tenses: [
    {
      id: 1,
      grammarId: 1,
      type: "fill-blank",
      question: "I _____ English every day.",
      options: ["study", "studies", "studying", "studied"],
      correctAnswer: 0,
      explanation: "Present Simple is used for habits and routines.",
      grammarPoint: "Present Simple"
    },
    {
      id: 2,
      grammarId: 1,
      type: "fill-blank",
      question: "She _____ to the gym twice a week.",
      options: ["go", "goes", "going", "gone"],
      correctAnswer: 1,
      explanation: "Third person singular adds -s in Present Simple.",
      grammarPoint: "Present Simple"
    },
    {
      id: 3,
      grammarId: 2,
      type: "fill-blank",
      question: "Look! The children _____ in the park.",
      options: ["play", "plays", "are playing", "played"],
      correctAnswer: 2,
      explanation: "Present Continuous is used for actions happening now.",
      grammarPoint: "Present Continuous"
    },
    {
      id: 4,
      grammarId: 2,
      type: "fill-blank",
      question: "I _____ for the exam at the moment.",
      options: ["study", "am studying", "studied", "have studied"],
      correctAnswer: 1,
      explanation: "Present Continuous for temporary current situations.",
      grammarPoint: "Present Continuous"
    },
    {
      id: 5,
      grammarId: 3,
      type: "fill-blank",
      question: "I _____ my homework yesterday.",
      options: ["finish", "finished", "have finished", "finishing"],
      correctAnswer: 1,
      explanation: "Past Simple for completed actions with specific past time.",
      grammarPoint: "Past Simple"
    },
    {
      id: 6,
      grammarId: 4,
      type: "fill-blank",
      question: "I _____ English for ten years.",
      options: ["study", "am studying", "have studied", "had studied"],
      correctAnswer: 2,
      explanation: "Present Perfect for actions continuing to the present.",
      grammarPoint: "Present Perfect"
    },
    {
      id: 7,
      grammarId: 5,
      type: "fill-blank",
      question: "I _____ English before I moved to England.",
      options: ["studied", "had studied", "have studied", "was studying"],
      correctAnswer: 1,
      explanation: "Past Perfect for actions completed before another past action.",
      grammarPoint: "Past Perfect"
    }
  ],

  // Subjunctive exercises
  subjunctive: [
    {
      id: 8,
      grammarId: 6,
      type: "fill-blank",
      question: "It is important that he _____ on time.",
      options: ["arrive", "arrives", "arriving", "arrived"],
      correctAnswer: 0,
      explanation: "Present Subjunctive uses base form after 'important that'.",
      grammarPoint: "Present Subjunctive"
    },
    {
      id: 9,
      grammarId: 6,
      type: "fill-blank",
      question: "The doctor suggested that she _____ smoking.",
      options: ["quits", "quit", "quitting", "quitted"],
      correctAnswer: 1,
      explanation: "Present Subjunctive uses base form after 'suggest'.",
      grammarPoint: "Present Subjunctive"
    },
    {
      id: 10,
      grammarId: 7,
      type: "fill-blank",
      question: "If I _____ rich, I would buy a big house.",
      options: ["am", "was", "were", "be"],
      correctAnswer: 2,
      explanation: "Past Subjunctive uses 'were' for all persons.",
      grammarPoint: "Past Subjunctive"
    },
    {
      id: 11,
      grammarId: 7,
      type: "fill-blank",
      question: "I wish I _____ the answer.",
      options: ["know", "knew", "have known", "had known"],
      correctAnswer: 1,
      explanation: "Past Subjunctive for present unreal situations.",
      grammarPoint: "Past Subjunctive"
    },
    {
      id: 12,
      grammarId: 8,
      type: "fill-blank",
      question: "If I _____ known, I would have told you.",
      options: ["have", "had", "would have", "did"],
      correctAnswer: 1,
      explanation: "Past Perfect Subjunctive for hypothetical past situations.",
      grammarPoint: "Past Perfect Subjunctive"
    },
    {
      id: 13,
      grammarId: 8,
      type: "fill-blank",
      question: "I wish I _____ harder for the exam.",
      options: ["studied", "have studied", "had studied", "would study"],
      correctAnswer: 2,
      explanation: "Past Perfect Subjunctive for regrets about the past.",
      grammarPoint: "Past Perfect Subjunctive"
    }
  ],

  // Passive voice exercises
  passive: [
    {
      id: 14,
      grammarId: 9,
      type: "fill-blank",
      question: "English _____ all over the world.",
      options: ["speaks", "is spoken", "is speaking", "has spoken"],
      correctAnswer: 1,
      explanation: "Present Passive: am/is/are + past participle.",
      grammarPoint: "Present Passive"
    },
    {
      id: 15,
      grammarId: 9,
      type: "fill-blank",
      question: "The book _____ by many students.",
      options: ["is read", "is being read", "reads", "reading"],
      correctAnswer: 0,
      explanation: "Present Passive for current state or repeated action.",
      grammarPoint: "Present Passive"
    },
    {
      id: 16,
      grammarId: 10,
      type: "fill-blank",
      question: "The work _____ by tomorrow.",
      options: ["can finish", "can be finished", "can finished", "finishing"],
      correctAnswer: 1,
      explanation: "Modal Passive: modal + be + past participle.",
      grammarPoint: "Modal Passive"
    },
    {
      id: 17,
      grammarId: 10,
      type: "fill-blank",
      question: "This _____ by Friday.",
      options: ["must finish", "must be finished", "must finished", "must have been finished"],
      correctAnswer: 1,
      explanation: "Modal Passive with 'must' for obligation.",
      grammarPoint: "Modal Passive"
    }
  ],

  // Conditionals exercises
  conditionals: [
    {
      id: 18,
      grammarId: 11,
      type: "fill-blank",
      question: "If you _____ water to 100°C, it boils.",
      options: ["heat", "will heat", "heated", "are heating"],
      correctAnswer: 0,
      explanation: "Zero Conditional: If + present simple, present simple.",
      grammarPoint: "Zero Conditional"
    },
    {
      id: 19,
      grammarId: 12,
      type: "fill-blank",
      question: "If it rains tomorrow, I _____ at home.",
      options: ["stay", "will stay", "would stay", "stayed"],
      correctAnswer: 1,
      explanation: "First Conditional: If + present simple, will + base verb.",
      grammarPoint: "First Conditional"
    },
    {
      id: 20,
      grammarId: 12,
      type: "fill-blank",
      question: "If you study hard, you _____ the exam.",
      options: ["pass", "will pass", "would pass", "passed"],
      correctAnswer: 1,
      explanation: "First Conditional for real future possibilities.",
      grammarPoint: "First Conditional"
    },
    {
      id: 21,
      grammarId: 13,
      type: "fill-blank",
      question: "If I won the lottery, I _____ around the world.",
      options: ["travel", "will travel", "would travel", "traveled"],
      correctAnswer: 2,
      explanation: "Second Conditional: If + past simple, would + base verb.",
      grammarPoint: "Second Conditional"
    },
    {
      id: 22,
      grammarId: 13,
      type: "fill-blank",
      question: "If I were you, I _____ the offer.",
      options: ["accept", "will accept", "would accept", "accepted"],
      correctAnswer: 2,
      explanation: "Second Conditional for unlikely situations.",
      grammarPoint: "Second Conditional"
    },
    {
      id: 23,
      grammarId: 14,
      type: "fill-blank",
      question: "If I _____ known, I would have helped you.",
      options: ["have", "had", "would have", "did"],
      correctAnswer: 1,
      explanation: "Third Conditional: If + past perfect, would have + past participle.",
      grammarPoint: "Third Conditional"
    },
    {
      id: 24,
      grammarId: 14,
      type: "fill-blank",
      question: "If she _____ harder, she would have passed.",
      options: ["studied", "had studied", "would study", "studies"],
      correctAnswer: 1,
      explanation: "Third Conditional for hypothetical past situations.",
      grammarPoint: "Third Conditional"
    }
  ],

  // Infinitives and Gerunds exercises
  infinitivesGerunds: [
    {
      id: 25,
      grammarId: 15,
      type: "fill-blank",
      question: "I enjoy _____ books in my free time.",
      options: ["read", "reading", "to read", "reads"],
      correctAnswer: 1,
      explanation: "Verb 'enjoy' is followed by gerund (-ing).",
      grammarPoint: "Verbs followed by Gerund"
    },
    {
      id: 26,
      grammarId: 15,
      type: "fill-blank",
      question: "She suggested _____ to the cinema.",
      options: ["go", "going", "to go", "went"],
      correctAnswer: 1,
      explanation: "Verb 'suggest' is followed by gerund.",
      grammarPoint: "Verbs followed by Gerund"
    },
    {
      id: 27,
      grammarId: 16,
      type: "fill-blank",
      question: "I want _____ English fluently.",
      options: ["speak", "speaking", "to speak", "spoke"],
      correctAnswer: 2,
      explanation: "Verb 'want' is followed by infinitive (to + verb).",
      grammarPoint: "Verbs followed by Infinitive"
    },
    {
      id: 28,
      grammarId: 16,
      type: "fill-blank",
      question: "She decided _____ to London.",
      options: ["move", "moving", "to move", "moves"],
      correctAnswer: 2,
      explanation: "Verb 'decide' is followed by infinitive.",
      grammarPoint: "Verbs followed by Infinitive"
    },
    {
      id: 29,
      grammarId: 17,
      type: "fill-blank",
      question: "I remember _____ the door. (I did it)",
      options: ["lock", "locking", "to lock", "locked"],
      correctAnswer: 1,
      explanation: "Remember + gerund for past completed actions.",
      grammarPoint: "Remember with different meanings"
    },
    {
      id: 30,
      grammarId: 17,
      type: "fill-blank",
      question: "Remember _____ the door. (Don't forget)",
      options: ["lock", "locking", "to lock", "locked"],
      correctAnswer: 2,
      explanation: "Remember + infinitive for future actions.",
      grammarPoint: "Remember with different meanings"
    },
    {
      id: 31,
      grammarId: 17,
      type: "fill-blank",
      question: "She stopped _____ to her health. (quit)",
      options: ["smoke", "smoking", "to smoke", "smokes"],
      correctAnswer: 1,
      explanation: "Stop + gerund means to quit a habit.",
      grammarPoint: "Stop with different meanings"
    },
    {
      id: 32,
      grammarId: 17,
      type: "fill-blank",
      question: "She stopped _____ a cigarette. (paused to do it)",
      options: ["smoke", "smoking", "to smoke", "smokes"],
      correctAnswer: 2,
      explanation: "Stop + infinitive means to pause to do something.",
      grammarPoint: "Stop with different meanings"
    }
  ],

  // Articles exercises
  articles: [
    {
      id: 33,
      grammarId: 18,
      type: "fill-blank",
      question: "_____ sun rises in the east.",
      options: ["A", "An", "The", "No article"],
      correctAnswer: 2,
      explanation: "Use 'the' with unique items like the sun.",
      grammarPoint: "Definite Article"
    },
    {
      id: 34,
      grammarId: 18,
      type: "fill-blank",
      question: "I saw _____ bird in the garden.",
      options: ["a", "an", "the", "no article"],
      correctAnswer: 0,
      explanation: "Use 'a' before consonant sounds for first mention.",
      grammarPoint: "Indefinite Articles"
    },
    {
      id: 35,
      grammarId: 19,
      type: "fill-blank",
      question: "She is _____ excellent teacher.",
      options: ["a", "an", "the", "no article"],
      correctAnswer: 1,
      explanation: "Use 'an' before vowel sounds.",
      grammarPoint: "Indefinite Articles"
    },
    {
      id: 36,
      grammarId: 20,
      type: "fill-blank",
      question: "I like _____ music.",
      options: ["a", "an", "the", "no article"],
      correctAnswer: 3,
      explanation: "No article with uncountable nouns in general sense.",
      grammarPoint: "Zero Article"
    }
  ],

  // Prepositions exercises
  prepositions: [
    {
      id: 37,
      grammarId: 21,
      type: "fill-blank",
      question: "I'll see you _____ 5 PM.",
      options: ["at", "on", "in", "by"],
      correctAnswer: 0,
      explanation: "Use 'at' for precise time.",
      grammarPoint: "Time Prepositions"
    },
    {
      id: 38,
      grammarId: 21,
      type: "fill-blank",
      question: "She was born _____ 1990.",
      options: ["at", "on", "in", "by"],
      correctAnswer: 2,
      explanation: "Use 'in' for years and longer periods.",
      grammarPoint: "Time Prepositions"
    },
    {
      id: 39,
      grammarId: 21,
      type: "fill-blank",
      question: "We met _____ Monday.",
      options: ["at", "on", "in", "by"],
      correctAnswer: 1,
      explanation: "Use 'on' for days and dates.",
      grammarPoint: "Time Prepositions"
    },
    {
      id: 40,
      grammarId: 22,
      type: "fill-blank",
      question: "She is _____ school.",
      options: ["at", "on", "in", "to"],
      correctAnswer: 0,
      explanation: "Use 'at' for institutions and specific locations.",
      grammarPoint: "Place Prepositions"
    },
    {
      id: 41,
      grammarId: 22,
      type: "fill-blank",
      question: "He lives _____ London.",
      options: ["at", "on", "in", "to"],
      correctAnswer: 2,
      explanation: "Use 'in' for cities and countries.",
      grammarPoint: "Place Prepositions"
    }
  ]
};

// Get all exercises
function getAllExercises() {
  let all = [];
  Object.keys(grammarPracticeData).forEach(key => {
    if (Array.isArray(grammarPracticeData[key])) {
      all = all.concat(grammarPracticeData[key]);
    }
  });
  return all;
}

// Get exercises by grammar point
function getExercisesByGrammar(grammarId) {
  let filtered = [];
  Object.keys(grammarPracticeData).forEach(key => {
    if (Array.isArray(grammarPracticeData[key])) {
      const exercises = grammarPracticeData[key].filter(ex => ex.grammarId === grammarId);
      filtered = filtered.concat(exercises);
    }
  });
  return filtered;
}

// Get exercises by type
function getExercisesByType(type) {
  let filtered = [];
  Object.keys(grammarPracticeData).forEach(key => {
    if (Array.isArray(grammarPracticeData[key])) {
      const exercises = grammarPracticeData[key].filter(ex => ex.type === type);
      filtered = filtered.concat(exercises);
    }
  });
  return filtered;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { grammarPracticeData, getAllExercises, getExercisesByGrammar, getExercisesByType };
}
