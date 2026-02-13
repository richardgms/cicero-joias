import { Suspense } from 'react';
import { checkAdminAuth } from '@/lib/check-admin';
import { AdminCategoriesClient, Category } from './admin-categories-client';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// Mock data — será substituído por Prisma quando a tabela de categorias existir
async function getCategories(): Promise<Category[]> {
  return [
    {
      id: '1',
      name: 'Anéis de Formatura',
      color: '#3B82F6',
      type: 'PORTFOLIO',
      order: 1,
      isActive: true,
      itemCount: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Alianças de Casamento',
      color: '#10B981',
      type: 'PORTFOLIO',
      order: 2,
      isActive: true,
      itemCount: 8,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Joias Personalizadas',
      color: '#8B5CF6',
      type: 'PORTFOLIO',
      order: 3,
      isActive: true,
      itemCount: 12,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Anéis',
      color: '#EC4899',
      type: 'PRODUCT',
      order: 1,
      isActive: true,
      itemCount: 15,
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Colares',
      color: '#F59E0B',
      type: 'PRODUCT',
      order: 2,
      isActive: true,
      itemCount: 7,
      createdAt: new Date().toISOString(),
    },
  ];
}

async function CategoriesContent() {
  const categories = await getCategories();
  return <AdminCategoriesClient initialCategories={categories} />;
}

export default async function AdminCategoriesPage() {
  const authResult = await checkAdminAuth();

  if ("error" in authResult) {
    redirect('/');
  }

  return (
    <Suspense fallback={<div className="py-12"><LoadingScreen variant="inline" message="Carregando categorias..." /></div>}>
      {/* @ts-expect-error Server Component */}
      <CategoriesContent />
    </Suspense>
  );
}