import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

// Schemas de validação
const updateVisibilitySchema = z.object({
  slug: z.string().min(1),
  isVisible: z.boolean(),
  changeReason: z.string().optional()
})

// Fallback data quando DB não está disponível
const DEFAULT_PAGES = [
  {
    id: 'default-1',
    slug: 'pronta-entrega',
    title: 'Pronta Entrega',
    description: 'Página de produtos prontos para entrega imediata',
    isVisible: false,
    priority: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    visibilityLogs: []
  },
  {
    id: 'default-2',
    slug: 'servicos',
    title: 'Serviços',
    description: 'Página com os serviços oferecidos pela Cícero Joias',
    isVisible: true,
    priority: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    visibilityLogs: []
  },
  {
    id: 'default-3',
    slug: 'portfolio',
    title: 'Portfólio',
    description: 'Galeria de trabalhos realizados pela Cícero Joias',
    isVisible: true,
    priority: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    visibilityLogs: []
  },
  {
    id: 'default-4',
    slug: 'sobre',
    title: 'Sobre Nós',
    description: 'História e informações sobre a Cícero Joias',
    isVisible: true,
    priority: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    visibilityLogs: []
  },

  {
    id: 'default-6',
    slug: 'minha-area',
    title: 'Minha Área',
    description: 'Área pessoal do usuário com cupons, favoritos e fidelidade',
    isVisible: true,
    priority: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    visibilityLogs: []
  }
];

