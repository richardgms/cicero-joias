'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { servicesGrid } from './home-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

export function ServicesGridSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const cards = Array.from(carousel.children) as HTMLElement[];
      const currentIndex = cards.reduce(
        (closestIndex, card, index) => {
          const currentDistance = Math.abs(
            card.offsetLeft - carousel.offsetLeft - carousel.scrollLeft
          );
          const closestCard = cards[closestIndex];
          const closestDistance = Math.abs(
            closestCard.offsetLeft - carousel.offsetLeft - carousel.scrollLeft
          );

          return currentDistance < closestDistance ? index : closestIndex;
        },
        0
      );

      setActiveIndex(currentIndex);
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current;
    const card = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !card) return;

    carousel.scrollTo({
      left: card.offsetLeft - carousel.offsetLeft,
      behavior: 'smooth',
    });
  };

  return (
    <Section
      tone="dark"
      spacing="md"
      className="overflow-hidden border-b border-border-on-dark"
      aria-labelledby="home-services-title"
    >
      <Container size="lg" className="flex flex-col">
        <SectionHeading
          titleId="home-services-title"
          align="center"
          tone="dark"
          eyebrow={
            <Badge variant="dark" className="gap-2">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              Nossos serviços
            </Badge>
          }
          title={
            <>
              Excelência em{' '}
              <span className="text-action-on-dark">cada detalhe</span>
            </>
          }
          description="Da criação à manutenção, oferecemos o cuidado completo que suas joias merecem."
        />

        <p className="mt-8 flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-label text-action-on-dark sm:hidden">
          Deslize para conhecer
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </p>

        <div
          ref={carouselRef}
          className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-6 pt-2 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-10 lg:grid-cols-3"
          role="list"
          aria-label="Nossos serviços de joalheria"
        >
          {servicesGrid.map((service) => {
            const IconComponent = service.icon;

            return (
              <Card
                key={service.title}
                variant="dark"
                interactive
                className="group relative basis-5/6 shrink-0 snap-start overflow-hidden border-border-on-dark bg-surface-dark-elevated hover:border-action-on-dark sm:basis-auto"
                role="listitem"
              >
                <Link
                  href={service.href}
                  className="flex h-full min-h-80 flex-col p-6 focus-visible:outline-none sm:p-7"
                  draggable={false}
                >

                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-on-dark bg-brand-emerald-900/40 text-text-on-dark transition-colors group-hover:border-action-on-dark group-hover:bg-action-on-dark group-hover:text-brand-emerald-900">
                    <IconComponent
                      className="h-5 w-5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>

                  <div className="relative mt-6">
                    <h3 className="font-heading text-2xl font-medium leading-tight text-text-on-dark transition-colors group-hover:text-action-on-dark">
                      {service.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-text-on-dark/70">
                      {service.description}
                    </p>
                  </div>

                  <span className="relative mt-auto inline-flex items-center gap-2 pt-6 font-sans text-xs font-bold uppercase tracking-label text-action-on-dark">
                    Saiba mais
                    <ArrowRight
                      className="h-3 w-3 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Card>
            );
          })}
        </div>

        <div
          className="mt-1 flex justify-center sm:hidden"
          aria-label="Selecionar serviço"
        >
          {servicesGrid.map((service, index) => (
            <button
              key={service.title}
              type="button"
              onClick={() => scrollToCard(index)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
              aria-label={`Ir para ${service.title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
            >
              <span
                className={cn(
                  'block h-1.5 rounded-full bg-action-on-dark/30 transition-[width,background-color]',
                  activeIndex === index && 'w-6 bg-action-on-dark',
                  activeIndex !== index && 'w-1.5'
                )}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center lg:mt-10">
          <Button asChild variant="goldOnDark" size="lg">
            <Link href="/servicos">
              Ver todos os serviços
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
