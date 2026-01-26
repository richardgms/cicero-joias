'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { heroStats, whatsappLinks } from '../home-data';
import CountUp from '@/components/ui/count-up';

export function LegacyHeroSection() {
    return (
        <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-6 md:pt-8 lg:pt-10 pb-6 md:pb-8 lg:pb-10">
            {/* Background Image - 100% opacity */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/home-hero.webp"
                    alt="Cícero Joias"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            {/* Background Base - Overlay verde com 90% opacidade (20% mais escuro) */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#1E5445]/90 via-esmeralda/90 to-esmeralda-dark/90" />

            {/* Organic Blob 1 - Superior esquerdo (mais claro) */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] z-[2] bg-gradient-to-br from-esmeralda-light/60 via-esmeralda-light/30 to-transparent rounded-full blur-3xl" />

            {/* Organic Blob 2 - Inferior direito (ouro mais visível) */}
            <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] z-[2] bg-gradient-to-tl from-ouro/20 via-esmeralda-light/40 to-transparent rounded-full blur-3xl" />

            {/* Blob adicional - Centro direita (ponto de luz) */}
            <div className="absolute top-1/3 right-0 w-[300px] h-[300px] z-[2] bg-gradient-radial from-esmeralda-light/50 to-transparent rounded-full blur-3xl" />

            {/* Preset Background Esmeralda - Overlays adicionais - Ver docs/style-presets.md */}
            <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white">

                {/* 1. Título H1 */}
                <h1 className="font-philosopher font-bold leading-none mb-3 md:mb-4">
                    <span className="block text-[clamp(36px,6vw+20px,80px)]">Desde 1985</span>
                    <span className="block text-[clamp(24px,4vw+10px,56px)] text-ouro">criando e cuidando de joias</span>
                </h1>

                {/* 2. Subtítulo */}
                <p className="font-montserrat text-[clamp(16px,2vw+8px,20px)] text-white/90 mb-6 md:mb-12 max-w-2xl mx-auto">
                    Oficina própria, ourives especializados e atendimento personalizado para transformar seus sonhos em realidade
                </p>

                {/* 3. Cards de Métricas - Grid com solução para 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-16 max-w-[66rem] mx-auto
          [&>*:nth-child(3)]:md:col-span-2
          [&>*:nth-child(3)]:md:justify-self-center
          [&>*:nth-child(3)]:md:max-w-[50%]
          [&>*:nth-child(3)]:lg:col-span-1
          [&>*:nth-child(3)]:lg:max-w-full">

                    {heroStats.map((stat) => (
                        <div key={stat.number}
                            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6
                shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
                hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5
                transition-all">
                            <h3 className="font-philosopher text-[clamp(28px,3.5vw+10px,42px)] font-bold text-ouro mb-0.5 mt-0 tracking-tight">
                                <CountUp
                                    to={stat.number}
                                    from={0}
                                    duration={2}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
                            </h3>
                            <p className="font-jost text-sm md:text-base font-semibold text-white/95 mb-3 uppercase tracking-wide">
                                {stat.label}
                            </p>
                            {/* Linha divisora */}
                            <div className="w-25 h-[1px] bg-ouro/40 rounded-full mb-3 mx-auto" />
                            <p className="font-montserrat text-xs md:text-sm text-white/70 leading-snug mb-0">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 4. Seta de Scroll Animada */}
                <a
                    href="#servicos"
                    className="flex justify-center my-8 md:my-10 z-10
            text-white/70 hover:text-white hover:scale-110 transition-all duration-500
            animate-bounce"
                    aria-label="Rolar para serviços"
                >
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </a>

                {/* 5. Botões CTA - 2 botões validados */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8 md:mb-10">
                    {/* CTA Primário - Preset Botão Principal */}
                    <motion.a
                        href={whatsappLinks.primary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-jost group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ouro px-6 py-3 md:py-4 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)] transition-colors hover:bg-ouro/90 sm:w-auto md:w-auto"
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Como podemos ajudar?
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.a>

                    {/* CTA Secundário - Preset Botão Secundário */}
                    <motion.a
                        href="#servicos"
                        className="font-jost inline-flex w-full items-center justify-center gap-2 rounded-full border border-ouro/50 px-6 py-3 md:py-4 text-sm font-semibold uppercase tracking-[0.26em] text-ouro/90 transition-colors hover:bg-ouro/10 sm:w-auto md:w-auto"
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Ver serviços
                        <ArrowRight className="h-4 w-4" />
                    </motion.a>
                </div>

            </div>
        </section>
    );
}
