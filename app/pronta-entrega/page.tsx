'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search, Filter, Star, Clock, Package,
  SlidersHorizontal, Grid3X3, List, HelpCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { PageVisibilityGuard } from '@/components/page-visibility-guard';

// Mapeamento de categorias para exibição
const categoryLabels = {
  RINGS: 'Anéis',
  NECKLACES: 'Colares',
  BRACELETS: 'Pulseiras',
  EARRINGS: 'Brincos',
  WATCHES: 'Relógios',
  ACCESSORIES: 'Acessórios',
};

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  mainImage: string | null;
  images: string[];
  stock: number;
  weight?: number;
  material?: string;
  size?: string;
  code: string;
  createdAt: string;
}

interface ApiResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Hook customizado para debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function ProntaEntregaContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [materialFilter, setMaterialFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [displayPriceRange, setDisplayPriceRange] = useState([0, 10000]);
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Filtros disponíveis (serão carregados dinamicamente)
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableMaterials, setAvailableMaterials] = useState<string[]>([]);
  const [priceStats, setPriceStats] = useState({ min: 0, max: 10000 });

  // Debounce para o slider de preço (500ms de delay)
  const debouncedPriceRange = useDebounce(displayPriceRange, 500);

  // Sincronizar o filtro aplicado com o valor debounced
  useEffect(() => {
    setPriceRange(debouncedPriceRange);
  }, [debouncedPriceRange]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/public/categories');
      if (response.ok) {
        const data = await response.json();
        const productCategories = data.categories.product
          .map((cat: any) => cat.id);
        setAvailableCategories(productCategories);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
      });

      if (categoryFilter !== 'all') {
        params.append('category', categoryFilter);
      }
      if (materialFilter !== 'all') {
        params.append('material', materialFilter);
      }
      if (stockFilter === 'inStock') {
        params.append('inStock', 'true');
      }

      const response = await fetch(`/api/public/products/ready-delivery?${params}`);
      if (response.ok) {
        const data: ApiResponse = await response.json();

        // Ordenar produtos
        let sortedProducts = [...data.products];
        switch (sortBy) {
          case 'priceAsc':
            sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
          case 'priceDesc':
            sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
            break;
          case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'newest':
          default:
            sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        }

        setProducts(sortedProducts);
        setPagination({
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
          hasNextPage: data.pagination.hasNextPage,
          hasPrevPage: data.pagination.hasPrevPage,
        });

        // Extrair materiais únicos e estatísticas de preço
        const materials = Array.from(new Set(data.products.map(p => p.material).filter(Boolean)));
        setAvailableMaterials(materials as string[]);

        if (data.products.length > 0) {
          const prices = data.products.map(p => p.price || 0).filter(price => price > 0);
          if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            // Adicionar padding se min e max são muito próximos
            const padding = Math.max(100, (maxPrice - minPrice) * 0.1);
            const safeMin = Math.max(0, minPrice - padding);
            const safeMax = maxPrice + padding;

            setPriceStats({
              min: safeMin,
              max: safeMax
            });

            // Atualizar ranges apenas na primeira carga (quando ainda estão nos valores padrão)
            if (priceRange[0] === 0 && priceRange[1] === 10000) {
              setPriceRange([safeMin, safeMax]);
              setDisplayPriceRange([safeMin, safeMax]);
            }
          }
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erro ao buscar produtos:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, materialFilter, stockFilter, sortBy, currentPage, priceRange]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filtrar produtos baseado na busca local e faixa de preço
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase());

    const productPrice = product.price || 0;
    const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];

    return matchesSearch && matchesPrice;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setCategoryFilter('all');
    setMaterialFilter('all');
    setPriceRange([priceStats.min, priceStats.max]);
    setDisplayPriceRange([priceStats.min, priceStats.max]);
    setStockFilter('all');
    setSortBy('newest');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#133629' }}>
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/assets/images/pronta-entrega-hero.webp')`
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-philosopher font-bold leading-none mb-6 text-marfim">
              <span className="block text-[clamp(40px,5vw+16px,64px)] text-ouro">Pronta</span>
              <span className="block text-[clamp(32px,4vw+12px,56px)]">Entrega</span>
            </h1>
            <p className="font-montserrat text-xl text-marfim-dark leading-relaxed">
              Peças exclusivas prontas para entrega imediata. Joias de alta qualidade
              que você pode levar hoje mesmo.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6 font-montserrat text-marfim-dark">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-ouro" />
                <span>Entrega Rápida</span>
              </div>
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-ouro" />
                <span>Estoque Disponível</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-ouro" />
                <span>Alta Qualidade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros e Produtos */}
      <section className="py-12 bg-marfim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barra de Busca e Controles */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                    <SelectItem value="priceAsc">Menor Preço</SelectItem>
                    <SelectItem value="priceDesc">Maior Preço</SelectItem>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 font-montserrat text-sm text-gray-600 flex items-center justify-between">
              <span>
                {loading ? 'Carregando...' : `${pagination.total} produto${pagination.total !== 1 ? 's' : ''} encontrado${pagination.total !== 1 ? 's' : ''}`}
              </span>
              {(categoryFilter !== 'all' || materialFilter !== 'all' || stockFilter !== 'all' || searchTerm ||
                priceRange[0] !== priceStats.min || priceRange[1] !== priceStats.max) && (
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="font-montserrat">
                    Limpar Filtros
                  </Button>
                )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar com Filtros */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center font-jost font-semibold">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Categoria */}
                  <div>
                    <label className="font-jost text-sm font-semibold text-gray-700 mb-2 block">
                      Categoria
                    </label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {availableCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {categoryLabels[category as keyof typeof categoryLabels] || category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Material */}
                  <div>
                    <label className="font-jost text-sm font-semibold text-gray-700 mb-2 block">
                      Material
                    </label>
                    <Select value={materialFilter} onValueChange={setMaterialFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os materiais</SelectItem>
                        {availableMaterials.map(material => (
                          <SelectItem key={material} value={material}>
                            {material}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Faixa de Preço */}
                  <div>
                    <div className="flex items-center mb-3">
                      <label className="font-jost text-sm font-semibold text-gray-700">
                        Faixa de Preço
                      </label>
                      <div className="relative ml-2 group">
                        <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          Arraste as extremidades para definir preço mínimo e máximo
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                        </div>
                      </div>
                    </div>

                    <div className="px-3">
                      <Slider
                        value={displayPriceRange}
                        onValueChange={setDisplayPriceRange}
                        max={priceStats.max}
                        min={priceStats.min}
                        step={50}
                        className="mb-4"
                      />

                      <div className="flex justify-between text-sm font-medium text-gray-700">
                        <span>R$ {Math.round(displayPriceRange[0]).toLocaleString()}</span>
                        <span>R$ {Math.round(displayPriceRange[1]).toLocaleString()}</span>
                      </div>

                      <div className="text-center mt-3 font-montserrat">
                        {(displayPriceRange[0] !== priceRange[0] || displayPriceRange[1] !== priceRange[1]) ? (
                          <span className="text-xs text-blue-600">Filtrando...</span>
                        ) : (
                          <span className="text-xs text-green-600">
                            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} nesta faixa
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Disponibilidade */}
                  <div>
                    <label className="font-jost text-sm font-semibold text-gray-700 mb-2 block">
                      Disponibilidade
                    </label>
                    <Select value={stockFilter} onValueChange={setStockFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os produtos</SelectItem>
                        <SelectItem value="inStock">Apenas em estoque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grid de Produtos */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center min-h-96">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-esmeralda mx-auto"></div>
                    <p className="mt-2 font-montserrat text-gray-600">Carregando produtos...</p>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-philosopher text-lg font-bold text-gray-900 mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="font-montserrat text-gray-600 mb-4">
                    {searchTerm
                      ? `Não encontramos produtos que correspondam a "${searchTerm}"`
                      : 'Ainda não há produtos disponíveis para pronta entrega'
                    }
                  </p>
                  <Button onClick={resetFilters} variant="outline" className="font-montserrat">
                    Limpar Filtros
                  </Button>
                </div>
              ) : (
                <>
                  <div className={viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                  }>
                    {filteredProducts.map((product) => (
                      <Link href={`/pronta-entrega/${product.id}`} key={product.id} className="group">
                        {viewMode === 'grid' ? (
                          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-64 overflow-hidden">
                              <Image
                                src={product.mainImage || '/assets/images/home-hero.webp'}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/assets/images/home-hero.webp';
                                }}
                              />
                              <div className="absolute top-4 left-4">
                                <Badge variant="secondary" className="bg-ouro text-esmeralda">
                                  {categoryLabels[product.category as keyof typeof categoryLabels] || product.category}
                                </Badge>
                              </div>
                              {product.stock <= 5 && product.stock > 0 && (
                                <div className="absolute top-4 right-4">
                                  <Badge variant="destructive">
                                    Últimas unidades
                                  </Badge>
                                </div>
                              )}
                              {product.stock === 0 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <Badge variant="secondary">Sem estoque</Badge>
                                </div>
                              )}
                            </div>

                            <CardContent className="p-6">
                              <h3 className="font-philosopher text-lg font-bold text-esmeralda mb-2 group-hover:text-ouro transition-colors">
                                {product.name}
                              </h3>
                              <p className="font-montserrat text-sm text-gray-600 mb-3 line-clamp-2">
                                {product.description || 'Produto de alta qualidade disponível para pronta entrega.'}
                              </p>

                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-philosopher text-2xl font-bold text-esmeralda">
                                    R$ {(product.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </p>
                                  {product.material && (
                                    <p className="font-montserrat text-xs text-gray-500">{product.material}</p>
                                  )}
                                </div>
                                <div className="text-right font-montserrat">
                                  <p className="text-xs text-gray-500">Código: {product.code}</p>
                                  <p className="text-xs text-gray-500">
                                    Estoque: {product.stock} {product.stock === 1 ? 'unidade' : 'unidades'}
                                  </p>
                                </div>
                              </div>

                              <Button
                                className="w-full mt-4 font-montserrat bg-ouro text-esmeralda hover:bg-ouro-light"
                                disabled={product.stock === 0}
                              >
                                {product.stock === 0 ? 'Sem Estoque' : 'Ver Detalhes'}
                              </Button>
                            </CardContent>
                          </Card>
                        ) : (
                          // List View
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="flex">
                              <div className="relative w-32 h-32 flex-shrink-0">
                                <Image
                                  src={product.mainImage || '/assets/images/home-hero.webp'}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="128px"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/assets/images/home-hero.webp';
                                  }}
                                />
                              </div>
                              <CardContent className="flex-1 p-6">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h3 className="font-philosopher text-lg font-bold text-esmeralda group-hover:text-ouro transition-colors">
                                        {product.name}
                                      </h3>
                                      <Badge variant="secondary" className="bg-ouro text-esmeralda text-xs">
                                        {categoryLabels[product.category as keyof typeof categoryLabels] || product.category}
                                      </Badge>
                                    </div>
                                    <p className="font-montserrat text-sm text-gray-600 mb-2">
                                      {product.description || 'Produto de alta qualidade disponível para pronta entrega.'}
                                    </p>
                                    <div className="flex items-center space-x-4 font-montserrat text-xs text-gray-500">
                                      <span>Código: {product.code}</span>
                                      {product.material && <span>Material: {product.material}</span>}
                                      <span>Estoque: {product.stock}</span>
                                    </div>
                                  </div>
                                  <div className="text-right ml-4">
                                    <p className="font-philosopher text-2xl font-bold text-esmeralda">
                                      R$ {(product.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                    <Button
                                      size="sm"
                                      className="mt-2 font-montserrat bg-ouro text-esmeralda hover:bg-ouro-light"
                                      disabled={product.stock === 0}
                                    >
                                      {product.stock === 0 ? 'Sem Estoque' : 'Ver Detalhes'}
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </div>
                          </Card>
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Paginação */}
                  {pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                        className="font-montserrat border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim"
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
                              ? "font-montserrat bg-esmeralda text-marfim"
                              : "font-montserrat border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim"
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
                        className="font-montserrat border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim"
                      >
                        Próxima
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProntaEntregaPage() {
  return (
    <PageVisibilityGuard pageSlug="pronta-entrega">
      <ProntaEntregaContent />
    </PageVisibilityGuard>
  );
} 