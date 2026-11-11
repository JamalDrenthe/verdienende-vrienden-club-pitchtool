import React, { useState } from 'react';
import { X, Lock, Mail, AlertCircle, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { loginWithGoogle, loginWithEmail, type VvcUser } from '../lib/firebase';
import { sfx } from '../lib/soundFx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: VvcUser) => void;
  language: 'nl' | 'en';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, language }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    sfx.click();
    try {
      const user = await loginWithGoogle();
      sfx.success();
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.error('Google login failed:', err);
      setError(err?.message || (language === 'nl' ? 'Inloggen met Google mislukt.' : 'Google login failed.'));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError(language === 'nl' ? 'Vul e-mailadres en wachtwoord in.' : 'Enter email and password.');
      return;
    }
    setError(null);
    setLoading(true);
    sfx.click();
    try {
      const user = await loginWithEmail(email, password);
      sfx.success();
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.error('Email login failed:', err);
      let msg = err?.message || 'Inloggen mislukt.';
      if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/wrong-password') {
        msg = language === 'nl' ? 'Onjuist e-mailadres of wachtwoord.' : 'Invalid email or password.';
      } else if (err?.code === 'auth/user-not-found') {
        msg = language === 'nl' ? 'Geen account gevonden met dit e-mailadres.' : 'No account found.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#0a0a0a] border border-[#262626] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#e6007e]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Sluitknop */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors"
          aria-label="Sluiten"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#e6007e]/15 border border-[#e6007e]/30 flex items-center justify-center text-[#e6007e] shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {language === 'nl' ? 'VVC Account Inloggen' : 'VVC Account Login'}
            </h3>
            <p className="text-xs text-neutral-400">
              {language === 'nl' 
                ? 'Koppel je pitch sessies en kandidaten direct aan je VVC dashboard.' 
                : 'Link your pitch sessions directly to your VVC dashboard.'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Google One-Click Login */}
        <button
          type="button"
          disabled={loading}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-[#141414] hover:bg-[#1a1a1a] text-white text-sm font-bold border border-neutral-800 hover:border-neutral-700 transition-all shadow-sm mb-4 cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{language === 'nl' ? 'Inloggen met Google' : 'Continue with Google'}</span>
        </button>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-neutral-800 w-full" />
          <span className="bg-[#0a0a0a] px-3 text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
            {language === 'nl' ? 'of met e-mail' : 'or email'}
          </span>
        </div>

        {/* E-mail / Wachtwoord Formulier */}
        <form onSubmit={handleEmailLogin} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              {language === 'nl' ? 'E-mailadres' : 'Email Address'}
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="naam@vvc.works"
                required
                className="w-full bg-[#121212] border border-[#262626] rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#e6007e]/50 focus:border-[#e6007e] placeholder-neutral-600 font-medium"
              />
              <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-neutral-500" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              {language === 'nl' ? 'Wachtwoord' : 'Password'}
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#121212] border border-[#262626] rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#e6007e]/50 focus:border-[#e6007e] placeholder-neutral-600 font-medium"
              />
              <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-neutral-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#e6007e] to-[#c7006d] text-white text-sm font-bold shadow-lg shadow-[#e6007e]/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{language === 'nl' ? 'Inloggen' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <a
            href="https://login.verdienendevrienden.club/login"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-neutral-400 hover:text-white transition-colors underline decoration-neutral-700"
          >
            {language === 'nl' ? 'Geen account? Registreer via VVC Platform' : 'No account? Register via VVC'}
          </a>
        </div>
      </div>
    </div>
  );
};
