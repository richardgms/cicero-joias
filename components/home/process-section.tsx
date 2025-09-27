'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { processSteps, whatsappLinks } from './home-data';

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#071d17] py-24 text-marfim">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_-10%,rgba(207,154,36,0.22),transparent_60%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center rounded-full border border-ouro/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-ouro/90">
            Como Trabalhamos
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Do primeiro contato à entrega das alianças
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-marfim/80">
            Um processo pensado para sua tranquilidade: desde o primeiro contato até a entrega, cada etapa é acompanhada de perto, garantindo qualidade e beleza às suas joias.
          </p>
        </AnimatedSection>

        <AnimatedSection className="hidden gap-6 md:grid md:grid-cols-4" delay={0.12} stagger>
          {processSteps.map((step, index) => (
            <motion.article
              key={step.title}
              className="relative flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_45px_-32px_rgba(0,0,0,0.4)]"
              whileHover={{ y: -6 }}
            >
              {index < processSteps.length - 1 && (
                <span className="absolute right-[-40px] top-1/2 hidden h-[2px] w-10 -translate-y-1/2 bg-gradient-to-r from-ouro/60 to-transparent lg:block" />
              )}
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-ouro/80">
                {step.time}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ouro/15 text-ouro">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg text-marfim">{step.title}</h3>
              <p className="text-sm leading-relaxed text-marfim/75">{step.description}</p>
            </motion.article>
          ))}
        </AnimatedSection>

        <AnimatedSection className="flex flex-col gap-6 md:hidden" delay={0.12}>
          {processSteps.map((step) => (
            <motion.article
              key={step.title}
              className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ouro/15 text-ouro">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-ouro/80">{step.time}</span>
                <h3 className="font-semibold text-base text-marfim">{step.title}</h3>
                <p className="text-sm leading-relaxed text-marfim/75">{step.description}</p>
              </div>
            </motion.article>
          ))}
        </AnimatedSection>

        <AnimatedSection className="flex flex-col items-center gap-4 text-center" delay={0.2}>
          <p className="max-w-2xl text-sm sm:text-base text-marfim/75">
            Pronto para dar o proximo passo? Podemos combinar a visita na joalheria ou seguir à distancia com o mesmo cuidado artesanal.
          </p>
          <motion.a
            href={whatsappLinks.primary}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-ouro px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Falar com especialista
            <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full bg-esmeralda/10 text-esmeralda">
              <ArrowRight className="h-3 w-3" />
            </span>
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}







