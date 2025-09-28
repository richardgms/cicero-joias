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
  mainImage: z.string().min(1, 'Imagem principal é obrigatória').refine((val) => {
    // Accept both URLs and base64 images
    return val.startsWith('http') || val.startsWith('data:image') || val.length > 0;
  }, 'Formato de imagem inválido'),
  images: z.union([z.array(z.string()), z.string()]).transform((val) => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val || [];
  }),
  isActive: z.union([z.boolean(), z.string()]).transform((val) => {
    if (typeof val === 'string') {
      return val === 'true' || val === '1';
    }
    return val !== false;
  }).default(true),
  status: z.string().regex(/^(DRAFT|PUBLISHED|FEATURED)$/, 'Status inválido').default('DRAFT'),
  order: z.union([z.number(), z.string()]).transform((val) => {
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return val || 0;
  }).refine((val) => val >= 0, 'Ordem não pode ser negativa'),
  specifications: z.union([z.record(z.string()), z.string()]).transform((val) => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return null;
      }
    }
    return val;
  }).optional().nullable(),
  seoTitle: z.string().optional().nullable().refine((val) => !val || val.length <= 60, {
    message: 'Título SEO deve ter no máximo 60 caracteres'
  }),
  seoDescription: z.string().optional().nullable().refine((val) => !val || val.length <= 160, {
    message: 'Descrição SEO deve ter no máximo 160 caracteres'
  }),
  keywords: z.union([z.array(z.string()), z.string()]).transform((val) => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val || [];
  }),
  relatedProjects: z.union([z.array(z.string()), z.string()]).transform((val) => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val || [];
  }),
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
  const debugInfo: string[] = [];
  const startTime = Date.now();

  try {
    debugInfo.push(`POST started at ${new Date().toISOString()}`);

    // Teste 1: Parse do request body
    let body: any;
    try {
      body = await request.json();
      debugInfo.push(`Request body parsed successfully - keys: ${Object.keys(body).join(', ')}`);
    } catch (bodyError) {
      debugInfo.push(`Request body parse failed: ${bodyError instanceof Error ? bodyError.message : String(bodyError)}`);
      return NextResponse.json(
        { error: 'Dados inválidos no corpo da requisição', debug: debugInfo },
        {
          status: 400,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }

    // Teste 2: Autenticação
    const authResult = await checkAdminAuth();
    if ("error" in authResult) {
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

    // Teste 3: Validação dos dados
    let validatedData;
    try {
      validatedData = createPortfolioSchema.parse(body);
      debugInfo.push(`Data validation successful - title: "${validatedData.title}", category: ${validatedData.category}`);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const validationDetails = validationError.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
          received: e.received,
          code: e.code
        }));

        debugInfo.push(`Validation failed on fields: ${validationDetails.map(d => `${d.field} (${d.message})`).join(', ')}`);

        return NextResponse.json(
          {
            error: 'Dados inválidos para criação',
            details: validationDetails,
            debug: debugInfo,
            receivedData: Object.keys(body).reduce((acc, key) => {
              acc[key] = typeof body[key] === 'string' && body[key].length > 100
                ? `${body[key].substring(0, 100)}... (${body[key].length} chars)`
                : body[key];
              return acc;
            }, {} as any)
          },
          {
            status: 400,
            headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
          }
        );
      }
      debugInfo.push(`Unexpected validation error: ${validationError instanceof Error ? validationError.message : String(validationError)}`);
      return NextResponse.json(
        { error: 'Erro de validação', debug: debugInfo },
        {
          status: 400,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }

    // Teste 4: Preparar dados para o Prisma
    let createData;
    try {
      createData = {
        ...validatedData,
        ...(validatedData.specifications !== undefined && {
          specifications: validatedData.specifications as any,
        }),
      };
      debugInfo.push('Data preparation for Prisma successful');
    } catch (prepError) {
      debugInfo.push(`Data preparation failed: ${prepError instanceof Error ? prepError.message : String(prepError)}`);
      return NextResponse.json(
        { error: 'Erro na preparação dos dados', debug: debugInfo },
        {
          status: 500,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }

    // Teste 5: Conexão com banco
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

    // Teste 6: Criar item do portfólio
    let portfolioItem;
    try {
      portfolioItem = await prisma.portfolioItem.create({
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
      debugInfo.push(`Portfolio item created successfully with ID: ${portfolioItem.id}`);
    } catch (createError) {
      debugInfo.push(`Portfolio creation failed: ${createError instanceof Error ? createError.message : String(createError)}`);

      // Verificar tipos específicos de erro
      if (createError instanceof Error) {
        if (createError.message.includes('Unique constraint')) {
          return NextResponse.json(
            { error: 'Já existe um item com essas informações', debug: debugInfo },
            {
              status: 409,
              headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
            }
          );
        }

        if (createError.message.includes('Foreign key constraint')) {
          return NextResponse.json(
            { error: 'Produto relacionado não encontrado', debug: debugInfo },
            {
              status: 400,
              headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
            }
          );
        }

        if (createError.message.includes('Invalid')) {
          return NextResponse.json(
            { error: 'Dados inválidos para criação', debug: debugInfo },
            {
              status: 400,
              headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
            }
          );
        }
      }

      return NextResponse.json(
        { error: 'Erro ao criar item do portfólio', debug: debugInfo },
        {
          status: 500,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
        }
      );
    }

    // Teste 7: Log da atividade
    try {
      await prisma.activityLog.create({
        data: {
          action: 'CREATE',
          entity: 'PortfolioItem',
          entityId: portfolioItem.id,
          description: `Item "${portfolioItem.title}" criado no portfólio`,
          userId,
        },
      });
      debugInfo.push('Activity log created successfully');
    } catch (logError) {
      debugInfo.push(`Activity log failed: ${logError instanceof Error ? logError.message : String(logError)}`);
      // Não falhar a operação por causa do log
    }

    const endTime = Date.now();
    debugInfo.push(`Creation completed successfully in ${endTime - startTime}ms`);

    return NextResponse.json(
      { portfolioItem, debug: debugInfo },
      {
        status: 201,
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
      sizeLimit: '50mb', // Increased for large base64 images
    },
  },
}; 