'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  Shield,
  Gem,
  Users,
  Clock,
  Award,
  Star,
  RotateCw,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageVisibilityGuard } from '@/components/page-visibility-guard';

const legacyStats = [
  {
    value: '40+ anos',
    label: 'de história',
    description:
      'Fundados em 1985, seguimos como referência em atendimento artesanal em João Pessoa e região.',
    icon: Award,
  },
  {
    value: '2 gerações',
    label: 'da família',
    description:
      'O legado do mestre Cícero continua vivo com a participação ativa da segunda geração.',
    icon: Users,
  },
  {
    value: 'Atelier próprio',
    label: 'com acompanhamento',
    description:
      'Todo o processo acontece dentro da nossa joalheria, com o ourives respondendo diretamente aos clientes.',
    icon: Shield,
  },
];

const timeline = [
  {
    year: '1985',
    title: 'Primeira oficina',
    description:
      'O mestre joalheiro Cícero inaugura a primeira oficina em Santa Rita com foco em consertos e restaurações.',
    icon: Star,
  },
  {
    year: '2000',
    title: 'Segunda loja em João Pessoa',
    description:
      'A confiança dos clientes permite a expansão para a capital, atendendo casais e famílias de toda a região.',
    icon: Gem,
  },
  {
    year: 'Hoje',
    title: 'Tradição que se renova',
    description:
      'A segunda geração assume o atendimento mantendo o padrão artesanal e trazendo novas possibilidades aos projetos.',
    icon: RotateCw,
  },
];

const storyParagraphs = [
  'A história da Cícero Joias começou em 1985, quando o mestre joalheiro Cícero fundou sua primeira oficina em Santa Rita, Paraíba. Movido pela paixão pela arte da joalheria e pelo desejo de criar peças que eternizassem momentos especiais, Cícero iniciou um legado que hoje completa 40 anos de tradição e excelência.',
  'O que começou como uma pequena oficina especializada em consertos de joias e relógios, rapidamente ganhou reconhecimento pela qualidade excepcional do trabalho e pelo atendimento personalizado. A confiança dos clientes permitiu que o negócio crescesse organicamente, sempre mantendo os valores de honestidade, qualidade e dedicação que caracterizam a Cícero Joias até hoje.',
  'Em meados de 2000, expandimos nossa presença com a abertura da segunda loja em João Pessoa, ampliando nosso alcance e permitindo atender um número maior de clientes na região. Ao longo das décadas, enfrentamos desafios e celebramos conquistas, sempre confiantes de que nosso trabalho fala por si mesmo.',
  'Hoje, com o nosso fundador ainda presente na oficina e o suporte da segunda geração da família, continuamos a desenvolver peças sob medida, restaurações com memória afetiva e serviços de manutenção que acompanham as famílias ao longo de toda a vida.',
];


