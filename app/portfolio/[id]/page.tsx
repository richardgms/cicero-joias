'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, notFound } from 'next/navigation';
import { Metadata } from 'next';

// Mapeamento de categorias para exibição
const categoryLabels = {
  WEDDING_RINGS: 'Alianças de Casamento',
  REPAIRS_BEFORE_AFTER: 'Consertos (Antes/Depois)',
  GOLD_PLATING: 'Banho de Ouro',
  CUSTOM_JEWELRY: 'Joias Personalizadas',
  GRADUATION_RINGS: 'Anéis de Formatura',
};

interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  detailedDescription?: string;
  category: string;
  mainImage: string;
  images: string[];
  specifications?: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  createdAt: string;
  product?: {
    id: string;
    name: string;
    price: number;
  };
}

interface RelatedProject {
  id: string;
  title: string;
  mainImage: string;
  category: string;
}

interface ApiResponse {
  portfolioItem: PortfolioItem;
  relatedProjects: RelatedProject[];
}

export default function PortfolioItemPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [portfolioItem, setPortfolioItem] = useState<PortfolioItem | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchPortfolioItem();
    }
  }, [id]);

  const fetchPortfolioItem = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/public/portfolio/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Projeto não encontrado');
        } else {
          setError('Erro ao carregar projeto');
        }
        return;
      }

      const data: ApiResponse = await response.json();
      setPortfolioItem(data.portfolioItem);
      setRelatedProjects(data.relatedProjects);
      
      // Atualizar meta tags dinamicamente
      if (data.portfolioItem.seoTitle) {
        document.title = data.portfolioItem.seoTitle;
      } else {
        document.title = `${data.portfolioItem.title} - Cícero Joias`;
      }

      // Atualizar meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          data.portfolioItem.seoDescription || 
          data.portfolioItem.description || 
          `Conheça o projeto ${data.portfolioItem.title} da Cícero Joias`
        );
      }

    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
      setError('Erro ao carregar projeto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-esmeralda mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando projeto...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projeto não encontrado</h1>
          <p className="text-gray-600 mb-8">
            O projeto que você está procurando não existe ou foi removido.
          </p>
          <Button asChild>
            <Link href="/portfolio">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Portfólio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const allImages = [portfolioItem.mainImage, ...portfolioItem.images];

  return (
    <div className="min-h-screen bg-marfim">
      {/* Navegação */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/portfolio">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Portfólio
              </Link>
            </Button>
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-esmeralda">Início</Link>
              <span className="mx-2">/</span>
              <Link href="/portfolio" className="hover:text-esmeralda">Portfólio</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{portfolioItem.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
            {/* Galeria de Imagens */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                {/* Imagem Principal */}
                <div className="relative h-80 md:h-96 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={allImages[selectedImageIndex]}
                    alt={portfolioItem.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/images/home-hero.jpg';
                    }}
                  />
                </div>
                
                {/* Miniaturas */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {allImages.map((image, index) => (
                      <div 
                        key={index} 
                        className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                          selectedImageIndex === index 
                            ? 'border-esmeralda' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <Image
                          src={image}
                          alt={`${portfolioItem.title} - imagem ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="100px"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/images/home-hero.jpg';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Informações do Projeto */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                {/* Categoria */}
                <div className="mb-4">
                  <span className="text-sm font-semibold text-esmeralda-light bg-esmeralda/10 px-4 py-2 rounded-full">
                    {categoryLabels[portfolioItem.category as keyof typeof categoryLabels] || portfolioItem.category}
                  </span>
                </div>

                {/* Título */}
                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-esmeralda mb-6">
                  {portfolioItem.title}
                </h1>

                {/* Descrição */}
                <div className="mb-8">
                  <p className="text-esmeralda-light text-lg leading-relaxed mb-4">
                    {portfolioItem.description}
                  </p>
                  
                  {portfolioItem.detailedDescription && (
                    <div className="prose prose-esmeralda max-w-none">
                      {portfolioItem.detailedDescription.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <p key={index} className="text-esmeralda-light mb-4 leading-relaxed">
                            {paragraph.trim()}
                          </p>
                        )
                      ))}
                    </div>
                  )}
                </div>

                {/* Especificações Técnicas */}
                {portfolioItem.specifications && Object.keys(portfolioItem.specifications).length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-esmeralda mb-4">Especificações Técnicas</h2>
                    <div className="bg-marfim rounded-lg p-6">
                      <dl className="grid grid-cols-1 gap-4">
                        {Object.entries(portfolioItem.specifications).map(([key, value]) => (
                          <div key={key} className="flex flex-col sm:flex-row sm:justify-between">
                            <dt className="font-semibold text-esmeralda">{key}:</dt>
                            <dd className="text-esmeralda-light sm:text-right">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}

                {/* Produto Relacionado */}
                {portfolioItem.product && (
                  <div className="mb-8 p-4 bg-ouro/10 rounded-lg border border-ouro/20">
                    <h3 className="font-semibold text-esmeralda mb-2">Produto Relacionado</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-esmeralda-light">{portfolioItem.product.name}</p>
                        <p className="text-lg font-bold text-esmeralda">
                          R$ {portfolioItem.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="border-esmeralda text-esmeralda">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver Produto
                      </Button>
                    </div>
                  </div>
                )}

                {/* Keywords para SEO */}
                {portfolioItem.keywords && portfolioItem.keywords.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-esmeralda mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolioItem.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-esmeralda/10 text-esmeralda text-sm rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-ouro text-esmeralda hover:bg-ouro-light">
                    <Link href="/orcamento">
                      Solicitar Orçamento Semelhante
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim">
                    <Link href="https://wa.me/5583988073784">
                      Falar no WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projetos Relacionados */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-esmeralda mb-8">
              Projetos Relacionados
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedItem) => (
                <Link href={`/portfolio/${relatedItem.id}`} key={relatedItem.id} className="group">
                  <div className="bg-marfim rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={relatedItem.mainImage}
                        alt={relatedItem.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/assets/images/home-hero.jpg';
                        }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-esmeralda-light bg-esmeralda/10 px-3 py-1 rounded-full">
                          {categoryLabels[relatedItem.category as keyof typeof categoryLabels] || relatedItem.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-esmeralda mb-3 group-hover:text-ouro transition-colors">
                        {relatedItem.title}
                      </h3>
                      <Button variant="outline" className="w-full border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim mt-auto">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}