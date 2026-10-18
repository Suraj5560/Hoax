import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  X,
  Send,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { GROQ_DEV_CONFIG } from '../../config/aiConfig.js';

export default function HoaxChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hello! I am your **Hoax AI Defense Assistant**. Ask me anything about our fraud tools, deepfake detection, call scam screening, or what to do if you encounter fraud.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Built-in intelligent cybersecurity knowledge engine
  const getBuiltInKnowledgeReply = (query) => {
    const q = query.toLowerCase();

    if (q.includes('video') || q.includes('deepfake') || q.includes('face') || q.includes('camera')) {
      return `### 🎥 Video & Deepfake Fraud Detection
Our **Video Scanner** uses computer vision heuristics to detect synthetic face swaps and extortion video calls:
- **Ocular Micro-Saccades & Blinking:** Deepfakes display abnormally low or irregular blink intervals (<4 blinks/min) or frozen pupil reflections.
- **Lip-Sync Desynchronization:** Measures the millisecond gap between mouth phonemes and spoken audio.
- **Digital Arrest Badges & Backdrop Spoofing:** Flags artificial police insignias and blurred, looped station backdrops.
- **Immediate In-Call Defense:** If you suspect an extortion call, ask the caller to **turn their head 90° or wave a hand across their face**; current real-time generative models glitch immediately!`;
    }

    if (q.includes('call') || q.includes('audio') || q.includes('voice') || q.includes('fedex') || q.includes('narcotics')) {
      return `### 📞 Call Recording & Audio Fraud Scanner
Our **Call Scanner** protects you from voice cloning and telephone extortion:
- **Synthetic Voice Cloning:** Evaluates speech harmonics for unnatural robotic prosody and absent respiratory pauses.
- **Contraband Extortion Scripts:** Flags threats alleging narcotics parcels (e.g. fake FedEx drug notices) or imminent police raids.
- **Ambient Signature Analysis:** Identifies looped police sirens or call-center boiler-room background hums.
- **Golden Rule:** Genuine police, CBI, and customs departments **NEVER** conduct inquiries, video court sessions, or bond transfers over telephone calls. Hang up and dial **1930**!`;
    }

    if (q.includes('otp') || q.includes('shared') || q.includes('money') || q.includes('scammed') || q.includes('emergency')) {
      return `### 🚨 Emergency Action Protocol (If OTP or Money Shared)
Take these steps immediately:
1. **Freeze Netbanking & Cards:** Call your bank fraud helpline (number printed on back of your card) or use your bank mobile app to lock cards and UPI handles.
2. **Call 1930 Immediately:** Dial **1930** (Toll-Free in India) to reach the Citizen Financial Cyber Fraud Reporting System. Reporting within the "golden hour" allows authorities to freeze stolen funds in transit.
3. **Lodge Incident at cybercrime.gov.in:** File an official police acknowledgement complaint with transaction IDs and chat screenshots.`;
    }

    if (q.includes('link') || q.includes('url') || q.includes('x-ray') || q.includes('xray') || q.includes('domain')) {
      return `### 🔍 Link X-Ray Deep Inspector
Our **Link X-Ray** tool deconstructs suspicious URLs into elemental components:
- **Protocol:** Flags insecure \`http://\` protocols.
- **Subdomain & Root Host:** Exposes deceptive tricks like \`sbi-kyc-update.example\`.
- **Letter-by-Letter Diff:** Compares the fake host directly against the official domain (e.g. \`sbi.co.in\`) to highlight inserted hyphens or lookalike characters.`;
    }

    if (q.includes('tuner') || q.includes('weights') || q.includes('score')) {
      return `### 🎛️ What-If Weight Tuner
The **What-If Tuner** lets you adjust the penalty weights for any rule (Urgency, Threat, Link, OTP Harvesting) and threshold boundaries. The active score and risk gauge recalculate live in real-time, proving 100% explainable, deterministic scoring!`;
    }

    if (q.includes('family') || q.includes('shield') || q.includes('whatsapp')) {
      return `### 🛡️ Family Shield Warning
The **Family Shield** tool generates a loving, non-technical WhatsApp alert formatted in English or Hinglish with warning emojis and direct action steps, paired with a one-click \`wa.me\` deep link to safeguard parents and elders.`;
    }

    return `### Hoax Defense Station
Hoax provides comprehensive multi-modal fraud detection:
- 📝 **Text & SMS Scanner:** 100% explainable Score Receipt, Link X-Ray, and What-If Tuner.
- 🎥 **Video Deepfake Scanner:** Detects AI avatars and fake police digital arrest calls.
- 📞 **Audio & Call Scanner:** Detects synthetic voice cloning and extortion scripts.
- 🛡️ **Family Shield:** 1-tap WhatsApp alert generator in English & Hinglish.
- 🚨 **Emergency Helpline:** National Cybercrime Portal helpline **1930**.

Ask me any specific question about scams or how to use these tools!`;
  };

  const handleSendMessage = async (userText = input) => {
    if (!userText || !userText.trim()) return;

    const query = userText.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setIsLoading(true);

    // If developer configured a Groq API Key in aiConfig.js, call Groq API invisibly
    if (GROQ_DEV_CONFIG.apiKey && GROQ_DEV_CONFIG.apiKey.startsWith('gsk_')) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_DEV_CONFIG.apiKey.trim()}`,
          },
          body: JSON.stringify({
            model: GROQ_DEV_CONFIG.model || 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content:
                  'You are Hoax AI, the autonomous fraud prevention assistant for the Hoax application. ' +
                  'Hoax provides multi-modal scam defense: 1) Text & SMS scam checking with explainable Score Receipts and Link X-Ray; ' +
                  '2) Video Deepfake scanning with ocular blink checks, lip-sync latency, and digital arrest fake police detection; ' +
                  '3) Call recording fraud analysis for voice cloning, boiler-room audio, and narcotics parcel extortion; ' +
                  '4) Family Shield WhatsApp warnings in English and Hinglish; 5) Emergency response with National Helpline 1930 and cybercrime.gov.in. ' +
                  'Provide clear, concise, compassionate, and authoritative answers formatted with bullet points and bold highlights.',
              },
              ...newMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: GROQ_DEV_CONFIG.temperature || 0.6,
            max_tokens: GROQ_DEV_CONFIG.max_tokens || 650,
          }),
        });

        if (!response.ok) {
          throw new Error(`Groq API returned status ${response.status}`);
        }

        const data = await response.json();
        const reply = data.choices[0]?.message?.content || getBuiltInKnowledgeReply(query);
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } catch (err) {
        console.warn('Backend Groq API error, using built-in engine:', err);
        const reply = getBuiltInKnowledgeReply(query);
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Fast built-in cybersecurity response
      setTimeout(() => {
        const reply = getBuiltInKnowledgeReply(query);
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-indigo-ink via-indigo-600 to-lilac-haze text-white shadow-elevated-indigo hover:shadow-glow-lilac transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
          title="Open Hoax AI Assistant"
          aria-label="Toggle Hoax AI Assistant"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
          <span className="sr-only">Toggle AI Assistant</span>
          {/* Pulsing online status dot */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-safe-mint border-2 border-white rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-safe-mint border-2 border-white rounded-full" />
        </button>
      </div>

      {/* Clean End-User Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] max-h-[80vh] bg-white dark:bg-cloud-dark rounded-surface-lg border border-indigo-900/15 dark:border-lilac-haze/20 shadow-elevated-indigo flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-surface-sm bg-lilac-haze/20 border border-lilac-haze/30 flex items-center justify-center text-lilac-haze">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>Hoax AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-safe-mint inline-block" />
                </h3>
                <p className="text-[11px] text-indigo-200">
                  Instant fraud guidance & feature companion
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-control text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-indigo-50/70 dark:bg-white/5 border-b border-indigo-900/10 dark:border-white/10 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSendMessage('How does deepfake video detection work?')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-white/10 border border-indigo-900/10 text-indigo-900 dark:text-indigo-200 whitespace-nowrap hover:bg-indigo-100 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              🎥 Deepfake detection
            </button>
            <button
              onClick={() => handleSendMessage('What should I do if I shared an OTP?')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-white/10 border border-indigo-900/10 text-indigo-900 dark:text-indigo-200 whitespace-nowrap hover:bg-indigo-100 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              🚨 Shared an OTP?
            </button>
            <button
              onClick={() => handleSendMessage('How do I analyze audio calls?')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-white/10 border border-indigo-900/10 text-indigo-900 dark:text-indigo-200 whitespace-nowrap hover:bg-indigo-100 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              📞 Call analyzer
            </button>
          </div>

          {/* Messages Stream */}
          <div className="p-4 space-y-3.5 flex-1 overflow-y-auto font-sans text-xs sm:text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-white/10 text-indigo-ink dark:text-lilac-haze flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-surface-sm max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-indigo-ink text-white rounded-tr-none'
                      : 'bg-cloud dark:bg-white/5 border border-indigo-900/10 dark:border-white/10 text-indigo-950 dark:text-indigo-100 rounded-tl-none shadow-xs'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-indigo-900/60 dark:text-indigo-300">
                <Bot className="w-4 h-4 animate-bounce" />
                <span>Hoax AI is formulating response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-cloud-dark border-t border-indigo-900/10 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about scam signs, deepfakes, or call fraud..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-control text-xs bg-cloud dark:bg-white/10 border border-indigo-900/15 dark:border-white/15 focus:outline-none focus:ring-1 focus:ring-indigo-ink text-indigo-950 dark:text-white placeholder:text-indigo-900/40 dark:placeholder:text-indigo-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-control bg-indigo-ink hover:bg-indigo-600 text-white disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
