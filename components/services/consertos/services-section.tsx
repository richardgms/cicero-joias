'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import {
  Zap,
  CircleDot,
  Gem,
  Watch,
  Glasses,
  Wrench,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

type ServiceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const SERVICE_ITEMS: ServiceItem[] = [
  {
    icon: Zap,
    title: 'Soldas precisas',
    description:
      'Correntes, pulseiras, anéis e peças quebradas recebem solda resistente e acabamento refinado.',
  },
  {
    icon: CircleDot,
    title: 'Ajustes de aro',
    description:
      'Apertamos, folgamos, alinhamos e restauramos alianças e anéis com conforto perfeito.',
  },
  {
    icon: Gem,
    title: 'Reposição de pedras',
    description:
      'Fixação segura, alinhamento de garras e polimento final para recuperar o brilho original.',
  },
  {
    icon: Watch,
    title: 'Relógios',
    description:
      'Troca de bateria (garantia 1 ano), revisão de máquinas, ajustes de pulseira e vedação básica.',
  },
  {
    icon: Glasses,
    title: 'Óculos',
    description:
      'Troca de mola, plaqueta e parafusos, além de alinhamento completo das hastes e armações.',
  },
  {
    icon: Wrench,
    title: 'Peças especiais',
    description:
      'Projetos personalizados e consertos raros analisados caso a caso com orientação transparente.',
  },
];

const SERVICE_HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Atendimento interno',
    description:
      'Todos os reparos são executados dentro da Cícero Joias, com contato direto com os especialistas.',
  },
  {
    icon: MessageCircle,
    title: 'Transparência total',
    description:
      'Envie fotos pelo WhatsApp ou traga a peça. Avisamos prazos e atualizações durante o processo.',
  },
  {
    icon: HelpCircle,
    title: 'Garantias e orientações',
    description:
      'Garantia para relógios, comprovante em duplicidade e orientações de uso para evitar novas quebras.',
  },
];

export function ConsertosServicesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-marfim-light to-white py-14 sm:py-18 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(24,68,52,0.05),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(199,154,52,0.08),transparent_60%)]" />
        <div className="absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-ouro/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-esmeralda/15 bg-esmeralda/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda">
            O que consertamos
          </span>
          <h2 className="font-playfair text-3xl font-semibold text-esmeralda sm:text-4xl lg:text-5xl">
            O que consertamos todos os dias
          </h2>
          <p className="mx-auto max-w-3xl text-base text-grafite/75 sm:text-lg">
            Do reparo rápido ao desafio delicado, tratamos cada peça com a mesma precisão artesanal.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" delay={0.12} stagger>
          {SERVICE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex h-full flex-col gap-4 rounded-3xl border border-esmeralda/10 bg-white/95 p-6 shadow-[0_24px_60px_-38px_rgba(24,68,52,0.25)] transition-transform hover:-translate-y-1 hover:shadow-[0_28px_70px_-42px_rgba(24,68,52,0.28)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-esmeralda-dark to-esmeralda text-marfim shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-playfair text-xl font-semibold text-esmeralda">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-grafite/75">{item.description}</p>
                </div>
              </div>
            );
          })}
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 rounded-3xl border border-esmeralda/10 bg-white/95 p-8 shadow-[0_24px_60px_-38px_rgba(24,68,52,0.25)] lg:grid-cols-3" delay={0.25}>
          {SERVICE_HIGHLIGHTS.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <div key={highlight.title} className="flex flex-col gap-4 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ouro/10">
                    <Icon className="h-5 w-5 text-ouro" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-esmeralda">{highlight.title}</h4>
                  <p className="text-sm leading-relaxed text-grafite/75">{highlight.description}</p>
                </div>
              </div>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
