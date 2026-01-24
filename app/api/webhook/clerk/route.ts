import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { WebhookEvent, UserJSON } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

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
      console.error('Erro na verificação do webhook:', err);
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
    console.error('Erro no webhook do Clerk:', error);
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
      console.error('Email ou ID do Clerk não encontrado nos dados do usuário');
      return;
    }

    // Verificar se cliente já existe
    const existingClient = await prisma.client.findFirst({
      where: {
        OR: [
          { email },
          { clerkUserId }
        ]
      }
    });

    if (existingClient) {
      // Atualizar clerkUserId se não estiver definido
      if (!existingClient.clerkUserId) {
        await prisma.client.update({
          where: { id: existingClient.id },
          data: { clerkUserId }
        });
      }
      return;
    }

    // Criar cliente diretamente (sem criar User na tabela local)
    await prisma.client.create({
      data: {
        name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
        email,
        clerkUserId,
      }
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

// Função para processar atualização de usuário
async function handleUserUpdated(userData: UserJSON) {
  try {
    const clerkUserId = userData.id;
    const email = userData.email_addresses?.[0]?.email_address;
    const firstName = userData.first_name || '';
    const lastName = userData.last_name || '';

    if (!email || !clerkUserId) return;

    // Atualizar dados do cliente usando clerkUserId ou email
    await prisma.client.updateMany({
      where: {
        OR: [
          { clerkUserId },
          { email }
        ]
      },
      data: {
        name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
        clerkUserId, // Garantir que o clerkUserId está atualizado
      }
    });

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
}

// Função para processar exclusão de usuário
async function handleUserDeleted(userData: UserJSON | { id?: string; deleted?: boolean; object?: string }) {
  try {
    const clerkUserId = userData.id;
    // Em eventos de delete, o email pode não vir, depende da interface. 
    // UserJSON tem email_addresses, mas DeletedObjectJSON tem apenas id e deleted.
    // Vamos assumir que tentamos buscar pelo ID.

    if (!clerkUserId) return;

    // Soft delete - remove clerkUserId do cliente mas mantém os dados
    // Busca apenas pelo ID pois o email pode não estar disponível
    await prisma.client.updateMany({
      where: {
        clerkUserId
      },
      data: {
        clerkUserId: null, // Remove a conexão com Clerk
        updatedAt: new Date(),
      }
    });

  } catch (error) {
    console.error('Erro ao processar exclusão de usuário:', error);
  }
} 