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
  keywords: z.array(z.string()).default([]),
  relatedProjects: z.array(z.string()).default([]),
  productId: z.string().optional().nullable(),
});

// GET /api/admin/portfolio - Listar itens do portfólio
export async function GET() {
  try {
    console.log('🔄 Portfolio GET: Starting request processing...');

    const authResult = await checkAdminAuth();
    if ("error" in authResult) {
      console.error('❌ Portfolio GET: Auth failed:', authResult.error);
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    const { userId } = authResult;
    console.log('✅ Portfolio GET: Auth successful for userId:', userId);

    // Verificar conexão com banco
    await prisma.$connect();
    console.log('🔗 Portfolio GET: Database connection successful');

    // Buscar itens do portfólio
    console.log('📊 Portfolio GET: Fetching portfolio items...');
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
    console.log(`✅ Portfolio GET: Found ${portfolioItems.length} portfolio items`);

    return NextResponse.json({ portfolioItems });
  } catch (error) {
    console.error('💥 Portfolio GET: Error occurred:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
      timestamp: new Date().toISOString(),
    });

    // Verificar se é erro de banco de dados
    if (error instanceof Error && (error.message.includes('connect') || error.message.includes('ECONNREFUSED'))) {
      console.error('💾 Portfolio GET: Database connection error');
      return NextResponse.json(
        { error: 'Erro de conexão com o banco de dados' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/admin/portfolio - Criar item do portfólio
export async function POST(request: Request) {
  console.log('🔄 Portfolio POST: Starting request processing...');

  try {
    // Teste básico primeiro
    const body = await request.json();
    console.log('📝 Portfolio POST: Request body keys:', Object.keys(body));

    // Verificar auth
    console.log('🔐 Portfolio POST: Checking auth...');
    const authResult = await checkAdminAuth();
    if ("error" in authResult) {
      console.error('❌ Portfolio POST: Auth failed:', authResult.error);
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    const { userId } = authResult;
    console.log('✅ Portfolio POST: Auth successful for userId:', userId);

    console.log('📝 Portfolio POST: Request body received:', {
      title: body.title,
      category: body.category,
      mainImageExists: !!body.mainImage,
      imagesCount: body.images?.length || 0
    });

    const validatedData = createPortfolioSchema.parse(body);
    console.log('✅ Portfolio POST: Data validation successful');

    // Preparar dados para o Prisma
    const createData = {
      ...validatedData,
      ...(validatedData.specifications !== undefined && {
        specifications: validatedData.specifications as any,
      }),
    };
    console.log('📊 Portfolio POST: Prepared data for Prisma');

    // Verificar conexão com banco
    await prisma.$connect();
    console.log('🔗 Portfolio POST: Database connection successful');

    // Criar item do portfólio
    console.log('💾 Portfolio POST: Creating portfolio item...');
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
    console.log('✅ Portfolio POST: Portfolio item created with ID:', portfolioItem.id);

    // Log da atividade
    console.log('📝 Portfolio POST: Creating activity log...');
    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entity: 'PortfolioItem',
        entityId: portfolioItem.id,
        description: `Item "${portfolioItem.title}" criado no portfólio`,
        userId,
      },
    });
    console.log('✅ Portfolio POST: Activity log created');

    console.log('🎉 Portfolio POST: Request completed successfully');
    return NextResponse.json({ portfolioItem }, { status: 201 });
  } catch (error) {
    console.error('💥 Portfolio POST: Error occurred:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
      timestamp: new Date().toISOString(),
    });

    if (error instanceof z.ZodError) {
      console.error('❌ Portfolio POST: Validation error:', {
        errors: error.errors,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      );
    }

    // Verificar se é erro de banco de dados
    if (error instanceof Error) {
      if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        console.error('💾 Portfolio POST: Database connection error');
        return NextResponse.json(
          { error: 'Erro de conexão com o banco de dados' },
          { status: 500 },
        );
      }

      if (error.message.includes('Unique constraint')) {
        console.error('🔐 Portfolio POST: Unique constraint violation');
        return NextResponse.json(
          { error: 'Já existe um item com essas informações' },
          { status: 409 },
        );
      }

      if (error.message.includes('Foreign key constraint')) {
        console.error('🔗 Portfolio POST: Foreign key constraint violation');
        return NextResponse.json(
          { error: 'Produto relacionado não encontrado' },
          { status: 400 },
        );
      }
    }

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