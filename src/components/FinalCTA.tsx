'use client';

import React from 'react';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

interface FinalCTAProps {
  onOpenProjectModal: () => void;
}

export default function FinalCTA({ onOpenProjectModal }: FinalCTAProps) {
  return (
    <section className="relative mx-auto mb-16 md:mb-24 w-[92%] md:w-10/12 max-w-[1320px]">
      <div
        className="relative rounded-3xl md:rounded-[36px] overflow-hidden p-8 md:p-16 border border-st shadow-2xl flex flex-col items-center text-center justify-center bg-gradient-to-b from-white via-sf-secondary to-sf"
        style={{
          boxShadow: '0 20px 60px -15px rgba(67, 56, 202, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[90px] opacity-35 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, #ffedd5 60%, transparent 100%)' }}
        />

        {/* Nexitech Geometric Motif */}
        <img
          src="/assets/motif.svg"
          alt=""
          className="w-auto h-7 md:h-9 object-cover mb-6 opacity-80"
        />

        <p className="font-matter text-xs font-semibold uppercase tracking-[0.2em] text-sr-indigo-900 mb-3">
          Your Next-Generation Partner
        </p>

        <h2 className="font-season-mix text-3xl md:text-5xl lg:text-6xl text-tx font-medium max-w-3xl leading-[1.08] tracking-tight">
          Build what comes next with Nexitech.
        </h2>

        <p className="font-matter text-sm md:text-lg text-tx-secondary mt-4 max-w-2xl leading-relaxed">
          From concept to production-ready enterprise systems. Join ambitious industry leaders accelerating their product roadmap with dedicated engineering pods.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 md:mt-10">
          <button
            onClick={onOpenProjectModal}
            className="group relative inline-flex items-center justify-center cursor-pointer font-season-mix font-medium rounded-full overflow-hidden min-h-[48px] text-white px-8 py-3.5 text-base shadow-lg hover:shadow-xl active:scale-[0.97] transition-all"
            style={{ background: 'linear-gradient(to bottom, #3a3f5c 0%, #1e2033 100%)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>

          <button
            onClick={onOpenProjectModal}
            className="inline-flex items-center justify-center cursor-pointer font-season-mix font-medium rounded-full min-h-[48px] text-tx px-7 py-3.5 text-base border border-st bg-white hover:bg-sf-secondary shadow-xs active:scale-[0.97] transition-all"
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sr-indigo-700" />
              <span>Schedule Architecture Review</span>
            </span>
          </button>
        </div>

        {/* Reassurance text */}
        <p className="font-matter text-xs text-tx-tertiary mt-6">
          Sprints starting weekly · NDA protected · Guaranteed fixed-bid deliverables
        </p>
      </div>
    </section>
  );
}
