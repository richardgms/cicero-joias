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
  'Olá! Quero levar minha joia para limpeza e polimento.'
)}`;

const BENEFITS = [
  'Muitas vezes na hora',
  'Prata, ouro e folheado',
  'Orçamento sem compromisso',
];

export function LimpezaDeJoiasFinalCTASection() {
  return (
    <Section
      tone="light"
      spacing="lg"
      aria-labelledby="limpeza-de-joias-final-cta-heading"
    >
      <Container size="md" className="flex flex-col items-center gap-6 text-center sm:gap-8">
        <AnimatedSection className="flex flex-col items-center gap-4 sm:gap-6" delay={0.05}>
          <Badge variant="sectionLight">Brilho renovado</Badge>
          <SectionHeading
            align="center"
            titleId="limpeza-de-joias-final-cta-heading"
            title={
              <>
                Pronta para dar um novo{' '}
                <span className="italic text-action-strong">brilho</span> à
                sua joia?
              </>
            }
            description="Traga sua peça para limpeza profissional. Avaliamos e indicamos o polimento quando necessário. Muitas vezes pronta na hora. Mais de 40 anos de tradição em João Pessoa."
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
