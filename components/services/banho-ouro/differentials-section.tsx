'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Award,
  Eye,
  Heart,
  Settings,
  ShieldCheck,
  Target,
  Users,
  Zap,
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
    icon: Award,
    helper: 'Experiência consolidada',
    title: '20 Anos de Expertise',
    description:
      'Mais de duas décadas especializados exclusivamente em galvanoplastia e banho de ouro profissional, dominando cada detalhe técnico do processo.',
  },
  {
    icon: Users,
    helper: 'Atenção do especialista',
    title: 'Mestre Ourives Dedicado',
    description:
      'Serviço executado pessoalmente por Cícero, fundador da joalheria, garantindo controle total de qualidade em cada peça.',
  },
  {
    icon: Settings,
    helper: 'Tecnologia dedicada',
    title: 'Equipamento Profissional',
    description:
      'Maquinário próprio e especializado com controle preciso de temperatura e eletrodeposição, garantindo resultado impecável.',
  },
  {
    icon: ShieldCheck,
    helper: 'Proteção garantida',
    title: 'Garantia de até 1 Ano',
    description:
      'Oferecemos opções com garantia de 6 meses a 1 ano completo, demonstrando confiança total na qualidade do nosso trabalho.',
  },
  {
    icon: Heart,
    helper: 'Atenção especial',
    title: 'Cuidado Individualizado',
    description:
      'Cada peça recebe análise e atenção personalizada, como se fosse única. Tratamos sua joia com o máximo de dedicação possível.',
  },
  {
    icon: Zap,
    helper: 'Qualidade técnica',
    title: 'Processo Completo',
    description:
      'Galvanoplastia profissional com múltiplas etapas: cobre para aderência, paládio antialérgico, ouro 18k e verniz protetor.',
  },
  {
    icon: Eye,
    helper: 'Sem surpresas',
    title: 'Avaliação Prévia Gratuita',
    description:
      'Enviamos orçamento detalhado após análise de fotos pelo WhatsApp, sem compromisso. Transparência total desde o início.',
  },
  {
    icon: Target,
    helper: 'Resultado impecável',
    title: 'Comprometimento com Excelência',
    description:
      'Prezamos pela máxima qualidade em cada etapa para garantir sua satisfação completa e durabilidade superior do banho.',
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
          <h3 className="mt-1 font-heading text-lg font-semibold leading-tight text-text-on-dark">
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

export function BanhoOuroDifferentialsSection() {
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
      aria-labelledby="banho-ouro-differentials-heading"
    >
      <Container className="space-y-12 md:space-y-16">
        <SectionHeading
          align="center"
          tone="dark"
          titleId="banho-ouro-differentials-heading"
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
          description="Combinamos tradição artesanal, equipamentos profissionais e dedicação total para entregar um serviço de banho de ouro excepcional."
        />

        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
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
                className="min-w-[85%] snap-center"
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
