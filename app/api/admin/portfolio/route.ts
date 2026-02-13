import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import prisma, { executeWithRetry } from '@/lib/prisma';
import { z } from 'zod';
import { checkAdminAuth } from "@/lib/check-admin";
import { logger } from '@/lib/logger';




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
  isFeatured: z.union([z.boolean(), z.string()]).transform((val) => {
    if (typeof val === 'string') {
      return val === 'true' || val === '1';
    }
    return val !== false;
  }).default(false).optional(),
  status: z.string().regex(/^(DRAFT|PUBLISHED|FEATURED|ARCHIVED)$/, 'Status inválido').default('ARCHIVED'),
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
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();
  const debugInfo: string[] = [];

  try {
    logger.debug(`[${requestId}] Portfolio GET: Starting`);

    // Etapa 1: Teste de autenticação com timing
    const authStart = Date.now();
    let authResult;

    try {
      authResult = await checkAdminAuth();
      const authDuration = Date.now() - authStart;
      logger.debug(`[${requestId}] Auth completed in ${authDuration}ms`);
    } catch (authError) {
      const authDuration = Date.now() - authStart;
      logger.error(`[${requestId}] Auth exception after ${authDuration}ms:`, authError);
      throw authError;
    }

    if ("error" in authResult) {
      logger.error(`[${requestId}] Auth failed: ${authResult.error}`);
      return NextResponse.json(
        {
          error: authResult.error,
          debug: debugInfo,
          details: authResult.details
        },
        {
          status: authResult.status,
          headers: { 'X-Debug-Info': JSON.stringify(debugInfo), 'X-Request-ID': requestId }
        }
      );
    }

    const { userId } = authResult;
    logger.debug(`[${requestId}] Auth successful for userId: ${userId}`);

    // Prisma handles connection lazily — removed explicit $connect() and SELECT 1 test

    // Etapa 4: Teste de contagem da tabela
    const countStart = Date.now();
    let itemCount;
    try {
      itemCount = await prisma.portfolioItem.count();
      const countDuration = Date.now() - countStart;
      logger.debug(`[${requestId}] Portfolio count: ${itemCount} items in ${countDuration}ms`);
    } catch (countError) {
      logger.error(`[${requestId}] Portfolio count failed:`, countError);
      throw countError;
    }

    // Etapa 5: Query completa com executeWithRetry
    const fullQueryStart = Date.now();
    let portfolioItems;
    try {
      logger.debug(`[${requestId}] Starting full portfolio query...`);

      portfolioItems = await executeWithRetry(async () => {

        return await prisma.portfolioItem.findMany({
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
      });

      const fullQueryDuration = Date.now() - fullQueryStart;
      logger.debug(`[${requestId}] Full query: ${portfolioItems.length} items in ${fullQueryDuration}ms`);
    } catch (fullQueryError) {
      const failDuration = Date.now() - fullQueryStart;
      logger.error(`[${requestId}] Full query failed after ${failDuration}ms:`, fullQueryError);

      throw fullQueryError;
    }

    const totalDuration = Date.now() - startTime;
    logger.debug(`[${requestId}] Request completed in ${totalDuration}ms`);

    return NextResponse.json(
      { portfolioItems, debug: debugInfo },
      {
        headers: {

          'X-Request-ID': requestId,
          'X-Total-Duration': `${totalDuration}ms`,
          'X-Items-Count': portfolioItems.length.toString()
        }
      }
    );

  } catch (error) {
    const totalDuration = Date.now() - startTime;
    const errorInfo = {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
      requestId,
      duration: totalDuration,
      timestamp: new Date().toISOString(),
    };

    logger.error(`[${requestId}] Request failed after ${totalDuration}ms:`, errorInfo.message);

    // Categorizar erro por tipo
    let statusCode = 500;
    let userMessage = 'Erro interno do servidor';

    if (error instanceof Error) {
      if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        statusCode = 503;
        userMessage = 'Erro de conexão com o banco de dados';
        debugInfo.push(`[DB] [${requestId}] Categorized as database connection error`);
      } else if (error.message.includes('timeout')) {
        statusCode = 504;
        userMessage = 'Timeout na operação';
        debugInfo.push(`[TIMEOUT] [${requestId}] Categorized as timeout error`);
      } else if (error.message.includes('prepared statement')) {
        statusCode = 503;
        userMessage = 'Erro temporário do servidor - tente novamente';
        debugInfo.push(`[INFO] [${requestId}] Categorized as prepared statement error`);
      } else if (error.message.includes('Não autorizado') || error.message.includes('Acesso negado')) {
        statusCode = error.message.includes('Não autorizado') ? 401 : 403;
        userMessage = error.message;
        debugInfo.push(`[AUTH] [${requestId}] Categorized as auth error`);
      }
    }


    logger.error(`[${requestId}] Final categorization: ${statusCode} - ${userMessage}`);

    // GARANTIA: Sempre retornar JSON válido mesmo em caso de erro fatal
    return NextResponse.json(
      {
        error: userMessage,
        debug: debugInfo,
        errorDetails: process.env.NODE_ENV === 'development' ? errorInfo : undefined,
        requestId
      },
      {
        status: statusCode,
        headers: {

          'X-Request-ID': requestId,
          'X-Error-Type': errorInfo.name,
          'X-Total-Duration': `${totalDuration}ms`
        }
      }
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
        {
          error: authResult.error,
          debug: debugInfo,
          details: authResult.details
        },
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
          received: 'received' in e ? e.received : undefined,
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
    type CreatePortfolioData = z.infer<typeof createPortfolioSchema>;
    let createData: CreatePortfolioData;
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

    // Teste 5.5: Validar limite de itens destacados
    if (createData.isFeatured) {
      try {
        const featuredCount = await prisma.portfolioItem.count({
          where: { isFeatured: true },
        });
        if (featuredCount >= 3) {
          debugInfo.push(`Featured limit reached: ${featuredCount}/3`);
          return NextResponse.json(
            { error: 'Limite de 3 destaques atingido. Desmarque um item para adicionar outro.', debug: debugInfo },
            {
              status: 400,
              headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
            }
          );
        }
        debugInfo.push(`Featured count check passed: ${featuredCount}/3`);
      } catch (countError) {
        debugInfo.push(`Featured count check failed: ${countError instanceof Error ? countError.message : String(countError)}`);
      }
    }

    // Teste 6: Criar item do portfólio (com retry otimizado para prepared statement errors)
    let portfolioItem: any;
    try {
      portfolioItem = await executeWithRetry(async () => {
        return await prisma.portfolioItem.create({
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
      });
      debugInfo.push(`Portfolio item created successfully with ID: ${portfolioItem.id}`);
    } catch (createError) {
      const errorMessage = createError instanceof Error ? createError.message : String(createError);
      debugInfo.push(`Creation failed: ${errorMessage}`);

      // Verificar tipos específicos de erro
      if (errorMessage.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Já existe um item com essas informações', debug: debugInfo },
          {
            status: 409,
            headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
          }
        );
      }

      if (errorMessage.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: 'Produto relacionado não encontrado', debug: debugInfo },
          {
            status: 400,
            headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
          }
        );
      }

      if (errorMessage.includes('prepared statement') && errorMessage.includes('already exists')) {
        return NextResponse.json(
          { error: 'Erro temporário do servidor. Tente novamente em alguns segundos.', debug: debugInfo },
          {
            status: 503,
            headers: { 'X-Debug-Info': JSON.stringify(debugInfo) }
          }
        );
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
      await executeWithRetry(async () => {
        return await prisma.activityLog.create({
          data: {
            action: 'CREATE',
            entity: 'PortfolioItem',
            entityId: portfolioItem.id,
            description: `Item "${portfolioItem.title}" criado no portfólio`,
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
    debugInfo.push(`Creation completed successfully in ${endTime - startTime}ms`);

    return NextResponse.json(
      { portfolioItem, debug: debugInfo },
      {
        status: 201,
        headers: {

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