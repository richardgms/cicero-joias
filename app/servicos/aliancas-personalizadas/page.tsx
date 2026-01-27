import React from 'react';
import dynamic from 'next/dynamic';
import { AliancasHeroSection } from '@/components/services/aliancas/hero-section';
import { MetalOptionsSection } from '@/components/services/aliancas/metal-options-section';
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
      <section id="hero"><AliancasHeroSection /></section>
      <section id="metais"><MetalOptionsSection /></section>
      <section id="diferenciais"><FeaturesSection /></section>
      <section id="processo"><ProcessSection /></section>
      <section id="portfolio"><PortfolioPreviewSection /></section>
      <section id="autoridade"><AuthoritySection /></section>
      <section id="depoimentos"><AliancasTestimonialsSection /></section>
      <section id="contato"><FinalCTASection /></section>
    </div>
  );
}