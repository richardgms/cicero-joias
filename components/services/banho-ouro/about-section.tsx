'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Crown, Shield, Star, type LucideIcon } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

const WHATSAPP_NUMBER = '5583991180251';
const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

type ServiceOption = {
  name: string;
  icon: LucideIcon;
  highlight: string;
  description: string;
  features: string[];
  warranty: string;
  popular: boolean;
};

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    name: 'Banho Básico',
    icon: Star,
    highlight: 'Ideal para uso eventual',
    description:
      'Ouro 18k de alta qualidade, perfeito para peças de uso esporádico ou decorativas.',
    features: [
      'Ouro 18 quilates',
      'Processo completo de galvanoplastia',
      'Brilho intenso',
      'Melhor custo-benefício',
    ],
    warranty: 'Sem garantia',
    popular: false,
  },
  {
    name: 'Banho Intermediário',
    icon: Shield,
    highlight: 'Equilíbrio ideal',
    description:
      'Camadas reforçadas de ouro 18k para maior durabilidade no dia a dia.',
    features: [
      'Ouro 18 quilates',
      'Camadas extras de proteção',
      'Maior resistência ao desgaste',
      '6 meses de garantia',
    ],
    warranty: '6 meses de garantia',
    popular: true,
  },
  {
    name: 'Banho Avançado',
    icon: Crown,
    highlight: 'Máxima durabilidade',
    description:
      'Processo premium com múltiplas camadas de ouro 18k e proteção antioxidante.',
    features: [
      'Ouro 18 quilates premium',
      'Múltiplas camadas reforçadas',
      'Proteção antioxidante superior',
      '1 ano de garantia completa',
    ],
    warranty: '1 ano de garantia',
    popular: false,
  },
];

const APPLICABLE_ITEMS = [
  'Joias e semijoias',
  'Bijuterias',
  'Joias de prata',
  'Objetos decorativos metálicos',
  'Peças eletrônicas (para condutividade)',
  'Revitalização de peças com banho desgastado',
];

// Debounce helper function for scroll performance
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

function PlanCard({ option }: { option: ServiceOption }) {
  return (
    <Card
      variant="light"
      className={`relative flex h-full flex-col gap-6 p-6 ${
        option.popular ? 'border-action-strong' : ''
      }`}
    >
      {option.popular && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)]">
          <Badge variant="gold" className="gap-1 bg-surface-page">
            <Star className="h-3 w-3 fill-current" aria-hidden="true" />
            Mais escolhido
          </Badge>
        </span>
      )}

      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
          <option.icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-heading text-xl font-semibold text-text-primary">
            {option.name}
          </h3>
          <p className="text-xs font-bold uppercase tracking-label text-action-strong">
            {option.highlight}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-text-secondary">
        {option.description}
      </p>

      <div className="flex-1 space-y-3">
        {option.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-action-primary"
              aria-hidden="true"
            />
            <span className="text-sm text-text-body">{feature}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-control border border-border-default bg-surface-subtle p-4">
        <Shield className="h-5 w-5 text-action-strong" aria-hidden="true" />
        <span className="text-sm font-semibold text-text-primary">
          {option.warranty}
        </span>
      </div>

      <Button
        asChild
        variant={option.popular ? 'gold' : 'outline'}
        size="default"
        className="w-full"
      >
        <a
          href={createWhatsAppLink(
            `Olá! Gostaria de solicitar um orçamento para ${option.name}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Solicitar este
        </a>
      </Button>
    </Card>
  );
}

export function BanhoOuroAboutSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current;
    const cards = container?.querySelectorAll<HTMLElement>('[data-plan-card]');

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
        container.querySelectorAll<HTMLElement>('[data-plan-card]')
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
      tone="light"
      spacing="md"
      aria-labelledby="banho-ouro-about-heading"
    >
      <Container className="space-y-16">
        <SectionHeading
          align="center"
          titleId="banho-ouro-about-heading"
          eyebrow={<Badge variant="sectionLight">O que oferecemos</Badge>}
          title={
            <>
              Revitalize suas joias com{' '}
              <span className="italic text-action-strong">ouro 18k</span>
            </>
          }
          description="Transformamos e renovamos suas peças através de um processo profissional de galvanoplastia, com mais de 20 anos de experiência especializada."
          className="mx-auto"
        />

        <div className="hidden gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3">
          {SERVICE_OPTIONS.map((option) => (
            <PlanCard key={option.name} option={option} />
          ))}
        </div>

        <div className="-mx-4 sm:hidden">
          <div
            ref={scrollRef}
            className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-3 scrollbar-hide"
          >
            {SERVICE_OPTIONS.map((option) => (
              <div
                key={option.name}
                data-plan-card
                className="min-w-[85%] snap-center"
              >
                <PlanCard option={option} />
              </div>
            ))}
          </div>

          <div
            className="mt-2 flex justify-center gap-1"
            role="tablist"
            aria-label="Navegação dos planos de banho de ouro"
          >
            {SERVICE_OPTIONS.map((option, index) => (
              <button
                key={option.name}
                type="button"
                onClick={() => scrollToCard(index)}
                className="flex h-control w-control cursor-pointer items-center justify-center rounded-full [-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-strong"
                role="tab"
                aria-label={`Ver ${option.name}`}
                aria-selected={index === activeIndex}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                    index === activeIndex
                      ? 'bg-action-strong'
                      : 'bg-border-default'
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.15}>
          <Card variant="light" className="p-8 sm:p-10">
            <div className="space-y-6">
              <div className="space-y-3 text-center">
                <h3 className="font-heading text-2xl font-semibold text-text-primary sm:text-3xl">
                  O que pode receber banho de ouro?
                </h3>
                <p className="text-sm text-text-secondary">
                  Trabalhamos com diversos tipos de peças metálicas
                </p>
              </div>

              <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                {APPLICABLE_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-control border border-border-default bg-surface-subtle p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-card text-action-primary">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-control border border-border-default bg-surface-subtle p-6 text-center">
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-action-strong">
                    Importante:
                  </span>{' '}
                  Atualmente não realizamos banho em relógios. Para qualquer
                  outra peça, envie uma foto pelo WhatsApp para avaliação
                  prévia gratuita.
                </p>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
