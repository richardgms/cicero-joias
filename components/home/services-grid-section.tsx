'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { servicesGrid } from './home-data';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ServicesGridSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Track scroll position to update active dot
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.scrollWidth / servicesGrid.length;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, servicesGrid.length - 1));
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to specific card when dot is clicked
  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardWidth = carousel.scrollWidth / servicesGrid.length;
    carousel.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

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

        {/* Swipe Hint - Mobile Only */}
        <p className="flex items-center justify-center gap-2 text-sm text-esmeralda/70 font-montserrat font-medium sm:hidden mb-2">
          <span>Arraste para ver mais serviços</span>
          <ArrowRight className="h-4 w-4" />
        </p>

        {/* Services Carousel (Mobile) / Grid (Desktop) */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:place-items-start scrollbar-hide"
          role="list"
          aria-label="Nossos serviços de joalheria"
        >
          {servicesGrid.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.title}
                className="group relative w-[85vw] flex-shrink-0 snap-center sm:w-full"
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
                  <div className="relative flex h-full min-h-[280px] flex-col justify-start overflow-hidden rounded-3xl border border-white/60 bg-white/60 backdrop-blur-[2px] p-8 shadow-[0_4px_20px_-4px_rgba(24,68,52,0.05)] transition-all duration-500 hover:border-esmeralda/30 hover:bg-white hover:shadow-[0_20px_40px_-12px_rgba(24,68,52,0.15)] hover:-translate-y-1">
                    {/* Ícone Background Grande - Decorativo */}
                    <div className="absolute -right-8 -bottom-10 text-esmeralda/5 transition-all duration-500 group-hover:scale-110 group-hover:text-esmeralda/10 group-hover:-rotate-12">
                      <IconComponent className="h-64 w-64" strokeWidth={1} />
                    </div>

                    {/* Conteúdo em Overlay */}
                    <div className="relative z-10 space-y-5">
                      {/* Ícone Pequeno Badge - Estilo Glass */}
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-esmeralda/5 border border-esmeralda/10 text-esmeralda shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-esmeralda group-hover:text-white">
                        <IconComponent className="h-6 w-6" strokeWidth={1.5} />
                      </div>

                      {/* Título + Descrição */}
                      <div className="space-y-3">
                        <h3 className="font-philosopher text-2xl font-bold text-esmeralda tracking-tight">
                          {service.title}
                        </h3>
                        <p className="font-montserrat text-[15px] font-medium leading-relaxed text-grafite/60 group-hover:text-grafite/80 transition-colors">
                          {service.description}
                        </p>
                      </div>

                      {/* CTA Link */}
                      <div className="pt-2 font-jost flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ouro transition-colors duration-500 group-hover:text-esmeralda">
                        <span>Saiba mais</span>
                        <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Dots - Mobile Only */}
        <div className="flex justify-center gap-2 mt-4 sm:hidden" role="tablist" aria-label="Indicador de serviço">
          {servicesGrid.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                ? 'w-6 bg-esmeralda'
                : 'w-2 bg-esmeralda/30 hover:bg-esmeralda/50'
                }`}
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Ir para serviço ${index + 1}`}
            />
          ))}
        </div>

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
