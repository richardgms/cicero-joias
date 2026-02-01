'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  AliancasIcon,
  BanhoOuroIcon,
  ConsertosIcon,
  JoiasSobMedidaIcon,
  OculosIcon,
  LimpezaIcon,
} from '@/components/icons';
import { PageVisibilityGuard } from '@/components/page-visibility-guard';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { whatsappLinks } from '@/components/home/home-data';

const services = [
  {
    icon: AliancasIcon,
    title: 'Alianças Personalizadas',
    description: 'Nossa principal especialidade é a criação de alianças exclusivas em ouro 16k, 18k e prata, cuidadosamente elaboradas para simbolizar compromissos duradouros.',
    slug: 'aliancas-personalizadas',
  },
  {
    icon: BanhoOuroIcon,
    title: 'Banho de Ouro Profissional',
    description: 'Oferecemos serviço especializado de banho de ouro, permitindo renovar peças antigas ou transformar itens especiais com acabamento dourado de alta qualidade.',
    slug: 'banho-de-ouro',
  },
  {
    icon: ConsertosIcon,
    title: 'Consertos Especializados',
    description: 'Nossa expertise técnica nos permite realizar consertos complexos em joias, relógios e óculos, devolvendo vida e funcionalidade a peças de valor.',
    slug: 'consertos',
  },
  {
    icon: JoiasSobMedidaIcon,
    title: 'Joias Sob Medida',
    description: 'Criamos joias personalizadas que contam histórias e eternizam momentos, trabalhando em estreita colaboração com nossos clientes do início ao fim.',
    slug: 'joias-sob-medida',
  },
  {
    icon: OculosIcon,
    title: 'Lentes de Óculos',
    description: 'Oferecemos lentes de alta qualidade, com foco em conforto visual, durabilidade e estilo. Trabalhamos com diversos tipos de lentes para atender suas necessidades.',
    slug: 'lentes-de-oculos',
  },
  {
    icon: LimpezaIcon,
    title: 'Limpeza de Joias',
    description: 'Serviço profissional de limpeza para joias em prata, ouro e folheado. Restauramos o brilho original de suas peças com processos especializados e seguros, devolvendo vida e beleza aos seus itens mais preciosos.',
    slug: 'limpeza-de-joias',
  },
];

