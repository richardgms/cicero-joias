'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ArrowRight, Share2, Heart, Clock, CheckCircle2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { generatePortfolioSlug } from '@/lib/slug-utils';
import { motion, AnimatePresence } from 'framer-motion';
import { PageVisibilityGuard } from '@/components/page-visibility-guard';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

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
      // Redirect to sign in or show toast
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
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-action-primary border-t-transparent"></div>
          <p className="font-montserrat text-sm text-text-secondary">Carregando detalhes do projeto...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioItem) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-page px-4 text-center">
        <h1 className="font-philosopher text-2xl font-bold text-text-primary">Projeto não encontrado</h1>
        <p className="font-montserrat text-text-secondary">{error || 'Não foi possível carregar os dados deste projeto.'}</p>
        <Link href="/portfolio">
          <Button variant="outline" className="border-action-primary text-action-primary">
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
      <div className="min-h-screen bg-surface-page pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-8">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 font-jost text-sm font-medium uppercase tracking-wide text-text-secondary/60 transition-colors hover:text-action-primary"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Voltar para listagem
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] xl:gap-16">
            {/* Left Column: Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <motion.div
                layoutId={`portfolio-image-${portfolioItem.id}`}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/60 bg-white shadow-card"
              >
                <Image
                  src={allImages[selectedImageIndex] || '/assets/images/placeholder-jewelry.svg'}
                  alt={portfolioItem.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Favorite/Share Actions Overlay */}
                <div className="absolute right-4 top-4 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-full bg-white/90 text-text-primary shadow-sm hover:bg-white hover:text-action-primary backdrop-blur-sm transition-all"
                    onClick={handleShare}
                    title="Compartilhar"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`h-10 w-10 rounded-full shadow-sm backdrop-blur-sm transition-all ${isFavorited ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-white/90 text-text-primary hover:bg-white hover:text-red-500'}`}
                    onClick={toggleFavorite}
                    disabled={isTogglingFavorite}
                    title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </motion.div>

              {/* Thumbnail Grid */}
              {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${selectedImageIndex === idx ? 'border-action-primary ring-2 ring-action-primary/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
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
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-surface-subtle text-action-primary border-action-primary/10 px-3 py-1">
                    {categoryLabels[portfolioItem.category as keyof typeof categoryLabels] || portfolioItem.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs font-medium text-text-secondary/60">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(portfolioItem.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <h1 className="font-philosopher text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl leading-tight">
                  {portfolioItem.title}
                </h1>

                <p className="font-montserrat text-lg text-text-secondary/80 leading-relaxed">
                  {portfolioItem.description}
                </p>
              </div>

              <div className="h-px w-full bg-border-default" />

              <div className="prose prose-stone max-w-none text-text-secondary">
                <h3 className="font-philosopher text-xl font-bold text-text-primary mb-4">Sobre o Projeto</h3>
                <p className="font-montserrat text-text-secondary/80 leading-relaxed whitespace-pre-line">
                  {portfolioItem.detailedDescription || portfolioItem.description}
                </p>
              </div>

              {/* Specifications */}
              {portfolioItem.specifications && Object.keys(portfolioItem.specifications).length > 0 && (
                <div className="rounded-2xl border border-action-primary/10 bg-surface-subtle p-6">
                  <h3 className="font-philosopher text-lg font-bold text-action-primary mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Especificações Técnicas
                  </h3>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {Object.entries(portfolioItem.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-text-secondary/60">{key}</dt>
                        <dd className="font-montserrat text-sm font-medium text-text-primary">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* CTA Actions */}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button
                  className="flex-1 bg-action-strong text-text-on-brand hover:bg-action-strong-hover shadow-button-primary rounded-full py-6 font-jost uppercase tracking-widest text-sm font-bold"
                  onClick={() => window.open(`https://wa.me/5583991180251?text=Olá! Gostaria de saber mais sobre o projeto: ${portfolioItem.title}`, '_blank')}
                >
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {portfolioItem.product && (
                  <Button
                    variant="outline"
                    className="flex-1 border-action-primary text-action-primary hover:bg-action-primary/5 rounded-full py-6 font-jost uppercase tracking-widest text-sm font-bold"
                    onClick={() => window.location.href = `/produtos/${portfolioItem.product!.id}`}
                  >
                    Ver Produto Relacionado
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <div className="mt-24 border-t border-border-default pt-16">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="font-philosopher text-3xl font-bold text-text-primary">Projetos Relacionados</h2>
                  <p className="mt-2 text-text-secondary/70">Veja outros trabalhos similares que realizamos</p>
                </div>
                <Link href="/portfolio">
                  <Button variant="ghost" className="hidden text-action-primary hover:text-action-primary-hover sm:flex">
                    Ver todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((project) => (
                  <Link key={project.id} href={`/portfolio/${generatePortfolioSlug({ title: project.title, category: project.category, id: project.id })}`}>
                    <div className="group h-full overflow-hidden rounded-3xl border border-white/60 bg-surface-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-action-primary/20">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.mainImage || '/assets/images/placeholder-jewelry.svg'}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute bottom-4 left-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <p className="font-jost text-xs uppercase tracking-widest">Ver detalhes</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <Badge className="mb-3 bg-surface-subtle text-action-primary border-action-primary/10">{categoryLabels[project.category as keyof typeof categoryLabels] || project.category}</Badge>
                        <h3 className="font-philosopher text-lg font-bold text-text-primary group-hover:text-action-primary transition-colors">{project.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex justify-center sm:hidden">
                <Link href="/portfolio">
                  <Button variant="outline" className="w-full border-action-primary/20 text-action-primary">
                    Ver todos os projetos
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageVisibilityGuard>
  );
}
