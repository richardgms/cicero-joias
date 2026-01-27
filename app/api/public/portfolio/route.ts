import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Verificar conexão com o banco primeiro
    try {
      await prisma.$connect();
    } catch (connectError) {
      console.error('Database connection failed:', connectError);
      return NextResponse.json(
        {
          error: 'Não foi possível conectar ao banco de dados. Por favor, verifique se o serviço está disponível.',
          details: connectError instanceof Error ? connectError.message : 'Unknown connection error'
        },
        { status: 503 }, // Service Unavailable
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      isActive: true,
      status: 'PUBLISHED',
    };

    if (category && category !== 'todos') {
      where.category = category.toUpperCase();
    }

    if (featured === 'true') {
      where.isFeatured = true;
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
        throw new Error(`Erro ao buscar itens do portfólio: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }),
      prisma.portfolioItem.count({ where }).catch((error) => {
        console.error('Error counting portfolioItem:', error);
        throw new Error(`Erro ao contar itens do portfólio: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
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

    // Verificar tipos específicos de erro
    const errorMessage = error instanceof Error ? error.message.toLowerCase() : '';

    if (errorMessage.includes('connect') || errorMessage.includes('econnrefused') || errorMessage.includes('enotfound')) {
      console.error('Database connection error detected');
      return NextResponse.json(
        {
          error: 'Não foi possível conectar ao banco de dados. O serviço pode estar temporariamente indisponível.',
          hint: 'Se você está usando Supabase, verifique se o projeto não foi pausado por inatividade.'
        },
        { status: 503 },
      );
    }

    if (errorMessage.includes('timeout')) {
      return NextResponse.json(
        { error: 'A conexão com o banco de dados expirou. Tente novamente.' },
        { status: 504 },
      );
    }

    if (errorMessage.includes('does not exist') || errorMessage.includes('relation')) {
      return NextResponse.json(
        { error: 'Erro de estrutura do banco de dados. Execute as migrations do Prisma.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: 'Erro interno do servidor ao buscar portfólio',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 },
    );
  }
}
