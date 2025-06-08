import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const material = searchParams.get('material');
    const inStock = searchParams.get('inStock');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {
      isActive: true
      // Temporariamente sem filtro isReadyDelivery até ser aplicado ao banco
    };

    // Filtro por categoria
    if (category && category !== 'all') {
      where.category = category.toUpperCase();
    }

    // Filtro por faixa de preço
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Filtro por material
    if (material) {
      where.material = {
        contains: material,
        mode: 'insensitive'
      };
    }

    // Filtro por disponibilidade em estoque
    if (inStock === 'true') {
      where.stock = { gt: 0 };
    }

    // Buscar produtos com paginação
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: [
          { stock: 'desc' }, // Com estoque primeiro
          { createdAt: 'desc' }
        ],
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          category: true,
          mainImage: true,
          images: true,
          stock: true,
          weight: true,
          material: true,
          size: true,
          code: true,
          createdAt: true
        }
      }),
      prisma.product.count({ where })
    ]);

    // Calcular informações de paginação
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    });

  } catch (error) {
    console.error('Erro ao buscar produtos pronta entrega:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 