'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '5583991180251';
const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const whatsappLinks = {
  avaliacao: createWhatsAppLink(
    'Olá! Gostaria de solicitar uma avaliação para o serviço de consertos especializados.'
  ),
  visita: createWhatsAppLink(
    'Olá! Quero levar minha peça até a Cícero Joias para avaliação presencial dos consertos.'
  ),
};

export function ConsertosHeroSection() {
  const highlights = [
    'Ourives e relojoeiros com 40 anos de experiência em reparos delicados',
    'Soldas discretas, ajustes de aro, reposição de pedras, banho localizado e revisão de relógios',
    'Orçamento no balcão ou pelo WhatsApp, com atualizações até a peça voltar para você',
  ];

  const stats = [
    {
      value: '40 anos',
      label: 'de experiência artesanal',
      icon: Sparkles,
    },
    {
      value: '+10',
      label: 'tipos de reparos executados',
      icon: ShieldCheck,
    },
    {
      value: '20 min',
      label: 'para ajustes simples na hora*',
      icon: Clock,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-esmeralda text-marfim">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#04160f]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(207,154,36,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(11,31,24,0.85),transparent_55%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[540px] w-full max-w-6xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.15fr,0.85fr] lg:items-center lg:px-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-ouro/30 bg-esmeralda-dark/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ouro/90">
            <ShieldCheck className="h-4 w-4" />
            Serviço especializado
          </span>

          <div className="space-y-5">
            <h1 className="font-playfair text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              Consertos <span className="text-ouro">Especializados</span>
            </h1>
            <p className="max-w-xl text-base text-marfim/85 sm:text-lg">
              Há quatro décadas devolvendo histórias, brilho e segurança a joias, relógios, óculos e peças especiais —
              sempre com cuidado artesanal, técnicas de alta precisão e conversa franca em cada etapa.
            </p>
          </div>

          <ul className="grid gap-3 rounded-2xl border border-ouro/20 bg-esmeralda-dark/40 p-5 sm:p-6">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-marfim/80">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ouro/15">
                  <Check className="h-3.5 w-3.5 text-ouro" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="group inline-flex items-center gap-2 rounded-full bg-ouro px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-18px_rgba(207,154,36,0.5)] transition-transform hover:scale-[1.02]"
            >
              <a href={whatsappLinks.avaliacao} target="_blank" rel="noopener noreferrer">
                Solicitar avaliação
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <motion.a
              href={whatsappLinks.visita}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ouro/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-ouro/90 transition-colors hover:bg-ouro/10 sm:w-auto"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
            >
              Quero levar minha peça
            </motion.a>
          </div>

          <p className="text-xs text-marfim/60">
            *Tempo médio para consertos simples como soldas rápidas e ajustes de anéis, conforme demanda do dia.
            Atendimento por ordem de chegada com cuidado especial para peças urgentes ou sentimentais.
          </p>
        </motion.div>

        <motion.div
          className="relative hidden w-full max-w-md justify-self-end overflow-hidden rounded-[32px] border border-ouro/15 bg-esmeralda-dark/60 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)] lg:flex lg:flex-col lg:gap-6"
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
        >
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-ouro/15 blur-3xl" />
          <div className="absolute -bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-esmeralda-light/15 blur-3xl" />

          <div className="relative flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.32em] text-ouro/75">Acolhimento completo</span>
            <h2 className="font-playfair text-2xl font-semibold text-ouro">
              Cada peça recebe o cuidado que merece
            </h2>
            <p className="text-sm text-marfim/70">
              Avaliamos, registramos e acompanhamos sua peça do início ao fim, mantendo você informado em cada etapa.
            </p>
          </div>

          <div className="relative grid gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-start gap-3 rounded-2xl border border-ouro/15 bg-esmeralda-dark/50 p-4">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ouro/20">
                  <stat.icon className="h-5 w-5 text-ouro" />
                </div>
                <div>
                  <p className="font-playfair text-xl font-semibold text-ouro">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-ouro/80">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-2xl border border-ouro/15 bg-esmeralda/40 p-4 text-xs text-marfim/65">
            Guardamos cada peça com identificação completa, contato do cliente e instruções de segurança para garantir uma devolução impecável.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
