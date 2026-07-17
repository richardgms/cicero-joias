'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { servicesV2 } from './home-data-v2';

export function ServicesGridSectionV2() {
  const featured = servicesV2.find((s) => s.featured);
  const supporting = servicesV2.filter((s) => !s.featured);

  return (
    <section
      id="servicos"
      className="relative overflow-hidden bg-surface-section py-16 sm:py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(24,68,52,0.04),transparent_45%),radial-gradient(circle_at_100%_0%,rgba(207,154,36,0.05),transparent_45%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between" delay={0.05}>
          <div className="max-w-xl">
            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-ouro sm:text-xs">
              O que fazemos
            </p>
            <h2 className="font-philosopher mt-4 text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.05] text-text-primary">
              Da criação ao cuidado, <span className="italic text-ouro">tudo na mesma bancada.</span>
            </h2>
          </div>
          <Link
            href="/servicos"
            className="group hidden items-center gap-2 self-end font-jost text-xs font-bold uppercase tracking-widest text-ouro md:inline-flex"
          >
            <span className="border-b border-ouro/30 pb-0.5 transition-colors duration-300 group-hover:border-ouro">
              Ver todos os serviços
            </span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>

        {/* Grid: 1 featured (2x) + 5 supporting */}
        <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
          {/* Featured: Alianças */}
          {featured && (() => {
            const Icon = featured.icon;
            return (
              <AnimatedSection
                className="lg:col-span-2 lg:row-span-2"
                delay={0.1}
              >
                <Link href={featured.href} className="group block h-full">
                  <article className="relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-esmeralda via-esmeralda-dark to-esmeralda-deep p-8 text-text-on-dark shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover sm:p-10 lg:p-12">
                    {/* Decorative oversized icon */}
                    <div className="pointer-events-none absolute -right-10 -bottom-10 text-ouro/10 transition-all duration-700 group-hover:scale-105 group-hover:-rotate-6 group-hover:text-ouro/20">
                      <Icon className="h-72 w-72" strokeWidth={0.4} />
                    </div>
                    {/* Gold radial */}
                    <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-ouro/15 blur-3xl" />

                    <div className="relative space-y-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-ouro/40 bg-ouro/15 px-3 py-1 font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-ouro sm:text-xs">
                        Carro-chefe da casa
                      </span>
                      <h3 className="font-philosopher text-3xl font-bold leading-tight text-text-on-dark sm:text-4xl lg:text-5xl">
                        {featured.title}
                      </h3>
                      <p className="font-montserrat max-w-md text-sm leading-relaxed text-text-on-dark/80 sm:text-base">
                        {featured.description}
                      </p>
                    </div>

                    <div className="relative mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                      <p className="font-philosopher max-w-sm text-sm italic leading-relaxed text-ouro/85 sm:text-base">
                        {featured.audience}
                      </p>
                      <span className="inline-flex items-center gap-2 self-start font-jost text-xs font-bold uppercase tracking-widest text-ouro sm:self-auto">
                        <span className="border-b border-ouro/40 pb-0.5 transition-colors duration-300 group-hover:border-ouro">
                          Ver detalhes
                        </span>
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            );
          })()}

          {/* Supporting cards */}
          {supporting.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.title} delay={0.12 + index * 0.05}>
                <Link href={service.href} className="group block h-full">
                  <article className="relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl border border-ouro/15 bg-surface-page p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-ouro/45 hover:shadow-card-hover">
                    <div className="pointer-events-none absolute -right-6 -bottom-6 text-ouro/5 transition-all duration-700 group-hover:scale-105 group-hover:text-ouro/[0.12]">
                      <Icon className="h-32 w-32" strokeWidth={0.5} />
                    </div>

                    <div className="relative space-y-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ouro/25 bg-surface-section text-text-primary transition-all duration-500 group-hover:border-ouro group-hover:bg-ouro group-hover:text-white">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-philosopher text-xl font-bold leading-tight text-text-primary transition-colors duration-300 group-hover:text-ouro">
                        {service.title}
                      </h3>
                      <p className="font-montserrat text-[13px] leading-relaxed text-text-secondary/70">
                        {service.description}
                      </p>
                    </div>

                    <div className="relative mt-5 inline-flex items-center gap-2 font-jost text-[11px] font-bold uppercase tracking-widest text-ouro">
                      <span className="border-b border-ouro/30 pb-0.5 transition-colors duration-300 group-hover:border-ouro">
                        Saiba mais
                      </span>
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Mobile-only CTA */}
        <AnimatedSection className="flex justify-center md:hidden" delay={0.3}>
          <Link href="/servicos">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="group gap-3 rounded-full bg-action-strong px-8 py-6 font-jost text-xs font-bold uppercase tracking-[0.22em] text-text-on-brand shadow-button-primary transition-all duration-500 hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5">
                Ver todos os serviços
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