// GET - Listar todas as configurações de visibilidade
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verificar se é admin - CORRIGIDO: usando publicMetadata
    const user = await currentUser()
    const userRole = (user?.publicMetadata?.role as string)?.toLowerCase()
    const isAdmin = userRole === 'admin'

    if (!isAdmin) {
      return NextResponse.json({
        error: 'Forbidden - Admin access required',
        debug: { userRole, publicMetadata: user?.publicMetadata }
      }, { status: 403 })
    }

    // Tentar buscar dados do database com timeout
    try {
      const queryPromise = prisma.pageVisibility.findMany({
        orderBy: { priority: 'asc' },
        include: {
          visibilityLogs: {
            take: 5,
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database query timeout')), 10000)
      );

      const pages = await Promise.race([queryPromise, timeoutPromise]) as any[];

      console.log(`[PAGE-VISIBILITY] Successfully fetched ${pages.length} pages from database`);
      return NextResponse.json({ pages }, { status: 200 })
    } catch (queryError) {
      console.error('[PAGE-VISIBILITY] Database query failed:', queryError);

      // Fallback para dados padrão em caso de erro de query
      console.warn('[PAGE-VISIBILITY] Using fallback data - query failed');
      return NextResponse.json({
        pages: DEFAULT_PAGES,
        warning: 'Using default configuration - database query failed'
      }, { status: 200 })
    }
  } catch (error) {
    console.error('[PAGE-VISIBILITY] Error fetching page visibility:', error)

    // Ultimate fallback
    console.warn('[PAGE-VISIBILITY] Using ultimate fallback data');
    return NextResponse.json({
      pages: DEFAULT_PAGES,
      warning: 'Using default configuration - system error'
    }, { status: 200 })
  }
}

// PUT - Atualizar visibilidade de uma página
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verificar se é admin - CORRIGIDO: usando publicMetadata
    const user = await currentUser()
    const userRole = (user?.publicMetadata?.role as string)?.toLowerCase()
    const isAdmin = userRole === 'admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const { slug, isVisible, changeReason } = updateVisibilitySchema.parse(body)

    // Verificar conexão com database testando uma query simples com timeout maior e retry
    const testDatabaseConnection = async (retries = 2): Promise<boolean> => {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const testPromise = prisma.$queryRaw`SELECT 1 as test`;
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Connection timeout')), 10000) // Aumentado para 10s
          );

          await Promise.race([testPromise, timeoutPromise]);
          console.log(`[PAGE-VISIBILITY-PUT] Database connection successful (attempt ${attempt})`);
          return true;
        } catch (dbError) {
          console.error(`[PAGE-VISIBILITY-PUT] Database connection failed (attempt ${attempt}):`, dbError);

          if (attempt === retries) {
            return false;
          }

          // Esperar 1 segundo antes de tentar novamente
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      return false;
    };

    const isConnected = await testDatabaseConnection();
    if (!isConnected) {
      return NextResponse.json({
        error: 'Database unavailable - changes cannot be saved',
        message: 'O banco de dados está temporariamente indisponível. As configurações não podem ser alteradas no momento. Verifique sua conexão de internet e tente novamente em alguns minutos.',
        temporary: true,
        details: 'Connection timeout after multiple attempts'
      }, { status: 503 });
    }

    // Tentar buscar e atualizar no database
    try {
      // Buscar configuração atual
      const currentPage = await prisma.pageVisibility.findUnique({
        where: { slug }
      })

      if (!currentPage) {
        // Se página não existe, criar uma nova com base nos dados padrão
        const defaultPage = DEFAULT_PAGES.find(p => p.slug === slug);
        if (!defaultPage) {
          return NextResponse.json({ error: 'Page not found in system' }, { status: 404 })
        }

        const newPage = await prisma.pageVisibility.create({
          data: {
            slug,
            title: defaultPage.title,
            description: defaultPage.description,
            isVisible,
            priority: defaultPage.priority
          }
        });

        // Criar log da criação
        await prisma.pageVisibilityLog.create({
          data: {
            pageSlug: slug,
            previousStatus: false,
            newStatus: isVisible,
            adminUserId: userId,
            adminEmail: user?.emailAddresses[0]?.emailAddress || 'unknown',
            changeReason: changeReason || 'Page created and configured'
          }
        });

        console.log(`[PAGE-VISIBILITY-PUT] Created new page configuration for ${slug}`);
        return NextResponse.json({
          page: newPage,
          message: `Page "${defaultPage.title}" created and visibility set successfully`
        }, { status: 201 })
      }

      // Atualizar visibilidade e criar log
      const [updatedPage, log] = await Promise.all([
        prisma.pageVisibility.update({
          where: { slug },
          data: {
            isVisible,
            updatedAt: new Date()
          }
        }),
        prisma.pageVisibilityLog.create({
          data: {
            pageSlug: slug,
            previousStatus: currentPage.isVisible,
            newStatus: isVisible,
            adminUserId: userId,
            adminEmail: user?.emailAddresses[0]?.emailAddress || 'unknown',
            changeReason
          }
        })
      ])

      console.log(`[PAGE-VISIBILITY-PUT] Updated ${slug} visibility to ${isVisible}`);
      return NextResponse.json({
        page: updatedPage,
        log,
        message: `Page "${currentPage.title}" visibility updated successfully`
      }, { status: 200 })
    } catch (queryError) {
      console.error('[PAGE-VISIBILITY-PUT] Database query failed:', queryError);
      return NextResponse.json({
        error: 'Database operation failed',
        message: 'Unable to update page visibility due to database error. Please try again.',
        temporary: true
      }, { status: 500 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data', details: error.errors }, { status: 400 })
    }

    console.error('[PAGE-VISIBILITY-PUT] Error updating page visibility:', error)
    return NextResponse.json({
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again.'
    }, { status: 500 })
  }
}

// POST - Criar nova configuração de página (se necessário)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verificar se é admin - CORRIGIDO: usando publicMetadata
    const user = await currentUser()
    const userRole = (user?.publicMetadata?.role as string)?.toLowerCase()
    const isAdmin = userRole === 'admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const createPageSchema = z.object({
      slug: z.string().min(1),
      title: z.string().min(1),
      description: z.string().optional(),
      isVisible: z.boolean().default(false),
      priority: z.number().default(0)
    })

    const body = await request.json()
    const pageData = createPageSchema.parse(body)

    const newPage = await prisma.pageVisibility.create({
      data: pageData
    })

    // Log da criação
    await prisma.pageVisibilityLog.create({
      data: {
        pageSlug: newPage.slug,
        previousStatus: false,
        newStatus: newPage.isVisible,
        adminUserId: userId,
        adminEmail: user?.emailAddresses[0]?.emailAddress || 'unknown',
        changeReason: 'Page configuration created'
      }
    })

    return NextResponse.json({
      page: newPage,
      message: `Page "${newPage.title}" created successfully`
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data', details: error.errors }, { status: 400 })
    }

    console.error('Error creating page visibility:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}