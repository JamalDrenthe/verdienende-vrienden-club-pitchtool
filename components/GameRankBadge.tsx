import React, { useEffect, useRef } from 'react';
import { Award, Zap, Trophy, Crown, Sparkles } from 'lucide-react';
import { fireConfetti } from '../lib/confetti';
import { sfx } from '../lib/soundFx';

interface GameRankBadgeProps {
  monthlyTotal: number;
}

interface RankInfo {
  level: number;
  title: string;
  min: number;
  next: number;
  icon: typeof Award;
  color: string;
  glow: string;
}

const RANKS: RankInfo[] = [
  { level: 1, title: 'Rookie Partner', min: 0, next: 1500, icon: Zap, color: 'text-slate-300', glow: 'border-[#262626] bg-[#0c0c0c]' },
  { level: 2, title: 'Deal Hunter', min: 1500, next: 3500, icon: Award, color: 'text-amber-400', glow: 'border-amber-500/40 bg-amber-950/25 shadow-[0_0_25px_rgba(251,191,36,0.2)]' },
  { level: 3, title: 'High-Ticket Closer', min: 3500, next: 7500, icon: Trophy, color: 'text-emerald-400', glow: 'border-emerald-500/40 bg-emerald-950/25 shadow-[0_0_25px_rgba(16,185,129,0.2)]' },
  { level: 4, title: 'VVC Rainmaker', min: 7500, next: 15000, icon: Sparkles, color: 'text-[#e6007e]', glow: 'border-[#e6007e]/50 bg-[#e6007e]/15 shadow-[0_0_30px_rgba(230,0,126,0.3)]' },
  { level: 5, title: 'Financial Freedom Titan', min: 15000, next: 999999, icon: Crown, color: 'text-cyan-400', glow: 'border-cyan-400/50 bg-cyan-950/30 shadow-[0_0_35px_rgba(6,182,212,0.35)]' },
];

export const GameRankBadge: React.FC<GameRankBadgeProps> = ({ monthlyTotal }) => {
  const currentRank = [...RANKS].reverse().find((r) => monthlyTotal >= r.min) || RANKS[0];
  const prevLevelRef = useRef(currentRank.level);

  // Trigger celebration when leveling up
  useEffect(() => {
    if (currentRank.level > prevLevelRef.current) {
      fireConfetti();
      sfx.levelUp();
    }
    prevLevelRef.current = currentRank.level;
  }, [currentRank.level]);

  const Icon = currentRank.icon;
  const progressToNext = currentRank.next < 999999
    ? Math.min(100, Math.round(((monthlyTotal - currentRank.min) / (currentRank.next - currentRank.min)) * 100))
    : 100;

  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 ${currentRank.glow}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
            <Icon className={`w-5 h-5 ${currentRank.color} animate-pulse`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#a1a1aa]">
                Level {currentRank.level}
              </span>
            </div>
            <div className={`text-sm sm:text-base font-black tracking-tight ${currentRank.color} mt-0.5`}>
              {currentRank.title}
            </div>
          </div>
        </div>

        {currentRank.next < 999999 && (
          <div className="text-right">
            <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">
              Volgend Level
            </span>
            <p className="text-xs sm:text-sm font-black text-white tabular-nums tracking-tight mt-0.5">
              +€{Math.max(0, currentRank.next - monthlyTotal).toLocaleString('nl-NL')}
            </p>
          </div>
        )}
      </div>

      {currentRank.next < 999999 && (
        <div className="w-full bg-black/60 h-1.5 mt-3 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#e6007e] to-[#ff2a9d] transition-all duration-300 shadow-[0_0_8px_rgba(230,0,126,0.6)]"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
      )}
    </div>
  );
};
