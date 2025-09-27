import React from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';
import { ProcessSection } from '@/components/home/process-section';
import { PortfolioPreviewSection } from '@/components/home/portfolio-preview-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { AuthoritySection } from '@/components/home/authority-section';
import { FinalCTASection } from '@/components/home/final-cta-section';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <PortfolioPreviewSection />
      <AuthoritySection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
}
