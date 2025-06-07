import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Dados de exemplo para o portfólio
const portfolioItems = [
  {
    id: 1,
    title: 'Aliança de Ouro 18k Personalizada',
    category: 'aliancas',
    description: 'Aliança de casamento em ouro 18k com detalhes em relevo e acabamento fosco.',
    thumbnail: '/assets/images/home-hero.jpg',
    images: [
      '/assets/images/home-hero.jpg',
      '/assets/images/home-testimonials.jpg',
      '/assets/images/home-services.jpg',
    ],
    featured: true
  },
  {
    id: 2,
    title: 'Pingente Personalizado com Diamante',
    category: 'joias',
    description: 'Pingente em ouro branco 18k com diamante central de 0.25 quilates.',
    thumbnail: '/assets/images/home-values.jpg',
    images: [
      '/assets/images/home-values.jpg',
      '/assets/images/home-testimonials.jpg',
    ],
    featured: true
  },
  {
    id: 3,
    title: 'Restauração de Relógio Vintage',
    category: 'consertos',
    description: 'Restauração completa de relógio vintage com substituição de peças e polimento.',
    thumbnail: '/assets/images/home-services.jpg',
    images: [
      '/assets/images/home-services.jpg',
      '/assets/images/home-values.jpg',
      '/assets/images/home-hero.jpg',
    ],
    featured: false
  },
  {
    id: 4,
    title: 'Aliança de Prata com Gravação',
    category: 'aliancas',
    description: 'Aliança de compromisso em prata 950 com gravação personalizada interna.',
    thumbnail: '/assets/images/home-testimonials.jpg',
    images: [
      '/assets/images/home-testimonials.jpg',
      '/assets/images/home-hero.jpg',
    ],
    featured: false
  },
  {
    id: 5,
    title: 'Pulseira de Ouro com Pedras',
    category: 'joias',
    description: 'Pulseira em ouro 18k com pedras semipreciosas em engaste pavê.',
    thumbnail: '/assets/images/home-hero.jpg',
    images: [
      '/assets/images/home-hero.jpg',
      '/assets/images/home-values.jpg',
    ],
    featured: true
  },
  {
    id: 6,
    title: 'Recuperação de Óculos Vintage',
    category: 'oculos',
    description: 'Recuperação de armação vintage com substituição de lentes e ajustes.',
    thumbnail: '/assets/images/home-services.jpg',
    images: [
      '/assets/images/home-services.jpg',
      '/assets/images/home-testimonials.jpg',
    ],
    featured: false
  },
  {
    id: 7,
    title: 'Conjunto de Brincos e Colar',
    category: 'joias',
    description: 'Conjunto harmonizado de brincos e colar em ouro 18k com desenho floral.',
    thumbnail: '/assets/images/home-values.jpg',
    images: [
      '/assets/images/home-values.jpg',
      '/assets/images/home-testimonials.jpg',
      '/assets/images/home-hero.jpg',
    ],
    featured: true
  },
  {
    id: 8,
    title: 'Aliança Fosca com Diamantes',
    category: 'aliancas',
    description: 'Aliança de casamento com acabamento fosco e linha de diamantes.',
    thumbnail: '/assets/images/home-testimonials.jpg',
    images: [
      '/assets/images/home-testimonials.jpg',
      '/assets/images/home-services.jpg',
    ],
    featured: true
  },
];

// Categorias para filtro
const categories = [
  { id: 'todos', name: 'Todos os Projetos' },
  { id: 'aliancas', name: 'Alianças' },
  { id: 'joias', name: 'Joias' },
  { id: 'consertos', name: 'Consertos' },
  { id: 'oculos', name: 'Óculos' },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#133629' }}>
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/assets/images/home-hero.jpg')`
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-marfim">
              Nosso 
              <span className="text-ouro"> Portfólio</span>
            </h1>
            <p className="text-xl text-marfim-dark leading-relaxed">
              Conheça alguns dos nossos trabalhos mais recentes e descubra como podemos 
              transformar suas ideias em joias que contam histórias.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-marfim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Tabs defaultValue="todos" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-marfim-dark/20">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-esmeralda data-[state=active]:text-marfim"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioItems
                      .filter(item => category.id === 'todos' || item.category === category.id)
                      .map((item) => (
                        <Link href={`/portfolio/${item.id}`} key={item.id} className="group">
                          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            <div className="relative h-64 overflow-hidden">
                              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              {item.featured && (
                                <div className="absolute top-4 right-4 bg-ouro text-esmeralda text-xs font-bold px-3 py-1 rounded-full">
                                  Destaque
                                </div>
                              )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="mb-2">
                                <span className="text-xs font-semibold text-esmeralda-light bg-esmeralda/10 px-3 py-1 rounded-full">
                                  {categories.find(cat => cat.id === item.category)?.name || 'Outro'}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-esmeralda mb-3 group-hover:text-ouro transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-esmeralda-light text-sm mb-4 flex-grow">
                                {item.description}
                              </p>
                              <Button variant="outline" className="w-full border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim mt-auto">
                                Ver Detalhes
                              </Button>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-esmeralda mb-6">
            Tem um Projeto em Mente?
          </h2>
          <p className="text-lg text-esmeralda-light mb-8 max-w-3xl mx-auto">
            Estamos prontos para transformar suas ideias em joias únicas e personalizadas.
            Entre em contato para discutirmos seu projeto e criar algo especial juntos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-ouro text-esmeralda hover:bg-ouro-light">
              <Link href="/orcamento">
                Solicitar Orçamento
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim">
              <Link href="https://wa.me/5583988073784">
                Falar no WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 