'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gem, Heart, Award, Clock, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: Gem,
    title: "Joias Personalizadas",
    description: "Criamos peças únicas que contam sua história, com design exclusivo e acabamento impecável.",
    color: "esmeralda"
  },
  {
    icon: Heart,
    title: "Alianças de Casamento",
    description: "Simbolize seu amor eterno com alianças feitas sob medida, com gravações personalizadas.",
    color: "ouro"
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Utilizamos apenas metais nobres e gemas selecionadas, garantindo durabilidade e beleza.",
    color: "esmeralda"
  },
  {
    icon: Clock,
    title: "Tradição Familiar",
    description: "Mais de 40 anos de tradição em ourivesaria, passando técnicas de geração em geração.",
    color: "ouro"
  },
  {
    icon: Shield,
    title: "Garantia Vitalícia",
    description: "Todas as nossas peças têm garantia vitalícia contra defeitos de fabricação.",
    color: "esmeralda"
  },
  {
    icon: Users,
    title: "Atendimento Exclusivo",
    description: "Consultoria personalizada para escolher a joia perfeita para cada momento especial.",
    color: "ouro"
  }
];

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-marfim relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23184434' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-esmeralda/10">
            <span className="text-sm font-medium text-esmeralda">
              Por que escolher a Cícero Joias?
            </span>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-esmeralda mb-6 leading-tight">
            Excelência em Cada
            <span className="block bg-gradient-to-r from-ouro via-ouro-light to-ouro bg-clip-text text-transparent">
              Detalhe
            </span>
          </h2>

          <p className="text-xl text-grafite-light max-w-3xl mx-auto leading-relaxed font-light">
            Combinamos tradição artesanal com tecnologia moderna para criar joias que superam expectativas e marcam momentos únicos.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/50 hover:shadow-lg hover:border-gray-200/50 transition-all duration-300 hover:-translate-y-1"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mb-4
                      ${feature.color === 'esmeralda'
                        ? 'bg-esmeralda text-white'
                        : 'bg-ouro text-white'
                      }
                      shadow-lg shadow-${feature.color}/20
                      group-hover:shadow-xl group-hover:shadow-${feature.color}/30
                      transition-all duration-300
                    `}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-playfair text-xl font-bold text-esmeralda group-hover:text-esmeralda-light transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-grafite-light leading-relaxed text-[15px] font-light">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle accent line */}
                <div
                  className={`
                    mt-6 h-0.5 w-12 rounded-full
                    ${feature.color === 'esmeralda'
                      ? 'bg-gradient-to-r from-esmeralda to-esmeralda-light'
                      : 'bg-gradient-to-r from-ouro to-ouro-light'
                    }
                    opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-500
                  `}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2, ease: "easeOut" } }
          }}
        >
          <motion.a
            href="https://wa.me/5583988073784?text=Olá! Gostaria de conhecer melhor o atelier da Cícero Joias e saber mais sobre os serviços oferecidos."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-esmeralda to-esmeralda-light text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-esmeralda/25 hover:shadow-xl hover:shadow-esmeralda/40 transition-all duration-300 group"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px -12px rgba(24, 68, 52, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Entrar em Contato</span>
            <motion.div
              className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}