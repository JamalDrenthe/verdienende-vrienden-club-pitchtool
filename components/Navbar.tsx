import React, { useState } from 'react';
import { Home, Share2, Layers, FileText, Info, Menu, X, Globe, Moon, Sun, Shield } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';

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
  const t = translations[language].nav;

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'ecosystem', label: t.ecosystem, icon: Share2 },
    { id: 'other', label: t.other, icon: Layers },
    { id: 'pitch', label: t.pitch, icon: FileText },
    { id: 'about', label: t.about, icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand / Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="px-4 py-1.5 bg-slate-100 dark:bg-[#162032] rounded-md border border-slate-200 dark:border-white/5 shadow-inner">
               <span className="text-[10px] md:text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
                 {language === 'nl' ? 'Verdienende Vrienden Club' : 'Earning Friends Club'}
               </span>
            </div>
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-slate-100 dark:bg-[#1E293B] text-cyan-600 dark:text-cyan-400 shadow-sm border border-slate-200 dark:border-white/5'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`h-4 w-4 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/5"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/5"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>
            <button 
              onClick={toggleProMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                proMode 
                  ? 'bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                  : 'bg-slate-100 dark:bg-[#162032] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'
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
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-slate-200 dark:border-slate-700">
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
                    ? 'bg-cyan-50 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4 flex justify-between items-center px-3">
               <span className="text-slate-500 dark:text-slate-400 text-sm">{t.settings}</span>
               <div className="flex gap-2">
                 <button onClick={toggleTheme} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
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