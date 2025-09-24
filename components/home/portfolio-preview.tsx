'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

import { AnimatedSection } from '@/components/ui/animated-section';
import { whatsappLinks } from './home-data';

interface PortfolioItem {
  id: string;
  title: string;
  description?: string | null;
  detailedDescription?: string | null;
  specifications?: Record<string, unknown> | null;
  category?: string | null;
  mainImage?: string | null;
  images?: string[] | null;
  createdAt: string;
}

interface PortfolioResponse {
  portfolioItems: PortfolioItem[];
}

const FALLBACK_IMAGE = '/assets/home/portfolio/case-01.webp';

const fieldKeys = {
  challenge: ['challenge', 'desafio', 'problema', 'briefing'],
  solution: ['solution', 'solucao', 'solução', 'processo'],
  result: ['result', 'resultado', 'impacto'],
} as const;

type FieldKey = keyof typeof fieldKeys;

type CaseSummary = {
  challenge: string;
  solution: string;
  result: string;
};

function normaliseSpecifications(specs?: Record<string, unknown> | null) {
  if (!specs) {
    return {} as Record<string, string>;
  }

  return Object.entries(specs).reduce<Record<string, string>>((acc, [key, value]) => {
    if (typeof value === 'string' && value.trim()) {
      acc[key.toLowerCase()] = value.trim();
    }
    return acc;
  }, {});
}

function extractField(
  specs: Record<string, string>,
  key: FieldKey,
  fallbacks: Array<string | null | undefined>,
) {
  for (const candidate of fieldKeys[key]) {
    const value = specs[candidate.toLowerCase()];
    if (value) {
      return value;
    }
  }

  for (const candidate of fallbacks) {
    if (candidate && candidate.trim()) {
      return candidate.trim();
    }
  }

  return 'Informações serão atualizadas em breve.';
}

function buildSummary(item: PortfolioItem): CaseSummary {
  const specs = normaliseSpecifications(item.specifications);

  return {
    challenge: extractField(specs, 'challenge', [item.description ?? item.detailedDescription ?? null]),
    solution: extractField(specs, 'solution', [item.detailedDescription ?? item.description ?? null]),
    result: extractField(specs, 'result', [specs['resultado-final'], specs['beneficio'], specs['benefício'], null]),
  };
}

function resolveImageSrc(item?: PortfolioItem) {
  if (!item) {
    return FALLBACK_IMAGE;
  }
  if (item.mainImage) {
    return item.mainImage;
  }
  if (item.images?.length) {
    return item.images[0] as string;
  }
  return FALLBACK_IMAGE;
}

export function PortfolioPreview() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/public/portfolio?limit=3');
        if (!response.ok) {
          throw new Error('Erro ao carregar portfólio');
        }

        const data = (await response.json()) as PortfolioResponse;
        if (mounted) {
          setItems(Array.isArray(data.portfolioItems) ? data.portfolioItems : []);
          setError(null);
        }
      } catch (err) {
        if (!mounted) {
          return;
        }
        console.error('PortfolioPreview - fetch error:', err);
        setError('Não foi possível carregar os itens do portfólio.');
        setItems([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPortfolio();

    return () => {
      mounted = false;
    };
  }, []);

  const hasItems = items.length > 0;
  const highlight = hasItems ? items[0] : undefined;
  const rest = hasItems ? items.slice(1) : [];

  const highlightSummary = useMemo(() => (highlight ? buildSummary(highlight) : null), [highlight]);

  return (
    <section className="relative overflow-hidden bg-[#F9F6EE] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(207,154,36,0.12),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="inline-flex items-center justify-center rounded-full border border-esmeralda/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
            Portfólio real
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-semibold text-esmeralda">
            Casos cuidadosamente executados
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-grafite/75">
            Os projetos abaixo são atualizados diretamente pelo painel administrativo e representam os trabalhos mais recentes do atelier.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center text-grafite/60">
            <span className="text-sm uppercase tracking-[0.28em]">Carregando portfólio…</span>
          </div>
        ) : !hasItems ? (
          <AnimatedSection className="rounded-3xl border border-esmeralda/15 bg-white/80 p-12 text-center" delay={0.12}>
            <p className="text-base sm:text-lg text-grafite/70">
              Ainda não temos itens cadastrados no portfólio. Assim que novas peças forem publicadas, elas aparecerão aqui automaticamente.
            </p>
            {error && <p className="mt-4 text-sm text-ouro">{error}</p>}
          </AnimatedSection>
        ) : (
          <AnimatedSection className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]" delay={0.12} stagger>
            {highlight && highlightSummary && (
              <motion.article
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-esmeralda/15 bg-white shadow-[0_24px_55px_-30px_rgba(24,68,52,0.32)]"
                whileHover={{ y: -6 }}
              >
                <div className="relative h-72">
                  <Image
                    src={resolveImageSrc(highlight)}
                    alt={highlight.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 space-y-2 text-marfim">
                    <p className="text-xs uppercase tracking-[0.3em] text-marfim/80">Case destaque</p>
                    <h3 className="font-playfair text-2xl font-semibold leading-snug">{highlight.title}</h3>
                  </div>
                </div>
                <div className="space-y-3 p-6 text-grafite/75">
                  <p className="text-sm">
                    <span className="font-semibold text-esmeralda">Desafio: </span>
                    {highlightSummary.challenge}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-esmeralda">Solução: </span>
                    {highlightSummary.solution}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-esmeralda">Resultado: </span>
                    {highlightSummary.result}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={whatsappLinks.primary}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-esmeralda transition-colors hover:text-ouro"
                    >
                      Quero um projeto similar
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            )}

            <div className="grid gap-6">
              {rest.map((item) => {
                const summary = buildSummary(item);
                return (
                  <motion.article
                    key={item.id}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-esmeralda/15 bg-white shadow-[0_24px_55px_-32px_rgba(24,68,52,0.28)]"
                    whileHover={{ y: -6 }}
                  >
                    <div className="relative h-56">
                      <Image
                        src={resolveImageSrc(item)}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-marfim">
                        <h3 className="font-playfair text-xl font-semibold leading-snug">{item.title}</h3>
                        {item.category && (
                          <p className="text-xs uppercase tracking-[0.28em] text-marfim/75">
                            {item.category.replace(/_/g, ' ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-3 p-6 text-sm text-grafite/75">
                      <p>
                        <span className="font-semibold text-esmeralda">Desafio: </span>
                        {summary.challenge}
                      </p>
                      <p>
                        <span className="font-semibold text-esmeralda">Solução: </span>
                        {summary.solution}
                      </p>
                      <p>
                        <span className="font-semibold text-esmeralda">Resultado: </span>
                        {summary.result}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left" delay={0.18}>
          <div className="space-y-2 text-sm text-grafite/75">
            <p className="font-semibold text-esmeralda">Quer ver outras combinações?</p>
            <p>
              Mandamos fotos adicionais ou agendamos uma visita para você provar os modelos na loja.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.a
              href={whatsappLinks.primary}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-esmeralda px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-marfim shadow-[0_20px_40px_-22px_rgba(24,68,52,0.4)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="h-4 w-4" />
              Falar pelo WhatsApp
            </motion.a>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-esmeralda transition-colors hover:text-ouro"
            >
              Ver portfólio completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
