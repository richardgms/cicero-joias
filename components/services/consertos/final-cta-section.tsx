'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { MapPin, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '5583991180251';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Quero agendar um conserto na Cícero Joias.')}`;

export function ConsertosFinalCTASection() {
  return (
    <Section
      tone="dark"
      spacing="lg"
      aria-labelledby="consertos-final-cta-heading"
    >
      <Container size="md" className="flex flex-col items-center gap-10 text-center">
        <AnimatedSection className="flex flex-col items-center gap-6" delay={0.05}>
          <Badge variant="dark">Pronto para revitalizar sua peça?</Badge>
          <SectionHeading
            align="center"
            tone="dark"
            titleId="consertos-final-cta-heading"
            title="Traga sua peça e nós a colocamos de volta em uso"
            description="Fale com nossa equipe pelo WhatsApp para um orçamento rápido ou visite a loja para uma avaliação completa. Cuidamos de cada detalhe, do registro ao acabamento final."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12} className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Button
            asChild
            variant="goldOnDark"
            size="lg"
            className="group w-full sm:w-auto"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </Button>

          <Button
            asChild
            variant="outlineDark"
            size="lg"
            className="w-full sm:w-auto"
          >
            <a
              href="https://maps.app.goo.gl/3mH6jR2n4nDAvb7Q6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Visitar a loja
            </a>
          </Button>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
