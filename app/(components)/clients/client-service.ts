import { clientRepository } from "@/lib/repositories"
import { cache } from "react"

// Server Component para buscar todos os clientes (com cache)
export const getClients = cache(async (options?: { skip?: number; take?: number }) => {
  return clientRepository.findAll(options)
})

// Server Component para buscar cliente por ID
export const getClientById = cache(async (id: string) => {
  return clientRepository.findById(id)
})

// Server Component para buscar cliente com pedidos
export const getClientWithOrders = cache(async (id: string) => {
  return clientRepository.findWithOrders(id)
})

// Server Component para buscar clientes por termo de busca
export const searchClients = cache(async (term: string) => {
  return clientRepository.findBySearchTerm(term)
}) 