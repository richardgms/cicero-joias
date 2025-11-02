'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Quote, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Meu cordao arrebentou em dois pontos e voltou como se fosse novo. A solda ficou imperceptivel e ainda entregaram limpo e polido.',
    name: 'Juliana Ferreira',
    service: 'Conserto de corrente de ouro',
  },
  {
    quote:
      'Trouxe o relogio do meu pai e recebi acompanhamento em cada etapa. A troca da maquina ficou perfeita e a garantia trouxe tranquilidade.',
    name: 'Carlos Moura',
    service: 'Revisao de relogio herdado',
  },
  {
    quote:
      'Resolveram o angulo da haste dos meus oculos e aproveitaram para ajustar o aro do meu anel. Atendimento cuidadoso e muito rapido.',
    name: 'Ana Paula Brito',
    service: 'Ajuste de oculos e anel',
  },
];

function TestimonialCard({
  quote,
  name,
  service,
}: {
  quote: string;
  name: string;
  service: string;
}) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-3xl border border-esmeralda/10 bg-white/95 p-6 shadow-[0_24px_60px_-38px_rgba(24,68,52,0.25)]">
      <Quote className="h-6 w-6 text-ouro" />
      <p className="text-sm leading-relaxed text-grafite/75">“{quote}”</p>
      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-ouro/85">
        <span className="block text-esmeralda">{name}</span>
        <span className="block text-ouro/60">{service}</span>
      </div>
    </div>
  );
}

export function ConsertosTestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-marfim-light to-white py-14 sm:py-18">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(24,68,52,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(199,154,52,0.1),transparent_60%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-esmeralda/15 bg-esmeralda/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda">
            Quem ja confiou
          </span>
          <h2 className="font-playfair text-3xl font-semibold text-esmeralda sm:text-4xl lg:text-5xl">
            Depoimentos reais de quem voltou a usar suas pecas
          </h2>
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" delay={0.12} stagger>
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
