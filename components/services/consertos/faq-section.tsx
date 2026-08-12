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
    question: 'Consigo orçamento apenas enviando fotos pelo WhatsApp?',
    answer:
      'Sim. Na maioria dos casos as fotos são suficientes para avaliarmos o conserto e enviar um orçamento sem compromisso. Se a peça exigir análise presencial — por exemplo, metais muito sensíveis ou mecanismos de relógio — avisamos na hora e combinamos a avaliação gratuita na loja.',
  },
  {
    question: 'Quais materiais vocês consertam?',
    answer:
      'Trabalhamos com ouro, prata, platina, aço, latão, ligas especiais e semijoias. Também consertamos armações de óculos. Caso o metal não suporte solda ou calor, explicamos o motivo e sugerimos alternativas seguras.',
  },
  {
    question: 'Quanto tempo leva para ficar pronto?',
    answer:
      'Soldas simples podem ser concluídas em até 20 minutos quando há disponibilidade no dia. Reparos mais complexos — como reposição de pedras, ajustes estruturais ou revisão de relógios — variam conforme a análise e demanda. Informamos o prazo estimado antes de iniciar e atualizamos você durante o processo.',
  },
  {
    question: 'Vocês oferecem garantia?',
    answer:
      'Para relógios, garantimos 1 ano na troca de bateria e 3 meses na troca de máquina. Nas demais peças, caso surja algum problema decorrente do nosso processo, fazemos o ajuste sem custo adicional. Tudo é registrado em comprovante para sua segurança.',
  },
  {
    question: 'E se a peça não tiver solução?',
    answer:
      'Nós analisamos com transparência. Se identificarmos risco de dano ou impossibilidade técnica, explicamos detalhadamente o motivo, sugerimos caminhos alternativos e devolvemos a peça nas mesmas condições em que recebemos.',
  },
  {
    question: 'Os preços são tabelados?',
    answer:
      'Não. O valor depende do tipo de peça, metal, grau de dano e tempo necessário para execução. Por isso fazemos orçamento personalizado, sempre antes de iniciar qualquer reparo.',
  },
  {
    question: 'Vocês atendem emergências ou prazos curtos?',
    answer:
      'Sempre avaliamos. Para soldas rápidas, ajustes simples ou troca de bateria, tentamos resolver na hora mediante disponibilidade. Para demandas urgentes mais complexas, priorizamos a peça e mantemos você informado sobre cada etapa.',
  },
];

export function ConsertosFAQSection() {
  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="consertos-faq-heading"
    >
      <Container size="sm" className="space-y-10 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="light"
            titleId="consertos-faq-heading"
            eyebrow={
              <Badge variant="sectionLight" className="gap-2">
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Dúvidas frequentes
              </Badge>
            }
            title="Perguntas sobre nossos consertos especializados"
            description="Reunimos as respostas que mais enviamos pelos nossos canais. Precisa de algo específico? Estamos a uma mensagem de distância."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="rounded-card border border-border-default bg-surface-card px-6 shadow-card transition-colors duration-200 [&[data-state=open]]:border-action-strong"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-text-primary transition-colors duration-200 hover:text-action-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-text-secondary">
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
