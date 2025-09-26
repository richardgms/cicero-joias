'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { testimonials, whatsappLinks } from './home-data';

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-light to-[#dbe7df] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.35),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-esmeralda/30 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
            <Quote className="h-4 w-4" />
            Depoimentos
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-semibold text-esmeralda">
          O que nossos clientes dizem
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-grafite/75">
          A tranquilidade de quem foi acompanhado de perto pelo nosso mestre ourives, do design ao cuidado contínuo.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 sm:grid-cols-2" delay={0.12} stagger>
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.name}
              className="relative flex h-full flex-col gap-6 rounded-3xl border border-esmeralda/10 bg-white/90 p-6 shadow-[0_24px_55px_-34px_rgba(24,68,52,0.35)] backdrop-blur-sm overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-[0_20px_60px_-20px_rgba(24,68,52,0.3),0_0_25px_-5px_rgba(110,231,183,0.4)]"
              whileHover={{ y: -4 }}
            >
              <p className="relative text-base leading-relaxed text-grafite/80">
                <span className="absolute -left-2 -top-4 text-ouro/40">“</span>
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-esmeralda/20">
                  <Image
                    src={testimonial.image}
                    alt={`Foto de ${testimonial.name}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-esmeralda">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-esmeralda/60">
                    {testimonial.location}
                    {testimonial.role ? ` · ${testimonial.role}` : ''}
                  </p>
                </div>
              </div>
              <Quote
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 -right-4 h-16 w-16 text-esmeralda/10 sm:h-20 sm:w-20 lg:h-24 lg:w-24 transform -rotate-12"
                strokeWidth={0.4}
              />
            </motion.article>
          ))}
        </AnimatedSection>

        <AnimatedSection className="flex flex-col items-center gap-3 text-center" delay={0.18}>
          <p className="text-sm sm:text-base text-grafite/70">
          Pronto para começar a sua história conosco? Estamos no WhatsApp para uma consultoria sem compromisso.
          </p>
          <motion.a
            href={whatsappLinks.primary}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-esmeralda px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-marfim shadow-[0_20px_40px_-22px_rgba(24,68,52,0.4)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Falar com a joalheria
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}
