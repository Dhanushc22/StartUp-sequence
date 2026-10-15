'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, ChevronDown, Sparkles, Terminal, Code2, Cpu, Globe, Smartphone, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenProjectModal: () => void;
  onOpenClientPortal: () => void;
}

export default function Header({ onOpenProjectModal, onOpenClientPortal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="top-0 right-0 left-0 z-50 fixed w-full font-matter">
      {/* Announcement Ticker */}
      <div className="relative z-10">
        <div
          className="relative flex shrink-0 justify-center items-center border-st-secondary border-b h-9 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, var(--color-sr-indigo-50, #f5f7ff) 100%)',
            boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.9), inset 0 -1px 4px color-mix(in srgb, var(--color-sr-indigo-400, #818cf8) 45%, transparent)'
          }}
        >
          {/* Desktop Ticker */}
          <div className="relative z-10 hidden lg:flex justify-center items-center w-full h-full px-6">
            <div className="flex items-center gap-3.5 shrink-0">
              {/* Star SVG Motif */}
              <span aria-hidden="true" className="flex items-center gap-2 shrink-0 pointer-events-none mr-2">
                <svg className="shrink-0" style={{ opacity: 0.25, transform: 'scale(0.7)' }} width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M5.446 9.268C4.39 10.323 2.68 10.323 1.624 9.268L0.203 7.846C-0.068 7.576 -0.068 7.138 0.203 6.868l1.421-1.422C2.68 4.39 4.39 4.39 5.446 5.446L7.357 7.357l-1.91 1.911Z" fill="#4338ca" />
                  <path d="M5.446 13.09c-1.055-1.056-1.055-2.767 0-3.822l1.911-1.911 1.911 1.911c1.055 1.055 1.055 2.766 0 3.822L7.357 15l-1.911-1.91Z" fill="#4338ca" />
                  <path d="M5.446 5.446c-1.055-1.055-1.055-2.767 0-3.822L6.868.203C7.138-.068 7.576-.068 7.846.203l1.421 1.421c1.056 1.056 1.056 2.767 0 3.822L7.357 7.357 5.446 5.446Z" fill="#4338ca" />
                  <path d="M13.09 9.268c-1.056 1.055-2.767 1.055-3.822 0L7.357 7.357l1.911-1.911c1.055-1.056 2.766-1.056 3.822 0l1.421 1.422c.27.27.27.708 0 .978l-1.421 1.422Z" fill="#4338ca" />
                </svg>
                <svg className="shrink-0" style={{ opacity: 0.6, transform: 'scale(0.9)' }} width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M5.446 9.268C4.39 10.323 2.68 10.323 1.624 9.268L0.203 7.846C-0.068 7.576 -0.068 7.138 0.203 6.868l1.421-1.422C2.68 4.39 4.39 4.39 5.446 5.446L7.357 7.357l-1.91 1.911Z" fill="#4338ca" />
                  <path d="M5.446 13.09c-1.055-1.056-1.055-2.767 0-3.822l1.911-1.911 1.911 1.911c1.055 1.055 1.055 2.766 0 3.822L7.357 15l-1.911-1.91Z" fill="#4338ca" />
                  <path d="M5.446 5.446c-1.055-1.055-1.055-2.767 0-3.822L6.868.203C7.138-.068 7.576-.068 7.846.203l1.421 1.421c1.056 1.056 1.056 2.767 0 3.822L7.357 7.357 5.446 5.446Z" fill="#4338ca" />
                  <path d="M13.09 9.268c-1.056 1.055-2.767 1.055-3.822 0L7.357 7.357l1.911-1.911c1.055-1.056 2.766-1.056 3.822 0l1.421 1.422c.27.27.27.708 0 .978l-1.421 1.422Z" fill="#4338ca" />
                </svg>
              </span>
              <span className="px-2 py-0.5 border rounded-full font-matter font-semibold text-xs leading-none bg-white border-st-secondary text-sr-indigo-900 shadow-2xs">
                New
              </span>
              <div className="flex items-center gap-3 font-matter font-medium text-tx hover:text-tx-secondary text-[14px] tracking-wide transition-colors">
                <span className="whitespace-nowrap">
                  Introducing Nexitech 3.0: Full-Stack Digital Engineering, Autonomous Agents & Custom Cloud Architectures
                </span>
                <button
                  onClick={onOpenProjectModal}
                  className="whitespace-nowrap underline underline-offset-2 text-sr-indigo-900 hover:text-sr-indigo-950 font-semibold cursor-pointer"
                >
                  Start a project
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Ticker Marquee */}
          <div className="relative z-10 flex lg:hidden items-center w-full">
            <div className="animate-ticker-marquee flex items-center min-w-max pr-4 gap-3 text-xs">
              <span className="px-2 py-0.5 border rounded-full font-semibold bg-white border-st-secondary text-sr-indigo-900">
                New
              </span>
              <span className="text-tx font-medium whitespace-nowrap">
                Nexitech 3.0: Digital Engineering, Mobile Apps & AI Solutions
              </span>
              <button
                onClick={onOpenProjectModal}
                className="underline underline-offset-2 text-sr-indigo-900 font-semibold whitespace-nowrap"
              >
                Inquire now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Floating Navbar */}
      <div className={`relative z-20 w-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-xs' : 'bg-white'}`}>
        <div className="absolute inset-x-0 bottom-0 h-px bg-st-secondary"></div>
        <div className="relative flex justify-between items-center mx-auto w-10/12 2xl:max-w-[1320px] py-3.5">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1e2033] via-[#3a3f5c] to-[#4338ca] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18L10 6L14 14L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="6" r="2" fill="#ff9257" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-season-mix text-lg font-bold tracking-tight text-tx leading-none">
                NEXITECH
              </span>
              <span className="font-matter text-[9px] uppercase tracking-[0.2em] text-tx-tertiary">
                Digital Engineering
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onMouseEnter={() => setActiveDropdown('services')}
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className="flex items-center gap-1.5 cursor-pointer px-4 min-h-10 font-matter text-[15px] text-tx hover:text-tx-secondary transition-colors"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-tx-tertiary" />
              </button>

              {/* Mega Dropdown */}
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-80 p-3 bg-white border border-st rounded-2xl shadow-xl z-50 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <a href="#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-sf-secondary transition-colors">
                    <div className="p-2 rounded-lg bg-sr-indigo-50 text-sr-indigo-700">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-tx">Web Applications</div>
                      <div className="text-xs text-tx-tertiary">Scalable cloud & SaaS platforms</div>
                    </div>
                  </a>
                  <a href="#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-sf-secondary transition-colors">
                    <div className="p-2 rounded-lg bg-green-50 text-green-700">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-tx">Mobile Applications</div>
                      <div className="text-xs text-tx-tertiary">Native iOS & Android apps</div>
                    </div>
                  </a>
                  <a href="#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-sf-secondary transition-colors">
                    <div className="p-2 rounded-lg bg-orange-50 text-orange-700">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-tx">AI & Automation</div>
                      <div className="text-xs text-tx-tertiary">Autonomous agents & LLM apps</div>
                    </div>
                  </a>
                  <a href="#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-sf-secondary transition-colors">
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-tx">Custom Software</div>
                      <div className="text-xs text-tx-tertiary">Mission-critical enterprise tools</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a href="#showcase" className="flex items-center cursor-pointer px-4 min-h-10 font-matter text-[15px] text-tx hover:text-tx-secondary transition-colors">
              Showcase
            </a>
            <a href="#platform" className="flex items-center cursor-pointer px-4 min-h-10 font-matter text-[15px] text-tx hover:text-tx-secondary transition-colors">
              Platform
            </a>
            <a href="#api" className="flex items-center cursor-pointer px-4 min-h-10 font-matter text-[15px] text-tx hover:text-tx-secondary transition-colors">
              Code & API
            </a>
            <a href="#process" className="flex items-center cursor-pointer px-4 min-h-10 font-matter text-[15px] text-tx hover:text-tx-secondary transition-colors">
              Process
            </a>
            <a href="#insights" className="flex items-center cursor-pointer px-4 min-h-10 font-matter text-[15px] text-tx hover:text-tx-secondary transition-colors">
              Insights
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenClientPortal}
              className="hidden sm:inline-flex items-center justify-center cursor-pointer font-matter rounded-full whitespace-nowrap bg-sf-secondary text-tx hover:bg-white shadow-[inset_0_2px_0_rgba(200,200,200,0.1),inset_0_-1px_0_rgba(0,0,0,0.05)] transition-all font-medium min-h-[40px] px-5 py-2 text-[14px] border border-st-secondary"
            >
              Client Portal
            </button>
            <button
              onClick={onOpenProjectModal}
              className="group relative inline-flex items-center justify-center cursor-pointer font-matter rounded-full whitespace-nowrap overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.2)] font-medium min-h-[40px] text-white bg-sr-slate px-5 py-2 text-[14px] active:scale-[0.96] transition-all hover:bg-[#151726]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-tx hover:bg-sf-secondary rounded-xl transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-st-secondary bg-white px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-matter text-base text-tx font-medium py-1"
            >
              Services & Capabilities
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="font-matter text-base text-tx font-medium py-1"
            >
              Interactive Showcase
            </a>
            <a
              href="#platform"
              onClick={() => setMobileMenuOpen(false)}
              className="font-matter text-base text-tx font-medium py-1"
            >
              Engineering Platform
            </a>
            <a
              href="#api"
              onClick={() => setMobileMenuOpen(false)}
              className="font-matter text-base text-tx font-medium py-1"
            >
              Developer Code & API
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="font-matter text-base text-tx font-medium py-1"
            >
              Development Process
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClientPortal();
                }}
                className="w-full py-3 rounded-full border border-st bg-sf-secondary text-tx text-sm font-medium text-center"
              >
                Client Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className="w-full py-3 rounded-full bg-sr-slate text-white text-sm font-medium text-center"
              >
                Start a Project
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
