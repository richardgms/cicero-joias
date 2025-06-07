'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Função auxiliar para chamar as APIs
async function fetchApi(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || 'Erro ao chamar API')
  }
  
  return response.json()
}

// Hook para listar clientes
export function useClients(options?: { skip?: number; take?: number; search?: string }) {
  const { skip = 0, take = 50, search } = options || {}
  
  let queryUrl = `/api/clients?skip=${skip}&take=${take}`
  if (search) queryUrl += `&search=${encodeURIComponent(search)}`
  
  return useQuery({
    queryKey: ['clients', skip, take, search],
    queryFn: () => fetchApi(queryUrl).then(data => data.clients)
  })
}

// Hook para buscar cliente por ID
export function useClient(id: string, includeOrders = false) {
  const queryUrl = `/api/clients/${id}${includeOrders ? '?orders=true' : ''}`
  
  return useQuery({
    queryKey: ['client', id, includeOrders],
    queryFn: () => fetchApi(queryUrl).then(data => data.client),
    enabled: !!id
  })
}

// Hook para criar cliente
export function useCreateClient() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (clientData: { name: string; email: string; phone?: string; whatsapp?: string }) => {
      return fetchApi('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      }).then(data => data.client)
    },
    onSuccess: () => {
      // Invalidar a query de clientes para refetching
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })
}

// Hook para atualizar cliente
export function useUpdateClient(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (clientData: {
      name?: string;
      email?: string;
      phone?: string;
      whatsapp?: string;
      loyaltyPoints?: number;
      loyaltyLevel?: 'CLIENT' | 'SPECIAL' | 'VIP';
    }) => {
      return fetchApi(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      }).then(data => data.client)
    },
    onSuccess: () => {
      // Invalidar queries específicas
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['client', id] })
    }
  })
}

// Hook para excluir cliente
export function useDeleteClient(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => {
      return fetchApi(`/api/clients/${id}`, {
        method: 'DELETE'
      })
    },
    onSuccess: () => {
      // Invalidar a query de clientes
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })
} 