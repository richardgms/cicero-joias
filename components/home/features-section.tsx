'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Gem, Heart, Award, Clock, Shield, Users, Sparkles, ArrowRight, Check } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

type FeatureColor = 'esmeralda' | 'ouro';

const colorTokens: Record<FeatureColor, { icon: string; chip: string; arrow: string }> = {
  esmeralda: {
    icon: 'bg-gradient-to-br from-esmeralda-light to-esmeralda text-white shadow-[0_25px_50px_-28px_rgba(24,68,52,0.45)]',
    chip: 'border-esmeralda/25 bg-esmeralda/10 text-esmeralda/80',
    arrow: 'text-esmeralda',
  },
  ouro: {
    icon: 'bg-gradient-to-br from-ouro to-yellow-300 text-esmeralda shadow-[0_25px_50px_-28px_rgba(207,154,36,0.45)]',
    chip: 'border-ouro/30 bg-ouro/10 text-ouro/90',
    arrow: 'text-ouro',
  },
};

type Feature = {
  icon: LucideIcon;
  title: string;
  badge: string;
  description: string;
  detail: string;
  meta: string;
  color: FeatureColor;
};

const heroHighlight = {
  eyebrow: 'Atelier autoral',
  title: 'Experiência artesanal completa',
  highlight: 'Consultoria dedicada do conceito ao brilho final',
  description:
    'Guiamos cada projeto de forma boutique: ouvimos sua história, apresentamos renderizações realistas e lapidamos manualmente até chegar ao brilho perfeito.',
  bullets: [
    'Briefing consultivo para entender ocasião, estilo e orçamento.',
    'Renderizações 3D com ajustes ilimitados antes da produção.',
    'Atelier próprio certificado e garantia vitalícia permanente.',
  ],
  ctaLabel: 'Agendar consultoria',
  ctaHref:
    'https://wa.me/5583988073784?text=Olá! Quero agendar uma consultoria com a Cícero Joias para criar minha peça sob medida.',
};

const features: Feature[] = [
  {
    icon: Gem,
    title: 'Consultoria Imersiva',
    badge: 'Atendimento dedicado',
    description:
      'Sessões guiadas para transformar sua história em um conceito exclusivo e alinhado ao seu estilo.',
    detail: 'Mapeamos referências, definimos orçamento e prazos antes da produção começar.',
    meta: 'Suporte próximo',
    color: 'esmeralda',
  },
  {
    icon: Award,
    title: 'Artesanato Certificado',
    badge: 'Atelier próprio',
    description:
      'Ourives especialistas produzem manualmente com metais nobres e gemas certificadas.',
    detail: 'Laudos e registros fotográficos acompanham cada etapa para garantir transparência.',
    meta: 'Qualidade comprovada',
    color: 'ouro',
  },
  {
    icon: Shield,
    title: 'Garantia Vitalícia',
    badge: 'Cuidado contínuo',
    description:
      'Cobertura permanente para ajustes, limpeza ultrassônica e polimento sempre que precisar.',
    detail: 'Agenda periódica de manutenção preserva o brilho e a segurança da peça.',
    meta: 'Suporte vitalício',
    color: 'esmeralda',
  },
  {
    icon: Heart,
    title: 'Experiências Exclusivas',
    badge: 'Joias personalizadas',
    description:
      'Alianças, presentes e restaurações criadas sob medida para cada celebração importante.',
    detail: 'Renderizações e protótipos são ajustados até aprovarmos juntos o resultado final.',
    meta: 'Momentos memoráveis',
    color: 'ouro',
  },
];

const topFeatures = features.slice(0, 2);
const bottomFeatures = features.slice(2);


