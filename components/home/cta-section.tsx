'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, MessageCircle, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Garantia vitalícia',
    description: 'Revisões, limpeza e ajustes incluídos para manter a peça impecável.',
  },
  {
    icon: Gem,
    title: 'Materiais certificados',
    description: 'Metais nobres e gemas com laudos emitidos por especialistas do atelier.',
  },
  {
    icon: Calendar,
    title: 'Agenda transparente',
    description: 'Planejamento claro de etapas e prazos, com vagas limitadas por mês.',
  },
];

const infoBadges = [
  'Resposta em até 2 horas úteis',
  'Atelier próprio em Campina Grande',
  'Projetos limitados por mês',
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F5F0] py-24">
      <div className="pointer-events-none absolute -top-32 -left-20 h-64 w-64 rounded-full bg-ouro/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-[-160px] h-80 w-80 rounded-full bg-esmeralda/15 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(24,68,52,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr,0.95fr]">
          <AnimatedSection className="space-y-10" delay={0.1}>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-esmeralda/20 bg-white px-5 py-2 text-esmeralda shadow-[0_10px_30px_-18px_rgba(24,68,52,0.5)]"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em]">Atendimento exclusivo</span>
            </motion.div>

            <div className="space-y-6">
              <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-esmeralda">
                Reserve sua consultoria
                <span className="block bg-gradient-to-r from-ouro via-ouro-light to-esmeralda-light bg-clip-text text-transparent">
                  agenda limitada do atelier
                </span>
              </h2>

              <p className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-grafite">
                Nossa equipe dedica tempo exclusivo para cada projeto. Conte sua ideia e receba orientação especializada, com resposta em até 2 horas úteis.
              </p>
            </div>

            <ul className="grid gap-6">
              {highlights.map((item) => (
                <li key={item.title} className="flex gap-4 rounded-2xl bg-white/70 p-5 shadow-[0_18px_40px_-28px_rgba(24,68,52,0.35)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-esmeralda/10 text-esmeralda">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-esmeralda">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-grafite/80">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection className="space-y-8" delay={0.25}>
            <motion.div
              className="rounded-3xl border border-esmeralda/15 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(24,68,52,0.35)]"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-esmeralda-light to-esmeralda text-white shadow-lg shadow-esmeralda/30">
                  <Calendar className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-esmeralda/70">Planejamento sob medida</p>
                  <h3 className="font-playfair text-2xl font-semibold text-esmeralda">Agendar consultoria</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-grafite/85">
                Envie o formulário e receba cronograma, materiais sugeridos e investimento estimado em até 24 horas úteis.
              </p>
              <Button
                size="lg"
                asChild
                className="mt-8 w-full bg-gradient-to-r from-esmeralda to-esmeralda-light text-white shadow-[0_18px_40px_-24px_rgba(24,68,52,0.45)] hover:shadow-[0_22px_44px_-20px_rgba(24,68,52,0.55)]"
              >
                <Link href="/orcamento" className="inline-flex w-full items-center justify-center gap-2">
                  Agendar consultoria
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-green-500/30 bg-white p-8 shadow-[0_30px_60px_-32px_rgba(24,68,52,0.3)]"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/30">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-green-700/70">Conversa imediata</p>
                  <h3 className="font-playfair text-2xl font-semibold text-esmeralda">Falar no WhatsApp</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-grafite/85">
                Prefere falar agora? Responda pelo WhatsApp para tirar dúvidas, receber sugestões e alinhar o próximo passo.
              </p>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="mt-8 w-full border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600"
              >
                <a
                  href="https://wa.me/5583988073784?text=Olá! Quero falar com a equipe da Cícero Joias sobre um projeto personalizado."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2"
                >
                  Conversar no WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-esmeralda/10 bg-white/80 p-6 shadow-[0_20px_50px_-30px_rgba(24,68,52,0.35)]"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="grid gap-4 sm:grid-cols-3">
                {infoBadges.map((badge) => (
                  <div
                    key={badge}
                    className="flex min-h-[72px] items-center justify-center rounded-2xl border border-esmeralda/15 bg-white px-6 py-4 text-center shadow-sm"
                  >
                    <span className="text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.22em] sm:tracking-[0.18em] md:tracking-[0.12em] text-esmeralda/75 leading-tight">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
