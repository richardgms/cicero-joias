
import { NextResponse } from 'next/server';
import prisma, { executeWithRetry } from '@/lib/prisma';
import { checkAdminAuth } from "@/lib/check-admin";

export async function GET() {
    try {
        const authResult = await checkAdminAuth();
        if ("error" in authResult) {
            return NextResponse.json({ error: authResult.error }, { status: authResult.status });
        }

        const count = await executeWithRetry(() =>
            prisma.portfolioItem.count({
                where: {
                    isFeatured: true
                }
            })
        );

        return NextResponse.json({ count });
    } catch (error) {
        console.error('Erro ao buscar contagem de destaques:', error);
        return NextResponse.json(
            { error: 'Erro interno ao buscar contagem' },
            { status: 500 }
        );
    }
}
