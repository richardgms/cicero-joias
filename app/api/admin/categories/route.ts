import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor deve estar no formato hexadecimal'),
  type: z.enum(['PORTFOLIO', 'PRODUCT']),
});

// GET - Listar todas as categorias
export async function GET() {
  try {
    const session = await auth();

    if (!session.userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Por enquanto, vamos simular categorias até criarmos a tabela no banco
    const mockCategories = [
      {
        id: '1',
        name: 'Anéis de Formatura',
        color: '#3B82F6',
        type: 'PORTFOLIO',
        order: 1,
        isActive: true,
        itemCount: 5,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Alianças de Casamento',
        color: '#10B981',
        type: 'PORTFOLIO',
        order: 2,
        isActive: true,
        itemCount: 8,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Joias Personalizadas',
        color: '#8B5CF6',
        type: 'PORTFOLIO',
        order: 3,
        isActive: true,
        itemCount: 12,
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Anéis',
        color: '#EC4899',
        type: 'PRODUCT',
        order: 1,
        isActive: true,
        itemCount: 15,
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Colares',
        color: '#F59E0B',
        type: 'PRODUCT',
        order: 2,
        isActive: true,
        itemCount: 7,
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json(mockCategories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar nova categoria
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session.userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = categorySchema.parse(body);

    // Por enquanto, simular criação
    const newCategory = {
      id: Math.random().toString(36).substr(2, 9),
      ...validatedData,
      order: 999, // Será calculado automaticamente
      isActive: true,
      itemCount: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao criar categoria:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 