// Re-exportando todos os hooks para facilitar importações
export * from './use-clients'
export * from './use-orders'
export * from './use-products'

// Função auxiliar para chamar as APIs (compartilhada entre hooks)
export async function fetchApi(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || 'Erro ao chamar API')
  }
  
  return response.json()
} 