'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  Zap,
  CircleDot,
  Gem,
  Watch,
  Glasses,
  Wrench,
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
      'Troca de bateria com garantia, revisão de máquinas, ajustes de pulseira e vedação básica.',
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

export function ConsertosServicesSection() {
  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="consertos-services-heading"
    >
      <Container className="space-y-12 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="light"
            titleId="consertos-services-heading"
            eyebrow={<Badge variant="sectionLight">Serviços do dia a dia</Badge>}
            title="O que consertamos"
            description="Do reparo rápido ao desafio delicado, tratamos cada peça com a mesma precisão artesanal."
          />
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" delay={0.12} stagger>
          {SERVICE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                variant="light"
                className="flex h-full flex-col gap-4 p-6"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-xl font-medium text-text-primary">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
