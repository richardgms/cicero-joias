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
    question: 'Quanto tempo demora a limpeza?',
    answer:
      'Muitas vezes fica pronta na hora, conforme a demanda do dia. Peças que exigem atenção especial podem levar um pouco mais — combinamos o prazo durante a avaliação.',
  },
  {
    question: 'Quais materiais vocês limpam?',
    answer: 'Trabalhamos com joias em prata, ouro e folheado.',
  },
  {
    question: 'Como funciona o processo de limpeza?',
    answer:
      'Avaliamos a peça e nossos ourives fazem a limpeza manual com procedimentos adequados e profissionais. Quando o polimento é indicado, ele também pode ser realizado, devolvendo o brilho original. Em peças com desenhos mais elaborados, alguns pontos de difícil acesso podem não ficar 100% limpos.',
  },
  {
    question: 'Toda peça recebe polimento?',
    answer:
      'Não necessariamente. Avaliamos cada peça individualmente e só confirmamos o polimento após ver o estado dela. Algumas peças recebem apenas a limpeza.',
  },
  {
    question: 'Qual a diferença entre limpeza e conserto?',
    answer:
      'A limpeza cuida do brilho e da aparência da peça. Se sua joia tiver dano estrutural — como amassados, pedras soltas ou partes quebradas — esse é o nosso serviço de consertos especializados.',
  },
  {
    question: 'Posso trazer uma peça bem desgastada ou escurecida?',
    answer:
      'Sim! Trabalhamos com peças desgastadas ou escurecidas — a limpeza manual e o polimento ajudam bastante a recuperar o aspecto original, embora o resultado dependa do desenho e do estado da peça.',
  },
  {
    question: 'Como funciona o orçamento?',
    answer:
      'O orçamento é feito na hora, após avaliarmos sua peça. Fale com a gente pelo WhatsApp para saber mais.',
  },
];

export function LimpezaDeJoiasFAQSection() {
  return (
    <Section
      tone="dark"
      spacing="md"
      aria-labelledby="limpeza-de-joias-faq-heading"
    >
      <Container size="sm" className="space-y-10 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="dark"
            titleId="limpeza-de-joias-faq-heading"
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
                  limpeza de joias
                </span>
              </>
            }
            description="Respostas claras para as principais dúvidas sobre limpeza e polimento profissional."
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
