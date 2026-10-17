'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, ChevronDown, Globe, Smartphone, Cpu, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenProjectModal: () => void;
  onOpenClientPortal: () => void;
}

/* ─── Hand-Drawn Doodle SVG Micro-Icons (Ref: Josh Kern aesthetic) ────── */

// 🔨 1. Work — hand-drawn ink hammer that strikes down
const HammerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="hammer-svg">
    {/* Hammer arm + head */}
    <g className="hammer-tool" style={{ transformOrigin: '7.5px 16px' }}>
      {/* Handle double outline */}
      <path d="M6.5 8 L6.5 16 M8.5 8 L8.5 16" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.5 16 L8.5 16" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" />
      {/* Hammer Head with bevel */}
      <path
        d="M2.5 4.5 C2.5 4 3 3.5 3.8 3.5 L12.5 3.5 C13.3 3.5 14 4 14 4.8 L14 7.5 C14 8.2 13.3 8.8 12.5 8.8 L3.8 8.8 C3 8.8 2.5 8.2 2.5 7.5 Z"
        fill="#141413"
      />
    </g>
    {/* Impact sparks */}
    <g className="hammer-sparks" style={{ opacity: 0 }}>
      <line x1="13" y1="12" x2="16" y2="10.5" stroke="#141413" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="14" x2="17.5" y2="15.5" stroke="#141413" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

// ✳ 2. Process — hand-drawn 8-spoke black ink asterisk
const AsteriskIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" className="asterisk-svg">
    <g className="asterisk-icon" style={{ transformOrigin: '8.5px 8.5px' }}>
      <line x1="8.5" y1="1.5" x2="8.5" y2="15.5" stroke="#141413" strokeWidth="2.3" strokeLinecap="round" />
      <line x1="1.5" y1="8.5" x2="15.5" y2="8.5" stroke="#141413" strokeWidth="2.3" strokeLinecap="round" />
      <line x1="3.5" y1="3.5" x2="13.5" y2="13.5" stroke="#141413" strokeWidth="2.3" strokeLinecap="round" />
      <line x1="13.5" y1="3.5" x2="3.5" y2="13.5" stroke="#141413" strokeWidth="2.3" strokeLinecap="round" />
    </g>
  </svg>
);

// 👀 3. Showcase / About — two doodle eyes with moving pupils & blink
const EyesIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true" className="eyes-svg">
    {/* Left Eye */}
    <g className="eye-left-group" style={{ transformOrigin: '6px 8px' }}>
      <path
        d="M6 1.8 C3.2 1.8 2.2 4.5 2.2 8 C2.2 11.5 3.2 14.2 6 14.2 C8.8 14.2 9.8 11.5 9.8 8 C9.8 4.5 8.8 1.8 6 1.8 Z"
        stroke="#141413"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle className="eye-left-pupil" cx="5.2" cy="8" r="2.1" fill="#141413" />
    </g>
    {/* Right Eye */}
    <g className="eye-right-group" style={{ transformOrigin: '16px 8px' }}>
      <path
        d="M16 1.8 C13.2 1.8 12.2 4.5 12.2 8 C12.2 11.5 13.2 14.2 16 14.2 C18.8 14.2 19.8 11.5 19.8 8 C19.8 4.5 18.8 1.8 16 1.8 Z"
        stroke="#141413"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle className="eye-right-pupil" cx="15.2" cy="8" r="2.1" fill="#141413" />
    </g>
  </svg>
);

// ♡ 4. Start a Project / Contact — hand-drawn continuous ink loop heart
const HeartIcon = ({ inverted = false }: { inverted?: boolean }) => {
  const strokeColor = inverted ? '#ede5d8' : '#141413';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="heart-svg">
      <path
        className="heart-path"
        d="M9 15.5 C7.2 13.8 2.5 10.2 2.5 6 C2.5 3.5 4.5 2.2 6.8 2.2 C8.2 2.2 9 3.1 9 3.1 C9 3.1 9.8 2.2 11.2 2.2 C13.5 2.2 15.5 3.5 15.5 6 C15.5 10.2 10.8 13.8 9 15.5 Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transformOrigin: '9px 9px' }}
      />
    </svg>
  );
};

