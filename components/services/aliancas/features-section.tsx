'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { keyDifferentiators } from './data';

// Debounce helper function for scroll performance
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export function FeaturesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = useCallback((index: number) => {
    if (!scrollRef.current) return;

    const cardWidth = 280 + 16; // card width + gap
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = 280 + 16; // card width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, keyDifferentiators.length - 1));
    };

    // Debounce scroll handler to reduce unnecessary state updates (100ms delay)
    const debouncedHandleScroll = debounce(handleScroll, 100);

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', debouncedHandleScroll);
      return () => {
        container.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F9F6EE] py-6 sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(24,68,52,0.08),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="font-jost inline-flex items-center justify-center rounded-full border border-esmeralda/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
            NOSSOS DIFERENCIAIS
          </span>
          <h2 className="font-philosopher text-3xl sm:text-5xl lg:text-6xl font-bold text-esmeralda">
            Por que escolher a Cícero Joias
          </h2>
          <p className="font-montserrat mx-auto max-w-3xl text-base sm:text-lg text-grafite/75">
            Somos joalheria própria com produção exclusiva e atendimento próximo. Cada aliança é uma promessa de eternidade, com materiais nobres e técnicas refinadas que garantem resistência incomparável.
          </p>
        </AnimatedSection>

        {/* Desktop Grid Layout */}
        <AnimatedSection className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-2" delay={0.12} stagger>
          {keyDifferentiators.map((item) => (
            <motion.article
              key={item.title}
              className="group relative flex h-full flex-col gap-4 rounded-3xl border border-esmeralda/10 bg-white/95 p-6 shadow-[0_22px_45px_-32px_rgba(24,68,52,0.28)] backdrop-blur-sm transition-all duration-300"
              whileHover={{ y: -6, boxShadow: '0 36px 65px -40px rgba(24,68,52,0.35)' }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-esmeralda-light to-esmeralda text-white shadow-[0_15px_30px_-18px_rgba(24,68,52,0.4)]">
                  <item.icon className="h-6 w-6" />
                </span>
                <div className="space-y-1">
                  <p className="font-jost text-xs uppercase tracking-[0.3em] text-esmeralda/80">{item.helper}</p>
                  <h4 className="font-philosopher font-semibold text-lg text-esmeralda">{item.title}</h4>
                </div>
              </div>
              <p className="font-montserrat text-sm leading-relaxed text-grafite/75">{item.description}</p>
            </motion.article>
          ))}
        </AnimatedSection>

        {/* Mobile Carousel Layout */}
        <AnimatedSection className="sm:hidden -mx-4" delay={0.12}>
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollPadding: '0 1rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="w-4 flex-shrink-0" />
              {keyDifferentiators.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="group relative flex min-w-[280px] flex-col gap-4 rounded-3xl border border-esmeralda/10 bg-white/95 p-6 shadow-[0_10px_20px_-10px_rgba(24,68,52,0.15)] backdrop-blur-sm snap-start"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-esmeralda-light to-esmeralda text-white shadow-[0_15px_30px_-18px_rgba(24,68,52,0.4)]">
                      <item.icon className="h-6 w-6" />
                    </span>
                    <div className="space-y-1">
                      <p className="font-jost text-xs uppercase tracking-[0.3em] text-esmeralda/80">{item.helper}</p>
                      <h4 className="font-philosopher font-semibold text-lg text-esmeralda">{item.title}</h4>
                    </div>
                  </div>
                  <p className="font-montserrat text-sm leading-relaxed text-grafite/75">{item.description}</p>
                </motion.article>
              ))}
              <div className="w-4 flex-shrink-0" />
            </div>

            {/* Indicadores de scroll */}
            <div className="flex justify-center gap-4 mt-12" role="tablist" aria-label="Navegação dos diferenciais">
              {keyDifferentiators.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`h-3 w-3 rounded-full transition-colors duration-300 cursor-pointer ${
                    index === activeIndex ? 'bg-esmeralda' : 'bg-esmeralda/30'
                  }`}
                  role="tab"
                  aria-label={`Ver ${item.title}`}
                  aria-selected={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
