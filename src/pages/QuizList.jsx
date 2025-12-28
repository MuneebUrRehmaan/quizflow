import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { quizService } from '../services/quizService';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await quizService.getQuizzes();
      setQuizzes(data);
      setLoading(false);
    };
    fetchQuizzes();
  }, []);

  const hash = ()=>{
    window.scrollTo(0 , 0)
  }

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesCategory = activeCategory === 'All' || quiz.category === activeCategory;
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [quizzes, activeCategory, searchQuery]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-[#22c55e]/10 border-t-[#22c55e] rounded-full animate-spin"></div>
        <p className="mt-6 text-gray-400 font-bold text-lg">Curating your knowledge base...</p>
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header & Controls */}
      <div className="flex flex-col gap-8 mb-16">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-black text-white mb-3">Quiz Library</h2>
          <p className="text-gray-400 text-lg">Choose from 20 high-quality quizzes curated for experts.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex bg-[#0f172a] p-1 gap-1 rounded-2xl border border-white/10 w-full md:w-auto">
            {['All', 'Frontend', 'Programming'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#22c55e] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by topic or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group bg-[#0f172a] rounded-2xl border border-white/5 overflow-hidden hover:border-[#22c55e]/40  duration-300 flex flex-col shadow-2xl"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={quiz.image}
                  alt={quiz.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#38bdf8] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-white/10">
                  {quiz.category}
                </div>
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#22c55e] transition-colors leading-tight">
                  {quiz.title}
                </h3>
                <p className="text-gray-500 text-xs mb-6 grow line-clamp-2 leading-relaxed font-medium">
                  {quiz.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Length</span>
                    <span className="text-sm text-gray-300 font-bold">20 Qs</span>
                  </div>
                  <Link
                    to={`quizflow/quiz/${quiz.id}`}
                     onClick={()=>{hash()}}
                    className="bg-[#22c55e] text-gray-100 px-5 py-2.5 rounded-xl text-xs font-black uppercase hover:bg-[#16a34a] hover:scale-105 active:scale-95 transition-all shadow-lg"
                  >
                    Start
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-6xl mb-6">🔎</div>
          <h3 className="text-2xl font-bold text-white mb-2">No quizzes found</h3>
          <p className="text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default QuizList;
