import { orderRepository } from "@/lib/repositories"
import { OrderStatus } from "@prisma/client"
import { cache } from "react"

// Server Component para buscar todos os pedidos (com cache)
export const getOrders = cache(async (options?: { skip?: number; take?: number }) => {
  return orderRepository.findAll(options)
})

// Server Component para buscar pedido por ID
export const getOrderById = cache(async (id: string) => {
  return orderRepository.findById(id)
})

// Server Component para buscar pedido com detalhes completos
export const getOrderWithDetails = cache(async (id: string) => {
  return orderRepository.findWithDetails(id)
})

// Server Component para buscar pedidos de um cliente específico
export const getOrdersByClientId = cache(async (clientId: string) => {
  return orderRepository.findByClientId(clientId)
})

// Server Component para buscar pedidos por status
export const getOrdersByStatus = cache(async (status: OrderStatus) => {
  return orderRepository.findByStatus(status)
}) 