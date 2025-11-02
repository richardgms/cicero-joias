'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Gem, Wrench, ShieldCheck, Check } from 'lucide-react';

export function ConsertosAboutSection() {
  const informationBlocks = [
    {
      icon: Gem,
      title: 'O que cuidamos',
      description:
        'Do acessório do dia a dia às joias de família: se existe solução, encontramos o caminho certo para recuperar a peça.',
      items: [
        'Alianças lisas, anatômicas e anéis com solitários ou pedrarias',
        'Correntes, pulseiras, tornozeleiras e colares em diferentes espessuras',
        'Brincos articulados, peças delicadas e semijoias com banho',
        'Relógios analógicos, digitais e smartwatches compatíveis',
        'Óculos de grau, solares e peças com hastes especiais',
        'Outros itens mediante avaliação técnica e orçamento prévio',
      ],
    },
    {
      icon: Wrench,
      title: 'Reparos e melhorias executados',
      description:
        'Cada reparo recebe o mesmo cuidado artesanal de quem cria joias do zero, com acabamento refinado em cada detalhe.',
      items: [
        'Soldas de alta precisão, inclusive em semijoias sensíveis ao calor',
        'Ajuste de aro, alinhamento e recuperação de peças amassadas',
        'Reposição de pedras, revisão de garras e reforço de cravações',
        'Troca de fechos, correntes internas, tarraxas e hastes de brincos',
        'Troca de bateria, revisão completa e troca de máquina de relógio',
        'Troca de molas, plaquetas e parafusos em óculos com nivelamento',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Materiais, segurança e cuidados',
      description:
        'Analisamos cada metal antes do reparo e garantimos o retorno seguro da peça com documentação em duplicidade.',
      items: [
        'Ouro, prata, platina, aço, latão e ligas especiais mediante teste',
        'Avaliação prévia para metais sensíveis ao calor antes de soldar',
        'Limpeza para joias e acabamento polido para alianças sem custo adicional',
        'Registro interno com contato, observações e comprovante igual para o cliente',
        'Cartão de garantia emitido quando o serviço oferece cobertura',
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-marfim to-marfim-light py-14 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(24,68,52,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(199,154,52,0.08),transparent_60%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center rounded-full border border-esmeralda/20 bg-esmeralda/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda-dark">
            Sobre o serviço
          </span>
          <h2 className="font-playfair text-3xl font-semibold text-esmeralda sm:text-4xl lg:text-5xl">
            Tudo o que você precisa para recuperar suas peças favoritas
          </h2>
          <p className="mx-auto max-w-3xl text-base text-grafite/75 sm:text-lg">
            Consertamos joias, semijoias, relógios, óculos e peças especiais com a precisão de quem domina a arte da ourivesaria há quatro décadas. Todo o processo acontece dentro da Cícero Joias, com avaliação cuidadosa e acompanhamento direto do cliente.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 md:grid-cols-3" delay={0.12} stagger>
          {informationBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.title}
                className="relative flex h-full flex-col gap-6 rounded-3xl border border-esmeralda/10 bg-white/95 p-7 shadow-[0_24px_60px_-38px_rgba(24,68,52,0.28)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.45, ease: 'easeOut' }}
                whileHover={{ y: -8, boxShadow: '0 36px 82px -44px rgba(24,68,52,0.32)' }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-esmeralda-dark to-esmeralda text-marfim shadow-lg">
                  <Icon className="h-7 w-7" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-playfair text-2xl font-semibold text-esmeralda">{block.title}</h3>
                  <p className="text-sm leading-relaxed text-grafite/70">{block.description}</p>
                </div>

                <ul className="flex-1 space-y-3 text-sm text-grafite/80">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-esmeralda" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </AnimatedSection>

        <AnimatedSection className="rounded-3xl border border-esmeralda/10 bg-white/80 p-8 text-center shadow-[0_20px_50px_-36px_rgba(24,68,52,0.25)]" delay={0.2}>
          <p className="mx-auto max-w-3xl text-base text-grafite/75 sm:text-lg">
            Após o conserto, cada peça retorna com limpeza ou polimento de cortesia e orientações de uso. Quando há garantia, entregamos o cartão preenchido junto ao comprovante para você acompanhar com tranquilidade.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
