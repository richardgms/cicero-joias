'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Gem, FlaskConical, Check } from 'lucide-react';

const INFORMATION_BLOCKS = [
  {
    icon: Gem,
    title: 'O que cuidamos',
    items: [
      'Alianças, anéis, correntes, pulseiras e colares',
      'Brincos articulados, peças delicadas e semijoias com banho',
      'Relógios analógicos, digitais e smartwatches compatíveis',
      'Óculos, hastes especiais e outros itens mediante avaliação',
    ],
  },
  {
    icon: FlaskConical,
    title: 'Materiais, segurança e cuidados',
    items: [
      'Ouro, prata, platina, aço, latão e ligas especiais mediante teste',
      'Avaliação prévia para metais sensíveis ao calor antes de soldar',
      'Registro interno com fotos, contato e comprovante em duplicidade',
      'Cartão de garantia emitido quando o serviço oferece cobertura',
    ],
  },
];

const CLOSING_HIGHLIGHTS = [
  'Limpeza de cortesia',
  'Polimento para alianças e anéis',
  'Orientações de uso na entrega',
];

export function ConsertosAboutSection() {
  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="consertos-about-heading"
    >
      <Container size="md" className="space-y-10 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="light"
            titleId="consertos-about-heading"
            eyebrow={<Badge variant="sectionLight">Sobre o serviço</Badge>}
            title="Do acessório do dia a dia à joia de família"
            description="Joias, semijoias, relógios, óculos e peças especiais — avaliamos cada caso com cuidado e dizemos com franqueza o que dá para recuperar."
          />
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 md:grid-cols-2" delay={0.12} stagger>
          {INFORMATION_BLOCKS.map((block) => {
            const Icon = block.icon;
            return (
              <Card
                key={block.title}
                variant="light"
                className="flex h-full flex-col gap-5 p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-xl font-medium text-text-primary">
                    {block.title}
                  </h3>
                </div>

                <ul className="flex flex-1 flex-col justify-between gap-3 text-sm text-text-body">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-action-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border-subtle pt-8 text-sm text-text-body">
            {CLOSING_HIGHLIGHTS.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2">
                <Check
                  className="h-4 w-4 shrink-0 text-action-strong"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
