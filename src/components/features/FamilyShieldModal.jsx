import React, { useState, useEffect } from 'react';
import { X, Share2, Copy, Check, MessageCircle, Heart, ShieldAlert } from 'lucide-react';

export default function FamilyShieldModal({ result, isOpen, onClose }) {
  if (!isOpen || !result || !result.isValid) return null;

  const [lang, setLang] = useState('hinglish'); // 'hinglish' | 'english'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const { score, riskLevel, scamType, findings } = result;

  // Generate WhatsApp message formatted for parents/grandparents
  const generateMessage = () => {
    if (lang === 'hinglish') {
      return (
`🚨 *FAMILY ALERT: Yeh message FARZI (SCAM) hai!* 🚨

Mummy / Papa / Dada ji, agar aapko aisa koi SMS ya WhatsApp aaye to:
❌ *Is link ko bilkul mat dabana.*
❌ *Kisi ko bhi phone par apna OTP, PIN ya bank password mat batana.*
❌ *Bank ya police kabhi bhi phone par OTP nahi maangte.*

🔍 *Kyun farzi hai:*
• Scam Type: ${scamType}
• Risk Level: ${riskLevel} (${score}/100)
${findings.slice(0, 3).map(f => `• ${f.name}: ${f.why}`).join('\n')}

Agar galti se link daba diya ho to turant mujhe bataiye ya Bank ko call karke card block karaiye.
National Cyber Helpline: 1930

(Scam Spotter Safety Guard dwara janch kiya gaya)`
      );
    } else {
      return (
`🚨 *FAMILY SAFETY ALERT: This message is a SCAM!* 🚨

Dear family members, if you receive a message like this:
❌ *DO NOT tap or click the link.*
❌ *NEVER share your OTP, PIN, or banking passwords over phone or SMS.*
❌ *Legitimate banks and police will NEVER ask you to disclose an OTP.*

🔍 *Why this is dangerous:*
• Scam Category: ${scamType}
• Risk Score: ${score}/100 (${riskLevel} RISK)
${findings.slice(0, 3).map(f => `• ${f.name}: ${f.why}`).join('\n')}

If you already shared an OTP, please tell me immediately and call your bank's fraud helpline.
National Cybercrime Toll-Free Helpline: 1930

(Verified safely via Scam Spotter on-device protection)`
      );
    }
  };

  const messageText = generateMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-cloud-dark rounded-surface-lg border border-indigo-900/15 dark:border-lilac-haze/20 shadow-elevated-indigo w-full max-w-lg max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="family-shield-title"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-t-surface-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-surface-sm bg-safe-mint/20 text-safe-mint flex items-center justify-center border border-safe-mint/30">
              <Heart className="w-5 h-5 fill-safe-mint/30" />
            </div>
            <div>
              <h3 id="family-shield-title" className="font-heading font-extrabold text-lg text-white">
                Family Shield Warning
              </h3>
              <p className="text-xs text-indigo-200">
                1-Tap WhatsApp warning formatted for parents & grandparents
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

        <div className="p-5 sm:p-6 space-y-4">
          {/* Language Selector */}
          <div className="flex items-center justify-between pb-3 border-b border-indigo-900/10 dark:border-white/10">
            <span className="text-xs font-mono uppercase text-indigo-900/70 dark:text-indigo-300">
              Select Language Style:
            </span>
            <div className="inline-flex p-1 rounded-control bg-indigo-50 dark:bg-white/10 border border-indigo-900/10">
              <button
                onClick={() => setLang('hinglish')}
                className={`px-3 py-1 rounded-sm text-xs font-heading font-bold transition-all ${
                  lang === 'hinglish'
                    ? 'bg-indigo-ink text-white shadow-xs'
                    : 'text-indigo-900/70 dark:text-indigo-200 hover:text-indigo-ink'
                }`}
              >
                Hinglish (Family Friendly)
              </button>
              <button
                onClick={() => setLang('english')}
                className={`px-3 py-1 rounded-sm text-xs font-heading font-bold transition-all ${
                  lang === 'english'
                    ? 'bg-indigo-ink text-white shadow-xs'
                    : 'text-indigo-900/70 dark:text-indigo-200 hover:text-indigo-ink'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* WhatsApp Preview Card */}
          <div className="p-4 rounded-surface-sm bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-sm font-sans text-indigo-950 dark:text-indigo-100 whitespace-pre-wrap leading-relaxed shadow-inner">
            {messageText}
          </div>

          {/* Actions */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-control bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-soft-indigo transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share to WhatsApp</span>
            </button>

            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-control border text-sm font-heading font-bold transition-all ${
                copied
                  ? 'bg-safe-mint text-white border-safe-mint'
                  : 'bg-white dark:bg-white/10 border-indigo-900/20 text-indigo-ink dark:text-white hover:bg-indigo-50'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Warning Text'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-indigo-50/60 dark:bg-white/5 border-t border-indigo-900/10 dark:border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-control text-xs font-medium text-indigo-900/70 dark:text-indigo-300 hover:text-indigo-ink"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
