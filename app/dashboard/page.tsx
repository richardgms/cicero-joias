import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    return null; // Redirecionamento já é tratado no layout
  }

  return (
    <div className="w-full px-4 sm:px-6 py-6 sm:py-8 max-w-full mx-auto">      
      <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Bem-vindo, {user.firstName || 'Cliente'}!</h2>
        <p className="text-slate-600 text-sm sm:text-base mb-2 sm:mb-4">Este é seu painel de cliente onde você pode acompanhar seus pedidos, orçamentos e histórico.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Pedidos Recentes</h3>
          <p className="text-slate-600 text-sm sm:text-base">Você ainda não tem pedidos registrados.</p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Orçamentos</h3>
          <p className="text-slate-600 text-sm sm:text-base">Você ainda não tem orçamentos solicitados.</p>
        </div>
      </div>
      
      <div className="mt-6">
        <Link href="/" className="text-primary hover:text-primary/80 font-medium text-sm sm:text-base flex items-center">
          <span className="mr-1">←</span> Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
} 