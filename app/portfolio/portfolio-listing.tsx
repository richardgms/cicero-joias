'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    images: string[];
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
            <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda info-esmeralda-dark via-esmeralda to-esmeralda-deep pt-16 pb-32 text-text-on-dark">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-esmeralda-deep/80 via-esmeralda-deep/70 to-esmeralda-deep/90" />
                    <div className="absolute inset-0 bg-[url('/assets/noise.webp')] opacity-[0.03] mix-blend-overlay" />
                    <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-action-strong/10 blur-[120px]" />
                    <div className="absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-esmeralda-light/10 blur-[140px]" />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 text-center sm:px-6 lg:px-8"
                >
                    <motion.div variants={itemVariants} className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-lg">
                        <Star className="w-3 h-3 text-ouro fill-ouro" />
                        <span className="font-jost text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ouro/90">
                            Nosso trabalho em foco
                        </span>
                    </motion.div>

                    <h1 className="font-philosopher font-bold leading-tight">
                        <motion.span variants={itemVariants} className="block text-[clamp(40px,5vw+16px,64px)] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 filter drop-shadow-2xl">
                            Portfólio de
                        </motion.span>
                        <motion.span variants={itemVariants} className="block text-[clamp(32px,4vw+12px,56px)] text-ouro/90 filter drop-shadow-lg">
                            Joias e Restaurações
                        </motion.span>
                    </h1>

                    <motion.p variants={itemVariants} className="mx-auto max-w-2xl font-montserrat text-base md:text-lg text-white/75 leading-relaxed">
                        Conheça projetos recentes: alianças personalizadas, restaurações com memória afetiva e renovações de peças queridas.
                    </motion.p>
                </motion.div>
            </section>

            {/* Content Section */}
            <section className="relative -mt-16 rounded-t-[48px] bg-surface-page pb-24 pt-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                    {/* Filters Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 flex flex-col gap-6 rounded-3xl border border-ouro/10 bg-surface-card p-6 shadow-card backdrop-blur-sm"
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-1 items-center gap-3 rounded-full border border-ouro/20 bg-white/50 px-4 py-2 transition-colors focus-within:border-ouro/50">
                                <Search className="h-4 w-4 text-ouro" />
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
                                    className={viewMode === 'grid' ? 'bg-action-primary text-text-on-dark shadow-sm' : 'border-ouro/20 text-text-secondary hover:bg-ouro/10'}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'outline'}
                                    size="sm"
                                    className={viewMode === 'list' ? 'bg-action-primary text-text-on-dark shadow-sm' : 'border-ouro/20 text-text-secondary hover:bg-ouro/10'}
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-ouro/20 text-text-secondary hover:bg-ouro/10 group"
                                >
                                    <SlidersHorizontal className="h-4 w-4 mr-2 text-ouro" />
                                    Filtros
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex flex-wrap gap-2 md:col-span-2">
                                <Badge
                                    onClick={() => handleCategoryChange('all')}
                                    className={`cursor-pointer border transition-all duration-300 ${selectedCategory === 'all'
                                        ? 'bg-action-primary text-text-on-dark border-transparent shadow-sm'
                                        : 'bg-white/50 text-text-secondary border-ouro/20 hover:bg-ouro/10 hover:border-ouro/40'}`}
                                >
                                    Todos
                                </Badge>
                                {categories.map((category) => (
                                    <Badge
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`cursor-pointer border transition-all duration-300 ${selectedCategory === category
                                            ? 'bg-action-primary text-text-on-dark border-transparent shadow-sm'
                                            : 'bg-white/50 text-text-secondary border-ouro/20 hover:bg-ouro/10 hover:border-ouro/40'}`}
                                    >
                                        {categoryLabels[category] || category}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center justify-end gap-2">
                                <span className="font-jost text-xs font-semibold uppercase tracking-wide text-text-secondary/70">Organizar por</span>
                                <Select value={dateFilter} onValueChange={setDateFilter}>
                                    <SelectTrigger className="w-[160px] border-ouro/20 text-text-primary bg-white/50 focus:ring-ouro/30">
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
                            {filteredAndSortedItems.length > 0 && (
                                <p>Exibindo {paginatedItems.length} de {filteredAndSortedItems.length} projetos</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Content Grid */}
                    <AnimatePresence initial={false}>
                        {paginatedItems.length === 0 ? (
                            <div className="flex h-48 flex-col items-center justify-center gap-3 text-center">
                                <p className="font-montserrat text-sm text-text-secondary/70">
                                    Nenhum projeto encontrado com os filtros atuais.
                                </p>
                                <Button onClick={() => handleCategoryChange('all')} variant="outline" className="font-montserrat border-ouro/30 text-ouro">
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
                                        <Link href={`/portfolio/${generatePortfolioSlug({
                                            title: item.title,
                                            category: item.category,
                                            id: item.id
                                        })}`}>
                                            <div
                                                className={`group h-full rounded-3xl border border-ouro/15 bg-surface-card p-4 shadow-card transition-all duration-500 hover:border-ouro/50 hover:shadow-card-hover hover:-translate-y-1 hover:bg-white ${viewMode === 'list' ? 'flex flex-col md:flex-row gap-6 p-6' : ''}`}
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
                                                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-jost text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                                                            <Clock className="h-3 w-3" />
                                                            {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={viewMode === 'list' ? 'flex flex-1 flex-col justify-between' : 'flex flex-col justify-between pt-6'}>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <Badge className="bg-ouro/10 text-ouro border-transparent group-hover:bg-ouro/20 transition-colors">
                                                                {categoryLabels[item.category] || item.category}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="font-philosopher text-xl font-bold text-text-primary group-hover:text-ouro transition-colors line-clamp-2">
                                                            {item.title}
                                                        </h3>
                                                        {(item.description && viewMode === 'list') && (
                                                            <p className="font-montserrat text-sm text-text-secondary/70 line-clamp-2">{item.description}</p>
                                                        )}
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between font-jost text-xs font-bold uppercase tracking-widest text-ouro border-t border-transparent pt-4 group-hover:border-ouro/10 transition-colors">
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
                    {totalPages > 1 && (
                        <div className="mt-16 flex items-center justify-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                                className="font-montserrat border-ouro/20 text-text-secondary hover:border-ouro hover:text-ouro disabled:opacity-50"
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
                                        className={page === currentPage
                                            ? 'font-montserrat bg-action-primary text-text-on-dark hover:bg-action-primary-hover shadow-button-primary'
                                            : 'font-montserrat border-ouro/20 text-text-secondary hover:border-ouro hover:text-ouro'}
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
                                className="font-montserrat border-ouro/20 text-text-secondary hover:border-ouro hover:text-ouro disabled:opacity-50"
                                size="sm"
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
