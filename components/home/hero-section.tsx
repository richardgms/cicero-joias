'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Button } from '@/components/ui/button';
import { Heart, Star, Gem, ArrowRight, Sparkles, Award, Users } from 'lucide-react';

export function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Modern Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(
              135deg,
              rgba(19, 54, 41, 0.92) 0%,
              rgba(19, 54, 41, 0.85) 30%,
              rgba(19, 54, 41, 0.95) 100%
            ),
            linear-gradient(
              45deg,
              rgba(207, 154, 36, 0.1) 0%,
              transparent 50%,
              rgba(207, 154, 36, 0.05) 100%
            ),
            url('/assets/images/jewelry-workshop-hero.jpg')`
        }}
      />
      
      {/* Animated Particles Background */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(window.innerWidth < 768 ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-ouro rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <motion.div 
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-marfim"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Badge */}
        <motion.div 
          variants={badgeVariants}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-esmeralda-light/20 to-ouro/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-ouro/20"
        >
          <Sparkles className="w-4 h-4 text-ouro animate-pulse" />
          <span className="text-sm font-medium bg-gradient-to-r from-marfim to-ouro bg-clip-text text-transparent">
            Mais de 40 anos de tradição
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          variants={itemVariants}
          className="font-playfair text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-marfim via-marfim to-marfim-dark bg-clip-text text-transparent">
            Tradição que se
          </span>
          <motion.span 
            className="block bg-gradient-to-r from-ouro via-yellow-400 to-ouro bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            Renova
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-marfim-dark mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
        >
          Criamos momentos especiais através de joias únicas, alianças personalizadas e serviços de qualidade excepcional.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-16 px-4 sm:px-0"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" asChild className="group bg-gradient-to-r from-ouro to-yellow-400 text-grafite hover:from-yellow-400 hover:to-ouro shadow-lg shadow-ouro/25 transition-all duration-300">
              <Link href="/orcamento">
                Solicitar Orçamento
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="bg-esmeralda-light/10 backdrop-blur-md border-marfim/30 text-marfim hover:bg-esmeralda-light/20 hover:border-ouro/50 transition-all duration-300 shadow-lg"
            >
              <Link href="/portfolio">
                Ver Nosso Trabalho
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto px-4 sm:px-0"
        >
          <motion.div 
            className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-esmeralda-light/10 to-transparent backdrop-blur-sm border border-ouro/20"
            whileHover={{ scale: 1.05, borderColor: "rgba(207, 154, 36, 0.4)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center mb-2 md:mb-3">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-ouro mr-2" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-ouro to-yellow-400 bg-clip-text text-transparent">
                {inView && mounted && <CountUp end={40} duration={2.5} suffix="+" />}
                {(!inView || !mounted) && "40+"}
              </span>
            </div>
            <p className="text-marfim-dark font-medium text-sm md:text-base">Anos de Experiência</p>
          </motion.div>

          <motion.div 
            className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-esmeralda-light/10 to-transparent backdrop-blur-sm border border-ouro/20"
            whileHover={{ scale: 1.05, borderColor: "rgba(207, 154, 36, 0.4)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center mb-2 md:mb-3">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-ouro mr-2" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-ouro to-yellow-400 bg-clip-text text-transparent">
                {inView && mounted && <CountUp end={1000} duration={2.5} suffix="+" />}
                {(!inView || !mounted) && "1000+"}
              </span>
            </div>
            <p className="text-marfim-dark font-medium text-sm md:text-base">Alianças Criadas</p>
          </motion.div>

          <motion.div 
            className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-esmeralda-light/10 to-transparent backdrop-blur-sm border border-ouro/20"
            whileHover={{ scale: 1.05, borderColor: "rgba(207, 154, 36, 0.4)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center mb-2 md:mb-3">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-ouro mr-2" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-ouro to-yellow-400 bg-clip-text text-transparent">
                {inView && mounted && <CountUp end={500} duration={2.5} suffix="+" />}
                {(!inView || !mounted) && "500+"}
              </span>
            </div>
            <p className="text-marfim-dark font-medium text-sm md:text-base">Clientes Satisfeitos</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Intuitive Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div 
          className="relative w-8 h-8 bg-gradient-to-r from-ouro/20 to-yellow-400/20 backdrop-blur-md rounded-full border border-ouro/30 flex items-center justify-center cursor-pointer"
          whileHover={{ 
            scale: 1.1, 
            borderColor: "rgba(207, 154, 36, 0.8)",
            backgroundColor: "rgba(207, 154, 36, 0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-ouro to-yellow-400 rounded-full"
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Optional: Subtle hint */}
        <motion.div 
          className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1 h-1 bg-ouro/40 rounded-full mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}