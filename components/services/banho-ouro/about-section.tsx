'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Crown, Check } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

const WHATSAPP_NUMBER = '5583991180251';
const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export function BanhoOuroAboutSection() {
  const serviceOptions = [
    {
      name: 'Banho Básico',
      icon: Star,
      highlight: 'Ideal para uso eventual',
      description: 'Ouro 18k de alta qualidade, perfeito para peças de uso esporádico ou decorativas.',
      features: [
        'Ouro 18 quilates',
        'Processo completo de galvanoplastia',
        'Brilho intenso',
        'Melhor custo-benefício',
      ],
      warranty: 'Sem garantia',
      theme: 'basic',
      popular: false,
    },
    {
      name: 'Banho Intermediário',
      icon: Shield,
      highlight: 'Equilíbrio ideal',
      description: 'Camadas reforçadas de ouro 18k para maior durabilidade no dia a dia.',
      features: [
        'Ouro 18 quilates',
        'Camadas extras de proteção',
        'Maior resistência ao desgaste',
        '6 meses de garantia',
      ],
      warranty: '6 meses de garantia',
      theme: 'intermediate',
      popular: true,
    },
    {
      name: 'Banho Avançado',
      icon: Crown,
      highlight: 'Máxima durabilidade',
      description: 'Processo premium com múltiplas camadas de ouro 18k e proteção antioxidante.',
      features: [
        'Ouro 18 quilates premium',
        'Múltiplas camadas reforçadas',
        'Proteção antioxidante superior',
        '1 ano de garantia completa',
      ],
      warranty: '1 ano de garantia',
      theme: 'advanced',
      popular: false,
    },
  ] as const;

  const optionThemes = {
    basic: {
      iconGradient: 'from-esmeralda-dark to-esmeralda',
      accentText: 'text-esmeralda',
      accentMuted: 'text-esmeralda/70',
      border: 'border-esmeralda/20',
      buttonHover: 'hover:bg-esmeralda/10 hover:text-esmeralda-dark',
    },
    intermediate: {
      iconGradient: 'from-ouro-dark to-ouro',
      accentText: 'text-ouro',
      accentMuted: 'text-ouro/85',
      border: 'border-ouro/25',
      buttonHover: 'hover:bg-ouro/15 hover:text-esmeralda-dark',
    },
    advanced: {
      iconGradient: 'from-esmeralda-dark to-ouro',
      accentText: 'text-ouro',
      accentMuted: 'text-ouro/85',
      border: 'border-ouro/25',
      buttonHover: 'hover:bg-ouro/15 hover:text-esmeralda-dark',
    },
  } as const;

  const applicableItems = [
    'Joias e semijoias',
    'Bijuterias',
    'Joias de prata',
    'Objetos decorativos metálicos',
    'Peças eletrônicas (para condutividade)',
    'Revitalização de peças com banho desgastado',
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-marfim to-marfim-light py-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(24,68,52,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(199,154,52,0.08),transparent_60%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center rounded-full border border-ouro/20 bg-ouro/5 px-4 py-1 text-xs font-jost font-semibold uppercase tracking-[0.3em] text-ouro">
            O que oferecemos
          </span>
          <h2 className="font-philosopher font-bold text-3xl sm:text-4xl lg:text-5xl text-esmeralda">
            Revitalize suas joias com <span className="text-ouro">ouro 18k</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg font-montserrat text-grafite/75">
            Transformamos e renovamos suas peças através de um processo profissional de galvanoplastia, com mais de 20 anos de experiência especializada.
          </p>
        </AnimatedSection>

        {/* Service Options Cards */}
        <AnimatedSection className="grid gap-6 md:grid-cols-3" delay={0.12} stagger>
          {serviceOptions.map((option, index) => {
            const theme = optionThemes[option.theme];
            const cardBorder = option.popular ? 'border-ouro/35' : theme.border;
            const cardBackground = option.popular
              ? 'bg-gradient-to-br from-white via-marfim to-ouro/10'
              : 'bg-gradient-to-br from-white to-marfim/60';

            return (
              <motion.div
                key={option.name}
                className={`relative flex h-full flex-col gap-6 rounded-3xl border ${cardBorder} ${cardBackground} p-6 shadow-[0_22px_48px_-34px_rgba(24,68,52,0.28)] transition-all duration-300 ${
                  option.popular ? 'ring-2 ring-ouro/40 ring-offset-2 ring-offset-marfim' : ''
                }`}
                whileHover={{ y: -8, boxShadow: '0 32px 70px -38px rgba(24,68,52,0.35)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
              {option.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-ouro px-4 py-1 text-xs font-jost font-bold uppercase tracking-[0.2em] text-esmeralda shadow-lg">
                    <Star className="h-3 w-3 fill-esmeralda" />
                    Mais escolhido
                  </span>
                </div>
              )}

              <div className="space-y-4">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.iconGradient} text-white shadow-lg`}>
                  <option.icon className="h-7 w-7" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-philosopher font-bold text-2xl text-esmeralda">
                    {option.name}
                  </h3>
                  <p className={`text-xs font-jost font-semibold uppercase tracking-[0.2em] ${theme.accentMuted}`}>
                    {option.highlight}
                  </p>
                  <p className="text-sm font-montserrat leading-relaxed text-grafite/75">
                    {option.description}
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {option.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 shrink-0 text-esmeralda mt-0.5" />
                    <span className="text-sm font-montserrat text-grafite/80">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-esmeralda/10 bg-marfim/60 p-4">
                <div className="flex items-center gap-2">
                  <Shield className={`h-5 w-5 ${theme.accentText}`} />
                  <span className={`text-sm font-semibold ${theme.accentText}`}>
                    {option.warranty}
                  </span>
                </div>
              </div>

              <motion.a
                href={createWhatsAppLink(`Olá! Gostaria de solicitar um orçamento para ${option.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full border ${theme.border} bg-white/90 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] ${theme.accentText} transition-colors ${theme.buttonHover}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar este
              </motion.a>
              </motion.div>
            );
          })}
        </AnimatedSection>

        {/* Applicable Items */}
        <AnimatedSection className="rounded-3xl border border-esmeralda/10 bg-white/95 p-8 sm:p-10 shadow-[0_20px_45px_-32px_rgba(24,68,52,0.2)]" delay={0.2}>
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h3 className="font-philosopher font-bold text-2xl sm:text-3xl text-esmeralda">
                O que pode receber banho de ouro?
              </h3>
              <p className="text-sm font-montserrat text-grafite/70">
                Trabalhamos com diversos tipos de peças metálicas
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {applicableItems.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-esmeralda/10 bg-gradient-to-r from-esmeralda/5 via-marfim/80 to-ouro/10 p-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ouro/10">
                    <Check className="h-5 w-5 text-ouro" />
                  </div>
                  <span className="text-sm font-montserrat font-medium text-esmeralda">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl border border-ouro/25 bg-ouro/12 p-6 text-center">
              <p className="text-sm font-montserrat text-grafite/80">
                <span className="font-semibold text-ouro">Importante:</span> Atualmente não realizamos banho em relógios. Para qualquer outra peça, envie uma foto pelo WhatsApp para avaliação prévia gratuita.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}


