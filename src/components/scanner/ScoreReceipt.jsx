import React from 'react';
import { Receipt, CheckCircle, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export default function ScoreReceipt({ result }) {
  if (!result || !result.isValid) return null;

  const { findings, goodSigns, rawScore, score, hasComboBonus } = result;

  return (
    <div className="bg-white dark:bg-cloud-dark rounded-surface border border-indigo-900/15 dark:border-lilac-haze/20 shadow-soft-indigo overflow-hidden">
      {/* Receipt Top Header */}
      <div className="p-4 sm:p-5 bg-indigo-50/60 dark:bg-white/5 border-b border-dashed border-indigo-900/20 dark:border-lilac-haze/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-indigo-ink dark:text-lilac-haze" />
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-indigo-ink dark:text-white tracking-tight">
              SCAM SCORE RECEIPT
            </h3>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-ink/10 dark:bg-lilac-haze/20 text-indigo-ink dark:text-lilac-haze uppercase font-semibold">
            Deterministic Audit
          </span>
        </div>
        <p className="text-xs text-indigo-900/70 dark:text-indigo-200 mt-1">
          Every single point is strictly tied to an observable, open rule. Zero black-box guessing.
        </p>
      </div>

      {/* Main Table */}
      <div className="p-4 sm:p-5 space-y-4">
        {findings.length === 0 ? (
          <div className="py-6 text-center text-sm text-safe-mint flex flex-col items-center gap-2">
            <CheckCircle className="w-8 h-8" />
            <p className="font-semibold">No malicious warning signs detected.</p>
            <p className="text-xs text-indigo-900/60 dark:text-indigo-300">This message did not trigger any risk penalties.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-indigo-900/10 dark:border-lilac-haze/15 text-indigo-900/60 dark:text-lilac-haze/70 font-mono text-[11px] uppercase">
                  <th className="pb-2 font-semibold">Warning Sign</th>
                  <th className="pb-2 font-semibold hidden md:table-cell">Found in Message</th>
                  <th className="pb-2 font-semibold">Why It Matters</th>
                  <th className="pb-2 font-semibold text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-indigo-900/10 dark:divide-lilac-haze/10 font-sans">
                {findings.map((item, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50/40 dark:hover:bg-white/5 transition-colors">
                    {/* Sign name */}
                    <td className="py-3 pr-2 font-medium text-indigo-950 dark:text-white align-top">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-signal-coral inline-block flex-shrink-0" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      {/* Mobile-only found text */}
                      {item.text && (
                        <div className="md:hidden mt-1 text-[11px] font-mono text-signal-coral bg-signal-coral/10 px-1.5 py-0.5 rounded break-all">
                          "{item.text.slice(0, 45)}"
                        </div>
                      )}
                    </td>

                    {/* Found in message (desktop) */}
                    <td className="py-3 px-2 font-mono text-xs text-signal-coral/90 dark:text-red-300 hidden md:table-cell max-w-[180px] break-all align-top">
                      {item.text ? `"${item.text.slice(0, 50)}${item.text.length > 50 ? '...' : ''}"` : '—'}
                    </td>

                    {/* Plain language why */}
                    <td className="py-3 px-2 text-indigo-900/80 dark:text-indigo-200 text-xs leading-relaxed align-top">
                      {item.why}
                    </td>

                    {/* Points */}
                    <td className="py-3 pl-2 text-right font-mono font-bold text-signal-coral dark:text-red-400 whitespace-nowrap align-top">
                      +{item.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Good Signs Section (if any) */}
        {goodSigns && goodSigns.length > 0 && (
          <div className="pt-2 border-t border-dashed border-indigo-900/15 dark:border-lilac-haze/15">
            <div className="text-[11px] font-mono font-semibold text-safe-mint uppercase tracking-wider mb-2 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Good Signs (False-Alarm Protection)
            </div>
            <div className="space-y-1.5">
              {goodSigns.map((good, gIdx) => (
                <div key={gIdx} className="p-2 rounded bg-safe-mint/10 border border-safe-mint/20 text-xs flex items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-safe-mint">{good.name}: </span>
                    <span className="text-indigo-900/80 dark:text-indigo-200">{good.why}</span>
                  </div>
                  <span className="font-mono font-bold text-safe-mint whitespace-nowrap">0 pts</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Receipt Totals Summary */}
        <div className="pt-3 border-t-2 border-indigo-900/20 dark:border-lilac-haze/30 space-y-1 font-mono text-xs">
          <div className="flex justify-between text-indigo-900/70 dark:text-indigo-300">
            <span>Raw Risk Points:</span>
            <span>+{rawScore} pts</span>
          </div>
          {rawScore > 100 && (
            <div className="flex justify-between text-indigo-900/60 dark:text-indigo-400 text-[11px]">
              <span>Score Cap Limit (Max 100):</span>
              <span>-{rawScore - 100} pts</span>
            </div>
          )}
          <div className="flex justify-between items-center text-base sm:text-lg font-heading font-black pt-2 border-t border-dashed border-indigo-900/15 dark:border-lilac-haze/20 text-indigo-ink dark:text-white">
            <span>TOTAL RISK SCORE:</span>
            <span className={score >= 60 ? 'text-signal-coral' : score >= 30 ? 'text-amber-alert' : 'text-safe-mint'}>
              {score} / 100
            </span>
          </div>
        </div>

        {/* Receipt Footer stamp */}
        <div className="pt-2 text-center text-[10px] font-mono text-indigo-900/40 dark:text-indigo-400">
          *** ON-DEVICE SCAM SPOTTER AUDIT RECEIPT ***
        </div>
      </div>
    </div>
  );
}
