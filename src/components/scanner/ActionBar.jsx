import React from 'react';
import {
  Heart,
  Share2,
  Sliders,
  History,
  RotateCcw,
  Search,
  MessageCircle,
} from 'lucide-react';

export default function ActionBar({
  onOpenFamilyShield,
  onOpenWhatIfTuner,
  onOpenHistory,
  onOpenLinkXRay,
  onResetScan,
  hasLinks,
}) {
  return (
    <>
      {/* Desktop Toolbar */}
      <div className="hidden lg:flex items-center justify-between p-4 rounded-surface bg-white dark:bg-cloud-dark border border-indigo-900/10 dark:border-lilac-haze/15 shadow-soft-indigo">
        <div className="flex items-center gap-2">
          {/* Family Shield Button */}
          <button
            onClick={onOpenFamilyShield}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-control bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs shadow-xs transition-all transform hover:-translate-y-0.5"
            title="Create WhatsApp alert for parents or grandparents"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Family Shield Warning</span>
          </button>

          {/* Link X-Ray Button (if links found) */}
          {hasLinks && (
            <button
              onClick={onOpenLinkXRay}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-control bg-indigo-ink hover:bg-indigo-700 text-white font-heading font-bold text-xs shadow-xs transition-all transform hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              <span>Link X-Ray</span>
            </button>
          )}

          {/* What-If Tuner Button */}
          <button
            onClick={onOpenWhatIfTuner}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-control bg-cloud dark:bg-white/10 hover:bg-indigo-50 border border-indigo-900/15 text-indigo-ink dark:text-white font-heading font-bold text-xs transition-colors"
          >
            <Sliders className="w-4 h-4 text-indigo-ink dark:text-lilac-haze" />
            <span>What-If Tuner</span>
          </button>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-control bg-cloud dark:bg-white/10 hover:bg-indigo-50 border border-indigo-900/15 text-indigo-ink dark:text-white font-heading font-medium text-xs transition-colors"
          >
            <History className="w-4 h-4 text-indigo-ink dark:text-lilac-haze" />
            <span>History</span>
          </button>
        </div>

        {/* Scan Another Button */}
        <button
          onClick={onResetScan}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-control bg-indigo-ink text-white hover:bg-indigo-600 font-heading font-bold text-xs transition-colors shadow-soft-indigo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Scan Another</span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-cloud-dark/95 backdrop-blur-md border-t border-indigo-900/15 dark:border-lilac-haze/20 p-3 px-4 shadow-elevated-indigo flex items-center justify-between gap-2">
        <button
          onClick={onOpenFamilyShield}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-control bg-emerald-600 text-white font-heading font-bold text-xs shadow-xs"
        >
          <Heart className="w-3.5 h-3.5 fill-white" />
          <span>Family Shield</span>
        </button>

        {hasLinks && (
          <button
            onClick={onOpenLinkXRay}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-control bg-indigo-ink text-white font-heading font-bold text-xs shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Link X-Ray</span>
          </button>
        )}

        <button
          onClick={onOpenWhatIfTuner}
          className="p-2.5 rounded-control bg-cloud dark:bg-white/10 border border-indigo-900/15 text-indigo-ink dark:text-white"
          title="What-if Tuner"
          aria-label="What-if Tuner"
        >
          <Sliders className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenHistory}
          className="p-2.5 rounded-control bg-cloud dark:bg-white/10 border border-indigo-900/15 text-indigo-ink dark:text-white"
          title="Scan History"
          aria-label="Scan History"
        >
          <History className="w-4 h-4" />
        </button>

        <button
          onClick={onResetScan}
          className="p-2.5 rounded-control bg-indigo-ink text-white"
          title="Scan Another"
          aria-label="Scan Another"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
