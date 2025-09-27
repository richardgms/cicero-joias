'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

export function PortfolioPreviewSection() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/public/portfolio?page=1&limit=3');

        if (!response.ok) {
          throw new Error('Não foi possível carregar os projetos recentes.');
        }

        const data: ApiResponse = await response.json();
        setItems(data.portfolioItems || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar projetos.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPortfolio();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-marfim via-marfim/98 to-marfim/95 py-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(199,154,52,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_90%,rgba(24,68,52,0.04),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] opacity-30" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-7 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-ouro/20 bg-ouro/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ouro transition-colors duration-300 hover:bg-ouro/10">
            <Sparkles className="h-3 w-3" />
            Nossos trabalhos recentes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-esmeralda leading-tight">
            Projetos que <span className="text-ouro">contam histórias</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl text-grafite/75 leading-relaxed">
            Conheça alguns dos nossos trabalhos mais recentes: alianças personalizadas, restaurações especiais e joias que carregam memórias afetivas.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group h-full rounded-3xl border border-esmeralda/10 bg-white/95 shadow-[0_20px_45px_-32px_rgba(24,68,52,0.28)] backdrop-blur-md overflow-hidden">
                <div className="relative h-56 sm:h-64 bg-gradient-to-br from-esmeralda/5 to-esmeralda/10 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
                <div className="space-y-5 p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="h-6 w-24 bg-esmeralda/10 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-7 bg-esmeralda/10 rounded animate-pulse"></div>
                      <div className="h-7 w-3/4 bg-esmeralda/10 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-grafite/10 rounded animate-pulse"></div>
                      <div className="h-4 w-5/6 bg-grafite/10 rounded animate-pulse"></div>
                      <div className="h-4 w-2/3 bg-grafite/10 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="h-3 w-16 bg-esmeralda/10 rounded animate-pulse"></div>
                    <div className="h-4 w-4 bg-esmeralda/10 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex h-72 flex-col items-center justify-center gap-8 text-center">
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-8 backdrop-blur-sm max-w-md">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-red-100 p-3">
                <div className="h-full w-full rounded-full bg-red-500/20"></div>
              </div>
              <p className="text-sm font-medium text-red-600 mb-4">Ops! Algo deu errado</p>
              <p className="text-xs text-red-500/80 leading-relaxed">{error}</p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
            >
              Tentar novamente
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-72 flex-col items-center justify-center gap-8 text-center">
            <div className="rounded-2xl border border-esmeralda/10 bg-esmeralda/5 p-10 backdrop-blur-sm max-w-md">
              <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-esmeralda/10 p-4">
                <Sparkles className="h-full w-full text-esmeralda/60" />
              </div>
              <p className="text-sm font-medium text-esmeralda mb-4">Em breve, novos projetos</p>
              <p className="text-xs text-esmeralda/70 leading-relaxed">Estamos trabalhando em novos trabalhos incríveis para compartilhar com você.</p>
            </div>
            <Link href="/portfolio">
              <Button variant="outline" className="border-esmeralda/30 text-esmeralda hover:bg-esmeralda/5 hover:border-esmeralda/50 transition-all duration-200">
                Ver portfólio completo
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {items.map((item, index) => (
                <AnimatedSection key={item.id} delay={0.1 + index * 0.1}>
                  <Link href={`/portfolio/${generatePortfolioSlug({
                    title: item.title,
                    category: item.category,
                    id: item.id
                  })}`}>
                    <motion.div
                      className="group h-full rounded-3xl border border-esmeralda/10 bg-white/95 shadow-[0_20px_45px_-32px_rgba(24,68,52,0.28)] backdrop-blur-md transition-all duration-300 focus-within:ring-2 focus-within:ring-esmeralda/20 focus-within:ring-offset-2"
                      whileHover={{
                        y: -12,
                        boxShadow: "0 32px 80px -40px rgba(24,68,52,0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl">
                        <Image
                          src={item.mainImage || '/assets/images/placeholder-jewelry.svg'}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                        <motion.div
                          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Eye className="h-3 w-3" />
                          Ver detalhes
                        </motion.div>
                      </div>

                      <div className="space-y-5 p-6 sm:p-8">
                        <div className="space-y-4">
                          <Badge className="inline-flex w-fit bg-esmeralda/10 text-esmeralda border-esmeralda/20 hover:bg-esmeralda/15 transition-colors duration-200 text-xs font-medium px-3 py-1.5 tracking-[0.05em]">
                            {categoryLabels[item.category as keyof typeof categoryLabels] || item.category}
                          </Badge>

                          <h3 className="text-xl sm:text-2xl font-semibold text-esmeralda group-hover:text-ouro transition-colors duration-300 line-clamp-2 leading-snug">
                            {item.title}
                          </h3>

                          {item.description && (
                            <p className="text-sm sm:text-base text-grafite/70 line-clamp-3 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 text-xs uppercase tracking-[0.25em] text-esmeralda/60 font-medium">
                          <span>
                            {new Date(item.createdAt).toLocaleDateString('pt-BR', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.4} className="text-center">
              <div>
                <div className="space-y-3 mb-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-grafite/60">
                    Quer ver mais trabalhos nossos?
                  </p>
                  <p className="mx-auto max-w-xl text-grafite/75">
                    Explore nossa coleção completa de alianças personalizadas e restaurações
                    especiais.
                  </p>
                </div>
                <Link href="/portfolio">
                  <Button className="group bg-esmeralda text-marfim hover:bg-esmeralda-dark transition-all duration-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em]">
                    Ver portfólio completo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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