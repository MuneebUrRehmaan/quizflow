import React from 'react';
import {  Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
import Home from './pages/Home';
import QuizList from './pages/QuizList';
import QuizAttempt from './pages/QuizAttempt';
import Resultpage from './pages/Resultpage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
    <Navbar />
    <main className="">
    
        <Routes>
          <Route path="quizflow/" element={<Home />} />
          <Route path="quizflow/quizzes" element={<QuizList />} />
          <Route path="quizflow/quizzes/:id" element={<QuizAttempt />} />
          <Route path="quizflow/quizzes/:id/result" element={<Resultpage />} />
        </Routes>
        

        </main>

        <Footer />

        </div>
      
  );
};

export default App;
