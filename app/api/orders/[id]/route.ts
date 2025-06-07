import { NextResponse } from 'next/server'
import { z } from 'zod'
import { orderRepository } from '@/lib/repositories'

// Schema de validação para atualização de pedido
const orderUpdateSchema = z.object({
  totalValue: z.number().min(0).optional(),
  status: z.enum(['PENDING', 'DESIGN_APPROVED', 'IN_PRODUCTION', 'READY_FOR_PICKUP', 'COMPLETED', 'CANCELLED']).optional(),
  category: z.enum(['JEWELRY_SALES', 'REPAIR_SERVICES', 'CUSTOM_SERVICES', 'GOLD_PLATING', 'GRADUATION_RINGS', 'WEDDING_RINGS']).optional(),
  description: z.string().optional(),
  statusDescription: z.string().optional()
})

// GET - Buscar um pedido pelo ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { searchParams } = new URL(request.url)
    const includeDetails = searchParams.get('details') === 'true'

    let order;
    
    if (includeDetails) {
      // Buscar pedido com detalhes (histórico, anexos, cliente)
      order = await orderRepository.findWithDetails(id)
    } else {
      // Buscar pedido básico
      order = await orderRepository.findById(id)
    }

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ order }, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar pedido:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar pedido' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar um pedido
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    
    // Validar dados de entrada
    const validation = orderUpdateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const { status, statusDescription, ...data } = validation.data

    // Verificar se o pedido existe
    const existingOrder = await orderRepository.findById(id)
    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      )
    }

    let updatedOrder;
    
    // Se houver mudança de status, usar método específico que registra no histórico
    if (status && status !== existingOrder.status) {
      updatedOrder = await orderRepository.updateStatus(id, status, statusDescription || `Status alterado para ${status}`)
    }
    
    // Se houver outros dados para atualizar
    if (Object.keys(data).length > 0) {
      updatedOrder = await orderRepository.update(id, data)
    }

    return NextResponse.json({ order: updatedOrder }, { status: 200 })
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar pedido' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir um pedido
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // Verificar se o pedido existe
    const existingOrder = await orderRepository.findById(id)
    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      )
    }

    // Se o pedido já estiver em produção ou concluído, impedir a exclusão
    if (['IN_PRODUCTION', 'READY_FOR_PICKUP', 'COMPLETED'].includes(existingOrder.status)) {
      return NextResponse.json(
        { error: 'Não é possível excluir pedidos em produção ou concluídos' },
        { status: 400 }
      )
    }

    // Excluir o pedido
    await orderRepository.delete(id)

    return NextResponse.json(
      { message: 'Pedido excluído com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao excluir pedido:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir pedido' },
      { status: 500 }
    )
  }
} 