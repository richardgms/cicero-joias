import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação
const settingsSchema = z.array(z.object({
  key: z.string().min(1, 'Chave é obrigatória'),
  value: z.string(),
  type: z.enum(['TEXT', 'HTML', 'JSON', 'IMAGE']).default('TEXT'),
  description: z.string().optional(),
}));

async function checkAdminAuth() {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'Não autorizado', status: 401 };
  }

  try {
    const { clerkClient } = await import('@clerk/nextjs/server');
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userRole = (user.publicMetadata?.role as string)?.toLowerCase();

    if (userRole !== 'admin') {
      return { error: 'Acesso negado', status: 403 };
    }

    return { userId };
  } catch (error) {
    return { error: 'Erro de autenticação', status: 500 };
  }
}

// GET /api/admin/site-settings - Buscar configurações
export async function GET(request: Request) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section'); // portfolio, home, etc.

    let whereClause = {};
    if (section) {
      whereClause = {
        key: {
          startsWith: section
        }
      };
    }

    const settings = await prisma.siteSettings.findMany({
      where: whereClause,
      orderBy: { key: 'asc' }
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/admin/site-settings - Atualizar múltiplas configurações
export async function POST(request: Request) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = authResult;
    const body = await request.json();
    const validatedData = settingsSchema.parse(body);

    // Atualizar ou criar configurações
    const updatedSettings = [];
    
    for (const setting of validatedData) {
      const updatedSetting = await prisma.siteSettings.upsert({
        where: { key: setting.key },
        update: {
          value: setting.value,
          type: setting.type,
          description: setting.description,
        },
        create: {
          key: setting.key,
          value: setting.value,
          type: setting.type,
          description: setting.description,
        },
      });
      updatedSettings.push(updatedSetting);
    }

    // Log da atividade
    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entity: 'SiteSettings',
        entityId: 'multiple',
        description: `Configurações do site atualizadas: ${validatedData.map(s => s.key).join(', ')}`,
        userId,
      },
    });

    return NextResponse.json({ settings: updatedSettings });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao atualizar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 