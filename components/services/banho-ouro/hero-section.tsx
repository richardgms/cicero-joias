'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';

const WHATSAPP_NUMBER = '5583991180251';
const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const whatsappLinks = {
  orcamento: createWhatsAppLink('Olá! Gostaria de solicitar um orçamento para banho de ouro.'),
  duvidas: createWhatsAppLink('Olá! Tenho dúvidas sobre o serviço de banho de ouro.'),
};

export function BanhoOuroHeroSection() {
  const stats = [
    {
      value: '20 anos',
      label: 'de especialização',
      description: 'Experiência consolidada em galvanoplastia e banho de ouro profissional.',
      icon: Sparkles,
    },
    {
      value: '3 opções',
      label: 'de qualidade',
      description: 'Básico, Intermediário (6 meses) e Avançado (1 ano de garantia).',
      icon: Shield,
    },
    {
      value: '14 dias',
      label: 'prazo médio',
      description: 'Tempo de execução para transformar e revitalizar suas joias.',
      icon: Clock,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-esmeralda text-marfim">
      {/* Background gradients for desktop - Preset Background Esmeralda */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#0b1f18]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_40%)]" />
      </div>

      {/* Background image for mobile */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/assets/services/banho-ouro/hero-mobile.webp"
          alt="Banho de ouro profissional na Cícero Joias"
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
          <span className="font-jost inline-flex items-center gap-2 rounded-full border border-ouro/30 bg-esmeralda-dark/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ouro/90">
            <Sparkles className="h-4 w-4" />
            Serviço Especializado
          </span>

          <div className="space-y-4">
            <h1 className="font-philosopher text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Banho de Ouro <span className="text-ouro">Profissional</span>
            </h1>
            <p className="font-montserrat max-w-xl text-base sm:text-lg text-marfim/85">
              Revitalize suas joias com banho de ouro 18k. Mais de 20 anos de experiência em galvanoplastia, garantindo brilho intenso e durabilidade excepcional.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-ouro/20 bg-esmeralda-dark/40 px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-ouro/80" />
                  <p className="font-philosopher text-2xl font-bold text-ouro">{stat.value}</p>
                </div>
                <p className="font-jost text-xs uppercase tracking-[0.28em] text-ouro/80">{stat.label}</p>
                <p className="font-montserrat mt-1 text-[11px] leading-relaxed text-marfim/70">{stat.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-l-2 border-ouro/30 pl-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ouro/10">
                <Shield className="h-4 w-4 text-ouro" />
              </div>
              <span className="font-montserrat text-xs font-medium text-marfim/80">Até 1 ano de garantia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ouro/10">
                <Sparkles className="h-4 w-4 text-ouro" />
              </div>
              <span className="font-montserrat text-xs font-medium text-marfim/80">Processo profissional</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ouro/10">
                <span className="text-xs font-bold text-ouro">18k</span>
              </div>
              <span className="font-montserrat text-xs font-medium text-marfim/80">Ouro 18 quilates</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.a
                href={whatsappLinks.orcamento}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ouro px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)] transition-colors hover:bg-ouro/90 sm:w-auto"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
              >
                Solicitar orçamento
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href={whatsappLinks.duvidas}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost inline-flex w-full items-center justify-center gap-2 rounded-full border border-ouro/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-ouro/90 transition-colors hover:bg-ouro/10 sm:w-auto"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
              >
                Tirar dúvidas
              </motion.a>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-marfim/70">
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-ouro/60" />
                Orçamento gratuito
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-ouro/60" />
                Avaliação por foto
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-ouro/60" />
                Serviço executado pelo mestre ourives
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)] lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src="/assets/services/banho-ouro/hero-desktop.webp"
            alt="Processo de banho de ouro na Cícero Joias"
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


