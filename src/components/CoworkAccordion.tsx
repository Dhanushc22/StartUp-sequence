'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Terminal, Code2, Cpu, Globe, Database, Layers } from 'lucide-react';

interface CoworkAccordionProps {
  onOpenProjectModal: () => void;
}

export default function CoworkAccordion({ onOpenProjectModal }: CoworkAccordionProps) {
  const [activeCol, setActiveCol] = useState<number>(0);

  const columns = [
    {
      num: '01',
      title: 'Digital Products',
      label: 'Digital Products',
      desc: 'Next-generation web applications, SaaS platforms, and digital experiences engineered for extreme speed and conversion.',
      glowColors: '--cw-g1: #4338ca; --cw-g2: #c7d2fe; --cw-g3: #eef2ff;',
      previewHead: 'Next.js 15 Full-Stack Platform',
      previewBody: [
        'Multi-tenant architecture with tenant-isolated schema',
        'Edge middleware caching sub-15ms worldwide',
        'Full responsive design system with dark/light themes'
      ],
      techTag: 'Next.js · React · TypeScript'
    },
    {
      num: '02',
      title: 'Mobile Applications',
      label: 'Mobile Apps',
      desc: 'Fluid, gesture-rich native iOS and Android apps powered by React Native and Swift, built to deliver 60 FPS performance.',
      glowColors: '--cw-g1: #15803d; --cw-g2: #bbf7d0; --cw-g3: #f0fdf4;',
      previewHead: 'Cross-Platform Native Experience',
      previewBody: [
        'Offline-first synchronization with SQLite and WatermelonDB',
        'Biometric authentication & hardware push notifications',
        'App Store and Play Store continuous delivery pipelines'
      ],
      techTag: 'React Native · iOS · Android'
    },
    {
      num: '03',
      title: 'Autonomous AI',
      label: 'AI & Agents',
      desc: 'Frontier AI solutions, conversational voice agents, and autonomous workflow bots integrated directly into your business stack.',
      glowColors: '--cw-g1: #c2410c; --cw-g2: #fed7aa; --cw-g3: #fff7ed;',
      previewHead: 'Enterprise Agentic Automation',
      previewBody: [
        'Multi-agent orchestration with memory and vector RAG',
        'Real-time voice synthesis and speech-to-speech agents',
        'Automated document parsing with cell-accurate OCR'
      ],
      techTag: 'LangChain · PyTorch · Vector DB'
    },
    {
      num: '04',
      title: 'Cloud & Infrastructure',
      label: 'Cloud & DevOps',
      desc: 'Fault-tolerant distributed backends, Kubernetes clusters, and microservices architectures built for 99.99% uptime.',
      glowColors: '--cw-g1: #3730a3; --cw-g2: #ddd6fe; --cw-g3: #f5f3ff;',
      previewHead: 'High-Throughput Distributed Cloud',
      previewBody: [
        'Automated Terraform infrastructure-as-code deployments',
        'Zero-trust network security with end-to-end encryption',
        'Real-time observability and anomaly alerting with Datadog'
      ],
      techTag: 'AWS · Docker · Kubernetes · Terraform'
    }
  ];

  return (
    <section id="platform" aria-labelledby="home-cowork-heading" className="mx-auto w-[92%] md:w-10/12 max-w-[1320px] py-16">
      {/* Header */}
      <header className="flex md:flex-row flex-col md:justify-between md:items-end gap-6 md:gap-12 mb-10 md:mb-14">
        <div className="flex flex-col gap-3 max-w-2xl">
          <p className="font-matter font-medium text-tx-tertiary text-xs uppercase tracking-[2px]">
            Platform Capabilities
          </p>
          <h2 id="home-cowork-heading" className="font-season-mix text-tx text-3xl md:text-[44px] leading-tight tracking-tight">
            Intelligence & Engineering, built around you.
          </h2>
          <p className="font-matter text-tx-secondary text-base md:text-lg leading-relaxed">
            Nexitech connects modern architectures, AI workflows, and dedicated engineering pods so your company can build, scale, and capture market share faster.
          </p>
        </div>

        <button
          onClick={onOpenProjectModal}
          className="group relative inline-flex items-center justify-center cursor-pointer font-matter rounded-full whitespace-nowrap bg-sf-secondary text-tx hover:bg-white shadow-[inset_0_2px_0_rgba(200,200,200,0.1),inset_0_-1px_0_rgba(0,0,0,0.05)] transition-all font-medium min-h-[44px] px-6 py-2.5 text-sm border border-st shrink-0"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>Explore Custom Software</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      </header>

      {/* Expandable Accordion Bento Grid — All 4 in a Single Row */}
      <div className="flex flex-col lg:flex-row gap-4 min-h-[500px]">
        {columns.map((col, idx) => {
          const isActive = activeCol === idx;
          return (
            <article
              key={col.num}
              onClick={() => setActiveCol(idx)}
              onMouseEnter={() => setActiveCol(idx)}
              className={`relative rounded-3xl border transition-all duration-500 ease-out p-6 md:p-7 flex flex-col justify-between overflow-hidden cursor-pointer min-w-0 ${
                isActive
                  ? 'lg:flex-[2.2] bg-white border-sr-indigo-200 shadow-xl ring-1 ring-sr-indigo-100'
                  : 'lg:flex-1 bg-sf-secondary/80 border-st hover:bg-white hover:border-st-secondary'
              }`}
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between z-10">
                <span className="font-season-mix text-2xl font-bold text-tx-tertiary">
                  {col.num}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-matter font-medium ${
                  isActive ? 'bg-sr-indigo-50 text-sr-indigo-800' : 'bg-white text-tx-tertiary border border-st'
                }`}>
                  {col.label}
                </span>
              </div>

              {/* Body Content */}
              <div className="my-6 z-10">
                <h3 className="font-season-mix text-2xl md:text-3xl font-medium text-tx mb-3">
                  {col.title}
                </h3>
                <p className="font-matter text-sm md:text-base text-tx-secondary leading-relaxed">
                  {col.desc}
                </p>

                {/* Expanded Details Panel */}
                {isActive && (
                  <div className="mt-6 p-4 md:p-5 rounded-2xl bg-sf-secondary border border-st-secondary animate-in fade-in duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-matter font-semibold text-xs text-tx">
                        {col.previewHead}
                      </span>
                      <span className="text-[11px] font-mono text-sr-indigo-700 font-medium">
                        {col.techTag}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {col.previewBody.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-matter text-tx-secondary">
                          <Check className="w-3.5 h-3.5 text-sr-indigo-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Action Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-st/60 z-10">
                <span className="text-xs font-matter font-medium text-tx-tertiary">
                  {isActive ? 'Active Pillar' : 'Click to inspect'}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-sr-slate text-white' : 'bg-white text-tx-secondary border border-st'
                }`}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
