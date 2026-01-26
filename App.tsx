import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Ecosystem } from './pages/Ecosystem';
import { OtherEngines } from './pages/OtherEngines';
import { Pitch } from './pages/Pitch';
import { About } from './pages/About';
import { ProDetail } from './pages/ProDetail';
import { PageView, Language } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [proMode, setProMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>('nl');

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
        return <Ecosystem proMode={proMode} onNavigate={setCurrentPage} />;
      case 'other':
        return <OtherEngines />;
      case 'pitch':
        return <Pitch />;
      case 'about':
        return <About />;
      case 'pro': // If pro mode is manually clicked via Nav in desktop
         return <ProDetail />;
      default:
        return <Home onNavigate={setCurrentPage} language={language} />;
    }
  };

  return (
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
      <main className="animate-fadeIn">
        {renderPage()}
      </main>
      
      {/* Global Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
    </div>
  );
}