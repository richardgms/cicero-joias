'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ClipboardList,
  FlaskConical,
  Glasses,
  Package,
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
};

const PROCESS_STEPS: Step[] = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Receita',
    description:
      'Você traz sua receita oftalmológica atualizada, ou tira dúvidas com a gente sobre o que precisa.',
  },
  {
    number: '02',
    icon: Glasses,
    title: 'Escolha',
    description:
      'Escolha a armação (própria ou nova) e o tipo de lente ideal para sua receita e rotina.',
  },
  {
    number: '03',
    icon: FlaskConical,
    title: 'Produção no Laboratório',
    description:
      'Enviamos ao nosso laboratório parceiro, que fabrica a lente com precisão.',
  },
  {
    number: '04',
    icon: Package,
    title: 'Entrega',
    description:
      'Você retira ou recebe seus óculos prontos, com a lente perfeitamente montada na armação.',
  },
];

function StepCard({ step, align }: { step: Step; align: 'left' | 'right' }) {
  const alignClasses =
    align === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <Card variant="light" className="relative overflow-hidden p-5 sm:p-6">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-3 select-none font-numeric text-5xl leading-none text-action-strong ${
          align === 'right' ? 'left-5' : 'right-5'
        }`}
      >
        {step.number}
      </span>

      <div className={`relative z-10 flex w-full flex-col gap-2 ${alignClasses}`}>
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

export function LentesDeOculosProcessSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="lentes-de-oculos-process-heading"
    >
      <Container size="md" className="space-y-12 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="light"
            titleId="lentes-de-oculos-process-heading"
            eyebrow={
              <Badge variant="sectionLight" className="gap-2">
                <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
                Nosso processo
              </Badge>
            }
            title={
              <>
                Da receita aos{' '}
                <span className="italic text-action-strong">óculos prontos</span>
              </>
            }
            description="Um processo simples, com acompanhamento em cada etapa até a entrega dos seus óculos."
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

                    <div className="flex items-start gap-3 lg:hidden">
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

        <AnimatedSection delay={0.2}>
          <Card variant="light" className="mx-auto max-w-3xl p-6 text-center sm:p-8">
            <h3 className="font-heading text-2xl font-medium text-text-primary sm:text-3xl">
              Prazo combinado com você
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
              O prazo de entrega depende do tipo de lente e da disponibilidade
              do laboratório parceiro. Combinamos o prazo estimado durante o
              atendimento.
            </p>
            <Button asChild variant="gold" size="default" className="group mt-6">
              <a
                href={createWhatsAppLink(
                  'Olá! Gostaria de entender melhor como funciona a troca de lentes.'
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
