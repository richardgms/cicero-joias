'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

const WHATSAPP_NUMBER = '5583991180251';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá! Quero solicitar um orçamento para lentes de óculos.'
)}`;

const BENEFITS = [
  'Orçamento sem compromisso',
  'Armações variadas em loja',
  'Atendimento personalizado',
];

export function LentesDeOculosFinalCTASection() {
  return (
    <Section
      tone="light"
      spacing="lg"
      aria-labelledby="lentes-de-oculos-final-cta-heading"
    >
      <Container size="md" className="flex flex-col items-center gap-6 text-center sm:gap-8">
        <AnimatedSection className="flex flex-col items-center gap-4 sm:gap-6" delay={0.05}>
          <Badge variant="sectionLight">Sua visão, nosso cuidado</Badge>
          <SectionHeading
            align="center"
            titleId="lentes-de-oculos-final-cta-heading"
            title={
              <>
                Pronto para enxergar{' '}
                <span className="italic text-action-strong">melhor</span>?
              </>
            }
            description="Solicite um orçamento pelo WhatsApp e encontre a lente e armação ideais para você. Mais de 40 anos cuidando da visão dos nossos clientes."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12} className="flex flex-col items-center gap-4">
          <Button asChild variant="gold" size="lg" className="group w-full sm:w-auto">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
              Solicitar orçamento
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary">
            {BENEFITS.map((benefit) => (
              <span key={benefit} className="flex items-center gap-1.5">
                <span
                  className="h-1 w-1 rounded-full bg-action-primary/60"
                  aria-hidden="true"
                />
                {benefit}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
