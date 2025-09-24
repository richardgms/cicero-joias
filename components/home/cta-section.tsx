'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { badges, whatsappLinks } from './home-data';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#F1ECE2] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(207,154,36,0.18),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center" delay={0.05}>
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-esmeralda/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
              Atendimento direto
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-semibold text-esmeralda">
              Fale agora pelo WhatsApp para combinar a visita ou resolver tudo on-line
            </h2>
            <p className="text-base sm:text-lg text-grafite/75">
              O mesmo ourives que executa as aliancas responde suas duvidas, indica modelos e acompanha a manutencao apos a entrega. Agenda com vagas limitadas por mes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <motion.a
                href={whatsappLinks.primary}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-esmeralda px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-marfim shadow-[0_25px_45px_-22px_rgba(24,68,52,0.42)]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="h-4 w-4" />
                Falar agora
              </motion.a>
              <motion.a
                href={whatsappLinks.visit}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-esmeralda/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda transition-colors hover:bg-esmeralda/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Calendar className="h-4 w-4" />
                Agendar visita
              </motion.a>
            </div>
          </div>

          <motion.div
            className="rounded-3xl border border-esmeralda/15 bg-white/90 p-8 shadow-[0_30px_65px_-36px_rgba(24,68,52,0.35)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4 text-grafite/75">
              <h3 className="font-playfair text-2xl font-semibold text-esmeralda">
                Preferir falar por mensagem?
              </h3>
              <p className="text-sm leading-relaxed">
                Envie detalhes do modelo, data especial e medidas que ja conhece. Responderemos com fotos, valores e sugestoes no mesmo dia util.
              </p>
              <motion.a
                href={whatsappLinks.primary}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-esmeralda transition-colors hover:text-ouro"
                whileHover={{ x: 3 }}
              >
                Quero enviar detalhes agora
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {badges.map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-3 text-center">
                  <div className="relative h-20 w-20">
                    <Image
                      src={badge.image}
                      alt={badge.label}
                      width={80}
                      height={80}
                      className="h-20 w-20"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-esmeralda/80">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
