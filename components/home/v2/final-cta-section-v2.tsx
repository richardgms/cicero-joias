'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { contactInfo, whatsappLinksV2 } from './home-data-v2';

export function FinalCTASectionV2() {
  return (
    <section className="relative overflow-hidden bg-esmeralda-deep py-16 text-text-on-dark sm:py-20 md:py-24">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(207,154,36,0.18),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(42,106,82,0.25),transparent_50%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Left: heading + WhatsApp CTA */}
        <AnimatedSection className="flex flex-col gap-8 lg:col-span-7" delay={0.05}>
          <div>
            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-ouro/85 sm:text-xs">
              Vamos conversar
            </p>
            <h2 className="font-philosopher mt-4 text-[clamp(34px,5vw,64px)] font-bold leading-[1.02] text-text-on-dark">
              Sua próxima joia <span className="italic text-ouro">começa numa mensagem.</span>
            </h2>
          </div>

          <p className="font-montserrat max-w-xl text-base leading-relaxed text-text-on-dark/80 sm:text-lg">
            Manda foto, descreve a ideia ou pergunta o que precisar. A gente
            responde em horário comercial — sempre quem está na bancada, nunca um robô.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.a
              href={whatsappLinksV2.primary}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="group gap-3 rounded-full bg-action-strong px-8 py-6 font-jost text-xs font-bold uppercase tracking-[0.22em] text-text-on-brand shadow-button-primary transition-all duration-500 hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5 sm:text-sm">
                <MessageCircle className="h-4 w-4" />
                <span>Falar no WhatsApp</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </motion.a>
            <a
              href={contactInfo.phoneHref}
              className="group inline-flex items-center gap-2 font-jost text-xs font-bold uppercase tracking-widest text-ouro/85 hover:text-ouro"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="border-b border-ouro/30 pb-0.5 transition-colors duration-300 group-hover:border-ouro">
                {contactInfo.phone}
              </span>
            </a>
          </div>
        </AnimatedSection>

        {/* Right: address + hours card */}
        <AnimatedSection
          className="lg:col-span-5"
          delay={0.15}
          direction="right"
        >
          <div className="relative h-full rounded-3xl border border-ouro/20 bg-white/[0.04] p-7 backdrop-blur-md sm:p-8">
            <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-ouro/15 blur-3xl" />

            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-ouro/85 sm:text-xs">
              Visite a oficina
            </p>

            <div className="mt-6 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-ouro/40 bg-ouro/10 text-ouro">
                  <MapPin className="h-4 w-4" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.18em] text-text-on-dark/60">
                    Endereço
                  </p>
                  <p className="font-philosopher mt-1 text-base font-bold text-text-on-dark sm:text-lg">
                    {contactInfo.address}
                  </p>
                  <a
                    href={contactInfo.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-2 inline-flex items-center gap-2 font-jost text-[11px] font-bold uppercase tracking-widest text-ouro hover:text-ouro/85"
                  >
                    <span className="border-b border-ouro/30 pb-0.5 transition-colors duration-300 group-hover:border-ouro">
                      Abrir no mapa
                    </span>
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-ouro/40 bg-ouro/10 text-ouro">
                  <Clock className="h-4 w-4" strokeWidth={1.6} />
                </div>
                <div className="space-y-2">
                  <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.18em] text-text-on-dark/60">
                    Horário de atendimento
                  </p>
                  {contactInfo.hours.map((slot) => (
                    <div key={slot.days} className="flex items-baseline justify-between gap-6">
                      <p className="font-montserrat text-sm text-text-on-dark/85">
                        {slot.days}
                      </p>
                      <p className="font-philosopher text-sm font-bold text-ouro">
                        {slot.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
