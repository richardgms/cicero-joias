'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { AnimatedSection, GlassCard } from '@/components/ui/animated-section';
import CountUp from 'react-countup';

const testimonials = [
  {
    id: 1,
    name: 'Isabella Rodrigues',
    role: 'Noiva',
    content: 'A Cícero Joias transformou nosso sonho em realidade! Nossas alianças de casamento ficaram absolutamente perfeitas. Cada detalhe foi pensado com carinho, desde a gravação especial até o acabamento impecável. O atendimento da equipe foi excepcional do início ao fim.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&fit=facearea&facepad=2',
    project: 'Alianças de Casamento Personalizadas'
  },
  {
    id: 2,
    name: 'Carlos Eduardo Santos',
    role: 'Cliente há 12 anos',
    content: 'Já confio minhas joias de família à Cícero Joias há mais de uma década. Seja para reparos delicados ou criação de peças novas, eles sempre superam minhas expectativas. A qualidade é incomparável e o preço sempre justo. Uma empresa familiar que realmente se importa!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&fit=facearea&facepad=2',
    project: 'Restauração de Joias Antigas'
  },
  {
    id: 3,
    name: 'Ana Carolina Ferreira',
    role: 'Formanda em Medicina',
    content: 'Meu anel de formatura é uma obra de arte! A equipe me ajudou a personalizar cada detalhe, desde o brasão da universidade até a gravação da data. É emocionante ver como eles transformaram minhas ideias em uma joia que vou usar com orgulho para sempre.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&fit=facearea&facepad=2',
    project: 'Anel de Formatura Personalizado'
  },
  {
    id: 4,
    name: 'Roberto Oliveira',
    role: 'Empresário',
    content: 'Presenteei minha esposa com um colar personalizado da Cícero Joias para nosso aniversário de 25 anos. A peça ficou simplesmente magnífica! O brilho das pedras e a delicadeza do trabalho artesanal mostram o nível de excelência que eles mantêm há décadas.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&fit=facearea&facepad=2',
    project: 'Colar de Bodas de Prata'
  },
  {
    id: 5,
    name: 'Mariana Costa Lima',
    role: 'Arquiteta',
    content: 'Escolhi a Cícero Joias para criar os brincos do meu casamento e não poderia estar mais feliz! Eles conseguiram capturar exatamente a elegância que eu buscava. O processo foi transparente, com várias provas e ajustes até ficar perfeito. Recomendo sem hesitar!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&fit=facearea&facepad=2',
    project: 'Joias para Casamento'
  },
  {
    id: 6,
    name: 'Francisco Almeida',
    role: 'Aposentado',
    content: 'Trouxe o relógio do meu pai para restauração e fiquei impressionado com o cuidado e dedicação da equipe. Eles não apenas consertaram, mas devolveram a vida àquela peça cheia de memórias. É um trabalho que vai muito além da técnica - é arte e coração juntos.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&fit=facearea&facepad=2',
    project: 'Restauração de Relógio Antigo'
  }
];

export function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(autoScroll);
  }, [emblaApi]);

  return (
    <section className="py-24 bg-gradient-to-br from-esmeralda via-esmeralda-light to-esmeralda-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-ouro rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-ouro/60 transform rotate-45" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-ouro/20 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" delay={0.2}>
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-ouro/20 to-yellow-400/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-ouro/30"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-4 h-4 text-ouro animate-pulse" />
            <span className="text-sm font-medium text-marfim">
              Depoimentos dos Nossos Clientes
            </span>
          </motion.div>

          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-marfim mb-6">
            Histórias de
            <span className="block bg-gradient-to-r from-ouro via-yellow-400 to-ouro bg-clip-text text-transparent">
              Satisfação
            </span>
          </h2>

          <p className="text-xl text-marfim-dark max-w-3xl mx-auto leading-relaxed">
            A confiança dos nossos clientes é nosso maior tesouro. Veja o que dizem aqueles que 
            escolheram a Cícero Joias para momentos especiais.
          </p>
        </AnimatedSection>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-none w-full md:w-1/2 lg:w-1/3 pl-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard className="p-8 h-full bg-gradient-to-br from-marfim/10 to-marfim/5 backdrop-blur-md border border-ouro/20">
                      {/* Quote Icon */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-ouro fill-current" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-ouro/30" />
                      </div>

                      {/* Content */}
                      <p className="text-marfim-dark mb-6 leading-relaxed italic text-sm">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>

                      {/* Project */}
                      <div className="mb-4">
                        <span className="text-xs bg-ouro/20 text-ouro px-3 py-1 rounded-full">
                          {testimonial.project}
                        </span>
                      </div>

                      {/* Author */}
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-ouro/30"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-ouro to-yellow-400 rounded-full flex items-center justify-center">
                            <Sparkles className="w-2 h-2 text-esmeralda" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-marfim text-sm">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs text-marfim-dark">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <motion.button
              onClick={scrollPrev}
              className={`p-3 rounded-full bg-ouro/20 backdrop-blur-md border border-ouro/30 transition-all duration-300 ${canScrollPrev ? 'opacity-100 hover:bg-ouro/30' : 'opacity-50 cursor-not-allowed'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="w-5 h-5 text-ouro" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? 'bg-ouro w-6' : 'bg-ouro/30'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={scrollNext}
              className={`p-3 rounded-full bg-ouro/20 backdrop-blur-md border border-ouro/30 transition-all duration-300 ${canScrollNext ? 'opacity-100 hover:bg-ouro/30' : 'opacity-50 cursor-not-allowed'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!canScrollNext}
            >
              <ChevronRight className="w-5 h-5 text-ouro" />
            </motion.button>
          </div>
        </div>

        {/* Stats Section */}
        <AnimatedSection className="mt-20" delay={0.8}>
          <GlassCard className="p-8 bg-gradient-to-r from-marfim/10 to-marfim/5 backdrop-blur-md border border-ouro/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-ouro to-yellow-400 bg-clip-text text-transparent mb-2">
                  {inView && <CountUp end={98} duration={2.5} suffix="%" />}
                  {!inView && "98%"}
                </div>
                <p className="text-marfim-dark text-sm">Satisfação</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-ouro to-yellow-400 bg-clip-text text-transparent mb-2">
                  {inView && <CountUp end={4.9} duration={2.5} decimals={1} />}
                  {!inView && "4.9"}
                </div>
                <p className="text-marfim-dark text-sm">Avaliação</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-ouro to-yellow-400 bg-clip-text text-transparent mb-2">
                  {inView && <CountUp end={500} duration={2.5} suffix="+" />}
                  {!inView && "500+"}
                </div>
                <p className="text-marfim-dark text-sm">Clientes</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-ouro to-yellow-400 bg-clip-text text-transparent mb-2">
                  {inView && <CountUp end={40} duration={2.5} suffix="+" />}
                  {!inView && "40+"}
                </div>
                <p className="text-marfim-dark text-sm">Anos</p>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}