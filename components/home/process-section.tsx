'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, Palette, Hammer, Gem, CheckCircle, Sparkles } from 'lucide-react';
import { AnimatedSection, GlassCard, GoldenParticles } from '@/components/ui/animated-section';

const processSteps = [
  {
    icon: Lightbulb,
    title: "Consultoria",
    description: "Escutamos seus desejos e transformamos ideias em conceitos únicos",
    step: "01"
  },
  {
    icon: Palette,
    title: "Design",
    description: "Criamos esboços detalhados com materiais e especificações técnicas",
    step: "02"
  },
  {
    icon: Hammer,
    title: "Artesanato",
    description: "Nossos mestres ourives dão vida à sua joia com técnicas tradicionais",
    step: "03"
  },
  {
    icon: Gem,
    title: "Lapidação",
    description: "Selecionamos e preparamos as gemas com precisão milimétrica",
    step: "04"
  },
  {
    icon: CheckCircle,
    title: "Entrega",
    description: "Sua joia passa por controle de qualidade antes da entrega especial",
    step: "05"
  }
];

export function ProcessSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-br from-esmeralda via-esmeralda-light to-esmeralda-dark relative overflow-hidden">
      {/* Golden Particles Background */}
      <GoldenParticles count={25} />
      
      {/* Geometric Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-ouro rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-ouro/60 transform rotate-45" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-ouro/20 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20" delay={0.2}>
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-ouro/20 to-yellow-400/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-ouro/30"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-ouro animate-pulse" />
            <span className="text-sm font-medium text-marfim">
              Nosso Processo Artesanal
            </span>
          </motion.div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-marfim mb-4 md:mb-6 px-4 sm:px-0">
            Da Ideia à
            <span className="block bg-gradient-to-r from-ouro via-yellow-400 to-ouro bg-clip-text text-transparent">
              Obra de Arte
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-marfim-dark max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Cada joia da Cícero Joias passa por um processo cuidadoso que combina tradição artesanal 
            com precisão técnica para garantir peças excepcionais.
          </p>
        </AnimatedSection>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ouro/40 to-transparent transform -translate-y-1/2" />
          
          <AnimatedSection 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-4 px-4 sm:px-0"
            stagger={true}
            delay={0.4}
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Number */}
                <div className="text-center mb-6">
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-ouro to-yellow-400 text-esmeralda font-bold text-lg mb-4 shadow-2xl shadow-ouro/30 group-hover:shadow-3xl group-hover:shadow-ouro/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.step}
                  </motion.div>
                </div>

                {/* Card */}
                <GlassCard 
                  className="p-4 sm:p-6 text-center bg-gradient-to-br from-marfim/10 to-marfim/5 backdrop-blur-md h-full"
                  hover={true}
                >
                  {/* Icon */}
                  <motion.div 
                    className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-esmeralda-light to-esmeralda flex items-center justify-center group-hover:from-ouro group-hover:to-yellow-400 transition-all duration-500"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <step.icon className="w-6 h-6 text-marfim" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-playfair text-xl font-bold text-marfim mb-3 group-hover:text-ouro transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-marfim-dark leading-relaxed text-sm">
                    {step.description}
                  </p>
                </GlassCard>

                {/* Connection Dot for Desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-4 bg-ouro rounded-full transform -translate-y-1/2 z-10 shadow-lg shadow-ouro/50" />
                )}
              </motion.div>
            ))}
          </AnimatedSection>
        </div>

        {/* CTA Section */}
        <AnimatedSection className="text-center mt-20" delay={0.8}>
          <GlassCard className="inline-block p-8 bg-gradient-to-r from-marfim/10 to-marfim/5 backdrop-blur-md">
            <h3 className="font-playfair text-2xl font-bold text-marfim mb-4">
              Pronto para iniciar sua jornada?
            </h3>
            <p className="text-marfim-dark mb-6 max-w-md mx-auto">
              Agende uma consultoria gratuita e descubra como podemos criar a joia perfeita para você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-ouro to-yellow-400 text-esmeralda px-8 py-3 rounded-full font-semibold shadow-xl shadow-ouro/30 hover:shadow-2xl hover:shadow-ouro/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Agendar Consultoria
              </motion.button>
              
              <motion.button
                className="border-2 border-ouro text-ouro px-8 py-3 rounded-full font-semibold backdrop-blur-md hover:bg-ouro hover:text-esmeralda transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Galeria
              </motion.button>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
} 