'use client';

import React from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import CountUp from '@/components/ui/count-up';
import { Section } from '@/components/ui/section';
import { whatsappLinks } from '@/components/home/home-data';

const heroStats = [
  {
    number: 18,
    prefix: '',
    suffix: 'k',
    label: 'Ouro Certificado',
    description: 'Garantia de pureza e qualidade eterna',
  },
  {
    number: 100,
    prefix: '',
    suffix: '%',
    label: 'Garantia Vitalícia',
    description: 'Manutenção e polimento gratuitos',
  },
  {
    number: 1,
    prefix: '',
    suffix: '',
    label: 'Design Exclusivo',
    description: 'Criado unicamente para sua história',
  },
];

export function AliancasHeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      tone="transparent"
      spacing="none"
      aria-labelledby="aliancas-hero-heading"
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/services/aliancas/hero.svg"
          alt="Alianças Personalizadas Cícero Joias"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/70 via-surface-dark/60 to-surface-dark" />
      </div>

      <Container className="relative z-10 flex min-h-screen flex-col items-center justify-center py-16 text-center text-text-on-dark md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1
            id="aliancas-hero-heading"
            className="font-heading text-4xl font-medium leading-tight sm:text-5xl lg:text-7xl"
          >
            <span className="block">Símbolo Eterno</span>
            <span className="block italic text-action-on-dark">do Seu Amor</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-on-dark/85 sm:text-lg">
            Alianças personalizadas, forjadas com ouro 18k e a dedicação de quem entende que cada detalhe conta a sua história.
          </p>
        </div>

        <dl className="mt-10 grid w-full max-w-5xl gap-4 md:grid-cols-3">
          {heroStats.map((stat) => (
            <Card
              key={stat.label}
              variant="dark"
              className="border-border-on-dark bg-surface-dark-elevated/80 p-6 backdrop-blur-md"
            >
              <dd className="font-numeric text-3xl text-action-on-dark sm:text-4xl">
                {shouldReduceMotion ? (
                  <span>{stat.prefix}{stat.number}{stat.suffix}</span>
                ) : (
                  <CountUp
                    to={stat.number}
                    from={0}
                    duration={2}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                )}
              </dd>
              <dt className="mt-2 text-xs font-bold uppercase tracking-label text-text-on-dark">
                {stat.label}
              </dt>
              <div className="mx-auto my-4 h-px w-16 bg-border-on-dark" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-text-on-dark/70">
                {stat.description}
              </p>
            </Card>
          ))}
        </dl>

        <a
          href="#modelos"
          className="mt-8 inline-flex h-control w-control items-center justify-center rounded-full text-text-on-dark/75 transition-colors duration-300 hover:text-action-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
          aria-label="Rolar para modelos"
        >
          <ArrowDown
            className="h-6 w-6 motion-safe:animate-bounce motion-reduce:animate-none"
            aria-hidden="true"
          />
        </a>

        <div className="mt-6 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Button asChild variant="goldOnDark" size="lg" className="group w-full sm:w-auto">
            <a
              href={whatsappLinks.primary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Orçamento Exclusivo
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </Button>

          <Button asChild variant="outlineDark" size="lg" className="group w-full sm:w-auto">
            <a href="#modelos">
              Ver Modelos
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
