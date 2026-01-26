'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { heroStats, whatsappLinks } from './home-data';
import CountUp from '@/components/ui/count-up';

export function HeroSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.1, 0.9, 1],
      rotate: [0, 10, -10, 0],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative h-[calc(100dvh-80px)] md:h-[calc(100dvh-80px)] flex items-center justify-center overflow-hidden py-4 md:py-6">
      {/* Background Image - 100% opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/home-hero.webp"
          alt="Cícero Joias Atelier"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Cinematic Overlays - Adjusted to 80% as requested */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0B2B20]/80 via-[#184434]/80 to-[#04160F]/80" />
      <div className="absolute inset-0 z-[1] bg-[url('/assets/noise.webp')] opacity-[0.03] mix-blend-overlay" />

      {/* Active Ambient Blobs */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] z-[2] bg-gradient-radial from-esmeralda-light/40 to-transparent rounded-full blur-[100px]"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        transition={{ delay: 2, duration: 18, repeat: Infinity }}
        className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] z-[2] bg-gradient-radial from-ouro/20 to-transparent rounded-full blur-[120px]"
      />

      {/* Content Container - Flex Layout with Desktop Upscaling */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center justify-between h-full max-h-[720px] md:max-h-none lg:max-h-[1100px]"
      >

        {/* Top Space */}
        <div className="flex-1 min-h-[1rem] md:min-h-[2rem]" />

        {/* Main Content Group */}
        <div className="flex flex-col items-center gap-4 md:gap-10 lg:gap-12 w-full">

          {/* Badge & Headlines */}
          <div className="flex flex-col items-center gap-3 md:gap-5">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <Star className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-ouro fill-ouro" />
              <span className="text-[9px] md:text-xs font-jost font-semibold uppercase tracking-widest text-ouro/90">
                Excelência Artesanal
              </span>
            </motion.div>

            <div className="relative">
              <motion.h1
                variants={itemVariants}
                className="font-philosopher font-bold leading-[0.9] tracking-tighter"
              >
                <span className="block text-[clamp(32px,7vh,110px)] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 filter drop-shadow-2xl">
                  Desde 1985
                </span>
                <span className="block text-[clamp(20px,4.5vh,80px)] text-ouro/90 mt-2 filter drop-shadow-lg">
                  criando legado
                </span>
                <span className="sr-only">Desde 1985 criando e cuidando de joias</span>
              </motion.h1>
            </div>

            <motion.p
              variants={itemVariants}
              className="font-montserrat text-[clamp(13px,1.6vh,20px)] text-white/75 max-w-2xl md:max-w-3xl mx-auto leading-relaxed hidden sm:block"
            >
              Oficina própria, ourives especializados e atendimento exclusivo. <br className="hidden lg:block" />
              Transformamos metais e pedras preciosas em <span className="text-white font-medium italic">emoções eternas</span>.
            </motion.p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col items-center gap-6 md:gap-12 lg:gap-16 w-full mt-2">

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full md:w-auto"
            >
              <motion.a
                href={whatsappLinks.primary}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-ouro px-6 py-3 md:px-10 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-esmeralda-dark shadow-[0_0_40px_-10px_rgba(207,154,36,0.5)] transition-all hover:bg-[#F2C054] hover:shadow-[0_0_60px_-15px_rgba(207,154,36,0.7)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Solicitar Orçamento
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>

              <motion.a
                href="#servicos"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 md:px-10 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/[0.65] transition-all duration-500 hover:text-white hover:bg-white/[0.07] hover:border-ouro/30 backdrop-blur-sm"
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-ouro/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="relative z-10">Nossos Serviços</span>
              </motion.a>
            </motion.div>

            {/* Stats Cards - Upscaled for Desktop */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8 w-full max-w-6xl mx-auto px-2 md:px-0"
            >
              {heroStats.map((stat, index) => (
                <div key={stat.number}
                  className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/20 p-4 md:p-8 lg:p-10
                    shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                    transition-all duration-500
                    hover:bg-white/[0.07] hover:border-ouro/30
                  "
                >
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 md:w-40 md:h-40 bg-ouro/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <h3 className="relative font-philosopher text-2xl md:text-4xl lg:text-5xl font-bold text-ouro mb-1 tracking-tight">
                    <CountUp
                      to={stat.number}
                      from={0}
                      duration={2.5}
                      delay={0.5 + (index * 0.1)}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </h3>
                  <p className="relative font-jost text-[10px] md:text-xs lg:text-sm font-bold text-white/90 mb-2 md:mb-3 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="relative font-montserrat text-[10px] md:text-xs lg:text-sm text-white/[0.65] leading-relaxed group-hover:text-white transition-colors hidden sm:block">
                    {stat.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Area - Scroll Arrow */}
        <div className="flex-1 flex items-end justify-center pb-2 md:pb-4">
          <motion.a
            href="#servicos"
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="block text-white/30 hover:text-white transition-colors duration-300 cursor-pointer p-2"
            aria-label="Rolar para serviços"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 md:w-8 md:h-8"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.a>
        </div>

      </motion.div>
    </section>
  );
}
