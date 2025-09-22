'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SetupDatabasePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const setupDatabase = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/setup-db', {
        method: 'POST',
      });

      const data = await response.json();
      setResult(data);

      if (data.status === 'success') {
        alert('✅ Banco configurado com sucesso! Agora você pode usar o portfólio.');
      } else {
        alert('❌ Erro ao configurar banco: ' + data.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      setResult({ status: 'error', message: 'Erro de conexão' });
      alert('❌ Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const createTablesDirectly = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/create-tables', {
        method: 'POST',
      });

      const data = await response.json();
      setResult(data);

      if (data.status === 'success') {
        alert('✅ Tabelas criadas com sucesso! Agora você pode usar o portfólio.');
      } else {
        alert('❌ Erro ao criar tabelas: ' + data.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      setResult({ status: 'error', message: 'Erro de conexão' });
      alert('❌ Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🔧 Configurar Banco de Dados</CardTitle>
          <p className="text-gray-600">
            As tabelas precisam ser criadas no banco reativado do Supabase.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              onClick={setupDatabase}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? '⏳ Configurando...' : '🚀 Configurar Banco (Recomendado)'}
            </Button>

            <Button
              onClick={createTablesDirectly}
              disabled={loading}
              variant="outline"
              className="w-full"
              size="lg"
            >
              {loading ? '⏳ Criando...' : '🔨 Criar Tabelas Diretamente'}
            </Button>
          </div>

          {result && (
            <div className={`p-4 rounded-lg ${
              result.status === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-medium ${
                result.status === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.status === 'success' ? '✅ Sucesso!' : '❌ Erro!'}
              </p>
              <p className={`text-sm mt-1 ${
                result.status === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.message}
              </p>
              {result.output && (
                <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">
                  {result.output}
                </pre>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📝 Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Clique em um dos botões acima para criar as tabelas</li>
            <li>Aguarde a confirmação de sucesso</li>
            <li>Vá para <strong>/admin/portfolio</strong> e tente adicionar um projeto</li>
            <li>Se funcionar, delete esta página temporária</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}