import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { checkAdminAuth } from '@/lib/check-admin';

// Schema de validação para atualização de item do portfólio
const updatePortfolioSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo').optional(),
  description: z.string().optional().nullable(),
  detailedDescription: z.string().optional().nullable(),
  category: z.enum(['WEDDING_RINGS', 'REPAIRS_BEFORE_AFTER', 'GOLD_PLATING', 'CUSTOM_JEWELRY', 'GRADUATION_RINGS'], {
    errorMap: () => ({ message: 'Categoria inválida' })
  }).optional(),
  customCategory: z.string().optional().nullable(),
  mainImage: z.string().optional(),
  images: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  status: z.string().regex(/^(DRAFT|PUBLISHED|FEATURED)$/, 'Status inválido').optional(),
  order: z.number().int('Ordem deve ser um número inteiro').min(0, 'Ordem não pode ser negativa').optional(),
  specifications: z.record(z.string()).optional().nullable(),
  seoTitle: z.string().optional().nullable().refine((val) => !val || val.length <= 60, {
    message: 'Título SEO deve ter no máximo 60 caracteres'
  }),
  seoDescription: z.string().optional().nullable().refine((val) => !val || val.length <= 160, {
    message: 'Descrição SEO deve ter no máximo 160 caracteres'
  }),
  keywords: z.array(z.string().min(1, 'Palavra-chave não pode estar vazia')).optional(),
  relatedProjects: z.array(z.string().min(1, 'ID do projeto relacionado inválido')).optional(),
  productId: z.string().optional().nullable(),
});

// GET /api/admin/portfolio/[id] - Buscar item específico
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await checkAdminAuth();
  if ('error' in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  const { id } = await params;
  try {
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
  const authResult = await checkAdminAuth();
  if ('error' in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  const { userId } = authResult;
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = updatePortfolioSchema.parse(body);

    // Verificar se o item existe
    const existingItem = await prisma.portfolioItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
    }

    // Preparar dados para o Prisma
    const updateData = {
      ...validatedData,
      ...(validatedData.specifications !== undefined && {
        specifications: validatedData.specifications as any,
      }),
    };

    // Atualizar item do portfólio
    const portfolioItem = await prisma.portfolioItem.update({
      where: { id },
      data: updateData,
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
      console.error('Erro de validação ao atualizar portfolio:', {
        errors: error.errors,
        timestamp: new Date().toISOString()
      });
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao atualizar item do portfólio:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      timestamp: new Date().toISOString()
    });
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
  const authResult = await checkAdminAuth();
  if ('error' in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  const { userId } = authResult;
  const { id } = await params;
  try {
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '16mb',
    },
  },
}; 