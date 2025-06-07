import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Wrench, Sparkles } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'Alianças Românticas',
    description: 'Alianças únicas que contam a história de cada casal',
    image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Alianças',
    icon: Heart
  },
  {
    id: 2,
    title: 'Restauração Completa',
    description: 'Antes e depois de consertos que devolvem vida às suas joias',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Consertos',
    icon: Wrench
  },
  {
    id: 3,
    title: 'Banho de Ouro Premium',
    description: 'Transformação completa com acabamento dourado de alta qualidade',
    image: 'https://images.pexels.com/photos/1927260/pexels-photo-1927260.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Banho de Ouro',
    icon: Sparkles
  }
];

export function PortfolioPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Nossos
            <span className="text-primary"> Trabalhos</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Cada peça conta uma história única. Conheça alguns dos nossos trabalhos mais especiais 
            e inspire-se para criar a sua joia dos sonhos.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl elegant-shadow premium-card-hover"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="group">
            <Link href="/portfolio">
              Ver Portfólio Completo
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}