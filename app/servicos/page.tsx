'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AliancasIcon,
  BanhoOuroIcon,
  ConsertosIcon,
  JoiasSobMedidaIcon,
  OculosIcon,
  LimpezaIcon,
} from '@/components/icons';
import { PageVisibilityGuard } from '@/components/page-visibility-guard';
import { ArrowRight } from 'lucide-react';

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
  return (
    <PageVisibilityGuard pageSlug="servicos">
      <div className="min-h-screen bg-surface-page">
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-esmeralda-deep pt-10 pb-24 text-text-on-dark">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/sobre-nos-hero.webp"
              alt="Nossos serviços"
              fill
              className="object-cover opacity-20"
              priority
            />
            {/* Overlay aprimorado para legibilidade e tom correto */}
            <div className="absolute inset-0 bg-gradient-to-b from-esmeralda-deep/70 via-esmeralda-deep/60 to-esmeralda-deep/90" />
            <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-action-strong/20 blur-[120px]" />
            <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-esmeralda-light/10 blur-[140px]" />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 text-center sm:px-6 lg:px-8">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-text-on-dark/30 bg-white/10 px-4 py-1 font-jost text-xs font-semibold uppercase tracking-[0.3em] text-text-on-dark/80">
              O que fazemos?
            </span>
            <h1 className="font-philosopher font-bold leading-none">
              <span className="block text-[clamp(40px,5vw+16px,64px)]">Nossos</span>
              <span className="block text-[clamp(32px,4vw+12px,56px)] text-action-strong">Serviços</span>
            </h1>
            <p className="mx-auto max-w-3xl font-montserrat text-lg text-text-on-dark/90 leading-relaxed">
              Da criação de alianças personalizadas aos consertos mais complexos, oferecemos uma gama completa de serviços especializados com a qualidade e tradição que nos define há 40 anos.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="lista-servicos" className="relative -mt-16 rounded-t-[48px] bg-surface-page pb-24 pt-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-philosopher font-bold text-4xl text-text-primary mb-4">
                Como <span className="text-action-strong">podemos ajudar</span>
              </h2>
              <p className="mx-auto max-w-2xl font-montserrat text-base text-text-secondary/70 leading-relaxed">
                Cada serviço é executado com a mesma dedicação artesanal que nos acompanha desde 1985, combinando tradição familiar com técnicas modernas.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicos/${service.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-white/60 bg-surface-card p-8 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover hover:bg-white hover:border-action-primary/20"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-action-primary/5 text-action-primary transition-all duration-300 group-hover:bg-action-strong/10 group-hover:text-action-strong group-hover:scale-110">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-philosopher text-xl font-bold text-text-primary mb-4 group-hover:text-action-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-montserrat text-sm text-text-secondary/70 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center font-jost text-sm font-semibold text-action-strong group-hover:text-action-primary transition-colors uppercase tracking-widest">
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contato" className="relative overflow-hidden bg-esmeralda-deep py-24 text-text-on-dark">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -right-12 top-0 h-48 w-48 rounded-full bg-action-strong/20 blur-[120px]" />
            <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-esmeralda-light/20 blur-[140px]" />
          </div>
          {/* Suave gradiente de transição do topo para blend com conteúdo anterior */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface-page/5 to-transparent opacity-10" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-text-on-dark/20 bg-white/5 px-4 py-1 font-jost text-xs font-semibold uppercase tracking-[0.3em] text-text-on-dark/70">
              Fale conosco
            </span>
            <h2 className="font-philosopher font-bold text-[clamp(28px,4vw+10px,42px)]">
              Pronto para dar vida ao seu projeto?
            </h2>
            <p className="max-w-2xl font-montserrat text-sm text-text-on-dark/75 leading-relaxed">
              Entre em contato conosco para discutir seu projeto. Nossa equipe está pronta para transformar suas ideias em realidade com a qualidade e atenção aos detalhes que nos define.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://wa.me/5583991180251"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-action-strong px-8 py-3 font-jost text-sm font-bold uppercase tracking-[0.2em] text-text-on-brand shadow-button-primary transition-all duration-300 hover:bg-action-strong-hover hover:scale-105 hover:-translate-y-1"
              >
                Falar no WhatsApp
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full border border-text-on-dark/30 hover:border-text-on-dark/60 px-8 py-3 font-jost text-sm font-bold uppercase tracking-[0.2em] text-text-on-dark transition-all duration-300 hover:bg-white/5"
              >
                Ver nosso portfólio
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageVisibilityGuard>
  );
}