// 🗂 5. Platform — 3 doodle stacked layers
const StackIcon = () => (
  <svg width="19" height="16" viewBox="0 0 19 16" fill="none" aria-hidden="true">
    <g className="stack-layer-1" style={{ transformOrigin: 'center' }}>
      <rect x="2" y="1.5" width="15" height="3" rx="1.5" stroke="#141413" strokeWidth="1.7" />
    </g>
    <g className="stack-layer-2" style={{ transformOrigin: 'center' }}>
      <rect x="1.5" y="6.5" width="16" height="3" rx="1.5" stroke="#141413" strokeWidth="1.7" />
    </g>
    <rect x="1" y="11.5" width="17" height="3" rx="1.5" stroke="#141413" strokeWidth="1.7" />
  </svg>
);

// </> 6. Code & API — doodle code brackets
const CodeIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
    <path className="code-bracket-l" d="M6 3 L1.8 8 L6 13" stroke="#141413" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    <line className="code-slash-mid" x1="12.5" y1="2.5" x2="9.5" y2="13.5" stroke="#141413" strokeWidth="1.9" strokeLinecap="round" style={{ transformOrigin: '11px 8px' }} />
    <path className="code-bracket-r" d="M16 3 L20.2 8 L16 13" stroke="#141413" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 💡 7. Insights — doodle lightbulb
