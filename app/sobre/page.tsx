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
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
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
    year: '2026',
    title: 'Consolidação em Santa Rita',
    description:
      'Reunimos toda a operação na oficina de Santa Rita, mantendo o mesmo padrão de cuidado e atendimento próximo de sempre.',
    icon: Heart,
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
  'Em 2026, escolhemos concentrar toda a nossa operação na sede de Santa Rita, reunindo equipe e atendimento em um só endereço. Hoje, com o nosso fundador ainda presente na oficina e o suporte da segunda geração da família, continuamos a desenvolver peças sob medida, restaurações com memória afetiva e serviços de manutenção que acompanham as famílias ao longo de toda a vida.',
];


export default function SobrePage() {
  return (
    <PageVisibilityGuard pageSlug="sobre">
      <div className="min-h-screen bg-surface-page">
        {/* Hero */}
        <Section
          id="hero"
          tone="dark"
          spacing="none"
          className="overflow-hidden pb-24 pt-10"
          aria-labelledby="sobre-hero-title"
        >
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <Image
              src="/assets/images/sobre-nos-hero.webp"
              alt=""
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/70 via-surface-dark/60 to-surface-dark/90" />
            <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-action-strong/20 blur-3xl" />
            <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-action-on-dark/10 blur-3xl" />
          </div>

          <Container size="md" className="relative z-10">
            <SectionHeading
              as="h1"
              align="center"
              tone="dark"
              titleId="sobre-hero-title"
              eyebrow={
                <Badge variant="dark">Tradição desde 1985</Badge>
              }
              title={
                <>
                  Nossa{' '}
                  <span className="block text-action-on-dark">História</span>
                </>
              }
              description="Mais de quatro décadas dedicadas à arte da joalheria, criando memórias preciosas e momentos inesquecíveis para famílias inteiras."
            />
          </Container>
        </Section>

        {/* Content Overlap Wrapper */}
        <Section id="nossa-historia" tone="light" spacing="none" className="relative z-10 -mt-16 rounded-t-3xl pb-24 pt-20">
          <Container className="flex flex-col gap-16">

            {/* Stats Grid - Glass Cards */}
            <div id="numeros" className="relative z-10 -mt-8 grid gap-6 sm:grid-cols-3">
              {legacyStats.map((item) => (
                <Card
                  key={item.label}
                  variant="light"
                  interactive
                  className="p-6 text-left backdrop-blur-md hover:border-action-strong"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-subtle text-action-strong">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="font-heading text-2xl font-bold text-text-primary mb-1">{item.value}</p>
                  <p className="font-sans text-xs font-semibold uppercase tracking-wide text-action-primary/70 mb-3">{item.label}</p>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>

            {/* Section Title */}
            <SectionHeading
              align="center"
              className="mx-auto w-full max-w-3xl"
              title={
                <>
                  40 Anos de <span className="text-action-strong">Tradição</span>
                </>
              }
              description="Uma jornada de paixão, dedicação e compromisso com a arte da joalheria"
            />

            {/* Featured Quote Block */}
            <Card variant="dark" className="relative overflow-hidden p-8 text-center md:p-12">
              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-action-strong/20 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-action-on-dark/10 blur-3xl" aria-hidden="true" />

              <div className="relative">
                <Quote className="mx-auto h-8 w-8 text-action-strong/80 mb-6" aria-hidden="true" />
                <blockquote className="font-heading text-xl md:text-2xl font-bold text-text-on-dark leading-relaxed mb-6">
                  &ldquo;Movido pela paixão pela arte da joalheria e pelo desejo de criar peças que{' '}
                  <span className="text-action-on-dark">eternizassem momentos especiais</span>&rdquo;
                </blockquote>
                <cite className="font-sans text-xs text-text-on-dark/70 not-italic uppercase tracking-widest">
                  — Mestre Joalheiro Cícero, Fundador
                </cite>
              </div>
            </Card>

            {/* Story Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Card: O Início - 1985 */}
              <Card variant="light" interactive className="p-6 hover:border-action-strong">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1 w-8 rounded-full bg-action-strong" />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-action-strong">
                    1985 — O Início
                  </span>
                </div>
                <p className="font-sans text-base text-text-secondary leading-relaxed">
                  {storyParagraphs[0]}
                </p>
              </Card>

              {/* Card: Crescimento */}
              <Card variant="light" interactive className="p-6 hover:border-action-primary">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1 w-8 rounded-full bg-action-primary" />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-action-primary">
                    Crescimento
                  </span>
                </div>
                <p className="font-sans text-base text-text-secondary leading-relaxed">
                  {storyParagraphs[1]}
                </p>
              </Card>

              {/* Card: Expansão - 2000 */}
              <Card variant="light" interactive className="p-6 hover:border-action-strong">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1 w-8 rounded-full bg-action-strong" />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-action-strong">
                    2000 — Expansão
                  </span>
                </div>
                <p className="font-sans text-base text-text-secondary leading-relaxed">
                  {storyParagraphs[2]}
                </p>
              </Card>

              {/* Card: Hoje - Destacado */}
              <Card
                variant="light"
                interactive
                className="border-action-strong/30 bg-gradient-to-br from-action-strong/10 to-transparent p-6 hover:border-action-strong"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1 w-8 rounded-full bg-action-strong" />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-action-strong">
                    Hoje — Legado Vivo
                  </span>
                </div>
                <p className="font-sans text-base text-text-secondary leading-relaxed">
                  {storyParagraphs[3]}
                </p>
              </Card>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 py-2">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-action-strong/30" />
              <span className="h-2 w-2 rounded-full bg-action-strong/40" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-action-strong/30" />
            </div>

            {/* Timeline - Glass Card Container */}
            <Card variant="light" className="p-8 backdrop-blur-sm">
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                {timeline.map((item, index) => (
                  <div key={item.year} className="relative flex flex-col gap-4 text-left group">
                    {index < timeline.length - 1 && (
                      <span className="absolute right-[-24px] top-6 hidden h-px w-12 bg-gradient-to-r from-action-primary/20 to-transparent lg:block" />
                    )}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-subtle text-action-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-action-strong/10 group-hover:text-action-strong">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="font-sans text-sm font-bold uppercase tracking-widest text-action-strong">{item.year}</span>
                    <h3 className="font-heading text-xl font-bold text-text-primary">{item.title}</h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section id="contato" tone="dark" spacing="lg" className="overflow-hidden" aria-labelledby="sobre-cta-title">
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
            <div className="absolute -right-12 top-0 h-48 w-48 rounded-full bg-action-strong/20 blur-3xl" />
            <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-action-on-dark/10 blur-3xl" />
          </div>

          <Container size="md" className="relative flex flex-col items-center gap-8 text-center">
            <Badge variant="dark">Conecte-se conosco</Badge>
            <Quote className="h-8 w-8 text-action-strong/80" aria-hidden="true" />
            <h2
              id="sobre-cta-title"
              className="font-heading font-bold text-[clamp(28px,4vw+10px,42px)] text-text-on-dark"
            >
              Cícero Joias: tradição que se renova a cada momento especial
            </h2>
            <p className="max-w-2xl font-sans text-sm text-text-on-dark/75 leading-relaxed">
              Convidamos você a fazer parte da história da Cícero Joias. Visite nossa loja, conheça nosso trabalho e descubra como podemos transformar seus momentos especiais em memórias eternas.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="goldOnDark" size="lg">
                <Link href="/servicos">Nossos Serviços</Link>
              </Button>
              <Button asChild variant="outlineDark" size="lg">
                <Link href="https://wa.me/5583991180251" target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      </div>
    </PageVisibilityGuard>
  );
}
