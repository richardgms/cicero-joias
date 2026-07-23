'use client';

import React from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import CountUp from '@/components/ui/count-up';
import { Section } from '@/components/ui/section';

const WHATSAPP_NUMBER = '5583991180251';
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá! Gostaria de solicitar uma avaliação para o serviço de consertos especializados.'
)}`;

const heroStats = [
  {
    number: 40,
    prefix: '+',
    suffix: ' anos',
    label: 'De experiência artesanal',
    description: 'Ourives e relojoeiros experientes em reparos delicados',
  },
  {
    number: 10,
    prefix: '+',
    suffix: '',
    label: 'Tipos de reparos executados',
    description: 'Soldas, ajustes de aro, pedras, banho localizado e relógios',
  },
  {
    number: 20,
    prefix: '',
    suffix: ' min',
    label: 'Ajustes simples na hora*',
    description: 'Soldas rápidas e ajustes de anéis conforme a demanda do dia',
  },
];

export function ConsertosHeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      tone="dark"
      spacing="none"
      aria-labelledby="consertos-hero-heading"
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden"
    >
      <Image
        src="/assets/services/consertos/hero.webp"
        alt="Ourives soldando uma corrente de ouro na bancada da Cícero Joias"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 bg-surface-dark/65"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/55 to-surface-dark/95"
        aria-hidden="true"
      />

      <Container
        size="lg"
        className="relative z-10 flex flex-col items-center py-10 text-center sm:py-12 lg:py-16"
      >
        <Badge variant="dark" className="gap-2">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          Serviço especializado
        </Badge>

        <h1
          id="consertos-hero-heading"
          className="mt-5 font-heading text-5xl font-medium leading-none sm:text-6xl lg:text-7xl"
        >
          <span className="block text-text-on-dark">Consertos</span>{' '}
          <span className="mt-1 block italic text-action-on-dark">
            Especializados
          </span>
        </h1>

        <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-text-on-dark/75 sm:text-lg">
          Há mais de quatro décadas devolvendo histórias, brilho e segurança a
          joias, relógios, óculos e peças especiais — com cuidado artesanal e{' '}
          <span className="font-medium text-text-on-dark">
            conversa franca em cada etapa
          </span>
          .
        </p>

        <div className="mt-8 flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="goldOnDark" size="lg" className="group sm:flex-1">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Solicitar avaliação
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </Button>

          <Button asChild variant="outlineDark" size="lg" className="sm:flex-1">
            <a href="#processo">Como funciona</a>
          </Button>
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

        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-text-on-dark/60">
          *Tempo médio para consertos simples como soldas rápidas e ajustes de
          anéis, conforme demanda do dia. Atendimento por ordem de chegada.
        </p>

        <a
          href="#sobre"
          className="mt-8 inline-flex h-control w-control items-center justify-center rounded-full text-text-on-dark/75 transition-colors duration-300 hover:text-action-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
          aria-label="Rolar para saber mais sobre o serviço"
        >
          <ArrowDown
            className="h-6 w-6 motion-safe:animate-bounce motion-reduce:animate-none"
            aria-hidden="true"
          />
        </a>
      </Container>
    </Section>
  );
}
