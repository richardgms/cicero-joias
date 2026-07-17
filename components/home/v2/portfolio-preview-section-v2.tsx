'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { generatePortfolioSlug } from '@/lib/slug-utils';
import { portfolioCategoryLabels } from './home-data-v2';

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

export function PortfolioPreviewSectionV2() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/public/portfolio?featured=true&limit=3');
        if (!response.ok) throw new Error('Não foi possível carregar os projetos.');
        const data: ApiResponse = await response.json();
        setItems(data.portfolioItems || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="relative overflow-hidden bg-surface-page py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.05),transparent_45%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection
          className="grid gap-8 md:grid-cols-12 md:items-end"
          delay={0.05}
        >
          <div className="md:col-span-7">
            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-ouro sm:text-xs">
              Trabalhos recentes
            </p>
            <h2 className="font-philosopher mt-4 text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.05] text-text-primary">
              Cada peça <span className="italic text-ouro">tem uma história</span> antes de virar joia.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 font-jost text-xs font-bold uppercase tracking-widest text-ouro"
            >
              <span className="border-b border-ouro/30 pb-0.5 transition-colors duration-300 group-hover:border-ouro">
                Ver portfólio completo
              </span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] animate-pulse rounded-3xl bg-text-secondary/10"
              />
            ))}
          </div>
        ) : error || items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-ouro/20 bg-surface-section p-12 text-center">
            <div className="rounded-full bg-ouro/10 p-4">
              <Sparkles className="h-8 w-8 text-ouro" />
            </div>
            <p className="font-philosopher text-xl font-bold text-text-primary">
              Em breve, novos trabalhos
            </p>
            <p className="font-montserrat max-w-md text-sm text-text-secondary/70">
              Estamos preparando uma seleção especial para destacar aqui.
              Enquanto isso, explore nosso portfólio completo.
            </p>
            <Link href="/portfolio">
              <Button variant="outline" className="font-jost rounded-full border-ouro/40 text-text-primary hover:bg-ouro/10 hover:border-ouro">
                Ver portfólio
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {items.map((item, index) => (
              <AnimatedSection key={item.id} delay={0.1 + index * 0.08}>
                <Link
                  href={`/portfolio/${generatePortfolioSlug({
                    title: item.title,
                    category: item.category,
                    id: item.id,
                  })}`}
                  className="group block"
                >
                  <article className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-text-secondary/10">
                    <Image
                      src={item.mainImage || '/assets/images/placeholder-jewelry.svg'}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index === 0}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-esmeralda-deep/85 via-esmeralda-deep/20 to-transparent" />

                    {/* Bottom content */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-text-on-dark sm:p-7">
                      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ouro/40 bg-ouro/15 px-3 py-1 font-jost text-[9px] font-bold uppercase tracking-[0.2em] text-ouro backdrop-blur-sm sm:text-[10px]">
                        {portfolioCategoryLabels[item.category] || item.category}
                      </span>
                      <h3 className="font-philosopher text-xl font-bold leading-tight text-text-on-dark sm:text-2xl">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-widest text-ouro sm:text-xs">
                        <span className="border-b border-ouro/40 pb-0.5 transition-colors duration-300 group-hover:border-ouro">
                          Ver detalhes
                        </span>
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>

                    {/* Hover top gold line */}
                    <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-ouro via-ouro to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
