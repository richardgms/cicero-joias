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
      <section id="hero"><BanhoOuroHeroSection /></section>
      <section id="sobre"><BanhoOuroAboutSection /></section>
      <section id="diferenciais"><BanhoOuroDifferentialsSection /></section>
      <section id="processo"><BanhoOuroProcessSection /></section>
      <section id="faq"><BanhoOuroFAQSection /></section>
      <section id="contato"><BanhoOuroFinalCTASection /></section>
    </div>
  );
}