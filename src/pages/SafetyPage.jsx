import React from 'react';
import {
  Lock,
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Building,
  KeyRound,
  FileText,
  Clock,
} from 'lucide-react';

export default function SafetyPage() {
  const emergencySteps = [
    {
      step: '01',
      title: 'Call your bank to freeze netbanking & cards immediately',
      desc: 'Use the official phone number printed on the back of your debit/credit card or open your official bank mobile app to lock your cards and UPI handles.',
      timeframe: 'Within first 15 minutes',
      badge: 'Critical First Step',
      badgeColor: 'bg-signal-coral text-white',
    },
    {
      step: '02',
      title: 'Dial National Cybercrime Helpline 1930',
      desc: 'Dial 1930 immediately (Toll-Free across all Indian states). Provide the transaction ID, bank account number, and fraudster details. The Citizen Financial Cyber Fraud Reporting System can flag the transaction and freeze the stolen money in the recipient account before cash-out.',
      timeframe: 'Golden Hour (within 1-2 hours)',
      badge: 'Golden Hour Window',
      badgeColor: 'bg-amber-alert text-white',
    },
    {
      step: '03',
      title: 'File an incident report on cybercrime.gov.in',
      desc: 'Upload screenshots of the SMS, WhatsApp chat, caller phone number, and bank debit alert on the official Ministry of Home Affairs National Cyber Crime Reporting Portal to obtain an official police acknowledgement number.',
      timeframe: 'Within 24 hours',
      badge: 'Official FIR Record',
      badgeColor: 'bg-indigo-ink text-white dark:bg-lilac-haze dark:text-indigo-ink',
    },
    {
      step: '04',
      title: 'Reset UPI PIN & Banking Passwords on a clean device',
      desc: 'If you downloaded any APK or remote desktop app (e.g. AnyDesk, TeamViewer) at the scammers request, uninstall it immediately and reset your passwords from a separate trusted device.',
      timeframe: 'Same day',
      badge: 'Sanitization',
      badgeColor: 'bg-safe-mint text-white',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-ink/10 dark:bg-lilac-haze/20 text-indigo-ink dark:text-lilac-haze uppercase">
          <Lock className="w-3.5 h-3.5 text-safe-mint" /> Privacy & Incident Response
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-indigo-ink dark:text-white tracking-tight">
          Privacy Architecture & Emergency Guide
        </h1>
        <p className="text-base sm:text-lg text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
          How we safeguard your personal data with 100% on-device sandboxing, and exactly what to do if you or a family member shared an OTP with scammers.
        </p>
      </div>

      {/* Emergency Action Plan (If OTP Shared) */}
      <section className="p-8 sm:p-10 rounded-surface-lg bg-gradient-to-br from-signal-coral/10 via-amber-alert/5 to-white dark:from-signal-coral/20 dark:to-cloud-dark border border-signal-coral/30 shadow-elevated-indigo space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-signal-coral/20">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-signal-coral text-white uppercase tracking-wider">
              Emergency Protocol
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-indigo-ink dark:text-white mt-2">
              Shared an OTP or Sent Money? Follow These Steps Now.
            </h2>
          </div>
          <a
            href="tel:1930"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-control bg-signal-coral hover:bg-red-600 text-white font-heading font-bold text-sm shadow-soft-indigo transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1930 Right Now</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencySteps.map((step) => (
            <div
              key={step.step}
              className="p-5 rounded-surface bg-white dark:bg-white/5 border border-indigo-900/10 dark:border-white/10 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-black text-2xl text-signal-coral">
                  {step.step}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${step.badgeColor}`}>
                  {step.badge}
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-indigo-ink dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
                {step.desc}
              </p>
              <div className="text-[11px] font-mono text-indigo-900/60 dark:text-indigo-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Target window: {step.timeframe}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* On-Device Privacy Architecture */}
      <section className="p-8 sm:p-10 rounded-surface-lg bg-white dark:bg-cloud-dark border border-indigo-900/15 dark:border-lilac-haze/20 shadow-soft-indigo space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-safe-mint uppercase">
            <CheckCircle2 className="w-4 h-4" /> Zero-Knowledge Architecture
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-indigo-ink dark:text-white">
            What Scam Spotter Stores & What We Never Touch
          </h2>
          <p className="text-sm text-indigo-900/70 dark:text-indigo-200">
            Engineered from ground zero to eliminate privacy vulnerabilities and data breaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* What We Never Touch */}
          <div className="p-6 rounded-surface bg-cloud dark:bg-white/5 border border-indigo-900/10 space-y-4">
            <h3 className="font-heading font-bold text-lg text-signal-coral flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> What We NEVER Touch
            </h3>
            <ul className="space-y-3 text-sm text-indigo-900/80 dark:text-indigo-200">
              <li className="flex items-start gap-2">
                <span className="text-signal-coral font-bold">✕</span>
                <span>Your messages are <strong>never transmitted</strong> to remote backend servers or APIs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-signal-coral font-bold">✕</span>
                <span>Zero tracking cookies, zero third-party advertising pixels, zero telemetry scripts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-signal-coral font-bold">✕</span>
                <span>No phone number, contact list, or personal identity harvesting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-signal-coral font-bold">✕</span>
                <span>No training of opaque AI models on your private communications.</span>
              </li>
            </ul>
          </div>

          {/* What We Store Locally */}
          <div className="p-6 rounded-surface bg-safe-mint/5 dark:bg-white/5 border border-safe-mint/20 space-y-4">
            <h3 className="font-heading font-bold text-lg text-safe-mint flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> What We Store (Locally in Browser Only)
            </h3>
            <ul className="space-y-3 text-sm text-indigo-900/80 dark:text-indigo-200">
              <li className="flex items-start gap-2">
                <span className="text-safe-mint font-bold">✓</span>
                <span>Recent scan history (capped at 25 items) stored strictly inside your browser's local sandbox (`localStorage`).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-safe-mint font-bold">✓</span>
                <span>Custom slider weights and threshold preferences configured via the What-If Tuner.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-safe-mint font-bold">✓</span>
                <span>Light / Dark mode visual theme toggle preference.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-safe-mint font-bold">✓</span>
                <span>Full one-click local memory wipe available anytime via the History Drawer.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