const BulbIcon = () => (
  <svg width="17" height="19" viewBox="0 0 17 19" fill="none" aria-hidden="true">
    <g className="bulb-rays" style={{ transformOrigin: '8.5px 6.5px' }}>
      <line x1="8.5" y1="1" x2="8.5" y2="2.5" stroke="#141413" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="3" y1="3" x2="4.3" y2="4.3" stroke="#141413" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="14" y1="3" x2="12.7" y2="4.3" stroke="#141413" strokeWidth="1.7" strokeLinecap="round" />
    </g>
    <path
      d="M8.5 3 C5.5 3 4 4.8 4 7.2 C4 9 5 10.3 6.2 11.3 L6.2 13.5 L10.8 13.5 L10.8 11.3 C12 10.3 13 9 13 7.2 C13 4.8 11.5 3 8.5 3 Z"
      stroke="#141413"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="6.5" y1="15.8" x2="10.5" y2="15.8" stroke="#141413" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export default function Header({ onOpenProjectModal, onOpenClientPortal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileNav = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="top-0 right-0 left-0 z-50 fixed w-full font-matter">

      {/* Main Navbar */}
      <div className={`relative z-20 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-xs' : 'bg-white'}`}>
        <div className="absolute inset-x-0 bottom-0 h-px bg-st-secondary"></div>
        <div className="relative flex justify-between items-center mx-auto w-11/12 2xl:max-w-[1360px] py-3.5">

          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1e2033] via-[#3a3f5c] to-[#4338ca] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 18L10 6L14 14L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="6" r="2" fill="#ff9257" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-season-mix text-lg font-bold tracking-tight text-tx leading-none">NEXITECH</span>
              <span className="font-matter text-[9px] uppercase tracking-[0.2em] text-tx-tertiary">Digital Engineering</span>
            </div>
          </a>

          {/* Desktop Nav — Josh Kern artisan pill buttons */}
          <nav className="hidden lg:flex items-center gap-2">

            {/* 1. 🔨 Work (with Services dropdown) */}
            <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <a
                href="#services"
                onMouseEnter={() => setActiveDropdown('services')}
                onClick={(e) => {
                  if (activeDropdown === 'services') {
                    setActiveDropdown(null);
                  } else {
                    setActiveDropdown('services');
                  }
                  scrollToSection(e, 'services');
                }}
                className="nav-pill-btn group bg-white hover:bg-neutral-50 border border-neutral-200 shadow-2xs"
                id="nav-work"
              >
                <HammerIcon />
                <span>Work</span>
                <ChevronDown className={`w-3.5 h-3.5 text-black/50 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </a>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-80 p-3 bg-white border border-neutral-200 rounded-2xl shadow-xl z-50 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-tx-tertiary">Engineering Capabilities</div>
                  {[
                    { icon: <Globe className="w-4 h-4" />, bg: 'bg-neutral-100 text-[#141413]', title: 'Web Applications', sub: 'Scalable cloud & SaaS platforms' },
                    { icon: <Smartphone className="w-4 h-4" />, bg: 'bg-neutral-100 text-[#141413]', title: 'Mobile Applications', sub: 'Native iOS & Android apps' },
                    { icon: <Cpu className="w-4 h-4" />, bg: 'bg-neutral-100 text-[#141413]', title: 'AI & Automation', sub: 'Autonomous agents & LLM apps' },
                    { icon: <ShieldCheck className="w-4 h-4" />, bg: 'bg-neutral-100 text-[#141413]', title: 'Custom Software', sub: 'Mission-critical enterprise tools' },
                  ].map((item) => (
                    <a
                      key={item.title}
                      href="#services"
                      onClick={(e) => {
                        setActiveDropdown(null);
                        scrollToSection(e, 'services');
                      }}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${item.bg}`}>{item.icon}</div>
                      <div>
                        <div className="font-bold text-sm text-[#141413]">{item.title}</div>
                        <div className="text-xs text-tx-tertiary">{item.sub}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 2. ✳ Process — spinning asterisk */}
            <a
              href="#process"
              onClick={(e) => scrollToSection(e, 'process')}
              className="nav-pill-btn group bg-white hover:bg-neutral-50 border border-neutral-200 shadow-2xs"
              id="nav-process"
            >
              <AsteriskIcon />
              <span>Process</span>
            </a>

            {/* 3. 👀 Showcase — blinking & looking eyes */}
            <a
              href="#showcase"
              onClick={(e) => scrollToSection(e, 'showcase')}
              className="nav-pill-btn group bg-white hover:bg-neutral-50 border border-neutral-200 shadow-2xs"
              id="nav-showcase"
            >
              <EyesIcon />
              <span>Showcase</span>
            </a>

            {/* 4. 🗂 Platform — floating layers */}
            <a
              href="#platform"
              onClick={(e) => scrollToSection(e, 'platform')}
              className="nav-pill-btn group bg-white hover:bg-neutral-50 border border-neutral-200 shadow-2xs"
              id="nav-platform"
            >
              <StackIcon />
              <span>Platform</span>
            </a>

            {/* 5. </> Code & API — expanding brackets */}
            <a
              href="#api"
              onClick={(e) => scrollToSection(e, 'api')}
              className="nav-pill-btn group bg-white hover:bg-neutral-50 border border-neutral-200 shadow-2xs"
              id="nav-api"
            >
              <CodeIcon />
              <span>Code &amp; API</span>
            </a>

            {/* 6. 💡 Insights — bursting rays */}
            <a
              href="#insights"
              onClick={(e) => scrollToSection(e, 'insights')}
              className="nav-pill-btn group bg-white hover:bg-neutral-50 border border-neutral-200 shadow-2xs"
              id="nav-insights"
            >
              <BulbIcon />
              <span>Insights</span>
            </a>
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenClientPortal}
              className="hidden sm:inline-flex items-center justify-center cursor-pointer font-matter rounded-full whitespace-nowrap bg-white text-[#141413] hover:bg-neutral-50 transition-all font-bold min-h-[42px] px-5 py-2 text-[14px] border border-neutral-200 shadow-2xs"
            >
              Client Portal
            </button>
            <button
              onClick={onOpenProjectModal}
              className="group relative inline-flex items-center justify-center cursor-pointer font-matter rounded-full whitespace-nowrap overflow-hidden font-bold min-h-[42px] text-[#141413] bg-white hover:bg-neutral-50 border border-neutral-200 px-5 py-2 text-[14px] active:scale-[0.97] transition-all shadow-2xs gap-2"
            >
              <HeartIcon />
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#141413] group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-tx hover:bg-sf-secondary rounded-xl transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-st-secondary bg-white px-6 py-6 flex flex-col gap-3 animate-in slide-in-from-top-4 duration-200">
            {[
              { id: 'services', label: 'Work (Capabilities)', icon: <HammerIcon /> },
              { id: 'process', label: 'Process', icon: <AsteriskIcon /> },
              { id: 'showcase', label: 'Showcase', icon: <EyesIcon /> },
              { id: 'platform', label: 'Platform', icon: <StackIcon /> },
              { id: 'api', label: 'Code & API', icon: <CodeIcon /> },
              { id: 'insights', label: 'Insights', icon: <BulbIcon /> },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleMobileNav(e, item.id)}
                className="flex items-center gap-3 font-matter text-base text-[#141413] font-bold py-2 px-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-100 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button onClick={() => { setMobileMenuOpen(false); onOpenClientPortal(); }} className="w-full py-3 rounded-full border border-neutral-200 bg-white text-[#141413] text-sm font-bold text-center">Client Portal</button>
              <button onClick={() => { setMobileMenuOpen(false); onOpenProjectModal(); }} className="w-full py-3 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-[#141413] text-sm font-bold text-center flex items-center justify-center gap-2">
                <HeartIcon />
                <span>Start a Project</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
