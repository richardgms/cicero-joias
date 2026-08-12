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
    question: 'Quanto tempo dura o banho de ouro?',
    answer:
      'A durabilidade varia conforme o uso da peça. Quanto maior o atrito com superfícies, arranhões e contato com produtos químicos, mais rápido ocorre o desgaste natural. No entanto, com nossos mais de 20 anos de experiência, oferecemos um banho de altíssima qualidade. O Banho Básico é ideal para uso eventual, o Intermediário dura mais (6 meses de garantia) e o Avançado tem máxima durabilidade (1 ano de garantia completa).',
  },
  {
    question: 'Qualquer peça pode receber banho de ouro?',
    answer:
      'Trabalhamos com joias, semijoias, bijuterias, peças de prata, objetos metálicos decorativos e até componentes eletrônicos. Atualmente não fazemos banho em relógios. Para qualquer outra peça, é necessário enviar foto pelo WhatsApp para avaliação prévia gratuita, onde confirmamos a viabilidade do serviço.',
  },
  {
    question: 'Como funciona o processo de orçamento?',
    answer:
      'É muito simples: envie uma foto da sua peça pelo WhatsApp (83) 99118-0251. Nossa equipe analisa a peça, identifica o melhor tipo de banho e envia um orçamento detalhado personalizado. Tudo sem compromisso e totalmente gratuito.',
  },
  {
    question: 'Quanto tempo demora para fazer o banho de ouro?',
    answer:
      'O prazo médio é de 14 dias úteis. Esse tempo pode variar conforme a complexidade da peça e a opção de banho escolhida. Mantemos você informado sobre cada etapa do processo através do WhatsApp.',
  },
  {
    question: 'O que é o processo de galvanoplastia?',
    answer:
      'É um processo profissional de eletrodeposição de metais. Fazemos limpeza profunda, preparação da superfície, aplicação de camadas de cobre para aderência, paládio antialérgico, múltiplas camadas de ouro 18k por corrente elétrica controlada e finalização com verniz protetor especial. Cada etapa garante qualidade e durabilidade superior.',
  },
  {
    question: 'Qual a diferença entre os três tipos de banho?',
    answer:
      'O Banho Básico é ouro 18k sem garantia, ideal para uso esporádico. O Intermediário tem camadas reforçadas com 6 meses de garantia, sendo o mais escolhido. O Avançado possui múltiplas camadas premium, proteção antioxidante superior e 1 ano de garantia completa, ideal para peças de uso frequente.',
  },
  {
    question: 'Vocês oferecem garantia?',
    answer:
      'Sim! O Banho Intermediário tem 6 meses de garantia e o Banho Avançado oferece 1 ano de garantia completa. A garantia cobre defeitos no processo de aplicação. O Banho Básico não possui garantia, mas mantém nosso padrão de qualidade.',
  },
  {
    question: 'Quais cuidados devo ter após o banho?',
    answer:
      'Para prolongar a durabilidade: evite contato com produtos químicos (perfumes, cremes, cloro), remova antes de atividades físicas intensas, guarde em local seco preferencialmente em saquinhos individuais, limpe suavemente com flanela macia e evite atrito com superfícies ásperas. Esses cuidados simples aumentam significativamente a vida útil do banho.',
  },
  {
    question: 'Quem executa o serviço?',
    answer:
      'O banho é executado pessoalmente por Cícero, mestre ourives e fundador da Cícero Joias, com mais de 20 anos de experiência especializada em galvanoplastia. Isso garante controle total de qualidade e atenção dedicada a cada peça.',
  },
  {
    question: 'Posso revitalizar uma joia que já tem banho desgastado?',
    answer:
      'Sim, essa é uma das nossas especialidades! Fazemos a renovação completa de peças com banho antigo desgastado. Removemos o banho anterior, preparamos a superfície e aplicamos novo banho de ouro 18k, deixando a peça como nova.',
  },
];

export function BanhoOuroFAQSection() {
  return (
    <Section tone="dark" spacing="md" aria-labelledby="banho-ouro-faq-heading">
      <Container size="sm" className="space-y-10 md:space-y-16">
        <AnimatedSection delay={0.05}>
          <SectionHeading
            align="center"
            tone="dark"
            titleId="banho-ouro-faq-heading"
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
                  banho de ouro
                </span>
              </>
            }
            description="Respostas claras para as principais dúvidas sobre nosso serviço de banho de ouro profissional."
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
