'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
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

function StepCard({ step, align }: { step: Step; align: 'left' | 'right' }) {
  const alignClasses =
    align === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <Card
      variant="light"
      className="relative overflow-hidden p-6 lg:transition-[transform,box-shadow] lg:duration-200 lg:hover:-translate-y-1 lg:hover:shadow-card-hover motion-reduce:transform-none"
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-3 select-none font-numeric text-5xl leading-none text-action-strong ${
          align === 'right' ? 'left-5' : 'right-5'
        }`}
      >
        {step.number}
      </span>

      <div className={`relative z-10 flex w-full flex-col gap-3 ${alignClasses}`}>
        <h3 className="font-heading text-xl font-medium text-text-primary">
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          {step.description}
        </p>
        <div className="w-full border-t border-border-subtle pt-4">
          <div
            className={`flex items-start gap-2 ${
              align === 'right' ? 'flex-row-reverse' : ''
            }`}
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-action-strong"
              aria-hidden="true"
            />
            <p className="text-xs leading-relaxed text-text-secondary">
              {step.detail}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ConsertosProcessSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="consertos-process-heading"
    >
      <Container size="md" className="space-y-12 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="light"
            titleId="consertos-process-heading"
            eyebrow={
              <Badge variant="sectionLight" className="gap-2">
                <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
                Nosso processo
              </Badge>
            }
            title="Como conduzimos cada conserto"
            description="Uma linha do tempo clara para acompanhar sua peça desde a avaliação até a entrega com acabamento impecável."
          />
        </AnimatedSection>

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l border-dashed border-border-default lg:block"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-2 left-5 top-2 border-l border-dashed border-border-default lg:hidden"
            aria-hidden="true"
          />

          <ol className="flex list-none flex-col gap-8 lg:gap-14">
            {PROCESS_STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;
              const Icon = step.icon;

              return (
                <li key={step.number} className="relative">
                  <AnimatedSection delay={0.12 + index * 0.08}>
                    <div className="hidden lg:grid lg:grid-cols-[1fr,auto,1fr] lg:items-center lg:gap-6">
                      <div className="flex justify-end">
                        {isLeft && <StepCard step={step} align="right" />}
                      </div>

                      <motion.span
                        className="flex h-16 w-16 items-center justify-center rounded-card bg-action-primary text-text-on-dark shadow-card"
                        initial={
                          shouldReduceMotion ? false : { scale: 0, rotate: -180 }
                        }
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
                      >
                        <Icon className="h-8 w-8" aria-hidden="true" />
                      </motion.span>

                      <div className="flex justify-start">
                        {!isLeft && <StepCard step={step} align="left" />}
                      </div>
                    </div>

                    <div className="flex items-start gap-4 lg:hidden">
                      <span className="z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-action-primary text-text-on-dark">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <StepCard step={step} align="left" />
                      </div>
                    </div>
                  </AnimatedSection>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
