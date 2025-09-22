'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Eye, 
  EyeOff, 
  Globe, 
  Shield, 
  Clock, 
  User,
  Search,
  Filter,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface PageVisibility {
  id: string;
  slug: string;
  title: string;
  description?: string;
  isVisible: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
  visibilityLogs: VisibilityLog[];
}

interface VisibilityLog {
  id: string;
  pageSlug: string;
  previousStatus: boolean;
  newStatus: boolean;
  adminUserId?: string;
  adminEmail?: string;
  changeReason?: string;
  createdAt: string;
}

export default function PageVisibilityPage() {
  const [pages, setPages] = useState<PageVisibility[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'visible' | 'hidden'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar configurações de visibilidade
  const fetchPageVisibility = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/page-visibility');
      
      if (!response.ok) {
        throw new Error('Failed to fetch page visibility settings');
      }
      
      const data = await response.json();
      setPages(data.pages || []);
    } catch (error) {
      console.error('Error fetching page visibility:', error);
      toast.error('Erro ao carregar configurações de visibilidade');
    } finally {
      setLoading(false);
    }
  };

  // Alternar visibilidade de uma página
  const togglePageVisibility = async (slug: string, currentStatus: boolean, title: string) => {
    const reason = prompt(`Motivo da alteração para "${title}":`, '');
    
    if (reason === null) return; // Usuário cancelou
    
    try {
      const response = await fetch('/api/admin/page-visibility', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          isVisible: !currentStatus,
          changeReason: reason || 'Sem motivo especificado'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update page visibility');
      }

      const data = await response.json();
      toast.success(data.message || 'Visibilidade atualizada com sucesso');
      
      // Recarregar dados
      await fetchPageVisibility();
    } catch (error) {
      console.error('Error updating page visibility:', error);
      toast.error('Erro ao atualizar visibilidade da página');
    }
  };

  // Filtrar páginas
  const filteredPages = pages.filter(page => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'visible' && page.isVisible) || 
                         (filter === 'hidden' && !page.isVisible);
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    fetchPageVisibility();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-esmeralda"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Eye className="mr-3 h-8 w-8 text-esmeralda" />
          Controle de Visibilidade das Páginas
        </h1>
        <p className="mt-2 text-gray-600">
          Gerencie quais páginas estão visíveis para o público. Admins sempre podem visualizar todas as páginas.
        </p>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar páginas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-esmeralda focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-esmeralda focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">Todas as páginas</option>
              <option value="visible">Apenas visíveis</option>
              <option value="hidden">Apenas ocultas</option>
            </select>
            
            <button
              onClick={fetchPageVisibility}
              className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              title="Recarregar"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Páginas */}
      <div className="grid gap-4">
        {filteredPages.map((page) => (
          <div
            key={page.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              {/* Informações da página */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {page.title}
                  </h3>
                  
                  {/* Badge de status */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    page.isVisible
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {page.isVisible ? (
                      <>
                        <Globe className="w-3 h-3 mr-1" />
                        Visível
                      </>
                    ) : (
                      <>
                        <Shield className="w-3 h-3 mr-1" />
                        Oculta
                      </>
                    )}
                  </span>

                  {/* Link para página */}
                  <Link
                    href={`/${page.slug}`}
                    target="_blank"
                    className="text-esmeralda hover:text-esmeralda-dark transition-colors"
                    title="Visualizar página"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-gray-600 text-sm mb-3">
                  <strong>Slug:</strong> /{page.slug}
                  {page.description && (
                    <>
                      <br />
                      <strong>Descrição:</strong> {page.description}
                    </>
                  )}
                </p>

                {/* Logs recentes */}
                {page.visibilityLogs && page.visibilityLogs.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Alterações Recentes
                    </h4>
                    <div className="space-y-1">
                      {page.visibilityLogs.slice(0, 3).map((log) => (
                        <div key={log.id} className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                          <div className="flex items-center justify-between">
                            <span>
                              {log.previousStatus ? 'Visível' : 'Oculta'} → {log.newStatus ? 'Visível' : 'Oculta'}
                            </span>
                            <span>
                              {new Date(log.createdAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          {log.adminEmail && (
                            <div className="flex items-center mt-1">
                              <User className="w-3 h-3 mr-1" />
                              {log.adminEmail}
                            </div>
                          )}
                          {log.changeReason && (
                            <div className="mt-1 italic">
                              &quot;{log.changeReason}&quot;
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle de visibilidade */}
              <div className="ml-6">
                <button
                  onClick={() => togglePageVisibility(page.slug, page.isVisible, page.title)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-esmeralda focus:ring-offset-2 ${
                    page.isVisible ? 'bg-esmeralda' : 'bg-gray-300'
                  }`}
                  title={page.isVisible ? 'Ocultar página' : 'Mostrar página'}
                >
                  <span className="sr-only">
                    {page.isVisible ? 'Ocultar página' : 'Mostrar página'}
                  </span>
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      page.isVisible ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  >
                    {page.isVisible ? (
                      <Eye className="h-3 w-3 text-esmeralda m-1.5" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-gray-500 m-1.5" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado vazio */}
      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <Eye className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Nenhuma página encontrada
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filter !== 'all'
              ? 'Tente ajustar seus filtros de busca.'
              : 'Configure as páginas que deseja controlar.'}
          </p>
        </div>
      )}
    </div>
  );
} 