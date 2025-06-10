import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schemas de validação
const updateVisibilitySchema = z.object({
  slug: z.string().min(1),
  isVisible: z.boolean(),
  changeReason: z.string().optional()
})

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

    const pages = await prisma.pageVisibility.findMany({
      orderBy: { priority: 'asc' },
      include: {
        visibilityLogs: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    return NextResponse.json({ pages }, { status: 200 })
  } catch (error) {
    console.error('Error fetching page visibility:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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

    // Buscar configuração atual
    const currentPage = await prisma.pageVisibility.findUnique({
      where: { slug }
    })

    if (!currentPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
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

    return NextResponse.json({ 
      page: updatedPage,
      log,
      message: `Page "${currentPage.title}" visibility updated successfully`
    }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data', details: error.errors }, { status: 400 })
    }
    
    console.error('Error updating page visibility:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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