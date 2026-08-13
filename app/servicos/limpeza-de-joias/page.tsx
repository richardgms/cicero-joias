import React from 'react';
import {
  LimpezaDeJoiasHeroSection,
  LimpezaDeJoiasAboutSection,
  LimpezaDeJoiasDifferentialsSection,
  LimpezaDeJoiasProcessSection,
  LimpezaDeJoiasFAQSection,
  LimpezaDeJoiasFinalCTASection,
} from '@/components/services/limpeza-de-joias';

export default function LimpezaDeJoiasPage() {
  return (
    <div className="min-h-screen">
      <section id="hero"><LimpezaDeJoiasHeroSection /></section>
      <section id="sobre"><LimpezaDeJoiasAboutSection /></section>
      <section id="diferenciais"><LimpezaDeJoiasDifferentialsSection /></section>
      <section id="processo"><LimpezaDeJoiasProcessSection /></section>
      <section id="faq"><LimpezaDeJoiasFAQSection /></section>
      <section id="contato"><LimpezaDeJoiasFinalCTASection /></section>
    </div>
  );
}
