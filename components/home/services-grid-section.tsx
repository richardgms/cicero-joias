'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { servicesGrid } from './home-data';
import { ArrowRight, Star } from 'lucide-react';
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
    <section id="servicos" className="relative overflow-hidden bg-surface-page py-12 sm:py-16 md:py-20">
      {/* Background decoration - Light Theme */}
      <div className="absolute inset-0 bg-[url('/assets/noise.webp')] opacity-[0.03] mix-blend-multiply pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(199,154,52,0.05),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(24,68,52,0.03),transparent_40%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-ouro/30 bg-white/60 backdrop-blur-sm px-4 py-1.5 shadow-sm">
            <Star className="w-3 h-3 text-ouro fill-ouro" />
            <span className="font-jost text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-text-primary">
              Nossos Serviços
            </span>
          </div>

          <h2 className="font-philosopher text-3xl sm:text-5xl lg:text-6xl font-bold text-text-primary">
            Excelência em <span className="text-ouro">Cada Detalhe</span>
          </h2>

          <p className="font-montserrat mx-auto max-w-2xl text-base sm:text-lg text-text-secondary/70 leading-relaxed">
            Da criação à manutenção, oferecemos o cuidado completo que suas joias merecem.
          </p>
        </AnimatedSection>

        {/* Swipe Hint - Mobile Only */}
        <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-ouro font-bold sm:hidden mb-2 animate-pulse">
          <span>Deslize</span>
          <ArrowRight className="h-3 w-3" />
        </p>

        {/* Services Carousel (Mobile) / Grid (Desktop) */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-2 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8 sm:place-items-stretch scrollbar-hide"
          role="list"
          aria-label="Nossos serviços de joalheria"
        >
          {servicesGrid.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.title}
                className="group relative w-[85vw] flex-shrink-0 snap-center sm:w-full select-none h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                role="listitem"
              >
                <Link
                  href={service.href}
                  className="block h-full select-none"
                  draggable={false}
                >
                  <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-xl border border-ouro/15 bg-surface-section p-8 shadow-card transition-all duration-500 hover:border-ouro/50 hover:shadow-card-hover hover:-translate-y-1">

                    {/* Background Decorative Icon */}
                    <div className="absolute -right-8 -bottom-8 text-ouro/5 transition-all duration-700 group-hover:scale-110 group-hover:text-ouro/10 group-hover:-rotate-12">
                      <IconComponent className="h-48 w-48" strokeWidth={0.5} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                      {/* Icon Badge */}
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface-page border border-ouro/20 text-text-primary transition-all duration-500 group-hover:bg-ouro group-hover:text-white group-hover:border-ouro">
                        <IconComponent className="h-6 w-6" strokeWidth={1.5} />
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-philosopher text-2xl font-bold text-text-primary tracking-tight group-hover:text-ouro transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="font-montserrat text-[15px] leading-relaxed text-text-secondary/70 group-hover:text-text-secondary/90 transition-colors">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-6 mt-auto">
                      <div className="inline-flex items-center gap-2 font-jost text-xs font-bold uppercase tracking-widest text-ouro border-b border-ouro/30 pb-0.5 group-hover:border-ouro transition-all duration-300">
                        <span>Saiba mais</span>
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Dots - Mobile Only */}
        <div className="flex justify-center gap-2 mt-4 sm:hidden" role="tablist">
          {servicesGrid.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === index
                ? 'w-6 bg-ouro'
                : 'w-1.5 bg-ouro/30'
                }`}
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Ir para serviço ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection className="flex justify-center mt-4 md:mt-8" delay={0.3}>
          <Link href="/servicos">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="font-montserrat group rounded-full bg-action-strong px-8 py-6 text-sm font-bold uppercase tracking-widest text-text-on-brand shadow-button-primary transition-all duration-500 hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5"
              >
                Ver todos os serviços
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
