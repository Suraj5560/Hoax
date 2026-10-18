import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
  Receipt,
  Search,
} from 'lucide-react';
import { DEFAULT_WEIGHTS, DEFAULT_THRESHOLDS } from '../engine/constants.js';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const sbiWalkthroughSteps = [
    {
      title: 'Original Message Received',
      snippet: 'SBI ALERT: Your KYC is incomplete and your account will be blocked today. Update immediately at http://sbi-kyc-update.example/verify and share the OTP you receive to confirm.',
      detected: 'Raw incoming SMS string',
      penalty: 0,
      runningScore: 0,
      note: 'The message arrives on the user device. The pure JavaScript engine begins on-device regex scanning without sending data over the network.',
    },
    {
      title: 'Rule 1: Artificial Urgency Detected',
      snippet: '"today", "Update immediately"',
      detected: 'Fake Urgency Penalty',
      penalty: 20,
      runningScore: 20,
      note: 'Legitimate banks provide 30-60 day written notices for KYC renewal; demanding instant action within hours is a classic psychological pressure technique.',
    },
    {
      title: 'Rule 2: Account Block Threat Detected',
      snippet: '"account will be blocked today", "KYC is incomplete"',
      detected: 'Account Threat Penalty',
      penalty: 15,
      runningScore: 35,
      note: 'Fabricating threats of immediate suspension forces panic compliance so victims overlook technical anomalies.',
    },
    {
      title: 'Rule 3: Deceptive Link Detected',
      snippet: '"http://sbi-kyc-update.example/verify"',
      detected: 'Suspicious Link (HTTP + .example TLD + Lookalike)',
      penalty: 25,
      runningScore: 60,
      note: 'Link X-Ray discovers: 1) Non-secure HTTP, 2) Risky .example TLD, 3) Imitates State Bank of India but official domain is sbi.co.in.',
    },
    {
      title: 'Rule 4: Credential Harvesting Detected',
      snippet: '"share the OTP you receive"',
      detected: 'OTP Harvesting Request',
      penalty: 40,
      runningScore: 100,
      note: 'Golden Rule: Banks, police, and government portals NEVER ask for an OTP or PIN. Prompting users to enter or share OTP is the cardinal sign of theft.',
    },
    {
      title: 'Rule 5: High-Risk Combination Synergy',
      snippet: 'Link + OTP request combined',
      detected: 'Synergy Bonus (Link + OTP)',
      penalty: 10,
      runningScore: 110,
      cappedScore: 100,
      note: 'Simultaneously directing someone to a web link while demanding an OTP represents credential harvesting phishing. Capped at 100/100 HIGH Risk.',
    },
  ];

  const currentStepData = sbiWalkthroughSteps[activeStep];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-ink/10 dark:bg-lilac-haze/20 text-indigo-ink dark:text-lilac-haze uppercase">
          <Scale className="w-3.5 h-3.5" /> Explainable Architecture
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-indigo-ink dark:text-white tracking-tight">
          How the Rule Engine Works
        </h1>
        <p className="text-base sm:text-lg text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
          Unlike opaque neural networks that output yes/no answers without accountability, Scam Spotter relies on a 100% visible, deterministic mathematical rubric.
        </p>
      </div>

      {/* Interactive Step-by-Step Walkthrough on the SBI Example */}
      <section className="p-6 sm:p-10 rounded-surface-lg bg-white dark:bg-cloud-dark border border-indigo-900/15 dark:border-lilac-haze/20 shadow-soft-indigo space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-indigo-900/10 dark:border-white/10">
          <div>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-indigo-ink dark:text-white">
              Animated Walk-Through: The SBI KYC Example
            </h2>
            <p className="text-xs sm:text-sm text-indigo-900/70 dark:text-indigo-200 mt-1">
              Watch how our rule engine processes the acceptance test message step by step.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : 0))}
              disabled={activeStep === 0}
              className="px-3 py-1.5 rounded-control text-xs font-heading font-bold bg-cloud dark:bg-white/10 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="font-mono text-xs text-indigo-900/60 dark:text-lilac-haze">
              Step {activeStep + 1} of {sbiWalkthroughSteps.length}
            </span>
            <button
              onClick={() => setActiveStep(prev => (prev < sbiWalkthroughSteps.length - 1 ? prev + 1 : prev))}
              disabled={activeStep === sbiWalkthroughSteps.length - 1}
              className="px-3 py-1.5 rounded-control text-xs font-heading font-bold bg-indigo-ink text-white disabled:opacity-40"
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Walkthrough Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold text-signal-coral uppercase tracking-wider">
              {currentStepData.detected}
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-indigo-ink dark:text-white">
              {currentStepData.title}
            </h3>
            
            <div className="p-4 rounded-surface-sm bg-cloud dark:bg-white/5 border border-indigo-900/10 font-mono text-xs sm:text-sm text-indigo-950 dark:text-indigo-100">
              {currentStepData.snippet}
            </div>

            <p className="text-sm text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
              {currentStepData.note}
            </p>
          </div>

          {/* Running Points Box */}
          <div className="md:col-span-5 p-6 rounded-surface bg-indigo-50/70 dark:bg-white/5 border border-indigo-900/15 text-center space-y-4">
            <span className="text-xs font-mono uppercase text-indigo-900/60 dark:text-lilac-haze/70">
              Running Score Audit
            </span>
            <div className="font-heading font-black text-5xl sm:text-6xl text-signal-coral">
              {currentStepData.runningScore > 100 ? 100 : currentStepData.runningScore}
              <span className="text-2xl text-indigo-900/40 dark:text-white/40 font-normal"> / 100</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-signal-coral/15 text-signal-coral">
              Penalty: +{currentStepData.penalty} pts
            </div>
            {currentStepData.runningScore >= 60 && (
              <div className="text-xs font-bold text-signal-coral flex items-center justify-center gap-1">
                <ShieldAlert className="w-4 h-4" /> Threshold Crossed: HIGH RISK
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Points Table & Rubric */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-indigo-ink dark:text-white tracking-tight">
            The Complete Point Rubric
          </h2>
          <p className="text-sm text-indigo-900/70 dark:text-indigo-200">
            Standard rules, triggers, and penalty assignments in the Hoax Defense Specification.
          </p>
        </div>

        <div className="overflow-x-auto rounded-surface border border-indigo-900/10 dark:border-lilac-haze/15 bg-white dark:bg-cloud-dark shadow-soft-indigo">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-indigo-50/80 dark:bg-white/5 border-b border-indigo-900/10 dark:border-white/10 font-mono text-xs uppercase text-indigo-900/70 dark:text-lilac-haze">
                <th className="p-4 font-bold">Rule Name</th>
                <th className="p-4 font-bold">What It Detects</th>
                <th className="p-4 font-bold">Hinglish / Local Context</th>
                <th className="p-4 font-bold text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-900/10 dark:divide-white/10 font-sans text-xs sm:text-sm">
              <tr>
                <td className="p-4 font-bold text-indigo-ink dark:text-white">Fake Urgency</td>
                <td className="p-4 text-indigo-900/80 dark:text-indigo-200">urgent, immediately, today, right now, within N hours/mins, expires soon</td>
                <td className="p-4 font-mono text-xs text-amber-700 dark:text-amber-300">turant, abhi, jaldi, foran</td>
                <td className="p-4 text-right font-mono font-bold text-signal-coral">+20</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-indigo-ink dark:text-white">Account Threat</td>
                <td className="p-4 text-indigo-900/80 dark:text-indigo-200">account/card/SIM blocked, KYC expired, legal action, arrest, digital arrest, FIR</td>
                <td className="p-4 font-mono text-xs text-amber-700 dark:text-amber-300">khata band, police notice</td>
                <td className="p-4 text-right font-mono font-bold text-signal-coral">+15</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-indigo-ink dark:text-white">Suspicious Link</td>
                <td className="p-4 text-indigo-900/80 dark:text-indigo-200">shorteners (bit.ly), lookalike domains, risky TLDs (.xyz, .example), HTTP, raw IP</td>
                <td className="p-4 font-mono text-xs text-amber-700 dark:text-amber-300">sbi [dot] com, punycode</td>
                <td className="p-4 text-right font-mono font-bold text-signal-coral">+25</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-indigo-ink dark:text-white">OTP Request</td>
                <td className="p-4 text-indigo-900/80 dark:text-indigo-200">share/send/tell/enter + OTP, PIN, CVV, password, card number within 35 chars</td>
                <td className="p-4 font-mono text-xs text-amber-700 dark:text-amber-300">otp batao, pin bhejo</td>
                <td className="p-4 text-right font-mono font-bold text-signal-coral">+40</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-indigo-ink dark:text-white">Money Bait</td>
                <td className="p-4 text-indigo-900/80 dark:text-indigo-200">you have won, lottery, cashback, refund, redelivery fee, part-time job fee</td>
                <td className="p-4 font-mono text-xs text-amber-700 dark:text-amber-300">lottery lag gayi, inaam</td>
                <td className="p-4 text-right font-mono font-bold text-signal-coral">+25</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-indigo-ink dark:text-white">Vague Greeting</td>
                <td className="p-4 text-indigo-900/80 dark:text-indigo-200">Dear customer / user / account holder / cardholder with no personal name</td>
                <td className="p-4 font-mono text-xs text-amber-700 dark:text-amber-300">—</td>
                <td className="p-4 text-right font-mono font-bold text-signal-coral">+10</td>
              </tr>
              <tr className="bg-signal-coral/5 font-semibold">
                <td className="p-4 text-signal-coral">Synergy Bonus</td>
                <td className="p-4 text-signal-coral" colSpan={2}>Suspicious Link + OTP Harvesting Request combined in same message</td>
                <td className="p-4 text-right font-mono font-bold text-signal-coral">+10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* No False Alarm Logic */}
      <section className="p-8 sm:p-10 rounded-surface-lg bg-cloud dark:bg-white/5 border border-indigo-900/15 dark:border-lilac-haze/20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-surface-sm bg-safe-mint/20 text-safe-mint">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl text-indigo-ink dark:text-white">
              The "No False Alarm" Architecture
            </h2>
            <p className="text-xs sm:text-sm text-indigo-900/70 dark:text-indigo-200">
              Why legitimate bank messages never trigger false panic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-surface bg-white dark:bg-cloud-dark border border-indigo-900/10 space-y-2">
            <h3 className="font-heading font-bold text-base text-safe-mint flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Contextual Negation Parser
            </h3>
            <p className="text-xs sm:text-sm text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
              When a message says <em>"Do not share this OTP with anyone"</em>, naive keyword search triggers an alarm on "OTP". Our parser recognizes the protective negative construction and scores it as a <strong>Good Sign (0 points)</strong>.
            </p>
          </div>

          <div className="p-5 rounded-surface bg-white dark:bg-cloud-dark border border-indigo-900/10 space-y-2">
            <h3 className="font-heading font-bold text-base text-safe-mint flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Official Domain Whitelist
            </h3>
            <p className="text-xs sm:text-sm text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
              Links pointing over HTTPS to verified institutions (sbi.co.in, onlinesbi.sbi, hdfcbank.com, amazon.in, *.gov.in, *.ac.in) are recognized as genuine, eliminating false positives on routine order updates.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
