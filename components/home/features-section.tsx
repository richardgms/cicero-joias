'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { unifiedDifferentiators } from './home-data';

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F9F6EE] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(24,68,52,0.08),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center rounded-full border border-esmeralda/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
            NOSSOS DIFERENCIAIS
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-semibold text-esmeralda">
            Por que escolher a Cícero Joias
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-grafite/75">
            Somos joalheria própria com produção exclusiva e atendimento próximo. Cada aliança é uma promessa de eternidade, com materiais nobres e técnicas refinadas que garantem resistência incomparável.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" delay={0.12} stagger>
          {unifiedDifferentiators.map((item) => (
            <motion.article
              key={item.title}
              className="group relative flex h-full flex-col gap-4 rounded-3xl border border-esmeralda/10 bg-white/95 p-6 shadow-[0_22px_45px_-32px_rgba(24,68,52,0.28)] backdrop-blur-sm transition-all duration-300"
              whileHover={{ y: -6, boxShadow: '0 36px 65px -40px rgba(24,68,52,0.35)' }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-esmeralda-light to-esmeralda text-white shadow-[0_15px_30px_-18px_rgba(24,68,52,0.4)]">
                  <item.icon className="h-6 w-6" />
                </span>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-esmeralda/60">{item.helper}</p>
                  <h4 className="font-semibold text-lg text-esmeralda">{item.title}</h4>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-grafite/75">{item.description}</p>
            </motion.article>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
