'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Web Applications']);
  const [budget, setBudget] = useState('$10k - $25k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const services = [
    'Web Applications',
    'Mobile Applications (iOS & Android)',
    'AI & Autonomous Agents',
    'Custom Enterprise Software',
    'Cloud & DevOps Infrastructure',
    'UI/UX Design & Brand System',
  ];

  const budgetRanges = ['< $10k', '$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'];

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4338ca', '#6366f1', '#ffedd5', '#d5650f'],
      });
    }, 600);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-300">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-st shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-st-secondary bg-sf-secondary/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sr-indigo-100 text-sr-indigo-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-season-mix text-xl text-tx font-medium">Start Your Project</h3>
              <p className="font-matter text-xs text-tx-tertiary">
                Partner with Nexitech to build your next-generation product
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-tx-tertiary hover:text-tx hover:bg-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto min-h-0 flex-1">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-season-mix text-2xl text-tx font-medium">
                Inquiry Received!
              </h4>
              <p className="font-matter text-sm text-tx-secondary max-w-md">
                Thank you, <strong>{name || 'valued partner'}</strong>. Our engineering leads will review your requirements and reach out within 24 hours to schedule an architecture alignment session.
              </p>
              <div className="p-4 rounded-2xl bg-sf-secondary border border-st-secondary text-left w-full max-w-md text-xs font-matter text-tx-secondary space-y-1 mt-2">
                <div><strong>Selected Services:</strong> {selectedServices.join(', ')}</div>
                <div><strong>Target Budget:</strong> {budget}</div>
                <div><strong>Contact Email:</strong> {email}</div>
              </div>
              <button
                onClick={resetForm}
                className="mt-4 px-6 py-2.5 rounded-full bg-sr-slate text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Service Selection */}
              <div>
                <label className="block font-matter text-xs font-semibold uppercase tracking-wider text-tx-tertiary mb-3">
                  1. What would you like to build?
                </label>
                <div className="flex flex-wrap gap-2">
                  {services.map(s => {
                    const active = selectedServices.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleService(s)}
                        className={`px-3.5 py-2 rounded-full text-xs font-matter transition-all duration-200 cursor-pointer ${
                          active
                            ? 'bg-sr-indigo-700 text-white shadow-sm'
                            : 'bg-sf-secondary text-tx hover:bg-gray-100 border border-st'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block font-matter text-xs font-semibold uppercase tracking-wider text-tx-tertiary mb-3">
                  2. Approximate Budget
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {budgetRanges.map(b => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`px-3 py-2 text-center rounded-xl text-xs font-matter transition-all duration-200 cursor-pointer border ${
                        budget === b
                          ? 'border-sr-indigo-700 bg-sr-indigo-50/60 text-sr-indigo-900 font-medium'
                          : 'border-st bg-white text-tx-secondary hover:bg-sf-secondary'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <label className="block font-matter text-xs font-semibold uppercase tracking-wider text-tx-tertiary">
                  3. Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-st text-sm font-matter text-tx placeholder:text-tx-tertiary focus:outline-none focus:border-sr-indigo-600 focus:ring-1 focus:ring-sr-indigo-600"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Business Email *"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-st text-sm font-matter text-tx placeholder:text-tx-tertiary focus:outline-none focus:border-sr-indigo-600 focus:ring-1 focus:ring-sr-indigo-600"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company or Startup Name (optional)"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-st text-sm font-matter text-tx placeholder:text-tx-tertiary focus:outline-none focus:border-sr-indigo-600 focus:ring-1 focus:ring-sr-indigo-600"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your project or technical vision..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-st text-sm font-matter text-tx placeholder:text-tx-tertiary focus:outline-none focus:border-sr-indigo-600 focus:ring-1 focus:ring-sr-indigo-600 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-full bg-sr-slate text-white font-matter font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#161826] active:scale-[0.98] transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center font-matter text-[11px] text-tx-tertiary mt-2.5">
                  NDA guaranteed. We respect your intellectual property and respond within 24 hours.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
