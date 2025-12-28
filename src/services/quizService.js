import { QUIZ_PROFILES } from '../constants';

const BASE_URL = "https://quizapi.io/api/v1/questions";

// The API Key is obtained from the environment variable as per requirements
const API_KEY = import.meta.env.VITE_QUIZ_API_KEY;

export const quizService = {
  /**
   * Returns a list of available quiz shells (metadata only).
   * Questions are fetched when a specific quiz is started.
   */
  getQuizzes: async () => {
    return QUIZ_PROFILES.map(profile => ({
      id: profile.id,
      title: profile.title,
      description: profile.description,
      category: profile.category,
      image: `https://picsum.photos/seed/${profile.id}/400/250`,
      createdAt: new Date().toISOString(),
      questions: [] // Questions are populated on-demand in getQuizById
    }));
  },

  /**
   * Fetches full quiz data including 20 questions from QuizAPI.io.
   */
  getQuizById: async (id) => {
    const profile = QUIZ_PROFILES.find(p => p.id === id);
    if (!profile) return null;

    try {
      const url = `${BASE_URL}?apiKey=${API_KEY}&tags=${profile.tag}&limit=20`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();

      const questions = data.map(item => {
        // 1. Extract non-null options from the answers object
        const optionEntries = Object.entries(item.answers)
          .filter(([_, value]) => value !== null);
        const options = optionEntries.map(([_, value]) => value);

        // 2. Identify the correct answer
        const correctKeyEntry = Object.entries(item.correct_answers)
          .find(([_, isCorrect]) => isCorrect === "true" || isCorrect === true);

        const correctKey = correctKeyEntry ? correctKeyEntry[0] : null;
        const answerKey = correctKey ? correctKey.replace('_correct', '') : null;
        const correctAnswer = answerKey ? item.answers[answerKey] : options[0];

        return {
          id: item.id.toString(),
          question: item.question,
          options,
          correctAnswer: correctAnswer || options[0]
        };
      });

      return {
        id: profile.id,
        title: profile.title,
        description: profile.description,
        category: profile.category,
        image: `https://picsum.photos/seed/${profile.id}/400/250`,
        createdAt: new Date().toISOString(),
        questions
      };
    } catch (error) {
      console.error("Failed to fetch from QuizAPI:", error);
      return null;
    }
  },

  /**
   * Saves a result to local storage for persistent analytics.
   */
  submitResult: async (result) => {
    const newResult = {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    const existingResults = JSON.parse(localStorage.getItem("quiz_results") || "[]");
    existingResults.push(newResult);
    localStorage.setItem("quiz_results", JSON.stringify(existingResults));

    return new Promise(resolve => setTimeout(() => resolve(newResult), 600));
  },
};
