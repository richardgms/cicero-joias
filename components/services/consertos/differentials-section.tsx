'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Award, ShieldCheck, Sparkles, ClipboardList, Check, type LucideIcon } from 'lucide-react';

type Differential = {
  icon: LucideIcon;
  title: string;
  highlight: string;
  description: string;
};

const DIFFERENTIALS: Differential[] = [
  {
    icon: Award,
    title: 'Especialistas em desafios',
    highlight: 'Desde 1984',
    description:
      'Soldamos metais sensíveis, reposicionamos pedras delicadas e recuperamos peças que muitos consideram perdidas. Se existe solução, nós executamos; se não, explicamos o motivo com clareza.',
  },
  {
    icon: ShieldCheck,
    title: 'Laboratório interno e seguro',
    highlight: 'Controle total',
    description:
      'Catalogamos cada peça com dados completos, fazemos registro fotográfico e guardamos em compartimentos individuais. Todo o processo acontece dentro da Cícero Joias, sem terceirização.',
  },
  {
    icon: Sparkles,
    title: 'Acabamento premium',
    highlight: 'Brilho renovado',
    description:
      'Limpeza para joias, polimento e acabamento para alianças e anéis, além de retoque localizado de banho onde houve solda para manter o aspecto impecável.',
  },
  {
    icon: ClipboardList,
    title: 'Atenção e garantia',
    highlight: 'Transparência total',
    description:
      'Orçamento claro, atualizações pelo WhatsApp e garantia de 1 ano para troca de bateria e 3 meses para troca de máquina de relógio. Sempre com conversa franca sobre o que é possível.',
  },
];

export function ConsertosDifferentialsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda-dark via-esmeralda to-marfim py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.28),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(199,154,52,0.22),transparent_60%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-esmeralda-light/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-marfim">
            <ShieldCheck className="h-4 w-4" />
            Nossos diferenciais
          </span>
          <h2 className="font-playfair text-3xl font-semibold text-marfim sm:text-4xl lg:text-5xl">
            Por que confiar seus consertos à <span className="text-ouro">Cícero Joias</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base text-marfim/75 sm:text-lg">
            Da solda rápida ao desafio que ninguém encara, entregamos soluções seguras, acabamento impecável e comunicação direta do orçamento à entrega.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" delay={0.12} stagger>
          {DIFFERENTIALS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/90 p-6 text-esmeralda shadow-[0_22px_48px_-34px_rgba(24,68,52,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_66px_-36px_rgba(24,68,52,0.45)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-esmeralda-light to-esmeralda text-marfim shadow-[0_18px_36px_-26px_rgba(24,68,52,0.6)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-ouro/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ouro-dark">
                    {item.highlight}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold leading-tight text-esmeralda">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-grafite/75">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </AnimatedSection>

        <AnimatedSection className="rounded-3xl border border-white/15 bg-white/80 p-8 text-center shadow-[0_26px_60px_-38px_rgba(24,68,52,0.35)] backdrop-blur-sm" delay={0.25}>
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h3 className="font-playfair text-2xl font-semibold text-esmeralda sm:text-3xl">
              Cuidado artesanal aliado à segurança
            </h3>
            <p className="text-sm text-grafite/75 sm:text-base">
              Cada peça é fotografada, identificada e armazenada com segurança. Orientamos sobre cuidados específicos e mantemos você por perto durante todo o processo.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-esmeralda">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-ouro" />
                Cartão de garantia para serviços de relógio
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-ouro" />
                Comprovante com espelho para o cliente
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-ouro" />
                Atualizações pelo WhatsApp
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
