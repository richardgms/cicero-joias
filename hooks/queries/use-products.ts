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

// Hook para listar produtos
export function useProducts(options?: { 
  skip?: number; 
  take?: number;
  onlyActive?: boolean;
  readyDelivery?: boolean;
  search?: string;
}) {
  const { skip = 0, take = 100, onlyActive, readyDelivery, search } = options || {}
  
  let queryUrl = `/api/products?skip=${skip}&take=${take}`
  if (onlyActive) queryUrl += '&active=true'
  if (readyDelivery) queryUrl += '&readyDelivery=true'
  if (search) queryUrl += `&search=${encodeURIComponent(search)}`
  
  return useQuery({
    queryKey: ['products', skip, take, onlyActive, readyDelivery, search],
    queryFn: () => fetchApi(queryUrl).then(data => data.products)
  })
}

// Hook para buscar produto por ID
export function useProduct(id: string, includePortfolio = false) {
  const queryUrl = `/api/products/${id}${includePortfolio ? '?portfolio=true' : ''}`
  
  return useQuery({
    queryKey: ['product', id, includePortfolio],
    queryFn: () => fetchApi(queryUrl).then(data => data.product),
    enabled: !!id
  })
}

// Hook para criar produto
export function useCreateProduct() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (productData: { 
      name: string;
      description?: string;
      price?: number;
      isActive?: boolean;
      isReadyDelivery?: boolean;
      mainImage?: string;
    }) => {
      return fetchApi('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      }).then(data => data.product)
    },
    onSuccess: () => {
      // Invalidar a query de produtos
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })
}

// Hook para atualizar produto
export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (productData: {
      name?: string;
      description?: string;
      price?: number;
      isActive?: boolean;
      isReadyDelivery?: boolean;
      mainImage?: string;
    }) => {
      return fetchApi(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      }).then(data => data.product)
    },
    onSuccess: () => {
      // Invalidar queries específicas
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })
    }
  })
}

// Hook para ativar/desativar produto
export function useToggleProductActive(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (isActive: boolean) => {
      return fetchApi(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      }).then(data => data.product)
    },
    onSuccess: () => {
      // Invalidar queries específicas
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })
    }
  })
}

// Hook para excluir produto
export function useDeleteProduct(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => {
      return fetchApi(`/api/products/${id}`, {
        method: 'DELETE'
      })
    },
    onSuccess: () => {
      // Invalidar a query de produtos
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })
} 