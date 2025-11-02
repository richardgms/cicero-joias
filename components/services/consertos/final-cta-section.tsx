'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { MessageCircle, MapPin, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '5583991180251';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Ola! Quero agendar um conserto na Cicero Joias.')}`;

export function ConsertosFinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-esmeralda-dark via-esmeralda to-[#0b1f18] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(199,154,52,0.18),transparent_65%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 text-center text-marfim sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-ouro/25 bg-ouro/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-ouro/95">
            Pronto para revitalizar sua peca?
          </span>
          <h2 className="font-playfair text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Traga sua historia para a Cicero Joias e colocamos de volta em uso
          </h2>
          <p className="mx-auto max-w-2xl text-base text-marfim/80 sm:text-lg">
            Fale com nossa equipe pelo WhatsApp para um orcamento rapido ou visite a loja para uma avaliacao completa. Cuidamos de cada detalhe, do registro ao acabamento final.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.12} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group inline-flex items-center gap-2 rounded-full bg-ouro px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-20px_rgba(207,154,36,0.4)] transition-transform hover:scale-[1.02]"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>

          <a
            href="https://maps.app.goo.gl/3mH6jR2n4nDAvb7Q6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ouro/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-ouro/95 transition-colors hover:bg-ouro/10"
          >
            <MapPin className="h-4 w-4" /> Visitar a loja
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="grid gap-4 text-sm text-marfim/75 sm:grid-cols-2">
          <div className="flex items-center justify-center gap-2 sm:justify-end">
            <MessageCircle className="h-5 w-5 text-ouro" />
            <span>Atendimento personalizado e orcamento gratuito.</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <MapPin className="h-5 w-5 text-ouro" />
            <span>R. Maciel Pinheiro, 82 – Centro, Campina Grande – PB.</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
