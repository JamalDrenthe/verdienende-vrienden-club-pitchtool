import React from 'react';
import { ArrowRight, ChevronRight, Phone, Users, TrendingUp } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';

interface HomeProps {
  onNavigate: (page: PageView) => void;
  language: Language;
}

const featureIcons = [Phone, Users, TrendingUp];
const featureColors = ['cyan', 'pink', 'emerald'];

export const Home: React.FC<HomeProps> = ({ onNavigate, language }) => {
  const t = translations[language].home;

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-cyan-500/8 via-blue-500/5 to-transparent dark:from-cyan-500/15 dark:via-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/3 dark:bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* === HERO === */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-6 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          {t.pill}
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight leading-[1.05]">
          {t.titlePrefix}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">{t.titleHighlight}</span>
          {t.titleSuffix}
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
          {t.subtitle}
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-14">
          <button 
            onClick={() => onNavigate('pitch')}
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
          >
            {t.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => onNavigate('basis')}
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-slate-700 dark:text-slate-300 font-semibold text-sm hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
          >
            {t.ctaSecondary}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-4 md:gap-8">
          {t.stats.map((stat, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <div className="w-px h-10 bg-slate-200 dark:bg-white/10" />}
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* === FEATURES + PROMISE === */}
      <section className="relative z-10 px-4 pb-12 max-w-5xl mx-auto w-full">
        
        {/* Features Title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-300 dark:to-white/10" />
          <h2 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">{t.featuresTitle}</h2>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-300 dark:to-white/10" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {t.features.map((feat, idx) => {
            const Icon = featureIcons[idx];
            const color = featureColors[idx];
            return (
              <div key={idx} className="group/card relative bg-white dark:bg-[#0F1623]/80 border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-cyan-500/30 dark:hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/5">
                <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 dark:bg-${color}-500/20 flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 text-${color}-500`} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{feat.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Promise Bar */}
        <div className="bg-slate-50 dark:bg-[#0B1120]/80 rounded-2xl border border-slate-200 dark:border-white/5 p-5 text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <h3 className="text-[10px] font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-[0.25em]">{t.promiseTitle}</h3>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs max-w-lg mx-auto">
            {t.promiseText} <strong className="text-slate-900 dark:text-white font-semibold">{t.system}</strong>{t.promiseSuffix}
          </p>
        </div>
      </section>

    </div>
  );
};