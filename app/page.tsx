import React from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';
import { PortfolioPreview } from '@/components/home/portfolio-preview';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CTASection } from '@/components/home/cta-section';

// Verificação temporária das variáveis de ambiente
console.log("CLERK PUBLISHABLE KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 10) + "...");
console.log("CLERK SIGN IN URL:", process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL);
console.log("CLERK SIGN UP URL:", process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}