import { NextResponse } from 'next/server'
import { z } from 'zod'
import { productRepository } from '@/lib/repositories'

// Schema de validação para criação de produto
const productCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  isActive: z.boolean().default(true),
  isReadyDelivery: z.boolean().default(false),
  mainImage: z.string().url().optional()
})

// Buscar todos os produtos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const onlyActive = searchParams.get('active') === 'true'
    const readyDelivery = searchParams.get('readyDelivery') === 'true'
    const search = searchParams.get('search')
    const skip = Number(searchParams.get('skip') || '0')
    const take = Number(searchParams.get('take') || '100')

    let products;
    
    // Buscar produtos com filtros específicos
    if (readyDelivery) {
      products = await productRepository.findReadyDelivery()
    }
    else if (search) {
      products = await productRepository.findBySearchTerm(search)
    }
    else if (onlyActive) {
      products = await productRepository.findActive({ skip, take })
    }
    else {
      products = await productRepository.findAll({ skip, take })
    }

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}

// Criar um novo produto
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validar dados de entrada
    const validation = productCreateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const productData = validation.data

    // Criar o produto usando o repositório
    const product = await productRepository.create(productData)

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
} 