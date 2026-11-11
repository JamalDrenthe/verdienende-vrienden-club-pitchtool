import React, { useState, useEffect, useRef } from 'react';
import { Home, Share2, FileText, Play, TrendingUp, UserPlus, Menu, X, Globe, Moon, Sun, Shield, Volume2, VolumeX, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';
import { sfx } from '../lib/soundFx';
import { type VvcUser } from '../lib/firebase';
import { User, LogIn, LogOut, ExternalLink } from 'lucide-react';

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
  currentUser?: VvcUser | null;
  onOpenLogin?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  proMode, 
  toggleProMode, 
  isDarkMode, 
  toggleTheme,
  language,
  toggleLanguage,
  currentUser,
  onOpenLogin,
  onLogout
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = translations[language].nav;

  // Sync sound initial state
  useEffect(() => {
    setSoundEnabled(sfx.isEnabled());
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleToggleSound = () => {
    const next = sfx.toggle();
    setSoundEnabled(next);
  };

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'pitch', label: t.pitch, icon: Play },
    { id: 'basis', label: t.basis, icon: EuroIcon },
    { id: 'bonus', label: t.bonus, icon: TrendingUp },
    { id: 'passief', label: t.passief, icon: FileText },
    { id: 'join', label: t.join, icon: UserPlus },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#000000]/95 backdrop-blur-xl border-b border-slate-200 dark:border-[#1a1a1a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand / Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group select-none" onClick={() => onNavigate('home')}>
            <img
              src="/vvc-logo.svg"
              alt="VVC Logo"
              className="w-9 h-9 rounded-full shadow-[0_0_16px_rgba(230,0,126,0.5)] group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex items-center">
              <span className="font-black italic text-2xl tracking-tighter text-slate-900 dark:text-white">VVC</span>
              <span className="text-[#e6007e] font-black text-2xl leading-none">.</span>
            </div>
          </div>

          {/* Desktop Nav: Home through Join + Hamburger Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sfx.whoosh();
                    onNavigate(item.id as PageView);
                  }}
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

            {/* VVC Partner Auth Badge / Login Trigger */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2">
                <a
                  href="https://login.verdienendevrienden.club/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#e6007e]/10 hover:bg-[#e6007e]/20 border border-[#e6007e]/30 transition-all text-left group"
                  title="Naar VVC Partner Dashboard"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#e6007e] text-white flex items-center justify-center font-bold text-xs shadow-[0_0_12px_rgba(230,0,126,0.5)]">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'V'}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-[11px] font-black text-slate-900 dark:text-white leading-tight truncate max-w-[100px] flex items-center gap-1">
                      {currentUser.displayName}
                      <ExternalLink className="w-2.5 h-2.5 text-[#e6007e] opacity-70 group-hover:opacity-100" />
                    </p>
                    <p className="text-[9px] font-mono text-[#e6007e] uppercase tracking-wider">
                      {currentUser.partnerCode || 'PARTNER'}
                    </p>
                  </div>
                </a>
                {onLogout && (
                  <button
                    onClick={() => {
                      sfx.click();
                      onLogout();
                    }}
                    title="Uitloggen"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-200 dark:border-[#262626] transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  sfx.click();
                  onOpenLogin?.();
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#e6007e]/15 hover:bg-[#e6007e]/25 text-[#e6007e] border border-[#e6007e]/40 shadow-[0_0_15px_rgba(230,0,126,0.2)] transition-all ml-1 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Inloggen</span>
              </button>
            )}

            {/* Hamburger Menu (Alles na Join) */}
            <div className="relative ml-2" ref={menuRef}>
              <button
                onClick={() => {
                  sfx.click();
                  setMenuOpen(!menuOpen);
                }}
                aria-label="Instellingen en opties"
                title="Instellingen en opties"
                className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  menuOpen
                    ? 'bg-[#e6007e] text-white border-[#e6007e] shadow-[0_0_20px_rgba(230,0,126,0.45)]'
                    : 'text-slate-600 dark:text-[#a1a1aa] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#141414] border-slate-200 dark:border-[#262626]'
                }`}
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>

              {/* Hamburger Dropdown Panel */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#262626] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-2.5 z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-[#1a1a1a] mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a1a1aa]">
                      Instellingen
                    </span>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#e6007e]" />
                  </div>

                  <div className="space-y-1">
                    {/* 1. Geluid Toggle */}
                    <button
                      onClick={handleToggleSound}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#141414] transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#161616] border border-slate-200 dark:border-[#262626] flex items-center justify-center text-[#e6007e]">
                          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">Geluidseffecten</p>
                          <p className="text-[10px] text-[#a1a1aa]">Audio feedback bij acties</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        soundEnabled
                          ? 'bg-[#e6007e]/15 text-[#e6007e] border border-[#e6007e]/30'
                          : 'bg-slate-100 dark:bg-[#1c1c1c] text-[#71717a]'
                      }`}>
                        {soundEnabled ? 'Aan' : 'Uit'}
                      </span>
                    </button>

                    {/* 2. Light / Dark Thema */}
                    <button
                      onClick={() => {
                        sfx.click();
                        toggleTheme();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#141414] transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#161616] border border-slate-200 dark:border-[#262626] flex items-center justify-center text-amber-400 dark:text-amber-300">
                          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4 text-slate-700" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">Thema</p>
                          <p className="text-[10px] text-[#a1a1aa]">OLED Zwart / Licht</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider bg-slate-100 dark:bg-[#1c1c1c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#262626]">
                        {isDarkMode ? 'Donker' : 'Licht'}
                      </span>
                    </button>

                    {/* 3. NL / EN Toggle */}
                    <button
                      onClick={() => {
                        sfx.click();
                        toggleLanguage();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#141414] transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#161616] border border-slate-200 dark:border-[#262626] flex items-center justify-center text-sky-400">
                          <Globe className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">Taal</p>
                          <p className="text-[10px] text-[#a1a1aa]">Nederlands / English</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/30">
                        {language.toUpperCase()}
                      </span>
                    </button>

                    {/* 4. Pro Uit / Pro Aan */}
                    <button
                      onClick={() => {
                        sfx.click();
                        toggleProMode();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#141414] transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                          proMode
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                            : 'bg-slate-100 dark:bg-[#161616] border-slate-200 dark:border-[#262626] text-slate-400'
                        }`}>
                          <Shield className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">Pro Modus</p>
                          <p className="text-[10px] text-[#a1a1aa]">Geavanceerd ecosysteem</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        proMode
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          : 'bg-slate-100 dark:bg-[#1c1c1c] text-[#71717a]'
                      }`}>
                        {proMode ? t.proOn : t.proOff}
                      </span>
                    </button>

                    {/* Optioneel: Ecosysteem als Pro Modus aan staat */}
                    {proMode && (
                      <button
                        onClick={() => {
                          sfx.whoosh();
                          onNavigate('ecosystem');
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#141414] transition-colors text-left border-t border-slate-100 dark:border-[#1a1a1a] mt-1 pt-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                            <Share2 className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{t.ecosystem}</p>
                            <p className="text-[10px] text-[#a1a1aa]">Volledig netwerkoverzicht</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#a1a1aa]" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Trigger (Hamburger voor mobiel) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => {
                sfx.click();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Open navigatiemenu"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-[#a1a1aa] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#141414] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-[#0a0a0a]/98 backdrop-blur-2xl border-t border-slate-200 dark:border-[#1a1a1a] animate-in slide-in-from-top-4 duration-200">
          <div className="px-3 pt-3 pb-4 space-y-1">
            {/* Mobile Partner Status / Login */}
            {currentUser ? (
              <div className="p-3 mb-2 rounded-xl bg-slate-100 dark:bg-[#141414] border border-[#e6007e]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#e6007e] text-white flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(230,0,126,0.4)]">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'V'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{currentUser.displayName}</p>
                    <p className="text-[10px] text-[#e6007e] font-mono">{currentUser.partnerCode || 'VVC PARTNER'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://login.verdienendevrienden.club/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-[#e6007e]/15 text-[#e6007e] hover:bg-[#e6007e]/25 border border-[#e6007e]/30 text-[11px] font-bold flex items-center gap-1"
                  >
                    <span>Dashboard</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {onLogout && (
                    <button
                      onClick={() => {
                        sfx.click();
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                      title="Uitloggen"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  sfx.click();
                  onOpenLogin?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full mb-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#e6007e] hover:bg-[#c00069] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(230,0,126,0.4)] transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Partner Inloggen</span>
              </button>
            )}

            {/* Primary Nav Links */}
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sfx.whoosh();
                  onNavigate(item.id as PageView);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${
                  currentPage === item.id
                    ? 'bg-[#e6007e]/15 text-[#e6007e] border border-[#e6007e]/30'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#141414]'
                }`}
              >
                <item.icon className="h-5 w-5 text-[#e6007e]" />
                <span>{item.label}</span>
              </button>
            ))}

            {proMode && (
              <button
                onClick={() => {
                  sfx.whoosh();
                  onNavigate('ecosystem');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-3 rounded-xl text-sm font-bold flex items-center gap-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#141414]"
              >
                <Share2 className="h-5 w-5 text-purple-400" />
                <span>{t.ecosystem}</span>
              </button>
            )}

            {/* Submenu met de 4 opties na Join */}
            <div className="pt-3 border-t border-slate-200 dark:border-[#1a1a1a] mt-3 space-y-1.5">
              <div className="px-2 pb-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a1a1aa]">
                  Instellingen
                </span>
              </div>

              {/* 1. Geluid */}
              <button
                onClick={handleToggleSound}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-[#222222]"
              >
                <div className="flex items-center gap-2.5">
                  {soundEnabled ? <Volume2 className="h-4 w-4 text-[#e6007e]" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Geluid</span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${soundEnabled ? 'text-[#e6007e]' : 'text-slate-400'}`}>
                  {soundEnabled ? 'Aan' : 'Uit'}
                </span>
              </button>

              {/* 2. Thema */}
              <button
                onClick={() => {
                  sfx.click();
                  toggleTheme();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-[#222222]"
              >
                <div className="flex items-center gap-2.5">
                  {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Thema</span>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                  {isDarkMode ? 'Donker' : 'Licht'}
                </span>
              </button>

              {/* 3. Taal */}
              <button
                onClick={() => {
                  sfx.click();
                  toggleLanguage();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-[#222222]"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-sky-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Taal</span>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded text-sky-400">
                  {language.toUpperCase()}
                </span>
              </button>

              {/* 4. Pro Modus */}
              <button
                onClick={() => {
                  sfx.click();
                  toggleProMode();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-[#222222]"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className={`h-4 w-4 ${proMode ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Pro Modus</span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${proMode ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {proMode ? t.proOn : t.proOff}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
