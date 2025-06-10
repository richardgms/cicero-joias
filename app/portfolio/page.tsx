'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Eye,
  Clock,
  ChevronDown,
  X
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generatePortfolioSlug } from '@/lib/slug-utils';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  // Criar lista de categorias para os filtros
  const categories = [
    { id: 'todos', name: 'Todos os Projetos', count: pagination.total },
    ...availableCategories.map(cat => ({
      id: cat,
      name: categoryLabels[cat as keyof typeof categoryLabels] || cat,
      count: 0 // TODO: Implementar contagem por categoria
    }))
  ];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateSlugForItem = (item: PortfolioItem) => {
    return generatePortfolioSlug({
      title: item.title,
      category: item.category,
      id: item.id
    });
  };

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
      <div className="relative h-64 bg-gray-200 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5">
      {/* Hero Section Moderno */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Background com overlay */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `
                linear-gradient(
                  135deg,
                  rgba(19, 54, 41, 0.92) 0%,
                  rgba(19, 54, 41, 0.88) 50%,
                  rgba(19, 54, 41, 0.95) 100%
                ),
                url('/assets/images/portfolio-hero.png')`
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-marfim leading-tight">
              Nosso 
              <span className="bg-gradient-to-r from-ouro via-yellow-400 to-ouro bg-clip-text text-transparent"> Portfólio</span>
            </h1>
            <p className="text-lg md:text-xl text-marfim-dark leading-relaxed max-w-3xl mx-auto">
              Conheça alguns dos nossos trabalhos mais recentes e descubra como podemos 
              transformar suas ideias em joias que contam histórias únicas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header com Busca e Filtros */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
            {/* Busca e Controles */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              {/* Busca */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-esmeralda focus:ring-esmeralda"
                />
              </div>

              {/* Controles de View Mode e Filtro Mobile */}
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white text-esmeralda shadow-sm' 
                        : 'text-gray-600 hover:text-esmeralda'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white text-esmeralda shadow-sm' 
                        : 'text-gray-600 hover:text-esmeralda'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Filtro Mobile */}
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="md:hidden border-gray-200 hover:border-esmeralda"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </Button>

                {/* Contador de resultados */}
                <div className="hidden md:block text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                  {loading ? 'Carregando...' : `${pagination.total} projeto${pagination.total !== 1 ? 's' : ''}`}
                </div>
              </div>
            </div>

            {/* Filtros Desktop */}
            <div className="hidden md:flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-esmeralda text-marfim shadow-lg scale-105'
                      : 'bg-white/60 text-gray-700 hover:bg-esmeralda/10 hover:text-esmeralda border border-gray-200'
                  }`}
                >
                  {category.name}
                  {category.count > 0 && (
                    <span className="ml-2 text-xs opacity-75">({category.count})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Filtros Mobile (Dropdown) */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          activeCategory === category.id
                            ? 'bg-esmeralda text-marfim shadow-lg'
                            : 'bg-white/60 text-gray-700 hover:bg-esmeralda/10 hover:text-esmeralda border border-gray-200'
                        }`}
                      >
                        {category.name}
                        {category.count > 0 && (
                          <span className="ml-2 text-xs opacity-75">({category.count})</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Grid de Projetos */}
          {loading ? (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-4"
            }>
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? `Não encontramos projetos que correspondam a "${searchTerm}"`
                  : 'Ainda não há projetos nesta categoria'
                }
              </p>
              {(searchTerm || activeCategory !== 'todos') && (
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('todos');
                  }}
                  variant="outline"
                  className="border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
              }
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={`/portfolio/${generateSlugForItem(item)}`} 
                    className="group block"
                  >
                    {viewMode === 'grid' ? (
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={item.mainImage || '/assets/images/home-hero.jpg'}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/assets/images/home-hero.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Badge de categoria */}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-esmeralda/90 text-marfim text-xs backdrop-blur-sm">
                              {categoryLabels[item.category as keyof typeof categoryLabels] || item.category}
                            </Badge>
                          </div>
                          
                          {/* Ícone de visualização */}
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-sm text-esmeralda p-2 rounded-full">
                              <Eye className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-esmeralda transition-colors mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {item.description || 'Projeto exclusivo criado com atenção aos detalhes e qualidade excepcional.'}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="text-esmeralda font-medium group-hover:text-ouro transition-colors">
                              Ver projeto →
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                        <div className="flex">
                          <div className="relative w-32 h-32 flex-shrink-0">
                            <Image
                              src={item.mainImage || '/assets/images/home-hero.jpg'}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="128px"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/assets/images/home-hero.jpg';
                              }}
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge className="bg-esmeralda/10 text-esmeralda text-xs">
                                    {categoryLabels[item.category as keyof typeof categoryLabels] || item.category}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-esmeralda transition-colors mb-2">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {item.description || 'Projeto exclusivo criado com atenção aos detalhes e qualidade excepcional.'}
                                </p>
                              </div>
                              <div className="ml-4 text-right">
                                <div className="text-esmeralda font-medium group-hover:text-ouro transition-colors text-sm">
                                  Ver projeto →
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Paginação Moderna */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="border-gray-200 text-gray-700 hover:border-esmeralda hover:text-esmeralda disabled:opacity-50"
              >
                Anterior
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      className={page === currentPage 
                        ? "bg-esmeralda text-marfim hover:bg-esmeralda-dark" 
                        : "border-gray-200 text-gray-700 hover:border-esmeralda hover:text-esmeralda"
                      }
                      size="sm"
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="border-gray-200 text-gray-700 hover:border-esmeralda hover:text-esmeralda disabled:opacity-50"
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 