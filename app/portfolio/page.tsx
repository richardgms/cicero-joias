'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Grid3X3,
  List,
  Eye,
  Clock,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generatePortfolioSlug } from '@/lib/slug-utils';
import { PageVisibilityGuard } from '@/components/page-visibility-guard';

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

interface CategoriesResponse {
  categories?: {
    portfolio?: Array<{ id: string }>;
  };
}

const INITIAL_PAGINATION = {
  total: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dateFilter, setDateFilter] = useState<string>('recent');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const [itemsResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/public/portfolio?page=${currentPage}&limit=9`),
          fetch('/api/public/categories'),
        ]);

        if (!itemsResponse.ok) {
          throw new Error('Não foi possível carregar o portfólio no momento.');
        }

        const itemsData: ApiResponse = await itemsResponse.json();
        setItems(itemsData.portfolioItems || []);
        setFilteredItems(itemsData.portfolioItems || []);
        setPagination(itemsData.pagination || INITIAL_PAGINATION);

        if (categoriesResponse.ok) {
          const categoriesData: CategoriesResponse = await categoriesResponse.json();
          if (categoriesData.categories?.portfolio) {
            const availableCategories = categoriesData.categories.portfolio
              .map((category) => category.id)
              .filter(Boolean);
            setCategories(availableCategories);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar o portfólio.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, [currentPage]);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.description?.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateFilter === 'recent' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [items, selectedCategory, searchTerm, dateFilter]);

  useEffect(() => {
    setFilteredItems(filteredAndSortedItems);
  }, [filteredAndSortedItems]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <PageVisibilityGuard pageSlug="portfolio">
      <div className="min-h-screen bg-surface-page">
        {/* Hero Section - Matching Services Page Structure */}
        <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-esmeralda-deep pt-10 pb-24 text-text-on-dark">
          <div className="absolute inset-0">
            {/* Uses a conceptual placeholder or specific background logic if needed, 
                 using plain gradients to match Services page style exactly */}
            <div className="absolute inset-0 bg-gradient-to-b from-esmeralda-deep/70 via-esmeralda-deep/60 to-esmeralda-deep/90" />
            <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-action-strong/20 blur-[120px]" />
            <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-esmeralda-light/10 blur-[140px]" />
          </div>

          <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex mx-auto w-fit items-center gap-2 rounded-full border border-text-on-dark/30 bg-white/10 px-4 py-1 font-jost text-xs font-semibold uppercase tracking-[0.3em] text-text-on-dark/80">
              Nosso trabalho em foco
            </span>
            <h1 className="font-philosopher font-bold leading-none">
              <span className="block text-[clamp(40px,5vw+16px,64px)]">Portfólio de</span>
              <span className="block text-[clamp(32px,4vw+12px,56px)] text-action-strong">Joias e Restaurações</span>
            </h1>
            <p className="mx-auto max-w-2xl font-montserrat text-lg text-text-on-dark/90 leading-relaxed">
              Conheça projetos recentes: alianças personalizadas, restaurações com memória afetiva e renovações de peças queridas. Filtre por categoria para encontrar o que mais combina com você.
            </p>
          </div>
        </section>

        {/* Content Section - Overlapping Wrapper Matching Services Page */}
        <section className="relative -mt-16 rounded-t-[48px] bg-surface-page pb-24 pt-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            {/* Filters Container - Embedded similar to Services Grid Header */}
            <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-white/60 bg-surface-card p-6 shadow-card backdrop-blur-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-3 rounded-full border border-action-primary/10 bg-white/50 px-4 py-2">
                  <Search className="h-4 w-4 text-action-primary" />
                  <Input
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Busque por nome ou descrição"
                    className="border-none bg-transparent text-sm text-text-primary placeholder:text-text-secondary/50 focus-visible:ring-0"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    className={viewMode === 'grid' ? 'bg-action-primary text-text-on-dark' : 'border-action-primary/20 text-action-primary hover:bg-action-primary/5'}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    className={viewMode === 'list' ? 'bg-action-primary text-text-on-dark' : 'border-action-primary/20 text-action-primary hover:bg-action-primary/5'}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-action-primary/20 text-action-primary hover:bg-action-primary/5"
                    onClick={() => setIsFilterDialogOpen(true)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-wrap gap-2 md:col-span-2">
                  <Badge
                    onClick={() => handleCategoryChange('all')}
                    className={`cursor-pointer border transition-colors duration-200 ${selectedCategory === 'all'
                      ? 'bg-action-primary text-text-on-dark border-transparent hover:bg-action-primary-hover'
                      : 'bg-surface-subtle text-text-primary border-action-primary/10 hover:bg-action-primary/5'}`}
                  >
                    Todos
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`cursor-pointer border transition-colors duration-200 ${selectedCategory === category
                        ? 'bg-action-primary text-text-on-dark border-transparent hover:bg-action-primary-hover'
                        : 'bg-surface-subtle text-text-primary border-action-primary/10 hover:bg-action-primary/5'}`}
                    >
                      {categoryLabels[category as keyof typeof categoryLabels] || category}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <span className="font-jost text-xs font-semibold uppercase tracking-wide text-text-secondary/70">Organizar por</span>
                  <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                    <SelectTrigger className="w-[160px] border-action-primary/20 text-text-primary bg-white/50">
                      <SelectValue placeholder="Mais recentes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Mais recentes</SelectItem>
                      <SelectItem value="oldest">Mais antigas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-end font-montserrat text-xs text-text-secondary/60">
                {pagination.total > 0 && (
                  <p>Exibindo {filteredItems.length} de {pagination.total} projetos</p>
                )}
              </div>
            </div>

            {/* Content Grid */}
            <AnimatePresence initial={false}>
              {loading ? (
                <div className="flex h-48 items-center justify-center">
                  <span className="font-montserrat text-sm text-text-secondary/70">Carregando portfólio...</span>
                </div>
              ) : error ? (
                <div className="flex h-48 flex-col items-center justify-center gap-3">
                  <p className="font-montserrat text-sm text-red-500">{error}</p>
                  <Button onClick={() => setCurrentPage(1)} variant="outline" className="font-montserrat border-red-200 text-red-600">
                    Tentar novamente
                  </Button>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center gap-3 text-center">
                  <p className="font-montserrat text-sm text-text-secondary/70">
                    Nenhum projeto encontrado com os filtros atuais.
                  </p>
                  <Button onClick={() => handleCategoryChange('all')} variant="outline" className="font-montserrat border-action-primary/30 text-action-primary">
                    Limpar filtros
                  </Button>
                </div>
              ) : (
                <motion.div
                  key={viewMode + selectedCategory + searchTerm + dateFilter + currentPage}
                  className={viewMode === 'grid' ? 'grid gap-8 md:grid-cols-2 lg:grid-cols-3' : 'space-y-6'}
                  layout
                >
                  {filteredItems.map((item) => (
                    <motion.div key={item.id} layout>
                      {/* Uses Card Design matching Services Page but adapted for Image content */}
                      <Link href={`/portfolio/${generatePortfolioSlug({
                        title: item.title,
                        category: item.category,
                        id: item.id
                      })}`}>
                        <div
                          className={`group h-full rounded-3xl border border-white/60 bg-surface-card p-4 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover hover:border-action-primary/20 hover:bg-white ${viewMode === 'list' ? 'flex flex-col md:flex-row gap-6 p-6' : ''}`}
                        >
                          <div className={viewMode === 'list' ? 'relative h-56 w-full md:w-64 overflow-hidden rounded-2xl md:rounded-l-2xl md:rounded-r-lg' : 'relative aspect-[4/3] w-full overflow-hidden rounded-2xl'}>
                            <Image
                              src={item.mainImage || '/assets/images/placeholder-jewelry.svg'}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 font-jost text-xs font-semibold uppercase tracking-wide text-white">
                              <Clock className="h-3 w-3" />
                              {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                          </div>

                          <div className={viewMode === 'list' ? 'flex flex-1 flex-col justify-between' : 'flex flex-col justify-between pt-6'}>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-action-primary/5 text-action-primary border-transparent group-hover:bg-action-strong/10 group-hover:text-action-strong transition-colors">
                                  {categoryLabels[item.category as keyof typeof categoryLabels] || item.category}
                                </Badge>
                              </div>
                              <h3 className="font-philosopher text-xl font-bold text-text-primary group-hover:text-action-primary transition-colors line-clamp-2">
                                {item.title}
                              </h3>
                              {(item.description && viewMode === 'list') && (
                                <p className="font-montserrat text-sm text-text-secondary/70 line-clamp-2">{item.description}</p>
                              )}
                            </div>

                            <div className="mt-4 flex items-center justify-between font-jost text-sm font-semibold uppercase tracking-widest text-action-strong group-hover:text-action-primary transition-colors">
                              <span>Ver detalhes</span>
                              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="font-montserrat border-action-primary/20 text-action-primary hover:border-action-primary hover:text-action-primary disabled:opacity-50"
                >
                  Anterior
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      onClick={() => handlePageChange(page)}
                      className={page === currentPage
                        ? 'font-montserrat bg-action-primary text-text-on-dark hover:bg-action-primary-hover'
                        : 'font-montserrat border-action-primary/20 text-action-primary hover:border-action-primary hover:text-action-primary'}
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
                  className="font-montserrat border-action-primary/20 text-action-primary hover:border-action-primary hover:text-action-primary disabled:opacity-50"
                >
                  Próxima
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section - Matching Home/Services CTA but with Portfolio Context */}
        <section className="relative overflow-hidden bg-esmeralda-deep py-24 text-text-on-dark">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -right-12 top-0 h-48 w-48 rounded-full bg-action-strong/20 blur-[120px]" />
            <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-esmeralda-light/20 blur-[140px]" />
          </div>
          {/* Blend Gradient */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface-page/5 to-transparent opacity-10" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-text-on-dark/20 bg-white/5 px-4 py-1 font-jost text-xs font-semibold uppercase tracking-[0.3em] text-text-on-dark/70">
              Gostou do que viu?
            </span>
            <h2 className="font-philosopher font-bold text-[clamp(28px,4vw+10px,42px)]">
              Sua joia também pode contar uma história
            </h2>
            <p className="max-w-2xl font-montserrat text-sm text-text-on-dark/75 leading-relaxed">
              Cada peça que você viu aqui começou com uma conversa. Que tal começarmos a sua? Entre em contato para restaurar uma herança ou criar algo novo.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://wa.me/5583991180251"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-action-strong px-8 py-3 font-jost text-sm font-bold uppercase tracking-[0.2em] text-text-on-brand shadow-button-primary transition-all duration-300 hover:bg-action-strong-hover hover:scale-105 hover:-translate-y-1"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageVisibilityGuard>
  );
}
