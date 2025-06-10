import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'ID do pedido é obrigatório' }, { status: 400 });
    }

    const email = user.emailAddresses[0].emailAddress;

    // Buscar cliente
    const client = await prisma.client.findUnique({
      where: { email },
      include: { loyaltyTransactions: true }
    });

    if (!client) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    // Verificar se o pedido já foi processado para fidelidade
    const existingTransaction = await prisma.loyaltyTransaction.findFirst({
      where: {
        clientId: client.id,
        orderId: orderId,
        type: 'EARNED'
      }
    });

    if (existingTransaction) {
      return NextResponse.json({ 
        message: 'Pedido já processado para fidelidade',
        loyaltyPoints: client.loyaltyPoints 
      });
    }

    // Adicionar 1 ponto de fidelidade
    const updatedClient = await prisma.client.update({
      where: { id: client.id },
      data: { loyaltyPoints: client.loyaltyPoints + 1 }
    });

    // Registrar transação de fidelidade
    await prisma.loyaltyTransaction.create({
      data: {
        clientId: client.id,
        type: 'EARNED',
        points: 1,
        orderId: orderId,
        description: 'Ponto ganho por conserto/compra'
      }
    });

    // Verificar se completou 10 pontos para gerar cupom
    if (updatedClient.loyaltyPoints >= 10 && updatedClient.loyaltyPoints % 10 === 0) {
      // Gerar código único do cupom
      const generateCouponCode = () => {
        return `FIEL${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      };

      let couponCode = generateCouponCode();
      let codeExists = true;

      // Garantir que o código é único
      while (codeExists) {
        const existingCoupon = await prisma.coupon.findUnique({
          where: { code: couponCode }
        });
        if (!existingCoupon) {
          codeExists = false;
        } else {
          couponCode = generateCouponCode();
        }
      }

      // Criar cupom de fidelidade
      const loyaltyCoupon = await prisma.coupon.create({
        data: {
          code: couponCode,
          type: 'LOYALTY',
          value: 40.00, // Valor máximo do desconto
          percentage: 100, // 100% de desconto
          maxDiscount: 40.00, // Até R$ 40,00
          clientId: client.id,
          expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 180 dias
        }
      });

      // Registrar transação de resgate
      await prisma.loyaltyTransaction.create({
        data: {
          clientId: client.id,
          type: 'REDEEMED',
          points: -10,
          couponId: loyaltyCoupon.id,
          description: 'Cupom de fidelidade gerado (10 pontos)'
        }
      });

      // Atualizar pontos do cliente (remover 10 pontos usados)
      await prisma.client.update({
        where: { id: client.id },
        data: { loyaltyPoints: updatedClient.loyaltyPoints - 10 }
      });

      return NextResponse.json({ 
        message: 'Parabéns! Você ganhou um cupom de fidelidade!',
        loyaltyPoints: updatedClient.loyaltyPoints - 10,
        newCoupon: loyaltyCoupon
      });
    }

    return NextResponse.json({ 
      message: 'Ponto de fidelidade adicionado!',
      loyaltyPoints: updatedClient.loyaltyPoints,
      pointsToNextCoupon: 10 - (updatedClient.loyaltyPoints % 10)
    });
  } catch (error) {
    console.error('Erro ao processar fidelidade:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 