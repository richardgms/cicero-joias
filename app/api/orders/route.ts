import { NextResponse } from 'next/server'
import { z } from 'zod'
import { orderRepository } from '@/lib/repositories'

// Schema de validação para criação de pedido
const orderCreateSchema = z.object({
  totalValue: z.number().min(0),
  category: z.enum(['JEWELRY_SALES', 'REPAIR_SERVICES', 'CUSTOM_SERVICES', 'GOLD_PLATING', 'GRADUATION_RINGS', 'WEDDING_RINGS']),
  description: z.string().optional(),
  clientId: z.string().min(1)
})

// Buscar todos os pedidos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const clientId = searchParams.get('clientId')
    const skip = Number(searchParams.get('skip') || '0')
    const take = Number(searchParams.get('take') || '50')

    let orders;
    
    // Filtrar por status se fornecido
    if (status) {
      orders = await orderRepository.findByStatus(status as any)
    } 
    // Filtrar por cliente se fornecido
    else if (clientId) {
      orders = await orderRepository.findByClientId(clientId)
    } 
    // Caso contrário, buscar todos com paginação
    else {
      orders = await orderRepository.findAll({ skip, take })
    }

    return NextResponse.json({ orders }, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos' },
      { status: 500 }
    )
  }
}

// Criar um novo pedido
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validar dados de entrada
    const validation = orderCreateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const { totalValue, category, description, clientId } = validation.data

    // Criar o pedido usando o repositório
    const order = await orderRepository.create({
      totalValue,
      category,
      description,
      client: {
        connect: { id: clientId }
      },
      status: 'PENDING', // Status padrão
    })

    // Registrar o histórico de status inicial
    await orderRepository.updateStatus(order.id, 'PENDING', 'Pedido criado')

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar pedido:', error)
    return NextResponse.json(
      { error: 'Erro ao criar pedido' },
      { status: 500 }
    )
  }
} 