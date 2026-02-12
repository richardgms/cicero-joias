import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Buscar projeto por ID
    const portfolioItem = await prisma.portfolioItem.findUnique({
      where: {
        id,
        isActive: true,
        deletedAt: null
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      }
    });

    // Verificar se existe e se está publicado
    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    // Buscar projetos relacionados (por enquanto, mesmo categoria)
    const relatedProjects = await prisma.portfolioItem.findMany({
      where: {
        id: { not: id },
        category: portfolioItem.category,
        isActive: true,
        deletedAt: null
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        mainImage: true,
        category: true
      }
    });

    return NextResponse.json({
      portfolioItem,
      relatedProjects
    });

  } catch (error) {
    console.error('Erro ao buscar projeto individual:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 