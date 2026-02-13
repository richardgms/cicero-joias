import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { checkPageVisibility } from '@/lib/page-visibility';
import { PortfolioListing, type PortfolioListItem } from './portfolio-listing';
import { FinalCTASection } from '@/components/home/final-cta-section';

export const metadata: Metadata = {
  title: 'Portfólio - Cícero Joias',
  description: 'Conheça nossos projetos recentes: alianças personalizadas, restaurações com memória afetiva e renovações de peças queridas.',
  openGraph: {
    title: 'Portfólio de Joias e Restaurações - Cícero Joias',
    description: 'Conheça nossos projetos recentes: alianças personalizadas, restaurações com memória afetiva e renovações de peças queridas.',
  },
};

async function getPortfolioData() {
  const [items, categoriesRaw] = await Promise.all([
    prisma.portfolioItem.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        mainImage: true,
        images: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.portfolioItem.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      select: { category: true },
      distinct: ['category'],
    }),
  ]);

  const categories = categoriesRaw.map((c) => c.category as string);

  const serializedItems: PortfolioListItem[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category as string,
    mainImage: item.mainImage,
    images: item.images as string[],
    createdAt: item.createdAt.toISOString(),
  }));

  return { items: serializedItems, categories, totalCount: items.length };
}

export default async function PortfolioPage() {
  // Server-side visibility check
  await checkPageVisibility('portfolio');

  const { items, categories, totalCount } = await getPortfolioData();

  return (
    <>
      <PortfolioListing
        initialItems={items}
        categories={categories}
        totalCount={totalCount}
      />
      <FinalCTASection />
    </>
  );
}
