import { NextRequest, NextResponse } from 'next/server';
import { extractIdFromSlug, isValidPortfolioSlug } from '@/lib/slug-utils';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || !isValidPortfolioSlug(slug)) {
      return NextResponse.json(
        { error: 'Slug inválido' },
        { status: 400 }
      );
    }

    // Extrair ID do slug
    const shortId = extractIdFromSlug(slug);
    console.log(`[API Debug] Fetching portfolio item. Slug: "${slug}", Extracted ShortId: "${shortId}"`);

    if (!shortId) {
      console.log('[API Debug] Short ID invalid');
      return NextResponse.json(
        { error: 'ID não encontrado no slug' },
        { status: 400 }
      );
    }

    // Buscar portfolio pelo ID (últimos 6 caracteres)
    const portfolioItem = await prisma.portfolioItem.findFirst({
      where: {
        id: {
          endsWith: shortId
        },
        isActive: true,
        deletedAt: null
      },
      include: {
        product: true,
      }
    });

    console.log(`[API Debug] Query result: ${portfolioItem ? 'FOUND' : 'NOT FOUND'}. ID searched ending with: ${shortId}`);

    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    // Buscar projetos relacionados (mesma categoria)
    const relatedProjects = await prisma.portfolioItem.findMany({
      where: {
        category: portfolioItem.category,
        id: {
          not: portfolioItem.id
        },
        isActive: true,
        deletedAt: null
      },
      select: {
        id: true,
        title: true,
        mainImage: true,
        category: true,
        description: true,
      },
      take: 4,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // As imagens já estão no array images do PortfolioItem
    const processedImages = portfolioItem.images;

    const response = {
      portfolioItem: {
        ...portfolioItem,
        images: processedImages,
      },
      relatedProjects,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erro ao buscar projeto por slug:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 