import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      isActive: true,
      deletedAt: null,
    };

    if (category && category !== 'todos') {
      where.category = category.toUpperCase();
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const [portfolioItems, total] = await Promise.all([
      prisma.portfolioItem.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          mainImage: true,
          createdAt: true,
        },
      }),
      prisma.portfolioItem.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const response = NextResponse.json({
      portfolioItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });

    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300'
    );

    return response;
  } catch (error) {
    logger.error('Erro ao buscar portfólio público:', error);

    const errorMessage = error instanceof Error ? error.message.toLowerCase() : '';

    if (errorMessage.includes('connect') || errorMessage.includes('econnrefused') || errorMessage.includes('enotfound')) {
      return NextResponse.json(
        { error: 'Serviço temporariamente indisponível. Tente novamente em instantes.' },
        { status: 503 },
      );
    }

    if (errorMessage.includes('timeout')) {
      return NextResponse.json(
        { error: 'A requisição demorou demais. Tente novamente.' },
        { status: 504 },
      );
    }

    // Detalhes do erro ficam só no log do servidor (logger.error acima)
    return NextResponse.json(
      { error: 'Erro interno do servidor ao buscar portfólio' },
      { status: 500 },
    );
  }
}