export function FeaturesSection() {
  const renderFeatureCard = (feature: Feature) => {
    const tone = colorTokens[feature.color];
    const Icon = feature.icon;

    return (
      <motion.article
        key={feature.title}
        className="group relative flex h-full flex-col self-stretch rounded-3xl border border-esmeralda/10 bg-white/90 p-7 shadow-[0_25px_50px_-30px_rgba(24,68,52,0.18)] backdrop-blur-sm transition-all duration-500"
        whileHover={{ y: -8 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone.icon}`}>
            <Icon className="h-6 w-6" />
          </div>
          <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] ${tone.chip}`}>
            {feature.badge}
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <h3 className="font-playfair text-xl font-semibold leading-snug text-esmeralda">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-grafite/75">
            {feature.description}
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-white/0 bg-white/70 p-4 shadow-inner shadow-[0_18px_35px_-28px_rgba(24,68,52,0.18)] transition-all duration-500 group-hover:border-esmeralda/15 group-hover:shadow-[0_25px_45px_-30px_rgba(24,68,52,0.24)]">
          <p className="text-sm leading-relaxed text-grafite/70">
            {feature.detail}
          </p>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-esmeralda/60">
            {feature.meta}
          </span>
          <motion.span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-[0_15px_30px_-25px_rgba(24,68,52,0.6)] transition-colors duration-300 ${tone.arrow}`}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17l7-7-7-7" />
            </svg>
          </motion.span>
        </div>
      </motion.article>
    );
  };

  return (
    <section className="relative overflow-hidden bg-marfim py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(24,68,52,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(207,154,36,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23184434' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center" delay={0.1}>
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-esmeralda/15 bg-white px-6 py-2 text-esmeralda shadow-[0_12px_30px_-20px_rgba(24,68,52,0.45)]"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em]">Por que Cícero Joias?</span>
          </motion.div>

          <h2 className="mt-8 font-playfair text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-esmeralda">
            Excelência em Cada
            <span className="block bg-gradient-to-r from-ouro via-ouro-light to-esmeralda-light bg-clip-text text-transparent">
              Detalhe
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg font-light leading-relaxed text-grafite/80">
            Aliamos tradição artesanal, tecnologia e atendimento consultivo para transformar cada criação em um símbolo exclusivo, feito com precisão e significado.
          </p>
        </AnimatedSection>

        <AnimatedSection
          className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,1fr] xl:grid-cols-[1.2fr,1fr,1fr] xl:items-stretch xl:gap-10"
          delay={0.18}
        >
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-esmeralda/10 bg-gradient-to-br from-white via-white to-marfim p-10 text-left shadow-[0_30px_60px_-30px_rgba(24,68,52,0.35)]"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-ouro/20 blur-[120px]" />
            <div className="absolute -bottom-16 left-1/3 h-44 w-44 rounded-full bg-esmeralda/15 blur-[140px]" />
            <div className="relative space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-esmeralda/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-esmeralda/80">
                {heroHighlight.eyebrow}
              </span>

              <div className="space-y-3">
                <h3 className="font-playfair text-3xl sm:text-4xl font-semibold leading-snug text-esmeralda">
                  {heroHighlight.title}
                </h3>
                <p className="bg-gradient-to-r from-esmeralda to-esmeralda-light bg-clip-text text-lg font-semibold uppercase tracking-[0.3em] text-transparent">
                  {heroHighlight.highlight}
                </p>
                <p className="text-base leading-relaxed text-grafite/80">
                  {heroHighlight.description}
                </p>
              </div>

              <ul className="space-y-4">
                {heroHighlight.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-grafite/75">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-esmeralda/10 text-esmeralda">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href={heroHighlight.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-esmeralda to-esmeralda-light px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-[0_18px_40px_-20px_rgba(24,68,52,0.42)]"
                whileHover={{ scale: 1.04, boxShadow: '0 24px 48px -20px rgba(24,68,52,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                {heroHighlight.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
          {topFeatures.map(renderFeatureCard)}
        </AnimatedSection>

        <AnimatedSection
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2"
          delay={0.32}
          stagger
        >
          {bottomFeatures.map(renderFeatureCard)}
        </AnimatedSection>
        <AnimatedSection className="mt-24 text-center" delay={0.5}>
          <motion.a
            href="https://wa.me/5583988073784?text=Olá! Quero falar com a equipe da Cícero Joias sobre um projeto personalizado."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-esmeralda to-esmeralda-light px-8 py-4 font-semibold uppercase tracking-[0.24em] text-white shadow-[0_20px_40px_-18px_rgba(24,68,52,0.4)] transition-all duration-300"
            whileHover={{ scale: 1.04, boxShadow: '0 26px 48px -18px rgba(24,68,52,0.45)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Agendar consultoria</span>
            <motion.span
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
              </svg>
            </motion.span>
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}
