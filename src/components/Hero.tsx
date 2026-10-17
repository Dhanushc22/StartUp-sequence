'use client';

import React from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenProjectModal: () => void;
}

export default function Hero({ onOpenProjectModal }: HeroProps) {
  const techStack = [
    { name: 'React', desc: 'Frontend Framework', color: '#61dafb' },
    { name: 'Next.js 15', desc: 'App Architecture', color: '#000000' },
    { name: 'TypeScript', desc: 'Type Safety', color: '#3178c6' },
    { name: 'Python', desc: 'AI & Data Engine', color: '#3776ab' },
    { name: 'PyTorch', desc: 'Machine Learning', color: '#ee4c2c' },
    { name: 'Node.js', desc: 'Microservices', color: '#5fa04e' },
    { name: 'AWS Cloud', desc: 'Infrastructure', color: '#ff9900' },
    { name: 'Docker & K8s', desc: 'Containerization', color: '#2496ed' },
    { name: 'PostgreSQL', desc: 'Relational DB', color: '#4169e1' },
    { name: 'Redis', desc: 'High-speed Cache', color: '#dc382d' },
    { name: 'OpenAI / Claude', desc: 'Frontier LLMs', color: '#10a37f' },
    { name: 'Tailwind CSS', desc: 'Design System', color: '#06b6d4' },
    { name: 'GraphQL', desc: 'Federated APIs', color: '#e10098' },
  ];

  return (
    <section className="relative flex flex-col gap-8 md:gap-0 pt-36 md:pt-40 md:h-fit min-h-screen 2xl:min-h-[75vh] overflow-x-clip bg-white">
      {/* Scattered Organic Dot Pattern Theme (Stable on Pure White Background) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/assets/dot-strip.svg')",
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
          backgroundSize: '1024px 118px',
          opacity: 0.72,
        }}
      />

      {/* Hero Center Container (nudge 0.5% down) */}
      <div className="z-10 relative flex flex-col md:flex-1 justify-center items-center mx-auto pb-[10vh] w-[88%] md:w-10/12 max-w-[1320px] translate-y-[0.5%]">
        {/* Nexitech Geometric Motif in Black */}
        <img
          src="/assets/motif.svg"
          alt=""
          role="presentation"
          className="w-auto h-6 md:h-8 object-contain opacity-95"
        />

        {/* Eyebrow Label with Gradients */}
        <div className="flex flex-col items-center gap-1.5 md:gap-2 mt-5 md:mt-7 w-fit">
          <div className="w-full h-px" style={{ background: 'radial-gradient(circle, #6a88e2 0%, transparent 100%)' }} aria-hidden="true" />
          <p
            className="px-8 font-matter text-sr-indigo-900 text-xs md:text-sm text-center leading-normal tracking-[0.18em] uppercase font-semibold"
            style={{ textShadow: '0 0 12px #ffffff, 0 0 24px #ffffff' }}
          >
            Next-Generation Digital Engineering & AI Platform
          </p>
          <div className="w-full h-px" style={{ background: 'radial-gradient(circle, #6a88e2 0%, transparent 100%)' }} aria-hidden="true" />
        </div>

        {/* H1 Display Heading with Micro Halo so dots remain visible behind without disturbing text */}
        <h1
          className="mt-5 md:mt-8 max-w-4xl font-season-mix text-[42px] text-tx md:text-[68px] text-center leading-[1.04] tracking-tight"
          style={{ textShadow: '0 0 16px rgba(255,255,255,0.95), 0 0 32px #ffffff' }}
        >
          We build what comes&nbsp;next.
        </h1>

        {/* Subtitle with Micro Halo */}
        <p
          className="mt-3 md:mt-4 w-full max-w-2xl font-matter text-tx-secondary md:text-[20px] text-base text-center leading-[1.7]"
          style={{ textShadow: '0 0 14px rgba(255,255,255,0.95), 0 0 28px #ffffff' }}
        >
          We design and develop high-performance web platforms, intelligent mobile applications, and enterprise AI solutions for ambitious businesses.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-6 md:mt-9 mb-12 md:mb-20">
          <a
            href="#showcase"
            className="group relative inline-flex items-center justify-center cursor-pointer font-season-mix font-medium overflow-hidden rounded-full min-h-[46px] text-white active:scale-[0.97] transition-all px-7 py-3 text-base shadow-sm hover:shadow-md"
            style={{ background: 'linear-gradient(to bottom, #3a3f5c 0%, #1e2033 100%)' }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle 80px at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <span>Explore Services</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </a>

          <button
            onClick={onOpenProjectModal}
            className="group relative inline-flex items-center justify-center cursor-pointer font-season-mix font-medium rounded-full overflow-hidden min-h-[46px] text-[#1e2033] active:scale-[0.97] transition-all px-7 py-3 text-base border border-[#1e2033]/15 hover:border-[#1e2033]/30 bg-gradient-to-b from-white to-[#f0f1f5]"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(30,32,51,0.06)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Technology Marquee Strip */}
      <div className="z-10 relative flex flex-col items-center gap-4 md:gap-6 pt-3 md:pt-6 md:pb-14 w-full shrink-0">
        <p
          className="font-matter font-medium text-tx-tertiary text-xs uppercase tracking-[2px]"
          style={{ textShadow: '0 0 10px #ffffff, 0 0 20px #ffffff' }}
        >
          POWERED BY MODERN TECHNOLOGY & INFRASTRUCTURE
        </p>

        {/* Marquee Container with side masks */}
        <div
          className="relative w-full overflow-hidden py-3"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          <div className="animate-logo-scroll flex items-center gap-8">
            {[...techStack, ...techStack].map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-st-secondary bg-white shadow-2xs hover:border-st hover:bg-sf-secondary transition-colors cursor-default shrink-0"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: tech.color }}
                />
                <span className="font-matter font-semibold text-xs text-tx">
                  {tech.name}
                </span>
                <span className="text-[11px] font-matter text-tx-tertiary">
                  · {tech.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
