import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Verificar visibilidade de uma página específica (público)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 })
    }

    const pageVisibility = await prisma.pageVisibility.findUnique({
      where: { slug },
      select: { 
        slug: true, 
        isVisible: true, 
        title: true 
      }
    })

    if (!pageVisibility) {
      // Se a página não está configurada, assumir que está visível (fail-safe)
      return NextResponse.json({ 
        slug, 
        isVisible: true, 
        title: slug,
        message: 'Page not configured, defaulting to visible' 
      }, { status: 200 })
    }

    return NextResponse.json({ 
      slug: pageVisibility.slug,
      isVisible: pageVisibility.isVisible,
      title: pageVisibility.title
    }, { status: 200 })
  } catch (error) {
    console.error('Error checking page visibility:', error)
    
    // Em caso de erro, assumir que está visível (fail-safe)
    return NextResponse.json({ 
      slug: 'unknown', 
      isVisible: true,
      error: 'Database error, defaulting to visible'
    }, { status: 200 })
  }
} 