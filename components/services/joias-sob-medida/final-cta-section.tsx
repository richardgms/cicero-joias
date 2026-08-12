'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { WhatsappIcon } from '@/components/icons';
import { ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '5583991180251';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá! Quero criar uma joia sob medida (anel ou pingente). Posso te contar minha ideia?'
)}`;

export function JoiasSobMedidaFinalCTASection() {
  return (
    <Section
      tone="light"
      spacing="lg"
      aria-labelledby="joias-sob-medida-final-cta-heading"
    >
      <Container size="md" className="flex flex-col items-center gap-6 text-center sm:gap-8">
        <AnimatedSection className="flex flex-col items-center gap-4 sm:gap-6" delay={0.05}>
          <Badge variant="sectionLight">Sua ideia, nossa arte</Badge>
          <SectionHeading
            align="center"
            titleId="joias-sob-medida-final-cta-heading"
            title={
              <>
                Pronto para criar sua{' '}
                <span className="italic text-action-strong">joia única</span>?
              </>
            }
            description="Conte sua ideia pelo WhatsApp e vamos desenvolver juntos o design da sua peça. Mais de 40 anos de experiência criando joias que contam histórias."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12} className="flex flex-col items-center gap-4">
          <Button asChild variant="gold" size="lg" className="group w-full sm:w-auto">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
              Contar minha ideia
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-action-primary/60" aria-hidden="true" />
              Orçamento sem compromisso
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-action-primary/60" aria-hidden="true" />
              Produção 100% interna
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-action-primary/60" aria-hidden="true" />
              Garantia eterna
            </span>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
