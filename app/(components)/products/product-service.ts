import { productRepository } from "@/lib/repositories"
import { cache } from "react"

// Server Component para buscar todos os produtos (com cache)
export const getProducts = cache(async (options?: { skip?: number; take?: number }) => {
  return productRepository.findAll(options)
})

// Server Component para buscar produtos ativos
export const getActiveProducts = cache(async (options?: { skip?: number; take?: number }) => {
  return productRepository.findActive(options)
})

// Server Component para buscar produtos de pronta entrega
export const getReadyDeliveryProducts = cache(async () => {
  return productRepository.findReadyDelivery()
})

// Server Component para buscar produto por ID
export const getProductById = cache(async (id: string) => {
  return productRepository.findById(id)
})

// Server Component para buscar produto com itens de portfólio
export const getProductWithPortfolioItems = cache(async (id: string) => {
  return productRepository.findWithPortfolioItems(id)
})

// Server Component para buscar produtos por termo de busca
export const searchProducts = cache(async (term: string) => {
  return productRepository.findBySearchTerm(term)
}) 