export default function ServicosPage() {
  // Animation variants matching Home Page
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };

  return (
    <PageVisibilityGuard pageSlug="servicos">
      <div className="min-h-screen bg-surface-page">
        {/* Hero Section - Standardized with Glass/Dark aesthetic */}
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-esmeralda-dark via-esmeralda to-esmeralda-deep pt-16 pb-32 text-text-on-dark">
          {/* Background & Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/sobre-nos-hero.webp"
              alt="Nossos serviços"
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
            {/* Standardized Noise & Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-esmeralda-deep/80 via-esmeralda-deep/70 to-esmeralda-deep/90" />
            <div className="absolute inset-0 bg-[url('/assets/noise.webp')] opacity-[0.03] mix-blend-overlay" />

            {/* Decorative Blurs */}
            <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-action-strong/10 blur-[120px]" />
            <div className="absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-esmeralda-light/10 blur-[140px]" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 text-center sm:px-6 lg:px-8"
          >
            {/* Standardized Badge */}
            <motion.div variants={itemVariants} className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-lg">
              <Star className="w-3 h-3 text-ouro fill-ouro" />
              <span className="font-jost text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ouro/90">
                O que fazemos?
              </span>
            </motion.div>

            {/* Standardized Headlines */}
            <h1 className="font-philosopher font-bold leading-tight">
              <motion.span variants={itemVariants} className="block text-[clamp(40px,5vw+16px,64px)] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 filter drop-shadow-2xl">
                Nossos
              </motion.span>
              <motion.span variants={itemVariants} className="block text-[clamp(32px,4vw+12px,56px)] text-ouro/90 filter drop-shadow-lg">
                Serviços
              </motion.span>
            </h1>

            <motion.p variants={itemVariants} className="mx-auto max-w-3xl font-montserrat text-base md:text-lg text-white/75 leading-relaxed">
              Da criação de alianças personalizadas aos consertos mais complexos, oferecemos uma gama completa de serviços especializados com a qualidade e tradição que nos define há 40 anos.
            </motion.p>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="lista-servicos" className="relative -mt-16 rounded-t-[48px] bg-surface-page pb-24 pt-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="font-philosopher font-bold text-4xl text-text-primary mb-4">
                Como <span className="text-action-strong">podemos ajudar</span>
              </h2>
              <p className="mx-auto max-w-2xl font-montserrat text-base text-text-secondary/70 leading-relaxed">
                Cada serviço é executado com a mesma dedicação artesanal que nos acompanha desde 1985, combinando tradição familiar com técnicas modernas.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service) => (
                <motion.div key={service.slug} variants={itemVariants}>
                  <Link
                    href={`/servicos/${service.slug}`}
                    className="group relative flex h-full flex-col rounded-3xl border border-ouro/15 bg-surface-section p-8 shadow-card transition-all duration-500 hover:border-ouro/50 hover:shadow-card-hover hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Background Decorative Icon */}
                    <div className="absolute -right-8 -bottom-8 text-ouro/5 transition-all duration-700 group-hover:scale-110 group-hover:text-ouro/10 group-hover:-rotate-12 pointer-events-none">
                      <service.icon className="h-40 w-40" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-surface-page border border-ouro/20 text-text-primary transition-all duration-500 group-hover:bg-ouro group-hover:text-white group-hover:border-ouro shadow-sm">
                        <service.icon className="h-6 w-6" />
                      </div>

                      <h3 className="font-philosopher text-xl font-bold text-text-primary mb-3 group-hover:text-ouro transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="font-montserrat text-sm text-text-secondary/70 leading-relaxed flex-grow mb-6">
                        {service.description}
                      </p>

                      <div className="mt-auto">
                        <div className="inline-flex items-center gap-2 font-jost text-xs font-bold uppercase tracking-widest text-ouro border-b border-ouro/30 pb-0.5 group-hover:border-ouro transition-all duration-300">
                          <span>Saiba mais</span>
                          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Standardized Patterns */}
        <section id="contato" className="relative overflow-hidden bg-esmeralda-deep py-24 text-text-on-dark">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]" />
            <div className="absolute -right-12 top-0 h-48 w-48 rounded-full bg-action-strong/10 blur-[120px]" />
            <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-esmeralda-light/10 blur-[140px]" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 font-jost text-xs font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
                <Star className="w-3 h-3 text-ouro" />
                <span>Fale conosco</span>
              </div>

              <h2 className="font-philosopher font-bold text-[clamp(28px,4vw+10px,42px)] leading-tight">
                Pronto para dar vida ao <span className="text-ouro">seu projeto?</span>
              </h2>

              <p className="max-w-2xl font-montserrat text-base text-text-on-dark/80 leading-relaxed">
                Entre em contato conosco para discutir seu projeto. Nossa equipe está pronta para transformar suas ideias em realidade com a qualidade e atenção aos detalhes que nos define.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row items-center"
            >
              {/* Primary Button - Standard Gold CTA */}
              <motion.a
                href={whatsappLinks.primary}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="group rounded-full bg-action-strong text-text-on-brand shadow-button-primary transition-all duration-500 hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5 px-8 py-6 text-sm font-bold uppercase tracking-[0.2em]"
                >
                  <span className="flex items-center gap-2">
                    Falar no WhatsApp
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.a>

              {/* Secondary Button - Standard Outline */}
              <Link href="/portfolio">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="group relative rounded-full border-white/20 bg-white/[0.03] text-white/[0.8] backdrop-blur-sm shadow-none transition-all duration-500 hover:text-white hover:bg-white/[0.07] hover:border-ouro/30 hover:shadow-lg px-8 py-6 text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-ouro/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <span className="relative z-10">Ver nosso portfólio</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageVisibilityGuard>
  );
}