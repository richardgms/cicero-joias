import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

import {
  AliancasIcon,
  BanhoOuroIcon,
  ConsertosIcon,
  JoiasSobMedidaIcon,
  OculosIcon,
  LimpezaIcon,
} from '@/components/icons';
import { PageVisibilityGuard } from '@/components/page-visibility-guard';
import { whatsappLinks } from '@/components/home/home-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

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
    description: 'Criamos anéis e pingentes personalizados que contam histórias e eternizam momentos, trabalhando em estreita colaboração com nossos clientes do início ao fim.',
    slug: 'joias-sob-medida',
  },
  {
    icon: OculosIcon,
    title: 'Lentes de Óculos',
    description: 'Trocamos lentes e oferecemos armações variadas, com foco em conforto visual, durabilidade e estilo, a partir da sua receita oftalmológica.',
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
        <Section
          id="hero"
          tone="dark"
          spacing="none"
          className="overflow-hidden pb-32 pt-16"
          aria-labelledby="servicos-title"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/assets/images/sobre-nos-hero.webp"
              alt=""
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/70 to-surface-dark/90" />
            <div className="absolute -right-8 -top-16 h-80 w-80 rounded-full bg-action-on-dark/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-8 h-72 w-72 rounded-full bg-action-primary/20 blur-3xl" />
          </div>

          <Container size="md" className="relative z-10">
            <SectionHeading
              as="h1"
              align="center"
              tone="dark"
              titleId="servicos-title"
              eyebrow={
                <Badge variant="dark" className="gap-2">
                  <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                  O que fazemos?
                </Badge>
              }
              title={
                <>
                  Nossos{' '}
                  <span className="block text-action-on-dark">Serviços</span>
                </>
              }
              description="Da criação de alianças personalizadas aos consertos mais complexos, oferecemos uma gama completa de serviços especializados com a qualidade e tradição que nos define há 40 anos."
            />
          </Container>
        </Section>

        <Section
          id="lista-servicos"
          tone="light"
          spacing="lg"
          className="z-10 -mt-16 rounded-t-3xl"
          aria-labelledby="lista-servicos-title"
        >
          <Container>
            <SectionHeading
              align="center"
              titleId="lista-servicos-title"
              title={
                <>
                  Como <span className="text-action-strong">podemos ajudar</span>
                </>
              }
              description="Cada serviço é executado com a mesma dedicação artesanal que nos acompanha desde 1985, combinando tradição familiar com técnicas modernas."
            />

            <div
              className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3"
              role="list"
              aria-label="Serviços da Cícero Joias"
            >
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <Card
                    key={service.slug}
                    variant="light"
                    interactive
                    className="group relative overflow-hidden hover:border-action-strong"
                    role="listitem"
                  >
                    <Icon
                      className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 text-action-strong/5 transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none"
                      aria-hidden="true"
                    />

                    <Link
                      href={'/servicos/' + service.slug}
                      className="relative z-10 flex h-full min-h-80 flex-col rounded-card p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 sm:p-8"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary transition-colors duration-200 group-hover:border-action-strong group-hover:bg-action-strong group-hover:text-text-on-dark">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>

                      <h3 className="mt-6 font-heading text-2xl font-medium leading-tight text-text-primary">
                        {service.title}
                      </h3>

                      <p className="mt-3 flex-grow font-sans text-sm leading-relaxed text-text-secondary">
                        {service.description}
                      </p>

                      <span className="mt-6 inline-flex w-fit items-center gap-2 border-b border-action-strong/30 pb-0.5 font-sans text-xs font-bold uppercase tracking-label text-action-strong transition-colors duration-300 group-hover:border-action-strong">
                        Saiba mais
                        <ArrowRight
                          className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>

        <Section
          id="contato"
          tone="dark"
          spacing="lg"
          className="overflow-hidden"
          aria-labelledby="servicos-contato-title"
        >
          <div className="absolute -right-8 -top-16 h-72 w-72 rounded-full bg-action-on-dark/10 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-8 h-72 w-72 rounded-full bg-action-primary/20 blur-3xl" aria-hidden="true" />

          <Container
            size="md"
            className="relative z-10 flex flex-col items-center text-center"
          >
            <SectionHeading
              align="center"
              tone="dark"
              titleId="servicos-contato-title"
              eyebrow={
                <Badge variant="dark" className="gap-2">
                  <Star className="h-3 w-3" aria-hidden="true" />
                  Fale conosco
                </Badge>
              }
              title={
                <>
                  Pronto para dar vida ao{' '}
                  <span className="text-action-on-dark">seu projeto?</span>
                </>
              }
              description="Entre em contato conosco para discutir seu projeto. Nossa equipe está pronta para transformar suas ideias em realidade com a qualidade e atenção aos detalhes que nos define."
            />

            <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center">
              <Button asChild variant="goldOnDark" size="lg">
                <a
                  href={whatsappLinks.primary}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              <Button asChild variant="outlineDark" size="lg">
                <Link href="/portfolio">Ver nosso portfólio</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </div>
    </PageVisibilityGuard>
  );
}