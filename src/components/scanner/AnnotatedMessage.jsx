import React, { useState } from 'react';
import {
  Clock,
  ShieldAlert,
  Link2,
  KeyRound,
  Banknote,
  MessageSquare,
  CheckCircle2,
  Info,
  X,
} from 'lucide-react';

function getCategoryMeta(category) {
  switch (category) {
    case 'urgency':
      return {
        icon: Clock,
        style: 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-b-2 border-amber-500',
        badge: 'bg-amber-500 text-white',
        label: 'Urgency',
      };
    case 'threat':
      return {
        icon: ShieldAlert,
        style: 'bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-200 border-b-2 border-orange-500',
        badge: 'bg-orange-500 text-white',
        label: 'Account Threat',
      };
    case 'link':
      return {
        icon: Link2,
        style: 'bg-pink-100 dark:bg-pink-950/60 text-pink-900 dark:text-pink-200 border-b-2 border-pink-500',
        badge: 'bg-pink-500 text-white',
        label: 'Suspicious Link',
      };
    case 'otp':
      return {
        icon: KeyRound,
        style: 'bg-red-100 dark:bg-red-950/60 text-red-900 dark:text-red-200 border-b-2 border-red-500 font-semibold',
        badge: 'bg-red-500 text-white',
        label: 'OTP / Credential Request',
      };
    case 'money':
      return {
        icon: Banknote,
        style: 'bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 border-b-2 border-blue-500',
        badge: 'bg-blue-500 text-white',
        label: 'Money / Prize Bait',
      };
    case 'greeting':
      return {
        icon: MessageSquare,
        style: 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border-b-2 border-purple-500',
        badge: 'bg-purple-500 text-white',
        label: 'Vague Greeting',
      };
    case 'good':
      return {
        icon: CheckCircle2,
        style: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border-b-2 border-emerald-500',
        badge: 'bg-emerald-600 text-white',
        label: 'Good Sign',
      };
    default:
      return {
        icon: Info,
        style: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 border-b-2 border-indigo-500',
        badge: 'bg-indigo-600 text-white',
        label: 'Notice',
      };
  }
}

export default function AnnotatedMessage({ segments }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <div className="relative">
      <div className="text-xs font-mono text-indigo-900/60 dark:text-lilac-haze/70 mb-2 flex items-center justify-between">
        <span>ORIGINAL MESSAGE (TAP OR HOVER HIGHLIGHTS TO INSPECT)</span>
        <span className="hidden sm:inline">Tap colored text for explanation</span>
      </div>

      <div className="p-4 sm:p-5 rounded-surface bg-white dark:bg-cloud-dark/80 border border-indigo-900/10 dark:border-lilac-haze/15 shadow-sm font-sans text-base leading-relaxed text-indigo-950 dark:text-indigo-100 whitespace-pre-wrap break-words">
        {segments.map((seg, idx) => {
          if (!seg.isHighlight) {
            return <span key={idx}>{seg.text}</span>;
          }

          const finding = seg.finding;
          const meta = getCategoryMeta(finding.category);
          const Icon = meta.icon;
          const isActive = activeTooltip === idx;

          return (
            <span
              key={idx}
              className="relative inline-block"
              onMouseEnter={() => setActiveTooltip(idx)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <button
                type="button"
                onClick={() => setActiveTooltip(isActive ? null : idx)}
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm mx-0.5 transition-all cursor-pointer ${meta.style} ${
                  isActive ? 'ring-2 ring-indigo-ink dark:ring-lilac-haze' : ''
                }`}
                aria-label={`Highlight: ${finding.name}`}
              >
                <Icon className="w-3.5 h-3.5 inline flex-shrink-0" />
                <span>{seg.text}</span>
              </button>

              {/* Popover Card */}
              {isActive && (
                <div 
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 rounded-surface-sm bg-indigo-950 text-white text-xs shadow-elevated-indigo border border-indigo-800 z-50 animate-in fade-in zoom-in-95 duration-150"
                  role="tooltip"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5 pb-1.5 border-b border-indigo-800/80">
                    <div className="flex items-center gap-1.5 font-heading font-bold text-sm text-white">
                      <Icon className="w-4 h-4 text-lilac-haze" />
                      <span>{finding.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${finding.points > 0 ? 'bg-signal-coral text-white' : 'bg-safe-mint text-white'}`}>
                      {finding.points > 0 ? `+${finding.points} pts` : '0 pts (Safe)'}
                    </span>
                  </div>

                  <p className="text-indigo-200 mb-2 leading-normal">
                    {finding.why}
                  </p>

                  <div className="p-2 rounded bg-indigo-900/70 border border-indigo-800 text-[11px] text-indigo-100 flex items-start gap-1.5">
                    <span className="font-semibold text-safe-mint">Next step:</span>
                    <span>{finding.action}</span>
                  </div>

                  {/* Little arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-indigo-950" />
                </div>
              )}
            </span>
          );
        })}
      </div>

      {/* Legend strip */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-indigo-ink/60 dark:text-lilac-haze/70 font-mono">Legend:</span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-[11px]">
          <Clock className="w-3 h-3 text-amber-600" /> Urgency
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200 text-[11px]">
          <ShieldAlert className="w-3 h-3 text-orange-600" /> Threat
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-200 text-[11px]">
          <Link2 className="w-3 h-3 text-pink-600" /> Link
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 text-[11px]">
          <KeyRound className="w-3 h-3 text-red-600" /> OTP
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-[11px]">
          <Banknote className="w-3 h-3 text-blue-600" /> Money Bait
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-[11px]">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Good Sign
        </span>
      </div>
    </div>
  );
}
