'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Bot, Mic, Volume2, Eye, ArrowRight, Play, Pause, 
  CheckCircle2, Clock, Terminal, ChevronRight, RefreshCw, FileText,
  Calendar, CreditCard, ShoppingCart
} from 'lucide-react';

interface PlaygroundProps {
  onOpenProjectModal: () => void;
}

export default function PlaygroundShowcase({ onOpenProjectModal }: PlaygroundProps) {
  const [activeTab, setActiveTab] = useState<'cowork' | 'voice' | 'tts' | 'stt' | 'vision'>('cowork');

  // Cowork state
  const coworkTasks = [
    { id: 'automations', label: 'Workflow automations', prompt: 'Post a standup digest to Slack every weekday at 8:00', tool: 'Slack & Linear', skill: 'Skill: standup-digest' },
    { id: 'research', label: 'Market Research', prompt: 'Analyze enterprise adoption of autonomous AI agents in 2026', tool: 'Web & Perplexity', skill: 'Skill: deep-research' },
    { id: 'data', label: 'Data analysis', prompt: 'Aggregate AWS CloudWatch logs and query anomaly spikes over 500ms', tool: 'Datadog & AWS', skill: 'Skill: log-analyzer' },
    { id: 'presentations', label: 'Presentations', prompt: 'Generate an interactive 10-slide architectural proposal for client review', tool: 'Figma & PPTX', skill: 'Skill: deck-generator' },
    { id: 'integrations', label: 'Integrations', prompt: 'Sync Stripe subscription webhooks with PostgreSQL and send receipt PDF', tool: 'Stripe & Node.js', skill: 'Skill: webhook-router' },
  ];
  const [selectedCoworkTask, setSelectedCoworkTask] = useState(coworkTasks[0]);
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(3);

  const triggerCoworkRun = (task: typeof coworkTasks[0]) => {
    setSelectedCoworkTask(task);
    setIsAgentRunning(true);
    setAgentStep(0);
    setTimeout(() => setAgentStep(1), 600);
    setTimeout(() => setAgentStep(2), 1400);
    setTimeout(() => {
      setAgentStep(3);
      setIsAgentRunning(false);
    }, 2200);
  };

  // Voice Agents state
  const voiceAgents = [
    { id: 'cart', name: 'Cart Recovery Nudge', icon: ShoppingCart, initialDialog: [
      { sender: 'agent', text: 'Hi, I noticed you left high-performance cloud clusters in your cart. Would you like help configuring the deployment?' },
      { sender: 'user', text: 'Yes, but I need multi-region replication across US-East and Mumbai.' },
      { sender: 'agent', text: 'I can activate automated cross-region replication with sub-50ms latency for you right now.' },
    ]},
    { id: 'payment', name: 'EMI Payment Reminder', icon: CreditCard, initialDialog: [
      { sender: 'agent', text: 'Greetings! This is Nexitech Capital assistant regarding your invoice #4819 due tomorrow.' },
      { sender: 'user', text: 'Can I pay via instant UPI or corporate wire?' },
      { sender: 'agent', text: 'Both options are instantly reconciled. I just sent a secure one-click payment link to your registered SMS.' },
    ]},
    { id: 'appointment', name: 'Architecture Consultation', icon: Calendar, initialDialog: [
      { sender: 'agent', text: 'Hello! You requested a systems architecture consultation with Nexitech engineering leads.' },
      { sender: 'user', text: 'Do you have availability this Thursday at 3 PM IST?' },
      { sender: 'agent', text: 'Thursday at 3:00 PM is reserved for you with our Principal Architect. Calendar invite dispatched!' },
    ]},
  ];
  const [selectedAgent, setSelectedAgent] = useState(voiceAgents[0]);
  const [isVoiceCalling, setIsVoiceCalling] = useState(false);

  // TTS state
  const [selectedVoice, setSelectedVoice] = useState<'Aparna' | 'Shubh'>('Aparna');
  const [ttsText, setTtsText] = useState(
    'Welcome to Nexitech! We design and develop high-performance web applications, intelligent mobile apps, and enterprise AI platforms. Tell me, how can our engineering team accelerate your roadmap today?'
  );
  const [isPlayingTts, setIsPlayingTts] = useState(false);
  const scenes = [
    { title: 'Voice agent', tag: 'Aparna · Hindi · 24 kHz' },
    { title: 'Collections', tag: 'Aparna · Hinglish · 24 kHz' },
    { title: 'Healthcare', tag: 'Ishita · Hinglish · 24 kHz' },
    { title: 'Telephony', tag: 'Aparna · Hinglish · 8 kHz' },
    { title: 'Storytelling', tag: 'Roopa · English · 48 kHz' },
  ];
  const [selectedScene, setSelectedScene] = useState(scenes[0]);

  // Stop speech when changing tabs
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingTts(false);
      setIsVoiceCalling(false);
    };
  }, [activeTab]);

  const toggleVoiceCall = () => {
    if (!isVoiceCalling) {
      setIsVoiceCalling(true);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(selectedAgent.initialDialog[0].text);
        utterance.pitch = 1.05;
        utterance.rate = 1.0;
        utterance.onend = () => {
          // Keep active ring for visual immersion
        };
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsVoiceCalling(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const toggleTts = () => {
    if (typeof window === 'undefined') return;

    if (isPlayingTts) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingTts(false);
    } else {
      setIsPlayingTts(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(ttsText);
        const voices = window.speechSynthesis.getVoices();
        if (selectedVoice === 'Aparna') {
          const female = voices.find(v => 
            v.name.toLowerCase().includes('female') || 
            v.name.toLowerCase().includes('samantha') || 
            v.name.toLowerCase().includes('zira') || 
            v.name.toLowerCase().includes('veena') ||
            v.lang.includes('IN') || 
            v.lang.includes('en')
          );
          if (female) utterance.voice = female;
          utterance.pitch = 1.1;
          utterance.rate = 1.0;
        } else {
          const male = voices.find(v => 
            v.name.toLowerCase().includes('male') || 
            v.name.toLowerCase().includes('david') || 
            v.name.toLowerCase().includes('george') || 
            v.name.toLowerCase().includes('alex') ||
            v.name.toLowerCase().includes('rishi')
          );
          if (male) utterance.voice = male;
          utterance.pitch = 0.9;
          utterance.rate = 0.98;
        }
        utterance.onend = () => setIsPlayingTts(false);
        utterance.onerror = () => setIsPlayingTts(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlayingTts(false), 4000);
      }
    }
  };

  // STT state
  const [isRecordingStt, setIsRecordingStt] = useState(false);
  const [sttTranscript, setSttTranscript] = useState('Speak to see live real-time speech transcription...');

  const toggleStt = () => {
    if (!isRecordingStt) {
      setIsRecordingStt(true);
      setSttTranscript('Listening to microphone stream...');
      setTimeout(() => setSttTranscript('Deploying Next.js 15 application to multi-region Kubernetes cluster with automated zero-downtime rollouts...'), 1200);
      setTimeout(() => setSttTranscript('Deploying Next.js 15 application to multi-region Kubernetes cluster with automated zero-downtime rollouts. Latency verified at 18ms across all edge zones.'), 2800);
    } else {
      setIsRecordingStt(false);
    }
  };

  // Vision Slider state
  const [sliderPos, setSliderPos] = useState(50);
  const isDraggingSlider = useRef(false);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingSlider.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section id="showcase" className="relative mx-auto -mt-10 md:-mt-24 w-full overflow-x-clip playground-section py-12">
      {/* Background Gradient Blur from Sarvam */}
      <div
        className="hidden md:block -right-[10vw] bottom-[40%] md:bottom-[28%] -left-[10vw] absolute blur-[90px] h-1/5 md:h-2/5 pointer-events-none opacity-50"
        style={{
          transform: 'scaleY(1.2)',
          background: 'linear-gradient(180deg, #C7D2FE 0%, #A5B4FC 30%, #818CF8 50%, #A5B4FC 70%, #C7D2FE 100%)'
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-8 md:gap-14 mx-auto w-[92%] md:w-10/12 2xl:max-w-[1320px]">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3 w-full">
          <p className="font-matter text-sr-indigo-900 text-xs md:text-sm font-semibold tracking-widest uppercase">
            Interactive Product Demonstrations
          </p>
          <h2 className="font-season-mix font-medium leading-[1.15] tracking-tight w-full text-tx text-[32px] md:text-[46px]">
            The Platform Ambitious Teams Build On
          </h2>
          <p className="font-matter text-tx-secondary text-sm md:text-base max-w-xl">
            Explore live working demonstrations of our autonomous agents, voice intelligence, and engineering solutions.
          </p>
        </div>

        {/* Master Showcase Card Container */}
        <div className="relative w-full rounded-2xl md:rounded-3xl border border-white/20 outline outline-1 outline-white/10 bg-gradient-to-b from-black/15 to-black/5 backdrop-blur-xl p-1.5 shadow-xl">
          {/* Tabs Navigation */}
          <div className="relative z-10 flex items-center overflow-x-auto scrollbar-none gap-0 mb-0.5 rounded-t-xl md:rounded-t-2xl rounded-b-sm bg-sf-tertiary p-0.5" role="tablist">
            <button
              onClick={() => setActiveTab('cowork')}
              className={`type-body font-matter font-medium text-xs md:text-sm flex flex-1 items-center justify-center gap-2 px-4 md:px-6 py-3.5 whitespace-nowrap cursor-pointer transition-all duration-200 ${
                activeTab === 'cowork'
                  ? 'text-sr-indigo-800 bg-white shadow-[inset_0_0_6px_rgba(0,0,0,0.08)] border-st rounded-xl'
                  : 'text-tx-tertiary hover:text-tx'
              }`}
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span>Indus Cowork & Agents</span>
            </button>

            <button
              onClick={() => setActiveTab('voice')}
              className={`type-body font-matter font-medium text-xs md:text-sm flex flex-1 items-center justify-center gap-2 px-4 md:px-6 py-3.5 whitespace-nowrap cursor-pointer transition-all duration-200 ${
                activeTab === 'voice'
                  ? 'text-sr-indigo-800 bg-white shadow-[inset_0_0_6px_rgba(0,0,0,0.08)] border-st rounded-xl'
                  : 'text-tx-tertiary hover:text-tx'
              }`}
            >
              <Volume2 className="w-4 h-4 shrink-0" />
              <span>Voice Agents</span>
            </button>

            <button
              onClick={() => setActiveTab('tts')}
              className={`type-body font-matter font-medium text-xs md:text-sm flex flex-1 items-center justify-center gap-2 px-4 md:px-6 py-3.5 whitespace-nowrap cursor-pointer transition-all duration-200 ${
                activeTab === 'tts'
                  ? 'text-sr-indigo-800 bg-white shadow-[inset_0_0_6px_rgba(0,0,0,0.08)] border-st rounded-xl'
                  : 'text-tx-tertiary hover:text-tx'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Text to Speech</span>
            </button>

            <button
              onClick={() => setActiveTab('stt')}
              className={`type-body font-matter font-medium text-xs md:text-sm flex flex-1 items-center justify-center gap-2 px-4 md:px-6 py-3.5 whitespace-nowrap cursor-pointer transition-all duration-200 ${
                activeTab === 'stt'
                  ? 'text-sr-indigo-800 bg-white shadow-[inset_0_0_6px_rgba(0,0,0,0.08)] border-st rounded-xl'
                  : 'text-tx-tertiary hover:text-tx'
              }`}
            >
              <Mic className="w-4 h-4 shrink-0" />
              <span>Speech to Text</span>
            </button>

            <button
              onClick={() => setActiveTab('vision')}
              className={`type-body font-matter font-medium text-xs md:text-sm flex flex-1 items-center justify-center gap-2 px-4 md:px-6 py-3.5 whitespace-nowrap cursor-pointer transition-all duration-200 ${
                activeTab === 'vision'
                  ? 'text-sr-indigo-800 bg-white shadow-[inset_0_0_6px_rgba(0,0,0,0.08)] border-st rounded-xl'
                  : 'text-tx-tertiary hover:text-tx'
              }`}
            >
              <Eye className="w-4 h-4 shrink-0" />
              <span>Document Digitisation</span>
            </button>
          </div>

          {/* Tab 1: Indus Cowork / Autonomous Agents */}
          {activeTab === 'cowork' && (
            <div className="relative w-full bg-sf rounded-t-sm rounded-b-xl md:rounded-b-[20px] overflow-hidden p-6 md:p-12 min-h-[540px] flex flex-col justify-center items-center">
              {/* Subtle background radial aura */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 55% at 50% 0%, var(--color-sr-indigo-200) 0%, transparent 70%), linear-gradient(180deg, var(--color-sr-indigo-50) 0%, #ffffff 100%)'
                }}
              />

              <div className="relative flex flex-col gap-5 w-full max-w-[780px] z-10">
                {/* Task selection chips */}
                <div className="flex justify-start md:justify-center gap-2 overflow-x-auto scrollbar-none py-1">
                  {coworkTasks.map(t => (
                    <button
                      key={t.id}
                      onClick={() => triggerCoworkRun(t)}
                      className={`px-4 py-2 rounded-full font-matter text-xs md:text-sm whitespace-nowrap cursor-pointer transition-all active:scale-[0.97] border ${
                        selectedCoworkTask.id === t.id
                          ? 'bg-white text-tx font-medium border-st shadow-xs'
                          : 'bg-white/60 text-tx-secondary border-transparent hover:bg-white/90'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Prompt Card Box */}
                <div className="flex flex-col gap-3 bg-white p-4 md:p-5 border border-st rounded-3xl shadow-sm">
                  <div className="flex flex-col gap-3 px-4 pt-4 pb-3 border border-st rounded-2xl bg-sf-secondary/40">
                    <p className="min-h-[1.75rem] font-matter text-tx text-base md:text-lg font-medium">
                      {selectedCoworkTask.prompt}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-st/60">
                      <div className="flex items-center gap-2 text-xs font-matter text-tx-tertiary">
                        <span>Connected Tool:</span>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-st font-medium text-tx-secondary">
                          {selectedCoworkTask.tool}
                        </span>
                      </div>
                      <button
                        onClick={() => triggerCoworkRun(selectedCoworkTask)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sr-slate text-white text-xs font-medium hover:bg-black transition-colors cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isAgentRunning ? 'animate-spin' : ''}`} />
                        <span>Run Task</span>
                      </button>
                    </div>
                  </div>

                  {/* Step Execution Sequence */}
                  <div className="flex flex-col gap-3 px-2 pt-2 font-matter text-sm">
                    <div className={`flex items-center gap-2.5 transition-opacity ${agentStep >= 1 ? 'opacity-100 text-tx' : 'opacity-40 text-tx-tertiary'}`}>
                      {agentStep === 1 ? (
                        <div className="w-4 h-4 border-2 border-sr-indigo-600 border-t-transparent rounded-full animate-spin shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-sr-indigo-600 shrink-0" />
                      )}
                      <span>Scanning connected databases, repositories, and real-time feeds</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-sr-indigo-50 text-sr-indigo-700 ml-auto hidden sm:inline">
                        {selectedCoworkTask.skill}
                      </span>
                    </div>

                    <div className={`flex items-center gap-2.5 transition-opacity ${agentStep >= 2 ? 'opacity-100 text-tx' : 'opacity-40 text-tx-tertiary'}`}>
                      {agentStep === 2 ? (
                        <div className="w-4 h-4 border-2 border-sr-indigo-600 border-t-transparent rounded-full animate-spin shrink-0" />
                      ) : agentStep > 2 ? (
                        <CheckCircle2 className="w-4 h-4 text-sr-indigo-600 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-tx-tertiary shrink-0" />
                      )}
                      <span>Synthesizing multi-modal context & orchestrating task execution</span>
                    </div>

                    <div className={`flex items-center gap-2.5 transition-opacity ${agentStep >= 3 ? 'opacity-100 text-tx' : 'opacity-40 text-tx-tertiary'}`}>
                      {agentStep >= 3 ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-tx-tertiary shrink-0" />
                      )}
                      <span>Task completed successfully · Report and workflow outputs dispatched</span>
                    </div>
                  </div>

                  {/* Result Box */}
                  <div className="mt-2 p-3.5 rounded-2xl bg-sf-secondary border border-st text-xs font-matter text-tx-secondary flex items-center justify-between">
                    <span className="truncate"><strong>Status:</strong> Ready for team review & automated delivery</span>
                    <button
                      onClick={onOpenProjectModal}
                      className="text-sr-indigo-700 font-semibold hover:underline shrink-0 ml-3"
                    >
                      Build this agent →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Voice Agents */}
          {activeTab === 'voice' && (
            <div className="relative w-full bg-sf rounded-t-sm rounded-b-xl md:rounded-b-[20px] overflow-hidden min-h-[540px] grid grid-cols-1 lg:grid-cols-3">
              {/* Left Column: Agent Selector */}
              <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-st-secondary flex flex-col gap-4">
                <p className="font-matter text-xs font-semibold uppercase tracking-wider text-tx-tertiary">
                  Select an Agent Experience
                </p>
                <div className="flex flex-col gap-2">
                  {voiceAgents.map(va => {
                    const active = selectedAgent.id === va.id;
                    const Icon = va.icon;
                    return (
                      <button
                        key={va.id}
                        onClick={() => {
                          setSelectedAgent(va);
                          setIsVoiceCalling(false);
                        }}
                        className={`flex items-center gap-3.5 p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                          active
                            ? 'bg-sr-indigo-50/70 border-sr-indigo-200 text-sr-indigo-900 shadow-2xs'
                            : 'bg-white border-transparent hover:bg-sf-secondary text-tx'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${active ? 'bg-sr-indigo-700 text-white' : 'bg-sf-secondary text-tx-secondary'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-matter font-medium text-sm">{va.name}</div>
                          <div className="text-xs text-tx-tertiary">Autonomous Voice Model</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-auto pt-4 text-xs font-matter text-tx-tertiary">
                  Ultra-low latency speech-to-speech engine powered by frontier voice neural networks.
                </div>
              </div>

              {/* Middle Column: Voice Orb & Call State */}
              <div className="p-8 flex flex-col items-center justify-center bg-sf-secondary border-b lg:border-b-0 lg:border-r border-st-secondary relative">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Glowing Canvas Rings */}
                  <div className={`absolute inset-0 rounded-full border-2 border-sr-indigo-400/30 ${isVoiceCalling ? 'animate-ping' : ''}`} />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-sr-indigo-600 via-sr-indigo-400 to-orange-400 opacity-80 blur-xl" />
                  <div className="relative z-10 w-32 h-32 rounded-full bg-sr-slate flex flex-col items-center justify-center text-white shadow-xl">
                    <Mic className={`w-8 h-8 ${isVoiceCalling ? 'text-orange-400 animate-pulse' : 'text-white/80'}`} />
                    <span className="text-[11px] font-matter mt-1 font-medium tracking-wide">
                      {isVoiceCalling ? 'Speaking...' : 'Ready'}
                    </span>
                  </div>
                </div>

                <p className="mt-4 font-matter text-sm font-medium text-tx">
                  {selectedAgent.name}
                </p>

                <button
                  onClick={toggleVoiceCall}
                  className={`mt-4 px-6 py-2.5 rounded-full font-matter text-xs font-semibold transition-all active:scale-95 shadow-sm cursor-pointer ${
                    isVoiceCalling
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-sr-slate text-white hover:bg-black'
                  }`}
                >
                  {isVoiceCalling ? 'End Call' : 'Start Voice Call'}
                </button>
              </div>

              {/* Right Column: Live Transcript */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-st-secondary">
                    <span className="font-matter text-xs font-semibold uppercase tracking-wider text-tx-tertiary">
                      Live Illustrative Transcript
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">
                      24 kHz HD
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 mt-4 max-h-[300px] overflow-y-auto pr-1">
                    {selectedAgent.initialDialog.map((line, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl text-xs font-matter leading-relaxed max-w-[85%] ${
                          line.sender === 'agent'
                            ? 'bg-sr-indigo-50 text-sr-indigo-950 mr-auto rounded-bl-xs'
                            : 'bg-orange-50 text-orange-950 ml-auto rounded-br-xs border border-orange-100'
                        }`}
                      >
                        {line.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-st-secondary mt-4">
                  <button
                    onClick={onOpenProjectModal}
                    className="w-full py-2.5 rounded-full bg-sr-slate text-white text-xs font-matter font-medium hover:bg-black transition-colors"
                  >
                    Build your custom voice agent →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Text to Speech */}
          {activeTab === 'tts' && (
            <div className="relative w-full bg-sf rounded-t-sm rounded-b-xl md:rounded-b-[20px] overflow-hidden min-h-[540px] p-6 md:p-10 flex flex-col md:grid md:grid-cols-[1fr_1px_380px] gap-6">
              {/* Text Input Side */}
              <div className="flex flex-col justify-between gap-4">
                <div>
                  {/* Voice selector */}
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => setSelectedVoice('Aparna')}
                      className={`px-4 py-1.5 rounded-full font-matter text-xs transition-colors cursor-pointer ${
                        selectedVoice === 'Aparna'
                          ? 'bg-sr-slate text-white font-medium'
                          : 'bg-sf-secondary text-tx-secondary hover:bg-gray-100'
                      }`}
                    >
                      Aparna · Female
                    </button>
                    <button
                      onClick={() => setSelectedVoice('Shubh')}
                      className={`px-4 py-1.5 rounded-full font-matter text-xs transition-colors cursor-pointer ${
                        selectedVoice === 'Shubh'
                          ? 'bg-sr-slate text-white font-medium'
                          : 'bg-sf-secondary text-tx-secondary hover:bg-gray-100'
                      }`}
                    >
                      Shubh · Male
                    </button>
                    <span className="ml-auto text-xs font-matter text-tx-tertiary">
                      {ttsText.length} / 2,000
                    </span>
                  </div>

                  <textarea
                    rows={7}
                    value={ttsText}
                    onChange={e => setTtsText(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-st bg-sf-secondary/40 font-matter text-sm md:text-base text-tx focus:outline-none focus:border-sr-indigo-600 focus:ring-1 focus:ring-sr-indigo-600 leading-relaxed resize-none"
                    placeholder="Enter text to synthesize into speech..."
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-matter text-tx-tertiary">
                      {selectedScene.tag} · Neural Audio
                    </span>
                    {isPlayingTts && (
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-2.5 bg-sr-indigo-600 rounded-full animate-pulse" />
                        <span className="w-1 h-4 bg-sr-indigo-600 rounded-full animate-bounce" />
                        <span className="w-1 h-2 bg-sr-indigo-600 rounded-full animate-pulse" />
                        <span className="w-1 h-3.5 bg-sr-indigo-600 rounded-full animate-bounce" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={toggleTts}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-sr-slate text-white text-xs font-matter font-medium hover:bg-black transition-colors cursor-pointer"
                  >
                    {isPlayingTts ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingTts ? 'Pause Audio' : 'Synthesize & Play'}</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block bg-st-secondary w-px h-full" />

              {/* Preset Scenes */}
              <div className="flex flex-col justify-between gap-4">
                <div>
                  <h4 className="font-matter font-medium text-sm text-tx mb-3">
                    Preset Audio Scenes
                  </h4>
                  <div className="flex flex-col gap-2">
                    {scenes.map(s => {
                      const active = selectedScene.title === s.title;
                      return (
                        <button
                          key={s.title}
                          onClick={() => {
                            setSelectedScene(s);
                            setIsPlayingTts(true);
                          }}
                          className={`flex items-center justify-between p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                            active
                              ? 'bg-sr-indigo-50 border-sr-indigo-200 text-sr-indigo-900'
                              : 'bg-white border-st hover:bg-sf-secondary text-tx'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-xs font-matter">{s.title}</div>
                            <div className="text-[11px] text-tx-tertiary">{s.tag}</div>
                          </div>
                          <Play className="w-3.5 h-3.5 text-tx-tertiary" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={onOpenProjectModal}
                  className="w-full py-2.5 rounded-full border border-st bg-white text-tx text-xs font-matter font-medium hover:bg-sf-secondary transition-colors"
                >
                  Explore Nexitech Voice API →
                </button>
              </div>
            </div>
          )}

          {/* Tab 4: Speech to Text */}
          {activeTab === 'stt' && (
            <div className="relative w-full bg-sf rounded-t-sm rounded-b-xl md:rounded-b-[20px] overflow-hidden min-h-[540px] p-8 md:p-16 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-sr-indigo-50 flex items-center justify-center text-sr-indigo-700 mb-6 shadow-sm">
                <Mic className={`w-9 h-9 ${isRecordingStt ? 'text-red-500 animate-pulse' : ''}`} />
              </div>

              <div className="max-w-xl min-h-[90px] flex items-center justify-center">
                <p className="font-season-mix text-xl md:text-3xl text-tx leading-relaxed">
                  &ldquo;{sttTranscript}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <button
                  onClick={toggleStt}
                  className={`px-8 py-3.5 rounded-full font-matter text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer ${
                    isRecordingStt
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-sr-slate text-white hover:bg-black'
                  }`}
                >
                  {isRecordingStt ? 'Stop Recording' : 'Start Speaking Simulation'}
                </button>

                <p className="text-xs font-matter text-tx-tertiary">
                  Zero-latency speech recognition across 22+ languages and regional dialects.
                </p>
              </div>
            </div>
          )}

          {/* Tab 5: Document & Vision Intelligence (Split Slider) */}
          {activeTab === 'vision' && (
            <div className="relative w-full bg-sf rounded-t-sm rounded-b-xl md:rounded-b-[20px] overflow-hidden min-h-[540px] flex flex-col lg:flex-row">
              {/* Interactive Comparison Slider */}
              <div
                className="relative flex-1 min-h-[380px] lg:min-h-[540px] select-none cursor-ew-resize overflow-hidden bg-sf-secondary"
                onMouseDown={() => (isDraggingSlider.current = true)}
                onMouseUp={() => (isDraggingSlider.current = false)}
                onMouseLeave={() => (isDraggingSlider.current = false)}
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
                onTouchStart={() => (isDraggingSlider.current = true)}
                onTouchEnd={() => (isDraggingSlider.current = false)}
              >
                {/* Background Side: Extracted Structured JSON/Markdown */}
                <div className="absolute inset-0 p-8 md:p-12 bg-white flex flex-col justify-center">
                  <div className="p-2 w-fit px-3 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-4 border border-green-200">
                    Structured OCR & Entity Extraction
                  </div>
                  <pre className="font-mono text-xs md:text-sm text-tx-secondary bg-sf-secondary p-5 rounded-2xl border border-st overflow-x-auto leading-relaxed">
{`{
  "document_type": "Enterprise Master Agreement",
  "contract_id": "NX-2026-9041",
  "client": "Tata Capital Digital Division",
  "scope": [
    "Autonomous Voice Copilots",
    "Real-time Audio Synthesis",
    "Private VPC Kubernetes Cluster"
  ],
  "confidence_score": 0.9984,
  "verified_entities": {
    "effective_date": "2026-10-15",
    "sla_tier": "99.99% Enterprise Critical"
  }
}`}
                  </pre>
                </div>

                {/* Foreground Side: Scanned Document Mockup */}
                <div
                  className="absolute inset-y-0 left-0 bg-sf-secondary border-r-2 border-sr-indigo-600 overflow-hidden flex flex-col justify-center p-8 md:p-12"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="p-2 w-fit px-3 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold mb-4 border border-orange-200 whitespace-nowrap">
                    Raw Unstructured Document Scan
                  </div>
                  <div className="w-[450px] p-5 rounded-2xl bg-white border border-st shadow-xs text-xs font-serif text-tx-secondary leading-relaxed opacity-75">
                    <p className="font-bold text-sm text-tx mb-2">MASTER SERVICES AGREEMENT</p>
                    <p className="mb-2">This Agreement is made on 15 October 2026 by and between Nexitech Solutions and Enterprise Partner.</p>
                    <p className="mb-2">1. Scope: High-availability microservices architecture, voice agent orchestration, and automated data pipelines.</p>
                    <p>2. Performance: Sub-30ms execution with 99.99% uptime guarantee.</p>
                  </div>
                </div>

                {/* Handle Marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-sr-indigo-600 text-white flex items-center justify-center shadow-lg pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <span className="text-[10px] font-bold">⇄</span>
                </div>
              </div>

              {/* Vision Options / Sidebar */}
              <div className="w-full lg:w-80 p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-st-secondary bg-white flex flex-col justify-between">
                <div>
                  <h4 className="font-matter font-medium text-sm text-tx mb-2">
                    Multimodal Document AI
                  </h4>
                  <p className="font-matter text-xs text-tx-secondary mb-4 leading-relaxed">
                    Drag the slider to compare raw scans against entity-extracted structured data.
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-sf-secondary border border-st text-xs font-matter">
                      <span className="font-semibold text-tx">Accurate Tables:</span> 100% cell coordinate preservation
                    </div>
                    <div className="p-3 rounded-xl bg-sf-secondary border border-st text-xs font-matter">
                      <span className="font-semibold text-tx">Multi-lingual OCR:</span> English, Hindi, Tamil, Telugu
                    </div>
                    <div className="p-3 rounded-xl bg-sf-secondary border border-st text-xs font-matter">
                      <span className="font-semibold text-tx">Direct JSON Export:</span> Straight into your database
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenProjectModal}
                  className="mt-6 w-full py-2.5 rounded-full bg-sr-slate text-white text-xs font-matter font-medium hover:bg-black transition-colors"
                >
                  Try Document Digitisation →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
