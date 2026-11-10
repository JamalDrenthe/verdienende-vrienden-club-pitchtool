import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { FunnelProgress, FUNNEL_STEPS } from './components/FunnelProgress';
import { VVCChatbot } from './components/VVCChatbot';
import { Home } from './pages/Home';
import { Ecosystem } from './pages/Ecosystem';
import { Pitch } from './pages/Pitch';
import { Basis } from './pages/Basis';
import { Bonus } from './pages/Bonus';
import { Passief } from './pages/Passief';
import { Join } from './pages/Join';
import { ProDetail } from './pages/ProDetail';
import { PageView, Language, CalculatorState } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [proMode, setProMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>('nl');
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Cumulative Calculator State across all slides - starts at 0
  const [calcState, setCalcState] = useState<CalculatorState>({
    hours: 0,
    placements: 0,
    referrals: 0,
    refValue: 25,
  });

  const setHours = useCallback((hours: number) => {
    setCalcState((prev) => ({ ...prev, hours }));
  }, []);

  const setPlacements = useCallback((placements: number) => {
    setCalcState((prev) => ({ ...prev, placements }));
  }, []);

  const setReferrals = useCallback((referrals: number) => {
    setCalcState((prev) => ({ ...prev, referrals }));
  }, []);

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

  // Global Keyboard Navigation for the Pitch Funnel (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if typing in form inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      const currentIndex = FUNNEL_STEPS.findIndex((s) => s.id === currentPage);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight' && currentIndex < FUNNEL_STEPS.length - 1) {
        e.preventDefault();
        setCurrentPage(FUNNEL_STEPS[currentIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        setCurrentPage(FUNNEL_STEPS[currentIndex - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleProMode = () => setProMode(!proMode);
  const toggleLanguage = () => setLanguage((prev) => (prev === 'nl' ? 'en' : 'nl'));

  const isFunnelPage = FUNNEL_STEPS.some((s) => s.id === currentPage);

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
        return (
          <Basis
            onNavigate={setCurrentPage}
            language={language}
            calcState={calcState}
            setHours={setHours}
          />
        );
      case 'bonus':
        return (
          <Bonus
            onNavigate={setCurrentPage}
            language={language}
            calcState={calcState}
            setPlacements={setPlacements}
          />
        );
      case 'passief':
        return (
          <Passief
            onNavigate={setCurrentPage}
            proMode={proMode}
            language={language}
            calcState={calcState}
            setReferrals={setReferrals}
          />
        );
      case 'join':
        return (
          <Join
            language={language}
            onNavigate={setCurrentPage}
            calcState={calcState}
          />
        );
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
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src="/vvc-logo.svg"
              alt="VVC Logo"
              className="logo w-16 h-16 rounded-full shadow-[0_0_25px_rgba(230,0,126,0.45)] shrink-0"
            />
          </div>

          {/* Tagline */}
          <p className="load-tagline text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-3">
            Executie is de sleutel
          </p>

          {/* Progress bar */}
          <div className="bar">
            <div className="bar-fill" />
          </div>
        </div>
      )}

      <div className="min-h-screen bg-slate-50 dark:bg-[#000000] text-slate-900 dark:text-[#f3f4f6] font-sans selection:bg-[#e6007e]/40 transition-colors duration-300">
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

        {/* Funnel Progress bar shown when in pitch flow */}
        {isFunnelPage && (
          <FunnelProgress
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            calcState={calcState}
            language={language}
          />
        )}

        <main key={currentPage} className="page-transition page-3d-enter">
          {renderPage()}
        </main>

        {/* Global Background Grid Effect */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] bg-grid-pattern" />
      </div>

      {/* Global Chat Overlay */}
      {chatOpen && <VVCChatbot onClose={() => setChatOpen(false)} />}

      {/* Global Chat Button (VVC Magenta OLED Styling) */}
      <button
        aria-label="VVC AI Chat"
        onClick={() => {
          sfx.click();
          setChatOpen(!chatOpen);
        }}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 z-50 flex items-center justify-center group ${
          chatOpen
            ? 'bg-[#141414] border border-[#2a2a2a] text-white shadow-black/80'
            : 'bg-[#e6007e] hover:bg-[#c00069] text-white shadow-[0_0_30px_rgba(230,0,126,0.55)] border border-[#ff47ab]/30'
        }`}
      >
        {chatOpen ? (
          <span className="block w-6 h-6 text-center font-bold text-xl leading-6">&times;</span>
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:scale-105 transition-transform" />
        )}
      </button>
    </>
  );
}
