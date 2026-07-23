'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { ShieldCheck, ClipboardCheck, ClipboardList, Lock } from 'lucide-react';

const GUARANTEE_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Registro e rastreio internos',
    description:
      'Catalogamos cada peça com nome, telefone, descrição e foto. O comprovante em duplicidade garante segurança na entrega.',
  },
  {
    icon: ClipboardCheck,
    title: 'Garantia para relógios',
    description:
      '1 ano para troca de bateria, 3 meses para troca de máquina e ajustes de pulseira revisados no ato da retirada.',
  },
  {
    icon: ClipboardList,
    title: 'Monitoramento durante o processo',
    description:
      'Atualizamos sobre prazos, confirmamos cuidados especiais e avisamos assim que o serviço entra em execução.',
  },
];

export function ConsertosGuaranteesSection() {
  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="consertos-guarantees-heading"
    >
      <Container className="space-y-12">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="light"
            titleId="consertos-guarantees-heading"
            eyebrow={<Badge variant="sectionLight">Segurança e garantias</Badge>}
            title="Protocolos que protegem sua peça do início ao fim"
          />
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 lg:grid-cols-3" delay={0.12} stagger>
          {GUARANTEE_ITEMS.map((item) => (
            <Card
              key={item.title}
              variant="light"
              className="flex h-full flex-col gap-4 p-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-xl font-medium text-text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </Card>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={0.24}>
          <Card variant="light" className="p-8">
            <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
              <span className="flex h-12 w-12 flex-none items-center justify-center self-center rounded-full bg-action-primary text-text-on-dark">
                <Lock className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-medium text-text-primary">
                  Relatório transparente e responsabilidade compartilhada
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Se identificarmos risco ou impossibilidade, ligamos antes de prosseguir. Quando não há solução, explicamos o motivo com clareza e orientamos sobre alternativas.
                </p>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
