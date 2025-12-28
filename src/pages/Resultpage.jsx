import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Resultpage = () => {
  const location = useLocation();
  const state = location.state || null;

  if (!state) {
    return <h3 className='text-center mt-40 w-screen '>loading....</h3>;
  }

  const { result, quiz } = state;
  const isPass = result.percentage >= 60;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-center">
      <div className="relative inline-block mb-10">
        <div className={`w-30 h-30 rounded-full flex items-center justify-center mx-auto border-4 ${isPass ? 'border-[#22c55e] text-[#22c55e]' : 'border-red-500 text-red-500'} bg-[#0f172a] shadow-2xl mb-8`}>
           <span className="text-4xl font-bold">{result.percentage}%</span>
        </div>
        <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-xl text-xs font-bold whitespace-nowrap tracking-wider uppercase shadow-lg ${isPass ? 'bg-[#22c55e] text-[#020617]' : 'bg-red-500 text-white'}`}>
          {isPass ? 'Mastery Achieved' : 'Keep Practicing'}
        </div>
      </div>

      <h1 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
      <p className="text-gray-400 mb-10">Challenge: <span className="text-white font-semibold">{quiz.title}</span></p>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-[#0f172a] p-6 rounded-2xl border border-white/5">
          <p className="text-sm text-gray-500 font-bold uppercase mb-1">Final Score</p>
          <p className="text-3xl font-bold text-white">{result.score} / {result.total}</p>
        </div>
        <div className="bg-[#0f172a] p-6 rounded-2xl border border-white/5">
          <p className="text-sm text-gray-500 font-bold uppercase mb-1">Verdict</p>
          <p className={`text-3xl font-bold ${isPass ? 'text-[#22c55e]' : 'text-red-500'}`}>
            {isPass ? 'PASSED' : 'FAILED'}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to={`/quizflow/quizzes/${quiz.id}`}
          className="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
        >
          🔄 Retry Quiz
        </Link>
        <Link 
          to="/quizflow/quizzes"
          className="px-8 py-4 bg-[#22c55e] text-white rounded-xl font-bold hover:bg-[#16a34a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
        >
          Explore More Quizzes
        </Link>
      </div>

      <div className="mt-16 p-6 bg-white/5 rounded-2xl border border-dashed border-white/10">
        <h3 className="text-white font-bold mb-4">Quick Breakdown</h3>
        <div className="space-y-3 text-left">
          {quiz.questions.map((q, idx) => (
             <div key={q.id} className="flex items-start gap-3 text-sm">
                <span className="text-gray-500 mt-0.5">{idx + 1}.</span>
                <div>
                  <p className="text-gray-300 mb-1">{q.question}</p>
                  <p className="text-[#22c55e] font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Correct Answer: {q.correctAnswer}
                  </p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resultpage;
