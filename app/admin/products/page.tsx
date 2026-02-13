import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';
import { AdminProductsClient } from './admin-products-client';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

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

async function ProductsContent() {
  const products = await getProducts();
  return <AdminProductsClient initialProducts={products} />;
}

export default async function AdminProductsPage() {
  const authResult = await checkAdminAuth();

  if ("error" in authResult) {
    redirect('/');
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Produtos"
        description="Gerencie o catálogo de produtos da Cícero Joias"
      >
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Link>
        </Button>
      </AdminPageHeader>

      <Suspense fallback={<div className="py-12"><LoadingScreen variant="inline" message="Carregando produtos..." /></div>}>
        {/* @ts-expect-error Server Component */}
        <ProductsContent />
      </Suspense>
    </div>
  );
}