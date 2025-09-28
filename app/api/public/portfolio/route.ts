import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Verificar conexão com o banco primeiro
    await prisma.$connect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      isActive: true,
    };

    if (category && category !== 'todos') {
      where.category = category.toUpperCase();
    }

    // Verificar se a tabela existe e executar query
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
          detailedDescription: true,
          specifications: true,
          category: true,
          mainImage: true,
          images: true,
          createdAt: true,
        },
      }).catch((error) => {
        console.error('Error querying portfolioItem:', error);
        return [];
      }),
      prisma.portfolioItem.count({ where }).catch((error) => {
        console.error('Error counting portfolioItem:', error);
        return 0;
      }),
    ]);

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
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar portfólio público:', error);

    // Log mais detalhado para depuração
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    // Verificar se é erro de conexão do banco
    if (error instanceof Error && error.message.includes('connect')) {
      console.error('Database connection error detected');
      return NextResponse.json(
        { error: 'Erro de conexão com o banco de dados' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
