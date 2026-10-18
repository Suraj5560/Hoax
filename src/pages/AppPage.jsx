import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  ArrowLeft,
  MessageSquare,
  Video,
  PhoneCall,
  Activity,
  ScanFace,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { analyzeMessage } from '../engine/analyzer.js';
import PasteStep from '../components/scanner/PasteStep.jsx';
import ScanningAnimation from '../components/scanner/ScanningAnimation.jsx';
import CircularRiskGauge from '../components/scanner/CircularRiskGauge.jsx';
import AnnotatedMessage from '../components/scanner/AnnotatedMessage.jsx';
import ScoreReceipt from '../components/scanner/ScoreReceipt.jsx';
import SafeNextSteps from '../components/scanner/SafeNextSteps.jsx';
import ActionBar from '../components/scanner/ActionBar.jsx';
import LinkXRayModal from '../components/features/LinkXRayModal.jsx';
import WhatIfTunerDrawer from '../components/features/WhatIfTunerDrawer.jsx';
import FamilyShieldModal from '../components/features/FamilyShieldModal.jsx';
import HistoryDrawer from '../components/features/HistoryDrawer.jsx';
import VideoFraudScanner from '../components/video/VideoFraudScanner.jsx';
import CallFraudScanner from '../components/audio/CallFraudScanner.jsx';

