'use client';

import React from 'react';
import { Gem, Sparkles, Gift, Layers, type LucideIcon } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

type PieceType = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const PIECE_TYPES: PieceType[] = [
  {
    icon: Gem,
    title: 'Anéis sob medida',
    description:
      'Criamos anéis exclusivos, desenhados com você desde a primeira ideia até a peça finalizada.',
  },
  {
    icon: Gift,
    title: 'Pingentes sob medida',
    description:
      'Pingentes únicos que carregam histórias, símbolos e memórias especiais.',
  },
];

const MATERIALS = [
  { icon: Sparkles, label: 'Ouro 18 quilates' },
  { icon: Layers, label: 'Prata 990' },
  { icon: Gem, label: 'Pedras e gemas por consulta' },
];

export function JoiasSobMedidaAboutSection() {
  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="joias-sob-medida-about-heading"
    >
      <Container className="space-y-16">
        <SectionHeading
          align="center"
          titleId="joias-sob-medida-about-heading"
          eyebrow={<Badge variant="sectionLight">O que criamos</Badge>}
          title={
            <>
              Joias que nascem da sua{' '}
              <span className="italic text-action-strong">história</span>
            </>
          }
          description="Desenvolvemos cada peça em conjunto com você, do primeiro esboço à entrega, com produção 100% artesanal e interna."
          className="mx-auto"
        />

        <AnimatedSection
          className="grid gap-6 sm:grid-cols-2"
          delay={0.1}
          stagger
        >
          {PIECE_TYPES.map((piece) => (
            <Card
              key={piece.title}
              variant="light"
              className="flex h-full flex-col gap-4 p-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
                  <piece.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-text-primary">
                  {piece.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {piece.description}
              </p>
            </Card>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <Card variant="light" className="p-8 sm:p-10">
            <div className="space-y-6">
              <div className="space-y-3 text-center">
                <h3 className="font-heading text-2xl font-semibold text-text-primary sm:text-3xl">
                  Materiais que trabalhamos
                </h3>
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                {MATERIALS.map((material) => (
                  <div
                    key={material.label}
                    className="flex items-center gap-3 rounded-control border border-border-default bg-surface-subtle p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-card text-action-primary">
                      <material.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {material.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-control border border-border-default bg-surface-subtle p-6 text-center">
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-action-strong">
                    Importante:
                  </span>{' '}
                  No momento, fabricamos apenas anéis e pingentes sob medida.
                  Não fazemos brincos ou colares personalizados.
                </p>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
