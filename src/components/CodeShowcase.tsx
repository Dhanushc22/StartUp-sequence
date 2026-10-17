'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal, Play, Sparkles, ArrowRight, Code2, Layers, Cpu } from 'lucide-react';

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState<'web' | 'mobile' | 'ai' | 'cloud'>('web');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);

  const snippets = {
    web: {
      lang: 'typescript',
      filename: 'nexitech-client.ts',
      install: 'npm install @nexitech/sdk react next',
      code: `import { NexitechClient } from '@nexitech/sdk';

// Initialize production-ready full-stack application
const nexitech = new NexitechClient({
  apiKey: process.env.NEXITECH_API_KEY,
  environment: 'production'
});

export async function createEnterpriseApp() {
  const app = await nexitech.apps.create({
    name: "SaaS Analytics Engine",
    framework: "nextjs-15",
    features: ["auth", "multi-tenant", "edge-cache", "vector-search"],
    database: { provider: "postgresql", autoMigration: true },
    monitoring: { alerts: "slack", latencyThresholdMs: 45 }
  });

  console.log("✓ Application cluster deployed at:", app.domain);
  return app;
}`,
      output: `[Nexitech CLI] Initializing cluster...
✓ PostgreSQL schema migrated (14 models)
✓ Edge middleware configured with sub-15ms worldwide routing
✓ Application deployed: https://analytics.nexitech.app
✓ Health check status: 200 OK (Latency: 14ms)`
    },
    mobile: {
      lang: 'typescript',
      filename: 'mobile-app.tsx',
      install: 'npm install @nexitech/mobile react-native',
      code: `import { NexitechMobile, OfflineSync } from '@nexitech/mobile';

export const MobileClient = new NexitechMobile({
  appId: "com.nexitech.enterprise",
  offlineEngine: new OfflineSync({
    storage: "sqlite",
    syncIntervalSec: 15,
    conflictStrategy: "server-wins"
  }),
  biometrics: { enabled: true, faceId: true }
});

// Stream real-time events over WebSocket
MobileClient.on('sync:complete', (batch) => {
  console.log("60 FPS UI Updated. Synced records:", batch.count);
});`,
      output: `[Nexitech Mobile] Biometrics initialized.
✓ SQLite offline cache initialized (0.8ms read latency)
✓ WebSocket stream established: wss://sync.nexitech.app
✓ 60 FPS frame rate locked.`
    },
    ai: {
      lang: 'python',
      filename: 'agent_pipeline.py',
      install: 'pip install nexitech-ai langchain pydantic',
      code: `from nexitech_ai import AgentCluster, SpeechSynthesis, VisionOCR

# Initialize multi-agent autonomous swarm
agents = AgentCluster(
    model="nexitech-frontier-v4",
    tools=["linear", "slack", "database", "python-repl"],
    memory="vector-hybrid"
)

# Dispatch autonomous task orchestration
response = agents.execute(
    task="Analyze yesterday's API failure logs, isolate culprit commit, and generate fix PR.",
    stream=True
)

for step in response.events:
    print(f"[{step.timestamp}] {step.status}: {step.summary}")`,
      output: `[Nexitech Agent Swarm] Querying vector log cluster...
[18:02:11] LogParser: Identified 401 error in auth token renewal
[18:02:12] GitAnalyzer: Isolated commit 8a19fec (expired cert ttl)
[18:02:14] CodeEngine: Automated pull request generated #482
✓ PR ready for review: https://github.com/nexitech/infra/pull/482`
    },
    cloud: {
      lang: 'hcl',
      filename: 'infra-main.tf',
      install: 'terraform init && terraform apply',
      code: `module "nexitech_cluster" {
  source  = "nexitech/infrastructure/aws"
  version = "~> 3.4"

  cluster_name     = "nexitech-enterprise-prod"
  region           = "ap-south-1" # Mumbai primary
  secondary_region = "us-east-1"  # Multi-region failover

  autoscaling = {
    min_replicas = 3
    max_replicas = 50
    target_cpu_utilization = 70
  }

  security = {
    soc2_compliance = true
    ddos_protection = "shield-advanced"
  }
}`,
      output: `[Terraform] Applying configuration...
✓ VPC created (ap-south-1) with 3 availability zones
✓ EKS Kubernetes cluster created with 3 worker nodes
✓ Multi-region replication to us-east-1 active
✓ Apply complete! Resources: 18 added, 0 changed, 0 destroyed.`
    }
  };

  const currentSnippet = snippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setRunOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setRunOutput(currentSnippet.output);
    }, 800);
  };

  return (
    <section id="api" className="mx-auto w-[92%] md:w-10/12 max-w-[1320px] py-16">
      {/* Heading */}
      <div className="flex flex-col items-center text-center gap-3 mb-10">
        <p className="font-matter text-xs font-semibold uppercase tracking-widest text-sr-indigo-900">
          Engineered for Developers & Engineering Teams
        </p>
        <h2 className="font-season-mix text-3xl md:text-[44px] font-medium text-tx">
          Build anything with Nexitech APIs & Architecture
        </h2>
      </div>

      {/* Code Showcase Terminal Card */}
      <div className="rounded-3xl border border-st bg-[#0e1017] shadow-2xl overflow-hidden text-gray-300">
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-3.5 border-b border-white/10 bg-black/40 gap-3">
          {/* Mac window dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-white/50">{currentSnippet.filename}</span>
          </div>

          {/* Technology Tabs */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => { setActiveTab('web'); setRunOutput(null); }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'web' ? 'bg-white/20 text-white font-medium' : 'text-gray-400 hover:text-white'
              }`}
            >
              Web App (Next.js)
            </button>
            <button
              onClick={() => { setActiveTab('mobile'); setRunOutput(null); }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'mobile' ? 'bg-white/20 text-white font-medium' : 'text-gray-400 hover:text-white'
              }`}
            >
              Mobile (React Native)
            </button>
            <button
              onClick={() => { setActiveTab('ai'); setRunOutput(null); }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'ai' ? 'bg-white/20 text-white font-medium' : 'text-gray-400 hover:text-white'
              }`}
            >
              AI Agents (Python)
            </button>
            <button
              onClick={() => { setActiveTab('cloud'); setRunOutput(null); }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'cloud' ? 'bg-white/20 text-white font-medium' : 'text-gray-400 hover:text-white'
              }`}
            >
              Cloud (Terraform)
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sr-indigo-600 hover:bg-sr-indigo-700 text-white text-xs font-medium cursor-pointer transition-colors"
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-gray-200">
          <pre className="whitespace-pre">
            {currentSnippet.code}
          </pre>
        </div>

        {/* Live Output Drawer if executed */}
        {runOutput && (
          <div className="border-t border-white/10 bg-black/80 p-5 md:p-6 font-mono text-xs text-green-400 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 text-white/50 text-[11px] mb-2 uppercase tracking-wider font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal Execution Output</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed text-green-300">
              {runOutput}
            </pre>
          </div>
        )}

        {/* Terminal Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/30 flex flex-wrap items-center justify-between text-xs text-gray-400 font-mono">
          <span>{currentSnippet.install}</span>
          <span className="text-gray-500">Latency: &lt; 20ms · 99.99% SLA</span>
        </div>
      </div>
    </section>
  );
}
