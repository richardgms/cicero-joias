'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Award,
  FlaskConical,
  ShoppingBag,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

type Differential = {
  icon: LucideIcon;
  helper: string;
  title: string;
  description: string;
};

const DIFFERENTIALS: Differential[] = [
  {
    icon: FlaskConical,
    helper: 'Parceria de confiança',
    title: 'Laboratório Parceiro Especializado',
    description:
      'Trabalhamos com laboratório parceiro especializado para garantir precisão na fabricação de cada lente.',
  },
  {
    icon: Users,
    helper: 'Atenção ao seu caso',
    title: 'Atendimento Consultivo',
    description:
      'Ajudamos você a escolher o tipo de lente certo para sua necessidade e receita, sem complicação.',
  },
  {
    icon: ShoppingBag,
    helper: 'Para todos os estilos',
    title: 'Variedade de Armações',
    description:
      'Armações próprias em loja, com marcas variadas, para você encontrar a combinação perfeita.',
  },
  {
    icon: Award,
    helper: 'Tradição consolidada',
    title: '+40 Anos em João Pessoa',
    description:
      'Joalheria consolidada desde 1985, com a confiança de gerações de clientes.',
  },
];

// Debounce helper function for scroll performance
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

function DifferentialCard({ item }: { item: Differential }) {
  return (
    <Card
      variant="dark"
      role="article"
      className="flex h-full flex-col gap-4 p-6"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-on-dark bg-surface-dark text-text-on-dark">
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
}

export function LentesDeOculosDifferentialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current;
    const cards = container?.querySelectorAll<HTMLElement>('[data-differential-card]');

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
        container.querySelectorAll<HTMLElement>('[data-differential-card]')
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

  return (
    <Section
      tone="dark"
      spacing="md"
      aria-labelledby="lentes-de-oculos-differentials-heading"
      className="overflow-hidden"
    >
      <Container className="space-y-12 md:space-y-16">
        <SectionHeading
          align="center"
          tone="dark"
          titleId="lentes-de-oculos-differentials-heading"
          eyebrow={
            <Badge variant="dark" className="gap-2">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              Nossos diferenciais
            </Badge>
          }
          title={
            <>
              Por que escolher a{' '}
              <span className="italic text-action-on-dark">Cícero Joias</span>
            </>
          }
          description="Cuidado com a sua visão, do primeiro atendimento à entrega dos óculos prontos."
        />

        <div className="hidden gap-6 sm:grid sm:grid-cols-2">
          {DIFFERENTIALS.map((item) => (
            <DifferentialCard key={item.title} item={item} />
          ))}
        </div>

        <div className="-mx-4 sm:hidden">
          <div
            ref={scrollRef}
            className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide"
          >
            {DIFFERENTIALS.map((item) => (
              <div
                key={item.title}
                data-differential-card
                className="min-w-full snap-center"
              >
                <DifferentialCard item={item} />
              </div>
            ))}
          </div>

          <div
            className="mt-6 flex justify-center gap-1"
            role="tablist"
            aria-label="Navegação dos diferenciais"
          >
            {DIFFERENTIALS.map((item, index) => (
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
