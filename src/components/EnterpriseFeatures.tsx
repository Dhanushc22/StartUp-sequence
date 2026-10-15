'use client';

import React from 'react';
import { ShieldCheck, Lock, Cloud, Server, Cpu, Check, Users, RefreshCw } from 'lucide-react';

export default function EnterpriseFeatures() {
  const deploymentModels = [
    {
      title: 'Nexitech Managed Cloud',
      tag: 'Fastest Launch',
      desc: 'Fully managed multi-tenant and dedicated infrastructure with automated horizontal scaling and 99.99% uptime guarantee.',
      bullets: ['Automated zero-downtime rollouts', 'Edge CDN caching in 280+ cities', '24/7 proactive incident monitoring']
    },
    {
      title: 'Private Cloud (VPC)',
      tag: 'Full Isolation',
      desc: 'Deploy directly inside your dedicated AWS, GCP, or Azure VPC account. Your security perimeter, your access controls.',
      bullets: ['Complete data residency guarantee', 'Bring your own KMS encryption keys', 'Direct cloud peering & VPN support']
    },
    {
      title: 'On-Premise & Air-Gapped',
      tag: 'Maximum Security',
      desc: 'Engineered for defense, banking, and sovereign institutions requiring zero external internet egress and total data privacy.',
      bullets: ['Air-gapped deployment verified', 'Local model & weights hosting', 'Full audit logging & compliance reports']
    }
  ];

  return (
    <section id="enterprise" className="mx-auto w-[92%] md:w-10/12 max-w-[1320px] py-16">
      {/* Enterprise Grade Banner */}
      <div className="rounded-3xl border border-st bg-sf-secondary/80 p-8 md:p-14 mb-12">
        <div className="max-w-3xl">
          <p className="font-matter text-xs font-semibold uppercase tracking-widest text-sr-indigo-900 mb-3">
            Enterprise Security & Reliability
          </p>
          <h2 className="font-season-mix text-3xl md:text-[44px] font-medium text-tx leading-tight mb-4">
            Enterprise-grade. Out of the box.
          </h2>
          <p className="font-matter text-sm md:text-base text-tx-secondary leading-relaxed">
            Compliance, control, and performance. Not bolted on as an afterthought—engineered into our codebases, architectures, and CI/CD pipelines from day one.
          </p>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          <div className="p-5 rounded-2xl bg-white border border-st shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-sr-indigo-700 mb-3" />
            <h4 className="font-season-mix text-base font-semibold text-tx mb-1">SOC2 & ISO 27001</h4>
            <p className="font-matter text-xs text-tx-secondary leading-relaxed">
              Standardized security controls, secret rotation, and annual penetration audits.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-st shadow-2xs">
            <Users className="w-6 h-6 text-green-700 mb-3" />
            <h4 className="font-season-mix text-base font-semibold text-tx mb-1">Forward Deployed</h4>
            <p className="font-matter text-xs text-tx-secondary leading-relaxed">
              Senior software engineers and AI researchers embedded directly into your sprints.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-st shadow-2xs">
            <Lock className="w-6 h-6 text-orange-600 mb-3" />
            <h4 className="font-season-mix text-base font-semibold text-tx mb-1">Zero-Trust Privacy</h4>
            <p className="font-matter text-xs text-tx-secondary leading-relaxed">
              AES-256 encryption at rest and TLS 1.3 in-transit with zero data training leakage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-st shadow-2xs">
            <RefreshCw className="w-6 h-6 text-purple-700 mb-3" />
            <h4 className="font-season-mix text-base font-semibold text-tx mb-1">99.99% Uptime SLA</h4>
            <p className="font-matter text-xs text-tx-secondary leading-relaxed">
              Multi-region active-active cluster architectures with instant failover routing.
            </p>
          </div>
        </div>
      </div>

      {/* Deployment Models */}
      <div className="flex flex-col items-center text-center gap-3 mb-10">
        <h3 className="font-season-mix text-2xl md:text-3xl font-medium text-tx">
          Built to run anywhere your business runs
        </h3>
        <p className="font-matter text-sm text-tx-secondary max-w-lg">
          Flexible deployment tiers tailored for high-growth tech startups and global Fortune 500 enterprises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deploymentModels.map((dm, idx) => (
          <div
            key={idx}
            className="p-6 md:p-8 rounded-3xl border border-st bg-white shadow-xs hover:border-sr-indigo-300 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-season-mix text-lg font-medium text-tx">{dm.title}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-matter font-medium bg-sf-secondary border border-st text-tx-secondary">
                  {dm.tag}
                </span>
              </div>
              <p className="font-matter text-xs md:text-sm text-tx-secondary leading-relaxed mb-6">
                {dm.desc}
              </p>
              <ul className="space-y-2 mb-6">
                {dm.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-matter text-tx-secondary">
                    <Check className="w-3.5 h-3.5 text-sr-indigo-700 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
