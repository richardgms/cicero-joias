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
      <section id="hero"><ConsertosHeroSection /></section>
      <section id="sobre"><ConsertosAboutSection /></section>
      <section id="diferenciais"><ConsertosDifferentialsSection /></section>
      <section id="processo"><ConsertosProcessSection /></section>
      <section id="servicos"><ConsertosServicesSection /></section>
      <section id="depoimentos"><ConsertosTestimonialsSection /></section>
      <section id="garantia"><ConsertosGuaranteesSection /></section>
      <section id="cuidados"><ConsertosPostCareSection /></section>
      <section id="faq"><ConsertosFAQSection /></section>
      <section id="contato"><ConsertosFinalCTASection /></section>
    </div>
  );
}
