import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação para criação de produto
const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  price: z.number().positive('Preço deve ser positivo').optional().nullable(),
  category: z.enum(['JEWELRY', 'RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS', 'WATCHES', 'ACCESSORIES']),
  isActive: z.boolean().default(true),
  isReadyDelivery: z.boolean().default(false),
  mainImage: z.string().optional(),
  images: z.array(z.string()).default([]),
  stock: z.number().int().min(0, 'Estoque não pode ser negativo').default(0),
  weight: z.number().positive('Peso deve ser positivo').optional().nullable(),
  material: z.string().optional(),
  size: z.string().optional(),
  code: z.string().optional(),
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

// GET /api/admin/products - Listar produtos
export async function GET() {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Buscar produtos
    const products = await prisma.product.findMany({
      include: {
        portfolioItems: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [
        { isActive: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/admin/products - Criar produto
export async function POST(request: Request) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const body = await request.json();
    const validatedData = createProductSchema.parse(body);

    // Verificar se código já existe (se fornecido)
    if (validatedData.code) {
      const existingProduct = await prisma.product.findUnique({
        where: { code: validatedData.code },
      });

      if (existingProduct) {
        return NextResponse.json(
          { error: 'Código do produto já existe' },
          { status: 400 }
        );
      }
    }

    // Preparar dados para o Prisma (converter números para Decimal se necessário)
    const prismaData = {
      ...validatedData,
      price: validatedData.price ? parseFloat(validatedData.price.toString()) : null,
      weight: validatedData.weight ? parseFloat(validatedData.weight.toString()) : null,
    };

    // Criar produto
    const product = await prisma.product.create({
      data: prismaData,
      include: {
        portfolioItems: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Log da atividade
    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entity: 'Product',
        entityId: product.id,
        description: `Produto "${product.name}" criado`,
        userId: authResult.userId,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 