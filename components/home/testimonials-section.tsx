'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { testimonials } from './home-data';

// Função para extrair iniciais do nome (suporta "&" para casais)
function getInitials(name: string): string {
  // Remove "&" e pega primeira letra de cada palavra
  const cleanName = name.replace(/&/g, '').trim();
  const words = cleanName.split(' ').filter(word => word.length > 0);

  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  // Pega primeira letra da primeira e última palavra
  const firstInitial = words[0].charAt(0);
  const lastInitial = words[words.length - 1].charAt(0);

  return (firstInitial + lastInitial).toUpperCase();
}

// Função para gerar cor baseada no nome
// Função para gerar cor baseada no nome
function getColorFromName(name: string): string {
  const colors = [
    'bg-text-primary/10 text-text-primary border-text-primary/20', // Esmeralda
    'bg-action-strong/10 text-action-strong border-action-strong/20', // Ouro
    'bg-blue-500/10 text-blue-700 border-blue-500/20',    // Azul
    'bg-purple-500/10 text-purple-700 border-purple-500/20', // Roxo
  ];

  // Gera hash simples do nome
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Usa hash para selecionar cor
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-surface-page py-8 sm:py-12 md:py-14">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(24,68,52,0.04),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="font-jost inline-flex items-center justify-center gap-2 rounded-full border border-text-primary/30 bg-surface-section/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-text-primary/80 hover:scale-105 hover:border-text-primary/40 hover:bg-surface-section/90 transition-all duration-500 cursor-default">
            <Quote className="h-4 w-4" />
            Depoimentos
          </span>
          <h2 className="font-philosopher text-[clamp(28px,3.5vw+12px,42px)] font-bold text-text-primary">
            O que nossos clientes dizem
          </h2>
          <p className="font-montserrat mx-auto max-w-3xl text-[clamp(16px,2vw+10px,18px)] text-text-secondary/75">
            A confiança de quem escolheu uma joalheria com 40 anos de tradição.
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <AnimatedSection
          className="grid gap-6 sm:grid-cols-2 md:gap-8"
          delay={0.12}
          stagger
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.name}
              className="group relative flex h-full flex-col gap-5 justify-between rounded-3xl border border-text-primary/10 bg-surface-card/90 backdrop-blur-sm p-6 shadow-md transition-all duration-500 ease-in-out hover:shadow-card-hover hover:-translate-y-1.5 hover:scale-[1.01] hover:border-text-primary/15 overflow-hidden"
            >
              {/* Quote Text */}
              <p className="relative text-[clamp(14px,1.5vw+10px,16px)] leading-relaxed text-text-secondary/80">
                <span className="absolute -right-2 -top-4 text-3xl text-action-strong/40 scale-x-[-1]" aria-hidden="true">&ldquo;</span>
                {testimonial.quote}
              </p>

              {/* Footer: Avatar + Info + Rating */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Avatar com Iniciais */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${getColorFromName(testimonial.name)}`}
                    aria-hidden="true"
                  >
                    {getInitials(testimonial.name)}
                  </div>

                  {/* Nome e Localização */}
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-text-primary">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-wide text-text-primary/60">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                {testimonial.rating && (
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1 text-sm font-semibold text-text-secondary">
                      {testimonial.rating.toFixed(1)} ⭐
                    </div>
                    {testimonial.source && (
                      <span className="text-xs text-text-secondary/60">{testimonial.source}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Quote Icon Decorativo */}
              <Quote
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 -right-4 h-20 w-20 -rotate-12 text-text-primary/5 sm:h-24 sm:w-24 lg:h-32 lg:w-32 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10 group-hover:-rotate-[15deg]"
                strokeWidth={1.5}
              />
            </motion.article>
          ))}
        </AnimatedSection>

        {/* Footer Text */}
        <AnimatedSection className="text-center" delay={0.18}>
          <p className="text-sm sm:text-base text-text-secondary/70">
            Atendimento próximo e personalizado em cada serviço: do primeiro contato ao acompanhamento pós-entrega.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
