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

const storyColumns = [storyParagraphs.slice(0, 2), storyParagraphs.slice(2)];

export default function SobrePage() {
  return (
    <PageVisibilityGuard pageSlug="sobre">
      <div className="min-h-screen bg-marfim">
      <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#0b1f18] py-24 text-marfim">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/sobre-nos-hero.jpg"
            alt="Nossa história"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04160f]/70 via-[#0b1f18]/60 to-[#0b1f18]/90" />
          <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-ouro/20 blur-[120px]" />
          <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-esmeralda-light/25 blur-[140px]" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 text-center sm:px-6 lg:px-8">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-marfim/30 bg-white/10 px-4 py-1 font-jost text-xs font-semibold uppercase tracking-[0.3em] text-marfim/80">
            Tradição desde 1985
          </span>
          <h1 className="font-philosopher font-bold leading-none">
            <span className="block text-[clamp(40px,5vw+16px,64px)]">Nossa</span>
            <span className="block text-[clamp(32px,4vw+12px,56px)] text-ouro">História</span>
          </h1>
          <p className="mx-auto max-w-3xl font-montserrat text-[clamp(16px,2vw+8px,20px)] text-marfim/90">
            Mais de quatro décadas dedicadas à arte da joalheria, criando memórias preciosas e momentos inesquecíveis para famílias inteiras.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {legacyStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-marfim/10 bg-white/10 px-6 py-5 text-left backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <item.icon className="mb-3 h-6 w-6 text-ouro" />
                <p className="font-philosopher text-xl font-bold text-marfim">{item.value}</p>
                <p className="font-jost text-xs font-semibold uppercase tracking-wide text-marfim/60">{item.label}</p>
                <p className="mt-2 font-montserrat text-sm text-marfim/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative -mt-16 rounded-t-[48px] bg-marfim pb-24 pt-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-philosopher font-bold text-[clamp(32px,4vw+12px,48px)] text-esmeralda">
              40 Anos de <span className="text-ouro">Tradição</span>
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {storyColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-6 font-montserrat text-base text-grafite/80">
                {column.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-esmeralda/10 bg-white/95 p-8 shadow-[0_25px_60px_-35px_rgba(24,68,52,0.25)]">
            <div className="grid gap-8 md:grid-cols-3">
              {timeline.map((item, index) => (
                <div key={item.year} className="relative flex flex-col gap-4 text-left">
                  {index < timeline.length - 1 && (
                    <span className="absolute right-[-16px] top-8 hidden h-px w-8 bg-gradient-to-r from-esmeralda/40 to-transparent md:block" />
                  )}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-esmeralda/10 text-esmeralda">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="font-jost text-xs font-semibold uppercase tracking-wide text-esmeralda/80">{item.year}</span>
                  <h3 className="font-philosopher text-lg font-bold text-esmeralda">{item.title}</h3>
                  <p className="font-montserrat text-sm text-grafite/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#04160f] py-24 text-marfim">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -right-12 top-0 h-48 w-48 rounded-full bg-ouro/20 blur-[120px]" />
          <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-esmeralda-light/20 blur-[140px]" />
        </div>
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-marfim/20 bg-white/10 px-4 py-1 font-jost text-xs font-semibold uppercase tracking-[0.3em] text-marfim/70">
            Conecte-se conosco
          </span>
          <Quote className="h-8 w-8 text-ouro" />
          <h2 className="font-philosopher font-bold text-[clamp(28px,4vw+10px,42px)]">
            Cícero Joias: tradição que se renova a cada momento especial
          </h2>
          <p className="max-w-2xl font-montserrat text-sm text-marfim/75">
            Convidamos você a fazer parte da história da Cícero Joias. Visite nossas lojas, conheça nosso trabalho e descubra como podemos transformar seus momentos especiais em memórias eternas.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="font-montserrat bg-ouro text-esmeralda hover:bg-ouro-light">
              <Link href="/orcamento">Solicitar Orçamento</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-montserrat border-marfim text-marfim hover:bg-white/10">
              <Link href="https://wa.me/5583991180251" target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </PageVisibilityGuard>
  );
}
