import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)]">
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-medium">Área do Cliente</h1>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-50">
        <div className="container mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 