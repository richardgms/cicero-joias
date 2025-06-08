import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Buscar categorias padrão do enum
    const portfolioCategories = [
      { id: 'WEDDING_RINGS', name: 'Alianças de Casamento', type: 'portfolio' },
      { id: 'REPAIRS_BEFORE_AFTER', name: 'Consertos (Antes/Depois)', type: 'portfolio' },
      { id: 'GOLD_PLATING', name: 'Banho de Ouro', type: 'portfolio' },
      { id: 'CUSTOM_JEWELRY', name: 'Joias Personalizadas', type: 'portfolio' },
      { id: 'GRADUATION_RINGS', name: 'Anéis de Formatura', type: 'portfolio' }
    ];

    const productCategories = [
      { id: 'JEWELRY', name: 'Joias', type: 'product' },
      { id: 'RINGS', name: 'Anéis', type: 'product' },
      { id: 'NECKLACES', name: 'Colares', type: 'product' },
      { id: 'EARRINGS', name: 'Brincos', type: 'product' },
      { id: 'BRACELETS', name: 'Pulseiras', type: 'product' },
      { id: 'WATCHES', name: 'Relógios', type: 'product' },
      { id: 'ACCESSORIES', name: 'Acessórios', type: 'product' }
    ];

    // Buscar categorias personalizadas em uso no portfolio
    const customPortfolioCategories = await prisma.portfolioItem.findMany({
      where: {
        isActive: true,
        NOT: {
          category: {
            in: ['WEDDING_RINGS', 'REPAIRS_BEFORE_AFTER', 'GOLD_PLATING', 'CUSTOM_JEWELRY', 'GRADUATION_RINGS']
          }
        }
      },
      select: {
        category: true
      },
      distinct: ['category']
    });

    // Buscar categorias personalizadas em uso nos produtos  
    const customProductCategories = await prisma.product.findMany({
      where: {
        isActive: true,
        NOT: {
          category: {
            in: ['JEWELRY', 'RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS', 'WATCHES', 'ACCESSORIES']
          }
        }
      },
      select: {
        category: true
      },
      distinct: ['category']
    });

    // Converter categorias personalizadas para formato padronizado
    const customPortfolio = customPortfolioCategories.map(item => ({
      id: item.category,
      name: item.category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
      type: 'portfolio',
      isCustom: true
    }));

    const customProduct = customProductCategories.map(item => ({
      id: item.category,
      name: item.category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
      type: 'product',
      isCustom: true
    }));

    return NextResponse.json({
      categories: {
        portfolio: [...portfolioCategories, ...customPortfolio],
        product: [...productCategories, ...customProduct]
      }
    });

  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 