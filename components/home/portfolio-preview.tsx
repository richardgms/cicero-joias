import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Projetos em destaque para a pré-visualização
const featuredProjects = [
  {
    id: 1,
    title: 'Aliança de Ouro 18k Personalizada',
    description: 'Aliança de casamento em ouro 18k com detalhes em relevo e acabamento fosco.',
    imageUrl: '/assets/images/home-hero.jpg',
  },
  {
    id: 5,
    title: 'Pulseira de Ouro com Pedras',
    description: 'Pulseira em ouro 18k com pedras semipreciosas em engaste pavê.',
    imageUrl: '/assets/images/home-values.jpg',
  },
  {
    id: 7,
    title: 'Conjunto de Brincos e Colar',
    description: 'Conjunto harmonizado de brincos e colar em ouro 18k com desenho floral.',
    imageUrl: '/assets/images/home-services.jpg',
  },
];

export function PortfolioPreview() {
  return (
    <section className="py-20 bg-marfim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-esmeralda mb-4">
              Nossos Trabalhos em Destaque
            </h2>
            <p className="text-lg text-esmeralda-light max-w-2xl">
              Cada peça conta uma história única. Conheça alguns de nossos trabalhos mais recentes e deixe-se inspirar.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button
              asChild
              variant="outline"
              className="border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim"
            >
              <Link href="/portfolio" className="flex items-center">
                Ver Portfólio Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-ouro text-esmeralda text-xs font-bold px-3 py-1 rounded-full">
                    Destaque
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-esmeralda mb-3 group-hover:text-ouro transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-esmeralda-light text-sm mb-4 flex-grow">
                    {project.description}
                  </p>
                  <Button variant="ghost" className="justify-start p-0 text-esmeralda hover:text-ouro hover:bg-transparent">
                    <span>Ver Detalhes</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}