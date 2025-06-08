'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Eye, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection, GlassCard } from '@/components/ui/animated-section';

interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  mainImage: string | null;
  createdAt: string;
  status: string;
}

const categoryLabels = {
  'WEDDING_RINGS': 'Alianças de Casamento',
  'REPAIRS_BEFORE_AFTER': 'Restaurações',
  'GOLD_PLATING': 'Banho de Ouro',
  'CUSTOM_JEWELRY': 'Joias Personalizadas',
  'GRADUATION_RINGS': 'Anéis de Formatura'
};

export function PortfolioPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch('/api/public/portfolio?limit=6');
      if (response.ok) {
        const data = await response.json();
        setPortfolioItems(data.portfolioItems || []);
      }
    } catch (error) {
      console.error('Erro ao buscar portfólio:', error);
      setPortfolioItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-br from-marfim via-marfim-light to-marfim relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 border border-esmeralda rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-ouro/60 transform rotate-45" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" delay={0.2}>
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-esmeralda/10 to-ouro/10 rounded-full px-6 py-3 mb-6 border border-ouro/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-ouro animate-pulse" />
            <span className="text-sm font-medium text-esmeralda">
              Trabalhos em Destaque
            </span>
          </motion.div>

          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-esmeralda mb-6">
            Nossas Criações
            <span className="block bg-gradient-to-r from-ouro to-yellow-400 bg-clip-text text-transparent">
              Únicas
            </span>
          </h2>

          <p className="text-xl text-grafite-light max-w-3xl mx-auto leading-relaxed">
            Cada peça conta uma história especial. Descubra algumas de nossas criações mais marcantes e se inspire para sua próxima joia.
          </p>
        </AnimatedSection>

        {/* Category Filters */}
        <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12" delay={0.4}>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-esmeralda to-esmeralda-light text-marfim border-esmeralda'
                  : 'bg-white/50 backdrop-blur-sm text-esmeralda border-esmeralda/20 hover:border-ouro/40 hover:bg-ouro/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'Todos' : categoryLabels[category as keyof typeof categoryLabels] || category}
            </motion.button>
          ))}
        </AnimatedSection>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl h-96" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-esmeralda/20 to-ouro/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-esmeralda" />
            </div>
            <h3 className="text-xl font-semibold text-esmeralda mb-2">
              Em breve, novos projetos
            </h3>
            <p className="text-grafite-light max-w-md mx-auto">
              Estamos trabalhando em projetos incríveis que serão adicionados ao nosso portfólio em breve.
            </p>
          </div>
        ) : (
          <motion.div 
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {filteredItems.slice(0, 6).map((item, index) => (
              <motion.div key={item.id} variants={itemVariants}>
                <GlassCard 
                  className="group overflow-hidden h-full flex flex-col bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md"
                  hover={true}
                >
                  <div className="relative h-64 overflow-hidden rounded-t-2xl">
                    <Image
                      src={item.mainImage || '/assets/images/home-hero.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay com gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-esmeralda/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badge da categoria */}
                    <motion.div 
                      className="absolute top-4 right-4 bg-gradient-to-r from-ouro to-yellow-400 text-esmeralda text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      {categoryLabels[item.category as keyof typeof categoryLabels] || item.category}
                    </motion.div>

                    {/* View button on hover */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    >
                      <motion.div
                        className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-6 h-6 text-esmeralda" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-playfair text-xl font-bold text-esmeralda mb-3 group-hover:text-ouro transition-colors duration-300 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    {item.description && (
                      <p className="text-grafite-light text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center text-xs text-grafite-light">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      
                      <Link href={`/portfolio/${item.id}`}>
                        <motion.div
                          className="flex items-center text-esmeralda hover:text-ouro transition-colors duration-300 text-sm font-medium"
                          whileHover={{ x: 5 }}
                        >
                          Ver Detalhes
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Section */}
        <AnimatedSection className="text-center mt-16" delay={0.8}>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-esmeralda to-esmeralda-light text-marfim hover:from-ouro hover:to-yellow-400 shadow-xl shadow-esmeralda/25 transition-all duration-300 border border-ouro/20"
            >
              <Link href="/portfolio" className="flex items-center">
                Ver Portfólio Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
} 