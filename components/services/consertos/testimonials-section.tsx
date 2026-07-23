'use client';

import { useCallback, useEffect, useRef } from 'react';
import { ArrowRight, Quote, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

// Depoimentos específicos de consertos especializados
const testimonials = [
  {
    name: 'Juliana Ferreira',
    service: 'Conserto de corrente de ouro',
    quote:
      'Meu cordão arrebentou em dois pontos e voltou como se fosse novo. A solda ficou imperceptível e ainda entregaram limpo e polido.',
    rating: 5,
  },
  {
    name: 'Carlos Moura',
    service: 'Revisão de relógio herdado',
    quote:
      'Trouxe o relógio do meu pai e recebi acompanhamento em cada etapa. A troca da máquina ficou perfeita e a garantia trouxe tranquilidade.',
    rating: 5,
  },
  {
    name: 'Ana Paula Brito',
    service: 'Ajuste de óculos e anel',
    quote:
      'Resolveram o ângulo da haste dos meus óculos e aproveitaram para ajustar o aro do meu anel. Atendimento cuidadoso e muito rápido.',
    rating: 5,
  },
];

// Função para extrair iniciais do nome (suporta "&" para casais)
function getInitials(name: string): string {
  const cleanName = name.replace(/&/g, '').trim();
  const words = cleanName.split(' ').filter(word => word.length > 0);

  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  const firstInitial = words[0].charAt(0);
  const lastInitial = words[words.length - 1].charAt(0);

  return (firstInitial + lastInitial).toUpperCase();
}

const MOBILE_CAROUSEL_SPEED = 18;

type RepairTestimonial = (typeof testimonials)[number];

type TestimonialCardProps = {
  testimonial: RepairTestimonial;
  className?: string;
};

function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <Card
      variant="dark"
      interactive
      role="article"
      className={cn(
        'group relative flex h-full flex-col overflow-hidden p-6 hover:border-action-on-dark hover:shadow-sm md:p-8',
        className
      )}
    >
      <Quote
        className="pointer-events-none absolute right-6 top-6 h-8 w-8 -scale-x-100 text-action-on-dark/20"
        strokeWidth={1.25}
        aria-hidden="true"
      />

      <div
        className="relative z-10 flex gap-1"
        aria-label={`${testimonial.rating} de 5 estrelas`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={
              index < testimonial.rating
                ? 'h-4 w-4 fill-current text-action-on-dark'
                : 'h-4 w-4 fill-current text-border-on-dark'
            }
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="relative z-10 mt-6 flex-1 text-base italic leading-relaxed text-text-on-dark/85">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <footer className="relative z-10 mt-8 flex items-center gap-4 border-t border-border-on-dark pt-6">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-action-on-dark/25 bg-action-on-dark/10 font-heading text-sm font-semibold text-action-on-dark"
          aria-hidden="true"
        >
          {getInitials(testimonial.name)}
        </div>

        <div className="min-w-0">
          <cite className="block font-heading text-xl font-semibold not-italic leading-tight text-text-on-dark">
            {testimonial.name}
          </cite>
          <p className="mt-1 text-xs font-bold uppercase tracking-label text-text-on-dark/65">
            {testimonial.service}
          </p>
        </div>
      </footer>
    </Card>
  );
}

function MobileTestimonialsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const scrollPositionRef = useRef(0);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
  } | null>(null);

  const normalizeScrollPosition = useCallback(() => {
    const viewport = viewportRef.current;
    const segmentWidth = segmentRef.current?.offsetWidth;

    if (!viewport || !segmentWidth) return;

    let normalizedScrollLeft = viewport.scrollLeft;

    while (normalizedScrollLeft >= segmentWidth * 2) {
      normalizedScrollLeft -= segmentWidth;
    }

    while (normalizedScrollLeft < segmentWidth) {
      normalizedScrollLeft += segmentWidth;
    }

    if (normalizedScrollLeft !== viewport.scrollLeft) {
      viewport.scrollLeft = normalizedScrollLeft;
      scrollPositionRef.current = normalizedScrollLeft;
    }
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (!viewport) return;

    let animationFrame = 0;
    let previousTime = 0;
    let reduceMotion = motionPreference.matches;

    const initializePosition = window.requestAnimationFrame(() => {
      const segmentWidth = segmentRef.current?.offsetWidth;
      if (segmentWidth) {
        viewport.scrollLeft = segmentWidth;
        scrollPositionRef.current = segmentWidth;
      }
    });

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
    };

    const moveCarousel = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 0;
      previousTime = time;

      if (
        !reduceMotion &&
        !isPausedRef.current &&
        document.visibilityState === 'visible'
      ) {
        scrollPositionRef.current +=
          (MOBILE_CAROUSEL_SPEED * elapsed) / 1000;
        viewport.scrollLeft = scrollPositionRef.current;
        normalizeScrollPosition();
      }

      animationFrame = window.requestAnimationFrame(moveCarousel);
    };

    motionPreference.addEventListener('change', handleMotionPreference);
    animationFrame = window.requestAnimationFrame(moveCarousel);

    return () => {
      window.cancelAnimationFrame(initializePosition);
      window.cancelAnimationFrame(animationFrame);
      motionPreference.removeEventListener('change', handleMotionPreference);
    };
  }, [normalizeScrollPosition]);

  const finishInteraction = (pointerId: number) => {
    if (dragRef.current?.pointerId !== pointerId) return;

    dragRef.current = null;
    isPausedRef.current = false;
    normalizeScrollPosition();
  };

  return (
    <div className="md:hidden">
      <p id="consertos-testimonials-instructions" className="sr-only">
        As avaliações passam automaticamente. Toque ou clique e mantenha
        pressionado para pausar; arraste para navegar e solte para retomar.
      </p>

      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Avaliações de consertos especializados"
        aria-describedby="consertos-testimonials-instructions"
        className="-mx-4 cursor-grab touch-pan-y select-none overflow-x-auto overscroll-x-contain px-4 pb-3 pt-1 scrollbar-hide active:cursor-grabbing"
        onPointerDown={event => {
          if (event.pointerType === 'mouse' && event.button !== 0) return;

          isPausedRef.current = true;
          scrollPositionRef.current = event.currentTarget.scrollLeft;
          dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startScrollLeft: event.currentTarget.scrollLeft,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={event => {
          const drag = dragRef.current;
          if (!drag || drag.pointerId !== event.pointerId) return;

          const nextScrollLeft =
            drag.startScrollLeft - (event.clientX - drag.startX);
          event.currentTarget.scrollLeft = nextScrollLeft;
          scrollPositionRef.current = nextScrollLeft;
        }}
        onPointerUp={event => finishInteraction(event.pointerId)}
        onPointerCancel={event => finishInteraction(event.pointerId)}
        onLostPointerCapture={event => finishInteraction(event.pointerId)}
      >
        <div className="flex w-max">
          {[0, 1, 2].map(copyIndex => (
            <div
              key={copyIndex}
              ref={copyIndex === 0 ? segmentRef : undefined}
              aria-hidden={copyIndex !== 1}
              className="flex shrink-0 gap-4 pr-4"
            >
              {testimonials.map(testimonial => (
                <TestimonialCard
                  key={`${copyIndex}-${testimonial.name}`}
                  testimonial={testimonial}
                  className="w-80 shrink-0 sm:w-96"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConsertosTestimonialsSection() {
  return (
    <Section
      tone="dark"
      spacing="md"
      aria-labelledby="consertos-testimonials-heading"
      className="overflow-hidden"
    >
      <Container size="md" className="space-y-12 md:space-y-16">
        <SectionHeading
          align="center"
          tone="dark"
          titleId="consertos-testimonials-heading"
          eyebrow={
            <Badge variant="dark" className="gap-2">
              <Quote className="h-3 w-3" aria-hidden="true" />
              Quem já confiou
            </Badge>
          }
          title="Depoimentos reais de quem voltou a usar suas peças"
          description="A confiança de quem trouxe joias, relógios e óculos para recuperar com a gente."
        />

        <MobileTestimonialsCarousel />

        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outlineDark" size="lg">
            <a
              href="https://share.google/sMlZK8rGLMyapODoF"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver mais avaliações no Google
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
