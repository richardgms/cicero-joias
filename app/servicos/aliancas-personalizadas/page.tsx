import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/services/aliancas/features-section';

// Lazy load below-fold sections for better initial page load performance
const ProcessSection = dynamic(() => import('@/components/services/aliancas/process-section').then(mod => mod.ProcessSection), {
  ssr: true, // Manter SSR para SEO
});

const PortfolioPreviewSection = dynamic(() => import('@/components/home/portfolio-preview-section').then(mod => mod.PortfolioPreviewSection), {
  ssr: true,
});

const AuthoritySection = dynamic(() => import('@/components/services/aliancas/authority-section').then(mod => mod.AuthoritySection), {
  ssr: true,
});

const AliancasTestimonialsSection = dynamic(() => import('@/components/services/aliancas/testimonials-section').then(mod => mod.AliancasTestimonialsSection), {
  ssr: true,
});

const FinalCTASection = dynamic(() => import('@/components/home/final-cta-section').then(mod => mod.FinalCTASection), {
  ssr: true,
});

export default function AliancasPersonalizadasPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <PortfolioPreviewSection />
      <AuthoritySection />
      <AliancasTestimonialsSection />
      <FinalCTASection />
    </div>
  );
}