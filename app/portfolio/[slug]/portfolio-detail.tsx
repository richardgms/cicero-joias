'use client';

import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ArrowRight, Share2, Expand, X, Clock, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePortfolioSlug } from '@/lib/slug-utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
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
            <Section tone="dark" spacing="none" className="overflow-hidden pb-16 pt-16 lg:pb-24 lg:pt-24">
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    {portfolioItem.mainImage && (
                        <Image
                            src={portfolioItem.mainImage}
                            alt=""
                            fill
                            className="object-cover opacity-25 blur-sm scale-105"
                            priority
                            sizes="100vw"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/90 via-surface-dark/80 to-surface-dark/95" />
                    <div className="absolute -right-8 -top-16 h-80 w-80 rounded-full bg-action-on-dark/10 blur-3xl" />
                </div>

                <Container size="lg" className="relative z-10">
                    <div className="mb-8">
                        <Link
                            href="/portfolio"
                            className="group inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-text-on-dark/60 transition-colors hover:text-action-on-dark"
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
                            <Badge variant="dark" className="gap-2">
                                <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                                {categoryLabels[portfolioItem.category] || portfolioItem.category}
                            </Badge>
                            <div className="flex items-center gap-2 text-xs font-medium text-text-on-dark/50">
                                <Clock className="h-3 w-3" />
                                <span className="font-numeric">{formatDate(portfolioItem.createdAt)}</span>
                            </div>
                        </div>

                        <h1 className="font-heading text-4xl font-bold leading-tight text-text-on-dark sm:text-5xl md:text-6xl max-w-4xl">
                            {portfolioItem.title}
                        </h1>
                    </motion.div>
                </Container>
            </Section>

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
                                <button
                                    onClick={handleShare}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:scale-105"
                                    title="Compartilhar"
                                    aria-label="Compartilhar"
                                >
                                    <Share2 className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Fullscreen expand button */}
                            <button
                                onClick={() => setIsFullscreen(true)}
                                className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:scale-105"
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
                                        className={`relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${selectedImageIndex === idx ? 'border-action-strong ring-2 ring-action-strong/30 shadow-md' : 'border-border-default/60 opacity-60 hover:opacity-100 hover:border-action-strong/40'}`}
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
                            <p className="font-sans text-[15px] leading-[1.8] text-text-secondary/80 sm:text-base whitespace-pre-wrap first-letter:text-4xl first-letter:font-heading first-letter:font-bold first-letter:text-action-strong first-letter:mr-1 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1">
                                {portfolioItem.description}
                            </p>

                            {portfolioItem.detailedDescription && (
                                <div className="text-[15px] leading-[1.8] text-text-secondary/70 font-sans pt-5 border-t border-border-default/60 whitespace-pre-wrap">
                                    {portfolioItem.detailedDescription}
                                </div>
                            )}
                        </div>

                        {/* Specifications */}
                        {portfolioItem.specifications && Object.keys(portfolioItem.specifications).length > 0 && (
                            <Card variant="light" className="p-6 shadow-card-sm backdrop-blur-sm sm:p-8">
                                <h3 className="font-heading text-lg font-bold text-text-primary mb-5 flex items-center gap-2.5">
                                    <CheckCircle2 className="h-[18px] w-[18px] text-action-strong" />
                                    Especificações
                                </h3>
                                <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                                    {Object.entries(portfolioItem.specifications).map(([key, value]) => (
                                        <div key={key} className="flex flex-col gap-1.5 border-l-2 border-action-strong/25 pl-4">
                                            <dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary/60">{key}</dt>
                                            <dd className="font-sans text-sm font-semibold text-text-primary">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </Card>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-col gap-3 pt-6 sm:flex-row">
                            <motion.div
                                className="flex-1"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    className="group w-full rounded-full bg-action-strong py-6 font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-text-on-brand shadow-button-primary transition-all duration-500 hover:-translate-y-0.5 hover:bg-action-strong/90 hover:shadow-button-gold-strong"
                                    onClick={() => window.open(`https://wa.me/5583991180251?text=Olá! Gostaria de saber mais sobre o projeto: ${portfolioItem.title}`, '_blank')}
                                >
                                    <span className="flex items-center gap-2.5">
                                        Solicitar Orçamento
                                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            </motion.div>

                            {portfolioItem.product && (
                                <Button
                                    variant="outline"
                                    className="flex-1 group rounded-full border-action-strong/30 bg-transparent py-6 font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-text-primary transition-all duration-500 hover:border-action-strong hover:text-action-strong"
                                    onClick={() => window.location.href = `/produtos/${portfolioItem.product!.id}`}
                                >
                                    Ver Produto Relacionado
                                    <ArrowRight className="ml-2 h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
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
                                    <Star className="w-3.5 h-3.5 text-action-strong" />
                                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-action-strong/80">Descubra Mais</span>
                                </div>
                                <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">Projetos Relacionados</h2>
                            </div>
                            <Link href="/portfolio">
                                <Button variant="ghost" className="hidden text-action-strong hover:bg-action-strong/5 hover:text-action-strong/80 sm:flex font-sans uppercase tracking-[0.15em] text-[11px] font-bold">
                                    Ver todos
                                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/portfolio/${generatePortfolioSlug({ title: project.title, category: project.category, id: project.id })}`}
                                    className="block h-full"
                                >
                                    <Card variant="light" interactive className="group h-full overflow-hidden hover:border-action-strong">
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
                                                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                                    Ver Detalhes <ArrowRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <Badge variant="gold" className="mb-2.5 text-[10px]">{categoryLabels[project.category] || project.category}</Badge>
                                            <h3 className="font-heading text-[17px] font-bold text-text-primary group-hover:text-action-strong transition-colors leading-snug">{project.title}</h3>
                                        </div>
                                    </Card>
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
