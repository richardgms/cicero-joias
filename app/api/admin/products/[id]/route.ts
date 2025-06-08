import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação para atualização de produto
const updateProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  description: z.string().optional(),
  price: z.number().positive('Preço deve ser positivo').optional(),
  category: z.enum(['JEWELRY', 'RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS', 'WATCHES', 'ACCESSORIES']).optional(),
  isActive: z.boolean().optional(),
  isReadyDelivery: z.boolean().optional(),
  mainImage: z.string().optional(),
  images: z.array(z.string()).optional(),
  stock: z.number().int().min(0, 'Estoque não pode ser negativo').optional(),
  weight: z.number().positive('Peso deve ser positivo').optional(),
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

// GET /api/admin/products/[id] - Buscar produto específico
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
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        portfolioItems: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products/[id] - Atualizar produto
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateProductSchema.parse(body);

    // Verificar se produto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    // Verificar se código já existe (se fornecido e diferente do atual)
    if (validatedData.code && validatedData.code !== existingProduct.code) {
      const productWithCode = await prisma.product.findUnique({
        where: { code: validatedData.code },
      });

      if (productWithCode) {
        return NextResponse.json(
          { error: 'Código do produto já existe' },
          { status: 400 }
        );
      }
    }

    // Atualizar produto
    const product = await prisma.product.update({
      where: { id },
      data: validatedData,
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
        action: 'UPDATE',
        entity: 'Product',
        entityId: product.id,
        description: `Produto "${product.name}" atualizado`,
        userId: authResult.userId,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[id] - Deletar produto
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { id } = await params;
    // Verificar se produto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        portfolioItems: true,
      },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    // Verificar se produto está vinculado a itens do portfólio
    if (existingProduct.portfolioItems.length > 0) {
      return NextResponse.json(
        { 
          error: 'Não é possível deletar produto vinculado a itens do portfólio',
          details: `Produto está vinculado a ${existingProduct.portfolioItems.length} item(s) do portfólio`
        },
        { status: 400 }
      );
    }

    // Deletar produto
    await prisma.product.delete({
      where: { id },
    });

    // Log da atividade
    await prisma.activityLog.create({
      data: {
        action: 'DELETE',
        entity: 'Product',
        entityId: id,
        description: `Produto "${existingProduct.name}" removido`,
        userId: authResult.userId,
      },
    });

    return NextResponse.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 