'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { DEFAULT_VISIBLE_PAGES } from '@/lib/constants';

interface PageVisibility {
  slug: string;
  title: string;
  href: string;
  isVisible: boolean;
}

export function usePageVisibility(pageSlug?: string) {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [visiblePages, setVisiblePages] = useState<PageVisibility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Verificar se usuário é admin - CORRIGIDO: usando publicMetadata
  const isAdmin = (user?.publicMetadata?.role as string)?.toLowerCase() === 'admin';

  // Função para verificar uma página específica
  const checkPageVisibility = async (slug: string) => {
    try {
      const response = await fetch(`/api/page-visibility/check?slug=${slug}`);
      const data = await response.json();

      if (response.ok) {
        return data.isVisible;
      }

      // Default to visible in case of error (fail-safe)
      return true;
    } catch (error) {
      console.error('Error checking page visibility:', error);
      return true;
    }
  };

  // Função para buscar todas as páginas visíveis (para o menu)
  const fetchVisiblePages = async () => {
    try {
      const response = await fetch('/api/page-visibility/visible-pages');
      const data = await response.json();

      if (response.ok) {
        setVisiblePages(data.pages || []);
      } else {
        console.error('Error fetching visible pages:', data.error);
        // Usar dados fallback mesmo com erro HTTP
        setVisiblePages(data.pages || []);
      }
    } catch (error) {
      console.error('Error fetching visible pages:', error);
      console.log('[HOOK DEBUG] Setting hardcoded fallback pages');
      // Fallback completo quando fetch falha totalmente
      setVisiblePages(DEFAULT_VISIBLE_PAGES);
    } finally {
      // console.log('[HOOK DEBUG] Setting loading to false');
      setLoading(false);
    }
  };

  // Effect para página específica
  useEffect(() => {
    if (pageSlug) {
      checkPageVisibility(pageSlug).then(setIsVisible);
    }
  }, [pageSlug]);

  // Effect para buscar páginas visíveis
  useEffect(() => {
    fetchVisiblePages();
  }, []);

  return {
    isVisible,
    visiblePages,
    loading,
    error,
    isAdmin,
    checkPageVisibility,
    refetch: fetchVisiblePages
  };
}