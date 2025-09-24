'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { authorityAffiliations, authorityMetrics } from './home-data';
import { CheckCircle2 } from 'lucide-react';

export function AuthoritySection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(24,68,52,0.05),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center rounded-full border border-esmeralda/20 bg-esmeralda/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
            Autoridade comprovada
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-semibold text-esmeralda">
            Mais de quatro decadas lapidando historias reais
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-grafite/75">
            A Cicero Joias combina legado familiar com processos certificados para garantir transparencia, rastreabilidade e excelencia em cada alianca entregue.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" delay={0.12} stagger>
          {authorityMetrics.map((metric) => (
            <motion.article
              key={metric.label}
              className="group flex h-full flex-col gap-3 rounded-3xl border border-esmeralda/10 bg-white/90 p-6 shadow-[0_20px_45px_-32px_rgba(24,68,52,0.28)] backdrop-blur-sm"
              whileHover={{ y: -4 }}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-esmeralda/10 text-esmeralda">
                <metric.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-playfair text-3xl font-semibold text-esmeralda">{metric.value}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-esmeralda/60">{metric.label}</p>
              </div>
              <p className="text-sm leading-relaxed text-grafite/70">{metric.description}</p>
            </motion.article>
          ))}
        </AnimatedSection>

        <AnimatedSection className="grid gap-4 sm:grid-cols-3" delay={0.18}>
          {authorityAffiliations.map((item) => (
            <motion.div
              key={item.label}
              className="flex h-full flex-col gap-3 rounded-3xl border border-esmeralda/10 bg-white/95 p-5 text-left shadow-[0_18px_40px_-30px_rgba(24,68,52,0.28)]"
              whileHover={{ y: -4 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/70">
                <CheckCircle2 className="h-4 w-4" />
                Reconhecimento
              </span>
              <p className="font-semibold text-esmeralda">{item.label}</p>
              <p className="text-sm leading-relaxed text-grafite/70">{item.description}</p>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
