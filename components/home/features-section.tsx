'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gem, Sparkles, Heart, Award, Clock, Shield } from 'lucide-react';
import { AnimatedSection, GlassCard } from '@/components/ui/animated-section';

const features = [
  {
    icon: Gem,
    title: "Joias Personalizadas",
    description: "Criamos peças únicas que contam sua história, com design exclusivo e acabamento impecável.",
    gradient: "from-ouro/20 to-yellow-400/20"
  },
  {
    icon: Heart,
    title: "Alianças de Casamento",
    description: "Simbolize seu amor eterno com alianças feitas sob medida, com gravações personalizadas.",
    gradient: "from-esmeralda/20 to-esmeralda-light/20"
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Utilizamos apenas metais nobres e gemas selecionadas, garantindo durabilidade e beleza.",
    gradient: "from-ouro/20 to-yellow-400/20"
  },
  {
    icon: Clock,
    title: "Tradição Familiar",
    description: "Mais de 40 anos de tradição em ourivesaria, passando técnicas de geração em geração.",
    gradient: "from-esmeralda/20 to-esmeralda-light/20"
  },
  {
    icon: Shield,
    title: "Garantia Vitalícia",
    description: "Todas as nossas peças têm garantia vitalícia contra defeitos de fabricação.",
    gradient: "from-ouro/20 to-yellow-400/20"
  },
  {
    icon: Sparkles,
    title: "Atendimento Exclusivo",
    description: "Consultoria personalizada para escolher a joia perfeita para cada momento especial.",
    gradient: "from-esmeralda/20 to-esmeralda-light/20"
  }
];

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-br from-marfim via-marfim to-marfim-light relative overflow-hidden">
      {/* Background Pattern com shine decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23184434' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm30 0c0 16.569-13.431 30-30 30V0c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Shine elements decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 opacity-30">
          <Image
            src="/assets/brand/shine.png"
            alt=""
            width={20}
            height={20}
            className="animate-pulse"
          />
        </div>
        <div className="absolute top-32 right-32 opacity-40">
          <Image
            src="/assets/brand/shine.png"
            alt=""
            width={16}
            height={16}
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>
        <div className="absolute bottom-24 left-1/3 opacity-35">
          <Image
            src="/assets/brand/shine.png"
            alt=""
            width={18}
            height={18}
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" delay={0.2}>
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-esmeralda/10 to-ouro/10 rounded-full px-6 py-3 mb-6 border border-ouro/20"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/assets/brand/shine.png"
              alt=""
              width={16}
              height={16}
              className="animate-pulse"
            />
            <span className="text-sm font-medium text-esmeralda">
              Por que escolher a Cícero Joias
            </span>
            <Image
              src="/assets/brand/shine.png"
              alt=""
              width={12}
              height={12}
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </motion.div>

          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-esmeralda mb-6">
            Excelência em Cada
            <span className="block bg-gradient-to-r from-ouro to-yellow-400 bg-clip-text text-transparent">
              Detalhe
            </span>
          </h2>

          <p className="text-xl text-grafite-light max-w-3xl mx-auto leading-relaxed">
            Combinamos tradição artesanal com tecnologia moderna para criar joias que superam expectativas e marcam momentos únicos.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <AnimatedSection 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          stagger={true}
          delay={0.4}
        >
          {features.map((feature, index) => (
            <GlassCard 
              key={index}
              className={`p-8 group bg-gradient-to-br ${feature.gradient} backdrop-blur-sm relative`}
              hover={true}
            >
              {/* Shine decorativo no canto superior direito */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Image
                  src="/assets/brand/shine.png"
                  alt=""
                  width={12}
                  height={12}
                  className="animate-pulse"
                />
              </div>

              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-esmeralda to-esmeralda-light flex items-center justify-center group-hover:from-ouro group-hover:to-yellow-400 transition-all duration-500 shadow-lg relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-8 h-8 text-marfim" />
                  {/* Shine no hover do ícone */}
                  <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src="/assets/brand/shine.png"
                      alt=""
                      width={8}
                      height={8}
                      className="animate-pulse"
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="font-playfair text-xl font-bold text-esmeralda mb-4 group-hover:text-ouro transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-grafite-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </GlassCard>
          ))}
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="text-center mt-16" delay={0.8}>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.a
              href="https://wa.me/5583988073784?text=Olá! Gostaria de conhecer melhor o atelier da Cícero Joias e saber mais sobre os serviços oferecidos."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-esmeralda to-esmeralda-light text-marfim px-8 py-4 rounded-full font-semibold shadow-2xl shadow-esmeralda/25 hover:shadow-3xl hover:shadow-esmeralda/40 transition-all duration-300 border border-ouro/20 group"
              whileHover={{
                background: "linear-gradient(to right, #C79A34, #E1B959)",
                boxShadow: "0 25px 50px -12px rgba(199, 154, 52, 0.4)"
              }}
            >
              <span>Entrar em Contato</span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Image
                  src="/assets/brand/shine.png"
                  alt=""
                  width={14}
                  height={14}
                  className="animate-pulse"
                />
              </div>
            </motion.a>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}