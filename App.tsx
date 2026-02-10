import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { VVCChatbot } from './components/VVCChatbot';
import { Home } from './pages/Home';
import { Ecosystem } from './pages/Ecosystem';
import { Pitch } from './pages/Pitch';
import { Basis } from './pages/Basis';
import { Bonus } from './pages/Bonus';
import { Passief } from './pages/Passief';
import { Join } from './pages/Join';
import { ProDetail } from './pages/ProDetail';
import { PageView, Language } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [proMode, setProMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>('nl');
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Initial load overlay
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 600);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Initialize theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleProMode = () => setProMode(!proMode);
  const toggleLanguage = () => setLanguage(prev => prev === 'nl' ? 'en' : 'nl');

  const renderPage = () => {
    if (proMode && currentPage === 'pro') {
      return <ProDetail />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} language={language} />;
      case 'ecosystem':
        if (!proMode) return <Home onNavigate={setCurrentPage} language={language} />;
        return <Ecosystem proMode={proMode} onNavigate={setCurrentPage} />;
      case 'pitch':
        return <Pitch onNavigate={setCurrentPage} language={language} />;
      case 'basis':
        return <Basis onNavigate={setCurrentPage} language={language} />;
      case 'bonus':
        return <Bonus onNavigate={setCurrentPage} language={language} />;
      case 'passief':
        if (!proMode) return <Home onNavigate={setCurrentPage} language={language} />;
        return <Passief onNavigate={setCurrentPage} proMode={proMode} language={language} />;
      case 'join':
        return <Join language={language} />;
      case 'pro':
         return <ProDetail />;
      default:
        return <Home onNavigate={setCurrentPage} language={language} />;
    }
  };

  return (
    <>
      {/* Load Overlay */}
      {loading && (
        <div className={`load-overlay ${fadeOut ? 'fade-out' : ''}`}>
          {/* Animated grid background */}
          <div className="load-grid" />

          {/* Radial glow */}
          <div className="load-glow" />

          {/* Expanding rings */}
          <div className="load-ring" />
          <div className="load-ring load-ring-2" />
          <div className="load-ring load-ring-3" />

          {/* Floating particles */}
          <div className="load-dot load-dot-1" />
          <div className="load-dot load-dot-2" />
          <div className="load-dot load-dot-3" />
          <div className="load-dot load-dot-4" />
          <div className="load-dot load-dot-5" />
          <div className="load-dot load-dot-6" />

          {/* Logo */}
          <svg viewBox="0 0 260 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo h-14 w-auto">
            <text x="0" y="82" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontStyle="italic" fontSize="95" fill="white" letterSpacing="-4">VVC</text>
            <circle cx="225" cy="75" r="10" fill="#E91E8C"/>
          </svg>

          {/* Tagline */}
          <p className="load-tagline text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-3">Executie is de sleutel</p>

          {/* Progress bar */}
          <div className="bar"><div className="bar-fill" /></div>
        </div>
      )}

      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-200 font-sans selection:bg-cyan-500/30 transition-colors duration-300">
        <Navbar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          proMode={proMode}
          toggleProMode={toggleProMode}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <main key={currentPage} className="page-transition">
          {renderPage()}
        </main>
        
        {/* Global Background Grid Effect */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] bg-grid-pattern" />
      </div>

      {/* Global Chat Overlay */}
      {chatOpen && <VVCChatbot onClose={() => setChatOpen(false)} />}

      {/* Global Chat Button */}
      <button
        aria-label="Chat"
        onClick={() => setChatOpen(!chatOpen)}
        className={`fixed bottom-6 right-6 p-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50 ${
          chatOpen
            ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-slate-500/20'
            : 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50'
        }`}
      >
        {chatOpen ? <span className="block w-6 h-6 text-center font-bold leading-6">&times;</span> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
}