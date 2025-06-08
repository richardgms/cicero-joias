import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session.userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Buscar estatísticas básicas do portfólio
    const totalPortfolio = await prisma.portfolioItem.count();
    const activePortfolio = await prisma.portfolioItem.count({
      where: { isActive: true }
    });

    // Buscar estatísticas dos produtos
    const totalProducts = await prisma.product.count();
    const activeProducts = await prisma.product.count({
      where: { isActive: true }
    });
    const readyDeliveryProducts = await prisma.product.count({
      where: { isReadyDelivery: true }
    });
    const lowStockProducts = await prisma.product.count({
      where: { stock: { lt: 5 } }
    });

    // Buscar estatísticas dos usuários
    const totalUsers = await prisma.user.count();

    // Buscar projetos recentes
    const recentProjects = await prisma.portfolioItem.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        mainImage: true,
        createdAt: true,
        isActive: true,
      },
    });

    // Buscar produtos recentes 
    const recentProducts = await prisma.product.findMany({
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
    });

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
        products: recentProducts,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 