import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {
      isActive: true
    };

    // Filtro por categoria
    if (category && category !== 'todos') {
      where.category = category.toUpperCase();
    }

    // Buscar projetos com paginação
    const [portfolioItems, total] = await Promise.all([
      prisma.portfolioItem.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          mainImage: true,
          images: true,
          createdAt: true
        }
      }),
      prisma.portfolioItem.count({ where })
    ]);

    // Calcular informações de paginação
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      portfolioItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    });

  } catch (error) {
    console.error('Erro ao buscar portfolio público:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 