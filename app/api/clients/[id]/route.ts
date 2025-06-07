import { NextResponse } from 'next/server'
import { z } from 'zod'
import { clientRepository } from '@/lib/repositories'

// Schema de validação para atualização de cliente
const clientUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  loyaltyPoints: z.number().int().min(0).optional(),
  loyaltyLevel: z.enum(['CLIENT', 'SPECIAL', 'VIP']).optional()
})

// GET - Buscar um cliente pelo ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { searchParams } = new URL(request.url)
    const includeOrders = searchParams.get('orders') === 'true'

    let client;
    
    if (includeOrders) {
      // Buscar cliente com seus pedidos
      client = await clientRepository.findWithOrders(id)
    } else {
      // Buscar cliente básico
      client = await clientRepository.findById(id)
    }

    if (!client) {
      return NextResponse.json(
        { error: 'Cliente não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ client }, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar cliente:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar cliente' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar um cliente
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    
    // Validar dados de entrada
    const validation = clientUpdateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const updateData = validation.data

    // Verificar se o cliente existe
    const existingClient = await clientRepository.findById(id)
    if (!existingClient) {
      return NextResponse.json(
        { error: 'Cliente não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se o email já está sendo usado por outro cliente
    if (updateData.email && updateData.email !== existingClient.email) {
      const clientWithEmail = await clientRepository.findByEmail(updateData.email)
      if (clientWithEmail) {
        return NextResponse.json(
          { error: 'Este email já está cadastrado para outro cliente' },
          { status: 400 }
        )
      }
    }

    // Atualizar o cliente
    const updatedClient = await clientRepository.update(id, updateData)

    return NextResponse.json({ client: updatedClient }, { status: 200 })
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar cliente' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir um cliente
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // Verificar se o cliente existe
    const existingClient = await clientRepository.findById(id)
    if (!existingClient) {
      return NextResponse.json(
        { error: 'Cliente não encontrado' },
        { status: 404 }
      )
    }

    // Excluir o cliente
    await clientRepository.delete(id)

    return NextResponse.json(
      { message: 'Cliente excluído com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao excluir cliente:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir cliente' },
      { status: 500 }
    )
  }
} 