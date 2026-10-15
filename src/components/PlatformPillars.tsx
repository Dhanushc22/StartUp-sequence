'use client';

import React from 'react';
import { Globe, Smartphone, Cpu, Cloud, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface PlatformPillarsProps {
  onOpenProjectModal: () => void;
}

export default function PlatformPillars({ onOpenProjectModal }: PlatformPillarsProps) {
  const pillars = [
    {
      category: 'Category A',
      title: 'Digital Products & Platforms',
      badge: 'Web & Mobile Apps',
      desc: 'High-conversion websites, SaaS platforms, native iOS/Android applications, and modular UI/UX design systems built for scale.',
      stats: '60 FPS Native UI · Sub-second LCP',
      features: [
        'Next.js 15 App Router & Server Components',
        'Cross-platform React Native iOS & Android',
        'Full design system & accessible components',
        'Headless CMS & Stripe payment integration'
      ],
      gradient: 'from-blue-600/10 via-indigo-600/5 to-transparent',
      borderHover: 'hover:border-sr-indigo-300'
    },
    {
      category: 'Category B',
      title: 'AI Solutions & Automation',
      badge: 'Frontier AI Systems',
      desc: 'Enterprise generative AI, autonomous agent swarms, multimodal speech & vision pipelines, and domain-tuned RAG databases.',
      stats: 'Sub-40ms Voice Latency · 99.8% OCR',
      features: [
        'Multi-agent autonomous workflow orchestration',
        'Real-time low-latency voice bots (Speech-to-Speech)',
        'Document digitisation & invoice tabular extraction',
        'Private LLM fine-tuning on proprietary company data'
      ],
      gradient: 'from-orange-500/10 via-yellow-500/5 to-transparent',
      borderHover: 'hover:border-orange-300'
    },
    {
      category: 'Category C',
      title: 'Engineering & Cloud Infra',
      badge: 'Enterprise Architecture',
      desc: 'Fault-tolerant distributed backends, high-throughput microservices, Kubernetes clusters, and automated continuous delivery.',
      stats: '99.99% Uptime SLA · Zero-Trust Security',
      features: [
        'Multi-region AWS / GCP Kubernetes clusters',
        'High-concurrency PostgreSQL & Redis caching',
        'SOC2 Type II compliance & zero-trust secrets',
        'Automated CI/CD testing & instant rollback'
      ],
      gradient: 'from-purple-600/10 via-indigo-600/5 to-transparent',
      borderHover: 'hover:border-purple-300'
    }
  ];

  return (
    <section id="services" className="mx-auto w-[92%] md:w-10/12 max-w-[1320px] py-16">
      {/* Heading */}
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <p className="font-matter text-xs font-semibold uppercase tracking-widest text-sr-indigo-900">
          Core Services & Architecture
        </p>
        <h2 className="font-season-mix text-3xl md:text-[44px] font-medium text-tx">
          Nexitech's Full-Stack Engineering Platform
        </h2>
        <p className="font-matter text-sm md:text-base text-tx-secondary max-w-xl">
          Everything ambitious enterprises need to transform their digital presence, launch transformative software, and scale with confidence.
        </p>
      </div>

      {/* 3 Master Bento Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <div
            key={i}
            className={`relative rounded-3xl border border-st bg-white p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 ${p.borderHover} overflow-hidden group`}
          >
            {/* Ambient Corner Gradient */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${p.gradient} rounded-bl-full pointer-events-none`} />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-season-mix text-xs uppercase tracking-widest text-tx-tertiary font-semibold">
                  {p.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-matter font-medium bg-sf-secondary border border-st text-tx-secondary">
                  {p.badge}
                </span>
              </div>

              <h3 className="font-season-mix text-2xl font-medium text-tx mb-3">
                {p.title}
              </h3>
              <p className="font-matter text-sm text-tx-secondary leading-relaxed mb-6">
                {p.desc}
              </p>

              {/* Stats Badge */}
              <div className="px-3.5 py-2 rounded-xl bg-sf-secondary border border-st-secondary text-xs font-matter text-sr-indigo-900 font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>{p.stats}</span>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-2.5 mb-8">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-matter text-tx-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onOpenProjectModal}
              className="w-full py-3 rounded-full bg-sf-secondary hover:bg-sr-slate hover:text-white text-tx font-matter font-medium text-xs transition-all duration-200 border border-st flex items-center justify-center gap-2 cursor-pointer shadow-2xs group-hover:bg-sr-slate group-hover:text-white"
            >
              <span>Explore Capability</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
