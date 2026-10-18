import React, { useEffect } from 'react';
import { X, Search, AlertTriangle, ShieldCheck, ExternalLink, ArrowRight, CornerDownRight } from 'lucide-react';
import { parseUrlDetails } from '../../engine/urlAnalyzer.js';

export default function LinkXRayModal({ urlString, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!urlString) return null;

  const details = parseUrlDetails(urlString);
  const diff = details.diffDetails;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-cloud-dark rounded-surface-lg border border-indigo-900/15 dark:border-lilac-haze/20 shadow-elevated-indigo w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="xray-title"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-t-surface-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-surface-sm bg-lilac-haze/20 text-lilac-haze flex items-center justify-center border border-lilac-haze/30">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 id="xray-title" className="font-heading font-extrabold text-lg text-white">
                Link X-Ray Deep Inspector
              </h3>
              <p className="text-xs text-indigo-200">
                Deconstructs deceptive links into elemental parts and detects brand impersonation.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-control text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Raw Link Box */}
          <div>
            <label className="text-xs font-mono text-indigo-900/60 dark:text-lilac-haze/70 uppercase">
              Target Link Under Inspection
            </label>
            <div className="mt-1 p-3 rounded-control bg-indigo-50/70 dark:bg-white/5 border border-indigo-900/10 dark:border-white/10 font-mono text-xs sm:text-sm text-indigo-900 dark:text-indigo-100 break-all">
              {urlString}
            </div>
          </div>

          {/* Deconstruction Breakdown */}
          <div>
            <h4 className="font-heading font-bold text-sm text-indigo-ink dark:text-white mb-3">
              URL Architecture Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {/* Scheme */}
              <div className={`p-3 rounded-surface-sm border ${details.isInsecure ? 'bg-signal-coral/10 border-signal-coral/30' : 'bg-safe-mint/10 border-safe-mint/30'}`}>
                <span className="text-[10px] font-mono uppercase text-indigo-900/60 dark:text-lilac-haze/70 block mb-1">
                  Scheme
                </span>
                <span className={`font-mono font-bold text-sm ${details.isInsecure ? 'text-signal-coral' : 'text-safe-mint'}`}>
                  {details.scheme || 'http'}://
                </span>
                <span className="text-[10px] block mt-1 text-indigo-900/70 dark:text-indigo-300">
                  {details.isInsecure ? 'Insecure (No SSL)' : 'Encrypted (SSL)'}
                </span>
              </div>

              {/* Subdomain */}
              <div className="p-3 rounded-surface-sm border bg-indigo-50/60 dark:bg-white/5 border-indigo-900/10 dark:border-white/10">
                <span className="text-[10px] font-mono uppercase text-indigo-900/60 dark:text-lilac-haze/70 block mb-1">
                  Subdomain
                </span>
                <span className="font-mono font-bold text-sm text-indigo-ink dark:text-white truncate block">
                  {details.subdomain || 'none'}
                </span>
                <span className="text-[10px] block mt-1 text-indigo-900/70 dark:text-indigo-300">
                  Prefix
                </span>
              </div>

              {/* Domain */}
              <div className="p-3 rounded-surface-sm border bg-indigo-50/60 dark:bg-white/5 border-indigo-900/10 dark:border-white/10">
                <span className="text-[10px] font-mono uppercase text-indigo-900/60 dark:text-lilac-haze/70 block mb-1">
                  Root Host
                </span>
                <span className="font-mono font-bold text-sm text-indigo-ink dark:text-white truncate block">
                  {details.domain || details.host}
                </span>
                <span className="text-[10px] block mt-1 text-indigo-900/70 dark:text-indigo-300">
                  Registered Name
                </span>
              </div>

              {/* TLD */}
              <div className={`p-3 rounded-surface-sm border ${details.isRiskyTld ? 'bg-signal-coral/10 border-signal-coral/30' : 'bg-indigo-50/60 dark:bg-white/5 border-indigo-900/10 dark:border-white/10'}`}>
                <span className="text-[10px] font-mono uppercase text-indigo-900/60 dark:text-lilac-haze/70 block mb-1">
                  Ending (TLD)
                </span>
                <span className={`font-mono font-bold text-sm ${details.isRiskyTld ? 'text-signal-coral' : 'text-indigo-ink dark:text-white'}`}>
                  .{details.tld}
                </span>
                <span className="text-[10px] block mt-1 text-indigo-900/70 dark:text-indigo-300">
                  {details.isRiskyTld ? 'High Risk TLD' : 'Standard TLD'}
                </span>
              </div>
            </div>
          </div>

          {/* Lookalike Brand Impersonation Check */}
          {details.brandTarget ? (
            <div className="p-4 rounded-surface bg-signal-coral/5 border border-signal-coral/25 space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-signal-coral flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-signal-coral">
                    Target Brand Impersonation Detected!
                  </h4>
                  <p className="text-xs text-indigo-900/80 dark:text-indigo-200 mt-0.5">
                    This domain attempts to impersonate <strong>{details.brandTarget.name}</strong>, but the registered official domain is <strong>{details.brandTarget.officialDomain}</strong>.
                  </p>
                </div>
              </div>

              {/* Letter-by-letter diff comparison */}
              {diff && (
                <div className="pt-2 border-t border-signal-coral/20">
                  <div className="text-[11px] font-mono text-indigo-900/70 dark:text-indigo-300 mb-2">
                    LETTER-BY-LETTER COMPARISON:
                  </div>

                  <div className="space-y-2">
                    {/* Fake domain characters */}
                    <div>
                      <span className="text-[10px] font-mono text-signal-coral block">SUSPICIOUS HOST:</span>
                      <div className="flex flex-wrap gap-1 font-mono text-xs sm:text-sm mt-1">
                        {diff.diffList.map((item, i) => (
                          <span
                            key={i}
                            className={`px-1.5 py-0.5 rounded ${
                              item.status === 'match'
                                ? 'bg-indigo-100 dark:bg-white/10 text-indigo-900 dark:text-white'
                                : 'bg-signal-coral text-white font-bold animate-pulse'
                            }`}
                            title={item.status === 'match' ? 'Matching letter' : 'Suspicious deceptive character'}
                          >
                            {item.char || '—'}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Official domain characters */}
                    <div>
                      <span className="text-[10px] font-mono text-safe-mint block">GENUINE OFFICIAL HOST:</span>
                      <div className="flex flex-wrap gap-1 font-mono text-xs sm:text-sm mt-1">
                        {details.brandTarget.officialDomain.split('').map((ch, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-safe-mint/20 text-safe-mint font-semibold">
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : details.isWhitelisted ? (
            <div className="p-4 rounded-surface bg-safe-mint/10 border border-safe-mint/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-safe-mint flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-sm text-safe-mint">
                  Verified Official Domain
                </h4>
                <p className="text-xs text-indigo-900/80 dark:text-indigo-200 mt-0.5">
                  This domain matches the verified official whitelist for critical public & banking infrastructure.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-surface bg-amber-alert/10 border border-amber-alert/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-alert flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-sm text-amber-alert">
                  Unverified Third-Party Host
                </h4>
                <p className="text-xs text-indigo-900/80 dark:text-indigo-200 mt-0.5">
                  Host "{details.host}" is not on the verified Indian banking or government whitelist. Exercise caution.
                </p>
              </div>
            </div>
          )}

          {/* Quick recommendations */}
          <div className="p-4 rounded-surface-sm bg-indigo-50/50 dark:bg-white/5 border border-indigo-900/10 text-xs text-indigo-900/80 dark:text-indigo-200 flex items-start gap-2">
            <CornerDownRight className="w-4 h-4 text-indigo-ink dark:text-lilac-haze flex-shrink-0 mt-0.5" />
            <p>
              <strong>Golden Rule:</strong> Never tap or click a link received in an unexpected message. Always open your browser and type the bank's genuine address yourself.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-indigo-50/60 dark:bg-white/5 border-t border-indigo-900/10 dark:border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-control bg-indigo-ink hover:bg-indigo-600 text-white font-medium text-sm transition-colors shadow-soft-indigo"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
