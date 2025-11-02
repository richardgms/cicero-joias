import React from 'react';
import {
  BanhoOuroHeroSection,
  BanhoOuroAboutSection,
  BanhoOuroDifferentialsSection,
  BanhoOuroProcessSection,
  BanhoOuroFAQSection,
  BanhoOuroFinalCTASection
} from '@/components/services/banho-ouro';

export default function BanhoDeOuroPage() {
  return (
    <div className="min-h-screen">
      <BanhoOuroHeroSection />
      <BanhoOuroAboutSection />
      <BanhoOuroDifferentialsSection />
      <BanhoOuroProcessSection />
      <BanhoOuroFAQSection />
      <BanhoOuroFinalCTASection />
    </div>
  );
}