import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Heart, Award, ArrowRight, Code2, Users, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const principles = [
    {
      title: 'Radical Transparency',
      desc: 'No black-box answers. A user should never wonder why a score is 80 instead of 40. Every point must map to an open, explainable line item on the Score Receipt.',
    },
    {
      title: 'Privacy by Architecture',
      desc: 'Users paste their most sensitive personal SMS and WhatsApp messages into scam checkers. The only way to guarantee privacy is zero-network architecture: everything executes on-device.',
    },
    {
      title: 'Compassion Over Blame',
      desc: 'Scams exploit human psychology, anxiety, and filial duty. Our language is calm, non-judgmental, and focused on empowering action rather than technical lecturing.',
    },
    {
      title: 'Built for Real Impact',
      desc: 'Every design choice was tested against the reality of Indian cybercrime: Hinglish phrasing, digital arrest extortion tactics, and instant WhatsApp family sharing.',
    },
  ];

  const milestones = [
    { phase: 'Phase 0', title: 'Architecture & Reference Synthesis', desc: 'Distilled principles from Land-book, Mobbin, and 60fps design systems.' },
    { phase: 'Phase 1', title: 'Scaffolding & "Calm Shield" Theme', desc: 'Constructed responsive layout and tokenized Tailwind design system.' },
    { phase: 'Phase 2', title: 'Pure JavaScript Engine & Vitest Suite', desc: 'Engineered 100% explainable rules, negation parsing, and 100% green acceptance tests.' },
    { phase: 'Phase 3 & 4', title: 'Full Multi-Page Website & /app Flow', desc: 'Created 7 complete routes, interactive mini demos, and responsive dual-column app.' },
    { phase: 'Phase 5', title: 'The 5 Standout Features & Pitch Polish', desc: 'Delivered Score Receipt, Link X-Ray, What-If Tuner, Family Shield, and Monetization.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-ink/10 dark:bg-lilac-haze/20 text-indigo-ink dark:text-lilac-haze uppercase">
          <Award className="w-3.5 h-3.5 text-safe-mint" /> Autonomous Security Engineering
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-indigo-ink dark:text-white tracking-tight">
          About Hoax & Our Mission
        </h1>
        <p className="text-base sm:text-lg text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
          Engineered as a production-grade defense station protecting families, students, and businesses from sophisticated digital scams, deepfakes, and audio extortion.
        </p>
      </div>

      {/* Core Principles */}
      <section className="space-y-6">
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-indigo-ink dark:text-white">
          Our Core Product Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-surface bg-white dark:bg-cloud-dark border border-indigo-900/10 dark:border-lilac-haze/15 shadow-soft-indigo space-y-2"
            >
              <h3 className="font-heading font-bold text-lg text-indigo-ink dark:text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-safe-mint" />
                <span>{p.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Timeline */}
      <section className="p-8 sm:p-10 rounded-surface-lg bg-cloud dark:bg-white/5 border border-indigo-900/15 dark:border-lilac-haze/20 space-y-8">
        <div>
          <span className="font-mono text-xs uppercase text-indigo-900/60 dark:text-lilac-haze/70 font-semibold">
            Trajectory
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-indigo-ink dark:text-white mt-1">
            Build Order & Quality Milestones
          </h2>
        </div>

        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-surface-sm bg-white dark:bg-cloud-dark border border-indigo-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-indigo-ink text-white dark:bg-lilac-haze dark:text-indigo-ink">
                  {m.phase}
                </span>
                <span className="font-heading font-bold text-sm text-indigo-ink dark:text-white">
                  {m.title}
                </span>
              </div>
              <p className="text-xs text-indigo-900/70 dark:text-indigo-300">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4 pt-4">
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-indigo-ink dark:text-white">
          Experience Scam Spotter Live
        </h2>
        <p className="text-sm text-indigo-900/70 dark:text-indigo-200 max-w-xl mx-auto">
          Test the SBI KYC example, verify false-alarm protection on genuine OTPs, or tune weights live in the What-If Tuner.
        </p>
        <div className="pt-2">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-control font-heading font-bold text-sm text-white bg-indigo-ink hover:bg-indigo-600 shadow-soft-indigo transition-all transform hover:-translate-y-0.5"
          >
            <span>Launch Analysis Station</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
