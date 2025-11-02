'use client';

import { motion } from 'framer-motion';
import { Clock, Tag, User, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { whatsappLinks } from './home-data';

export function FinalCTASection() {
  const benefits = [
    { icon: Clock, text: 'Resposta em 24h' },
    { icon: Tag, text: 'Orçamento gratuito' },
    { icon: User, text: 'Atendimento personalizado' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#0b1f18] py-8 text-center text-marfim md:py-12 lg:py-14">
      {/* Preset Background Esmeralda - Ver docs/style-presets.md */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

      <AnimatedSection
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-4 sm:px-6 lg:px-8"
        delay={0.1}
      >
        {/* Título */}
        <h2 className="font-philosopher text-3xl font-bold text-marfim sm:text-4xl lg:text-5xl">
          Pronto para seu projeto?
        </h2>

        {/* Descrição */}
        <p className="font-montserrat max-w-2xl text-base leading-relaxed text-marfim/85 sm:text-lg">
          Fale conosco pelo WhatsApp para tirar dúvidas, solicitar orçamento ou agendar uma visita. Nossa equipe está pronta para atender você.
        </p>

        {/* Tags de Benefícios */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {benefits.map((benefit) => (
            <span
              key={benefit.text}
              className="group font-montserrat inline-flex items-center gap-2 rounded-full border border-ouro/50 bg-transparent px-4 py-2 text-sm text-ouro/90 transition-all duration-500 hover:scale-105 hover:border-ouro/70 hover:bg-ouro/10 hover:shadow-sm"
            >
              <benefit.icon className="h-4 w-4 text-ouro transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true" />
              {benefit.text}
            </span>
          ))}
        </div>

        {/* Botão WhatsApp - Preset Botão Principal */}
        <motion.a
          href={whatsappLinks.primary}
          target="_blank"
          rel="noopener noreferrer"
          className="font-jost group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ouro px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)] transition-colors hover:bg-ouro/90 sm:w-auto md:w-auto"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.97 }}
        >
          Falar no WhatsApp
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </AnimatedSection>
    </section>
  );
}
