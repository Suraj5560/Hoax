import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Zap,
  Lock,
  Search,
  Sliders,
  Heart,
  Receipt,
  CheckCircle2,
  ChevronDown,
  AlertTriangle,
  Building,
  Users,
  Eye,
  ExternalLink,
  ScanFace,
  Headphones,
  Video,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import CircularRiskGauge from '../components/scanner/CircularRiskGauge.jsx';
import HeroScene3D from '../components/3d/HeroScene3D.jsx';
import { SAMPLE_MESSAGES } from '../engine/constants.js';
import { analyzeMessage } from '../engine/analyzer.js';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [miniDemoKey, setMiniDemoKey] = useState('sbiKycScam');

  const miniDemoResult = analyzeMessage(SAMPLE_MESSAGES[miniDemoKey]);

  const faqs = [
    {
      q: 'Does Hoax send my private messages, videos, or calls to a remote server?',
      a: 'Never. Our core architecture executes directly in your local browser sandbox. Text analysis, regex matching, audio waveform harmonics, and video frame extraction are performed locally without data leaving your device.',
    },
    {
      q: 'How does Hoax detect Deepfake Video calls?',
      a: 'Our deepfake analyzer inspects facial micro-anomalies: unnatural blinking rates, eye-gaze freezing, mouth-to-speech phoneme lag (lip-sync desynchronization), facial boundary pixel warping, and fake police badges or fabricated digital arrest backgrounds.',
    },
    {
      q: 'How does Call & Audio Fraud detection work?',
      a: 'We evaluate call recordings for voice cloning characteristics (unnatural robotic prosody, missing breath pauses), ambient background boiler-room hums, and extortion pressure language (such as narcotics parcel confiscation or immediate police raid threats).',
    },
    {
      q: 'How does the Hoax AI Chatbot work with Groq?',
      a: 'Hoax features a built-in AI defense companion. You can paste your personal Groq API Key (starts with gsk_) in the chat settings to connect directly to Groq’s ultra-fast Llama-3.3-70b engine. If you do not have an API key yet, the built-in offline knowledge engine answers all questions instantly.',
    },
    {
      q: 'What should I do if I already shared an OTP or transferred funds?',
      a: 'Immediately dial the National Cybercrime Helpline 1930 (Toll-Free in India) and notify your bank to freeze your netbanking and debit/credit cards. The initial 1-2 hours are critical to freezing stolen money in transit.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section with Interactive 3D Three.js Shield & Live Mini-Demo */}
      <section className="relative overflow-hidden mesh-gradient-hero grain-overlay pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-indigo-900/10 dark:border-lilac-haze/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-ink/10 dark:bg-lilac-haze/20 border border-indigo-900/15 text-indigo-ink dark:text-lilac-haze text-xs font-mono font-bold tracking-wide uppercase">
                <Shield className="w-3.5 h-3.5 text-safe-mint" />
                <span>Next-Gen Scam & Deepfake Defense</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-black text-4xl sm:text-6xl text-indigo-ink dark:text-white tracking-tightest leading-tight">
                Stop Scams, Deepfakes & Audio Extortion. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-500 to-lilac-haze dark:from-lilac-haze dark:to-sky-wash">
                  Before You Lose Funds.
                </span>
              </h1>

              {/* One-Line Promise */}
              <p className="text-base sm:text-lg text-indigo-900/80 dark:text-indigo-200 font-sans leading-relaxed max-w-xl">
                The all-in-one fraud station: paste suspicious SMS messages, upload or record video calls to detect AI face-swaps, and screen voice notes for synthetic cloning with explainable score receipts.
              </p>

              {/* CTA Buttons with generous padding */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  to="/app"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-control font-heading font-extrabold text-base text-white bg-indigo-ink hover:bg-indigo-600 dark:bg-lilac-haze dark:text-indigo-ink dark:hover:bg-white shadow-soft-indigo hover:shadow-elevated-indigo transition-all transform hover:-translate-y-0.5"
                >
                  <span>Launch Fraud Scanner</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-control font-heading font-bold text-base text-indigo-ink dark:text-white bg-white/80 dark:bg-white/10 hover:bg-white border border-indigo-900/15 dark:border-white/15 transition-all shadow-xs"
                >
                  <span>How Detection Works</span>
                </Link>
              </div>

              {/* Trust Strip */}
              <div className="pt-4 flex flex-wrap items-center gap-5 text-xs font-mono text-indigo-900/70 dark:text-lilac-haze/80">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-safe-mint" />
                  <span>On-Device Privacy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ScanFace className="w-4 h-4 text-pink-500" />
                  <span>Deepfake Detection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-amber-alert" />
                  <span>Call Scam Analysis</span>
                </div>
              </div>

            </div>

            {/* Right: Three.js Interactive 3D Cyber Shield */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-lilac-haze/30 to-sky-wash/30 rounded-full filter blur-3xl opacity-60 pointer-events-none" />
              <div className="relative w-full max-w-[460px]">
                <HeroScene3D />
                <div className="text-center text-[11px] font-mono text-indigo-900/50 dark:text-indigo-400 mt-2">
                  Interactive 3D Holographic Shield (Drag with mouse)
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Live Mini-Demo Box */}
          <div className="mt-16 max-w-4xl mx-auto bg-white/95 dark:bg-cloud-dark/95 rounded-surface-lg border border-indigo-900/15 dark:border-lilac-haze/20 shadow-elevated-indigo overflow-hidden">
            {/* Demo Header */}
            <div className="p-4 bg-indigo-50/80 dark:bg-white/5 border-b border-indigo-900/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-signal-coral inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-alert inline-block" />
                  <span className="w-3 h-3 rounded-full bg-safe-mint inline-block" />
                </div>
                <span className="text-xs font-mono font-semibold text-indigo-ink dark:text-white ml-2">
                  LIVE SCENARIO AUDIT:
                </span>
              </div>

              {/* Demo Scenario Toggles */}
              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto">
                <button
                  onClick={() => setMiniDemoKey('sbiKycScam')}
                  className={`px-3 py-1 rounded-control text-xs font-heading font-bold transition-all ${
                    miniDemoKey === 'sbiKycScam'
                      ? 'bg-signal-coral text-white'
                      : 'bg-cloud dark:bg-white/10 text-indigo-900/70 dark:text-white hover:bg-indigo-100'
                  }`}
                >
                  Bank KYC Phishing
                </button>
                <button
                  onClick={() => setMiniDemoKey('deliveryScam')}
                  className={`px-3 py-1 rounded-control text-xs font-heading font-bold transition-all ${
                    miniDemoKey === 'deliveryScam'
                      ? 'bg-signal-coral text-white'
                      : 'bg-cloud dark:bg-white/10 text-indigo-900/70 dark:text-white hover:bg-indigo-100'
                  }`}
                >
                  Redelivery Bait
                </button>
                <button
                  onClick={() => setMiniDemoKey('realBankOtp')}
                  className={`px-3 py-1 rounded-control text-xs font-heading font-bold transition-all ${
                    miniDemoKey === 'realBankOtp'
                      ? 'bg-safe-mint text-white'
                      : 'bg-cloud dark:bg-white/10 text-indigo-900/70 dark:text-white hover:bg-indigo-100'
                  }`}
                >
                  Real OTP (Safe)
                </button>
              </div>
            </div>

            {/* Demo Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="text-xs font-mono text-indigo-900/60 dark:text-lilac-haze/70">
                  ANNOTATED FORENSIC HIGHLIGHTS:
                </div>
                <div className="p-4 rounded-surface-sm bg-cloud dark:bg-white/5 border border-indigo-900/10 font-sans text-sm leading-relaxed text-indigo-950 dark:text-white">
                  {miniDemoResult.annotatedSegments.map((seg, i) => {
                    if (!seg.isHighlight) return <span key={i}>{seg.text}</span>;
                    return (
                      <span
                        key={i}
                        className={`px-1.5 py-0.5 rounded text-xs font-semibold mx-0.5 ${
                          seg.finding.category === 'urgency' ? 'bg-amber-100 text-amber-900 border-b-2 border-amber-500' :
                          seg.finding.category === 'threat' ? 'bg-orange-100 text-orange-900 border-b-2 border-orange-500' :
                          seg.finding.category === 'link' ? 'bg-pink-100 text-pink-900 border-b-2 border-pink-500' :
                          seg.finding.category === 'otp' ? 'bg-red-100 text-red-900 border-b-2 border-red-500 font-bold' :
                          seg.finding.category === 'good' ? 'bg-emerald-100 text-emerald-900 border-b-2 border-emerald-500' :
                          'bg-indigo-100 text-indigo-900'
                        }`}
                      >
                        {seg.text}
                      </span>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {miniDemoResult.findings.map((f, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-signal-coral/10 text-signal-coral font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal-coral inline-block" />
                      {f.name} (+{f.points} pts)
                    </span>
                  ))}
                  {miniDemoResult.goodSigns.map((g, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-safe-mint/10 text-safe-mint font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {g.name} (0 pts)
                    </span>
                  ))}
                </div>
              </div>

              {/* Gauge Column */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-indigo-50/50 dark:bg-white/5 rounded-surface border border-indigo-900/10">
                <CircularRiskGauge score={miniDemoResult.score} riskLevel={miniDemoResult.riskLevel} size={140} />
                <Link
                  to="/app"
                  className="mt-4 text-xs font-heading font-bold text-indigo-ink dark:text-lilac-haze hover:underline flex items-center gap-1"
                >
                  <span>Open Full Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Multi-Modal Trio Showcase (Text, Deepfake Video, Call Audio) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-ink/60 dark:text-lilac-haze/80 font-bold">
            Tri-Vector Defense
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-indigo-ink dark:text-white tracking-tight">
            Comprehensive Multi-Modal Protection
          </h2>
          <p className="text-sm text-indigo-900/70 dark:text-indigo-200">
            Modern fraudsters attack across SMS, video calls, and voice notes. Hoax provides specialized defenses for all three vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vector 1: Text */}
          <div className="p-7 rounded-surface-lg bg-white dark:bg-cloud-dark border border-indigo-900/10 dark:border-lilac-haze/15 shadow-soft-indigo space-y-4 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-surface-sm bg-indigo-ink text-white flex items-center justify-center shadow-soft-indigo">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-indigo-ink dark:text-white">
              1. Text & Phishing Link Forensics
            </h3>
            <p className="text-sm text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
              Deconstructs SMS, emails, and WhatsApp notices. Features Link X-Ray for lookalike domains and What-If Tuner for risk thresholds.
            </p>
            <Link to="/app" className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-indigo-ink dark:text-lilac-haze hover:underline pt-2">
              <span>Scan Messages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Vector 2: Video Deepfakes */}
          <div className="p-7 rounded-surface-lg bg-white dark:bg-cloud-dark border border-indigo-900/10 dark:border-lilac-haze/15 shadow-soft-indigo space-y-4 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-surface-sm bg-pink-600 text-white flex items-center justify-center shadow-soft-indigo">
              <ScanFace className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-indigo-ink dark:text-white">
              2. Video & Deepfake Detector
            </h3>
            <p className="text-sm text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
              Evaluates live camera or recorded video calls for synthetic face-swaps, abnormal eye blink rates, lip-sync lag, and fake police uniforms.
            </p>
            <Link to="/app" className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-pink-600 dark:text-pink-400 hover:underline pt-2">
              <span>Scan Video Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Vector 3: Audio & Calls */}
          <div className="p-7 rounded-surface-lg bg-white dark:bg-cloud-dark border border-indigo-900/10 dark:border-lilac-haze/15 shadow-soft-indigo space-y-4 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-surface-sm bg-amber-alert text-white flex items-center justify-center shadow-soft-indigo">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-indigo-ink dark:text-white">
              3. Call Recording & Audio Scanner
            </h3>
            <p className="text-sm text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
              Analyzes incoming voice recordings and microphone audio for AI voice cloning, ambient boiler-room acoustics, and narcotics parcel scripts.
            </p>
            <Link to="/app" className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-amber-alert hover:underline pt-2">
              <span>Analyze Voice Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Stats Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-surface-lg bg-gradient-to-br from-indigo-900 via-indigo-950 to-indigo-900 text-white shadow-elevated-indigo border border-indigo-800">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-signal-coral/25 text-signal-coral border border-signal-coral/40 uppercase">
                The National Crisis
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                Digital Fraud Costs Over ₹1,750+ Crores Every Year
              </h2>
              <p className="text-sm text-indigo-200 leading-relaxed">
                From fake electricity bill disconnections to "digital arrest" extortion and deepfake video calls, cybercrime targets citizens relentlessly.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              <div className="p-4 rounded-surface-sm bg-white/5 border border-white/10 text-center">
                <div className="font-heading font-black text-2xl sm:text-3xl text-signal-coral">68%</div>
                <div className="text-xs text-indigo-200 mt-1">Begin via SMS or WhatsApp</div>
              </div>
              <div className="p-4 rounded-surface-sm bg-white/5 border border-white/10 text-center">
                <div className="font-heading font-black text-2xl sm:text-3xl text-amber-alert">&lt;10 Min</div>
                <div className="text-xs text-indigo-200 mt-1">Average time to lose funds</div>
              </div>
              <div className="p-4 rounded-surface-sm bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
                <div className="font-heading font-black text-2xl sm:text-3xl text-safe-mint">100%</div>
                <div className="text-xs text-indigo-200 mt-1">Preventable with verification</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-indigo-ink dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-indigo-900/70 dark:text-indigo-200">
            Clear answers about multi-modal scanning, privacy, and Groq AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-surface bg-white dark:bg-cloud-dark border border-indigo-900/10 dark:border-lilac-haze/15 shadow-xs overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-base text-indigo-ink dark:text-white hover:bg-indigo-50/40 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-900/60 dark:text-lilac-haze transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-indigo-900/80 dark:text-indigo-200 leading-relaxed border-t border-indigo-900/5 dark:border-white/5 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-surface-lg mesh-gradient-cta text-white text-center space-y-6 shadow-elevated-indigo relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Ready to Safeguard Yourself & Family?
            </h2>
            <p className="text-base sm:text-lg text-indigo-100 leading-relaxed">
              Zero software installation, zero tracking, instant peace of mind. Scan any message, video, or call.
            </p>
            <div className="pt-2">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-control font-heading font-black text-base text-indigo-ink bg-white hover:bg-lilac-haze transition-all shadow-elevated-indigo transform hover:-translate-y-0.5"
              >
                <span>Launch Hoax Defense Station</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
