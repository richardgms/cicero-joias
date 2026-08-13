'use client';

import React from 'react';
import { Brush, Sparkles, type LucideIcon } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

type OfferCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const OFFERS: OfferCard[] = [
  {
    icon: Brush,
    title: 'Limpeza Manual Especializada',
    description:
      'Nossos ourives fazem a limpeza manualmente, com procedimentos adequados e profissionais, removendo sujeira e oxidação da superfície da peça.',
  },
  {
    icon: Sparkles,
    title: 'Avaliação e Polimento',
    description:
      'Avaliamos cada peça individualmente. Quando o polimento é indicado, devolvemos o brilho original com cuidado profissional.',
  },
];

const MATERIALS = ['Prata', 'Ouro', 'Folheado'];

export function LimpezaDeJoiasAboutSection() {
  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="limpeza-de-joias-about-heading"
    >
      <Container className="space-y-16">
        <SectionHeading
          align="center"
          titleId="limpeza-de-joias-about-heading"
          eyebrow={<Badge variant="sectionLight">O que oferecemos</Badge>}
          title={
            <>
              Devolvemos o{' '}
              <span className="italic text-action-strong">brilho original</span>
            </>
          }
          description="Limpeza manual feita por nossos ourives para joias em prata, ouro e folheado, com polimento quando indicado para a peça."
          className="mx-auto"
        />

        <AnimatedSection className="grid gap-6 sm:grid-cols-2" delay={0.1} stagger>
          {OFFERS.map((offer) => (
            <Card
              key={offer.title}
              variant="light"
              className="flex h-full flex-col gap-4 p-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
                  <offer.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-text-primary">
                  {offer.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {offer.description}
              </p>
            </Card>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <Card variant="light" className="p-6 text-center sm:p-8">
            <div className="space-y-6">
              <h3 className="font-heading text-2xl font-semibold text-text-primary sm:text-3xl">
                Materiais que trabalhamos
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {MATERIALS.map((material) => (
                  <span
                    key={material}
                    className="rounded-pill border border-border-default bg-surface-subtle px-5 py-2 text-sm font-medium text-text-primary"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Card variant="light" className="p-6 text-center sm:p-8">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-action-strong">
                Importante:
              </span>{' '}
              A limpeza é feita manualmente por nossos ourives, com
              procedimentos adequados e profissionais. Em peças com desenhos
              mais elaborados, alguns pontos de
              difícil acesso podem não ficar 100% limpos. O polimento é
              avaliado caso a caso — confirmamos se é indicado para a sua
              peça após a avaliação.
            </p>
          </Card>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
