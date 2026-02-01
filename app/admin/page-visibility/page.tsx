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
import { LoadingScreen } from '@/components/ui/loading-screen';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
  const [isDatabaseUnavailable, setIsDatabaseUnavailable] = useState(false);

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
      const dbUnavailable = !!data.warning;
      setIsDatabaseUnavailable(dbUnavailable); // Se há warning, banco está indisponível

      if (dbUnavailable) {
        console.log('[PageVisibility] Database unavailable detected, warning:', data.warning);
      }
    } catch (error) {
      console.error('Error fetching page visibility:', error);
      toast.error('Erro ao carregar configurações de visibilidade');
    } finally {
      setLoading(false);
    }
  };

  // Alternar visibilidade de uma página
  const togglePageVisibility = async (slug: string, currentStatus: boolean, title: string) => {
    // Verificação extra de segurança
    if (isDatabaseUnavailable) {
      toast.error('Banco de dados indisponível. Não é possível alterar configurações no momento.');
      return;
    }

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
        // Handle 503 Service Unavailable specifically
        if (response.status === 503) {
          // Any 503 response indicates database unavailable
          setIsDatabaseUnavailable(true);

          // Try to get error details from response
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = {};
          }

          const message = errorData.message || 'Banco de dados temporariamente indisponível. As alterações não podem ser salvas no momento. Tente novamente mais tarde.';
          toast.error(message);

          console.error('[PAGE-VISIBILITY] 503 Error details:', errorData);
          return;
        }

        // Handle other errors
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = {};
        }

        throw new Error(errorData.message || 'Failed to update page visibility');
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
        <LoadingScreen variant="inline" message="Carregando configurações..." />
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

      {/* Aviso de Banco Indisponível */}
      {isDatabaseUnavailable && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Banco de dados temporariamente indisponível
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  <strong>Exibindo configuração padrão</strong> (páginas em modo fallback).
                  As alterações não podem ser salvas no momento devido a problemas de conectividade com o banco de dados.
                </p>

                {(pages as any).errorDetails && (
                  <div className="mt-3 p-2 bg-yellow-100 rounded text-xs font-mono border border-yellow-200 break-words">
                    <strong>Erro Técnico:</strong> {(pages as any).errorDetails}
                  </div>
                )}

                <p className="mt-2">
                  <strong>Ações recomendadas:</strong>
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Verifique sua conexão de internet</li>
                  <li>Aguarde alguns minutos e clique no botão de recarregar</li>
                  <li>Se o problema persistir, contate o suporte técnico</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

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
              onClick={() => {
                setIsDatabaseUnavailable(false); // Reset database unavailable state
                fetchPageVisibility();
              }}
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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${page.isVisible
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

                {/* Botão de Alterações Recentes */}
                {page.visibilityLogs && page.visibilityLogs.length > 0 && (
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-sm font-medium text-gray-700 hover:text-esmeralda flex items-center transition-colors group">
                          <Clock className="w-4 h-4 mr-1 group-hover:text-esmeralda transition-colors" />
                          Alterações Recentes ({page.visibilityLogs.length})
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[600px]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-esmeralda" />
                            Histórico de Alterações - {page.title}
                          </DialogTitle>
                          <DialogDescription>
                            Todas as alterações de visibilidade desta página
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 space-y-3 overflow-y-auto max-h-[400px]">
                          {page.visibilityLogs.map((log) => (
                            <div key={log.id} className="border border-gray-200 bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${log.previousStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {log.previousStatus ? 'Visível' : 'Oculta'}
                                  </span>
                                  <span className="text-gray-400">→</span>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${log.newStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {log.newStatus ? 'Visível' : 'Oculta'}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(log.createdAt).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>

                              {log.adminEmail && (
                                <div className="flex items-center mb-2 text-sm text-gray-600">
                                  <User className="w-4 h-4 mr-1" />
                                  <span className="font-medium">{log.adminEmail}</span>
                                </div>
                              )}

                              {log.changeReason && (
                                <div className="text-sm text-gray-700 bg-white p-2 rounded border-l-4 border-esmeralda">
                                  <span className="font-medium">Motivo:</span> {log.changeReason}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>

              {/* Toggle de visibilidade */}
              <div className="ml-6">
                <button
                  onClick={() => {
                    if (isDatabaseUnavailable) {
                      toast.error('Banco de dados indisponível. Não é possível alterar configurações no momento.');
                      return;
                    }
                    togglePageVisibility(page.slug, page.isVisible, page.title);
                  }}
                  disabled={isDatabaseUnavailable}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-esmeralda focus:ring-offset-2 ${isDatabaseUnavailable
                    ? 'bg-gray-200 cursor-not-allowed opacity-50'
                    : page.isVisible ? 'bg-esmeralda' : 'bg-gray-300'
                    }`}
                  title={isDatabaseUnavailable
                    ? 'Banco de dados indisponível - não é possível alterar'
                    : page.isVisible ? 'Ocultar página' : 'Mostrar página'
                  }
                >
                  <span className="sr-only">
                    {page.isVisible ? 'Ocultar página' : 'Mostrar página'}
                  </span>
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${page.isVisible ? 'translate-x-7' : 'translate-x-1'
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