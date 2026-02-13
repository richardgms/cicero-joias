import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';

export async function GET() {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Simple parallel queries — no executeWithRetry, no Clerk API calls
    const [
      totalPortfolio,
      activePortfolio,
      totalProducts,
      activeProducts,
      readyDeliveryProducts,
      lowStockProducts,
      recentProjects,
      recentProducts,
    ] = await Promise.all([
      prisma.portfolioItem.count(),
      prisma.portfolioItem.count({ where: { isActive: true } }),
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isReadyDelivery: true } }),
      prisma.product.count({ where: { stock: { lt: 5 } } }),
      prisma.portfolioItem.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          mainImage: true,
          createdAt: true,
          isActive: true,
        },
      }),
      prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          mainImage: true,
          price: true,
          stock: true,
          isActive: true,
        },
      }),
    ]);

    // Get user count from local DB
    let totalUsers = 0;
    try {
      totalUsers = await prisma.user.count();
    } catch {
      // If user table fails, show 0
    }

    // Convert Decimal prices to numbers
    const productsWithConvertedPrices = recentProducts.map((product) => ({
      ...product,
      price: product.price ? Number(product.price) : null,
    }));

    return NextResponse.json({
      portfolio: {
        total: totalPortfolio,
        active: activePortfolio,
        inactive: totalPortfolio - activePortfolio,
      },
      products: {
        total: totalProducts,
        active: activeProducts,
        readyDelivery: readyDeliveryProducts,
        lowStock: lowStockProducts,
      },
      users: {
        total: totalUsers,
      },
      recent: {
        projects: recentProjects,
        products: productsWithConvertedPrices,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
