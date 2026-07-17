'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { ringDifferentiators, whatsappLinksV2 } from './home-data-v2';

export function CustomRingsSectionV2() {
  return (
    <section className="relative overflow-hidden bg-esmeralda-deep py-16 text-text-on-dark sm:py-20 md:py-24">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(207,154,36,0.18),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(42,106,82,0.25),transparent_45%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Image column */}
        <AnimatedSection
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ouro/20 lg:col-span-5 lg:aspect-auto lg:min-h-[560px]"
          delay={0.05}
          direction="left"
        >
          <Image
            src="/assets/photosproducts/aliancas/hero.webp"
            alt="Par de alianças sob medida da Cícero Joias"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-esmeralda-deep/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-full border border-ouro/30 bg-esmeralda-deep/60 px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-ouro" />
            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.22em] text-ouro/90 sm:text-xs">
              Foto de aliança feita aqui na bancada
            </span>
          </div>
        </AnimatedSection>

        {/* Content column */}
        <div className="flex flex-col gap-10 lg:col-span-7 lg:py-6">
          <AnimatedSection delay={0.1} direction="right">
            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-ouro/85 sm:text-xs">
              Alianças sob medida
            </p>
            <h2 className="font-philosopher mt-4 text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.05] text-text-on-dark">
              A aliança que vocês desenharam <span className="italic text-ouro">não existe ainda.</span>
            </h2>
            <p className="font-montserrat mt-6 max-w-xl text-base leading-relaxed text-text-on-dark/80 sm:text-lg">
              Cada par sai daqui com a referência que vocês mandaram, no acabamento
              que vocês escolheram, com a gravação que só faz sentido pra vocês. Sem
              modelos prontos, sem aliança igual à de outro casal.
            </p>
          </AnimatedSection>

          {/* Differentiators grid */}
          <AnimatedSection
            className="grid gap-4 sm:grid-cols-2"
            delay={0.18}
            stagger
          >
            {ringDifferentiators.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="group relative flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-500 hover:border-ouro/30 hover:bg-white/[0.07]"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-ouro/40 bg-ouro/10 text-ouro transition-all duration-500 group-hover:bg-ouro group-hover:text-esmeralda-deep">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-philosopher text-base font-bold text-text-on-dark sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="font-montserrat text-[13px] leading-relaxed text-text-on-dark/65">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatedSection>

          {/* CTA pair */}
          <AnimatedSection
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            delay={0.28}
          >
            <motion.a
              href={whatsappLinksV2.rings}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="group gap-3 rounded-full bg-action-strong px-8 py-6 font-jost text-xs font-bold uppercase tracking-[0.22em] text-text-on-brand shadow-button-primary transition-all duration-500 hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5 sm:text-sm">
                <span>Pedir orçamento de aliança</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </motion.a>
            <Link
              href="/servicos/aliancas-personalizadas"
              className="group inline-flex items-center gap-2 font-jost text-xs font-bold uppercase tracking-widest text-ouro/85 hover:text-ouro"
            >
              <span className="border-b border-ouro/30 pb-0.5 transition-colors duration-300 group-hover:border-ouro">
                Ver página completa
              </span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
