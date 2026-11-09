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
  { level: 1, title: 'Rookie Partner', min: 0, next: 1500, icon: Zap, color: 'text-slate-400', glow: 'border-slate-700 bg-slate-900/60' },
  { level: 2, title: 'Deal Hunter', min: 1500, next: 3500, icon: Award, color: 'text-amber-400', glow: 'border-amber-500/40 bg-amber-950/30 shadow-[0_0_20px_rgba(251,191,36,0.25)]' },
  { level: 3, title: 'High-Ticket Closer', min: 3500, next: 7500, icon: Trophy, color: 'text-emerald-400', glow: 'border-emerald-500/40 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]' },
  { level: 4, title: 'VVC Rainmaker', min: 7500, next: 15000, icon: Sparkles, color: 'text-[#e6007e]', glow: 'border-[#e6007e]/50 bg-[#e6007e]/15 shadow-[0_0_25px_rgba(230,0,126,0.35)]' },
  { level: 5, title: 'Financial Freedom Titan', min: 15000, next: 999999, icon: Crown, color: 'text-cyan-400', glow: 'border-cyan-400/50 bg-cyan-950/40 shadow-[0_0_30px_rgba(6,182,212,0.4)]' },
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
    <div className={`p-3 rounded-2xl border transition-all duration-300 ${currentRank.glow}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
            <Icon className={`w-4 h-4 ${currentRank.color} animate-pulse`} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#888888]">
                Level {currentRank.level}
              </span>
              <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-black/50 ${currentRank.color}`}>
                Rank
              </span>
            </div>
            <div className={`text-xs font-black tracking-tight ${currentRank.color}`}>
              {currentRank.title}
            </div>
          </div>
        </div>

        {currentRank.next < 999999 && (
          <div className="text-right">
            <span className="text-[9px] font-bold text-[#777777] uppercase tracking-wider">
              Volgend Level
            </span>
            <p className="text-[10px] font-extrabold text-white">
              +€{Math.max(0, currentRank.next - monthlyTotal).toLocaleString('nl-NL')}
            </p>
          </div>
        )}
      </div>

      {currentRank.next < 999999 && (
        <div className="w-full bg-black/60 h-1 mt-2.5 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#e6007e] to-[#ff2a9d] transition-all duration-300"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
      )}
    </div>
  );
};
