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
    question: 'Como funciona o processo de criação de uma joia sob medida?',
    answer:
      'Tudo começa com uma conversa: você compartilha sua ideia, referências e inspirações. A partir daí, desenvolvemos o design junto com você, você aprova, e só então Cícero inicia a produção artesanal da peça.',
  },
  {
    question: 'Quais tipos de peça vocês fazem sob medida?',
    answer:
      'Fazemos anéis e pingentes sob medida. No momento não fabricamos brincos nem colares personalizados.',
  },
  {
    question: 'Quanto tempo demora para ficar pronta?',
    answer:
      'O prazo é combinado durante a conversa inicial, pois varia conforme a complexidade da peça, o material escolhido e a fila de produção no momento.',
  },
  {
    question: 'Quais materiais vocês trabalham?',
    answer:
      'Trabalhamos com ouro 18 quilates e prata 990. Pedras e gemas específicas são avaliadas por consulta, conforme disponibilidade.',
  },
  {
    question: 'Posso escolher pedras ou gemas específicas?',
    answer:
      'Sim. Conte sua preferência durante a consulta inicial e avaliamos a disponibilidade e o melhor encaixe para o design da sua peça.',
  },
  {
    question: 'Como funciona o orçamento?',
    answer:
      'O orçamento é sempre personalizado, feito após entendermos sua ideia, o material desejado e os detalhes do design. Fale com a gente pelo WhatsApp para começar.',
  },
  {
    question: 'Vocês oferecem garantia? O que ela cobre?',
    answer:
      'Sim, oferecemos garantia eterna em peças de ouro 18k e prata 990. A garantia cobre defeitos de fabricação e não cobre danos por mau uso.',
  },
  {
    question: 'Posso reaproveitar ouro ou joias antigas na peça nova?',
    answer:
      'Sim, avaliamos essa possibilidade caso a caso. Conte sobre o material que você tem durante a consulta inicial.',
  },
  {
    question: 'Preciso levar um desenho pronto ou vocês ajudam a criar o design?',
    answer:
      'Não é necessário ter um desenho pronto. Você traz a ideia, referências e inspirações, e desenvolvemos o design da peça junto com você.',
  },
  {
    question: 'Quem faz a peça?',
    answer:
      'A peça é feita pessoalmente por Cícero, mestre ourives e fundador da Cícero Joias, com mais de 40 anos de experiência em joias personalizadas.',
  },
];

export function JoiasSobMedidaFAQSection() {
  return (
    <Section
      tone="dark"
      spacing="md"
      aria-labelledby="joias-sob-medida-faq-heading"
    >
      <Container size="sm" className="space-y-10 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="dark"
            titleId="joias-sob-medida-faq-heading"
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
                  joias sob medida
                </span>
              </>
            }
            description="Respostas claras para as principais dúvidas sobre criar uma peça personalizada com a gente."
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
