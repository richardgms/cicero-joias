'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { differentiators, quickProofs, whatsappLinks } from './home-data';

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F9F6EE] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(24,68,52,0.08),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center rounded-full border border-esmeralda/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
            Provas rapidas
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-semibold text-esmeralda">
            Confie em quem acompanha cada etapa pessoalmente
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-grafite/75">
            Desde a primeira conversa, mostramos como funciona a producao artesanal, apresentamos modelos reais na loja e garantimos manutencao continua apos a entrega.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-4 sm:grid-cols-3" delay={0.12} stagger>
          {quickProofs.map((proof) => (
            <motion.article
              key={proof.title}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-esmeralda/15 bg-white p-6 text-left shadow-[0_18px_35px_-28px_rgba(24,68,52,0.2)] transition-all duration-300"
              whileHover={{ y: -4, boxShadow: '0 32px 60px -40px rgba(24,68,52,0.35)' }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-esmeralda/10 text-esmeralda">
                <proof.icon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-esmeralda">{proof.title}</h3>
              <p className="text-sm leading-relaxed text-grafite/70">{proof.description}</p>
            </motion.article>
          ))}
        </AnimatedSection>

        <AnimatedSection className="space-y-6" delay={0.18}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-esmeralda/15 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/70">
                Por que Cicero Joias
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-esmeralda">
                Somos joalheria propria, com producao artesanal e atendimento proximo
              </h3>
            </div>
            <motion.a
              href={whatsappLinks.primary}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-esmeralda/20 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-esmeralda transition-colors hover:bg-esmeralda hover:text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Falar no WhatsApp
            </motion.a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((item) => (
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
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
