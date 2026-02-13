'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ArrowRight, Share2, Expand, X, Clock, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePortfolioSlug } from '@/lib/slug-utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const categoryLabels: Record<string, string> = {
    WEDDING_RINGS: 'Alianças de Casamento',
    REPAIRS_BEFORE_AFTER: 'Consertos (Antes/Depois)',
    GOLD_PLATING: 'Banho de Ouro',
    CUSTOM_JEWELRY: 'Joias Personalizadas',
    GRADUATION_RINGS: 'Anéis de Formatura',
};

interface PortfolioItem {
    id: string;
    title: string;
    description: string | null;
    detailedDescription: string | null;
    category: string;
    mainImage: string;
    images: string[];
    specifications: Record<string, string> | null;
    createdAt: string;
    product?: {
        id: string;
        name: string;
        price: number;
    } | null;
}

interface RelatedProject {
    id: string;
    title: string;
    mainImage: string;
    category: string;
    description: string | null;
}

interface PortfolioDetailProps {
    portfolioItem: PortfolioItem;
    relatedProjects: RelatedProject[];
}

export function PortfolioDetail({ portfolioItem, relatedProjects }: PortfolioDetailProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const allImages = [portfolioItem.mainImage, ...portfolioItem.images].filter(Boolean);

    const handleShare = async () => {
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

        if (navigator.share && currentUrl) {
            try {
                await navigator.share({
                    title: portfolioItem.title,
                    text: portfolioItem.description || `Confira este projeto da Cícero Joias: ${portfolioItem.title}`,
                    url: currentUrl,
                });
                return;
            } catch {
                // User cancelled share or error
            }
        }

        try {
            await navigator.clipboard.writeText(currentUrl);
            toast.success('Link copiado para a área de transferência!');
        } catch {
            toast.error('Não foi possível copiar o link.');
        }
    };

    return (
        <div className="min-h-screen bg-surface-page">
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-esmeralda-deep pt-16 pb-16 lg:pt-24 lg:pb-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-esmeralda-deep/90 via-esmeralda-deep/80 to-esmeralda-deep/95" />
                    <div className="absolute inset-0 bg-[url('/assets/noise.webp')] opacity-[0.03] mix-blend-overlay" />
                    <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-action-strong/5 blur-[120px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link
                            href="/portfolio"
                            className="group inline-flex items-center gap-2 font-jost text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-ouro"
                        >
                            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Voltar para o Portfólio
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                                <Star className="w-3 h-3 text-ouro fill-ouro" />
                                <span className="font-jost text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ouro/90">
                                    {categoryLabels[portfolioItem.category] || portfolioItem.category}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-white/50">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(portfolioItem.createdAt).toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>

                        <h1 className="font-philosopher text-4xl font-bold text-white sm:text-5xl md:text-6xl leading-tight max-w-4xl">
                            {portfolioItem.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-24 lg:pt-14">
                <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr] lg:gap-14 xl:gap-20">
                    {/* Left Column: Images */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {/* Main Image */}
                        <div
                            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
                        >
                            <Image
                                src={allImages[selectedImageIndex] || '/assets/images/placeholder-jewelry.svg'}
                                alt={portfolioItem.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />

                            {/* Actions */}
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-10 w-10 rounded-full bg-white/90 text-text-primary shadow-sm hover:bg-white hover:text-action-primary backdrop-blur-sm transition-all hover:scale-105"
                                    onClick={handleShare}
                                    title="Compartilhar"
                                >
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Fullscreen expand button */}
                            <button
                                onClick={() => setIsFullscreen(true)}
                                className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-105"
                                title="Ver em tela cheia"
                            >
                                <Expand className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Thumbnail Grid */}
                        {allImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${selectedImageIndex === idx ? 'border-ouro ring-2 ring-ouro/30 shadow-md' : 'border-border-default/60 opacity-60 hover:opacity-100 hover:border-ouro/40'}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Vista ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="72px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        className="flex flex-col gap-8 pt-4 lg:pt-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <div className="space-y-5">
                            <p className="font-montserrat text-[15px] leading-[1.8] text-text-secondary/80 sm:text-base whitespace-pre-wrap first-letter:text-4xl first-letter:font-philosopher first-letter:font-bold first-letter:text-ouro first-letter:mr-1 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1">
                                {portfolioItem.description}
                            </p>

                            {portfolioItem.detailedDescription && (
                                <div className="text-[15px] leading-[1.8] text-text-secondary/70 font-montserrat pt-5 border-t border-border-default/60 whitespace-pre-wrap">
                                    {portfolioItem.detailedDescription}
                                </div>
                            )}
                        </div>

                        {/* Specifications */}
                        {portfolioItem.specifications && Object.keys(portfolioItem.specifications).length > 0 && (
                            <div className="rounded-2xl border border-ouro/15 bg-white/80 p-6 sm:p-8 shadow-card-sm backdrop-blur-sm">
                                <h3 className="font-philosopher text-lg font-bold text-text-primary mb-5 flex items-center gap-2.5">
                                    <CheckCircle2 className="h-[18px] w-[18px] text-ouro" />
                                    Especificações
                                </h3>
                                <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                                    {Object.entries(portfolioItem.specifications).map(([key, value]) => (
                                        <div key={key} className="flex flex-col gap-1.5 border-l-2 border-ouro/25 pl-4">
                                            <dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary/60">{key}</dt>
                                            <dd className="font-montserrat text-sm font-semibold text-text-primary">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-col gap-3 pt-6 sm:flex-row">
                            <Button
                                className="flex-1 group rounded-full bg-esmeralda text-white shadow-[0_8px_24px_-6px_rgba(24,68,52,0.4)] transition-all duration-500 hover:bg-esmeralda-dark hover:shadow-[0_12px_32px_-6px_rgba(24,68,52,0.5)] hover:-translate-y-0.5 py-6 font-jost uppercase tracking-[0.15em] text-[13px] font-bold"
                                onClick={() => window.open(`https://wa.me/5583991180251?text=Olá! Gostaria de saber mais sobre o projeto: ${portfolioItem.title}`, '_blank')}
                            >
                                <span className="flex items-center gap-2.5">
                                    Solicitar Orçamento
                                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                                </span>
                            </Button>

                            {portfolioItem.product && (
                                <Button
                                    variant="outline"
                                    className="flex-1 group rounded-full border-ouro/30 bg-transparent text-text-primary transition-all duration-500 hover:border-ouro hover:text-ouro py-6 font-jost uppercase tracking-[0.15em] text-[13px] font-bold"
                                    onClick={() => window.location.href = `/produtos/${portfolioItem.product!.id}`}
                                >
                                    Ver Produto Relacionado
                                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Related Projects Section */}
                {relatedProjects.length > 0 && (
                    <div className="mt-20 border-t border-border-default/80 pt-16">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 mb-3">
                                    <Star className="w-3.5 h-3.5 text-ouro" />
                                    <span className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-ouro/80">Descubra Mais</span>
                                </div>
                                <h2 className="font-philosopher text-3xl font-bold text-text-primary sm:text-4xl">Projetos Relacionados</h2>
                            </div>
                            <Link href="/portfolio">
                                <Button variant="ghost" className="hidden text-ouro hover:text-ouro/80 hover:bg-ouro/5 sm:flex font-jost uppercase tracking-[0.15em] text-[11px] font-bold">
                                    Ver todos
                                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedProjects.map((project) => (
                                <Link key={project.id} href={`/portfolio/${generatePortfolioSlug({ title: project.title, category: project.category, id: project.id })}`}>
                                    <div className="group h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_16px_40px_-12px_rgba(24,68,52,0.12)] hover:-translate-y-1.5 hover:border-ouro/30">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={project.mainImage || '/assets/images/placeholder-jewelry.svg'}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                            <div className="absolute bottom-4 left-4">
                                                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                                    Ver Detalhes <ArrowRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <Badge className="mb-2.5 bg-ouro/10 text-ouro border-transparent text-[10px] font-bold">{categoryLabels[project.category] || project.category}</Badge>
                                            <h3 className="font-philosopher text-[17px] font-bold text-text-primary group-hover:text-ouro transition-colors leading-snug">{project.title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Fullscreen Image Modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsFullscreen(false)}
                    >
                        <motion.div
                            className="relative w-[90vmin] max-w-[700px] aspect-square"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <Image
                                src={allImages[selectedImageIndex] || '/assets/images/placeholder-jewelry.svg'}
                                alt={portfolioItem.title}
                                fill
                                className="rounded-2xl object-cover"
                                sizes="90vmin"
                                priority
                            />

                            <button
                                onClick={() => setIsFullscreen(false)}
                                className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105"
                                title="Fechar"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
