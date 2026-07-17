'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroV2, whatsappLinksV2 } from './home-data-v2';

export function HeroSectionV2() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 60, damping: 20 },
    },
  };

  return (
    <section className="relative min-h-[calc(100dvh-80px)] overflow-hidden bg-esmeralda-deep">
      {/* Background image — left-anchored, fades into emerald */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/home/v2/hero-background.png"
          alt="Alianças em ouro sobre bancada de ourives — Cícero Joias"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[30%_center] opacity-85"
        />
        {/* Cinematic overlays — darker on right where copy lives */}
        <div className="absolute inset-0 bg-gradient-to-r from-esmeralda-deep/30 via-esmeralda-deep/70 to-esmeralda-deep" />
        <div className="absolute inset-0 bg-gradient-to-b from-esmeralda-deep/40 via-transparent to-esmeralda-deep/60" />
      </div>

      {/* Subtle ambient blobs */}
      <div className="pointer-events-none absolute -top-[20%] right-[10%] h-[50vw] w-[50vw] rounded-full bg-gradient-radial from-ouro/15 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-[10%] left-[5%] h-[40vw] w-[40vw] rounded-full bg-gradient-radial from-esmeralda-light/25 to-transparent blur-[100px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-[calc(100dvh-80px)] w-full max-w-7xl flex-col justify-between px-4 pb-12 pt-24 sm:px-6 md:pt-28 lg:px-8 lg:pb-20"
      >
        {/* Top: eyebrow + headline + sub + CTAs (anchored right on desktop) */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 xl:col-span-6 lg:col-start-6 xl:col-start-7">
            <motion.p
              variants={itemVariants}
              className="font-jost text-[10px] font-semibold uppercase tracking-[0.32em] text-ouro/85 sm:text-xs"
            >
              {heroV2.eyebrow}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-philosopher mt-5 text-[clamp(40px,6.2vw,84px)] font-bold leading-[0.96] tracking-tight text-text-on-dark"
            >
              {heroV2.titleTop}
              <br />
              <span className="italic text-ouro/95">{heroV2.titleAccent}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-montserrat mt-7 max-w-xl text-base leading-relaxed text-text-on-dark/75 sm:text-lg"
            >
              {heroV2.description}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <motion.a
                href={whatsappLinksV2.primary}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="group w-full gap-3 rounded-full bg-action-strong px-8 py-6 font-jost text-xs font-bold uppercase tracking-[0.22em] text-text-on-brand shadow-button-primary transition-all duration-500 hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5 sm:w-auto sm:text-sm"
                >
                  <span>{heroV2.primaryCta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Button>
              </motion.a>

              <Link href="/servicos/aliancas-personalizadas">
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="group relative w-full gap-2 overflow-hidden rounded-full border-white/25 bg-white/[0.04] px-8 py-6 font-jost text-xs font-bold uppercase tracking-[0.22em] text-white/75 backdrop-blur-sm transition-all duration-500 hover:border-ouro/40 hover:bg-white/[0.08] hover:text-white sm:w-auto sm:text-sm"
                  >
                    <span className="relative z-10">{heroV2.secondaryCta}</span>
                    <ArrowRight className="relative z-10 h-4 w-4 opacity-70 transition-transform duration-500 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom: credentials strip (replaces 3 stat cards) */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md sm:mt-20"
        >
          {heroV2.credentials.map((cred) => (
            <div
              key={cred.label}
              className="flex flex-col items-center justify-center gap-2 bg-esmeralda-deep/40 px-3 py-5 text-center sm:gap-3 sm:py-7"
            >
              <p className="font-philosopher text-2xl font-bold leading-none text-ouro sm:text-4xl lg:text-5xl">
                {cred.value}
                {cred.unit && (
                  <span className="ml-1 font-montserrat text-xs font-medium uppercase tracking-[0.2em] text-ouro/70 sm:text-sm">
                    {cred.unit}
                  </span>
                )}
              </p>
              <p className="font-jost text-[9px] font-semibold uppercase tracking-[0.18em] text-text-on-dark/65 sm:text-[11px]">
                {cred.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
