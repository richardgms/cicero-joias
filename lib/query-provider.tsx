'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, ReactNode } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutos para dados ficarem "frescos"
        gcTime: 10 * 60 * 1000, // 10 minutos para garbage collection
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: (failureCount, error: any) => {
          // Log de tentativas de retry
          console.warn(`🔄 Query retry attempt ${failureCount}:`, {
            errorMessage: error?.message,
            errorStatus: error?.status,
            timestamp: new Date().toISOString()
          });

          // Não tentar novamente para erros de autenticação
          if (error?.status === 401 || error?.status === 403) {
            console.warn('🚫 Not retrying due to auth error');
            return false;
          }

          // Máximo 3 tentativas para erros temporários
          if (failureCount < 3) {
            return true;
          }

          console.warn('❌ Max query retries reached');
          return false;
        },
        retryDelay: (attemptIndex) => {
          // Backoff exponencial com cap
          const baseDelay = 1000; // 1 segundo
          const maxDelay = 10000; // 10 segundos máximo
          const delay = Math.min(baseDelay * Math.pow(2, attemptIndex), maxDelay);

          console.log(`⏱️ Next query retry in ${delay}ms`);
          return delay;
        },
      },
      mutations: {
        retry: (failureCount, error: any) => {
          console.warn(`🔄 Mutation retry attempt ${failureCount}:`, {
            errorMessage: error?.message,
            errorStatus: error?.status,
            timestamp: new Date().toISOString()
          });

          // Não tentar novamente para erros de autenticação ou validação
          if (error?.status === 401 || error?.status === 403 || error?.status === 400) {
            return false;
          }

          // Tentar novamente para erros temporários (503, 502, etc.)
          if (error?.status >= 500 && error?.status < 600 && failureCount < 2) {
            return true;
          }

          return false;
        },
        retryDelay: (attemptIndex) => {
          const baseDelay = 1000;
          const maxDelay = 5000; // Mutations com retry mais rápido
          const delay = Math.min(baseDelay * Math.pow(2, attemptIndex), maxDelay);

          console.log(`⏱️ Next mutation retry in ${delay}ms`);
          return delay;
        },
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
} 