export default function AppPage() {
  const {
    inputMessage,
    setInputMessage,
    scanResult,
    setScanResult,
    tunerWeights,
    tunerThresholds,
    addScanRecord,
  } = useApp();

  // Mode: 'text' | 'video' | 'call'
  const [scannerMode, setScannerMode] = useState('text');

  const [step, setStep] = useState(scanResult ? 'result' : 'paste'); // 'paste' | 'scanning' | 'result'
  const [errorMessage, setErrorMessage] = useState('');

  // Modals & Drawers state
  const [linkXRayUrl, setLinkXRayUrl] = useState(null);
  const [isTunerOpen, setIsTunerOpen] = useState(false);
  const [isFamilyShieldOpen, setIsFamilyShieldOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Recalculate scan in real-time when tuner weights/thresholds change
  const currentResult = useMemo(() => {
    if (!inputMessage || inputMessage.trim().length < 10) return null;
    return analyzeMessage(inputMessage, tunerWeights, tunerThresholds);
  }, [inputMessage, tunerWeights, tunerThresholds]);

  // Keep scanResult in sync when in result step
  useEffect(() => {
    if (step === 'result' && currentResult && currentResult.isValid) {
      setScanResult(currentResult);
    }
  }, [step, currentResult, setScanResult]);

  const handleStartScan = () => {
    if (!inputMessage || !inputMessage.trim()) {
      setErrorMessage('Please paste or type a message before scanning.');
      return;
    }
    if (inputMessage.trim().length < 10) {
      setErrorMessage('Message is too short to analyze accurately. Please paste the full text (at least 10 characters).');
      return;
    }

    setErrorMessage('');
    setStep('scanning');
  };

  const handleScanAnimationComplete = () => {
    if (currentResult && currentResult.isValid) {
      setScanResult(currentResult);
      addScanRecord(currentResult);
      setStep('result');

      // Trigger celebratory confetti if message is safe/low risk
      if (currentResult.score < 30) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#2BB673', '#BFE3FF', '#CBB8FF'],
        });
      }
    } else {
      setErrorMessage(currentResult?.error || 'Unable to scan this message format.');
      setStep('paste');
    }
  };

  const handleResetScan = () => {
    setStep('paste');
    setErrorMessage('');
  };

  // Find first suspicious or whitelisted link for Link X-Ray
  const detectedUrl = useMemo(() => {
    if (!scanResult) return null;
    const linkFinding = scanResult.findings?.find(f => f.ruleId === 'suspicious_link' && f.urlDetails?.raw)
      || scanResult.goodSigns?.find(g => g.ruleId === 'good_sign_domain' && g.urlDetails?.raw);
    
    if (linkFinding) return linkFinding.urlDetails.raw;

    // Fallback: look for regex URL match in text
    const match = scanResult.text.match(/(?:https?:\/\/|www\.)[^\s<>"{}|\\^`]+|(?:\b[a-zA-Z0-9-]+\.)+(?:com|in|co\.in|org|net|xyz|top|click|example|work|link|rest|site|online|gov\.in|ac\.in|edu\.in|ly|me|io)\b(?:\/[^\s<>"{}|\\^`]*)?/i);
    return match ? match[0] : null;
  }, [scanResult]);

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 lg:pb-12">
      
      {/* Top Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-ink/10 dark:bg-lilac-haze/20 text-indigo-ink dark:text-lilac-haze uppercase tracking-wider">
              Hoax Security Suite
            </span>
            <span className="text-xs font-mono text-safe-mint flex items-center gap-1">
              • Multi-Modal Fraud Forensics
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-4xl text-indigo-ink dark:text-white tracking-tight">
            Autonomous Fraud Defense Station
          </h1>
          <p className="text-sm text-indigo-900/70 dark:text-indigo-200 mt-1">
            Analyze suspicious messages, deepfake video calls, and synthetic audio calls to uncover invisible threats with itemized evidence.
          </p>
        </div>

        {scannerMode === 'text' && step === 'result' && (
          <button
            onClick={handleResetScan}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-control bg-white dark:bg-white/10 border border-indigo-900/20 text-indigo-ink dark:text-white text-xs font-heading font-bold hover:bg-indigo-50 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Check Another Message</span>
          </button>
        )}
      </div>

      {/* Multi-Modal Tab Navigation */}
      <div className="mb-8 inline-flex p-1.5 rounded-surface bg-white dark:bg-cloud-dark border border-indigo-900/15 dark:border-lilac-haze/20 shadow-soft-indigo overflow-x-auto w-full sm:w-auto">
        <button
          onClick={() => setScannerMode('text')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-control font-heading font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            scannerMode === 'text'
              ? 'bg-indigo-ink text-white shadow-soft-indigo dark:bg-lilac-haze dark:text-indigo-ink'
              : 'text-indigo-900/70 dark:text-indigo-200 hover:text-indigo-ink hover:bg-indigo-50/50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Text & SMS Scanner</span>
        </button>

        <button
          onClick={() => setScannerMode('video')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-control font-heading font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            scannerMode === 'video'
              ? 'bg-indigo-ink text-white shadow-soft-indigo dark:bg-lilac-haze dark:text-indigo-ink'
              : 'text-indigo-900/70 dark:text-indigo-200 hover:text-indigo-ink hover:bg-indigo-50/50'
          }`}
        >
          <Video className="w-4 h-4 text-pink-500" />
          <span>Video & Deepfake Scanner</span>
        </button>

        <button
          onClick={() => setScannerMode('call')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-control font-heading font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            scannerMode === 'call'
              ? 'bg-indigo-ink text-white shadow-soft-indigo dark:bg-lilac-haze dark:text-indigo-ink'
              : 'text-indigo-900/70 dark:text-indigo-200 hover:text-indigo-ink hover:bg-indigo-50/50'
          }`}
        >
          <PhoneCall className="w-4 h-4 text-amber-500" />
          <span>Call Recording & Audio Scanner</span>
        </button>
      </div>

      {/* Render Active Scanner Mode */}
      {scannerMode === 'video' && <VideoFraudScanner />}
      {scannerMode === 'call' && <CallFraudScanner />}

      {scannerMode === 'text' && (
        <>
          {/* Step 1: Paste Input */}
          {step === 'paste' && (
            <PasteStep
              text={inputMessage}
              onChangeText={(val) => {
                setInputMessage(val);
                if (errorMessage) setErrorMessage('');
              }}
              onScan={handleStartScan}
              onClear={() => {
                setInputMessage('');
                setErrorMessage('');
              }}
              errorMessage={errorMessage}
              isScanning={false}
            />
          )}

          {/* Step 2: Staged 1-second Animation */}
          {step === 'scanning' && (
            <ScanningAnimation onComplete={handleScanAnimationComplete} />
          )}

          {/* Step 3: Interactive Results */}
          {step === 'result' && scanResult && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Result Verdict Banner */}
              <div className={`p-5 sm:p-6 rounded-surface-lg border shadow-soft-indigo flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                scanResult.riskLevel === 'HIGH'
                  ? 'bg-gradient-to-r from-signal-coral/10 via-amber-alert/5 to-white dark:from-signal-coral/20 dark:to-cloud-dark border-signal-coral/30'
                  : scanResult.riskLevel === 'MEDIUM'
                  ? 'bg-gradient-to-r from-amber-alert/10 via-amber-alert/5 to-white dark:from-amber-alert/20 dark:to-cloud-dark border-amber-alert/30'
                  : 'bg-gradient-to-r from-safe-mint/10 via-sky-wash/20 to-white dark:from-safe-mint/20 dark:to-cloud-dark border-safe-mint/30'
              }`}>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full font-bold bg-indigo-ink text-white dark:bg-lilac-haze dark:text-indigo-ink">
                      {scanResult.scamType}
                    </span>
                    <span className="text-xs font-mono text-indigo-900/60 dark:text-indigo-300">
                      {scanResult.findings.length} warning signs identified
                    </span>
                  </div>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-indigo-ink dark:text-white">
                    {scanResult.verdict}
                  </h2>
                </div>

                {/* Circular Risk Gauge */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <CircularRiskGauge score={scanResult.score} riskLevel={scanResult.riskLevel} />
                </div>
              </div>

              {/* Action Bar */}
              <ActionBar
                onOpenFamilyShield={() => setIsFamilyShieldOpen(true)}
                onOpenWhatIfTuner={() => setIsTunerOpen(true)}
                onOpenHistory={() => setIsHistoryOpen(true)}
                onOpenLinkXRay={() => setLinkXRayUrl(detectedUrl)}
                onResetScan={handleResetScan}
                hasLinks={!!detectedUrl}
              />

              {/* Two-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Annotated Message & Next Steps */}
                <div className="lg:col-span-7 space-y-6">
                  <AnnotatedMessage segments={scanResult.annotatedSegments} />
                  <SafeNextSteps steps={scanResult.nextSteps} />
                </div>

                {/* Right Column: Score Receipt Table */}
                <div className="lg:col-span-5 space-y-6">
                  <ScoreReceipt result={scanResult} />
                </div>

              </div>

            </div>
          )}

          {/* Feature Modals & Drawers */}
          <LinkXRayModal
            urlString={linkXRayUrl}
            onClose={() => setLinkXRayUrl(null)}
          />

          <WhatIfTunerDrawer
            isOpen={isTunerOpen}
            onClose={() => setIsTunerOpen(false)}
          />

          <FamilyShieldModal
            result={scanResult}
            isOpen={isFamilyShieldOpen}
            onClose={() => setIsFamilyShieldOpen(false)}
          />

          <HistoryDrawer
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            onSelectScan={(reloadedText) => {
              setInputMessage(reloadedText);
              const res = analyzeMessage(reloadedText, tunerWeights, tunerThresholds);
              setScanResult(res);
              setStep('result');
            }}
          />
        </>
      )}

    </div>
  );
}
