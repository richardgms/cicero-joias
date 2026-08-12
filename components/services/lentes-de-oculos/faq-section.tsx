'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_ITEMS = [
  {
    question: 'Preciso de receita médica para trocar as lentes?',
    answer:
      'Sim. Para fabricar sua lente com precisão, pedimos uma receita oftalmológica atualizada.',
  },
  {
    question: 'Quais tipos de lente vocês trabalham?',
    answer:
      'Trabalhamos com lentes monofocais, multifocais/progressivas, antirreflexo, fotossensíveis (escurecem automaticamente na claridade do sol) e blue light (anti-luz azul).',
  },
  {
    question: 'Vocês também vendem armações?',
    answer:
      'Sim, temos armações próprias em loja, com marcas variadas para todos os estilos.',
  },
  {
    question: 'Posso usar a armação que já tenho?',
    answer:
      'Sim! Você pode trazer sua própria armação para a troca de lentes, ou escolher uma nova entre as opções da nossa loja.',
  },
  {
    question: 'Quanto tempo demora para ficar pronto?',
    answer:
      'O prazo depende do tipo de lente e da disponibilidade do laboratório parceiro. Combinamos o prazo estimado durante o atendimento.',
  },
  {
    question: 'Como funciona o processo, do início à entrega?',
    answer:
      'Você traz sua receita, escolhe a armação e o tipo de lente, enviamos ao nosso laboratório parceiro para fabricação, e entregamos seus óculos prontos.',
  },
  {
    question: 'Vocês trabalham com quais marcas de armação?',
    answer:
      'Trabalhamos com marcas variadas em loja. Fale com a gente pelo WhatsApp ou visite a loja para conhecer as opções disponíveis.',
  },
  {
    question: 'Como funciona o orçamento?',
    answer:
      'O orçamento é personalizado, feito após entendermos sua receita e a lente/armação escolhidas. Fale com a gente pelo WhatsApp para começar.',
  },
];

export function LentesDeOculosFAQSection() {
  return (
    <Section
      tone="dark"
      spacing="md"
      aria-labelledby="lentes-de-oculos-faq-heading"
    >
      <Container size="sm" className="space-y-10 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="dark"
            titleId="lentes-de-oculos-faq-heading"
            eyebrow={
              <Badge variant="dark" className="gap-2">
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Dúvidas frequentes
              </Badge>
            }
            title={
              <>
                Perguntas sobre{' '}
                <span className="italic text-action-on-dark">
                  lentes de óculos
                </span>
              </>
            }
            description="Respostas claras para as principais dúvidas sobre troca de lentes e armações."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="rounded-card border border-border-on-dark bg-surface-dark-elevated px-4 shadow-card-sm transition-colors duration-200 [&[data-state=open]]:border-action-on-dark sm:px-6"
              >
                <AccordionTrigger className="py-4 text-left text-base font-semibold text-text-on-dark transition-colors duration-200 hover:text-action-on-dark sm:py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-text-on-dark/75 sm:pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
