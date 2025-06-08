import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação para atualização de item do portfólio
const updatePortfolioSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').optional(),
  description: z.string().optional(),
  detailedDescription: z.string().optional(),
  category: z.enum(['WEDDING_RINGS', 'REPAIRS_BEFORE_AFTER', 'GOLD_PLATING', 'CUSTOM_JEWELRY', 'GRADUATION_RINGS']).optional(),
  customCategory: z.string().optional(),
  mainImage: z.string().optional(),
  images: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'FEATURED']).optional(),
  order: z.number().optional(),
  specifications: z.record(z.string()).optional().nullable(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  relatedProjects: z.array(z.string()).optional(),
  productId: z.string().optional(),
});

async function checkAdminAuth() {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'Não autorizado', status: 401 };
  }

  try {
    const { clerkClient } = await import('@clerk/nextjs/server');
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userRole = (user.publicMetadata?.role as string)?.toLowerCase();

    if (userRole !== 'admin') {
      return { error: 'Acesso negado', status: 403 };
    }

    return { userId };
  } catch (error) {
    return { error: 'Erro de autenticação', status: 500 };
  }
}

// GET /api/admin/portfolio/[id] - Buscar item específico
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { id } = await params;

    const portfolioItem = await prisma.portfolioItem.findUnique({
      where: { id },
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

    if (!portfolioItem) {
      return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ portfolioItem });
  } catch (error) {
    console.error('Erro ao buscar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/portfolio/[id] - Atualizar item do portfólio
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = authResult;
    const { id } = await params;

    const body = await request.json();
    const validatedData = updatePortfolioSchema.parse(body);

    // Verificar se o item existe
    const existingItem = await prisma.portfolioItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
    }

    // Atualizar item do portfólio
    const portfolioItem = await prisma.portfolioItem.update({
      where: { id },
      data: validatedData,
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

    // Log da atividade
    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entity: 'PortfolioItem',
        entityId: portfolioItem.id,
        description: `Item "${portfolioItem.title}" atualizado no portfólio`,
        userId,
      },
    });

    return NextResponse.json({ portfolioItem });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao atualizar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/portfolio/[id] - Deletar item do portfólio
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = authResult;
    const { id } = await params;

    // Verificar se o item existe
    const existingItem = await prisma.portfolioItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
    }

    // Deletar item do portfólio
    await prisma.portfolioItem.delete({
      where: { id },
    });

    // Log da atividade
    await prisma.activityLog.create({
      data: {
        action: 'DELETE',
        entity: 'PortfolioItem',
        entityId: id,
        description: `Item "${existingItem.title}" deletado do portfólio`,
        userId,
      },
    });

    return NextResponse.json({ message: 'Item deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 