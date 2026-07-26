'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
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
    const container = scrollRef.current;
    const cards = container?.querySelectorAll<HTMLElement>('[data-feature-card]');

    if (!container || !cards?.[index]) return;

    const card = cards[index];
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(
        container.querySelectorAll<HTMLElement>('[data-feature-card]')
      );

      const nearestIndex = cards.reduce(
        (nearest, card, index) => {
          const distance = Math.abs(card.offsetLeft - container.scrollLeft);
          return distance < nearest.distance
            ? { index, distance }
            : nearest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY }
      );

      setActiveIndex(nearestIndex.index);
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);
    container.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      container.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  const renderCard = (item: (typeof keyDifferentiators)[number]) => (
    <Card
      key={item.title}
      variant="dark"
      interactive
      role="article"
      className="group flex h-full flex-col gap-4 p-6 hover:border-action-on-dark"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-on-dark bg-surface-dark text-text-on-dark transition-colors duration-200 group-hover:border-action-on-dark group-hover:bg-action-on-dark group-hover:text-text-on-brand">
          <item.icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-label text-action-on-dark">
            {item.helper}
          </p>
          <h3 className="mt-1 font-heading text-xl font-semibold text-text-on-dark">
            {item.title}
          </h3>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-text-on-dark/75">
        {item.description}
      </p>
    </Card>
  );

  return (
    <Section
      tone="dark"
      spacing="lg"
      aria-labelledby="features-heading"
      className="overflow-hidden"
    >
      <Container className="space-y-12 md:space-y-16">
        <SectionHeading
          align="center"
          tone="dark"
          titleId="features-heading"
          eyebrow={<Badge variant="dark">NOSSOS DIFERENCIAIS</Badge>}
          title="Por que escolher a Cícero Joias"
          description="Somos joalheria própria com produção exclusiva e atendimento próximo. Cada aliança é uma promessa de eternidade, com materiais nobres e técnicas refinadas que garantem resistência incomparável."
        />

        <div className="hidden gap-6 sm:grid sm:grid-cols-2">
          {keyDifferentiators.map((item) => renderCard(item))}
        </div>

        <div className="-mx-4 sm:hidden">
          <div
            ref={scrollRef}
            className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide"
          >
            {keyDifferentiators.map((item) => (
              <div
                key={item.title}
                data-feature-card
                className="min-w-full snap-center"
              >
                {renderCard(item)}
              </div>
            ))}
          </div>

          <div
            className="mt-6 flex justify-center gap-1"
            role="tablist"
            aria-label="Navegação dos diferenciais"
          >
            {keyDifferentiators.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => scrollToCard(index)}
                className="flex h-control w-control cursor-pointer items-center justify-center rounded-full [-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-on-dark"
                role="tab"
                aria-label={`Ver ${item.title}`}
                aria-selected={index === activeIndex}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                    index === activeIndex
                      ? 'bg-action-on-dark'
                      : 'bg-text-on-dark/30'
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
