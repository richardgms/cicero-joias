import React from 'react';
import {
  LentesDeOculosHeroSection,
  LentesDeOculosAboutSection,
  LentesDeOculosDifferentialsSection,
  LentesDeOculosProcessSection,
  LentesDeOculosFAQSection,
  LentesDeOculosFinalCTASection,
} from '@/components/services/lentes-de-oculos';

export default function LentesDeOculosPage() {
  return (
    <div className="min-h-screen">
      <section id="hero"><LentesDeOculosHeroSection /></section>
      <section id="sobre"><LentesDeOculosAboutSection /></section>
      <section id="diferenciais"><LentesDeOculosDifferentialsSection /></section>
      <section id="processo"><LentesDeOculosProcessSection /></section>
      <section id="faq"><LentesDeOculosFAQSection /></section>
      <section id="contato"><LentesDeOculosFinalCTASection /></section>
    </div>
  );
}
