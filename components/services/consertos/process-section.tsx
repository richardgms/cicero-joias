'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import {
  ClipboardList,
  ClipboardCheck,
  Hammer,
  Sparkles,
  Phone,
  Check,
  type LucideIcon,
} from 'lucide-react';

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
};

type Highlight = {
  text: string;
};

const PROCESS_STEPS: Step[] = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Avaliação e registro',
    description:
      'Recebemos a peça na loja ou por WhatsApp, avaliamos o estado e registramos cada detalhe antes de iniciar qualquer ação.',
    detail: 'Peça identificada com nome, contato, fotos e observações especiais.',
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Diagnóstico técnico',
    description:
      'O mestre ourives analisa metal, estrutura e danos para definir o reparo ideal e garantir que o material suporta o processo.',
    detail: 'Diagnóstico feito internamente, sem terceirização.',
  },
  {
    number: '03',
    icon: Phone,
    title: 'Orçamento aprovado',
    description:
      'Explicamos o serviço, prazos e valores com total transparência. Reparos simples podem ser executados na hora; casos complexos são alinhados com você.',
    detail: 'Orçamento sem custo e atendimento por ordem de chegada.',
  },
  {
    number: '04',
    icon: Hammer,
    title: 'Execução artesanal',
    description:
      'Solda, ajuste, reposição de pedras, troca de componentes ou revisão de mecanismos: tudo é feito peça a peça com ferramentas adequadas.',
    detail: 'Executado por ourives e relojoeiros experientes dentro da Cícero Joias.',
  },
  {
    number: '05',
    icon: Sparkles,
    title: 'Acabamento e entrega',
    description:
      'Limpeza ultrassônica, polimento completo e retoque de banho quando necessário. Avisamos por WhatsApp e entregamos com orientações de cuidado.',
    detail: 'Entrega com comprovante, cartão de garantia (quando aplicável) e brilho renovado.',
  },
];

const PROCESS_HIGHLIGHTS: Highlight[] = [
  {
    text: 'Soldas rápidas podem ficar prontas em até 20 minutos, conforme a demanda do dia.',
  },
  {
    text: 'Peças sentimentais recebem registro fotográfico e atualizações em cada etapa.',
  },
  {
    text: 'Atendimento por ordem de chegada e garantia em serviços de relógio (1 ano bateria, 3 meses máquina).',
  },
];

function StepCard({ step, align }: { step: Step; align: 'left' | 'right' | 'center' }) {
  const containerAlign =
    align === 'center'
      ? 'items-center text-center'
      : align === 'left'
      ? 'text-center lg:text-left lg:items-start'
      : 'text-center lg:text-right lg:items-end';

  const detailAlign =
    align === 'center'
      ? 'text-center'
      : align === 'left'
      ? 'text-center lg:text-left'
      : 'text-center lg:text-right';

  return (
    <div
      className={`flex w-full flex-col gap-3 rounded-3xl border border-esmeralda/10 bg-white/95 p-6 shadow-[0_24px_60px_-36px_rgba(24,68,52,0.25)] ${containerAlign}`}
    >
      <div className="space-y-2">
        <h3 className="font-playfair text-2xl font-semibold text-esmeralda">{step.title}</h3>
        <p className="text-sm leading-relaxed text-grafite/75">{step.description}</p>
      </div>
      <p className={`text-xs uppercase tracking-[0.28em] text-ouro ${detailAlign}`}>{step.detail}</p>
    </div>
  );
}

export function ConsertosProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8f4ea] py-14 sm:py-18">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-marfim via-[#fcf8ef] to-white" />
        <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-ouro/18 blur-3xl" />
        <div className="absolute -bottom-36 left-1/5 h-80 w-80 rounded-full bg-esmeralda/12 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(24,68,52,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(199,154,52,0.04)_0%,rgba(248,244,234,0)_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_60%,rgba(199,154,52,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,rgba(24,68,52,0.08),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-esmeralda/15 bg-esmeralda/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda">
            <ClipboardList className="h-4 w-4" />
            Nosso processo
          </span>
          <h2 className="font-playfair text-3xl font-semibold text-esmeralda sm:text-4xl lg:text-5xl">
            Como conduzimos cada conserto
          </h2>
          <p className="mx-auto max-w-3xl text-base text-grafite/75 sm:text-lg">
            Uma linha do tempo clara para acompanhar sua peça desde a avaliação até a entrega com acabamento impecável.
          </p>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l border-dashed border-esmeralda/25 lg:block" />
          <div className="flex flex-col gap-14">
            {PROCESS_STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isLast = index === PROCESS_STEPS.length - 1;
              const Icon = step.icon;

              return (
                <AnimatedSection key={step.number} delay={0.12 + index * 0.08}>
                  <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:items-stretch">
                    <div className="hidden lg:flex lg:w-1/2 lg:justify-end">
                      {isLeft && <StepCard step={step} align="right" />}
                    </div>

                    <div className="flex flex-col items-center gap-3 lg:w-auto lg:min-h-[220px] lg:gap-4 lg:px-6">
                      {index > 0 && (
                        <div className="hidden lg:block w-px flex-1 min-h-[40px] bg-gradient-to-b from-ouro/20 via-ouro/30 to-ouro/40" />
                      )}
                      <motion.div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-esmeralda-dark to-esmeralda text-marfim shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ouro/10 text-xs font-bold uppercase tracking-[0.2em] text-ouro">
                        {step.number}
                      </span>
                      {!isLast && (
                        <div className="hidden lg:block w-px flex-1 min-h-[40px] bg-gradient-to-b from-ouro/40 via-ouro/25 to-transparent" />
                      )}
                    </div>

                    <div className="hidden lg:flex lg:w-1/2 lg:justify-start">
                      {!isLeft && <StepCard step={step} align="left" />}
                    </div>

                    <div className="w-full lg:hidden">
                      <StepCard step={step} align="center" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        <AnimatedSection className="rounded-3xl border border-esmeralda/10 bg-white/95 p-8 text-center shadow-[0_24px_60px_-36px_rgba(24,68,52,0.2)]" delay={0.35}>
          <div className="mx-auto max-w-3xl space-y-5">
            <h3 className="font-playfair text-2xl font-semibold text-esmeralda sm:text-3xl">
              Transparência em cada etapa
            </h3>
            <p className="text-sm text-grafite/75 sm:text-base">
              Você recebe atualizações durante todo o processo, seja para reparos rápidos ou trabalhos complexos que exigem mais tempo.
            </p>
            <ul className="grid gap-3 text-left text-sm text-esmeralda sm:grid-cols-3">
              {PROCESS_HIGHLIGHTS.map((highlight) => (
                <li key={highlight.text} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ouro" />
                  <span>{highlight.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
