'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, Star } from 'lucide-react';
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

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-surface-page py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Background decoration - Subtle Noise & Gradient */}
      <div className="absolute inset-0 bg-[url('/assets/noise.webp')] opacity-[0.03] mix-blend-multiply pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(199,154,52,0.03),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(24,68,52,0.03),transparent_40%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="flex flex-col items-center gap-4 text-center" delay={0.05}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-ouro/30 shadow-sm backdrop-blur-sm">
            <Quote className="w-3.5 h-3.5 text-ouro fill-ouro" />
            <span className="text-[10px] font-jost font-semibold uppercase tracking-widest text-text-primary">
              Depoimentos
            </span>
          </div>

          <h2 className="font-philosopher text-[clamp(32px,4vw+1rem,48px)] font-bold text-text-primary leading-[1.1]">
            Histórias que <span className="text-ouro">Brilham</span>
          </h2>

          <p className="font-montserrat mx-auto max-w-2xl text-[clamp(14px,1.5vw,16px)] text-text-secondary/70 leading-relaxed">
            A confiança de quem escolheu eternizar momentos com nossa joalheria.
            Mais do que clientes, amigos que fazem parte dos nossos 40 anos de tradição.
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <AnimatedSection
          className="grid gap-6 sm:grid-cols-2 lg:gap-8"
          delay={0.12}
          stagger
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className="group relative flex flex-col justify-between h-full bg-white rounded-2xl p-6 md:p-8 
                border border-ouro/10 
                shadow-card
                transition-all duration-500 ease-out
                hover:-translate-y-1 hover:border-ouro/40 hover:shadow-card-hover"
            >
              {/* Decorative Quote Icon Background */}
              <Quote
                className="absolute top-6 right-6 w-12 h-12 text-ouro/10 transform -scale-x-100 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                strokeWidth={0}
                fill="currentColor"
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < (testimonial.rating || 5) ? 'text-ouro fill-ouro' : 'text-gray-200 fill-gray-200'}`}
                    />
                  ))}
                </div>

                <p className="font-montserrat text-text-secondary/80 text-[15px] md:text-[16px] leading-relaxed italic relative">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-surface-page">
                  {/* Avatar Initials */}
                  <div className="w-10 h-10 rounded-full bg-text-primary/5 border border-text-primary/10 flex items-center justify-center text-text-primary font-philosopher font-bold text-sm">
                    {getInitials(testimonial.name)}
                  </div>

                  <div>
                    <h4 className="font-philosopher font-bold text-text-primary text-lg leading-none mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="font-jost text-[10px] uppercase tracking-wider text-ouro font-semibold">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection className="text-center mt-4" delay={0.2}>
          <a
            href="https://g.page/cicerojoias"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-text-primary font-jost text-xs uppercase tracking-widest font-semibold border-b border-ouro/30 pb-0.5 hover:text-ouro hover:border-ouro transition-all duration-300"
          >
            Ver mais avaliações no Google
            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
