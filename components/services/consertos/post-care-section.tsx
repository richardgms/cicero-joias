'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { ShieldCheck, Check } from 'lucide-react';

const CARE_TIPS = [
  'Evite dormir com correntes, pulseiras ou brincos para prevenir torcoes e puxoes.',
  'Retire joias ao tomar banho ou praticar esportes para evitar impactos e contato com produtos quimicos.',
  'Ao notar folga ou desgaste, volte para uma avaliacao rapida e gratuita.',
  'Guarde as pecas em locais secos, evitando contato direto entre elas para nao arranhar.',
];

export function ConsertosPostCareSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-marfim to-white py-14 sm:py-18">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(24,68,52,0.05),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(199,154,52,0.08),transparent_65%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-esmeralda/15 bg-esmeralda/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda">
            Cuidados apos o conserto
          </span>
          <h2 className="font-playfair text-3xl font-semibold text-esmeralda sm:text-4xl lg:text-5xl">
            Como manter sua peca segura por mais tempo
          </h2>
        </AnimatedSection>

        <AnimatedSection
          className="rounded-3xl border border-esmeralda/10 bg-white/95 p-8 shadow-[0_24px_60px_-38px_rgba(24,68,52,0.2)]"
          delay={0.12}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-esmeralda text-marfim">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div className="flex-1 space-y-4">
              <ul className="space-y-3 text-sm text-grafite/80">
                {CARE_TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-esmeralda" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-grafite/70">
                Se a peca exigir um cuidado extra especifico, avisamos no momento da entrega e permanecemos disponiveis pelo WhatsApp para novas orientacoes.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
