import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const hash = ()=>{
    window.scrollTo(0,0)
  }
  
  return (
    <nav className="sticky top-0 z-50 bg-[#020617]  border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="quizflow/" onClick={()=>hash()} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#22c55e] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold">Q</span>
            </div>
            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              QuizFlow
            </span>
          </Link>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              <Link 
              onClick={()=>{hash()}}
                to="quizflow/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-[#22c55e]' : 'text-gray-300 hover:text-white'}`}
              >
                Home
              </Link>
              <Link 
              onClick={()=>{hash()}}
                to="quizflow/quizzes" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/quizzes' ? 'text-[#22c55e]' : 'text-gray-300 hover:text-white'}`}
              >
                Explore Quizzes
              </Link>
            </div>
          </div>
          
          <Link 
          onClick={()=>{hash()}}
            to="quizflow/quizzes" 
           
            className="md:hidden bg-[#22c55e]/10 text-[#22c55e] px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#22c55e] hover:text-white transition-all"
          >
            Quizzes
          </Link>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
