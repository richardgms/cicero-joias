'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ArrowRight, Share2, Heart, Clock, CheckCircle2, Star } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { generatePortfolioSlug } from '@/lib/slug-utils';
import { motion, AnimatePresence } from 'framer-motion';
import { PageVisibilityGuard } from '@/components/page-visibility-guard';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { FinalCTASection } from '@/components/home/final-cta-section';
import { LoadingScreen } from '@/components/ui/loading-screen';

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
  detailedDescription?: string;
  category: string;
  mainImage: string;
  images: string[];
  specifications?: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  createdAt: string;
  product?: {
    id: string;
    name: string;
    price: number;
  };
}

interface RelatedProject {
  id: string;
  title: string;
  mainImage: string;
  category: string;
  description?: string;
  createdAt: string;
}

interface ApiResponse {
  portfolioItem: PortfolioItem;
  relatedProjects: RelatedProject[];
}

interface FavoriteResponse {
  favorites?: Array<{ portfolioItem: { id: string } }>;
}

export default function PortfolioItemPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isSignedIn, isLoaded, user } = useUser();

  const [portfolioItem, setPortfolioItem] = useState<PortfolioItem | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  // Use standardized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };

  // Fetch Project Data
  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    const loadPortfolioItem = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/portfolio/by-slug/${slug}`);

        if (!isMounted) return;

        if (!response.ok) {
          setError(response.status === 404 ? 'Projeto não encontrado' : 'Erro ao carregar projeto');
          return;
        }

        const data: ApiResponse = await response.json();
        setPortfolioItem(data.portfolioItem);
        setRelatedProjects(data.relatedProjects || []);

        // Update SEO
        if (typeof document !== 'undefined') {
          document.title = data.portfolioItem.seoTitle || `${data.portfolioItem.title} - Cícero Joias`;
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute(
              'content',
              data.portfolioItem.seoDescription || data.portfolioItem.description || `Conheça o projeto ${data.portfolioItem.title}`
            );
          }
        }
      } catch (fetchError) {
        if (isMounted) {
          console.error('Erro ao buscar projeto:', fetchError);
          setError('Erro ao carregar projeto');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPortfolioItem();

    return () => { isMounted = false; };
  }, [slug]);

  // Check Favorite Status
  useEffect(() => {
    if (!portfolioItem || !isLoaded || !isSignedIn) return;

    let isMounted = true;

    const loadFavoriteState = async () => {
      try {
        const response = await fetch('/api/favorites');
        if (!isMounted) return;

        if (response.ok) {
          const data: FavoriteResponse = await response.json();
          const isFav = data.favorites?.some((fav) => fav.portfolioItem.id === portfolioItem.id) ?? false;
          setIsFavorited(isFav);
        }
      } catch (error) {
        console.error('Erro ao verificar favorito:', error);
      }
    };

    loadFavoriteState();

    return () => { isMounted = false; };
  }, [isLoaded, isSignedIn, portfolioItem]);

  const handleShare = async () => {
    if (!portfolioItem) return;

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share && currentUrl) {
      try {
        await navigator.share({
          title: portfolioItem.title,
          text: portfolioItem.description || `Confira este projeto da Cícero Joias: ${portfolioItem.title}`,
          url: currentUrl,
        });
        return;
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    }

    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success('Link copiado para a área de transferência!');
    } catch (error) {
      toast.error('Não foi possível copiar o link.');
    }
  };

  const toggleFavorite = async () => {
    if (!portfolioItem || isTogglingFavorite) return;

    if (!isSignedIn) {
      toast.error('Faça login para salvar favoritos.');
      return;
    }

    setIsTogglingFavorite(true);

    try {
      const method = isFavorited ? 'DELETE' : 'POST';
      const response = await fetch('/api/favorites', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioItemId: portfolioItem.id }),
      });

      if (response.ok) {
        setIsFavorited(!isFavorited);
        toast.success(isFavorited ? 'Removido dos favoritos' : 'Salvo nos favoritos!');
      } else {
        toast.error('Erro ao atualizar favoritos.');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-page">
        <LoadingScreen variant="inline" message="Carregando detalhes..." />
      </div>
    );
  }

  if (error || !portfolioItem) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-page px-4 text-center">
        <h1 className="font-philosopher text-2xl font-bold text-text-primary">Projeto não encontrado</h1>
        <p className="font-montserrat text-text-secondary">{error || 'Não foi possível carregar os dados deste projeto.'}</p>
        <Link href="/portfolio">
          <Button variant="outline" className="border-ouro text-ouro hover:bg-ouro/10">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para o Portfólio
          </Button>
        </Link>
      </div>
    );
  }

  const allImages = [portfolioItem.mainImage, ...portfolioItem.images].filter(Boolean);

  return (
    <PageVisibilityGuard pageSlug="portfolio">
      <div className="min-h-screen bg-surface-page">
        {/* Standardized Header/Hero Context */}
        <div className="relative overflow-hidden bg-esmeralda-deep pt-32 pb-24 lg:pt-40 lg:pb-32">
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
                    {categoryLabels[portfolioItem.category as keyof typeof categoryLabels] || portfolioItem.category}
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

        <div className="relative -mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] xl:gap-16">
            {/* Left Column: Images */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Main Image */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-2xl"
              >
                <Image
                  src={allImages[selectedImageIndex] || '/assets/images/placeholder-jewelry.svg'}
                  alt={portfolioItem.title}
                  fill
                  className="object-cover"
                  priority
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
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`h-10 w-10 rounded-full shadow-sm backdrop-blur-sm transition-all hover:scale-105 ${isFavorited ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-white/90 text-text-primary hover:bg-white hover:text-red-500'}`}
                    onClick={toggleFavorite}
                    disabled={isTogglingFavorite}
                    title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Grid */}
              {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${selectedImageIndex === idx ? 'border-ouro ring-2 ring-ouro/20 scale-105' : 'border-transparent opacity-70 hover:opacity-100 grayscale hover:grayscale-0'}`}
                    >
                      <Image
                        src={img}
                        alt={`Vista ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Column: Content */}
            <motion.div
              className="flex flex-col gap-8 pt-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="space-y-6">
                <p className="font-montserrat text-lg text-text-secondary/80 leading-relaxed first-letter:text-5xl first-letter:font-philosopher first-letter:text-ouro first-letter:mr-1 first-letter:float-left">
                  {portfolioItem.description}
                </p>

                {portfolioItem.detailedDescription && (
                  <div className="prose prose-stone max-w-none text-text-secondary/80 font-montserrat leading-relaxed pt-4 border-t border-border-default">
                    {portfolioItem.detailedDescription}
                  </div>
                )}
              </div>

              {/* Specifications */}
              {portfolioItem.specifications && Object.keys(portfolioItem.specifications).length > 0 && (
                <div className="rounded-3xl border border-ouro/10 bg-surface-card p-8 shadow-card-sm backdrop-blur-sm">
                  <h3 className="font-philosopher text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-ouro" />
                    Especificações
                  </h3>
                  <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    {Object.entries(portfolioItem.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col gap-1 border-l-2 border-ouro/20 pl-4">
                        <dt className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">{key}</dt>
                        <dd className="font-montserrat text-sm font-medium text-text-primary">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button
                  className="flex-1 group rounded-full bg-action-strong text-text-on-brand shadow-button-primary transition-all duration-500 hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5 py-6 font-jost uppercase tracking-widest text-sm font-bold"
                  onClick={() => window.open(`https://wa.me/5583991180251?text=Olá! Gostaria de saber mais sobre o projeto: ${portfolioItem.title}`, '_blank')}
                >
                  <span className="flex items-center gap-2">
                    Solicitar Orçamento
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </Button>

                {portfolioItem.product && (
                  <Button
                    variant="outline"
                    className="flex-1 group rounded-full border-ouro/30 bg-transparent text-text-primary transition-all duration-500 hover:border-ouro hover:text-ouro py-6 font-jost uppercase tracking-widest text-sm font-bold"
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
            <div className="mt-24 border-t border-border-default pt-20">
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-ouro" />
                    <span className="font-jost text-xs font-bold uppercase tracking-widest text-ouro">Descubra Mais</span>
                  </div>
                  <h2 className="font-philosopher text-4xl font-bold text-text-primary">Projetos Relacionados</h2>
                </div>
                <Link href="/portfolio">
                  <Button variant="ghost" className="hidden text-ouro hover:text-ouro/80 hover:bg-ouro/5 sm:flex font-jost uppercase tracking-widest text-xs font-bold">
                    Ver todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((project) => (
                  <Link key={project.id} href={`/portfolio/${generatePortfolioSlug({ title: project.title, category: project.category, id: project.id })}`}>
                    <div className="group h-full overflow-hidden rounded-3xl border border-ouro/15 bg-surface-card shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 hover:border-ouro/50">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.mainImage || '/assets/images/placeholder-jewelry.svg'}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="absolute bottom-4 left-4">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-jost text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                            Ver Detalhes <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <Badge className="mb-3 bg-ouro/10 text-ouro border-transparent">{categoryLabels[project.category as keyof typeof categoryLabels] || project.category}</Badge>
                        <h3 className="font-philosopher text-lg font-bold text-text-primary group-hover:text-ouro transition-colors">{project.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <FinalCTASection />
      </div>
    </PageVisibilityGuard>
  );
}
