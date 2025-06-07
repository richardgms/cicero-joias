import { NextResponse } from 'next/server'
import { z } from 'zod'
import { clientRepository } from '@/lib/repositories'

// Schema de validação para criação de cliente
const clientCreateSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  whatsapp: z.string().optional()
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const skip = Number(searchParams.get('skip') || '0')
    const take = Number(searchParams.get('take') || '50')
    
    let clients;
    
    // Buscar clientes por termo de busca se fornecido
    if (search) {
      clients = await clientRepository.findBySearchTerm(search)
    } else {
      // Caso contrário, buscar todos com paginação
      clients = await clientRepository.findAll({ skip, take })
    }

    return NextResponse.json({ clients }, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar clientes' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validar dados de entrada
    const validation = clientCreateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const { name, email, phone, whatsapp } = validation.data

    // Verificar se o email já está em uso
    const existingClient = await clientRepository.findByEmail(email)
    if (existingClient) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 }
      )
    }

    // Criar o cliente usando o repositório
    const client = await clientRepository.create({
      name,
      email,
      phone,
      whatsapp
    })

    return NextResponse.json({ client }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    return NextResponse.json(
      { error: 'Erro ao criar cliente' },
      { status: 500 }
    )
  }
} 