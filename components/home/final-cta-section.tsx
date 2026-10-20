'use client';

import { motion } from 'framer-motion';
import { Clock, Tag, User, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { whatsappLinks } from './home-data';

interface FinalCTASectionProps {
  appearance?: 'legacy' | 'home-dark' | 'service-light';
}

export function FinalCTASection({
  appearance = 'legacy',
}: FinalCTASectionProps) {
  const benefits = [
    { icon: Clock, text: 'Resposta em 24h' },
    { icon: Tag, text: 'Orçamento gratuito' },
    { icon: User, text: 'Atendimento personalizado' },
  ];

  if (appearance === 'service-light') {
    return (
      <Section
        tone="light"
        spacing="md"
        aria-labelledby="final-cta-heading"
      >
        <Container
          size="md"
          className="flex flex-col items-center text-center"
        >
          <SectionHeading
            align="center"
            tone="light"
            titleId="final-cta-heading"
            title="Pronto para seu projeto?"
            description="Fale conosco pelo WhatsApp para tirar dúvidas, solicitar orçamento ou agendar uma visita. Nossa equipe está pronta para atender você."
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {benefits.map((benefit) => (
              <Badge
                key={benefit.text}
                variant="sectionLight"
                className="gap-2"
              >
                <benefit.icon className="h-4 w-4" aria-hidden="true" />
                {benefit.text}
              </Badge>
            ))}
          </div>

          <Button
            asChild
            variant="gold"
            size="lg"
            className="group mt-10"
          >
            <a
              href={whatsappLinks.primary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </Button>
        </Container>
      </Section>
    );
  }

  if (appearance === 'home-dark') {
    return (
      <Section
        tone="dark"
        spacing="lg"
        aria-labelledby="final-cta-heading"
      >
        <Container
          size="md"
          className="flex flex-col items-center text-center"
        >
          <SectionHeading
            align="center"
            tone="dark"
            titleId="final-cta-heading"
            title="Pronto para seu projeto?"
            description="Fale conosco pelo WhatsApp para tirar dúvidas, solicitar orçamento ou agendar uma visita. Nossa equipe está pronta para atender você."
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {benefits.map((benefit) => (
              <Badge key={benefit.text} variant="dark" className="gap-2">
                <benefit.icon className="h-4 w-4" aria-hidden="true" />
                {benefit.text}
              </Badge>
            ))}
          </div>

          <Button
            asChild
            variant="goldOnDark"
            size="lg"
            className="mt-10"
          >
            <a
              href={whatsappLinks.primary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <section className="relative z-0 overflow-hidden bg-esmeralda-deep py-8 text-center text-text-on-dark md:py-12 lg:py-14">
      {/* Background Decorativo com suave gradiente apenas no topo, morrendo para a cor sólida do footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-esmeralda to-transparent opacity-90" />

      {/* Preset Background Esmeralda */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]" />
      </div>

      <div
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-4 sm:px-6 lg:px-8"
      >
        {/* Título */}
        <h2 className="font-heading text-3xl font-bold text-text-on-dark sm:text-4xl lg:text-5xl">
          Pronto para seu projeto?
        </h2>

        {/* Descrição */}
        <p className="font-sans max-w-2xl text-base leading-relaxed text-text-on-dark/85 sm:text-lg">
          Fale conosco pelo WhatsApp para tirar dúvidas, solicitar orçamento ou agendar uma visita. Nossa equipe está pronta para atender você.
        </p>

        {/* Tags de Benefícios */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {benefits.map((benefit) => (
            <span
              key={benefit.text}
              className="group font-sans inline-flex items-center gap-2 rounded-full border border-action-strong/50 bg-transparent px-4 py-2 text-sm text-action-strong/90 transition-all duration-500 hover:scale-105 hover:border-action-strong/70 hover:bg-action-strong/10 hover:shadow-sm"
            >
              <benefit.icon className="h-4 w-4 text-action-strong transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true" />
              {benefit.text}
            </span>
          ))}
        </div>

        {/* Botão WhatsApp - Preset Botão Principal */}
        <motion.a
          href={whatsappLinks.primary}
          target="_blank"
          rel="noopener noreferrer"
          className="font-jost group inline-flex w-full items-center justify-center gap-2 rounded-full bg-action-strong px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-text-on-brand shadow-button-primary transition-all duration-500 hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5 sm:w-auto md:w-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Falar no WhatsApp
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  );
}
