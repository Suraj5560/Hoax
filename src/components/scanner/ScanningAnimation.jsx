import React, { useState, useEffect } from 'react';
import { Shield, Search, Link2, Scale } from 'lucide-react';

export default function ScanningAnimation({ onComplete }) {
  const [stage, setStage] = useState(0);

  const stages = [
    { text: 'Reading message & normalising text...', icon: Search, progress: 30 },
    { text: 'Checking links against official whitelist...', icon: Link2, progress: 65 },
    { text: 'Weighing explainable signs & safety rules...', icon: Scale, progress: 100 },
  ];

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const timer1 = setTimeout(() => setStage(1), 350);
    const timer2 = setTimeout(() => setStage(2), 700);
    const timer3 = setTimeout(() => onComplete(), 1050);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const currentStage = stages[stage];
  const Icon = currentStage.icon;

  return (
    <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-200">
      <div className="relative">
        <div className="w-20 h-20 rounded-surface bg-gradient-to-tr from-indigo-ink to-lilac-haze flex items-center justify-center text-white shadow-elevated-indigo animate-pulse">
          <Icon className="w-10 h-10 animate-spin-slow" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-safe-mint border-2 border-white flex items-center justify-center text-[10px] text-white font-mono font-bold">
          {stage + 1}
        </div>
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="font-heading font-extrabold text-xl text-indigo-ink dark:text-white transition-all">
          {currentStage.text}
        </h3>
        <p className="text-xs font-mono text-indigo-900/60 dark:text-lilac-haze/70">
          Running 100% on-device in browser sandbox
        </p>
      </div>

      {/* Progress track */}
      <div className="w-64 h-2 rounded-full bg-indigo-900/10 dark:bg-white/10 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-600 to-lilac-haze transition-all duration-300 ease-out"
          style={{ width: `${currentStage.progress}%` }}
        />
      </div>
    </div>
  );
}
