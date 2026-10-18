import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Building,
  GraduationCap,
  Users,
  Shield,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'free',
      name: 'Free Citizen',
      target: 'Individual students & citizens',
      monthlyPrice: '₹0',
      annualPrice: '₹0',
      period: 'forever free',
      description: 'Acquisition & trust engine. Unlimited on-device scanning for everyday safety.',
      valueProp: 'Zero cost barrier: Build massive trust and community adoption.',
      features: [
        'Unlimited on-device text scanning',
        'Transparent Score Receipt audit',
        'Link X-Ray domain inspector',
        'Local browser scan history (25 scans)',
        '1-tap basic WhatsApp family warnings',
        '100% on-device privacy guarantee',
      ],
      ctaText: 'Use Free Forever',
      ctaLink: '/app',
      popular: false,
    },
    {
      id: 'family',
      name: 'Family Shield',
      target: 'Parents & working professionals',
      monthlyPrice: '₹99',
      annualPrice: '₹79',
      period: 'per month',
      description: 'Automated guardian for up to 5 family members with regional dialect alerts.',
      valueProp: 'Average avoided phishing loss: ₹15,000 to ₹50,000 per incident.',
      features: [
        'Everything in Free Citizen',
        'Coverage for up to 5 family phone numbers',
        'Hindi, Tamil, Telugu & Hinglish audio alerts',
        'Emergency 1-click Bank Hotline dialer',
        'Automated WhatsApp forward scanning bot',
        'Priority incident reporting guide',
      ],
      ctaText: 'Protect My Family',
      ctaLink: '/app',
      popular: true,
    },
    {
      id: 'campus',
      name: 'Campus & College',
      target: 'Universities, colleges & coaching institutes',
      monthlyPrice: '₹15',
      annualPrice: '₹150',
      period: 'per student / year',
      description: 'Institutional license protecting students from internship & job fee scams.',
      valueProp: 'One avoided hostel or fee extortion fraud preserves institution reputation.',
      features: [
        'Unlimited campus student & staff access',
        'Admin dashboard of anonymised scam trends',
        'Campus-wide emergency SMS fraud bulletins',
        'Interactive cyber hygiene quizzes & modules',
        'Hostel & student union training toolkit',
        'Dedicated institute compliance reporting',
      ],
      ctaText: 'Request Campus Demo',
      ctaLink: '/about',
      popular: false,
    },
    {
      id: 'enterprise',
      name: 'Bank & Telecom API',
      target: 'Banks, UPI apps & telecom providers',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      period: 'per 1,000 API checks',
      description: 'High-throughput pre-transaction scam scoring & live anonymised trend feed.',
      valueProp: 'Cuts customer support calls by 35% and drastically reduces fraud write-offs.',
      features: [
        'Ultra-low latency REST & gRPC API (&lt;10ms)',
        'Anonymised daily scam patterns data feed',
        'Custom bank lookalike domain early warning',
        'SLA 99.99% uptime guarantee',
        'Dedicated enterprise support engineer',
        'Regulatory RBI / CERT-In compliance audit logs',
      ],
      ctaText: 'Contact Enterprise Sales',
      ctaLink: '/about',
      popular: false,
    },
  ];

  const comparisonFeatures = [
    { name: '100% On-Device Privacy Scanning', free: true, family: true, campus: true, enterprise: true },
    { name: 'Score Receipt with Explainable Points', free: true, family: true, campus: true, enterprise: true },
    { name: 'Link X-Ray Deep Inspector', free: true, family: true, campus: true, enterprise: true },
    { name: 'Family WhatsApp Shield Warnings', free: 'Basic', family: 'Multi-language', campus: 'Campus broadcast', enterprise: 'Customer alerts' },
    { name: 'Protected Users', free: '1 device', family: '5 family members', campus: 'Entire campus', enterprise: 'Unlimited API' },
    { name: 'Anonymised Scam Trends Dashboard', free: false, family: false, campus: true, enterprise: true },
    { name: 'REST / gRPC Enterprise API Access', free: false, family: false, campus: false, enterprise: true },
    { name: 'Custom Brand Lookalike Alerts', free: false, family: false, campus: false, enterprise: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-ink/10 dark:bg-lilac-haze/20 text-indigo-ink dark:text-lilac-haze uppercase tracking-wider">
          Commercial Scalability & Plans
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-indigo-ink dark:text-white tracking-tight">
          Transparent, Defensible Economics
        </h1>
        <p className="text-base sm:text-lg text-indigo-900/80 dark:text-indigo-200">
          How Scam Spotter scales sustainably: free consumer acquisition funded by family peace-of-mind and institutional B2B licenses.
        </p>

        {/* Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-heading font-bold ${!isAnnual ? 'text-indigo-ink dark:text-white' : 'text-indigo-900/60 dark:text-indigo-300'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-indigo-ink dark:bg-lilac-haze p-1 transition-colors relative cursor-pointer"
            aria-label="Toggle annual billing"
          >
            <div
              className={`w-6 h-6 rounded-full bg-white dark:bg-indigo-ink transition-transform transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-heading font-bold flex items-center gap-1.5 ${isAnnual ? 'text-indigo-ink dark:text-white' : 'text-indigo-900/60 dark:text-indigo-300'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-safe-mint/20 text-safe-mint">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Fraud Cost Reality Band */}
      <div className="p-6 sm:p-8 rounded-surface-lg bg-indigo-900 text-white border border-indigo-800 shadow-soft-indigo flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-signal-coral font-bold uppercase">
            <AlertCircle className="w-4 h-4" /> National Impact Context
          </div>
          <h3 className="font-heading font-extrabold text-xl text-white">
            Digital Fraud Costs India ₹1,750+ Crores Annually*
          </h3>
          <p className="text-xs text-indigo-200 max-w-2xl">
            *Representative baseline from government cybercrime advisories. Compare that to ₹150/year campus safety licenses or ₹99/month family shields — the ROI of prevention is enormous.
          </p>
        </div>
        <div className="px-4 py-2.5 rounded-surface-sm bg-white/10 border border-white/15 text-center whitespace-nowrap">
          <span className="text-[11px] font-mono text-indigo-200 block">VALUE RATIO</span>
          <span className="font-heading font-black text-2xl text-safe-mint">100x+ ROI</span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`p-6 sm:p-7 rounded-surface-lg flex flex-col justify-between border transition-all ${
              p.popular
                ? 'bg-white dark:bg-cloud-dark border-indigo-ink dark:border-lilac-haze shadow-elevated-indigo relative ring-2 ring-indigo-ink/20'
                : 'bg-white dark:bg-cloud-dark border-indigo-900/15 dark:border-lilac-haze/15 shadow-soft-indigo'
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-ink text-white dark:bg-lilac-haze dark:text-indigo-ink text-[10px] font-mono font-bold tracking-wider uppercase">
                Most Popular
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs text-indigo-900/60 dark:text-lilac-haze/70 font-bold uppercase">
                  {p.target}
                </span>
                <h3 className="font-heading font-black text-xl text-indigo-ink dark:text-white mt-1">
                  {p.name}
                </h3>
              </div>

              <div className="pt-2 pb-1 border-b border-indigo-900/10 dark:border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading font-black text-4xl text-indigo-ink dark:text-white tracking-tight">
                    {isAnnual ? p.annualPrice : p.monthlyPrice}
                  </span>
                  <span className="text-xs text-indigo-900/60 dark:text-indigo-300 font-mono">
                    {p.period}
                  </span>
                </div>
              </div>

              <p className="text-xs text-indigo-900/80 dark:text-indigo-200 leading-relaxed min-h-[3rem]">
                {p.description}
              </p>

              {/* Value vs Cost Line */}
              <div className="p-2.5 rounded-control bg-indigo-50/70 dark:bg-white/5 border border-indigo-900/10 text-[11px] text-indigo-900 dark:text-indigo-100 flex items-start gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-safe-mint flex-shrink-0 mt-0.5" />
                <span><strong>ROI:</strong> {p.valueProp}</span>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 pt-2 text-xs text-indigo-900/80 dark:text-indigo-200">
                {p.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-safe-mint flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <Link
                to={p.ctaLink}
                className={`w-full py-3 px-4 rounded-control font-heading font-bold text-xs text-center block transition-all shadow-xs ${
                  p.popular
                    ? 'bg-indigo-ink hover:bg-indigo-600 text-white dark:bg-lilac-haze dark:text-indigo-ink dark:hover:bg-white'
                    : 'bg-cloud dark:bg-white/10 hover:bg-indigo-50 border border-indigo-900/15 text-indigo-ink dark:text-white'
                }`}
              >
                {p.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Honest Feature Comparison Table */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-indigo-ink dark:text-white tracking-tight">
            Comprehensive Tier Comparison
          </h2>
          <p className="text-sm text-indigo-900/70 dark:text-indigo-200">
            Honest breakdown of capability boundaries across consumer and enterprise plans.
          </p>
        </div>

        <div className="overflow-x-auto rounded-surface border border-indigo-900/10 dark:border-lilac-haze/15 bg-white dark:bg-cloud-dark shadow-soft-indigo">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-indigo-50/80 dark:bg-white/5 border-b border-indigo-900/10 dark:border-white/10 font-mono text-xs uppercase text-indigo-900/70 dark:text-lilac-haze">
                <th className="p-4 font-bold">Feature</th>
                <th className="p-4 font-bold text-center">Free Citizen</th>
                <th className="p-4 font-bold text-center">Family Shield</th>
                <th className="p-4 font-bold text-center">Campus</th>
                <th className="p-4 font-bold text-center">Bank API</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-900/10 dark:divide-white/10 font-sans text-xs sm:text-sm">
              {comparisonFeatures.map((row, i) => (
                <tr key={i} className="hover:bg-indigo-50/30 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-indigo-950 dark:text-white">{row.name}</td>
                  <td className="p-4 text-center">
                    {typeof row.free === 'boolean' ? (
                      row.free ? <Check className="w-4 h-4 text-safe-mint mx-auto" /> : '—'
                    ) : (
                      <span className="font-mono text-xs">{row.free}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.family === 'boolean' ? (
                      row.family ? <Check className="w-4 h-4 text-safe-mint mx-auto" /> : '—'
                    ) : (
                      <span className="font-mono text-xs font-semibold text-indigo-ink dark:text-lilac-haze">{row.family}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.campus === 'boolean' ? (
                      row.campus ? <Check className="w-4 h-4 text-safe-mint mx-auto" /> : '—'
                    ) : (
                      <span className="font-mono text-xs font-semibold">{row.campus}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.enterprise === 'boolean' ? (
                      row.enterprise ? <Check className="w-4 h-4 text-safe-mint mx-auto" /> : '—'
                    ) : (
                      <span className="font-mono text-xs font-semibold text-safe-mint">{row.enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
