'use client';

import React from 'react';
import { Glasses, ShoppingBag, type LucideIcon } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Check } from 'lucide-react';

const LENS_TYPES = [
  'Monofocal',
  'Multifocal / progressiva',
  'Antirreflexo',
  'Fotossensível — escurece automaticamente no sol',
  'Blue light (anti-luz azul)',
];

type OfferCard = {
  icon: LucideIcon;
  title: string;
};

export function LentesDeOculosAboutSection() {
  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="lentes-de-oculos-about-heading"
    >
      <Container className="space-y-16">
        <SectionHeading
          align="center"
          titleId="lentes-de-oculos-about-heading"
          eyebrow={<Badge variant="sectionLight">O que oferecemos</Badge>}
          title={
            <>
              A lente certa para a sua{' '}
              <span className="italic text-action-strong">visão</span>
            </>
          }
          description="Trabalhamos com os principais tipos de lente e armações variadas, sempre a partir da sua receita oftalmológica."
          className="mx-auto"
        />

        <AnimatedSection className="grid gap-6 sm:grid-cols-2" delay={0.1} stagger>
          <Card variant="light" className="flex h-full flex-col gap-4 p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
                <Glasses className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-xl font-semibold text-text-primary">
                Lentes sob medida
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              Trabalhamos com os principais tipos de lente, sempre a partir
              da sua receita oftalmológica:
            </p>
            <div className="space-y-2">
              {LENS_TYPES.map((type) => (
                <div key={type} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-action-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-text-body">{type}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="light" className="flex h-full flex-col gap-4 p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
                <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-xl font-semibold text-text-primary">
                Armações variadas
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              Armações próprias em loja, com marcas variadas para todos os
              estilos. Encontre a combinação perfeita para sua lente, ou
              traga a armação que você já tem.
            </p>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <Card variant="light" className="p-6 text-center sm:p-8">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-action-strong">
                Importante:
              </span>{' '}
              É necessário apresentar uma receita oftalmológica atualizada
              para a confecção das lentes.
            </p>
          </Card>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
