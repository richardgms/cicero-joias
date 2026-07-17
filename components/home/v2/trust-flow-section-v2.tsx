'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { flowSteps, whatsappLinksV2 } from './home-data-v2';

export function TrustFlowSectionV2() {
  return (
    <section className="relative overflow-hidden bg-surface-page py-16 sm:py-20 md:py-24">
      {/* Subtle ambient texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(207,154,36,0.06),transparent_45%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        {/* Header — editorial two-column */}
        <AnimatedSection
          className="grid gap-8 md:grid-cols-12 md:items-end"
          delay={0.05}
        >
          <div className="md:col-span-5">
            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-ouro sm:text-xs">
              Como funciona
            </p>
            <h2 className="font-philosopher mt-4 text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.05] text-text-primary">
              Comprar joia com a gente <span className="italic text-ouro">é uma conversa</span>, não um formulário.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="font-montserrat text-base leading-relaxed text-text-secondary/80 sm:text-lg">
              Você não precisa sair de casa pra começar. Manda uma foto, descreve a ideia
              e o ourives responde — no mesmo dia, em horário comercial. Quando a gente
              fecha, você sabe exatamente o que vai receber, em quanto tempo e por quanto.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps — numbered horizontal */}
        <AnimatedSection
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          delay={0.12}
          stagger
        >
          {flowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="group relative flex h-full flex-col gap-5 rounded-2xl border border-ouro/15 bg-surface-section p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-ouro/45 hover:shadow-card-hover"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-philosopher text-5xl font-bold leading-none text-ouro/25 transition-colors duration-500 group-hover:text-ouro/55">
                    {step.number}
                  </span>
                  <Icon
                    className="h-6 w-6 text-ouro/60 transition-all duration-500 group-hover:scale-110 group-hover:text-ouro"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-philosopher text-xl font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="font-montserrat text-sm leading-relaxed text-text-secondary/75">
                    {step.description}
                  </p>
                </div>

                {/* Hover ambient glow */}
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-ouro/15 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </AnimatedSection>

        {/* WhatsApp CTA inline */}
        <AnimatedSection className="flex justify-center" delay={0.25}>
          <motion.a
            href={whatsappLinksV2.primary}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="group gap-3 rounded-full bg-action-strong px-8 py-6 font-jost text-xs font-bold uppercase tracking-[0.22em] text-text-on-brand shadow-button-primary transition-all duration-500 hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5 sm:text-sm">
              <MessageCircle className="h-4 w-4" />
              <span>Começar pelo WhatsApp</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Button>
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}
