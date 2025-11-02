'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Camera, Shield, Clock } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

const WHATSAPP_NUMBER = '5583991180251';
const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export function BanhoOuroFinalCTASection() {
  const benefits = [
    {
      icon: Camera,
      text: 'Orçamento gratuito por foto',
    },
    {
      icon: Shield,
      text: 'Garantia de até 1 ano',
    },
    {
      icon: Clock,
      text: 'Prazo médio 14 dias',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-marfim to-marfim-light py-12 text-center sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(24,68,52,0.06),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(199,154,52,0.08),transparent_60%)]" />

      <AnimatedSection
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-4 sm:px-6 lg:px-8"
        delay={0.1}
      >
        <span className="inline-flex items-center rounded-full border border-esmeralda/20 bg-esmeralda/5 px-4 py-1 text-xs font-jost font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
          Transforme suas joias
        </span>

        <h2 className="font-philosopher font-bold text-3xl sm:text-4xl lg:text-5xl text-esmeralda">
          Pronto para dar nova vida às suas <span className="text-ouro">joias</span>?
        </h2>

        <p className="max-w-2xl text-base font-montserrat text-grafite/75 sm:text-lg leading-relaxed">
          Envie uma foto da sua peça pelo WhatsApp e receba orçamento personalizado em até 24 horas. Mais de 20 anos de experiência garantindo qualidade e durabilidade excepcional.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.text}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-esmeralda/10 backdrop-blur-sm">
                <benefit.icon className="h-5 w-5 text-esmeralda" />
              </div>
              <span className="text-sm font-jost font-medium text-grafite/80">{benefit.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
          <motion.a
            href={createWhatsAppLink('Olá! Gostaria de solicitar um orçamento para banho de ouro. Vou enviar foto da minha peça.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-ouro px-8 py-4 text-sm font-jost font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)] transition-all hover:shadow-[0_30px_55px_-25px_rgba(207,154,36,0.6)] sm:w-auto"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle className="h-5 w-5" />
            Solicitar orçamento agora
          </motion.a>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-jost text-grafite/60">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-esmeralda/60" />
              Sem compromisso
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-esmeralda/60" />
              Resposta em até 24h
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-esmeralda/60" />
              Executado pelo mestre ourives
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-esmeralda/10 bg-esmeralda/5 p-6 backdrop-blur-sm">
          <p className="text-sm font-montserrat text-grafite/70">
            <span className="font-jost font-semibold text-esmeralda">Atenção:</span> Não realizamos banho em relógios. Para outros tipos de peças, a avaliação prévia é sempre necessária.
          </p>
        </div>
      </AnimatedSection>
    </section>
  );
}








