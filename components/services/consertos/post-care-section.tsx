'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { ShieldCheck, Check } from 'lucide-react';

const CARE_TIPS = [
  'Evite dormir com correntes, pulseiras ou brincos para prevenir torções e puxões.',
  'Retire joias ao tomar banho ou praticar esportes para evitar impactos e contato com produtos químicos.',
  'Ao notar folga ou desgaste, volte para uma avaliação rápida e gratuita.',
  'Guarde as peças em locais secos, evitando contato direto entre elas para não arranhar.',
];

export function ConsertosPostCareSection() {
  return (
    <Section
      tone="dark"
      spacing="md"
      aria-labelledby="consertos-post-care-heading"
    >
      <Container size="md" className="space-y-10">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="dark"
            titleId="consertos-post-care-heading"
            eyebrow={<Badge variant="dark">Cuidados após o conserto</Badge>}
            title="Como manter sua peça segura por mais tempo"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <Card variant="dark" className="p-8">
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {CARE_TIPS.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 text-sm leading-relaxed text-text-on-dark/85"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-action-on-dark"
                    aria-hidden="true"
                  />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-3 border-t border-border-on-dark pt-6">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-action-on-dark"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-text-on-dark/70">
                Se a peça exigir um cuidado extra específico, avisamos no momento da entrega e permanecemos disponíveis pelo WhatsApp para novas orientações.
              </p>
            </div>
          </Card>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
