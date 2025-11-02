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

const FAQ_ITEMS = [
  {
    question: 'Consigo orcamento apenas enviando fotos pelo WhatsApp?',
    answer:
      'Sim. Na maioria dos casos as fotos sao suficientes para avaliarmos o conserto e enviar um orcamento sem compromisso. Se a peca exigir analise presencial — por exemplo, metais muito sensiveis ou mecanismos de relogio — avisamos na hora e combinamos a avaliacao gratuita na loja.',
  },
  {
    question: 'Quais materiais voces consertam?',
    answer:
      'Trabalhamos com ouro, prata, platina, aco, latao, ligas especiais e semijoias. Tambem consertamos armacoes de oculos. Caso o metal nao suporte solda ou calor, explicamos o motivo e sugerimos alternativas seguras.',
  },
  {
    question: 'Quanto tempo leva para ficar pronto?',
    answer:
      'Soldas simples podem ser concluidas em ate 20 minutos quando ha disponibilidade no dia. Reparos mais complexos — como reposicao de pedras, ajustes estruturais ou revisao de relogios — variam conforme a analise e demanda. Informamos o prazo estimado antes de iniciar e atualizamos voce durante o processo.',
  },
  {
    question: 'Voces oferecem garantia?',
    answer:
      'Para relogios, garantimos 1 ano na troca de bateria e 3 meses na troca de maquina. Nas demais pecas, caso surja algum problema decorrente do nosso processo, fazemos o ajuste sem custo adicional. Tudo e registrado em comprovante para sua seguranca.',
  },
  {
    question: 'E se a peca nao tiver solucao?',
    answer:
      'Nos analisamos com transparencia. Se identificarmos risco de dano ou impossibilidade tecnica, explicamos detalhadamente o motivo, sugerimos caminhos alternativos e devolvemos a peca nas mesmas condicoes em que recebemos.',
  },
  {
    question: 'Os precos sao tabelados?',
    answer:
      'Nao. O valor depende do tipo de peca, metal, grau de dano e tempo necessario para execucao. Por isso fazemos orcamento personalizado, sempre antes de iniciar qualquer reparo.',
  },
  {
    question: 'Voces atendem emergencias ou prazos curtos?',
    answer:
      'Sempre avaliamos. Para soldas rapidas, ajustes simples ou troca de bateria, tentamos resolver na hora mediante disponibilidade. Para demandas urgentes mais complexas, priorizamos a peca e mantemos voce informado sobre cada etapa.',
  },
];

export function ConsertosFAQSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-marfim to-marfim-light py-14 sm:py-18">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(24,68,52,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_85%,rgba(199,154,52,0.08),transparent_60%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-esmeralda/20 bg-esmeralda/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda">
            <HelpCircle className="h-4 w-4" />
            Duvidas frequentes
          </span>
          <h2 className="font-playfair text-3xl font-semibold text-esmeralda sm:text-4xl lg:text-5xl">
            Perguntas sobre nossos consertos especializados
          </h2>
          <p className="mx-auto max-w-2xl text-base text-grafite/75 sm:text-lg">
            Reunimos as respostas que mais enviamos pelos nossos canais. Precisa de algo especifico? Estamos a uma mensagem de distancia.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="rounded-2xl border border-esmeralda/10 bg-white/95 px-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-esmeralda hover:text-esmeralda-dark">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-grafite/75">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}
