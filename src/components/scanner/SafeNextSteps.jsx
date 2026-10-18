import React from 'react';
import {
  ShieldAlert,
  KeyRound,
  Building2,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

const ICON_MAP = {
  ShieldAlert,
  KeyRound,
  Building2,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
};

export default function SafeNextSteps({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-white dark:bg-cloud-dark rounded-surface border border-indigo-900/10 dark:border-lilac-haze/15 p-4 sm:p-5 shadow-soft-indigo">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-base sm:text-lg text-indigo-ink dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-indigo-ink dark:text-lilac-haze" />
          <span>Safe Next Steps (Tailored to Findings)</span>
        </h3>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-white/10 text-indigo-900 dark:text-lilac-haze">
          Action Guide
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step) => {
          const Icon = ICON_MAP[step.icon] || ShieldAlert;
          
          let borderStyle = 'border-indigo-900/10 dark:border-white/10 bg-indigo-50/40 dark:bg-white/5';
          let iconColor = 'text-indigo-ink dark:text-lilac-haze';

          if (step.priority === 'critical') {
            borderStyle = 'border-signal-coral/30 bg-signal-coral/5 dark:bg-signal-coral/10';
            iconColor = 'text-signal-coral';
          } else if (step.priority === 'warning') {
            borderStyle = 'border-amber-alert/30 bg-amber-alert/5 dark:bg-amber-alert/10';
            iconColor = 'text-amber-alert';
          } else if (step.priority === 'safe') {
            borderStyle = 'border-safe-mint/30 bg-safe-mint/5 dark:bg-safe-mint/10';
            iconColor = 'text-safe-mint';
          }

          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-surface-sm border flex items-start gap-3.5 ${borderStyle} transition-all`}
            >
              <div className={`p-2 rounded-control bg-white dark:bg-cloud-dark shadow-xs flex-shrink-0 ${iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-heading font-bold text-sm text-indigo-ink dark:text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
                  {step.description}
                </p>
                {step.id === 'step_report_helpline' && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    <a
                      href="tel:1930"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-control bg-indigo-ink text-white text-xs font-semibold hover:bg-indigo-600 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Call 1930 Now
                    </a>
                    <a
                      href="https://cybercrime.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-control bg-white dark:bg-white/10 border border-indigo-900/20 text-indigo-ink dark:text-white text-xs font-medium hover:bg-indigo-50 transition-colors"
                    >
                      <span>cybercrime.gov.in</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
