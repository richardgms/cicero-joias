'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, Star } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { testimonialsV2 } from './home-data-v2';

export function TestimonialsSectionV2() {
  return (
    <section className="relative overflow-hidden bg-surface-page py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_100%,rgba(207,154,36,0.05),transparent_45%),radial-gradient(circle_at_15%_0%,rgba(24,68,52,0.04),transparent_45%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        {/* Header — editorial style with rating badge */}
        <AnimatedSection
          className="grid gap-6 md:grid-cols-12 md:items-end"
          delay={0.05}
        >
          <div className="md:col-span-8">
            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-ouro sm:text-xs">
              O que dizem
            </p>
            <h2 className="font-philosopher mt-4 text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.05] text-text-primary">
              Quem confiou na bancada <span className="italic text-ouro">conta a história.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 md:col-span-4 md:col-start-9 md:justify-end">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-ouro text-ouro" />
              ))}
            </div>
            <p className="font-jost text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary/80">
              4,9 / 5 — Google
            </p>
          </div>
        </AnimatedSection>

        {/* Testimonials grid — quote-led, editorial */}
        <AnimatedSection
          className="grid gap-6 md:grid-cols-3 md:gap-8"
          delay={0.12}
          stagger
        >
          {testimonialsV2.map((t) => (
            <motion.article
              key={t.name}
              className="group relative flex h-full flex-col gap-6 rounded-2xl border border-ouro/15 bg-surface-section p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-ouro/45 hover:shadow-card-hover sm:p-8"
            >
              <Quote
                className="absolute right-6 top-6 h-10 w-10 -scale-x-100 text-ouro/[0.12] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:text-ouro/25"
                strokeWidth={0}
                fill="currentColor"
              />

              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ouro/30 bg-ouro/[0.08] px-3 py-1 font-jost text-[9px] font-bold uppercase tracking-[0.2em] text-ouro sm:text-[10px]">
                {t.service}
              </span>

              <p className="font-philosopher relative z-10 text-base leading-relaxed text-text-primary sm:text-lg">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-auto flex items-center gap-4 border-t border-ouro/15 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ouro/30 bg-ouro/10 font-philosopher text-sm font-bold text-ouro">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-philosopher text-base font-bold leading-tight text-text-primary">
                    {t.name}
                  </p>
                  <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary/70">
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatedSection>

        {/* Footer link */}
        <AnimatedSection className="flex justify-center" delay={0.25}>
          <a
            href="https://g.page/cicerojoias"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-jost text-xs font-bold uppercase tracking-widest text-text-primary transition-colors duration-300 hover:text-ouro"
          >
            <span className="border-b border-ouro/30 pb-0.5 transition-colors duration-300 group-hover:border-ouro">
              Ver todas as avaliações no Google
            </span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
