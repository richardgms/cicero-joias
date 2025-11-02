'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { ShieldCheck, ClipboardCheck, ClipboardList, Lock } from 'lucide-react';

const GUARANTEE_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Registro e rastreio internos',
    description:
      'Catalogamos cada peca com nome, telefone, descricao e foto. O comprovante em duplicidade garante seguranca na entrega.',
  },
  {
    icon: ClipboardCheck,
    title: 'Garantia para relogios',
    description:
      '1 ano para troca de bateria, 3 meses para troca de maquina e ajustes de pulseira revisados no ato da retirada.',
  },
  {
    icon: ClipboardList,
    title: 'Monitoramento durante o processo',
    description:
      'Atualizamos sobre prazos, confirmamos cuidados especiais e avisamos assim que o servico entra em execucao.',
  },
];

export function ConsertosGuaranteesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-marfim via-white to-marfim py-14 sm:py-18">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_5%_10%,rgba(24,68,52,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_15%,rgba(199,154,52,0.1),transparent_60%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-esmeralda/15 bg-esmeralda/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda">
            Seguranca e garantias
          </span>
          <h2 className="font-playfair text-3xl font-semibold text-esmeralda sm:text-4xl lg:text-5xl">
            Protocolos que protegem sua peca do inicio ao fim
          </h2>
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 lg:grid-cols-3" delay={0.12} stagger>
          {GUARANTEE_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col gap-4 rounded-3xl border border-esmeralda/10 bg-white/95 p-6 shadow-[0_24px_60px_-38px_rgba(24,68,52,0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ouro/12">
                <item.icon className="h-6 w-6 text-ouro" />
              </div>
              <div className="space-y-2">
                <h3 className="font-playfair text-xl font-semibold text-esmeralda">{item.title}</h3>
                <p className="text-sm leading-relaxed text-grafite/75">{item.description}</p>
              </div>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection
          className="rounded-3xl border border-esmeralda/10 bg-white/95 p-8 shadow-[0_24px_60px_-38px_rgba(24,68,52,0.2)]"
          delay={0.24}
        >
          <div className="flex flex-col gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-esmeralda text-marfim">
                <Lock className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-playfair text-xl font-semibold text-esmeralda">
                Relatorio transparente e responsabilidade compartilhada
              </h3>
              <p className="text-sm leading-relaxed text-grafite/75">
                Se identificarmos risco ou impossibilidade, ligamos antes de prosseguir. Quando nao ha solucao, explicamos o motivo com clareza e orientamos sobre alternativas.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
