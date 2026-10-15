'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, GitCommit, GitPullRequest, ExternalLink, 
  CheckCircle2, Clock, Terminal, Activity, Lock, ArrowRight, 
  Sparkles, Layers, Users, Zap
} from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientPortalModal({ isOpen, onClose }: ClientPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'sprint' | 'security' | 'login'>('sprint');
  const [emailInput, setEmailInput] = useState('');
  const [loginStatus, setLoginStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setLoginStatus('sending');
    setTimeout(() => {
      setLoginStatus('sent');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-st shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 font-matter">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-st-secondary bg-sf-secondary/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sr-slate flex items-center justify-center text-white font-semibold text-xs shadow-sm">
              NX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-season-mix text-lg font-medium text-tx">
                  Nexitech Client Portal
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-tx-tertiary">
                Direct visibility into active sprints, automated CI/CD staging, and SOC2 audit logs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sf-secondary text-tx-tertiary hover:text-tx transition-colors cursor-pointer"
            aria-label="Close portal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center border-b border-st px-6 bg-white gap-2">
          <button
            onClick={() => setActiveTab('sprint')}
            className={`py-3 px-3 text-xs md:text-sm font-medium border-b-2 cursor-pointer transition-colors flex items-center gap-2 ${
              activeTab === 'sprint'
                ? 'border-sr-indigo-600 text-sr-indigo-900 font-semibold'
                : 'border-transparent text-tx-secondary hover:text-tx'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Sprint Tracker & Repos</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-3 text-xs md:text-sm font-medium border-b-2 cursor-pointer transition-colors flex items-center gap-2 ${
              activeTab === 'security'
                ? 'border-sr-indigo-600 text-sr-indigo-900 font-semibold'
                : 'border-transparent text-tx-secondary hover:text-tx'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Compliance</span>
          </button>

          <button
            onClick={() => setActiveTab('login')}
            className={`py-3 px-3 text-xs md:text-sm font-medium border-b-2 cursor-pointer transition-colors flex items-center gap-2 ${
              activeTab === 'login'
                ? 'border-sr-indigo-600 text-sr-indigo-900 font-semibold'
                : 'border-transparent text-tx-secondary hover:text-tx'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Enterprise Sign In</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* Tab 1: Sprint Tracker */}
          {activeTab === 'sprint' && (
            <div className="space-y-6">
              {/* Active Pod Overview */}
              <div className="p-5 rounded-2xl bg-sf-secondary border border-st">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[11px] font-semibold text-sr-indigo-700 uppercase tracking-wider">
                      Assigned Forward-Deployed Pod #03
                    </span>
                    <h4 className="font-season-mix text-lg text-tx font-medium mt-0.5">
                      Enterprise AI Telephony & Autonomous Agents
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-tx-secondary">
                    <span className="font-semibold text-tx">Sprint 14 of 18</span>
                    <span className="text-tx-tertiary">·</span>
                    <span>82% velocity</span>
                  </div>
                </div>

                {/* Sprint Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-tx-secondary font-medium">
                    <span>Milestone 3: Voice Streaming & Webhook Reconciler</span>
                    <span className="text-sr-indigo-700 font-bold">82%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sr-indigo-600 to-indigo-400 rounded-full w-[82%]" />
                  </div>
                </div>

                {/* Team Pod Avatars */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-st/60 text-xs">
                  <span className="text-tx-tertiary font-medium">Active Pod:</span>
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-sr-indigo-700 text-white font-semibold text-[10px] flex items-center justify-center border-2 border-white" title="Priya S. (Lead Architect)">
                      PS
                    </div>
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-semibold text-[10px] flex items-center justify-center border-2 border-white" title="Alex C. (Fullstack)">
                      AC
                    </div>
                    <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-semibold text-[10px] flex items-center justify-center border-2 border-white" title="David R. (AI Engineer)">
                      DR
                    </div>
                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-semibold text-[10px] flex items-center justify-center border-2 border-white" title="Kavya M. (QA Lead)">
                      KM
                    </div>
                  </div>
                  <span className="text-tx-secondary">Lead Architect + 2 Full-Stack Engineers + 1 AI Specialist</span>
                </div>
              </div>

              {/* Environments & Staging URLs */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-tx-tertiary mb-3">
                  Connected Staging Environments
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-st bg-white flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-semibold text-tx">api-staging.nexitech.dev</span>
                      </div>
                      <span className="text-[11px] text-tx-tertiary">Cluster v1.4.2 · AWS ap-south-1 · 18ms latency</span>
                    </div>
                    <a 
                      href="https://staging.nexitech.dev" 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-1.5 text-tx-tertiary hover:text-sr-indigo-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl border border-st bg-white flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-semibold text-tx">app-preview.nexitech.dev</span>
                      </div>
                      <span className="text-[11px] text-tx-tertiary">Edge Next.js 16 Preview · PR #182 build</span>
                    </div>
                    <a 
                      href="https://preview.nexitech.dev" 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-1.5 text-tx-tertiary hover:text-sr-indigo-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Recent Activity / Commits */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-tx-tertiary mb-3">
                  Recent Pod Commits & Pull Requests
                </h5>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-sf-secondary/60 border border-st flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-green-50 text-green-700 mt-0.5">
                      <GitPullRequest className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-tx truncate">
                          #184 feat(voice): sub-40ms speculative decoding for phone stream
                        </p>
                        <span className="text-[10px] text-tx-tertiary whitespace-nowrap">Merged 28m ago</span>
                      </div>
                      <p className="text-[11px] text-tx-secondary mt-0.5">
                        Merged by Priya Sharma · 14 unit tests passed · Code coverage 98.4%
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-sf-secondary/60 border border-st flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-sr-indigo-50 text-sr-indigo-700 mt-0.5">
                      <GitCommit className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-tx truncate">
                          #183 perf(edge): partitioned tenant schema in PostgreSQL
                        </p>
                        <span className="text-[10px] text-tx-tertiary whitespace-nowrap">Merged 2h ago</span>
                      </div>
                      <p className="text-[11px] text-tx-secondary mt-0.5">
                        Merged by Alex Chen · Query time dropped from 42ms to 3.8ms
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Security & Compliance */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-sf-secondary border border-st">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sr-indigo-50 text-sr-indigo-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-season-mix text-lg text-tx font-medium">
                      Enterprise Compliance & Cryptographic Proof
                    </h4>
                    <p className="text-xs text-tx-secondary">
                      Audit reports, encryption key status, and SLA performance.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="p-3.5 rounded-xl bg-white border border-st">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-tx-tertiary">
                      SOC2 Type II
                    </span>
                    <p className="text-sm font-semibold text-tx mt-1">Verified Audit</p>
                    <span className="text-[11px] text-green-700 font-medium">0 Non-Conformances</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-st">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-tx-tertiary">
                      SLA Availability
                    </span>
                    <p className="text-sm font-semibold text-tx mt-1">99.994%</p>
                    <span className="text-[11px] text-green-700 font-medium">Last 90 Days</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-st">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-tx-tertiary">
                      KMS Encryption
                    </span>
                    <p className="text-sm font-semibold text-tx mt-1">AES-256-GCM</p>
                    <span className="text-[11px] text-tx-tertiary">Client-Held Keys</span>
                  </div>
                </div>
              </div>

              {/* Data Protection Checklist */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-st bg-white text-xs">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="font-medium text-tx">Zero Data Retention on Third-Party AI Models</span>
                  <span className="ml-auto text-tx-tertiary text-[11px]">Enforced via Gateway</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-st bg-white text-xs">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="font-medium text-tx">Automated Daily Disaster Recovery Snapshots</span>
                  <span className="ml-auto text-tx-tertiary text-[11px]">Cross-Region AWS S3</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-st bg-white text-xs">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="font-medium text-tx">Continuous Static & Dynamic Vulnerability Scanning (SAST/DAST)</span>
                  <span className="ml-auto text-tx-tertiary text-[11px]">Weekly Pentests</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Sign In */}
          {activeTab === 'login' && (
            <div className="max-w-md mx-auto py-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sr-slate text-white mx-auto flex items-center justify-center mb-3 shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-season-mix text-xl text-tx font-medium">
                  Client Portal Authentication
                </h4>
                <p className="text-xs text-tx-secondary mt-1">
                  Access your dedicated Jira sprint board, GitHub repo mirror, and deployment pipelines.
                </p>
              </div>

              {loginStatus === 'sent' ? (
                <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-center animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-green-900 text-sm">Magic link dispatched!</h5>
                  <p className="text-xs text-green-800 mt-1">
                    We sent a secure one-click sign in link to <strong>{emailInput}</strong>.
                  </p>
                  <button
                    onClick={() => setLoginStatus('idle')}
                    className="mt-4 text-xs font-semibold text-green-900 underline underline-offset-2 cursor-pointer"
                  >
                    Try another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-tx mb-1">
                      Enterprise Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-st bg-sf text-xs md:text-sm text-tx focus:outline-none focus:border-sr-indigo-600 focus:ring-1 focus:ring-sr-indigo-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loginStatus === 'sending'}
                    className="w-full py-2.5 rounded-full bg-sr-slate text-white text-xs md:text-sm font-medium hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {loginStatus === 'sending' ? (
                      <span>Sending secure link...</span>
                    ) : (
                      <>
                        <span>Send Magic Sign-in Link</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-st" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-3 text-tx-tertiary">or sign in with SSO</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => alert('SSO with Google Workspace simulated. Portal access granted in demo mode.')}
                      className="p-2.5 rounded-xl border border-st hover:bg-sf-secondary text-xs font-medium text-tx transition-colors cursor-pointer text-center"
                    >
                      Google Workspace
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('SSO with Okta/Azure Entra simulated. Portal access granted in demo mode.')}
                      className="p-2.5 rounded-xl border border-st hover:bg-sf-secondary text-xs font-medium text-tx transition-colors cursor-pointer text-center"
                    >
                      Okta / Entra ID
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-st-secondary bg-sf-secondary/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-tx-tertiary">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-sr-indigo-700" />
            <span>End-to-end encrypted telemetry & audit trails</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border border-st bg-white text-tx hover:bg-gray-50 text-xs font-medium cursor-pointer transition-colors"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
}
