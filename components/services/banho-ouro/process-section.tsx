'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Droplets,
  Layers,
  Package,
  Settings,
  ShieldPlus,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

const WHATSAPP_NUMBER = '5583991180251';
const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  phase: string;
  highlight?: boolean;
};

const PROCESS_STEPS: Step[] = [
  {
    number: '01',
    icon: Droplets,
    title: 'Limpeza Profunda',
    description:
      'Remoção completa de impurezas, oxidação e resíduos da superfície da peça através de processo químico especializado.',
    phase: 'Fase inicial',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Preparação da Superfície',
    description:
      'Tratamento da base metálica para garantir aderência perfeita das próximas camadas através de processos mecânicos e químicos.',
    phase: 'Fase de preparo',
  },
  {
    number: '03',
    icon: Layers,
    title: 'Aplicação de Cobre',
    description:
      'Camadas de cobre alcalino e ácido aplicadas por eletrodeposição, criando base uniforme para melhor aderência do ouro.',
    phase: 'Fase de base',
  },
  {
    number: '04',
    icon: ShieldPlus,
    title: 'Camada de Paládio',
    description:
      'Aplicação de paládio com propriedades antialérgicas, protegendo a pele e criando barreira entre o cobre e o ouro.',
    phase: 'Fase de proteção',
  },
  {
    number: '05',
    icon: Sparkles,
    title: 'Banho de Ouro 18k',
    description:
      'Múltiplas camadas de ouro 18 quilates aplicadas por galvanoplastia, seguidas de banho flash para brilho intenso e durável.',
    phase: 'Fase principal',
    highlight: true,
  },
  {
    number: '06',
    icon: Package,
    title: 'Verniz Protetor e Finalização',
    description:
      'Aplicação de verniz especial para joias que protege o banho contra oxidação, aumentando significativamente a durabilidade.',
    phase: 'Fase final',
  },
];

function StepCard({ step, align }: { step: Step; align: 'left' | 'right' }) {
  const alignClasses =
    align === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <Card
      variant="light"
      className={`relative overflow-hidden p-5 sm:p-6 ${
        step.highlight ? 'border-action-strong' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-3 select-none font-numeric text-5xl leading-none text-action-strong ${
          align === 'right' ? 'left-5' : 'right-5'
        }`}
      >
        {step.number}
      </span>

      <div className={`relative z-10 flex w-full flex-col gap-2 ${alignClasses}`}>
        <p className="text-xs font-bold uppercase tracking-label text-text-secondary">
          {step.phase}
        </p>
        <h3 className="font-heading text-xl font-medium text-text-primary">
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          {step.description}
        </p>
      </div>
    </Card>
  );
}

export function BanhoOuroProcessSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section tone="light" spacing="md" aria-labelledby="banho-ouro-process-heading">
      <Container size="md" className="space-y-12 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="light"
            titleId="banho-ouro-process-heading"
            eyebrow={
              <Badge variant="sectionLight" className="gap-2">
                <Settings className="h-3.5 w-3.5" aria-hidden="true" />
                Nosso processo
              </Badge>
            }
            title={
              <>
                Galvanoplastia{' '}
                <span className="italic text-action-strong">profissional</span>
              </>
            }
            description="Cada etapa é executada com precisão técnica e controle rigoroso de temperatura e corrente elétrica, garantindo resultado superior e duradouro."
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

          <ol className="flex list-none flex-col gap-5 sm:gap-8 lg:gap-14">
            {PROCESS_STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;
              const Icon = step.icon;

              return (
                <li key={step.number} className="relative">
                  <AnimatedSection delay={0.1 + index * 0.06}>
                    <div className="hidden lg:grid lg:grid-cols-[1fr,auto,1fr] lg:items-center lg:gap-6">
                      <div className="flex justify-end">
                        {isLeft && <StepCard step={step} align="right" />}
                      </div>

                      <motion.span
                        className={`flex h-16 w-16 items-center justify-center rounded-card text-text-on-dark shadow-card ${
                          step.highlight ? 'bg-action-strong' : 'bg-action-primary'
                        }`}
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

                    <div className="flex items-start gap-3 lg:hidden">
                      <span
                        className={`z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full text-text-on-dark ${
                          step.highlight ? 'bg-action-strong' : 'bg-action-primary'
                        }`}
                      >
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

        <AnimatedSection delay={0.2}>
          <Card variant="light" className="mx-auto max-w-3xl p-6 text-center sm:p-8">
            <h3 className="font-heading text-2xl font-medium text-text-primary sm:text-3xl">
              Prazo médio: 14 dias úteis
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
              O tempo de execução pode variar conforme a complexidade da peça
              e a opção de banho escolhida. Mantemos você informado sobre
              cada etapa do processo através do WhatsApp.
            </p>
            <Button
              asChild
              variant="gold"
              size="default"
              className="group mt-6"
            >
              <a
                href={createWhatsAppLink(
                  'Olá! Gostaria de entender melhor o processo de banho de ouro.'
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tirar dúvidas sobre o processo
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </Card>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
