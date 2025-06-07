'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { OrderStatus } from '@prisma/client'

// Função auxiliar para chamar as APIs
async function fetchApi(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || 'Erro ao chamar API')
  }
  
  return response.json()
}

// Hook para listar pedidos
export function useOrders(options?: { 
  skip?: number; 
  take?: number;
  status?: OrderStatus;
  clientId?: string;
}) {
  const { skip = 0, take = 50, status, clientId } = options || {}
  
  let queryUrl = `/api/orders?skip=${skip}&take=${take}`
  if (status) queryUrl += `&status=${status}`
  if (clientId) queryUrl += `&clientId=${clientId}`
  
  return useQuery({
    queryKey: ['orders', skip, take, status, clientId],
    queryFn: () => fetchApi(queryUrl).then(data => data.orders)
  })
}

// Hook para buscar pedido por ID
export function useOrder(id: string, includeDetails = false) {
  const queryUrl = `/api/orders/${id}${includeDetails ? '?details=true' : ''}`
  
  return useQuery({
    queryKey: ['order', id, includeDetails],
    queryFn: () => fetchApi(queryUrl).then(data => data.order),
    enabled: !!id
  })
}

// Hook para criar pedido
export function useCreateOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (orderData: { 
      totalValue: number; 
      category: string;
      description?: string;
      clientId: string;
    }) => {
      return fetchApi('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      }).then(data => data.order)
    },
    onSuccess: (_, variables) => {
      // Invalidar queries
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      
      // Se tiver clientId, invalidar também os pedidos do cliente
      if (variables.clientId) {
        queryClient.invalidateQueries({ 
          queryKey: ['orders', undefined, undefined, undefined, variables.clientId] 
        })
        queryClient.invalidateQueries({ 
          queryKey: ['client', variables.clientId, true] 
        })
      }
    }
  })
}

// Hook para atualizar status do pedido
export function useUpdateOrderStatus(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: { 
      status: OrderStatus;
      statusDescription?: string;
    }) => {
      return fetchApi(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(data => data.order)
    },
    onSuccess: () => {
      // Invalidar queries específicas
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['order', id] })
    }
  })
}

// Hook para atualizar pedido
export function useUpdateOrder(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (orderData: {
      totalValue?: number;
      status?: OrderStatus;
      category?: string;
      description?: string;
      statusDescription?: string;
    }) => {
      return fetchApi(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      }).then(data => data.order)
    },
    onSuccess: () => {
      // Invalidar queries específicas
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['order', id] })
    }
  })
}

// Hook para excluir pedido
export function useDeleteOrder(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => {
      return fetchApi(`/api/orders/${id}`, {
        method: 'DELETE'
      })
    },
    onSuccess: () => {
      // Invalidar a query de pedidos
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
  })
} 