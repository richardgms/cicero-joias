import { Settings, Users, Package, BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao painel administrativo da Cícero Joias
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0%</span> desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Projetos no portfólio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Produtos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamentos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Pendentes de análise
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button className="w-full justify-start" disabled>
                <Package className="h-4 w-4 mr-2" />
                Adicionar Projeto ao Portfólio
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Settings className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Users className="h-4 w-4 mr-2" />
                Gerenciar Usuários
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver Relatórios
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">Sistema administrativo criado</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">Middleware de proteção configurado</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">Layout administrativo implementado</span>
              </div>
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                  Próxima etapa: Implementar CRUD de Portfólio
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Development Status */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Settings className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-amber-900">Etapa 2 Concluída</h3>
              <p className="text-sm text-amber-700 mt-1">
                Layout administrativo criado com sucesso! Sidebar de navegação e header implementados.
                Próximo passo: Implementar CRUD de Portfólio (Etapa 3).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 