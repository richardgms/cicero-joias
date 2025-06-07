import { NextResponse } from 'next/server'
import { z } from 'zod'
import { productRepository } from '@/lib/repositories'

// Schema de validação para atualização de produto
const productUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
  isReadyDelivery: z.boolean().optional(),
  mainImage: z.string().url().optional()
})

// GET - Buscar um produto pelo ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { searchParams } = new URL(request.url)
    const includePortfolio = searchParams.get('portfolio') === 'true'

    let product;
    
    if (includePortfolio) {
      // Buscar produto com os itens de portfólio relacionados
      product = await productRepository.findWithPortfolioItems(id)
    } else {
      // Buscar produto básico
      product = await productRepository.findById(id)
    }

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar um produto
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    
    // Validar dados de entrada
    const validation = productUpdateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    // Verificar se o produto existe
    const existingProduct = await productRepository.findById(id)
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Atualizar o produto
    const updatedProduct = await productRepository.update(id, validation.data)

    return NextResponse.json({ product: updatedProduct }, { status: 200 })
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    )
  }
}

// PATCH - Ativar/desativar um produto (operação específica)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    const { isActive } = body
    
    // Verificar se o isActive foi fornecido
    if (typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'O campo isActive é obrigatório e deve ser booleano' },
        { status: 400 }
      )
    }

    // Verificar se o produto existe
    const existingProduct = await productRepository.findById(id)
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Ativar/desativar o produto
    const updatedProduct = await productRepository.toggleActive(id, isActive)

    return NextResponse.json({ product: updatedProduct }, { status: 200 })
  } catch (error) {
    console.error('Erro ao ativar/desativar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao ativar/desativar produto' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir um produto
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // Verificar se o produto existe
    const existingProduct = await productRepository.findById(id)
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Excluir o produto
    await productRepository.delete(id)

    return NextResponse.json(
      { message: 'Produto excluído com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir produto' },
      { status: 500 }
    )
  }
} 