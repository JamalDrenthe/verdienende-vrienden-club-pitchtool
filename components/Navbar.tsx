import React, { useState } from 'react';
import { Home, Share2, FileText, Play, TrendingUp, UserPlus, Menu, X, Globe, Moon, Sun, Shield, Volume2, VolumeX } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';
import { sfx } from '../lib/soundFx';

const EuroIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 10h12M4 14h9M6 6a8 8 0 1 1 0 12" />
  </svg>
);

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  proMode: boolean;
  toggleProMode: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  proMode, 
  toggleProMode, 
  isDarkMode, 
  toggleTheme,
  language,
  toggleLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const t = translations[language].nav;

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sfx.setEnabled(next);
    if (next) sfx.click();
  };

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'pitch', label: t.pitch, icon: Play },
    { id: 'basis', label: t.basis, icon: EuroIcon },
    { id: 'bonus', label: t.bonus, icon: TrendingUp },
    { id: 'passief', label: t.passief, icon: FileText },
    { id: 'join', label: t.join, icon: UserPlus },
    ...(proMode ? [
      { id: 'ecosystem', label: t.ecosystem, icon: Share2 },
    ] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#000000]/95 backdrop-blur-xl border-b border-slate-200 dark:border-[#1a1a1a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand / Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group select-none" onClick={() => onNavigate('home')}>
            <img
              src="/vvc-logo.svg"
              alt="VVC Logo"
              className="w-9 h-9 rounded-full shadow-[0_0_16px_rgba(230,0,126,0.5)] group-hover:scale-105 transition-transform shrink-0"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id as PageView)}
                    className={`relative px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-slate-100 dark:bg-[#141414] text-[#e6007e] dark:text-white shadow-sm border border-slate-200/80 dark:border-[#e6007e]/60 shadow-[0_0_20px_rgba(230,0,126,0.25)]'
                        : 'text-slate-600 dark:text-[#a1a1aa] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#121212]'
                    }`}
                  >
                    <item.icon className={`h-4 w-4 ${isActive ? 'text-[#e6007e]' : 'text-slate-400 dark:text-[#a1a1aa]'}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={handleToggleSound}
              title={soundEnabled ? 'Geluidseffecten dempen' : 'Geluidseffecten inschakelen'}
              aria-label={soundEnabled ? 'Geluidseffecten dempen' : 'Geluidseffecten inschakelen'}
              className="p-2.5 rounded-xl text-slate-500 dark:text-[#888888] hover:text-[#e6007e] dark:hover:text-[#e6007e] hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-[#222222]"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-[#e6007e]" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button 
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Lichte modus inschakelen' : 'Donkere modus inschakelen'}
              className="p-2.5 rounded-xl text-slate-500 dark:text-[#888888] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-[#222222]"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 dark:text-[#888888] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-[#222222]"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>
            <button 
              onClick={toggleProMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                proMode 
                  ? 'bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                  : 'bg-slate-100 dark:bg-[#0d0d0d] text-slate-500 dark:text-[#888888] border-slate-200 dark:border-[#1f1f1f] hover:border-slate-300 dark:hover:border-[#333333]'
              }`}
            >
              <Shield className="h-3 w-3" />
              {proMode ? t.proOn : t.proOff}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-[#888888] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#111111] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#000000]/95 backdrop-blur-xl border-t border-slate-200 dark:border-[#1a1a1a]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as PageView);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                  currentPage === item.id
                    ? 'bg-[#e6007e]/10 text-[#e6007e]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#111111]'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-[#1f1f1f] mt-4 flex justify-between items-center px-3">
               <a href="https://verdienendevrienden.club" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 bg-[#e6007e] hover:bg-[#c00069] text-white text-sm font-bold rounded-full transition-all duration-300 shadow-md shadow-[#e6007e]/25">{t.settings}</a>
               <div className="flex gap-2">
                 <button onClick={handleToggleSound} aria-label={soundEnabled ? 'Geluid dempen' : 'Geluid inschakelen'} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                    {soundEnabled ? <Volume2 className="h-4 w-4 text-[#e6007e]" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
                 </button>
                 <button onClick={toggleTheme} aria-label={isDarkMode ? 'Lichte modus' : 'Donkere modus'} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                    {isDarkMode ? <Sun className="h-4 w-4 text-slate-400" /> : <Moon className="h-4 w-4 text-slate-500" />}
                 </button>
                 <button onClick={toggleLanguage} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center w-10 h-10 font-bold text-xs uppercase">
                    {language}
                 </button>
                 <button 
                  onClick={toggleProMode}
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${proMode ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500' : 'text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600'}`}>
                   {proMode ? t.proOn : t.proOff}
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};