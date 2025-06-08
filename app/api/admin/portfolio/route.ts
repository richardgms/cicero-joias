import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação para criação de item do portfólio
const createPortfolioSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  detailedDescription: z.string().optional(),
  category: z.enum(['WEDDING_RINGS', 'REPAIRS_BEFORE_AFTER', 'GOLD_PLATING', 'CUSTOM_JEWELRY', 'GRADUATION_RINGS']),
  customCategory: z.string().optional(),
  mainImage: z.string().min(1, 'Imagem principal é obrigatória'),
  images: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  status: z.enum(['DRAFT', 'PUBLISHED', 'FEATURED']).default('DRAFT'),
  order: z.number().default(0),
  specifications: z.record(z.string()).optional().nullable(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  relatedProjects: z.array(z.string()).default([]),
  productId: z.string().optional(),
});

// GET /api/admin/portfolio - Listar itens do portfólio
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Verificar se é admin
    const { clerkClient } = await import('@clerk/nextjs/server');
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userRole = (user.publicMetadata?.role as string)?.toLowerCase();

    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    // Buscar itens do portfólio
    const portfolioItems = await prisma.portfolioItem.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ portfolioItems });
  } catch (error) {
    console.error('Erro ao buscar portfólio:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/admin/portfolio - Criar item do portfólio
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Verificar se é admin
    const { clerkClient } = await import('@clerk/nextjs/server');
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userRole = (user.publicMetadata?.role as string)?.toLowerCase();

    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = createPortfolioSchema.parse(body);

    // Preparar dados para o Prisma
    const createData = {
      ...validatedData,
      ...(validatedData.specifications !== undefined && {
        specifications: validatedData.specifications as any,
      }),
    };

    // Criar item do portfólio
    const portfolioItem = await prisma.portfolioItem.create({
      data: createData,
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Log da atividade
    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entity: 'PortfolioItem',
        entityId: portfolioItem.id,
        description: `Item "${portfolioItem.title}" criado no portfólio`,
        userId,
      },
    });

    return NextResponse.json({ portfolioItem }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao criar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 