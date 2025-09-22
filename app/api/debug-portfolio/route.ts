import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { checkAdminAuth } from "@/lib/check-admin";

// Schema corrigido para debug
const debugPortfolioSchema = z.object({
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
  keywords: z.array(z.string()).default([]), // Removido .min(1) que causava erro com array vazio
  relatedProjects: z.array(z.string()).default([]), // Removido .min(1) que causava erro com array vazio
  productId: z.string().optional().nullable(),
});

// POST de debug para testar validação
export async function POST(request: Request) {
  const authResult = await checkAdminAuth();
  if ("error" in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  const { userId } = authResult;

  try {
    const body = await request.json();
    console.log('Dados recebidos:', body);

    // Testar validação
    const validatedData = debugPortfolioSchema.parse(body);
    console.log('Dados validados:', validatedData);

    // Preparar dados para o Prisma
    const createData = {
      ...validatedData,
      ...(validatedData.specifications !== undefined && {
        specifications: validatedData.specifications as any,
      }),
    };

    console.log('Dados para criação:', createData);

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

    console.log('Item criado:', portfolioItem);

    // Log da atividade
    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entity: 'PortfolioItem',
        entityId: portfolioItem.id,
        description: `Item "${portfolioItem.title}" criado no portfólio (DEBUG)`,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      portfolioItem,
      message: 'Item criado com sucesso via debug API'
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erro de validação (DEBUG):', {
        userId,
        errors: error.errors,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      );
    }

    console.error('Erro ao criar item do portfólio (DEBUG):', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
      userId,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 },
    );
  }
}