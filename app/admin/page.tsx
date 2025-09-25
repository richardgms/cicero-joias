'use client';

import { useEffect, useState } from 'react';
import { Users, Package, BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle, Star, ShoppingBag, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

interface DashboardStats {
  portfolio: {
    total: number;
    active: number;
    inactive: number;
  };
  products: {
    total: number;
    active: number;
    readyDelivery: number;
    lowStock: number;
  };
  users: {
    total: number;
  };
  recent: {
    projects: Array<{
      id: string;
      title: string;
      mainImage: string;
      createdAt: string;
      isActive: boolean;
    }>;
    products: Array<{
      id: string;
      name: string;
      mainImage: string;
      price: number | string | null;
      stock: number;
      isActive: boolean;
    }>;
  };
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

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
            <div className="text-2xl font-bold">{stats?.users.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              Usuários cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.portfolio.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stats?.portfolio.active || 0} ativos</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.products.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">{stats?.products.readyDelivery || 0} pronta entrega</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.products.lowStock || 0}</div>
            <p className="text-xs text-muted-foreground">
              Produtos com estoque baixo
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
              <Button asChild className="w-full justify-start">
                <Link href="/admin/portfolio/new">
                  <Star className="h-4 w-4 mr-2" />
                  Adicionar Projeto ao Portfólio
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/products/new">
                  <Package className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/relatorios">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Relatórios
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Projetos Recentes
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/portfolio">Ver todos</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recent.projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    {project.mainImage ? (
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {project.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge variant={project.isActive ? "default" : "secondary"}>
                    {project.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              ))}
              {!stats?.recent.projects.length && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">
                    Nenhum projeto encontrado
                  </p>
                  <Button asChild size="sm" className="mt-2">
                    <Link href="/admin/portfolio/new">
                      Criar primeiro projeto
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Produtos Recentes
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/products">Ver todos</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recent.products.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    {product.mainImage ? (
                      <Image
                        src={product.mainImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      {product.price && (
                        <p className="text-xs text-gray-600">
                          R$ {Number(product.price).toFixed(2)}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Estoque: {product.stock}
                      </p>
                    </div>
                  </div>
                  <Badge variant={product.isActive ? "default" : "secondary"}>
                    {product.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              ))}
              {!stats?.recent.products.length && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">
                    Nenhum produto encontrado
                  </p>
                  <Button asChild size="sm" className="mt-2">
                    <Link href="/admin/products/new">
                      Criar primeiro produto
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
} 