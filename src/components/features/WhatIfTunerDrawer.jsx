import React, { useEffect } from 'react';
import { Sliders, RotateCcw, X, Info, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function WhatIfTunerDrawer({ isOpen, onClose }) {
  const {
    tunerWeights,
    tunerThresholds,
    updateWeight,
    updateThreshold,
    resetTuner,
  } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const ruleSliders = [
    { key: 'fakeUrgency', label: 'Fake Urgency Points', max: 40, min: 0, step: 5, desc: 'Pressure words (immediately, today, jaldi)' },
    { key: 'accountThreat', label: 'Account Threat Points', max: 40, min: 0, step: 5, desc: 'Account blocked, KYC expired, digital arrest' },
    { key: 'suspiciousLink', label: 'Suspicious Link Points', max: 50, min: 0, step: 5, desc: 'Shorteners, lookalikes, HTTP, risky TLDs' },
    { key: 'otpHarvesting', label: 'OTP Harvesting Points', max: 60, min: 0, step: 5, desc: 'Demands to share OTP, PIN, password' },
    { key: 'moneyBait', label: 'Money Bait Points', max: 40, min: 0, step: 5, desc: 'Won lottery, cashback, redelivery fees' },
    { key: 'vagueGreeting', label: 'Vague Greeting Points', max: 25, min: 0, step: 5, desc: 'Generic salutation (Dear customer)' },
    { key: 'comboBonusLinkOtp', label: 'Link + OTP Combo Bonus', max: 30, min: 0, step: 5, desc: 'Synergistic threat penalty' },
  ];

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-hidden bg-indigo-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-cloud-dark h-full shadow-elevated-indigo border-l border-indigo-900/15 dark:border-lilac-haze/20 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-250"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tuner-title"
      >
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-surface-sm bg-lilac-haze/20 text-lilac-haze border border-lilac-haze/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 id="tuner-title" className="font-heading font-extrabold text-base text-white">
                What-If Weight Tuner
              </h3>
              <p className="text-xs text-indigo-200">
                Live interactive weights & thresholds
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-control text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close tuner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explainability Banner */}
        <div className="p-4 bg-indigo-50 dark:bg-white/5 border-b border-indigo-900/10 dark:border-white/10 text-xs text-indigo-900/80 dark:text-indigo-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-indigo-ink dark:text-lilac-haze flex-shrink-0 mt-0.5" />
          <p>
            Adjust any slider below. The active scam score recalculates <strong>instantly in real time</strong>, proving total transparency and zero black-box magic.
          </p>
        </div>

        {/* Sliders Container */}
        <div className="p-5 space-y-6 flex-1">
          {/* Section: Rule Weights */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-indigo-ink dark:text-lilac-haze mb-4">
              Rule Penalty Weights (Points)
            </h4>
            <div className="space-y-4">
              {ruleSliders.map((s) => {
                const currentVal = tunerWeights[s.key] ?? 0;
                return (
                  <div key={s.key} className="p-3 rounded-surface-sm bg-cloud dark:bg-white/5 border border-indigo-900/10 dark:border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={`slider-${s.key}`} className="font-heading font-bold text-xs text-indigo-950 dark:text-white">
                        {s.label}
                      </label>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-ink text-white dark:bg-lilac-haze dark:text-indigo-ink">
                        +{currentVal} pts
                      </span>
                    </div>
                    <p className="text-[11px] text-indigo-900/60 dark:text-indigo-300 mb-2">
                      {s.desc}
                    </p>
                    <input
                      id={`slider-${s.key}`}
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={currentVal}
                      onChange={(e) => updateWeight(s.key, e.target.value)}
                      className="w-full accent-indigo-ink dark:accent-lilac-haze cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Thresholds */}
          <div className="pt-4 border-t border-indigo-900/10 dark:border-white/10">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-indigo-ink dark:text-lilac-haze mb-4">
              Risk Level Thresholds
            </h4>
            <div className="space-y-4">
              {/* Low Threshold */}
              <div className="p-3 rounded-surface-sm bg-cloud dark:bg-white/5 border border-indigo-900/10 dark:border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="slider-lowMax" className="font-heading font-bold text-xs text-safe-mint">
                    Low Risk Maximum (Points)
                  </label>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-safe-mint/20 text-safe-mint">
                    &le; {tunerThresholds.lowMax} pts
                  </span>
                </div>
                <input
                  id="slider-lowMax"
                  type="range"
                  min={10}
                  max={45}
                  step={1}
                  value={tunerThresholds.lowMax}
                  onChange={(e) => updateThreshold('lowMax', e.target.value)}
                  className="w-full accent-safe-mint cursor-pointer"
                />
              </div>

              {/* High Threshold */}
              <div className="p-3 rounded-surface-sm bg-cloud dark:bg-white/5 border border-indigo-900/10 dark:border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="slider-highMin" className="font-heading font-bold text-xs text-signal-coral">
                    High Risk Minimum (Points)
                  </label>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-signal-coral/20 text-signal-coral">
                    &ge; {tunerThresholds.highMin} pts
                  </span>
                </div>
                <input
                  id="slider-highMin"
                  type="range"
                  min={50}
                  max={85}
                  step={1}
                  value={tunerThresholds.highMin}
                  onChange={(e) => updateThreshold('highMin', e.target.value)}
                  className="w-full accent-signal-coral cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 bg-indigo-50/70 dark:bg-white/5 border-t border-indigo-900/10 dark:border-white/10 flex items-center justify-between gap-3 sticky bottom-0 z-10">
          <button
            onClick={resetTuner}
            className="flex items-center gap-1.5 px-3 py-2 rounded-control border border-indigo-900/20 text-indigo-ink dark:text-white text-xs font-medium hover:bg-white dark:hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-control bg-indigo-ink hover:bg-indigo-600 text-white font-medium text-xs transition-colors shadow-soft-indigo"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
