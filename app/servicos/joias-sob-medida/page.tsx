import React from 'react';
import {
  JoiasSobMedidaHeroSection,
  JoiasSobMedidaAboutSection,
  JoiasSobMedidaDifferentialsSection,
  JoiasSobMedidaProcessSection,
  JoiasSobMedidaFAQSection,
  JoiasSobMedidaFinalCTASection,
} from '@/components/services/joias-sob-medida';

export default function JoiasSobMedidaPage() {
  return (
    <div className="min-h-screen">
      <section id="hero"><JoiasSobMedidaHeroSection /></section>
      <section id="sobre"><JoiasSobMedidaAboutSection /></section>
      <section id="diferenciais"><JoiasSobMedidaDifferentialsSection /></section>
      <section id="processo"><JoiasSobMedidaProcessSection /></section>
      <section id="faq"><JoiasSobMedidaFAQSection /></section>
      <section id="contato"><JoiasSobMedidaFinalCTASection /></section>
    </div>
  );
}
