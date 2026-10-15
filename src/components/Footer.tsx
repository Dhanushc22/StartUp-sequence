'use client';

import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenProjectModal: () => void;
  onOpenClientPortal?: () => void;
}

export default function Footer({ onOpenProjectModal, onOpenClientPortal }: FooterProps) {
  const [subscribed, setSubscribed] = React.useState(false);
  const [subEmail, setSubEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;
    setSubscribed(true);
  };
  return (
    <footer className="border-t border-st bg-sf-secondary/60 text-tx font-matter pt-16 pb-12">
      <div className="mx-auto w-[92%] md:w-10/12 max-w-[1320px]">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-st-secondary">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1e2033] via-[#3a3f5c] to-[#4338ca] flex items-center justify-center shadow-xs">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 18L10 6L14 14L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="20" cy="6" r="2" fill="#ff9257" />
                  </svg>
                </div>
                <span className="font-season-mix text-xl font-bold tracking-tight text-tx">
                  NEXITECH
                </span>
              </div>

              <p className="font-matter text-sm text-tx-secondary leading-relaxed max-w-sm mb-6">
                Creating the next generation of digital products. We design, architect, and engineer high-performance web platforms, mobile apps, and enterprise AI systems.
              </p>
            </div>

            {/* Live Systems Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-st text-xs font-matter text-tx-secondary shadow-2xs w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span>All Systems Operational</span>
              <span className="text-[10px] text-tx-tertiary">· 99.99%</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-season-mix text-sm font-semibold text-tx uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-tx-secondary">
              <li><a href="#services" className="hover:text-tx transition-colors">Web Applications</a></li>
              <li><a href="#services" className="hover:text-tx transition-colors">Mobile Applications</a></li>
              <li><a href="#services" className="hover:text-tx transition-colors">Autonomous AI & Agents</a></li>
              <li><a href="#services" className="hover:text-tx transition-colors">Custom Software</a></li>
              <li><a href="#platform" className="hover:text-tx transition-colors">Cloud & DevOps</a></li>
              <li><a href="#showcase" className="hover:text-tx transition-colors">Document AI & Vision</a></li>
            </ul>
          </div>

          {/* Developers Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-season-mix text-sm font-semibold text-tx uppercase tracking-wider">
              Developers
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-tx-secondary">
              <li><a href="#api" className="hover:text-tx transition-colors">API Playground</a></li>
              <li><a href="#api" className="hover:text-tx transition-colors">TypeScript SDK</a></li>
              <li><a href="#api" className="hover:text-tx transition-colors">Python AI Client</a></li>
              <li><a href="#api" className="hover:text-tx transition-colors">OpenAPI Documentation</a></li>
              <li><a href="#api" className="hover:text-tx transition-colors">System Architecture</a></li>
              <li><a href="#api" className="hover:text-tx transition-colors">Release Notes</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-season-mix text-sm font-semibold text-tx uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-tx-secondary">
              <li><a href="#showcase" className="hover:text-tx transition-colors">Case Studies</a></li>
              <li><a href="#insights" className="hover:text-tx transition-colors">Engineering Insights</a></li>
              <li><a href="#platform" className="hover:text-tx transition-colors">Enterprise Security</a></li>
              <li><a href="#platform" className="hover:text-tx transition-colors">SOC2 Compliance</a></li>
              {onOpenClientPortal && (
                <li>
                  <button
                    onClick={onOpenClientPortal}
                    className="hover:text-tx transition-colors cursor-pointer text-left text-tx-secondary"
                  >
                    Client Portal
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenProjectModal}
                  className="hover:text-tx transition-colors cursor-pointer text-left font-medium text-sr-indigo-700"
                >
                  Start a Project
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-season-mix text-sm font-semibold text-tx uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="font-matter text-xs text-tx-secondary leading-relaxed">
              Subscribe to quarterly briefings on frontier AI, web frameworks, and system performance.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800">
                ✓ Subscribed! You will receive our next quarterly architecture briefing.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-1 flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={subEmail}
                  onChange={e => setSubEmail(e.target.value)}
                  placeholder="developer@company.com"
                  className="px-3.5 py-2 rounded-xl bg-white border border-st text-xs font-matter text-tx focus:outline-none focus:border-sr-indigo-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sr-slate hover:bg-black text-white text-xs font-medium cursor-pointer transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-matter text-tx-tertiary">
          <div>
            © 2026 Nexitech Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-tx transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-tx transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-tx transition-colors">Security & Trust</a>
          </div>

          {/* Social Inline SVGs */}
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white transition-colors text-tx-secondary hover:text-tx" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white transition-colors text-tx-secondary hover:text-tx" aria-label="X (Twitter)">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white transition-colors text-tx-secondary hover:text-tx" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.53-1.53c0-.85-.68-1.54-1.53-1.54-.85 0-1.54.69-1.54 1.54 0 .85.69 1.53 1.54 1.53m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
