import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reportPortfolioError, reportApiError } from '@/lib/error-monitoring'

export interface PortfolioItem {
  id: string
  title: string
  description?: string
  category: string
  mainImage: string
  images: string[]
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
  product?: {
    id: string
    name: string
  }
}

interface PortfolioResponse {
  portfolioItems: PortfolioItem[]
  debug?: string[]
}

interface PortfolioError {
  error: string
  debug?: string[]
  requestId?: string
}

// Hook para listar itens do portfólio
export function usePortfolio() {
  return useQuery({
    queryKey: ['admin', 'portfolio'],
    queryFn: async (): Promise<PortfolioItem[]> => {
      const response = await fetch('/api/admin/portfolio', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        let errorData: PortfolioError
        try {
          errorData = await response.json()
        } catch {
          errorData = {
            error: `Erro HTTP ${response.status}: ${response.statusText}`
          }
        }

        // Report error to monitoring system
        reportApiError(new Error(errorData.error), '/api/admin/portfolio', 'GET', errorData.requestId)

        // Lançar erro com informações específicas
        const error = new Error(errorData.error || 'Erro ao carregar portfólio')

        // Adicionar propriedades customizadas para tratamento específico
        ;(error as any).status = response.status
        ;(error as any).requestId = errorData.requestId
        ;(error as any).isTemporary = response.status >= 500 && response.status < 600

        throw error
      }

      const data: PortfolioResponse = await response.json()

      // Log de sucesso para monitoramento
      console.log('✅ Portfolio loaded successfully:', {
        count: data.portfolioItems.length,
        timestamp: new Date().toISOString()
      })

      return data.portfolioItems
    },
    staleTime: 5 * 60 * 1000, // 5 minutos - dados ficam "frescos" por mais tempo
    gcTime: 10 * 60 * 1000, // 10 minutos - garbage collection
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      // Report retry attempt
      reportPortfolioError(error, 'fetch_retry', {
        failureCount,
        status: error.status,
        isTemporary: error.isTemporary,
      })

      // Não tentar novamente para erros de autenticação
      if (error.status === 401 || error.status === 403) {
        console.warn('🚫 Not retrying due to auth error')
        return false
      }

      // Tentar novamente para erros temporários (5xx) até 3 vezes
      if (error.isTemporary && failureCount < 3) {
        console.log(`⏳ Retrying temporary error (attempt ${failureCount + 1}/3)`)
        return true
      }

      // Tentar uma vez para outros erros
      if (failureCount < 1) {
        console.log(`🔄 Single retry for error ${error.status}`)
        return true
      }

      console.warn('❌ Max retries reached, giving up')
      return false
    },
    retryDelay: (attemptIndex) => {
      // Backoff exponencial com jitter para evitar thundering herd
      const baseDelay = 1000 // 1 segundo
      const jitter = Math.random() * 0.3 // 30% de variação
      const delay = Math.min(baseDelay * Math.pow(2, attemptIndex) * (1 + jitter), 10000) // Max 10s

      console.log(`⏱️ Next retry in ${Math.round(delay)}ms`)
      return delay
    },
  })
}

// Hook para deletar item do portfólio
export function useDeletePortfolioItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        let errorData: PortfolioError
        try {
          errorData = await response.json()
        } catch {
          errorData = {
            error: `Erro HTTP ${response.status}: ${response.statusText}`
          }
        }

        // Report delete error
        reportApiError(new Error(errorData.error), `/api/admin/portfolio/${id}`, 'DELETE')

        throw new Error(errorData.error || 'Erro ao deletar item')
      }

      console.log('✅ Portfolio item deleted:', { id, timestamp: new Date().toISOString() })
      return true
    },
    onSuccess: (_, deletedId) => {
      // Atualizar cache removendo o item deletado
      queryClient.setQueryData(['admin', 'portfolio'], (oldData: PortfolioItem[] | undefined) => {
        return oldData?.filter(item => item.id !== deletedId) || []
      })
    },
    onError: (error, deletedId) => {
      console.error('❌ Delete mutation failed:', { deletedId, error: error.message })
    }
  })
}

// Hook para criar novo item do portfólio
export function useCreatePortfolioItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        let errorData: PortfolioError
        try {
          errorData = await response.json()
        } catch {
          errorData = {
            error: `Erro HTTP ${response.status}: ${response.statusText}`
          }
        }

        // Report create error
        reportApiError(new Error(errorData.error), '/api/admin/portfolio', 'POST')

        const error = new Error(errorData.error || 'Erro ao criar item')
        ;(error as any).status = response.status
        ;(error as any).details = errorData

        throw error
      }

      const result = await response.json()
      console.log('✅ Portfolio item created:', {
        id: result.portfolioItem?.id,
        timestamp: new Date().toISOString()
      })

      return result.portfolioItem
    },
    onSuccess: () => {
      // Invalidar cache para refazer fetch dos dados
      queryClient.invalidateQueries({ queryKey: ['admin', 'portfolio'] })
    },
    retry: (failureCount, error: any) => {
      // Similar logic to the query retry
      if (error.status === 401 || error.status === 403) {
        return false
      }

      // Retry para erros temporários
      if (error.status === 503 && failureCount < 2) {
        return true
      }

      return failureCount < 1
    },
    retryDelay: (attemptIndex) => {
      const baseDelay = 1000
      const jitter = Math.random() * 0.3
      return Math.min(baseDelay * Math.pow(2, attemptIndex) * (1 + jitter), 5000)
    },
  })
}