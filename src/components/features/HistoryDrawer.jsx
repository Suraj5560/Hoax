import React, { useState, useEffect } from 'react';
import { History, X, Trash2, ArrowUpRight, ShieldAlert, AlertTriangle, ShieldCheck, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function HistoryDrawer({ isOpen, onClose, onSelectScan }) {
  const { history, clearAllHistory } = useApp();
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredHistory = history.filter((item) => {
    if (filter !== 'ALL' && item.riskLevel !== filter) return false;
    if (searchQuery.trim() && !item.fullText.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-hidden bg-indigo-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-cloud-dark h-full shadow-elevated-indigo border-l border-indigo-900/15 dark:border-lilac-haze/20 flex flex-col overflow-hidden animate-in slide-in-from-right duration-250"
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-title"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-surface-sm bg-lilac-haze/20 text-lilac-haze border border-lilac-haze/30">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 id="history-title" className="font-heading font-extrabold text-base text-white">
                Scan History (Local Only)
              </h3>
              <p className="text-xs text-indigo-200">
                100% stored in your browser's private memory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-control text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close history"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-indigo-50/70 dark:bg-white/5 border-b border-indigo-900/10 dark:border-white/10 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-indigo-900/40 dark:text-lilac-haze/50" />
            <input
              type="text"
              placeholder="Search previous messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-control text-xs bg-white dark:bg-white/10 border border-indigo-900/15 dark:border-white/15 focus:outline-none focus:ring-1 focus:ring-indigo-ink"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`px-2.5 py-1 rounded-sm font-heading font-bold text-[11px] transition-all ${
                  filter === lvl
                    ? 'bg-indigo-ink text-white dark:bg-lilac-haze dark:text-indigo-ink'
                    : 'bg-white dark:bg-white/10 text-indigo-900/70 dark:text-indigo-200 hover:bg-indigo-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="py-12 text-center text-xs text-indigo-900/60 dark:text-indigo-300">
              <History className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No matching scan records found.</p>
              <p className="text-[11px] mt-1">Past checks appear here automatically.</p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              let badgeColor = 'text-safe-mint bg-safe-mint/10 border-safe-mint/20';
              let Icon = ShieldCheck;
              if (item.riskLevel === 'HIGH') {
                badgeColor = 'text-signal-coral bg-signal-coral/10 border-signal-coral/20';
                Icon = ShieldAlert;
              } else if (item.riskLevel === 'MEDIUM') {
                badgeColor = 'text-amber-alert bg-amber-alert/10 border-amber-alert/20';
                Icon = AlertTriangle;
              }

              const dateStr = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' });

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectScan(item.fullText);
                    onClose();
                  }}
                  className="p-3.5 rounded-surface-sm bg-white dark:bg-white/5 border border-indigo-900/10 dark:border-white/10 hover:border-indigo-ink dark:hover:border-lilac-haze shadow-xs hover:shadow-soft-indigo transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeColor}`}>
                      <Icon className="w-3 h-3" />
                      <span>{item.score}/100 {item.riskLevel}</span>
                    </span>
                    <span className="text-[10px] font-mono text-indigo-900/50 dark:text-indigo-400">
                      {dateStr}
                    </span>
                  </div>

                  <p className="text-xs text-indigo-950 dark:text-indigo-100 font-sans line-clamp-2 leading-relaxed">
                    "{item.snippet}..."
                  </p>

                  <div className="mt-2 pt-2 border-t border-indigo-900/5 dark:border-white/5 flex items-center justify-between text-[11px] text-indigo-900/60 dark:text-indigo-300">
                    <span>{item.scamType || 'Analyzed Scan'}</span>
                    <span className="inline-flex items-center gap-1 text-indigo-ink dark:text-lilac-haze font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Reload</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="p-4 bg-indigo-50/70 dark:bg-white/5 border-t border-indigo-900/10 dark:border-white/10 flex justify-between items-center">
            <button
              onClick={() => {
                if (window.confirm('Clear all local scan history?')) {
                  clearAllHistory();
                }
              }}
              className="flex items-center gap-1.5 text-xs text-signal-coral hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <span className="text-[11px] font-mono text-indigo-900/50 dark:text-indigo-400">
              {history.length} scans saved
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
