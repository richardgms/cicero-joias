import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    return <div>Você precisar estar autenticado para acessar esta página.</div>;
  }

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-6">Painel do Cliente</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo, {user.firstName}!</h2>
        <p className="text-slate-600 mb-4">Este é seu painel de cliente onde você pode acompanhar seus pedidos, orçamentos e histórico.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Pedidos Recentes</h3>
          <p className="text-slate-600">Você ainda não tem pedidos registrados.</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Orçamentos</h3>
          <p className="text-slate-600">Você ainda não tem orçamentos solicitados.</p>
        </div>
      </div>
      
      <div className="mt-6">
        <Link href="/" className="text-primary hover:text-primary/80 font-medium">
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
} 