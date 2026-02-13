import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';
import { AdminPortfolioClient } from './admin-portfolio-client';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { redirect } from 'next/navigation';

// Force dynamic rendering to ensure the list is always fresh
// This is critical for the "Back from Edit" flow to show updated data
export const dynamic = 'force-dynamic';

async function getPortfolioItems() {
  const items = await prisma.portfolioItem.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      mainImage: true,
      isActive: true,
      isFeatured: true,
      order: true,
      createdAt: true,
      // Intentionally omitting 'images', 'description', 'detailedDescription'
      // to reduce payload size and waterfall
    },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  return items.map(item => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));
}

export default async function AdminPortfolioPage() {
  // 1. Server-side Auth Check
  const authResult = await checkAdminAuth();

  if ("error" in authResult) {
    redirect('/');
  }

  // 2. Direct Database Fetch (No API roundtrip)
  const items = await getPortfolioItems();

  // 3. Render Client Component with Initial Data
  return (
    <Suspense fallback={<LoadingScreen variant="inline" message="Carregando projetos..." />}>
      <AdminPortfolioClient initialItems={items} />
    </Suspense>
  );
}
