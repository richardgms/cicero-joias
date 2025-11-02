import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import prisma, { executeWithRetry } from '@/lib/prisma';
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
  isFeatured: z.boolean().optional(),
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
    const portfolioItem = await executeWithRetry(async () => {
      return await prisma.portfolioItem.findUnique({
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
    const existingItem = await executeWithRetry(async () => {
      return await prisma.portfolioItem.findUnique({
        where: { id },
      });
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

    // Validar limite de itens destacados (se tentando marcar como featured)
    if (updateData.isFeatured && !existingItem.isFeatured) {
      const featuredCount = await prisma.portfolioItem.count({
        where: { isFeatured: true },
      });
      if (featuredCount >= 3) {
        return NextResponse.json(
          { error: 'Limite de 3 destaques atingido. Desmarque um item para adicionar outro.' },
          { status: 400 }
        );
      }
    }

    // Atualizar item do portfólio
    const portfolioItem = await executeWithRetry(async () => {
      return await prisma.portfolioItem.update({
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
    });

    // Log da atividade
    await executeWithRetry(async () => {
      return await prisma.activityLog.create({
        data: {
          action: 'UPDATE',
          entity: 'PortfolioItem',
          entityId: portfolioItem.id,
          description: `Item "${portfolioItem.title}" atualizado no portfólio`,
          userId,
        },
      });
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
  const debugInfo: string[] = [];
  const startTime = Date.now();

  try {
    debugInfo.push(`DELETE started at ${new Date().toISOString()}`);

    // Teste 1: Autenticação
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      debugInfo.push(`Auth failed: ${authResult.error}`);
      return NextResponse.json(
        { error: authResult.error, debug: debugInfo },
        {
          status: authResult.status,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }
    const { userId } = authResult;
    debugInfo.push(`Auth successful for user: ${userId}`);

    // Teste 2: Parâmetros
    const { id } = await params;
    if (!id || typeof id !== 'string') {
      debugInfo.push(`Invalid ID parameter: ${id}`);
      return NextResponse.json(
        { error: 'ID inválido', debug: debugInfo },
        {
          status: 400,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }
    debugInfo.push(`Processing delete for ID: ${id}`);

    // Teste 3: Conexão com banco
    try {
      await prisma.$connect();
      debugInfo.push('Database connection successful');
    } catch (dbConnectError) {
      debugInfo.push(`Database connection failed: ${dbConnectError instanceof Error ? dbConnectError.message : String(dbConnectError)}`);
      return NextResponse.json(
        { error: 'Erro de conexão com banco de dados', debug: debugInfo },
        {
          status: 500,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }

    // Teste 4: Verificar se o item existe
    let existingItem: any;
    try {
      existingItem = await executeWithRetry(async () => {
        return await prisma.portfolioItem.findUnique({
          where: { id },
          include: {
            favorites: true // Verificar dependências
          }
        });
      });
      debugInfo.push(`Find query executed for ID: ${id}`);
    } catch (findError) {
      debugInfo.push(`Find query failed: ${findError instanceof Error ? findError.message : String(findError)}`);
      return NextResponse.json(
        { error: 'Erro ao buscar item', debug: debugInfo },
        {
          status: 500,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }

    if (!existingItem) {
      debugInfo.push('Item not found in database');
      return NextResponse.json(
        { error: 'Item não encontrado', debug: debugInfo },
        {
          status: 404,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }
    debugInfo.push(`Item found: "${existingItem.title}" with ${existingItem.favorites.length} favorites`);

    // Teste 5: Verificar dependências antes de deletar
    if (existingItem.favorites.length > 0) {
      debugInfo.push(`Item has ${existingItem.favorites.length} favorites - removing them first`);
      try {
        await executeWithRetry(async () => {
          return await prisma.favorite.deleteMany({
            where: { portfolioItemId: id }
          });
        });
        debugInfo.push('Related favorites deleted successfully');
      } catch (favDeleteError) {
        debugInfo.push(`Failed to delete favorites: ${favDeleteError instanceof Error ? favDeleteError.message : String(favDeleteError)}`);
        return NextResponse.json(
          { error: 'Erro ao remover dependências', debug: debugInfo },
          {
            status: 500,
            headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
          }
        );
      }
    }

    // Teste 6: Deletar o item
    try {
      await executeWithRetry(async () => {
        return await prisma.portfolioItem.delete({
          where: { id },
        });
      });
      debugInfo.push('Portfolio item deleted successfully');
    } catch (deleteError) {
      debugInfo.push(`Delete failed: ${deleteError instanceof Error ? deleteError.message : String(deleteError)}`);

      // Verificar tipo específico de erro
      if (deleteError instanceof Error) {
        if (deleteError.message.includes('Foreign key constraint')) {
          return NextResponse.json(
            { error: 'Não é possível excluir: item possui dependências', debug: debugInfo },
            {
              status: 409,
              headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
            }
          );
        }
      }

      return NextResponse.json(
        { error: 'Erro ao deletar item', debug: debugInfo },
        {
          status: 500,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }

    // Teste 7: Log da atividade
    try {
      await executeWithRetry(async () => {
        return await prisma.activityLog.create({
          data: {
            action: 'DELETE',
            entity: 'PortfolioItem',
            entityId: id,
            description: `Item "${existingItem.title}" deletado do portfólio`,
            userId,
          },
        });
      });
      debugInfo.push('Activity log created successfully');
    } catch (logError) {
      debugInfo.push(`Activity log failed: ${logError instanceof Error ? logError.message : String(logError)}`);
      // Não falhar a operação por causa do log
    }

    const endTime = Date.now();
    debugInfo.push(`Delete completed successfully in ${endTime - startTime}ms`);

    return NextResponse.json(
      { message: 'Item deletado com sucesso', debug: debugInfo },
      {
        status: 200,
        headers: {
          'X-Debug-Info': JSON.stringify(debugInfo),
          'X-Operation-Time': `${endTime - startTime}ms`
        }
      }
    );

  } catch (error) {
    const endTime = Date.now();
    debugInfo.push(`Unexpected error after ${endTime - startTime}ms: ${error instanceof Error ? error.message : String(error)}`);

    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        debug: debugInfo,
        details: error instanceof Error ? {
          message: error.message,
          name: error.name
        } : String(error)
      },
      {
        status: 500,
        headers: {
          'X-Debug-Info': JSON.stringify(debugInfo),
          'X-Operation-Time': `${endTime - startTime}ms`
        }
      }
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