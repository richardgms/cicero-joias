'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function BanhoOuroFAQSection() {
  const faqItems = [
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#0b1f18] py-10 sm:py-16 text-marfim">
      {/* Preset Background Esmeralda - Ver docs/style-presets.md */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-ouro/30 bg-white/10 px-4 py-1 text-xs font-jost font-semibold uppercase tracking-[0.3em] text-ouro/90">
            <HelpCircle className="h-4 w-4" />
            Dúvidas frequentes
          </span>
          <h2 className="font-philosopher font-bold text-3xl sm:text-4xl lg:text-5xl text-marfim">
            Perguntas sobre <span className="text-ouro">banho de ouro</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg font-montserrat text-marfim/85">
            Respostas claras para as principais dúvidas sobre nosso serviço de banho de ouro profissional.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-6 shadow-lg transition-all hover:bg-white/10 hover:border-white/20"
              >
                <AccordionTrigger className="text-left text-base font-philosopher font-semibold text-marfim hover:text-white hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-montserrat leading-relaxed text-marfim/85 pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="text-center">
          <div className="rounded-2xl border border-ouro/30 bg-white/5 backdrop-blur-md p-6 shadow-lg">
            <p className="text-sm font-montserrat text-marfim/90">
              <span className="font-jost font-semibold text-ouro">Ainda tem dúvidas?</span> Entre em contato pelo WhatsApp e nossa equipe terá prazer em esclarecer todas as suas questões sobre o serviço.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}








