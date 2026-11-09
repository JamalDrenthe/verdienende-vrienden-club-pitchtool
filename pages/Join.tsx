import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Send, ArrowRight, MessageCircle, RefreshCw, ChevronLeft } from 'lucide-react';
import { VoiceMemo } from '../components/VoiceMemo';
import { Language, PageView, CalculatorState } from '../types';
import { translations } from '../translations';
import { TiltCard } from '../components/TiltCard';
import { GameRankBadge } from '../components/GameRankBadge';
import { sfx } from '../lib/soundFx';
import { fireJackpotCelebration, fireConfetti } from '../lib/confetti';

const inputBase = "w-full bg-[#080808] border border-[#262626] rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#e6007e]/50 focus:border-[#e6007e] placeholder-[#a1a1aa] transition-all duration-200 font-medium shadow-inner";

interface JoinProps {
  language: Language;
  onNavigate?: (page: PageView) => void;
  calcState?: CalculatorState;
}

export const Join: React.FC<JoinProps> = ({ language, onNavigate, calcState }) => {
  const t = translations[language].join;

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [kvk, setKvk] = useState('');
  const [consultantEmail, setConsultantEmail] = useState('');
  const [cvName, setCvName] = useState('');
  const [verified, setVerified] = useState(false);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Projections - default to 0
  const hours = calcState ? calcState.hours : 0;
  const placements = calcState ? calcState.placements : 0;
  const referrals = calcState ? calcState.referrals : 0;
  const refValue = calcState ? calcState.refValue : 25;
  const basisIncome = hours * 30;
  const bonusIncome = placements * 300;
  const passiveMonthly = referrals * refValue;
  const grandTotal = basisIncome + bonusIncome + passiveMonthly;
  const grandAnnual = grandTotal * 12;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setSubmitError(
        language === 'nl'
          ? 'Vul alsjeblieft minimaal je voornaam, achternaam, e-mail en telefoonnummer in.'
          : 'Please provide at least your first name, last name, email, and phone number.'
      );
      return;
    }

    setIsSubmitting(true);

    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: companyName.trim() || 'VVC Partner Trainee',
      company_tags: ['#vvc'],
      tags: [
        '#vvc',
        '#pitchtool',
        'Trainee',
        'Aanmelding',
        verified ? 'Voice-Verified' : 'Direct-Signup'
      ],
      status: 'qualified',
      notes: [
        `=== AANMELDING VIA VVC PITCH TOOL ===`,
        `Datum: ${new Date().toISOString()}`,
        `Berekend Maanddoel: €${grandTotal.toLocaleString('nl-NL')}/mnd (€${grandAnnual.toLocaleString('nl-NL')}/jaar)`,
        `• Pijler 1 (Basis €30/u): ${hours} uur/week = €${basisIncome}/mnd`,
        `• Pijler 2 (Bonus €300/deal): ${placements} deals = €${bonusIncome}/mnd`,
        `• Pijler 3 (Passief €${refValue}/mnd): ${referrals} accounts = €${passiveMonthly}/mnd`,
        `Referrer / Pitch Consultant: ${consultantEmail.trim() || 'Niet opgegeven (organisch)'}`,
        `Adres: ${postalCode.trim()} ${houseNumber.trim()}`,
        `Leeftijd: ${age.trim() || 'Onbekend'}`,
        `Bedrijf: ${companyName.trim() || 'Geen (Particulier/Zzp)'}`,
        `KvK-nummer: ${kvk.trim() || 'Geen'}`,
        `Voice Verificatie: ${verified ? 'SUCCESVOL GEVERIFIEERD' : 'Niet voltooid'}`,
        `CV Bestand: ${cvName || 'Geen bestand bijgevoegd'}`
      ].join('\n')
    };

    try {
      const res = await fetch('https://crmos.one/api/v1/contacts/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CRMOS-API-KEY': 'crm_live_vvc_verdienende_vrienden_club_2026',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `Server fout (${res.status})`);
      }

      sfx.jackpot();
      fireJackpotCelebration();
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('CRMos sync error:', err);
      // Fallback: If network or CORS restricts direct client fetch, we still show verified confirmation & log
      setSubmitError(
        err?.message || (language === 'nl' 
          ? 'Synchronisatie met CRMos mislukt. Controleer je internetverbinding of probeer opnieuw.' 
          : 'Sync with CRMos failed. Check your connection or try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12 max-w-4xl mx-auto w-full bg-[#000000]">
      <div className="w-full rounded-3xl overflow-hidden border border-[#1f1f1f] shadow-2xl bg-[#0a0a0a]">

        {/* Top Earnings Goal Banner */}
        <div className="bg-[#0d0d0d] p-6 border-b border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e6007e] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#e6007e]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e6007e]">Jouw Berekende Traject</span>
              <h4 className="text-white font-black text-sm sm:text-base">
                €{grandTotal.toLocaleString('nl-NL')} per maand <span className="text-xs font-normal text-[#888888]">(€{grandAnnual.toLocaleString('nl-NL')}/jr)</span>
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#888888] bg-[#000000] px-3.5 py-1.5 rounded-full border border-[#222222]">
            <span>{hours}u basis</span>
            <span>•</span>
            <span>{placements} deals</span>
            <span>•</span>
            <span>{referrals} accounts</span>
          </div>
        </div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#e6007e] via-[#c00069] to-[#800045] px-8 py-10 text-white overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-black tracking-widest uppercase mb-4 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {t.badgeText}
            </div>
            <h2 className="text-3xl font-black mb-1 tracking-tight">{t.title}</h2>
            <p className="text-white/80 text-sm max-w-xl">{t.subtitle}</p>
          </div>
        </div>

        {/* Form Body or Success State */}
        <div className="bg-[#0a0a0a] px-6 sm:px-10 py-8">
          {submitSuccess ? (
            <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-500 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 uppercase tracking-widest mb-3 border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Gesynchroniseerd met CRMos
                </span>
                <h3 className="text-3xl font-black text-white tracking-tight">
                  Welkom bij VVC, {firstName}!
                </h3>
                <p className="text-[#888888] text-sm max-w-md mx-auto mt-2 leading-relaxed font-medium">
                  Je profiel en berekende doelstelling van <strong className="text-emerald-400">€{grandTotal.toLocaleString('nl-NL')}/mnd</strong> zijn succesvol geregistreerd onder tag <code className="text-xs bg-[#111111] border border-[#222222] px-1.5 py-0.5 rounded text-white font-mono">#vvc</code>.
                </p>
              </div>

              {/* Next Steps Card */}
              <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] text-left max-w-lg mx-auto shadow-md space-y-4">
                <h4 className="text-xs font-black text-[#e6007e] uppercase tracking-[0.2em]">Wat gebeurt er nu?</h4>
                <ul className="space-y-3 text-xs text-[#888888] font-medium">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#e6007e]/20 text-[#e6007e] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                    <span>Onze onboarding coördinator beoordeelt direct jouw gekoppelde profiel in CRMos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#e6007e]/20 text-[#e6007e] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                    <span>Binnen 24 uur ontvang je je persoonlijke VVC Partner overeenkomst en toegang tot de portal.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#e6007e]/20 text-[#e6007e] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                    <span>Start direct met de €30/u training en je eerste plaatsingsbonussen.</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <a
                  href="https://wa.me/31612345678?text=Hallo%20Jamal,%20ik%20heb%20zojuist%20mijn%20aanmelding%20voltooid%20via%20de%20VVC%20Pitch%20Tool!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct contact via WhatsApp</span>
                </a>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('home')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#222222] bg-[#0d0d0d] hover:bg-[#141414] text-white font-bold text-sm transition-all"
                  >
                    Terug naar Start
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Error banner if any */}
              {submitError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <div className="flex-1">{submitError}</div>
                  <button
                    type="button"
                    onClick={() => setSubmitError(null)}
                    className="underline text-[10px] font-bold uppercase hover:opacity-80"
                  >
                    Sluiten
                  </button>
                </div>
              )}

              {/* Section: Persoonlijk */}
              <div>
                <h3 className="text-xs font-black text-[#e6007e] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {t.sectionPersonal}
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder={t.firstName + " *"} 
                      required 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputBase} 
                    />
                    <input 
                      type="text" 
                      placeholder={t.lastName + " *"} 
                      required 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputBase} 
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      placeholder={t.postalCode} 
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={inputBase} 
                    />
                    <input 
                      type="text" 
                      placeholder={t.houseNumber} 
                      value={houseNumber}
                      onChange={(e) => setHouseNumber(e.target.value)}
                      className={inputBase} 
                    />
                    <input 
                      type="number" 
                      placeholder={t.age} 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={inputBase} 
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1f1f1f]" />

              {/* Section: Contact */}
              <div>
                <h3 className="text-xs font-black text-[#e6007e] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {t.sectionContact}
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="email" 
                      placeholder={t.email + " *"} 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputBase} 
                    />
                    <input 
                      type="tel" 
                      placeholder={t.phone + " *"} 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputBase} 
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1f1f1f]" />

              {/* Section: Zakelijk */}
              <div>
                <h3 className="text-xs font-black text-[#e6007e] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  {t.sectionBusiness}
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder={t.companyName} 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={inputBase} 
                    />
                    <input 
                      type="text" 
                      placeholder={t.kvk} 
                      value={kvk}
                      onChange={(e) => setKvk(e.target.value)}
                      className={inputBase} 
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder={t.consultantEmail} 
                    value={consultantEmail}
                    onChange={(e) => setConsultantEmail(e.target.value)}
                    aria-label={t.consultantEmail} 
                    className={inputBase} 
                  />
                </div>
              </div>

              <div className="border-t border-[#1f1f1f]" />

              {/* Section: Upload CV */}
              <div>
                <h3 className="text-xs font-black text-[#e6007e] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  {t.sectionCV}
                </h3>
                <label className="flex flex-col items-center justify-center w-full py-6 bg-[#050505] border-2 border-dashed border-[#222222] rounded-2xl cursor-pointer hover:border-[#e6007e] transition-all duration-200 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#555555] group-hover:text-[#e6007e] transition-colors mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <span className="text-sm text-[#888888] group-hover:text-white transition-colors">
                    {cvName || t.cvDrop}
                  </span>
                  <span className="text-xs text-[#555555] mt-1">{t.cvFormats}</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    aria-label="Upload CV"
                    onChange={(e) => setCvName(e.target.files?.[0]?.name || '')}
                  />
                </label>
              </div>

              <div className="border-t border-[#1f1f1f]" />

              {/* Section: Verificatie */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black text-[#e6007e] uppercase tracking-[0.2em] flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    {t.sectionVerification}
                  </h3>
                  {verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Geverifieerd
                    </span>
                  )}
                </div>
                <VoiceMemo onVerified={setVerified} />
              </div>

              {/* Navigation and Submit */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-black py-4 rounded-2xl text-xs uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-[#222222] text-[#666666] cursor-wait'
                      : 'bg-[#e6007e] hover:bg-[#c00069] text-white shadow-[0_8px_32px_-8px_rgba(230,0,126,0.6)] hover:shadow-[0_8px_32px_rgba(230,0,126,0.8)] cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>CRMos Synchronisatie Actief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{verified ? t.submitVerified : 'Aanmelding Voltooien & Inschrijven'}</span>
                    </>
                  )}
                </button>

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('passief')}
                    className="w-full py-2.5 text-xs text-[#777777] hover:text-white flex items-center justify-center gap-1 transition-colors font-medium"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Terug naar Passief Inkomen overzicht</span>
                  </button>
                )}
              </div>

              <p className="text-center text-[11px] text-[#666666] leading-relaxed">
                {t.disclaimer}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
