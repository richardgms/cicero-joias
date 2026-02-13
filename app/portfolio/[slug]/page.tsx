import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { extractIdFromSlug, isValidPortfolioSlug } from '@/lib/slug-utils';
import { checkPageVisibility } from '@/lib/page-visibility';
import { PortfolioDetail } from './portfolio-detail';
import { FinalCTASection } from '@/components/home/final-cta-section';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPortfolioItem(slug: string) {
  if (!slug || !isValidPortfolioSlug(slug)) {
    return null;
  }

  const shortId = extractIdFromSlug(slug);
  if (!shortId) return null;

  const portfolioItem = await prisma.portfolioItem.findFirst({
    where: {
      id: { endsWith: shortId },
      isActive: true,
      deletedAt: null,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  if (!portfolioItem) return null;

  // Fetch related projects (same category)
  const relatedProjects = await prisma.portfolioItem.findMany({
    where: {
      category: portfolioItem.category,
      id: { not: portfolioItem.id },
      isActive: true,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      mainImage: true,
      category: true,
      description: true,
    },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return { portfolioItem, relatedProjects };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPortfolioItem(slug);

  if (!data) {
    return {
      title: 'Projeto não encontrado - Cícero Joias',
    };
  }

  const { portfolioItem } = data;

  return {
    title: portfolioItem.seoTitle || `${portfolioItem.title} - Cícero Joias`,
    description:
      portfolioItem.seoDescription ||
      portfolioItem.description ||
      `Conheça o projeto ${portfolioItem.title} da Cícero Joias`,
    keywords: portfolioItem.keywords || undefined,
    openGraph: {
      title: portfolioItem.seoTitle || portfolioItem.title,
      description:
        portfolioItem.seoDescription ||
        portfolioItem.description ||
        `Conheça o projeto ${portfolioItem.title}`,
      images: portfolioItem.mainImage ? [portfolioItem.mainImage] : undefined,
    },
  };
}

export default async function PortfolioItemPage({ params }: PageProps) {
  const { slug } = await params;

  // Server-side visibility check (redirects if hidden, unless admin)
  await checkPageVisibility('portfolio');

  const data = await getPortfolioItem(slug);

  if (!data) {
    notFound();
  }

  const { portfolioItem, relatedProjects } = data;

  // Serialize for client component (Prisma types → plain JSON)
  const serializedItem = {
    id: portfolioItem.id,
    title: portfolioItem.title,
    description: portfolioItem.description,
    detailedDescription: portfolioItem.detailedDescription,
    category: portfolioItem.category as string,
    mainImage: portfolioItem.mainImage,
    images: portfolioItem.images as string[],
    specifications: (portfolioItem.specifications as Record<string, string>) ?? null,
    createdAt: portfolioItem.createdAt.toISOString(),
    product: portfolioItem.product
      ? {
        id: portfolioItem.product.id,
        name: portfolioItem.product.name,
        price: Number(portfolioItem.product.price ?? 0),
      }
      : null,
  };

  return (
    <>
      <PortfolioDetail
        portfolioItem={serializedItem}
        relatedProjects={relatedProjects.map((p) => ({
          id: p.id,
          title: p.title,
          mainImage: p.mainImage,
          category: p.category as string,
          description: p.description,
        }))}
      />
      <FinalCTASection />
    </>
  );
}
