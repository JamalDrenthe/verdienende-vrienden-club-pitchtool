import React, { useState } from 'react';
import { VoiceMemo } from '../components/VoiceMemo';
import { Language } from '../types';
import { translations } from '../translations';

const inputBase = "w-full bg-white dark:bg-[#0d1525] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200";

interface JoinProps {
  language: Language;
}

export const Join: React.FC<JoinProps> = ({ language }) => {
  const t = translations[language].join;
  const [verified, setVerified] = useState(false);
  const [cvName, setCvName] = useState('');

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-pink-600 via-pink-500 to-rose-500 px-8 py-10 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-60" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold tracking-wide mb-4">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {t.badgeText}
            </div>
            <h2 className="text-3xl font-extrabold mb-1 tracking-tight">{t.title}</h2>
            <p className="text-white/80 text-sm">{t.subtitle}</p>
          </div>
        </div>

        {/* Form Body */}
        <div className="bg-slate-50 dark:bg-[#0F1623] px-8 py-8">
          <form className="space-y-6">

            {/* Section: Persoonlijk */}
            <div>
              <h3 className="text-xs font-bold text-pink-500 dark:text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                {t.sectionPersonal}
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder={t.firstName} required className={inputBase} />
                  <input type="text" placeholder={t.lastName} required className={inputBase} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input type="text" placeholder={t.postalCode} className={inputBase} />
                  <input type="text" placeholder={t.houseNumber} className={inputBase} />
                  <input type="number" placeholder={t.age} className={inputBase} />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-white/5" />

            {/* Section: Contact */}
            <div>
              <h3 className="text-xs font-bold text-pink-500 dark:text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {t.sectionContact}
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="email" placeholder={t.email} required className={inputBase} />
                  <input type="tel" placeholder={t.phone} required className={inputBase} />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-white/5" />

            {/* Section: Zakelijk */}
            <div>
              <h3 className="text-xs font-bold text-pink-500 dark:text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                {t.sectionBusiness}
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder={t.companyName} className={inputBase} />
                  <input type="text" placeholder={t.kvk} className={inputBase} />
                </div>
                <input type="email" placeholder={t.consultantEmail} required aria-label={t.consultantEmail} className={inputBase} />
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-white/5" />

            {/* Section: Upload CV */}
            <div>
              <h3 className="text-xs font-bold text-pink-500 dark:text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {t.sectionCV}
              </h3>
              <label className="flex flex-col items-center justify-center w-full py-6 bg-white dark:bg-[#0d1525] border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl cursor-pointer hover:border-pink-400 dark:hover:border-pink-500/50 transition-all duration-200 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-300 dark:text-slate-600 group-hover:text-pink-400 transition-colors mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-pink-400 transition-colors">
                  {cvName || t.cvDrop}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-600 mt-1">{t.cvFormats}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  aria-label="Upload CV"
                  onChange={(e) => setCvName(e.target.files?.[0]?.name || '')}
                />
              </label>
            </div>

            <div className="border-t border-slate-200 dark:border-white/5" />

            {/* Section: Verificatie */}
            <div>
              <h3 className="text-xs font-bold text-pink-500 dark:text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                {t.sectionVerification}
              </h3>
              <VoiceMemo onVerified={setVerified} />
            </div>

            {/* Submit */}
            <button
              type="button"
              disabled={!verified}
              className={`w-full font-bold py-4 rounded-xl text-sm tracking-wide transition-all duration-300 ${
                verified
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 cursor-pointer scale-100 hover:scale-[1.01]'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              {verified ? t.submitVerified : t.submitUnverified}
            </button>

            <p className="text-center text-[11px] text-slate-400 dark:text-slate-600">
              {t.disclaimer}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
