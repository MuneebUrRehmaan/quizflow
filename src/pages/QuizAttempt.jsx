import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { quizService } from '../services/quizService';

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (id) {
        try {
          const data = await quizService.getQuizById(id);
          if (data) {
            setQuiz(data);
          } else {
            setError("Unable to load quiz. Please check your Internet connection.");
          }
        } catch (e) {
          setError("A technical error occurred while fetching the quiz.");
        }
      }
      setLoading(false);
    };
    fetchQuiz();
  }, [id, navigate]);

  const handleSelectOption = (option) => {
    if (!quiz) return;
    const questionId = quiz.questions[currentIdx].id;
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleNext = () => {
    if (!quiz) return;
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    setSubmitting(true);
    
    let score = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const total = quiz.questions.length;
    const percentage = Math.round((score / total) * 100);

    const result = await quizService.submitResult({
      quizId: quiz.id,
      quizTitle: quiz.title,
      score,
      total,
      percentage
    });

     setTimeout(() => {
      navigate('result', { state: { result, quiz } });
    }, 800);

    
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="w-16 h-16 border-4 border-[#22c55e]/20 border-t-[#22c55e] rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Fetching Questions...</h2>
        <p className="text-gray-400">Pulling live data from QuizAPI.io</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-4">{error || "Quiz not found"}</h2>
        <button 
          onClick={() => navigate('quizflow/quizzes')}
          className="px-8 py-3 bg-[#22c55e] text-[#020617] font-bold rounded-2xl cursor-pointer "
        >
          Return to Library
        </button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIdx];
  const progress = ((currentIdx + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentIdx === quiz.questions.length - 1;
  const hasAnsweredCurrent = !!answers[currentQuestion.id];

  return (
    <div className="max-w-4xl mx-auto px-3 py-6">
      {/* Header with Progress */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#22c55e]/20">
                Question {currentIdx + 1} / {quiz.questions.length}
              </span>
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                {quiz.category}
              </span>
            </div>
            <h2 className="text-3xl font-black text-white">{quiz.title}</h2>
          </div>
          <div className="text-right">
             <span className="block text-2xl font-black text-white">{Math.round(progress)}%</span>
             <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Progress</span>
          </div>
        </div>
        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
          <div 
            className="h-full bg-linear-to-r from-[#22c55e] to-[#38bdf8] rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Interaction Area */}
      <div className="bg-[#0f172a] rounded-2xl border border-white/5 p-4 md:p-6 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-125 flex flex-col">
        {/* Visual accents */}
        <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-[#22c55e] to-[#38bdf8]"></div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug relative z-10">
          {currentQuestion.question}
        </h3>

        <div className="grid grid-cols-1 gap-4 grow relative z-10">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === option;
            const label = String.fromCharCode(65 + idx); // A, B, C, D...
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-2 rounded-2xl border transition-all flex items-center gap-5 group ${
                  isSelected 
                    ? 'border-[#22c55e] bg-[#22c55e]/10 text-white shadow-lg shadow-green-500/10' 
                    : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/8'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center shrink-0 font-bold text-sm transition-all ${
                  isSelected ? 'border-[#22c55e] bg-[#22c55e] text-[#020617]' : 'border-white/10 text-gray-500 group-hover:border-[#22c55e]/50'
                }`}>
                  {label}
                </div>
                <span className="font-semibold text-lg">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-between relative z-10">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`px-6 py-3 rounded-2xl font-bold text-md uppercase tracking-widest transition-all ${
              currentIdx === 0 
                ? 'text-gray-700 cursor-not-allowed opacity-30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            ← Previous
          </button>
          
          {isLastQuestion ? (
            <Link to={'result'}>
            <button
              onClick={handleSubmit}
              disabled={!hasAnsweredCurrent || submitting}
              className={`px-6 py-3 bg-[#22c55e] text-[#020617] rounded-2xl font-bold text-lg uppercase tracking-widest transition-all shadow-2xl shadow-green-500/20 ${
                !hasAnsweredCurrent || submitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              }`}
            >
              {submitting ? 'Calculating...' : 'Finish Quiz'}
            </button>
            </Link>
          ) : (
            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className={`px-6 py-3 bg-white text-[#020617] rounded-2xl font-bold text-lg uppercase tracking-widest transition-all ${
                !hasAnsweredCurrent ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#22c55e] hover:text-white hover:scale-105 active:scale-95'
              }`}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
