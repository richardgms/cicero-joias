import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Mapeamento das páginas com seus slugs para fallback
const PAGE_MAPPING = [
  { slug: 'servicos', title: 'Serviços', href: '/servicos' },
  { slug: 'sobre', title: 'Sobre Nós', href: '/sobre' },
  { slug: 'portfolio', title: 'Portfólio', href: '/portfolio' },
  { slug: 'pronta-entrega', title: 'Pronta Entrega', href: '/pronta-entrega' },

  { slug: 'minha-area', title: 'Minha Área', href: '/minha-area' }
]

// GET - Buscar apenas páginas visíveis (para menu de navegação)
export async function GET() {
  try {
    // Tentar buscar do banco de dados
    const pages = await prisma.pageVisibility.findMany({
      where: { isVisible: true },
      select: { slug: true, title: true, isVisible: true },
      orderBy: { priority: 'asc' }
    })

    // Mapear as páginas com seus HREFs
    const visiblePages = pages.map(page => {
      const mapping = PAGE_MAPPING.find(p => p.slug === page.slug)
      return {
        slug: page.slug,
        title: page.title,
        href: mapping?.href || `/${page.slug}`,
        isVisible: page.isVisible
      }
    })

    return NextResponse.json({ pages: visiblePages }, { status: 200 })
  } catch (error) {
    console.error('Error fetching visible pages:', error)

    // Fallback: retornar páginas padrão visíveis
    const fallbackPages = PAGE_MAPPING.filter(page => {
      // Por padrão, todas as páginas são visíveis exceto pronta-entrega
      return page.slug !== 'pronta-entrega'
    }).map(p => ({ ...p, isVisible: true }))

    return NextResponse.json({
      pages: fallbackPages,
      warning: 'Using fallback data - database query failed'
    }, { status: 200 })
  }
} 