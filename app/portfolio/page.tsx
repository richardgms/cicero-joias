'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

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
  category: string;
  mainImage: string | null;
  images: string[];
  createdAt: string;
}

interface ApiResponse {
  portfolioItems: PortfolioItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Buscar categorias disponíveis
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPortfolioItems();
  }, [activeCategory, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/public/categories');
      if (response.ok) {
        const data = await response.json();
        const portfolioCategories = data.categories.portfolio
          .map((cat: any) => cat.id);
        setAvailableCategories(portfolioCategories);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const fetchPortfolioItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
      });

      if (activeCategory !== 'todos') {
        params.append('category', activeCategory);
      }

      const response = await fetch(`/api/public/portfolio?${params}`);
      if (response.ok) {
        const data: ApiResponse = await response.json();
        setPortfolioItems(data.portfolioItems);
        setPagination({
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
          hasNextPage: data.pagination.hasNextPage,
          hasPrevPage: data.pagination.hasPrevPage,
        });
      } else {
        console.error('Erro ao buscar portfolio');
      }
    } catch (error) {
      console.error('Erro ao buscar portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar itens baseado na busca local
  const filteredItems = portfolioItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Criar lista de categorias para os tabs
  const categories = [
    { id: 'todos', name: 'Todos os Projetos' },
    ...availableCategories.map(cat => ({
      id: cat,
      name: categoryLabels[cat as keyof typeof categoryLabels] || cat
    }))
  ];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <section className="py-20 bg-marfim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Busca e Filtros */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="text-sm text-gray-600">
                {loading ? 'Carregando...' : `${pagination.total} projeto${pagination.total !== 1 ? 's' : ''} encontrado${pagination.total !== 1 ? 's' : ''}`}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
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

              <TabsContent value={activeCategory}>
                {loading ? (
                  <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-esmeralda mx-auto"></div>
                      <p className="mt-2 text-gray-600">Carregando projetos...</p>
                    </div>
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Nenhum projeto encontrado
                    </h3>
                    <p className="text-gray-600">
                      {searchTerm 
                        ? `Não encontramos projetos que correspondam a "${searchTerm}"`
                        : 'Ainda não há projetos nesta categoria'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                      <Link href={`/portfolio/${item.id}`} key={item.id} className="group">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          <div className="relative h-64 overflow-hidden">
                            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                            <Image
                              src={item.mainImage || '/assets/images/home-hero.jpg'}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/assets/images/home-hero.jpg'; // Fallback image
                              }}
                            />
                          </div>
                          
                          <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-2">
                              <span className="text-xs font-semibold text-esmeralda-light bg-esmeralda/10 px-3 py-1 rounded-full">
                                {categoryLabels[item.category as keyof typeof categoryLabels] || item.category}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-esmeralda mb-3 group-hover:text-ouro transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-esmeralda-light text-sm mb-4 flex-grow">
                              {item.description || 'Projeto de alta qualidade criado especialmente para nosso cliente.'}
                            </p>
                            <Button variant="outline" className="w-full border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim mt-auto">
                              Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Paginação */}
          {!loading && filteredItems.length > 0 && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim"
              >
                Anterior
              </Button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={page === currentPage 
                      ? "bg-esmeralda text-marfim" 
                      : "border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim"
                    }
                    size="sm"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim"
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
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