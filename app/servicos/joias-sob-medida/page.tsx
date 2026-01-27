import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Construction } from 'lucide-react';
import { JoiasSobMedidaIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function JoiasSobMedidaPage() {
  return (
    <div className="min-h-screen bg-marfim">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#0b1f18] py-24 text-marfim">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/sobre-nos-hero.webp"
            alt="Joias Sob Medida"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04160f]/70 via-[#0b1f18]/60 to-[#0b1f18]/90" />
          <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-ouro/20 blur-[120px]" />
          <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-esmeralda-light/25 blur-[140px]" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 self-start text-sm text-marfim/70 transition-colors hover:text-marfim"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Serviços
          </Link>
          <div className="flex items-center justify-center">
            <JoiasSobMedidaIcon className="h-16 w-16 text-ouro" />
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Joias <span className="text-ouro">Sob Medida</span>
          </h1>
        </div>
      </section>

      {/* Under Construction Section */}
      <section id="em-breve" className="relative -mt-16 rounded-t-[48px] bg-marfim pb-24 pt-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-esmeralda/10 bg-white p-12 shadow-[0_25px_60px_-35px_rgba(24,68,52,0.25)]">
            <div className="flex flex-col items-center gap-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-100">
                <Construction className="h-12 w-12 text-amber-600" />
              </div>
              <div className="space-y-4">
                <h2 className="font-playfair text-3xl font-semibold text-esmeralda">
                  Página em Construção
                </h2>
                <p className="max-w-2xl text-base text-grafite/70">
                  Esta página ainda não está pronta. Estamos trabalhando para trazer todas as informações detalhadas sobre nosso serviço de joias sob medida.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-ouro text-esmeralda hover:bg-ouro-light">
                  <Link href="https://wa.me/5583991180251" target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-esmeralda text-esmeralda hover:bg-esmeralda/5">
                  <Link href="/servicos">
                    Ver Todos os Serviços
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}