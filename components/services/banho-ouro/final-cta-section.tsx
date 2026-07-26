'use client';

import React from 'react';
import { Camera, Clock, Shield } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

const WHATSAPP_NUMBER = '5583991180251';
const WHATSAPP_LINK = createWhatsAppLink(
  'Olá! Gostaria de solicitar um orçamento para banho de ouro. Vou enviar foto da minha peça.'
);

function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const BENEFITS = [
  { icon: Camera, text: 'Orçamento gratuito por foto' },
  { icon: Shield, text: 'Garantia de até 1 ano' },
  { icon: Clock, text: 'Prazo médio 14 dias' },
];

export function BanhoOuroFinalCTASection() {
  return (
    <Section
      tone="light"
      spacing="lg"
      aria-labelledby="banho-ouro-final-cta-heading"
    >
      <Container size="md" className="flex flex-col items-center gap-6 text-center sm:gap-8">
        <AnimatedSection className="flex flex-col items-center gap-4 sm:gap-6" delay={0.05}>
          <Badge variant="sectionLight">Transforme suas joias</Badge>
          <SectionHeading
            align="center"
            titleId="banho-ouro-final-cta-heading"
            title={
              <>
                Pronto para dar nova vida às suas{' '}
                <span className="italic text-action-strong">joias</span>?
              </>
            }
            description="Envie uma foto da sua peça pelo WhatsApp e receba orçamento personalizado em até 24 horas. Mais de 20 anos de experiência garantindo qualidade e durabilidade excepcional."
          />
        </AnimatedSection>

        <AnimatedSection
          delay={0.12}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {BENEFITS.map((benefit) => (
            <div key={benefit.text} className="flex items-center gap-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
                <benefit.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-text-body">
                {benefit.text}
              </span>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection
          delay={0.18}
          className="flex flex-col items-center gap-4"
        >
          <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
              Solicitar orçamento agora
            </a>
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span
                className="h-1 w-1 rounded-full bg-action-primary/60"
                aria-hidden="true"
              />
              Sem compromisso
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="h-1 w-1 rounded-full bg-action-primary/60"
                aria-hidden="true"
              />
              Resposta em até 24h
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="h-1 w-1 rounded-full bg-action-primary/60"
                aria-hidden="true"
              />
              Executado pelo mestre ourives
            </span>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
