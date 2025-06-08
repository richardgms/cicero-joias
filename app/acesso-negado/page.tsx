import Link from 'next/link';
import { Shield, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AcessoNegadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Ícone de acesso negado */}
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Shield className="w-8 h-8 text-red-600" />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Acesso Negado
        </h1>

        {/* Descrição */}
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta área do sistema. 
          Somente administradores podem visualizar este conteúdo.
        </p>

        {/* Botões de ação */}
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/sign-in">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fazer Login
            </Link>
          </Button>
        </div>

        {/* Informações de contato */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Precisa de acesso administrativo?{' '}
            <a 
              href="mailto:admin@cicerojoias.com" 
              className="text-primary hover:underline"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 