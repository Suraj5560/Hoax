import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PhoneCall, ExternalLink, Heart, Lock, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-indigo-950 text-white pt-16 pb-12 border-t border-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* National Emergency Alert Banner */}
        <div className="mb-12 p-5 rounded-surface bg-gradient-to-r from-signal-coral/20 via-amber-alert/15 to-indigo-800/40 border border-signal-coral/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-control bg-signal-coral/25 text-signal-coral flex-shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-white flex items-center gap-2">
                National Cyber Crime Reporting Helpline: 1930
                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-safe-mint/20 text-safe-mint">Toll Free</span>
              </div>
              <p className="text-sm text-indigo-200 mt-0.5">
                If you have transferred funds or disclosed banking credentials to scammers, dial 1930 immediately or report on the official portal.
              </p>
            </div>
          </div>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-control bg-white text-indigo-ink font-semibold text-sm hover:bg-lilac-haze transition-colors whitespace-nowrap shadow-soft-indigo"
          >
            <span>Visit cybercrime.gov.in</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-indigo-900">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-surface-sm bg-gradient-to-br from-indigo-ink via-indigo-600 to-lilac-haze text-white flex items-center justify-center font-bold shadow-soft-indigo">
                <Shield className="w-5 h-5 fill-white/20" />
              </div>
              <span className="font-heading font-black text-2xl tracking-tight text-white">
                Hoax
              </span>
            </div>
            <p className="text-indigo-200 text-sm max-w-md leading-relaxed">
              Autonomous multi-modal fraud defense platform protecting families, students, and businesses from deceptive SMS, deepfake video calls, and synthetic audio extortion.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-safe-mint bg-indigo-900/60 w-fit px-3 py-1.5 rounded-control border border-indigo-800">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-Knowledge Architecture: Private on-device analysis</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-lilac-haze mb-4">
              Fraud Defense Suite
            </h4>
            <ul className="space-y-2.5 text-sm text-indigo-200">
              <li>
                <Link to="/app" className="hover:text-white transition-colors">Scanner Station (Text / Video / Call)</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">How Detection Works</Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors">Standout Features & Forensics</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">Plans & Enterprise API</Link>
              </li>
            </ul>
          </div>

          {/* Safety & Institutional */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-lilac-haze mb-4">
              Safety & Emergency
            </h4>
            <ul className="space-y-2.5 text-sm text-indigo-200">
              <li>
                <Link to="/safety" className="hover:text-white transition-colors">Emergency Protocol & Helplines</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Hoax & Engineering Story</Link>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>RBI Kehta Hai Public Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-indigo-300">
          <p>
            © {new Date().getFullYear()} Hoax Technologies. All rights reserved.
          </p>
          <p className="text-center md:text-right text-indigo-300/80">
            Explainable multi-modal fraud detection. Always verify independently with your official financial institution.
          </p>
        </div>

      </div>
    </footer>
  );
}
