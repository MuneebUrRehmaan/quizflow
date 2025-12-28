import React from 'react'


const Footer = () => {
  return (
    
      <footer className="py-12 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} QuizFlow. All rights reserved.</p>
          <p className="mt-2">Built for speed, knowledge, and fun.</p>
        </div>
      </footer>

  );
};
export default Footer