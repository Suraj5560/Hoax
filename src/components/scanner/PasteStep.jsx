import React from 'react';
import { ShieldAlert, Sparkles, X, ArrowRight, CornerDownRight, Zap } from 'lucide-react';
import { SAMPLE_MESSAGES } from '../../engine/constants.js';

export default function PasteStep({
  text,
  onChangeText,
  onScan,
  onClear,
  errorMessage,
  isScanning,
}) {
  const exampleChips = [
    { label: 'SBI KYC Scam', key: 'sbiKycScam', badge: 'High Risk' },
    { label: 'Delivery / Redelivery Scam', key: 'deliveryScam', badge: 'High Risk' },
    { label: 'Real Bank OTP (Safe)', key: 'realBankOtp', badge: 'Low Risk' },
    { label: 'Amazon Order Update (Safe)', key: 'realOrderUpdate', badge: 'Low Risk' },
    { label: 'Digital Arrest Threat', key: 'digitalArrestScam', badge: 'High Risk' },
  ];

  const handleSelectExample = (key) => {
    const sample = SAMPLE_MESSAGES[key];
    if (sample) {
      onChangeText(sample);
    }
  };

  return (
    <div className="bg-white dark:bg-cloud-dark rounded-surface-lg border border-indigo-900/15 dark:border-lilac-haze/20 shadow-soft-indigo p-5 sm:p-7 space-y-6">
      
      {/* Example Chips Header */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-900/70 dark:text-lilac-haze/80 font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-alert" /> Try a Preloaded Example:
          </span>
          {text && (
            <button
              onClick={onClear}
              className="text-xs text-signal-coral hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear Text
            </button>
          )}
        </div>

        {/* Chips Row */}
        <div className="flex flex-wrap gap-2">
          {exampleChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => handleSelectExample(chip.key)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-medium bg-cloud dark:bg-white/5 border border-indigo-900/10 dark:border-white/10 hover:border-indigo-ink dark:hover:border-lilac-haze text-indigo-900 dark:text-indigo-100 hover:bg-indigo-50/70 transition-all cursor-pointer group"
            >
              <span>{chip.label}</span>
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                chip.badge.includes('High')
                  ? 'bg-signal-coral/10 text-signal-coral'
                  : 'bg-safe-mint/10 text-safe-mint'
              }`}>
                {chip.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Large Textarea Box */}
      <div className="space-y-2">
        <div className="relative">
          <textarea
            rows={6}
            value={text}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder="Paste suspicious SMS, WhatsApp message, email, or UPI notification here... (e.g. 'SBI ALERT: Your KYC is incomplete...')"
            className={`w-full p-4 sm:p-5 rounded-surface bg-cloud/50 dark:bg-white/5 border text-base font-sans leading-relaxed text-indigo-950 dark:text-white placeholder:text-indigo-900/40 dark:placeholder:text-lilac-haze/40 focus:outline-none transition-all resize-y ${
              errorMessage 
                ? 'border-signal-coral ring-2 ring-signal-coral/20' 
                : 'border-indigo-900/15 dark:border-white/15 focus:border-indigo-ink dark:focus:border-lilac-haze focus:ring-2 focus:ring-indigo-ink/10'
            }`}
          />

          {/* Character counter */}
          <div className="absolute right-4 bottom-4 text-xs font-mono text-indigo-900/50 dark:text-indigo-400 bg-white/80 dark:bg-cloud-dark/80 px-2 py-0.5 rounded backdrop-blur-xs">
            {text.length} chars
          </div>
        </div>

        {/* Friendly Error Message */}
        {errorMessage && (
          <div className="p-3 rounded-control bg-signal-coral/10 border border-signal-coral/30 text-xs text-signal-coral font-medium flex items-center gap-2 animate-in fade-in duration-150">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Action Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-xs text-indigo-900/70 dark:text-indigo-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-safe-mint inline-block" />
          <span>100% on-device deterministic rule engine • No data sent to any server</span>
        </div>

        <button
          onClick={onScan}
          disabled={isScanning}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-control font-heading font-extrabold text-base text-white bg-indigo-ink hover:bg-indigo-600 dark:bg-lilac-haze dark:text-indigo-ink dark:hover:bg-white shadow-soft-indigo hover:shadow-elevated-indigo transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50"
        >
          <span>Scan Message Now</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
