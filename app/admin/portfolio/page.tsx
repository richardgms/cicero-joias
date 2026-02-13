import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';
import { AdminPortfolioClient } from './admin-portfolio-client';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';

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

async function PortfolioContent() {
  const items = await getPortfolioItems();
  return <AdminPortfolioClient initialItems={items} />;
}

export default async function AdminPortfolioPage() {
  const authResult = await checkAdminAuth();

  if ("error" in authResult) {
    redirect('/');
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Portfólio"
        description="Gerencie os projetos do portfólio da Cícero Joias"
      >
        <Button variant="secondary" asChild>
          <Link href="/admin/portfolio/trash">
            <Trash2 className="h-4 w-4 mr-2" />
            Lixeira
          </Link>
        </Button>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Link>
        </Button>
      </AdminPageHeader>

      <Suspense fallback={<div className="py-12"><LoadingScreen variant="inline" message="Carregando projetos..." /></div>}>
        {/* @ts-expect-error Server Component */}
        <PortfolioContent />
      </Suspense>
    </div>
  );
}
