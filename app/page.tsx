import React from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';
import { ProcessSection } from '@/components/home/process-section';
import { PortfolioPreview } from '@/components/home/portfolio-preview';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CTASection } from '@/components/home/cta-section';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}