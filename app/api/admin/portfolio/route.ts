import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { checkAdminAuth } from "@/lib/check-admin";

// Schema de validação para criação de item do portfólio
const createPortfolioSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo'),
  description: z.string().optional().nullable(),
  detailedDescription: z.string().optional().nullable(),
  category: z.enum(['WEDDING_RINGS', 'REPAIRS_BEFORE_AFTER', 'GOLD_PLATING', 'CUSTOM_JEWELRY', 'GRADUATION_RINGS'], {
    errorMap: () => ({ message: 'Categoria inválida' })
  }),
  customCategory: z.string().optional().nullable(),
  mainImage: z.string().min(1, 'Imagem principal é obrigatória'),
  images: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  status: z.string().regex(/^(DRAFT|PUBLISHED|FEATURED)$/, 'Status inválido').default('DRAFT'),
  order: z.number().int('Ordem deve ser um número inteiro').min(0, 'Ordem não pode ser negativa').default(0),
  specifications: z.record(z.string()).optional().nullable(),
  seoTitle: z.string().optional().nullable().refine((val) => !val || val.length <= 60, {
    message: 'Título SEO deve ter no máximo 60 caracteres'
  }),
  seoDescription: z.string().optional().nullable().refine((val) => !val || val.length <= 160, {
    message: 'Descrição SEO deve ter no máximo 160 caracteres'
  }),
  keywords: z.array(z.string().min(1, 'Palavra-chave não pode estar vazia')).default([]),
  relatedProjects: z.array(z.string().min(1, 'ID do projeto relacionado inválido')).default([]),
  productId: z.string().optional().nullable(),
});

// GET /api/admin/portfolio - Listar itens do portfólio
export async function GET() {
  const authResult = await checkAdminAuth();
  if ("error" in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  const { userId } = authResult;
  try {
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
  const authResult = await checkAdminAuth();
  if ("error" in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  const { userId } = authResult;
  try {
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
      console.error('Erro de validação ao criar portfolio:', {
        userId,
        errors: error.errors,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      );
    }

    console.error('Erro ao criar item do portfólio:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
      userId,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
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