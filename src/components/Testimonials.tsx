'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Nexitech's forward-deployed engineering squad delivered our enterprise web platform and mobile app in just 8 weeks. Their architecture handled 2.4M peak concurrent requests during our national product launch without a single dropped packet.",
      name: "Shallu Kaushik",
      role: "Chief Digital Officer",
      company: "Tata Capital Digital",
      metric: "+340% User Throughput",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "The low-latency conversational voice agent built by Nexitech transformed our collections and support workflows. Average resolution time dropped from 4.5 minutes to under 30 seconds, operating across Hindi, English, and regional dialects flawlessly.",
      name: "Vikramaditya Sharma",
      role: "Head of Product & AI",
      company: "Axis NextGen Banking",
      metric: "92% First-Call Resolution",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "Rarely do you find an engineering partner that combines deep systems programming with world-class design aesthetics. Nexitech built our entire SaaS platform from scratch, and we closed our Series A within 60 days of shipping.",
      name: "Arjun Nambiar",
      role: "Founder & CEO",
      company: "Decentro Cloud Systems",
      metric: "4.2x Faster Time to Market",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex(prevIdx => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex(prevIdx => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="mx-auto w-[92%] md:w-10/12 max-w-[1320px] py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-matter text-xs font-semibold uppercase tracking-widest text-sr-indigo-900 mb-2">
            Client Success & Proof
          </p>
          <h2 className="font-season-mix text-3xl md:text-[44px] font-medium text-tx">
            What our partners & customers say
          </h2>
        </div>

        {/* Carousel Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-st bg-white flex items-center justify-center hover:bg-sf-secondary transition-colors cursor-pointer text-tx shadow-2xs"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-st bg-white flex items-center justify-center hover:bg-sf-secondary transition-colors cursor-pointer text-tx shadow-2xs"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Featured Testimonial Card */}
      <div className="rounded-3xl border border-st bg-white p-8 md:p-14 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[340px]">
        {/* Quote watermark */}
        <Quote className="absolute right-8 bottom-8 w-28 h-28 text-gray-100/80 pointer-events-none" />

        <div className="relative z-10">
          {/* Star rating & Metric */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <span className="px-3.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-matter font-semibold">
              {current.metric}
            </span>
          </div>

          <p className="font-season-mix text-xl md:text-3xl text-tx leading-relaxed font-normal">
            &ldquo;{current.quote}&rdquo;
          </p>
        </div>

        {/* Author Bio */}
        <div className="flex items-center gap-4 pt-8 border-t border-st/60 mt-8 relative z-10">
          <img
            src={current.avatar}
            alt={current.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-season-mix text-lg font-bold text-tx">{current.name}</span>
              <CheckCircle2 className="w-4 h-4 text-sr-indigo-700" />
            </div>
            <div className="font-matter text-xs text-tx-secondary">
              {current.role} · <strong className="text-tx">{current.company}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
