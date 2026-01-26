import React from 'react';
import { ArrowRight, MessageCircle, RefreshCw } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';

interface HomeProps {
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, language }) => {
  const t = translations[language].home;

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      
      {/* Refined Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.02)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="z-10 w-full max-w-2xl relative group">
        
        {/* The Glow Behind The Main Card */}
        <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/10 to-blue-600/10 dark:from-cyan-500/20 dark:to-blue-600/20 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
        
        {/* Main Unified Card */}
        <div className="relative bg-white/80 dark:bg-[#0F1623]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-colors duration-300">
          
          {/* Top Section: Hero */}
          <div className="p-8 md:p-12 flex flex-col items-center text-center">
            
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1E293B] dark:to-[#0F172A] rounded-2xl mb-8 flex items-center justify-center shadow-inner border border-white/50 dark:border-white/5 ring-1 ring-slate-200 dark:ring-white/5 group-hover:scale-105 transition-transform duration-500">
               <RefreshCw className="text-cyan-600 dark:text-cyan-400 w-8 h-8 animate-[spin_10s_linear_infinite]" />
            </div>
            
            {/* Pill Label */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#16243A] border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold tracking-[0.2em] mb-6 uppercase shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              {t.pill}
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              {t.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">{t.titleHighlight}</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-10 leading-relaxed font-light">
              {t.subtitle}
            </p>
            
            {/* CTA Button */}
            <button 
              onClick={() => onNavigate('ecosystem')}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-medium text-sm hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.4)] hover:-translate-y-0.5"
            >
              {t.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* Bottom Section: The Promise (Darker Inset) */}
          <div className="mx-4 md:mx-6 mb-4 md:mb-6 bg-slate-50 dark:bg-[#0B1120]/80 rounded-[1.5rem] border border-slate-200 dark:border-white/5 p-6 md:p-8 text-center relative overflow-hidden">
             {/* Decorative lines */}
             <div className="flex items-center justify-center gap-4 mb-4 opacity-50">
               <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500"></div>
               <h3 className="text-[10px] font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-[0.25em]">{t.promiseTitle}</h3>
               <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500"></div>
             </div>
             
             <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm max-w-lg mx-auto font-light">
                {t.promiseText} <strong className="text-slate-900 dark:text-white font-medium">{t.system}</strong>. Een transparante, geautomatiseerde weg om je dagelijkse inzet rechtstreeks en efficiënt te laten resulteren in groeiend, tastbaar eigen vermogen.
             </p>
          </div>

        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 p-3.5 bg-[#4F46E5] text-white rounded-full shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:bg-[#4338CA] transition-all hover:scale-105 z-50">
        <MessageCircle className="w-6 h-6" />
      </button>

    </div>
  );
};