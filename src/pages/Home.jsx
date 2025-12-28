import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="bg-[#0f172a] p-6 rounded-2xl border border-white/5 hover:border-[#38bdf8]/30 transition-all hover:-translate-y-2 shadow-2xl relative group overflow-hidden">
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-[#38bdf8]/10 transition-colors"></div>
    <div className={`text-4xl mb-6 ${color}`}>{icon}</div>
    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

const Home = () => {

  const hash = ()=>{
    window.scrollTo(0,0)
  }
  return (
    <div className="relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#22c55e]/6 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-[#38bdf8]/6 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-16 sm:px-6 lg:px-8 text-center relative ">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 mb-4 text-xs font-bold text-[#22c55e] bg-[#22c55e]/10 rounded-full border border-[#22c55e]/20 tracking-[0.2em] uppercase shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Quiz Engine v2.0
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8  text-white leading-[0.9]">
          Knowledge <br className="hidden md:block" /> Reimagined.
        </h1>
        
        <p className="max-w-3xl mx-auto text-lg text-gray-400 mb-8 leading-relaxed font-medium">
          The ultimate playground for developers. 20 high-octane quizzes across Frontend and Programming. 400+ questions powered by <span className="text-[#38bdf8] font-bold">QuizAPI.io</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            to="/quizflow/quizzes" 
            className="w-full sm:w-auto px-8 py-4 bg-[#22c55e] text-slate-950 rounded-2xl font-semibold text-xl hover:bg-[#16a34a]  active:scale-95 transition-all shadow-[0_20px_50px_rgba(34,197,94,0.3)]"
          >
            Launch Quiz Library
          </Link>
          <a 
            href="#why" 
            className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-semibold text-xl hover:bg-white/10 transition-all backdrop-blur-xl"
          >
            Why QuizFlow?
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-white/2 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Modules', val: '20' },
            { label: 'Question Bank', val: '400+' },
            { label: 'API Latency', val: '120ms' },
            { label: 'Daily', val: 'Unlimited' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl font-semibold text-white mb-1 group-hover:text-[#22c55e] transition-colors">{stat.val}</div>
              <div className="text-sm font-extrabold text-gray-500 uppercase ">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* "Why" Section */}
      <section id="why" className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Built for the <br /> Speed of Code.</h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed font-medium">
              We removed everything that slows you down. No email verification. No profiles. Just raw technical challenges designed to push your limits.
            </p>
            <div className="space-y-6">
              {[
                { t: 'API Integration', d: 'Real-time data from professional tech question banks.' },
                { t: 'Instant Feedback', d: 'Get your scores and breakdown as soon as you finish.' },
                { t: 'Zero Privacy Risk', d: 'Results are stored in your local session, not our servers.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-xl flex items-center justify-center text-[#22c55e]">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.t}</h4>
                    <p className="text-gray-500 text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FeatureCard 
              icon="⚡" 
              title="Fast Load" 
              desc="Optimized fetching logic ensures quizzes load in under 200ms anywhere."
              color="text-yellow-400"
            />
            <FeatureCard 
              icon="🎯" 
              title="Precision" 
              desc="Targeted tags like Docker, SQL, and React for specific skill testing."
              color="text-red-400"
            />
            <FeatureCard 
              icon="🧠" 
              title="Logic" 
              desc="Handled with complex state management to ensure a smooth flow."
              color="text-[#38bdf8]"
            />
            <FeatureCard 
              icon="📱" 
              title="Fluid UI" 
              desc="Fully responsive design that feels native on any device or screen."
              color="text-purple-400"
            />
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="max-w-7xl mx-auto px-4 py-32 border-t border-white/5 bg-linear-to-b from-transparent to-white/1">
      
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-white mb-6 tracking-tight">Two Paths. Infinite Mastery.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Our library is split into two specialized tracks, each containing 10 deep-dive modules.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Frontend Track */}
          <div className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 relative group">
            <div className="absolute inset-0 bg-linear-to-br from-[#22c55e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#22c55e]/20 rounded-2xl flex items-center justify-center text-4xl mb-8">⚛️</div>
              <h3 className="text-3xl font-black text-white mb-6">Frontend Engineering</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">Master the visual layer. From basic HTML5 semantics to advanced Next.js server components and Web Performance optimization.</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['React', 'TypeScript', 'Tailwind', 'Next.js', 'A11y'].map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-xs font-bold text-gray-400 border border-white/10 uppercase tracking-widest">{tag}</span>
                ))}
              </div>
              <Link to="/quizflow/quizzes" onClick={()=>{hash()}} className=" flex items-center  gap-2">
                <button className='cursor-pointer hover:underline text-[#22c55e] font-black uppercase tracking-widest'>Explore Track</button> <span className="text-xl text-[#22c55e] mb-1.25">→</span>
              </Link>
            </div>
          </div>

          {/* Programming Track */}
          <div className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 relative group">
            <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#38bdf8]/20 rounded-2xl flex items-center justify-center text-4xl mb-8">🛠️</div>
              <h3 className="text-3xl font-black text-white mb-6">System Architecture</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">Deep dive into the engine. Explore Node.js internals, Linux systems, Docker orchestration, and high-scale DevOps pipelines.</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Node.js', 'Docker', 'K8s', 'Linux', 'SQL'].map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-xs font-bold text-gray-400 border border-white/10 uppercase tracking-widest">{tag}</span>
                ))}
              </div>
              <Link to="/quizflow/quizzes" onClick={()=>{hash()}} className=" flex items-center gap-2">
                <button className='text-[#38bdf8] font-black uppercase tracking-widest hover:underline cursor-pointer'>Explore Track</button> <span className="text-lg mb-1.25 text-[#38bdf8] ">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-linear-to-r from-[#22c55e] to-[#16b550] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-[0_50px_100px_rgba(34,197,84,0.09)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/14 blur-[100px] rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/23 blur-[80px] rounded-full -ml-10 -mb-10"></div>
          
          <h2 className="text-4xl md:text-6xl font-black text-[#020617] mb-8 leading-[1.1]">The knowledge is yours. <br /> Take it.</h2>
          <p className="text-[#020617]/70 text-xl font-bold mb-6 max-w-2xl mx-auto">No friction. No logins. No excuses. Start your first 20-question challenge today.</p>
          
          <Link 
            to="/quizflow/quizzes" 
            onClick={()=>{hash()}}
            className="inline-block px-6 py-3 bg-[#020617] text-white rounded-4xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            Go to Quizzes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
