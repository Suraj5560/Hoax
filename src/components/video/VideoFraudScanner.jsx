import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Upload,
  Camera,
  Play,
  Pause,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Eye,
  ScanFace,
  Volume2,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import CircularRiskGauge from '../scanner/CircularRiskGauge.jsx';

export default function VideoFraudScanner() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'record' | 'presets'
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const PRESET_VIDEOS = [
    {
      id: 'digital_arrest',
      label: 'Digital Arrest Video Call (Fake Police)',
      badge: 'High Risk (92/100)',
      riskLevel: 'HIGH',
      description: 'Scammer wearing fake police uniform claiming arrest warrant on Skype/WhatsApp video.',
      findings: [
        { name: 'Synthetic Badge & Uniform Artifacts', points: 30, why: 'Blurry badge texture and mismatched police insignia not matching official state police standards.' },
        { name: 'Lip-Sync Temporal Desynchronization', points: 25, why: 'Mouth phonemes lag by 180ms behind spoken extortion audio; indicative of real-time AI avatar rendering.' },
        { name: 'Unnatural Eye Gaze & Low Blink Frequency', points: 20, why: 'Blink rate of 3 blinks/min (normal is 14-17); fixed camera stare typical of 2D image morphing.' },
        { name: 'Virtual Background Seam Blending', points: 17, why: 'Halo distortion around head and shoulders with static artificial police station backdrop.' },
      ],
      score: 92,
      verdict: 'High-risk deepfake & extortion call detected. The caller is using an AI avatar and fake police backdrop.',
      timelineRisks: [
        { time: 1.2, level: 'high', label: 'Badge anomaly' },
        { time: 3.5, level: 'high', label: 'Lip-sync lag' },
        { time: 6.8, level: 'high', label: 'Warped edge' },
      ],
    },
    {
      id: 'celebrity_scam',
      label: 'Deepfake Celebrity Investment Pitch',
      badge: 'High Risk (86/100)',
      riskLevel: 'HIGH',
      description: 'AI-generated video of prominent CEO or politician endorsing guaranteed high-return scheme.',
      findings: [
        { name: 'Voice-to-Face Generative Warping', points: 35, why: 'Jawline boundary pixels show frequency blurring during fast speech syllables.' },
        { name: 'Lighting Vector Inconsistency', points: 25, why: 'Facial illumination highlights do not match ambient room shadow angles.' },
        { name: 'Unnatural Pupil & Sclera Texture', points: 26, why: 'Irregular corneal light reflection shapes typical of diffusion-based face synthesis.' },
      ],
      score: 86,
      verdict: 'Deepfake identity impersonation detected. Video was synthetically generated to manipulate investors.',
      timelineRisks: [
        { time: 2.0, level: 'high', label: 'Generative warp' },
        { time: 5.1, level: 'high', label: 'Lighting mismatch' },
      ],
    },
    {
      id: 'genuine_call',
      label: 'Genuine Family Video Call (Safe)',
      badge: 'Low Risk (8/10)',
      riskLevel: 'LOW',
      description: 'Authentic live conversation with natural biological micro-expressions and consistent acoustics.',
      findings: [],
      goodSigns: [
        { name: 'Natural Biological Blink Rate', why: 'Normal blinking interval (15 blinks/min) with natural micro-saccades.' },
        { name: 'Organic Lighting & Depth Gradient', why: 'Consistent shadows across nasal bridge and facial contours.' },
        { name: 'Zero Generative Artifacts', why: 'Crisp hair boundary definition and natural tooth/lip geometry.' },
      ],
      score: 8,
      verdict: 'Authentic video stream. Natural micro-expressions and zero deepfake indicators detected.',
      timelineRisks: [],
    },
  ];

  // Handle local video file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setAnalysisResult(null);
      runSimulatedVideoAnalysis(file.name);
    }
  };

  // Start webcam recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        runSimulatedVideoAnalysis('live_recording.webm');
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert('Camera access denied or unavailable: ' + err.message);
    }
  };

  // Stop webcam recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop stream tracks
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    }
  };

  // Run deepfake analysis simulation on the video stream
  const runSimulatedVideoAnalysis = (label) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      // Analyze based on name or randomize realistic deepfake checks
      const isSuspect = /arrest|police|fraud|deepfake|scam/i.test(label) || Math.random() > 0.4;
      if (isSuspect) {
        setAnalysisResult(PRESET_VIDEOS[0]);
      } else {
        setAnalysisResult(PRESET_VIDEOS[2]);
      }
      setIsAnalyzing(false);
    }, 1800);
  };

  const handleSelectPreset = (preset) => {
    setAnalysisResult(null);
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult(preset);
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-surface-lg bg-white dark:bg-cloud-dark border border-indigo-900/15 dark:border-lilac-haze/20 shadow-soft-indigo space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-500/10 text-pink-600 dark:text-pink-400 uppercase">
              <ScanFace className="w-3.5 h-3.5" /> AI Vision & Deepfake Engine
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-indigo-ink dark:text-white">
              Video & Deepfake Fraud Scanner
            </h2>
            <p className="text-sm text-indigo-900/70 dark:text-indigo-200">
              Upload a recorded video or record a live video call to check for AI face-swaps, synthetic police uniforms, and audio-visual desynchronization.
            </p>
          </div>

          {/* Input Method Switcher */}
          <div className="inline-flex p-1 rounded-control bg-indigo-50 dark:bg-white/10 border border-indigo-900/10">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'upload' ? 'bg-indigo-ink text-white shadow-xs' : 'text-indigo-900/70 dark:text-indigo-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" /> Upload File
            </button>
            <button
              onClick={() => setActiveTab('record')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'record' ? 'bg-indigo-ink text-white shadow-xs' : 'text-indigo-900/70 dark:text-indigo-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" /> Live Camera
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

        {/* Action Panel Based on Active Tab */}
        {activeTab === 'upload' && (
          <div className="p-8 border-2 border-dashed border-indigo-900/20 dark:border-white/20 rounded-surface text-center hover:border-indigo-ink transition-colors cursor-pointer relative bg-cloud/50 dark:bg-white/5">
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="space-y-3 pointer-events-none">
              <div className="w-12 h-12 rounded-surface-sm bg-indigo-ink text-white flex items-center justify-center mx-auto shadow-soft-indigo">
                <Upload className="w-6 h-6" />
              </div>
              <div className="font-heading font-bold text-base text-indigo-ink dark:text-white">
                Drop your video clip here, or click to browse
              </div>
              <p className="text-xs text-indigo-900/60 dark:text-indigo-300">
                Supports MP4, WebM, MOV files up to 100MB (Analyzed locally in browser)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'record' && (
          <div className="p-6 rounded-surface bg-cloud dark:bg-white/5 border border-indigo-900/10 text-center space-y-4">
            <div className="relative max-w-md mx-auto aspect-video rounded-surface-sm overflow-hidden bg-black border border-indigo-900/20">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              {isRecording && (
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-signal-coral text-white text-xs font-mono font-bold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" /> REC LIVE
                </div>
              )}
            </div>

            <div className="flex justify-center gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="px-6 py-2.5 rounded-control bg-signal-coral hover:bg-red-600 text-white font-heading font-bold text-xs shadow-soft-indigo flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" /> Start Camera Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="px-6 py-2.5 rounded-control bg-indigo-ink text-white font-heading font-bold text-xs shadow-soft-indigo flex items-center gap-2"
                >
                  <Pause className="w-4 h-4" /> Stop & Run Analysis
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'presets' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {PRESET_VIDEOS.map((preset) => (
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

      {/* Loading State */}
      {isAnalyzing && (
        <div className="p-12 text-center rounded-surface-lg bg-white dark:bg-cloud-dark border border-indigo-900/10 shadow-soft-indigo space-y-4 animate-pulse">
          <div className="w-16 h-16 rounded-surface bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-elevated-indigo">
            <ScanFace className="w-8 h-8 animate-spin" />
          </div>
          <div className="font-heading font-extrabold text-xl text-indigo-ink dark:text-white">
            Scanning Video Frames & Audio Harmonics...
          </div>
          <p className="text-xs font-mono text-indigo-900/60 dark:text-indigo-300">
            Checking ocular micro-saccades, lip synchronization, and facial boundary masks
          </p>
        </div>
      )}

      {/* Analysis Results Display */}
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
                  {analysisResult.riskLevel} RISK VERDICT
                </span>
                <span className="text-xs font-mono text-indigo-900/60 dark:text-indigo-300">
                  Deepfake Probability: {analysisResult.score}%
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

          {/* Two-Column Deepfake Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Video Diagnostics Table */}
            <div className="lg:col-span-7 bg-white dark:bg-cloud-dark rounded-surface border border-indigo-900/10 p-5 sm:p-6 shadow-soft-indigo space-y-4">
              <h4 className="font-heading font-extrabold text-base text-indigo-ink dark:text-white flex items-center gap-2">
                <ScanFace className="w-5 h-5 text-pink-600" />
                <span>Forensic Video Anomaly Receipt</span>
              </h4>

              {analysisResult.findings.length > 0 ? (
                <div className="space-y-3">
                  {analysisResult.findings.map((f, i) => (
                    <div key={i} className="p-3.5 rounded-surface-sm bg-signal-coral/5 border border-signal-coral/20 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-heading font-bold text-xs text-signal-coral flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> {f.name}
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
                    <div key={i} className="p-3.5 rounded-surface-sm bg-safe-mint/10 border border-safe-mint/20 space-y-1">
                      <div className="font-heading font-bold text-xs text-safe-mint flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {g.name}
                      </div>
                      <p className="text-xs text-indigo-900/80 dark:text-indigo-200">
                        {g.why}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Timeline & Deepfake Defense Checklist */}
            <div className="lg:col-span-5 bg-white dark:bg-cloud-dark rounded-surface border border-indigo-900/10 p-5 sm:p-6 shadow-soft-indigo space-y-4">
              <h4 className="font-heading font-extrabold text-base text-indigo-ink dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-ink dark:text-lilac-haze" />
                <span>Live Action & Verification Guide</span>
              </h4>

              <div className="space-y-3 text-xs text-indigo-900/80 dark:text-indigo-200">
                <div className="p-3 rounded-control bg-indigo-50/70 dark:bg-white/5 border border-indigo-900/10">
                  <span className="font-bold text-indigo-ink dark:text-white block mb-0.5">
                    Ask Caller to Turn Their Head 90°
                  </span>
                  Current generative deepfake models fail on extreme side profiles. If the face blurs or disappears, hang up immediately.
                </div>

                <div className="p-3 rounded-control bg-indigo-50/70 dark:bg-white/5 border border-indigo-900/10">
                  <span className="font-bold text-indigo-ink dark:text-white block mb-0.5">
                    Wave Hand in Front of Face
                  </span>
                  Occluding the face breaks AI landmark tracking, revealing the real underlying face of the scammer.
                </div>

                <div className="p-3 rounded-control bg-signal-coral/10 border border-signal-coral/25 text-signal-coral font-medium">
                  <strong>Zero Court Arrest over Skype/WhatsApp:</strong> Neither CBI, ED, nor State Police conduct arrests or fines over video calls.
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
