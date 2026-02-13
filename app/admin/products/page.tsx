import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';
import { AdminProductsClient } from './admin-products-client';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getProducts() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      isActive: true,
      isReadyDelivery: true,
      mainImage: true,
      stock: true,
      code: true,
      createdAt: true,
      _count: {
        select: {
          portfolioItems: true,
        },
      },
      // Omitting 'images', 'weight', 'material', 'size', 'deliveryTime', etc.
    },
    orderBy: { createdAt: 'desc' },
  });

  return products.map(product => ({
    ...product,
    price: product.price ? Number(product.price) : null,
    createdAt: product.createdAt.toISOString(),
    category: product.category as string,
    description: product.description ?? undefined,
    mainImage: product.mainImage ?? null,
  }));
}

export default async function AdminProductsPage() {
  const authResult = await checkAdminAuth();

  if ("error" in authResult) {
    redirect('/');
  }

  const products = await getProducts();

  return (
    <Suspense fallback={<LoadingScreen variant="inline" message="Carregando produtos..." />}>
      <AdminProductsClient initialProducts={products} />
    </Suspense>
  );
}