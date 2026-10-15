'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Clock, Users, ShieldCheck, Sparkles } from 'lucide-react';

interface ProjectEstimatorProps {
  onOpenProjectModal: () => void;
}

export default function ProjectEstimator({ onOpenProjectModal }: ProjectEstimatorProps) {
  const [selectedService, setSelectedService] = useState<'web' | 'mobile' | 'ai' | 'fullstack'>('web');
  const [tier, setTier] = useState<'mvp' | 'scale' | 'enterprise'>('scale');
  const [timeline, setTimeline] = useState<'fast' | 'standard'>('standard');

  const configs = {
    web: {
      title: 'Full-Stack Web & SaaS Platform',
      stack: 'Next.js 15, TypeScript, PostgreSQL, Tailwind, Edge Caching',
      mvp: { time: '4–6 weeks', pod: '1 Lead Architect, 1 Senior Full-Stack Engineer, 1 Designer', budget: '$12,000 – $20,000' },
      scale: { time: '8–12 weeks', pod: '1 Tech Lead, 2 Senior Engineers, 1 Product Designer, 1 QA', budget: '$25,000 – $45,000' },
      enterprise: { time: '14–20 weeks', pod: 'Dedicated Pod: 4 Engineers, Architect, PM, Security Lead', budget: '$55,000 – $95,000' },
    },
    mobile: {
      title: 'Native Mobile Application',
      stack: 'React Native, Swift/Kotlin native modules, SQLite, Push Notifications',
      mvp: { time: '6–8 weeks', pod: '1 Mobile Lead, 1 Senior React Native Engineer, 1 Designer', budget: '$15,000 – $24,000' },
      scale: { time: '10–14 weeks', pod: '1 Tech Lead, 2 Mobile Engineers, 1 Backend Engineer, 1 QA', budget: '$30,000 – $55,000' },
      enterprise: { time: '16–24 weeks', pod: 'Dedicated Mobile Pod: iOS/Android native specialists, PM', budget: '$60,000 – $110,000' },
    },
    ai: {
      title: 'Autonomous AI & Intelligent Agents',
      stack: 'Frontier LLM swarm, LangChain, PyTorch, Speech-to-Speech, Vector DB',
      mvp: { time: '4–6 weeks', pod: '1 AI Research Engineer, 1 Full-Stack Integration Engineer', budget: '$18,000 – $28,000' },
      scale: { time: '8–12 weeks', pod: '1 Lead AI Architect, 2 Machine Learning Engineers, 1 Full-Stack', budget: '$35,000 – $65,000' },
      enterprise: { time: '12–18 weeks', pod: 'Dedicated AI Pod: Fine-tuning specialists, Vector Infra, QA', budget: '$70,000 – $130,000' },
    },
    fullstack: {
      title: 'End-to-End Enterprise Ecosystem',
      stack: 'Web SaaS + Mobile Apps + Autonomous AI Agents + Multi-Region Cloud',
      mvp: { time: '8–10 weeks', pod: 'Cross-functional Pod: 3 Engineers, 1 Designer, 1 Architect', budget: '$35,000 – $55,000' },
      scale: { time: '14–18 weeks', pod: 'Full Engineering Squad: 5 Engineers, Architect, PM, QA Lead', budget: '$65,000 – $110,000' },
      enterprise: { time: '20–28 weeks', pod: 'Enterprise Forward Deployed Division: Multi-pod dedicated squad', budget: '$120,000 – $220,000' },
    }
  };

  const currentConfig = configs[selectedService];
  const currentEstimate = currentConfig[tier];

  return (
    <section id="process" className="mx-auto w-[92%] md:w-10/12 max-w-[1320px] py-16">
      <div className="rounded-3xl border border-st bg-white p-8 md:p-14 shadow-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-st-secondary">
          <div>
            <div className="flex items-center gap-2 text-sr-indigo-900 font-semibold text-xs tracking-wider uppercase mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Scope & Investment Estimator</span>
            </div>
            <h2 className="font-season-mix text-3xl md:text-[38px] text-tx font-medium">
              Calculate Your Architecture Roadmap
            </h2>
            <p className="font-matter text-sm text-tx-secondary mt-1 max-w-xl">
              Get an instant estimation of sprint timelines, engineering squad size, and investment tier.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-matter text-xs font-medium text-tx-secondary">
              Pods Available for Q4 2026 Sprints
            </span>
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Left Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Step 1: Solution Type */}
            <div>
              <label className="block font-matter text-xs font-semibold text-tx-tertiary uppercase tracking-wider mb-3">
                1. Select Solution Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'web', label: 'Web Platform' },
                  { id: 'mobile', label: 'Mobile App' },
                  { id: 'ai', label: 'AI Solutions' },
                  { id: 'fullstack', label: 'Full Ecosystem' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedService(opt.id as any)}
                    className={`py-3 px-3 rounded-2xl text-xs font-matter text-center border transition-all cursor-pointer ${
                      selectedService === opt.id
                        ? 'bg-sr-indigo-50 border-sr-indigo-300 text-sr-indigo-900 font-semibold shadow-2xs'
                        : 'bg-sf-secondary border-st text-tx hover:bg-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Complexity / Tier */}
            <div>
              <label className="block font-matter text-xs font-semibold text-tx-tertiary uppercase tracking-wider mb-3">
                2. Project Maturity Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'mvp', label: 'MVP / Fast Launch', sub: 'Validate in weeks' },
                  { id: 'scale', label: 'Production Scale', sub: 'High concurrency' },
                  { id: 'enterprise', label: 'Enterprise Critical', sub: 'Multi-region & SOC2' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setTier(opt.id as any)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                      tier === opt.id
                        ? 'bg-sr-indigo-50 border-sr-indigo-300 shadow-2xs'
                        : 'bg-sf-secondary border-st hover:bg-white'
                    }`}
                  >
                    <div className="font-matter font-semibold text-xs text-tx">{opt.label}</div>
                    <div className="font-matter text-[11px] text-tx-tertiary mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sf-secondary/80 border border-st-secondary text-xs font-matter text-tx-secondary">
              <span className="font-semibold text-tx">Recommended Tech Stack:</span> {currentConfig.stack}
            </div>
          </div>

          {/* Right Estimate Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#1e2033] to-[#121422] text-white p-7 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-matter uppercase tracking-wider text-white/60">Estimated Scope</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-medium text-white">
                  Guaranteed Fixed-Bid
                </span>
              </div>

              <div className="mt-5">
                <div className="text-white/60 text-xs font-matter">Sprint Investment Range</div>
                <div className="font-season-mix text-3xl md:text-4xl font-bold text-white mt-1">
                  {currentEstimate.budget}
                </div>
              </div>

              <div className="mt-6 space-y-3.5 text-xs font-matter">
                <div className="flex items-center gap-2.5 text-white/80">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Timeline: <strong>{currentEstimate.time}</strong></span>
                </div>
                <div className="flex items-start gap-2.5 text-white/80">
                  <Users className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Engineering Squad: <strong>{currentEstimate.pod}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-white/80">
                  <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Includes 90-Day Post-Launch Warranty & CI/CD SLA</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <button
                onClick={onOpenProjectModal}
                className="w-full py-3.5 rounded-full bg-white text-tx font-matter font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
              >
                <span>Lock In This Roadmap</span>
                <ArrowRight className="w-4 h-4 text-tx" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
