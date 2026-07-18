import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';

const whatsappMessage =
  'Olá! Quero solicitar um orçamento com a Cícero Joias.';

export function HeroSection() {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-surface-dark text-text-on-dark"
      aria-labelledby="home-hero-title"
    >
      <Image
        src="/assets/images/home-hero.webp"
        alt="Oficina e joias da Cícero Joias"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 bg-surface-dark/65"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/55 to-surface-dark/95"
        aria-hidden="true"
      />

      <Container
        size="lg"
        className="relative z-10 flex flex-col items-center py-10 text-center sm:py-12 lg:py-16"
      >
        <Badge variant="dark" className="gap-2">
          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
          Excelência artesanal
        </Badge>

        <h1
          id="home-hero-title"
          className="mt-5 font-heading text-6xl font-medium leading-none sm:text-7xl lg:text-8xl"
        >
          <span className="block text-text-on-dark">Desde 1985</span>{' '}
          <span className="mt-1 block italic text-action-on-dark">
            criando legado
          </span>
        </h1>

        <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-text-on-dark/75 sm:text-lg">
          Oficina própria, ourives especializados e atendimento exclusivo.
          Transformamos metais e pedras preciosas em{' '}
          <span className="font-medium text-text-on-dark">emoções eternas</span>.
        </p>

        <div className="mt-8 flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="goldOnDark" size="lg" className="sm:flex-1">
            <WhatsAppLink message={whatsappMessage}>
              Solicitar orçamento
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </WhatsAppLink>
          </Button>

          <Button asChild variant="outlineDark" size="lg" className="sm:flex-1">
            <Link href="#servicos">Nossos serviços</Link>
          </Button>
        </div>

        <Button
          asChild
          variant="ghostDark"
          size="icon"
          className="mt-8 rounded-full"
        >
          <Link href="#confianca" aria-label="Rolar para os indicadores de confiança">
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
