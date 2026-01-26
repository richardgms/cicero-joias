'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { generatePortfolioSlug } from '@/lib/slug-utils';

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
    createdAt: string;
}

interface ApiResponse {
    portfolioItems: PortfolioItem[];
}

export function LegacyPortfolioPreviewSection() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedPortfolio = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/public/portfolio?featured=true&limit=3');

                if (!response.ok) {
                    throw new Error('Não foi possível carregar os projetos em destaque.');
                }

                const data: ApiResponse = await response.json();
                setItems(data.portfolioItems || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar projetos.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedPortfolio();
    }, []);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#0b1f18] py-10 sm:py-16 text-marfim">
            {/* Preset Background Esmeralda - Ver docs/style-presets.md */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

            {/* Content */}
            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="space-y-7 text-center" delay={0.05}>
                    <span className="font-jost inline-flex items-center justify-center gap-2 rounded-full border border-ouro/40 bg-ouro/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ouro transition-all duration-500 hover:scale-105 hover:bg-ouro/30 hover:border-ouro/60 hover:shadow-[0_0_20px_rgba(207,154,36,0.3)] cursor-default">
                        Trabalhos em Destaque
                    </span>
                    <h2 className="font-philosopher text-3xl sm:text-5xl lg:text-6xl font-bold text-marfim leading-tight">
                        Nossos Trabalhos
                    </h2>
                    <p className="font-montserrat mx-auto max-w-3xl text-base sm:text-lg text-marfim/90 leading-relaxed">
                        Conheça alguns dos projetos que realizamos
                    </p>
                </AnimatedSection>

                {loading ? (
                    <div className="flex flex-wrap justify-center gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm aspect-[4/5] sm:aspect-[3/4] rounded-3xl bg-grafite/10 animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    null
                ) : items.length === 0 ? (
                    <div className="flex h-72 flex-col items-center justify-center gap-8 text-center">
                        <div className="rounded-2xl border border-esmeralda/10 bg-esmeralda/5 p-10 backdrop-blur-sm max-w-md">
                            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-esmeralda/10 p-4">
                                <Sparkles className="h-full w-full text-esmeralda/80" />
                            </div>
                            <p className="font-montserrat text-sm font-medium text-marfim mb-4">Nenhum projeto em destaque no momento</p>
                            <p className="font-montserrat text-xs text-marfim/70 leading-relaxed">Em breve, novos trabalhos especiais serão destacados aqui.</p>
                        </div>
                        <Link href="/portfolio">
                            <Button variant="outline" className="bg-transparent font-montserrat border-marfim/30 text-marfim hover:bg-marfim/5 hover:border-marfim/50 transition-all duration-500">
                                Ver todo o portfólio
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap justify-center gap-6">
                            {items.map((item, index) => (
                                <AnimatedSection key={item.id} delay={0.1 + index * 0.1} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm">
                                    <Link href={`/portfolio/${generatePortfolioSlug({
                                        title: item.title,
                                        category: item.category,
                                        id: item.id
                                    })}`} className="block group">
                                        <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-3xl">
                                            {/* Imagem */}
                                            <Image
                                                src={item.mainImage || '/assets/images/placeholder-jewelry.svg'}
                                                alt={item.title}
                                                fill
                                                priority={index === 0}
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />

                                            {/* Overlay rodapé - Estado normal */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-grafite/75 via-grafite/40 to-transparent
                        opacity-100 group-hover:opacity-0 transition-opacity duration-500" />

                                            {/* Overlay rodapé - Estado hover (mais claro) */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-grafite/60 via-grafite/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Conteúdo */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 text-white">
                                                {/* Categoria */}
                                                <span className="font-jost inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-ouro/20 backdrop-blur-sm rounded-full border border-ouro/30 group-hover:scale-105 group-hover:bg-ouro/30 transition-all duration-500">
                                                    {categoryLabels[item.category as keyof typeof categoryLabels] || item.category}
                                                </span>

                                                {/* Título */}
                                                <h3 className="font-montserrat text-xl font-semibold leading-tight line-clamp-2">
                                                    {item.title}
                                                </h3>

                                                {/* Link "Ver detalhes" */}
                                                <div className="flex items-center gap-2 text-sm font-medium text-ouro group-hover:gap-3 transition-all duration-500">
                                                    <span>Ver detalhes</span>
                                                    <ArrowRight className="h-4 w-4 transition-transform duration-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>

                        <AnimatedSection delay={0.4} className="text-center">
                            <div>
                                <div className="space-y-3 mb-4">
                                    <p className="font-jost text-sm uppercase tracking-[0.3em] text-marfim/70">
                                        Quer ver mais trabalhos nossos?
                                    </p>
                                    <p className="font-montserrat mx-auto max-w-xl text-marfim/90">
                                        Explore nossa coleção completa de alianças personalizadas e restaurações
                                        especiais.
                                    </p>
                                </div>
                                <Link href="/portfolio">
                                    <Button className="font-jost group rounded-full bg-ouro text-grafite hover:bg-ouro/90 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 px-8 py-6 text-base font-semibold uppercase tracking-[0.2em]">
                                        Ver portfólio completo
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                                    </Button>
                                </Link>
                            </div>
                        </AnimatedSection>
                    </>
                )}
            </div>
        </section>
    );
}
