'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PlaygroundShowcase from '@/components/PlaygroundShowcase';
import CoworkAccordion from '@/components/CoworkAccordion';
import PlatformPillars from '@/components/PlatformPillars';
import CodeShowcase from '@/components/CodeShowcase';
import EnterpriseFeatures from '@/components/EnterpriseFeatures';
import ProjectEstimator from '@/components/ProjectEstimator';
import Testimonials from '@/components/Testimonials';
import EngineeringInsights from '@/components/EngineeringInsights';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ProjectModal from '@/components/ProjectModal';
import ClientPortalModal from '@/components/ClientPortalModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openPortal = () => setIsPortalOpen(true);
  const closePortal = () => setIsPortalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-sf font-matter text-tx selection:bg-sr-indigo-100 selection:text-sr-indigo-900">
      {/* Top Header */}
      <Header onOpenProjectModal={openModal} onOpenClientPortal={openPortal} />

      {/* Main Body Flow */}
      <main className="flex-1 flex flex-col">
        {/* Hero with Technology Marquee */}
        <Hero onOpenProjectModal={openModal} />

        {/* Centerpiece Interactive Showcase */}
        <PlaygroundShowcase onOpenProjectModal={openModal} />

        {/* Expandable Accordion Bento Grid */}
        <CoworkAccordion onOpenProjectModal={openModal} />

        {/* 3 Master Platform Pillars */}
        <PlatformPillars onOpenProjectModal={openModal} />

        {/* Developer Code & API Showcase */}
        <CodeShowcase />

        {/* Enterprise Security & Cloud Deployments */}
        <EnterpriseFeatures />

        {/* Interactive Scope & Investment Calculator */}
        <ProjectEstimator onOpenProjectModal={openModal} />

        {/* Client Success Testimonials */}
        <Testimonials />

        {/* Engineering Research & Updates */}
        <EngineeringInsights />

        {/* High-Impact Final Call to Action */}
        <FinalCTA onOpenProjectModal={openModal} />
      </main>

      {/* Comprehensive Modern Footer */}
      <Footer onOpenProjectModal={openModal} onOpenClientPortal={openPortal} />

      {/* Global Project Inquiry Modal */}
      <ProjectModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Global Client Portal Modal */}
      <ClientPortalModal isOpen={isPortalOpen} onClose={closePortal} />
    </div>
  );
}
