'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, Palette, Hammer, Gem, CheckCircle, Sparkles } from 'lucide-react';
import { AnimatedSection, GlassCard, GoldenParticles } from '@/components/ui/animated-section';

const processSteps = [
  {
    icon: Lightbulb,
    title: 'Descoberta guiada',
    description: 'Escutamos sua história e alinhamos expectativas de estilo, prazo e investimento.',
    step: '01',
  },
  {
    icon: Palette,
    title: 'Design aprovado',
    description: 'Criamos renderizações 3D e protótipos com ajustes ilimitados até você validar cada detalhe.',
    step: '02',
  },
  {
    icon: Hammer,
    title: 'Artesanato e lapidação',
    description: 'Ourives especialistas dão vida à peça manualmente, com gemas certificadas e controle minucioso.',
    step: '03',
  },
  {
    icon: CheckCircle,
    title: 'Entrega e cuidado contínuo',
    description: 'Realizamos inspeção final e entregamos com orientação de uso, manutenção e garantia vitalícia.',
    step: '04',
  },
];

const timelineVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delayChildren: 0.1,
      staggerChildren: 0.18,
    },
  },
};

const timelineItemVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function ProcessSection() {
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#061e18]">
      <GoldenParticles count={36} />

      <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-ouro/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-esmeralda-light/25 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] xl:gap-24">
          <AnimatedSection className="space-y-10" delay={0.1}>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-ouro/40 bg-white/5 px-5 py-2 shadow-[0_10px_30px_-15px_rgba(207,154,36,0.6)]"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4 text-ouro" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-marfim/90">
                Nosso Processo Artesanal
              </span>
            </motion.div>

            <div className="space-y-6">
              <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-marfim">
                Da ideia à
                <span className="block bg-gradient-to-r from-ouro via-ouro-light to-yellow-300 bg-clip-text text-transparent">
                  joia perfeita
                </span>
              </h2>

              <p className="max-w-xl text-base sm:text-lg font-light leading-relaxed text-marfim/80">
                Tornamos o caminho claro: alinhamos briefing e investimento, aprovamos o design com você e acompanhamos cada etapa artesanal até a entrega segura.
              </p>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <GlassCard hover={false} className="p-6 text-marfim">
                <span className="text-4xl font-playfair text-ouro leading-none">+40</span>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-marfim/70">Anos de legado em joalheria</p>
                <p className="mt-3 text-sm text-marfim/80">
                  Tradição familiar traduzida em processos contemporâneos e atenção em cada detalhe.
                </p>
              </GlassCard>

              <GlassCard hover={false} className="flex h-full flex-col justify-between gap-4 p-6 text-marfim">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-esmeralda-light/80 to-esmeralda">
                    <Gem className="h-6 w-6 text-marfim" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-marfim/70">Seleção criteriosa</p>
                    <p className="text-sm text-marfim/85">
                      Metais nobres e gemas certificadas escolhidas à mão.
                    </p>
                  </div>
                </div>
                <div className="rounded-full border border-ouro/40 bg-ouro/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ouro/80">
                  Da consultoria à entrega, tudo é artesanal
                </div>
              </GlassCard>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="pointer-events-none absolute left-[28px] top-6 bottom-6 hidden md:block">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-ouro/45 to-transparent" />
            </div>

            <motion.ul
              ref={timelineRef}
              className="flex flex-col gap-10"
              initial="hidden"
              animate={timelineInView ? 'visible' : 'hidden'}
              variants={timelineVariants}
            >
              {processSteps.map((step, index) => (
                <motion.li
                  key={step.step}
                  className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-8"
                  variants={timelineItemVariants}
                >
                  <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-6">
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-ouro to-yellow-300 text-esmeralda font-semibold tracking-tight shadow-[0_18px_45px_-20px_rgba(207,154,36,0.7)] ring-2 ring-ouro/35">
                        {step.step}
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="absolute left-1/2 top-14 hidden h-20 w-px -translate-x-1/2 bg-gradient-to-b from-ouro/50 via-ouro/25 to-transparent md:block" />
                      )}
                    </div>
                  </div>

                  <GlassCard className="flex-1 p-6 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-esmeralda-light/90 to-esmeralda shadow-inner shadow-esmeralda-dark/40">
                          <step.icon className="h-6 w-6 text-marfim" />
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-[0.32em] text-marfim/60">Etapa {step.step}</span>
                          <h3 className="mt-1 font-playfair text-2xl font-semibold text-marfim">
                            {step.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-marfim/80">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <motion.span
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-ouro/80"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.3 }}
                      >
                        Processo contínuo
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 17l7-7-7-7"
                          />
                        </svg>
                      </motion.span>
                    </div>
                  </GlassCard>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        <AnimatedSection className="mt-24" delay={0.6}>
          <GlassCard hover={false} className="relative overflow-hidden px-8 py-10 sm:px-12 text-marfim">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 rounded-l-[100px] bg-gradient-to-l from-ouro/25 via-ouro/10 to-transparent" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl space-y-4">
                <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-marfim">
                  Pronto para iniciar sua jornada sob medida?
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-marfim/80">
                  Agende uma consultoria exclusiva para explorarmos possibilidades, materiais e estilos que traduzam o seu momento.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="https://wa.me/5583988073784?text=Olá! Quero falar com a equipe da Cícero Joias sobre um projeto personalizado."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-ouro to-yellow-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-esmeralda shadow-[0_18px_40px_-20px_rgba(207,154,36,0.7)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Começar meu projeto
                </motion.a>

                <motion.a
                  href="#galeria"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-ouro/50 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ouro"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(207,154,36,0.12)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Galeria
                </motion.a>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
