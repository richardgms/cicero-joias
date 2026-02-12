import { NextResponse } from 'next/server';
import prisma, { executeWithRetry } from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';
import { clerkClient } from '@clerk/nextjs/server';

// Helper function to get user count from Clerk
async function getClerkUserCount() {
  try {
    const clerk = await clerkClient();
    const clerkUsers = await clerk.users.getUserList({ limit: 1 }); // We only need the total count
    return clerkUsers.totalCount;
  } catch (error) {
    console.warn('[STATS] Could not fetch user count from Clerk:', error);
    // Fallback to local database count if Clerk fails
    return await prisma.user.count();
  }
}

export async function GET() {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Executar todas as queries em paralelo com retry para prepared statement errors
    const [
      totalPortfolio,
      activePortfolio,
      totalProducts,
      activeProducts,
      readyDeliveryProducts,
      lowStockProducts,
      totalUsers,
      recentProjects,
      recentProducts,
    ] = await executeWithRetry(() => Promise.all([
      prisma.portfolioItem.count(),
      prisma.portfolioItem.count({ where: { isActive: true } }),
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isReadyDelivery: true } }),
      prisma.product.count({ where: { stock: { lt: 5 } } }),
      getClerkUserCount(),
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
    ]));

    // Converter preços para números para evitar problemas com Decimal
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