export default function SobrePage() {
  return (
    <PageVisibilityGuard pageSlug="sobre">
      <div className="min-h-screen bg-surface-page">
        {/* Sister Page Hero Pattern */}
        <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-esmeralda-deep pt-10 pb-24 text-text-on-dark">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/sobre-nos-hero.jpg"
              alt="Nossa história"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-esmeralda-deep/70 via-esmeralda-deep/60 to-esmeralda-deep/90" />
            <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-action-strong/20 blur-[120px]" />
            <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-esmeralda-light/10 blur-[140px]" />
          </div>

          <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 text-center sm:px-6 lg:px-8">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-text-on-dark/30 bg-white/10 px-4 py-1 font-jost text-xs font-semibold uppercase tracking-[0.3em] text-text-on-dark/80">
              Tradição desde 1985
            </span>
            <h1 className="font-philosopher font-bold leading-none">
              <span className="block text-[clamp(40px,5vw+16px,64px)]">Nossa</span>
              <span className="block text-[clamp(32px,4vw+12px,56px)] text-action-strong">História</span>
            </h1>
            <p className="mx-auto max-w-3xl font-montserrat text-lg text-text-on-dark/90 leading-relaxed">
              Mais de quatro décadas dedicadas à arte da joalheria, criando memórias preciosas e momentos inesquecíveis para famílias inteiras.
            </p>
          </div>
        </section>

        {/* Content Overlap Wrapper */}
        <section className="relative -mt-16 rounded-t-[48px] bg-surface-page pb-24 pt-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">

            {/* Stats Grid - Glass Cards */}
            <div className="grid gap-6 sm:grid-cols-3 -mt-8 relative z-10">
              {legacyStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/60 bg-surface-card p-6 text-left shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover hover:border-action-primary/20 hover:bg-white"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-action-primary/5 text-action-strong">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="font-philosopher text-2xl font-bold text-text-primary mb-1">{item.value}</p>
                  <p className="font-jost text-xs font-semibold uppercase tracking-wide text-action-primary/70 mb-3">{item.label}</p>
                  <p className="font-montserrat text-sm text-text-secondary/80 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Section Title */}
            <div className="text-center w-full max-w-3xl mx-auto">
              <h2 className="font-philosopher font-bold text-4xl text-text-primary mb-4">
                40 Anos de <span className="text-action-strong">Tradição</span>
              </h2>
              <p className="font-montserrat text-sm text-text-secondary/60">
                Uma jornada de paixão, dedicação e compromisso com a arte da joalheria
              </p>
            </div>

            {/* Featured Quote Block */}
            <div className="relative rounded-3xl bg-gradient-to-br from-esmeralda-deep via-esmeralda-dark to-esmeralda p-8 md:p-12 text-center overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-action-strong/20 blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-esmeralda-light/20 blur-[80px]" />

              <div className="relative">
                <Quote className="mx-auto h-8 w-8 text-action-strong/80 mb-6" />
                <blockquote className="font-philosopher text-xl md:text-2xl font-bold text-text-on-dark leading-relaxed mb-6">
                  "Movido pela paixão pela arte da joalheria e pelo desejo de criar peças que{' '}
                  <span className="text-action-strong">eternizassem momentos especiais</span>"
                </blockquote>
                <cite className="font-jost text-xs text-text-on-dark/70 not-italic uppercase tracking-widest">
                  — Mestre Joalheiro Cícero, Fundador
                </cite>
              </div>
            </div>

            {/* Story Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Card: O Início - 1985 */}
              <div className="group rounded-3xl border border-white/60 bg-surface-card p-6 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:bg-white hover:border-action-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1 w-8 rounded-full bg-action-strong" />
                  <span className="font-jost text-xs font-bold uppercase tracking-widest text-action-strong">
                    1985 — O Início
                  </span>
                </div>
                <p className="font-montserrat text-base text-text-secondary/80 leading-relaxed">
                  {storyParagraphs[0]}
                </p>
              </div>

              {/* Card: Crescimento */}
              <div className="group rounded-3xl border border-white/60 bg-surface-card p-6 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:bg-white hover:border-action-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1 w-8 rounded-full bg-action-primary" />
                  <span className="font-jost text-xs font-bold uppercase tracking-widest text-action-primary">
                    Crescimento
                  </span>
                </div>
                <p className="font-montserrat text-base text-text-secondary/80 leading-relaxed">
                  {storyParagraphs[1]}
                </p>
              </div>

              {/* Card: Expansão - 2000 */}
              <div className="group rounded-3xl border border-white/60 bg-surface-card p-6 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:bg-white hover:border-action-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1 w-8 rounded-full bg-action-strong" />
                  <span className="font-jost text-xs font-bold uppercase tracking-widest text-action-strong">
                    2000 — Expansão
                  </span>
                </div>
                <p className="font-montserrat text-base text-text-secondary/80 leading-relaxed">
                  {storyParagraphs[2]}
                </p>
              </div>

              {/* Card: Hoje - Destacado */}
              <div className="group rounded-3xl border border-action-strong/30 bg-gradient-to-br from-action-strong/10 to-transparent p-6 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1 w-8 rounded-full bg-action-strong" />
                  <span className="font-jost text-xs font-bold uppercase tracking-widest text-action-strong">
                    Hoje — Legado Vivo
                  </span>
                </div>
                <p className="font-montserrat text-base text-text-secondary/80 leading-relaxed">
                  {storyParagraphs[3]}
                </p>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 py-2">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-action-strong/30" />
              <span className="h-2 w-2 rounded-full bg-action-strong/40" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-action-strong/30" />
            </div>

            {/* Timeline - Glass Card Container */}
            <div className="rounded-3xl border border-white/60 bg-surface-card p-8 shadow-card backdrop-blur-sm">
              <div className="grid gap-12 md:grid-cols-3">
                {timeline.map((item, index) => (
                  <div key={item.year} className="relative flex flex-col gap-4 text-left group">
                    {index < timeline.length - 1 && (
                      <span className="absolute right-[-24px] top-6 hidden h-px w-12 bg-gradient-to-r from-action-primary/20 to-transparent md:block" />
                    )}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-action-primary/5 text-action-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-action-strong/10 group-hover:text-action-strong">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="font-jost text-sm font-bold uppercase tracking-widest text-action-strong">{item.year}</span>
                    <h3 className="font-philosopher text-xl font-bold text-text-primary">{item.title}</h3>
                    <p className="font-montserrat text-sm text-text-secondary/80 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-esmeralda-deep py-24 text-text-on-dark">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -right-12 top-0 h-48 w-48 rounded-full bg-action-strong/20 blur-[120px]" />
            <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-esmeralda-light/20 blur-[140px]" />
          </div>
          {/* Blend Gradient */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface-page/5 to-transparent opacity-10" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-text-on-dark/20 bg-white/5 px-4 py-1 font-jost text-xs font-semibold uppercase tracking-[0.3em] text-text-on-dark/70">
              Conecte-se conosco
            </span>
            <Quote className="h-8 w-8 text-action-strong/80" />
            <h2 className="font-philosopher font-bold text-[clamp(28px,4vw+10px,42px)]">
              Cícero Joias: tradição que se renova a cada momento especial
            </h2>
            <p className="max-w-2xl font-montserrat text-sm text-text-on-dark/75 leading-relaxed">
              Convidamos você a fazer parte da história da Cícero Joias. Visite nossas lojas, conheça nosso trabalho e descubra como podemos transformar seus momentos especiais em memórias eternas.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/servicos"
                className="inline-flex items-center justify-center rounded-full bg-action-strong px-8 py-3 font-jost text-sm font-bold uppercase tracking-[0.2em] text-text-on-brand shadow-button-primary transition-all duration-300 hover:bg-action-strong-hover hover:scale-105 hover:-translate-y-1"
              >
                Nossos Serviços
              </Link>
              <Link
                href="https://wa.me/5583991180251"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-text-on-dark/30 hover:border-text-on-dark/60 px-8 py-3 font-jost text-sm font-bold uppercase tracking-[0.2em] text-text-on-dark transition-all duration-300 hover:bg-white/5"
              >
                Falar no WhatsApp
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageVisibilityGuard>
  );
}
