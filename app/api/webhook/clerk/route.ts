import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
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

    let evt;
    try {
      evt = wh.verify(body, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
    } catch (err) {
      console.error('Erro na verificação do webhook:', err);
      return NextResponse.json(
        { error: 'Falha na verificação do webhook' },
        { status: 400 }
      );
    }

    // Processar eventos do Clerk
    const { type, data } = evt as { type: string; data: any };
    console.log(`Evento recebido: ${type}`);

    switch (type) {
      case 'user.created':
        await handleUserCreated(data);
        break;
      case 'user.updated':
        await handleUserUpdated(data);
        break;
      case 'user.deleted':
        await handleUserDeleted(data);
        break;
      default:
        console.log(`Evento não processado: ${type}`);
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
async function handleUserCreated(userData: any) {
  try {
    const email = userData.email_addresses?.[0]?.email_address;
    const firstName = userData.first_name || '';
    const lastName = userData.last_name || '';

    if (!email) {
      console.error('Email não encontrado nos dados do usuário');
      return;
    }

    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log(`Usuário ${email} já existe no banco`);
      return;
    }

    // Criar usuário no banco
    const user = await prisma.user.create({
      data: {
        email,
        password: '', // Clerk gerencia a autenticação
        role: 'CLIENT', // Padrão é cliente
      }
    });

    // Criar cliente associado
    await prisma.client.create({
      data: {
        name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
        email,
        userId: user.id,
      }
    });

    console.log(`✅ Usuário ${email} sincronizado com sucesso!`);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

// Função para processar atualização de usuário
async function handleUserUpdated(userData: any) {
  try {
    const email = userData.email_addresses?.[0]?.email_address;
    const firstName = userData.first_name || '';
    const lastName = userData.last_name || '';

    if (!email) return;

    // Atualizar dados do cliente
    await prisma.client.updateMany({
      where: { email },
      data: {
        name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
      }
    });

    console.log(`✅ Usuário ${email} atualizado com sucesso!`);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
}

// Função para processar exclusão de usuário
async function handleUserDeleted(userData: any) {
  try {
    const email = userData.email_addresses?.[0]?.email_address;
    
    if (!email) return;

    // Soft delete - atualiza data de modificação
    await prisma.user.updateMany({
      where: { email },
      data: {
        updatedAt: new Date(),
      }
    });

    console.log(`✅ Usuário ${email} processado para exclusão`);
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
  }
} 