import Link from 'next/link';
import { Shield, ArrowLeft, Home, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mapeamento de páginas para títulos amigáveis
const pageNames: Record<string, string> = {
  'pronta-entrega': 'Pronta Entrega',
  'portfolio': 'Portfólio',
  'sobre': 'Sobre Nós',
  'orcamento': 'Orçamento'
};

export default async function AcessoNegadoPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const params = await searchParams;
  const pageSlug = params.page;
  const pageName = pageSlug ? pageNames[pageSlug] || pageSlug : 'esta página';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-xl p-8 text-center border border-gray-100">
        {/* Ícone de acesso negado */}
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Eye className="w-10 h-10 text-amber-600" />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Página Temporariamente Indisponível
        </h1>

        {/* Descrição personalizada */}
        <div className="text-gray-600 mb-6 space-y-3">
          <p>
            A página <strong className="text-esmeralda">{pageName}</strong> está temporariamente 
            indisponível enquanto fazemos melhorias.
          </p>
          <div className="flex items-center justify-center text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
            <Clock className="w-4 h-4 mr-2" />
            Em breve esta seção estará disponível com novidades incríveis!
          </div>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-esmeralda hover:bg-esmeralda-dark">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-white">
            <Link href="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver Nosso Portfólio
            </Link>
          </Button>
        </div>

        {/* Informações de contato */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Quer saber quando estará disponível?{' '}
            <a 
              href="https://wa.me/5583991180251?text=Olá! Gostaria de saber quando a página estará disponível." 
              className="text-esmeralda hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 