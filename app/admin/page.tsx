import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';
import { AdminDashboardClient, DashboardStats } from './admin-dashboard-client';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getDashboardStats(): Promise<DashboardStats> {
  // Run simple Prisma queries in parallel — NO executeWithRetry, NO Clerk API calls
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

  // Get user count from local DB (fast) — no Clerk API call
  let totalUsers = 0;
  try {
    totalUsers = await prisma.user.count();
  } catch {
    // If user table doesn't exist or fails, just show 0
  }

  return {
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
      projects: recentProjects.map(p => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
      })),
      products: recentProducts.map(p => ({
        ...p,
        price: p.price ? Number(p.price) : null,
      })),
    },
  };
}

async function DashboardContent() {
  const stats = await getDashboardStats();
  return <AdminDashboardClient stats={stats} />;
}

export default async function AdminPage() {
  const authResult = await checkAdminAuth();

  if ("error" in authResult) {
    redirect('/');
  }

  return (
    <Suspense fallback={<div className="py-12"><LoadingScreen variant="inline" message="Carregando dashboard..." /></div>}>
      {/* @ts-expect-error Server Component */}
      <DashboardContent />
    </Suspense>
  );
}