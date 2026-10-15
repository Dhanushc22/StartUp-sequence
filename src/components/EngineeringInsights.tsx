'use client';

import React from 'react';
import { ArrowRight, Clock, Sparkles, BookOpen } from 'lucide-react';

export default function EngineeringInsights() {
  const articles = [
    {
      title: 'Architecting Autonomous Multi-Agent Swarms for Enterprise SaaS',
      desc: 'How we designed an event-driven agent orchestration framework reducing hallucination rates to under 0.2% in production environments.',
      tag: 'AI Engineering',
      date: 'Oct 2026',
      readTime: '6 min read',
      gradient: 'from-sr-indigo-600/10 to-transparent'
    },
    {
      title: 'Next.js 15 & React 19: Server Actions, Partial Prerendering & Cache Primitives',
      desc: 'A comprehensive benchmark of Turbopack production builds, sub-10ms TTFB edge caching, and streaming server components.',
      tag: 'Web Platform',
      date: 'Sep 2026',
      readTime: '8 min read',
      gradient: 'from-orange-500/10 to-transparent'
    },
    {
      title: 'Real-Time Voice AI: Achieving Sub-400ms Turnaround in Speech-to-Speech',
      desc: 'Overcoming WebRTC packet jitter, acoustic echo cancellation, and streaming token quantization for natural human-level voice dialogue.',
      tag: 'Voice Systems',
      date: 'Aug 2026',
      readTime: '5 min read',
      gradient: 'from-green-600/10 to-transparent'
    }
  ];

  return (
    <section id="insights" className="mx-auto w-[92%] md:w-10/12 max-w-[1320px] py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-matter text-xs font-semibold uppercase tracking-widest text-sr-indigo-900 mb-2">
            Engineering Insights
          </p>
          <h2 className="font-season-mix text-3xl md:text-[44px] font-medium text-tx">
            Research & Technical Updates
          </h2>
        </div>

        <a
          href="#api"
          className="inline-flex items-center gap-1.5 font-matter text-xs font-semibold text-sr-indigo-900 hover:text-sr-indigo-950 underline underline-offset-4"
        >
          <span>View all technical publications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid of 3 Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art, idx) => (
          <article
            key={idx}
            className="group rounded-3xl border border-st bg-white p-7 md:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:border-sr-indigo-200 transition-all duration-300 relative overflow-hidden cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl ${art.gradient} rounded-bl-full pointer-events-none`} />

            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-matter font-medium bg-sf-secondary border border-st text-tx-secondary">
                  {art.tag}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-matter text-tx-tertiary">
                  <Clock className="w-3 h-3" />
                  <span>{art.readTime}</span>
                </span>
              </div>

              <h3 className="font-season-mix text-xl font-medium text-tx group-hover:text-sr-indigo-900 transition-colors leading-snug mb-3">
                {art.title}
              </h3>
              <p className="font-matter text-xs md:text-sm text-tx-secondary leading-relaxed line-clamp-3">
                {art.desc}
              </p>
            </div>

            <div className="pt-6 border-t border-st/60 mt-6 flex items-center justify-between">
              <span className="text-xs font-matter text-tx-tertiary">{art.date}</span>
              <span className="flex items-center gap-1 text-xs font-matter font-semibold text-sr-indigo-900 group-hover:translate-x-1 transition-transform">
                <span>Read paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
