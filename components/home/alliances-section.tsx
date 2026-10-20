import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  authorityHierarchy,
  ringsHighlights,
  whatsappLinks,
} from './home-data';

export function AlliancesSection() {
  return (
    <Section
      tone="white"
      spacing="lg"
      className="overflow-hidden border-b border-border-subtle"
      aria-labelledby="home-alliances-title"
    >
      <Container
        size="lg"
        className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
      >
        <Card
          variant="light"
          className="relative order-2 aspect-[4/5] overflow-hidden border-border-default bg-surface-subtle p-0 shadow-card sm:aspect-[16/10] lg:order-1 lg:col-span-6 lg:aspect-[4/5]"
        >
          <Image
            src="/assets/home/aliancas.webp"
            alt="Par de alianças personalizadas produzido na oficina da Cícero Joias"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-emerald-950/90 via-brand-emerald-950/10 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 text-text-on-dark sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div>
              <p className="font-numeric text-4xl leading-none text-action-on-dark sm:text-5xl">
                {authorityHierarchy.featured.value}
              </p>
              <p className="mt-2 font-sans text-xs font-bold uppercase tracking-label text-text-on-dark">
                {authorityHierarchy.featured.label}
              </p>
            </div>
            <Badge variant="dark" className="w-fit gap-2">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              Produção própria
            </Badge>
          </div>
        </Card>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <SectionHeading
            titleId="home-alliances-title"
            eyebrow={
              <Badge variant="sectionLight" className="gap-2">
                <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                Alianças sob medida
              </Badge>
            }
            title={
              <>
                Criadas para uma{' '}
                <span className="text-action-strong">história única</span>
              </>
            }
            description="Cada par é produzido em nossa oficina, com proporções, acabamento e gravação definidos para representar a história de vocês."
          />

          <div className="mt-8 border-y border-border-default">
            {ringsHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="grid grid-cols-[auto_1fr] gap-4 border-b border-border-default py-5 last:border-b-0"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary">
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-medium leading-tight text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild variant="gold" size="lg">
              <a
                href={whatsappLinks.rings}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon className="h-4 w-4" aria-hidden="true" />
                Solicitar orçamento
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/servicos/aliancas-personalizadas">
                Conhecer alianças
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
