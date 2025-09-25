'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Eye,
  Clock,
  ChevronDown,
  X,
  SlidersHorizontal,
  Sparkles,
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
      <div className="min-h-screen bg-marfim">
      <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#04160f] py-20 text-marfim">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-center sm:px-6">
          <span className="inline-flex mx-auto w-fit items-center gap-2 rounded-full border border-marfim/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-marfim/70">
            Nosso trabalho em foco
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-semibold leading-tight">
            Portfólio de <span className="text-ouro">joias e restaurações</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-marfim/75">
            Conheça projetos recentes: alianças personalizadas, restaurações com memória afetiva e renovações de peças queridas. Filtre por categoria para encontrar o que mais combina com você.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-esmeralda/10 bg-white p-6 shadow-[0_25px_60px_-38px_rgba(24,68,52,0.35)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-esmeralda/20 bg-esmeralda/5 px-4 py-2">
              <Search className="h-4 w-4 text-esmeralda" />
              <Input
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Busque por nome ou descrição"
                className="border-none bg-transparent text-sm text-esmeralda placeholder:text-esmeralda/60 focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                className={viewMode === 'grid' ? 'bg-esmeralda text-marfim' : 'border-esmeralda/30 text-esmeralda'}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                className={viewMode === 'list' ? 'bg-esmeralda text-marfim' : 'border-esmeralda/30 text-esmeralda'}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-esmeralda/30 text-esmeralda"
                onClick={() => setIsFilterDialogOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-wrap gap-2">
              <Badge
                onClick={() => handleCategoryChange('all')}
                className={`cursor-pointer border transition-colors duration-200 ${selectedCategory === 'all'
                  ? 'bg-esmeralda text-marfim border-transparent hover:bg-esmeralda'
                  : 'bg-white text-esmeralda border-esmeralda/20 hover:bg-white'}`}
              >
                Todos
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`cursor-pointer border transition-colors duration-200 ${selectedCategory === category
                    ? 'bg-esmeralda text-marfim border-transparent hover:bg-esmeralda'
                    : 'bg-white text-esmeralda border-esmeralda/20 hover:bg-white'}`}
                >
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.28em] text-esmeralda/60">Organizar por</span>
              <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                <SelectTrigger className="w-[160px] border-esmeralda/20 text-esmeralda">
                  <SelectValue placeholder="Mais recentes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-end text-sm text-esmeralda/70">
              {pagination.total > 0 && (
                <p>
                  Exibindo {filteredItems.length} de {pagination.total} projetos
                </p>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <span className="text-sm text-esmeralda/70">Carregando portfólio…</span>
            </div>
          ) : error ? (
            <div className="flex h-48 flex-col items-center justify-center gap-3">
              <p className="text-sm text-red-500">{error}</p>
              <Button onClick={() => setCurrentPage(1)} variant="outline" className="border-red-200 text-red-600">
                Tentar novamente
              </Button>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm text-esmeralda/70">
                Nenhum projeto encontrado com os filtros atuais.
              </p>
              <Button onClick={() => handleCategoryChange('all')} variant="outline" className="border-esmeralda/30 text-esmeralda">
                Limpar filtros
              </Button>
            </div>
          ) : (
            <motion.div
              key={viewMode + selectedCategory + searchTerm + dateFilter + currentPage}
              className={viewMode === 'grid' ? 'mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'mt-10 space-y-6'}
              layout
            >
              {filteredItems.map((item) => (
                <motion.div key={item.id} layout>
                  <Link href={`/portfolio/${generatePortfolioSlug(item, item.id)}`}>
                    <div
                      className={`group h-full rounded-3xl border border-esmeralda/10 bg-white/90 text-left shadow-[0_25px_60px_-40px_rgba(24,68,52,0.3)] transition-transform duration-500 hover:-translate-y-2 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}
                    >
                      <div className={viewMode === 'list' ? 'relative h-56 w-full md:w-64 overflow-hidden rounded-3xl md:rounded-l-3xl md:rounded-r-none' : 'relative h-64 overflow-hidden rounded-t-3xl'}>
                        <Image
                          src={item.mainImage || '/assets/images/placeholder-jewelry.svg'}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white">
                          <Clock className="h-3 w-3" />
                          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      <div className={viewMode === 'list' ? 'flex flex-1 flex-col justify-between px-6 py-5' : 'space-y-4 px-6 py-6'}>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-esmeralda/10 text-esmeralda border-esmeralda/10 hover:bg-esmeralda/10">
                              {categoryLabels[item.category as keyof typeof categoryLabels] || item.category}
                            </Badge>
                          </div>
                          <h2 className="font-playfair text-xl font-semibold text-esmeralda group-hover:text-ouro transition-colors">
                            {item.title}
                          </h2>
                          {item.description && (
                            <p className="text-sm text-grafite/70 line-clamp-3">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-esmeralda/60">
                          <span>Ver detalhes</span>
                          <Eye className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {pagination.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="border-esmeralda/20 text-esmeralda hover:border-esmeralda hover:text-esmeralda disabled:opacity-50"
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
                    ? 'bg-esmeralda text-marfim hover:bg-esmeralda-dark'
                    : 'border-esmeralda/20 text-esmeralda hover:border-esmeralda hover:text-esmeralda'}
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
              className="border-esmeralda/20 text-esmeralda hover:border-esmeralda hover:text-esmeralda disabled:opacity-50"
            >
              Próxima
            </Button>
          </div>
        )}
      </section>
      </div>
    </PageVisibilityGuard>
  );
}
