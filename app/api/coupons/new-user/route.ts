import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const email = user.emailAddresses?.[0]?.emailAddress || user.primaryEmailAddress?.emailAddress;
    
    if (!email) {
      return NextResponse.json({ error: 'Email do usuário não encontrado' }, { status: 400 });
    }

    // Verificar se o cliente já existe
    let client = await prisma.client.findUnique({
      where: { email },
      include: { coupons: true }
    });

    // Se não existir, criar novo cliente
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: user.fullName || user.firstName || 'Cliente',
          email: email,
          phone: user.phoneNumbers[0]?.phoneNumber,
        },
        include: { coupons: true }
      });
    }

    // Verificar se já tem cupom de novo usuário
    const hasNewUserCoupon = client.coupons.some(coupon => 
      coupon.type === 'NEW_USER' && coupon.isActive
    );

    if (hasNewUserCoupon) {
      return NextResponse.json({ 
        message: 'Cliente já possui cupom de novo usuário',
        coupon: client.coupons.find(c => c.type === 'NEW_USER' && c.isActive)
      });
    }

    // Gerar código único do cupom
    const generateCouponCode = () => {
      return `NOVO${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
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

    // Criar cupom de novo usuário
    const newCoupon = await prisma.coupon.create({
      data: {
        code: couponCode,
        type: 'NEW_USER',
        value: 10.00, // R$ 10,00
        clientId: client.id,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 dias
      }
    });

    return NextResponse.json({ 
      message: 'Cupom de novo usuário criado com sucesso!',
      coupon: newCoupon 
    });
  } catch (error) {
    console.error('Erro ao criar cupom de novo usuário:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 