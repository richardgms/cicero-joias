'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { servicesGrid } from './home-data';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ServicesGridSection() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-[#F8F5F0] py-10 sm:py-16">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="font-jost inline-flex items-center justify-center rounded-full border border-esmeralda/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/80 hover:scale-105 hover:border-esmeralda/30 hover:shadow-sm transition-all duration-500 cursor-default">
            NOSSOS SERVIÇOS
          </span>
          <h2 className="font-philosopher text-3xl sm:text-5xl lg:text-6xl font-bold text-esmeralda">
            Serviços Especializados
          </h2>
          <p className="font-montserrat mx-auto max-w-3xl text-base sm:text-lg text-grafite/75">
            6 categorias de serviços para atender todas as suas necessidades
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <AnimatedSection
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-start"
          delay={0.1}
          stagger
          role="list"
          aria-label="Nossos serviços de joalheria"
        >
          {servicesGrid.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.title}
                className="group w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                role="listitem"
              >
                <Link
                  href={service.href}
                  className="block h-full"
                  aria-label={`Saiba mais sobre ${service.title}`}
                >
                  <div className="relative flex h-full min-h-[280px] flex-col justify-start overflow-hidden rounded-3xl border border-esmeralda/10 bg-gradient-to-br from-esmeralda/5 to-esmeralda/10 p-8 shadow-card-sm transition-all duration-500 hover:border-esmeralda/20 hover:shadow-card-sm-hover hover:-translate-y-1">
                    {/* Ícone Background Grande - Decorativo */}
                    <div className="absolute -right-6 -bottom-8 text-esmeralda/5 transition-all duration-500 group-hover:scale-110 group-hover:text-esmeralda/8">
                      <IconComponent className="h-60 w-60" strokeWidth={1.5} />
                    </div>

                    {/* Conteúdo em Overlay */}
                    <div className="relative z-10 space-y-4">
                      {/* Ícone Pequeno Badge */}
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-esmeralda text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                        <IconComponent className="h-6 w-6" />
                      </div>

                      {/* Título + Descrição */}
                      <div className="space-y-3">
                        <h3 className="font-montserrat text-xl font-semibold text-esmeralda">
                          {service.title}
                        </h3>
                        <p className="font-montserrat text-base leading-relaxed text-grafite/75">
                          {service.description}
                        </p>
                      </div>

                      {/* CTA Link */}
                      <div className="font-montserrat flex items-center gap-2 text-sm font-medium text-ouro transition-colors duration-500 group-hover:text-ouro/80">
                        <span>Saiba mais</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-esmeralda/0 to-esmeralda/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection className="flex justify-center mt-8" delay={0.3}>
          <Link href="/servicos">
            <Button
              size="lg"
              className="font-montserrat group rounded-full bg-esmeralda px-8 py-6 text-base font-semibold text-white shadow-lg transition-all duration-500 hover:bg-esmeralda-dark hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
            >
              Ver todos os serviços
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
