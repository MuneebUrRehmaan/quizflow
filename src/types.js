// Question structure
export const Question = {
  id: '',
  question: '',
  options: [],
  correctAnswer: ''
};

// Quiz structure
export const Quiz = {
  id: '',
  title: '',
  description: '',
  category: '',
  image: '',
  questions: [],
  createdAt: ''
};

// Result structure
export const Result = {
  id: '',
  quizId: '',
  quizTitle: '',
  score: 0,
  total: 0,
  percentage: 0,
  createdAt: ''
};
