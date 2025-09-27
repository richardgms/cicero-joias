'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroContent, heroStats, whatsappLinks } from './home-data';

export function HeroSection() {
  const metrics = heroStats;

  return (
    <section className="relative overflow-hidden bg-esmeralda text-marfim">
      {/* Background gradients for desktop */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-esmeralda via-esmeralda/95 to-[#0b1f18]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(207,154,36,0.18),transparent_55%)]" />
      </div>

      {/* Background image for mobile */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/assets/home/hero-mobile.webp"
          alt="Casal experimentando aliancas na Cicero Joias"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-esmeralda/90 via-esmeralda/85 to-esmeralda/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f18]/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[560px] w-full max-w-6xl gap-12 px-4 pb-10 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center lg:px-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-ouro/30 bg-esmeralda-dark/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ouro/90">
            <Sparkles className="h-4 w-4" />
            {heroContent.badge}
          </span>

          <div className="space-y-4">
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight">
              {heroContent.title}
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-marfim/85">
              {heroContent.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-ouro/20 bg-esmeralda-dark/40 px-4 py-3 text-left"
              >
                <p className="font-playfair text-2xl font-semibold text-ouro">{metric.value}</p>
                <p className="text-xs uppercase tracking-[0.28em] text-ouro/80">{metric.label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-marfim/70">{metric.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="group inline-flex items-center gap-2 rounded-full bg-ouro px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)] transition-transform hover:scale-[1.02]"
            >
              <a href={whatsappLinks.primary} target="_blank" rel="noopener noreferrer">
                Começar meu projeto
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <motion.a
              href={whatsappLinks.visit}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ouro/50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ouro/90 transition-colors hover:bg-ouro/10"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
            >
              Agendar visita presencial
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)] lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src="/assets/home/hero-desktop.webp"
            alt="Ourives trabalhando na bancada da Cicero Joias"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f18]/70 via-transparent to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
