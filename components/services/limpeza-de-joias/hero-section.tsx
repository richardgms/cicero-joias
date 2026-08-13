'use client';

import React from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import CountUp from '@/components/ui/count-up';
import { Section } from '@/components/ui/section';

const WHATSAPP_NUMBER = '5583991180251';
const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const whatsappLinks = {
  orcamento: createWhatsAppLink(
    'Olá! Gostaria de solicitar um orçamento para limpeza de joias.'
  ),
};

export function LimpezaDeJoiasHeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      tone="dark"
      spacing="none"
      aria-labelledby="limpeza-de-joias-hero-heading"
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden"
    >
      <Image
        src="/assets/services/limpeza-de-joias/hero.webp"
        alt="Joia sendo polida profissionalmente na Cícero Joias"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-surface-dark/65" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/55 to-surface-dark/95"
        aria-hidden="true"
      />

      <Container
        size="lg"
        className="relative z-10 flex flex-col items-center py-10 text-center sm:py-12 lg:py-16"
      >
        <Badge variant="dark" className="gap-2">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Serviço especializado
        </Badge>

        <h1
          id="limpeza-de-joias-hero-heading"
          className="mt-5 font-heading text-5xl font-medium leading-none sm:text-6xl lg:text-7xl"
        >
          <span className="block text-text-on-dark">Limpeza de Joias</span>{' '}
          <span className="mt-1 block italic text-action-on-dark">
            Profissional
          </span>
        </h1>

        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-on-dark/75 sm:mt-6 sm:text-lg">
          Devolva o brilho das suas joias em prata, ouro e folheado, com
          limpeza manual feita por nossos ourives — polimento quando
          indicado para a peça. Muitas vezes{' '}
          <span className="font-medium text-text-on-dark">
            pronta na hora
          </span>
          .
        </p>

        <div className="mt-6 flex w-full max-w-xl flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
          <Button asChild variant="goldOnDark" size="lg" className="group sm:flex-1">
            <a href={whatsappLinks.orcamento} target="_blank" rel="noopener noreferrer">
              Solicitar orçamento
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

        <dl className="mt-6 grid w-full max-w-5xl gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
          <Card
            variant="dark"
            className="border-border-on-dark bg-surface-dark-elevated/80 p-4 backdrop-blur-md sm:p-6"
          >
            <dd className="font-numeric text-3xl text-action-on-dark sm:text-4xl">
              {shouldReduceMotion ? (
                <span>+40 anos</span>
              ) : (
                <CountUp to={40} from={0} duration={2} prefix="+" suffix=" anos" />
              )}
            </dd>
            <dt className="mt-2 text-xs font-bold uppercase tracking-label text-text-on-dark">
              De tradição
            </dt>
            <div className="mx-auto my-2 hidden h-px w-16 bg-border-on-dark sm:block" aria-hidden="true" />
            <p className="hidden text-sm leading-relaxed text-text-on-dark/70 sm:block">
              Joalheria consolidada em João Pessoa desde 1985.
            </p>
          </Card>

          <Card
            variant="dark"
            className="border-border-on-dark bg-surface-dark-elevated/80 p-4 backdrop-blur-md sm:p-6"
          >
            <dd className="font-numeric text-3xl text-action-on-dark sm:text-4xl">
              Na hora
            </dd>
            <dt className="mt-2 text-xs font-bold uppercase tracking-label text-text-on-dark">
              Prazo
            </dt>
            <div className="mx-auto my-2 h-px w-16 bg-border-on-dark" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-text-on-dark/70">
              Muitas vezes pronta no mesmo dia, conforme a demanda.
            </p>
          </Card>

          <Card
            variant="dark"
            className="border-border-on-dark bg-surface-dark-elevated/80 p-4 backdrop-blur-md sm:p-6"
          >
            <dd className="font-numeric text-3xl text-action-on-dark sm:text-4xl">
              {shouldReduceMotion ? (
                <span>3 materiais</span>
              ) : (
                <CountUp to={3} from={0} duration={2} suffix=" materiais" />
              )}
            </dd>
            <dt className="mt-2 text-xs font-bold uppercase tracking-label text-text-on-dark">
              Atendidos
            </dt>
            <div className="mx-auto my-2 hidden h-px w-16 bg-border-on-dark sm:block" aria-hidden="true" />
            <p className="hidden text-sm leading-relaxed text-text-on-dark/70 sm:block">
              Prata, ouro e folheado.
            </p>
          </Card>
        </dl>

        <a
          href="#sobre"
          className="mt-6 inline-flex h-control w-control items-center justify-center rounded-full text-text-on-dark/75 transition-colors duration-300 hover:text-action-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark sm:mt-8"
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
