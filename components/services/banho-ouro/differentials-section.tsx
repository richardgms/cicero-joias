'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Settings, 
  ShieldCheck, 
  Heart,
  Zap,
  Eye,
  Target
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

export function BanhoOuroDifferentialsSection() {
  const differentials = [
    {
      icon: Award,
      title: '20 Anos de Expertise',
      description: 'Mais de duas décadas especializados exclusivamente em galvanoplastia e banho de ouro profissional, dominando cada detalhe técnico do processo.',
      highlight: 'Experiência consolidada',
    },
    {
      icon: Users,
      title: 'Mestre Ourives Dedicado',
      description: 'Serviço executado pessoalmente por Cícero, fundador da joalheria, garantindo controle total de qualidade em cada peça.',
      highlight: 'Atenção do especialista',
    },
    {
      icon: Settings,
      title: 'Equipamento Profissional',
      description: 'Maquinário próprio e especializado com controle preciso de temperatura e eletrodeposição, garantindo resultado impecável.',
      highlight: 'Tecnologia dedicada',
    },
    {
      icon: ShieldCheck,
      title: 'Garantia de até 1 Ano',
      description: 'Oferecemos opções com garantia de 6 meses a 1 ano completo, demonstrando confiança total na qualidade do nosso trabalho.',
      highlight: 'Proteção garantida',
    },
    {
      icon: Heart,
      title: 'Cuidado Individualizado',
      description: 'Cada peça recebe análise e atenção personalizada, como se fosse única. Tratamos sua joia com o máximo de dedicação possível.',
      highlight: 'Atenção especial',
    },
    {
      icon: Zap,
      title: 'Processo Completo',
      description: 'Galvanoplastia profissional com múltiplas etapas: cobre para aderência, paládio antialérgico, ouro 18k e verniz protetor.',
      highlight: 'Qualidade técnica',
    },
    {
      icon: Eye,
      title: 'Avaliação Prévia Gratuita',
      description: 'Enviamos orçamento detalhado após análise de fotos pelo WhatsApp, sem compromisso. Transparência total desde o início.',
      highlight: 'Sem surpresas',
    },
    {
      icon: Target,
      title: 'Comprometimento com Excelência',
      description: 'Prezamos pela máxima qualidade em cada etapa para garantir sua satisfação completa e durabilidade superior do banho.',
      highlight: 'Resultado impecável',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#0b1f18] py-10 sm:py-16 text-marfim">
      {/* Preset Background Esmeralda - Ver docs/style-presets.md */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-ouro/30 bg-white/10 px-4 py-1 text-xs font-jost font-semibold uppercase tracking-[0.3em] text-ouro/90">
            <Award className="h-4 w-4" />
            Nossos diferenciais
          </span>
          <h2 className="font-philosopher font-bold text-3xl sm:text-4xl lg:text-5xl text-marfim">
            Por que escolher a <span className="text-ouro">Cícero Joias</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg font-montserrat text-marfim/85">
            Combinamos tradição artesanal, equipamentos profissionais e dedicação total para entregar um serviço de banho de ouro excepcional.
          </p>
        </AnimatedSection>

        {/* Differentials Grid */}
        <AnimatedSection className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" delay={0.12} stagger>
          {differentials.map((item, index) => (
            <motion.article
              key={item.title}
              className="group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg"
              whileHover={{
                y: -6,
                boxShadow: '0 28px 60px -25px rgba(207,154,36,0.12)',
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.15)',
                transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ouro/20 to-ouro/10 text-ouro shadow-[0_15px_30px_-18px_rgba(207,154,36,0.4)]">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center justify-center h-12 rounded-2xl bg-gradient-to-br from-ouro/20 to-ouro/10 px-3 text-[10px] font-jost font-bold uppercase tracking-[0.2em] text-ouro text-center leading-normal">
                  {item.highlight}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-philosopher font-semibold text-lg text-marfim leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm font-montserrat leading-relaxed text-marfim/80">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection className="text-center" delay={0.3}>
          <div className="rounded-3xl border border-ouro/30 bg-white/5 backdrop-blur-md p-8 shadow-lg">
            <div className="mx-auto max-w-2xl space-y-4">
              <h3 className="font-philosopher font-bold text-2xl sm:text-3xl text-marfim">
                Experiência que faz a diferença
              </h3>
              <p className="text-sm sm:text-base font-montserrat text-marfim/85 leading-relaxed">
                Cada joia que passa por nossas mãos recebe o mesmo cuidado e atenção que dedicamos às alianças personalizadas. Nossa especialização em metalurgia e acabamentos garante que sua peça volte com brilho intenso e durabilidade excepcional.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ouro/20">
                    <ShieldCheck className="h-5 w-5 text-ouro" />
                  </div>
                  <span className="text-sm font-jost font-medium text-marfim">Garantia oferecida</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ouro/20">
                    <Award className="h-5 w-5 text-ouro" />
                  </div>
                  <span className="text-sm font-jost font-medium text-marfim">Qualidade comprovada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ouro/20">
                    <Heart className="h-5 w-5 text-ouro" />
                  </div>
                  <span className="text-sm font-jost font-medium text-marfim">Cuidado artesanal</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}



