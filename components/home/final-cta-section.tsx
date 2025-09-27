'use client';

import { motion } from 'framer-motion';
import { WhatsappIcon } from '@/components/icons';
import { AnimatedSection } from '@/components/ui/animated-section';
import { whatsappLinks } from './home-data';

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-esmeralda py-7 text-center text-white sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_45%)]" />

      <AnimatedSection
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 sm:px-6 lg:px-8"
        delay={0.1}
      >
        <span className="inline-flex items-center rounded-full border border-marfim/20 bg-marfim/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-marfim">
          Atendimento artesanal
        </span>
        <h2 className="font-playfair text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Pronto para criar as alianças que contam a sua história?
        </h2>
        <p className="max-w-2xl text-base text-marfim/80 sm:text-lg">
          Fale diretamente com o nosso ourives pelo WhatsApp e receba sugestões de modelos, prazos e valores em até 24 horas úteis.
        </p>
        <motion.a
          href={whatsappLinks.primary}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-marfim px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-lg shadow-black/20"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <WhatsappIcon className="h-4 w-4" />
          Solicitar orçamento
        </motion.a>
      </AnimatedSection>
    </section>
  );
}
