import React from 'react';
import {
  ConsertosHeroSection,
  ConsertosAboutSection,
  ConsertosDifferentialsSection,
  ConsertosProcessSection,
  ConsertosServicesSection,
  ConsertosTestimonialsSection,
  ConsertosGuaranteesSection,
  ConsertosPostCareSection,
  ConsertosFAQSection,
  ConsertosFinalCTASection,
} from '@/components/services/consertos';

export default function ConsertosPage() {
  return (
    <div className="min-h-screen bg-marfim">
      <ConsertosHeroSection />
      <ConsertosAboutSection />
      <ConsertosDifferentialsSection />
      <ConsertosProcessSection />
      <ConsertosServicesSection />
      <ConsertosTestimonialsSection />
      <ConsertosGuaranteesSection />
      <ConsertosPostCareSection />
      <ConsertosFAQSection />
      <ConsertosFinalCTASection />
    </div>
  );
}
