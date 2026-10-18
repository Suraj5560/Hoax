import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function CircularRiskGauge({ score, riskLevel, size = 180 }) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = '#2BB673'; // Safe Mint
  let badgeBg = 'bg-safe-mint/15 text-safe-mint border-safe-mint/30';
  let Icon = ShieldCheck;
  let label = 'LOW RISK';

  if (riskLevel === 'HIGH') {
    colorClass = '#FF4D5E'; // Signal Coral
    badgeBg = 'bg-signal-coral/15 text-signal-coral border-signal-coral/30';
    Icon = ShieldAlert;
    label = 'HIGH RISK';
  } else if (riskLevel === 'MEDIUM') {
    colorClass = '#F5A524'; // Amber Alert
    badgeBg = 'bg-amber-alert/15 text-amber-alert border-amber-alert/30';
    Icon = AlertTriangle;
    label = 'MEDIUM RISK';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-indigo-900/10 dark:text-white/10"
          />
          {/* Threshold zone markers subtle background */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={colorClass}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-heading font-black text-4xl sm:text-5xl text-indigo-ink dark:text-white tracking-tight leading-none">
            {score}
          </span>
          <span className="text-xs font-mono font-medium text-indigo-ink/60 dark:text-lilac-haze/70 uppercase mt-1">
            out of 100
          </span>
        </div>
      </div>

      {/* Explicit Risk Badge: Icon + Text + Color (never color alone) */}
      <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider border ${badgeBg}`}>
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>

      {/* Threshold reference guide */}
      <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-indigo-ink/60 dark:text-lilac-haze/70">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-safe-mint inline-block" /> Low 0-29
        </span>
        <span className="text-indigo-300 dark:text-white/20">|</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-alert inline-block" /> Med 30-59
        </span>
        <span className="text-indigo-300 dark:text-white/20">|</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-signal-coral inline-block" /> High 60+
        </span>
      </div>
    </div>
  );
}
