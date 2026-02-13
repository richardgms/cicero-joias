import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { WebhookEvent, UserJSON } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    // Obter headers do webhook
    const headerPayload = await headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    // Verificar se os headers estão presentes
    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: 'Headers do webhook inválidos' },
        { status: 400 }
      );
    }

    // Obter o corpo da requisição
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verificar assinatura do webhook
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

    let evt: WebhookEvent;
    try {
      evt = wh.verify(body, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as WebhookEvent;
    } catch (err) {
      logger.error('Erro na verificação do webhook:', err);
      return NextResponse.json(
        { error: 'Falha na verificação do webhook' },
        { status: 400 }
      );
    }

    // Processar eventos do Clerk
    const eventType = evt.type;

    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data);
        break;
      case 'user.updated':
        await handleUserUpdated(evt.data);
        break;
      case 'user.deleted':
        await handleUserDeleted(evt.data);
        break;
      // Removido log de evento não processado para evitar poluição
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Erro no webhook do Clerk:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Função para processar criação de usuário
async function handleUserCreated(userData: UserJSON) {
  try {
    const clerkUserId = userData.id;
    const email = userData.email_addresses?.[0]?.email_address;
    const firstName = userData.first_name || '';
    const lastName = userData.last_name || '';

    if (!email || !clerkUserId) {
      logger.error('Email ou ID do Clerk não encontrado nos dados do usuário');
      return;
    }

    // Verificar se cliente já existe pelo email
    const existingClient = await prisma.client.findUnique({
      where: { email }
    });

    if (existingClient) {
      // Cliente já existe, nada a fazer pois não temos clerkUserId no banco
      return;
    }

    // Criar cliente diretamente
    await prisma.client.create({
      data: {
        name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
        email,
      }
    });

  } catch (error) {
    logger.error('Erro ao criar usuário:', error);
  }
}

// Função para processar atualização de usuário
async function handleUserUpdated(userData: UserJSON) {
  try {
    const email = userData.email_addresses?.[0]?.email_address;
    const firstName = userData.first_name || '';
    const lastName = userData.last_name || '';

    if (!email) return;

    // Atualizar dados do cliente usando apenas o email
    await prisma.client.update({
      where: { email },
      data: {
        name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
      }
    });

  } catch (error) {
    logger.error('Erro ao atualizar usuário:', error);
  }
}

// Função para processar exclusão de usuário
async function handleUserDeleted(userData: UserJSON | { id?: string; deleted?: boolean; object?: string }) {
  try {
    const id = userData.id;
    logger.debug(`Usuário deletado no Clerk: ${id}. Ação no banco ignorada.`);
  } catch (error) {
    logger.error('Erro ao processar exclusão de usuário:', error);
  }
}
