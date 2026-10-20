'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Grid3X3,
    List,
    Clock,
    SlidersHorizontal,
    ArrowRight,
    Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { generatePortfolioSlug } from '@/lib/slug-utils';

const categoryLabels: Record<string, string> = {
    WEDDING_RINGS: 'Alianças de Casamento',
    REPAIRS_BEFORE_AFTER: 'Consertos (Antes/Depois)',
    GOLD_PLATING: 'Banho de Ouro',
    CUSTOM_JEWELRY: 'Joias Personalizadas',
    GRADUATION_RINGS: 'Anéis de Formatura',
};

export interface PortfolioListItem {
    id: string;
    title: string;
    description: string | null;
    category: string;
    mainImage: string;
    createdAt: string;
}

interface PortfolioListingProps {
    initialItems: PortfolioListItem[];
    categories: string[];
    totalCount: number;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 50, damping: 20 },
    },
};

export function PortfolioListing({ initialItems, categories, totalCount }: PortfolioListingProps) {
    const [items, setItems] = useState<PortfolioListItem[]>(initialItems);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [dateFilter, setDateFilter] = useState<string>('recent');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const ITEMS_PER_PAGE = 9;

    // Client-side filtering and sorting
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

    // Paginate the filtered results
    const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE);
    const paginatedItems = filteredAndSortedItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm, dateFilter]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll to top of content
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-surface-page">
            {/* Hero Section */}
            <Section
                id="portfolio-hero"
                tone="dark"
                spacing="none"
                className="overflow-hidden pb-32 pt-16"
                aria-labelledby="portfolio-hero-title"
            >
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <Image
                        src="/assets/images/portfolio-hero.webp"
                        alt=""
                        fill
                        className="object-cover opacity-20"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/70 to-surface-dark/90" />
                    <div className="absolute -right-8 -top-16 h-80 w-80 rounded-full bg-action-on-dark/10 blur-3xl" />
                    <div className="absolute -bottom-16 -left-8 h-72 w-72 rounded-full bg-action-primary/20 blur-3xl" />
                </div>

                <Container size="md" className="relative z-10">
                    <SectionHeading
                        as="h1"
                        align="center"
                        tone="dark"
                        titleId="portfolio-hero-title"
                        eyebrow={
                            <Badge variant="dark" className="gap-2">
                                <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                                Nosso trabalho em foco
                            </Badge>
                        }
                        title={
                            <>
                                Portfólio de{' '}
                                <span className="block text-action-on-dark">Joias e Restaurações</span>
                            </>
                        }
                        description="Conheça projetos recentes: alianças personalizadas, restaurações com memória afetiva e renovações de peças queridas."
                    />
                </Container>
            </Section>

            {/* Content Section */}
            <Section tone="light" spacing="none" className="relative z-10 -mt-16 rounded-t-3xl pb-24 pt-20">
                <Container>

                    {/* Filters Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 flex flex-col gap-6 rounded-3xl border border-border-default bg-surface-card p-6 shadow-card backdrop-blur-sm"
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-1 items-center gap-3 rounded-full border border-action-strong/20 bg-white/50 px-4 py-2 transition-colors focus-within:border-action-strong/50">
                                <Search className="h-4 w-4 text-action-strong" />
                                <Input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Busque por nome ou descrição"
                                    className="border-none bg-transparent text-sm text-text-primary placeholder:text-text-secondary/50 focus-visible:ring-0"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                                    size="sm"
                                    className={viewMode === 'grid' ? 'bg-action-primary text-text-on-dark shadow-sm' : 'border-border-default text-text-secondary hover:bg-surface-subtle'}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'outline'}
                                    size="sm"
                                    className={viewMode === 'list' ? 'bg-action-primary text-text-on-dark shadow-sm' : 'border-border-default text-text-secondary hover:bg-surface-subtle'}
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-border-default text-text-secondary hover:bg-surface-subtle group"
                                >
                                    <SlidersHorizontal className="h-4 w-4 mr-2 text-action-strong" />
                                    Filtros
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex flex-wrap gap-2 md:col-span-2">
                                <Badge
                                    onClick={() => handleCategoryChange('all')}
                                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                    className="cursor-pointer"
                                >
                                    Todos
                                </Badge>
                                {categories.map((category) => (
                                    <Badge
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        variant={selectedCategory === category ? 'default' : 'outline'}
                                        className="cursor-pointer"
                                    >
                                        {categoryLabels[category] || category}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center justify-end gap-2">
                                <span className="font-sans text-xs font-semibold uppercase tracking-wide text-text-secondary/70">Organizar por</span>
                                <Select value={dateFilter} onValueChange={setDateFilter}>
                                    <SelectTrigger className="w-[160px] border-action-strong/20 text-text-primary bg-white/50 focus:ring-action-strong/30">
                                        <SelectValue placeholder="Mais recentes" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="recent">Mais recentes</SelectItem>
                                        <SelectItem value="oldest">Mais antigas</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center justify-end font-sans text-xs text-text-secondary/60">
                            {filteredAndSortedItems.length > 0 && (
                                <p>Exibindo {paginatedItems.length} de {filteredAndSortedItems.length} projetos</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Content Grid */}
                    <AnimatePresence initial={false}>
                        {paginatedItems.length === 0 ? (
                            <div className="flex h-48 flex-col items-center justify-center gap-3 text-center">
                                <p className="font-sans text-sm text-text-secondary/70">
                                    Nenhum projeto encontrado com os filtros atuais.
                                </p>
                                <Button onClick={() => handleCategoryChange('all')} variant="outline" className="border-action-strong/30 text-action-strong">
                                    Limpar filtros
                                </Button>
                            </div>
                        ) : (
                            <motion.div
                                key={viewMode + selectedCategory + searchTerm + dateFilter + currentPage}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className={viewMode === 'grid' ? 'grid gap-8 md:grid-cols-2 lg:grid-cols-3' : 'space-y-6'}
                                layout
                            >
                                {paginatedItems.map((item) => (
                                    <motion.div key={item.id} variants={itemVariants} layout>
                                        <Link
                                            href={`/portfolio/${generatePortfolioSlug({
                                                title: item.title,
                                                category: item.category,
                                                id: item.id
                                            })}`}
                                            className="block h-full"
                                        >
                                            <Card
                                                variant="light"
                                                interactive
                                                className={`group h-full p-4 hover:border-action-strong ${viewMode === 'list' ? 'flex flex-col gap-6 p-6 md:flex-row' : ''}`}
                                            >
                                                <div className={viewMode === 'list' ? 'relative h-56 w-full md:w-64 overflow-hidden rounded-2xl md:rounded-l-2xl md:rounded-r-lg' : 'relative aspect-[4/3] w-full overflow-hidden rounded-2xl'}>
                                                    <Image
                                                        src={item.mainImage || '/assets/images/placeholder-jewelry.svg'}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                                    <div className="absolute bottom-3 left-3 flex items-center gap-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                                                            <Clock className="h-3 w-3" />
                                                            <span className="font-numeric">{formatDate(item.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={viewMode === 'list' ? 'flex flex-1 flex-col justify-between' : 'flex flex-col justify-between pt-6'}>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="gold">
                                                                {categoryLabels[item.category] || item.category}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="font-heading text-xl font-bold text-text-primary transition-colors group-hover:text-action-strong line-clamp-2">
                                                            {item.title}
                                                        </h3>
                                                        {(item.description && viewMode === 'list') && (
                                                            <p className="font-sans text-sm text-text-secondary/70 line-clamp-2">{item.description}</p>
                                                        )}
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between border-t border-transparent pt-4 font-sans text-xs font-bold uppercase tracking-widest text-action-strong transition-colors group-hover:border-action-strong/10">
                                                        <span>Ver detalhes</span>
                                                        <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-16 flex items-center justify-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                                className="border-border-default text-text-secondary hover:border-action-strong hover:text-action-strong disabled:opacity-50"
                                size="sm"
                            >
                                Anterior
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === currentPage ? 'default' : 'outline'}
                                        onClick={() => handlePageChange(page)}
                                        className={`font-numeric ${page === currentPage
                                            ? 'bg-action-primary text-text-on-dark hover:bg-action-primary-hover shadow-button-primary'
                                            : 'border-border-default text-text-secondary hover:border-action-strong hover:text-action-strong'}`}
                                        size="sm"
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                                className="border-border-default text-text-secondary hover:border-action-strong hover:text-action-strong disabled:opacity-50"
                                size="sm"
                            >
                                Próxima
                            </Button>
                        </div>
                    )}
                </Container>
            </Section>
        </div>
    );
}
