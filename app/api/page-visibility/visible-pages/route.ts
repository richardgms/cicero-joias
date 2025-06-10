import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// Mapeamento das páginas com seus slugs
const PAGE_MAPPING = [
  { slug: 'sobre', title: 'Sobre Nós', href: '/sobre' },
  { slug: 'portfolio', title: 'Portfólio', href: '/portfolio' },
  { slug: 'pronta-entrega', title: 'Pronta Entrega', href: '/pronta-entrega' },
  { slug: 'orcamento', title: 'Orçamento', href: '/orcamento' }
]

// GET - Buscar apenas páginas visíveis (para menu de navegação)
export async function GET() {
  try {
    // TODO: Quando o Prisma funcionar, substituir por:
    // const pages = await prisma.pageVisibility.findMany({
    //   where: { isVisible: true },
    //   select: { slug: true, title: true, isVisible: true },
    //   orderBy: { priority: 'asc' }
    // })

    // Por enquanto, verificar individualmente
    const visiblePages = []
    
    for (const page of PAGE_MAPPING) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/page-visibility/check?slug=${page.slug}`, {
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.isVisible) {
            visiblePages.push({
              slug: page.slug,
              title: page.title,
              href: page.href,
              isVisible: true
            })
          }
        }
      } catch (error) {
        console.error(`Error checking ${page.slug}:`, error)
        // Em caso de erro, incluir página (fail-safe)
        visiblePages.push({
          slug: page.slug,
          title: page.title,
          href: page.href,
          isVisible: true
        })
      }
    }

    return NextResponse.json({ pages: visiblePages }, { status: 200 })
  } catch (error) {
    console.error('Error fetching visible pages:', error)
    // Em caso de erro total, retornar todas as páginas (fail-safe)
    return NextResponse.json({ 
      pages: PAGE_MAPPING.map(p => ({ ...p, isVisible: true }))
    }, { status: 200 })
  }
} 