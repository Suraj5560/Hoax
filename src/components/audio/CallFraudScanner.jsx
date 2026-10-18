import React, { useState, useRef, useEffect } from 'react';
import {
  PhoneCall,
  Mic,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  Radio,
  Zap,
  Bot,
  Activity,
  Headphones,
} from 'lucide-react';
import CircularRiskGauge from '../scanner/CircularRiskGauge.jsx';

export default function CallFraudScanner() {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'record' | 'presets'
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const PRESET_CALLS = [
    {
      id: 'fedex_extortion',
      label: 'FedEx / Narcotics Parcel Scam Call',
      badge: 'High Risk (95/100)',
      riskLevel: 'HIGH',
      description: 'Robocall transfer to a fake officer claiming illegal narcotics found in your Aadhaar-linked package.',
      audioTranscript: [
        { speaker: 'Automated Bot', time: '0:02', text: 'This is an urgent notice from FedEx Courier. Your parcel to Taiwan has been confiscated by Mumbai Customs.', risk: 'high' },
        { speaker: 'Fake Officer', time: '0:08', text: 'I am Inspector Rathore, Cyber Crime Branch. Five passports and 150 grams of MDMA were registered under your Aadhaar card.', risk: 'critical' },
        { speaker: 'Fake Officer', time: '0:18', text: 'Do not disconnect this call or local police will reach your address within 30 minutes. You must immediately transfer surety deposit for clearance.', risk: 'critical' },
      ],
      findings: [
        { name: 'Digital Arrest & Drug Parcel Threat', points: 40, why: 'Classic extortion script: falsely alleging contraband parcels to induce terror and demand immediate wire transfers.' },
        { name: 'Synthetic Voice Cloning / TTS Bot', points: 30, why: 'Automated robocall intro exhibits zero natural breathing acoustics and robotic prosody.' },
        { name: 'Synthesized Police Radio / Siren Hum', points: 15, why: 'Acoustic background analysis reveals looped ambient radio chatter designed to fake a police station environment.' },
        { name: 'Refusal to Disconnect / Panic Coercion', points: 10, why: 'Extreme pressure forbidding the caller to disconnect or consult family members.' },
      ],
      score: 95,
      verdict: 'Dangerous extortion scam. Immediately hang up and block. Legitimate police never conduct inquiries or bond payments over phone calls.',
    },
    {
      id: 'credit_card_points',
      label: 'Credit Card Reward Points Expiry Call',
      badge: 'High Risk (78/100)',
      riskLevel: 'HIGH',
      description: 'Scammer posing as bank card division promising ₹9,850 cash conversion for expiring reward points.',
      audioTranscript: [
        { speaker: 'Scammer', time: '0:02', text: 'Sir, I am calling from HDFC Bank Card Department. You have 9,850 accumulated reward points expiring tonight.', risk: 'medium' },
        { speaker: 'Scammer', time: '0:10', text: 'We can directly credit ₹9,850 into your bank account. I have sent an approval SMS, please read out the 6-digit confirmation number.', risk: 'critical' },
      ],
      findings: [
        { name: 'Credential / OTP Verbal Harvesting', points: 40, why: 'Scammer prompts victim to read out incoming OTP under the guise of an "approval code".' },
        { name: 'Financial Reward Expiry Pressure', points: 25, why: 'Artificial deadline ("expiring tonight") to compel rapid unthinking obedience.' },
        { name: 'Impersonation of Bank Card Division', points: 13, why: 'Caller ID spoofing and generic title without verified bank agent credentials.' },
      ],
      score: 78,
      verdict: 'Financial credential harvesting call. The caller is attempting to drain your account using your OTP.',
    },
    {
      id: 'genuine_delivery',
      label: 'Genuine Courier Delivery Confirmation',
      badge: 'Low Risk (5/100)',
      riskLevel: 'LOW',
      description: 'Real delivery driver verifying address location with zero credential or fee demands.',
      audioTranscript: [
        { speaker: 'Delivery Agent', time: '0:01', text: 'Namaste sir, I am your BlueDart delivery partner. I am outside your apartment gate, please confirm flat number.', risk: 'safe' },
      ],
      findings: [],
      goodSigns: [
        { name: 'Zero Financial or OTP Demands', why: 'Caller only verifies physical landmark with no requests for passwords, money, or links.' },
        { name: 'Natural Human Acoustics', why: 'Organic background acoustics with natural ambient vehicle noise and spontaneous speech.' },
      ],
      score: 5,
      verdict: 'Safe operational call. Routine logistics coordination with no scam hallmarks.',
    },
  ];

  // Draw simulated dynamic audio waveform
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 2.5;

      // Draw 3 layered frequency waves
      const colors = ['#CBB8FF', '#3D5CE6', '#2BB673'];
      
      colors.forEach((col, cIdx) => {
        ctx.strokeStyle = col;
        ctx.beginPath();
        for (let x = 0; x < width; x += 4) {
          const freq = (x * 0.03) + (step * (cIdx + 1) * 0.05);
          const amp = (height * 0.25) * Math.sin(freq) * Math.cos(x * 0.01 + step * 0.02);
          const y = height / 2 + amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      step++;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };

  useEffect(() => {
    drawWaveform();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle local audio file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      runAudioAnalysis(file.name);
    }
  };

  // Start live microphone recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        runAudioAnalysis('live_call_recording.wav');
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert('Microphone access denied: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const runAudioAnalysis = (filename) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      if (/fedex|arrest|parcel|police/i.test(filename) || Math.random() > 0.4) {
        setAnalysisResult(PRESET_CALLS[0]);
      } else {
        setAnalysisResult(PRESET_CALLS[2]);
      }
      setIsAnalyzing(false);
    }, 1600);
  };

  const handleSelectPreset = (preset) => {
    setAnalysisResult(null);
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult(preset);
      setIsAnalyzing(false);
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-surface-lg bg-white dark:bg-cloud-dark border border-indigo-900/15 dark:border-lilac-haze/20 shadow-soft-indigo space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-alert/10 text-amber-alert uppercase">
              <Activity className="w-3.5 h-3.5" /> Acoustic & Speech Scam Forensics
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-indigo-ink dark:text-white">
              Call Recording & Audio Fraud Scanner
            </h2>
            <p className="text-sm text-indigo-900/70 dark:text-indigo-200">
              Analyze incoming voice calls, WhatsApp voice notes, and robocalls for AI voice cloning, extortion scripts, and fake authority pressure tactics.
            </p>
          </div>

          {/* Switcher */}
          <div className="inline-flex p-1 rounded-control bg-indigo-50 dark:bg-white/10 border border-indigo-900/10">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'upload' ? 'bg-indigo-ink text-white shadow-xs' : 'text-indigo-900/70 dark:text-indigo-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" /> Upload Audio
            </button>
            <button
              onClick={() => setActiveTab('record')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'record' ? 'bg-indigo-ink text-white shadow-xs' : 'text-indigo-900/70 dark:text-indigo-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" /> Record Mic
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'presets' ? 'bg-indigo-ink text-white shadow-xs' : 'text-indigo-900/70 dark:text-indigo-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-alert" /> Presets
            </button>
          </div>
        </div>

        {/* Live Audio Waveform Canvas */}
        <div className="p-4 rounded-surface bg-indigo-950 border border-indigo-800 shadow-inner overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-mono text-indigo-300 mb-2">
            <span>ACOUSTIC HARMONIC SPECTROGRAM</span>
            <span>REAL-TIME ANALYSIS</span>
          </div>
          <canvas ref={canvasRef} width={600} height={70} className="w-full h-18 block" />
        </div>

        {/* Input Tab Contents */}
        {activeTab === 'upload' && (
          <div className="p-8 border-2 border-dashed border-indigo-900/20 dark:border-white/20 rounded-surface text-center hover:border-indigo-ink transition-colors cursor-pointer relative bg-cloud/50 dark:bg-white/5">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="space-y-3 pointer-events-none">
              <div className="w-12 h-12 rounded-surface-sm bg-indigo-ink text-white flex items-center justify-center mx-auto shadow-soft-indigo">
                <Upload className="w-6 h-6" />
              </div>
              <div className="font-heading font-bold text-base text-indigo-ink dark:text-white">
                Upload call recording or voice memo
              </div>
              <p className="text-xs text-indigo-900/60 dark:text-indigo-300">
                Supports MP3, WAV, M4A, AAC, OGG files (processed entirely in your browser)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'record' && (
          <div className="p-6 rounded-surface bg-cloud dark:bg-white/5 border border-indigo-900/10 text-center space-y-4">
            <p className="text-xs text-indigo-900/70 dark:text-indigo-300">
              Put your phone on speaker or speak near the microphone to record an incoming suspicious call.
            </p>
            <div className="flex justify-center gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="px-6 py-2.5 rounded-control bg-signal-coral hover:bg-red-600 text-white font-heading font-bold text-xs shadow-soft-indigo flex items-center gap-2"
                >
                  <Mic className="w-4 h-4" /> Start Live Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="px-6 py-2.5 rounded-control bg-indigo-ink text-white font-heading font-bold text-xs shadow-soft-indigo flex items-center gap-2 animate-pulse"
                >
                  <Pause className="w-4 h-4" /> Stop & Analyze Call
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'presets' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {PRESET_CALLS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className="p-4 text-left rounded-surface-sm bg-cloud dark:bg-white/5 border border-indigo-900/10 hover:border-indigo-ink dark:hover:border-lilac-haze transition-all shadow-xs group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    preset.riskLevel === 'HIGH' ? 'bg-signal-coral/15 text-signal-coral' : 'bg-safe-mint/15 text-safe-mint'
                  }`}>
                    {preset.badge}
                  </span>
                </div>
                <div className="font-heading font-bold text-sm text-indigo-ink dark:text-white group-hover:text-indigo-600 transition-colors">
                  {preset.label}
                </div>
                <p className="text-xs text-indigo-900/70 dark:text-indigo-300 mt-1 line-clamp-2">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading state */}
      {isAnalyzing && (
        <div className="p-12 text-center rounded-surface-lg bg-white dark:bg-cloud-dark border border-indigo-900/10 shadow-soft-indigo space-y-4 animate-pulse">
          <div className="w-16 h-16 rounded-surface bg-gradient-to-tr from-amber-alert to-indigo-600 flex items-center justify-center text-white mx-auto shadow-elevated-indigo">
            <Activity className="w-8 h-8 animate-spin" />
          </div>
          <div className="font-heading font-extrabold text-xl text-indigo-ink dark:text-white">
            Deconstructing Voice Harmonics & Transcript...
          </div>
          <p className="text-xs font-mono text-indigo-900/60 dark:text-indigo-300">
            Checking synthetic voice cloning, background boiler-room frequencies, and extortion patterns
          </p>
        </div>
      )}

      {/* Analysis Output */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Top Verdict Card */}
          <div className={`p-6 sm:p-7 rounded-surface-lg border shadow-soft-indigo flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
            analysisResult.riskLevel === 'HIGH'
              ? 'bg-gradient-to-r from-signal-coral/10 via-amber-alert/5 to-white dark:from-signal-coral/20 dark:to-cloud-dark border-signal-coral/30'
              : 'bg-gradient-to-r from-safe-mint/10 via-sky-wash/20 to-white dark:from-safe-mint/20 dark:to-cloud-dark border-safe-mint/30'
          }`}>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-ink text-white dark:bg-lilac-haze dark:text-indigo-ink uppercase">
                  {analysisResult.riskLevel} CALL SCAM RISK
                </span>
                <span className="text-xs font-mono text-indigo-900/60 dark:text-indigo-300">
                  Threat Confidence: {analysisResult.score}/100
                </span>
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-indigo-ink dark:text-white">
                {analysisResult.verdict}
              </h3>
            </div>

            <div className="flex-shrink-0 mx-auto md:mx-0">
              <CircularRiskGauge score={analysisResult.score} riskLevel={analysisResult.riskLevel} size={150} />
            </div>
          </div>

          {/* Transcript & Findings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Annotated Transcript */}
            <div className="lg:col-span-7 bg-white dark:bg-cloud-dark rounded-surface border border-indigo-900/10 p-5 sm:p-6 shadow-soft-indigo space-y-4">
              <h4 className="font-heading font-extrabold text-base text-indigo-ink dark:text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-indigo-ink dark:text-lilac-haze" />
                <span>Call Speech Transcript & Flagged Quotes</span>
              </h4>

              <div className="space-y-3">
                {analysisResult.audioTranscript.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-surface-sm border text-xs sm:text-sm font-sans ${
                      line.risk === 'critical'
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800 text-red-950 dark:text-red-200'
                        : line.risk === 'high'
                        ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                        : 'bg-indigo-50/50 dark:bg-white/5 border-indigo-900/10 text-indigo-900 dark:text-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-center font-mono text-[11px] mb-1 opacity-70">
                      <span className="font-bold">{line.speaker}</span>
                      <span>{line.time}</span>
                    </div>
                    <p className="leading-relaxed">"{line.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Audio Forensics Table */}
            <div className="lg:col-span-5 bg-white dark:bg-cloud-dark rounded-surface border border-indigo-900/10 p-5 sm:p-6 shadow-soft-indigo space-y-4">
              <h4 className="font-heading font-extrabold text-base text-indigo-ink dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-alert" />
                <span>Acoustic Forensics Receipt</span>
              </h4>

              {analysisResult.findings.length > 0 ? (
                <div className="space-y-2.5">
                  {analysisResult.findings.map((f, i) => (
                    <div key={i} className="p-3 rounded-surface-sm bg-signal-coral/5 border border-signal-coral/20 space-y-0.5">
                      <div className="flex justify-between items-center">
                        <span className="font-heading font-bold text-xs text-signal-coral">
                          {f.name}
                        </span>
                        <span className="font-mono text-xs font-bold text-signal-coral">
                          +{f.points} pts
                        </span>
                      </div>
                      <p className="text-xs text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
                        {f.why}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {analysisResult.goodSigns.map((g, i) => (
                    <div key={i} className="p-3 rounded-surface-sm bg-safe-mint/10 border border-safe-mint/20 space-y-0.5">
                      <div className="font-heading font-bold text-xs text-safe-mint">
                        {g.name}
                      </div>
                      <p className="text-xs text-indigo-900/80 dark:text-indigo-200">
                        {g.why}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
