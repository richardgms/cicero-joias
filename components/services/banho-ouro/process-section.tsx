'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets,
  Settings,
  Layers,
  ShieldPlus,
  Sparkles,
  Package,
  ArrowRight
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

const WHATSAPP_NUMBER = '5583991180251';
const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export function BanhoOuroProcessSection() {
  const processSteps = [
    {
      number: '01',
      icon: Droplets,
      title: 'Limpeza Profunda',
      description: 'Remoção completa de impurezas, oxidação e resíduos da superfície da peça através de processo químico especializado.',
      time: 'Fase inicial',
      iconGradient: 'from-esmeralda-dark to-esmeralda',
    },
    {
      number: '02',
      icon: Settings,
      title: 'Preparação da Superfície',
      description: 'Tratamento da base metálica para garantir aderência perfeita das próximas camadas através de processos mecânicos e químicos.',
      time: 'Fase de preparo',
      iconGradient: 'from-esmeralda to-esmeralda-light',
    },
    {
      number: '03',
      icon: Layers,
      title: 'Aplicação de Cobre',
      description: 'Camadas de cobre alcalino e ácido aplicadas por eletrodeposição, criando base uniforme para melhor aderência do ouro.',
      time: 'Fase de base',
      iconGradient: 'from-ouro-dark to-ouro',
    },
    {
      number: '04',
      icon: ShieldPlus,
      title: 'Camada de Paládio',
      description: 'Aplicação de paládio com propriedades antialérgicas, protegendo a pele e criando barreira entre o cobre e o ouro.',
      time: 'Fase de proteção',
      iconGradient: 'from-grafite to-esmeralda-dark',
    },
    {
      number: '05',
      icon: Sparkles,
      title: 'Banho de Ouro 18k',
      description: 'Múltiplas camadas de ouro 18 quilates aplicadas por galvanoplastia, seguidas de banho flash para brilho intenso e durável.',
      time: 'Fase principal',
      iconGradient: 'from-ouro-dark to-ouro-light',
      highlight: true,
    },
    {
      number: '06',
      icon: Package,
      title: 'Verniz Protetor e Finalização',
      description: 'Aplicação de verniz especial para joias que protege o banho contra oxidação, aumentando significativamente a durabilidade.',
      time: 'Fase final',
      iconGradient: 'from-esmeralda to-ouro',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-marfim/70 to-marfim py-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,68,52,0.04),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(199,154,52,0.08),transparent_60%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-esmeralda/20 bg-esmeralda/5 px-4 py-1 text-xs font-jost font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
            <Settings className="h-4 w-4" />
            Nosso processo
          </span>
          <h2 className="font-philosopher font-bold text-3xl sm:text-4xl lg:text-5xl text-esmeralda">
            Galvanoplastia <span className="text-ouro">profissional</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg font-montserrat text-grafite/75">
            Cada etapa é executada com precisão técnica e controle rigoroso de temperatura e corrente elétrica, garantindo resultado superior e duradouro.
          </p>
        </AnimatedSection>

        {/* Process Steps - Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-esmeralda/20 via-ouro/30 to-esmeralda/20" />

            {/* Steps */}
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <AnimatedSection
                  key={step.number}
                  delay={0.1 + index * 0.08}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`inline-block rounded-3xl border-2 ${
                        step.highlight ? 'border-ouro/30 bg-ouro/5' : 'border-esmeralda/10 bg-white'
                      } p-6 shadow-[0_20px_45px_-32px_rgba(24,68,52,0.25)]`}
                    >
                      <div className={`space-y-3 ${index % 2 === 0 ? 'items-end' : 'items-start'} flex flex-col`}>
                        <span className="text-xs font-jost font-bold uppercase tracking-[0.2em] text-grafite/50">
                          {step.time}
                        </span>
                        <h3 className="font-philosopher font-bold text-2xl text-esmeralda">
                          {step.title}
                        </h3>
                        <p className="max-w-md text-sm font-montserrat leading-relaxed text-grafite/75">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Icon */}
                  <motion.div
                    className="relative z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                  >
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.iconGradient} shadow-lg`}
                    >
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-esmeralda text-xs font-bold text-white">
                      {step.number}
                    </div>
                  </motion.div>

                  {/* Spacer for alignment */}
                  <div className="flex-1" />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Process Steps - Mobile/Tablet Cards */}
        <div className="lg:hidden space-y-6">
          {processSteps.map((step, index) => (
            <AnimatedSection key={step.number} delay={0.1 + index * 0.05}>
              <motion.div
                className={`rounded-3xl border-2 ${
                  step.highlight ? 'border-ouro/30 bg-ouro/5' : 'border-esmeralda/10 bg-white'
                } p-6 shadow-[0_20px_45px_-32px_rgba(24,68,52,0.25)]`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-4">
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.iconGradient} shadow-lg`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-esmeralda text-xs font-bold text-white">
                      {step.number}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <span className="text-xs font-jost font-bold uppercase tracking-[0.2em] text-grafite/50">
                      {step.time}
                    </span>
                    <h3 className="font-philosopher font-bold text-xl text-esmeralda">
                      {step.title}
                    </h3>
                    <p className="text-sm font-montserrat leading-relaxed text-grafite/75">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Info Box */}
        <AnimatedSection className="rounded-3xl border border-esmeralda/10 bg-gradient-to-br from-esmeralda/5 to-ouro/5 p-8" delay={0.3}>
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h3 className="font-philosopher font-bold text-2xl sm:text-3xl text-esmeralda">
              Prazo médio: 14 dias úteis
            </h3>
            <p className="text-sm sm:text-base font-montserrat text-grafite/75 leading-relaxed">
              O tempo de execução pode variar conforme a complexidade da peça e a opção de banho escolhida. Mantemos você informado sobre cada etapa do processo através do WhatsApp.
            </p>
            <motion.a
              href={createWhatsAppLink('Olá! Gostaria de entender melhor o processo de banho de ouro.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ouro px-6 py-3 text-sm font-jost font-semibold uppercase tracking-[0.2em] text-esmeralda shadow-lg transition-all hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Tirar dúvidas sobre o processo
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}








