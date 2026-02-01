import { NextResponse } from 'next/server';
import prisma, { executeWithRetry } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const deletedItems = await executeWithRetry(async () => {
            return await prisma.portfolioItem.deleteMany({
                where: {
                    deletedAt: {
                        lt: thirtyDaysAgo
                    }
                }
            });
        });

        console.log(`Cron cleanup: Deleted ${deletedItems.count} items older than 30 days.`);

        return NextResponse.json({
            success: true,
            deletedCount: deletedItems.count,
            message: `Deleted ${deletedItems.count} items older than 30 days.`
        });

    } catch (error) {
        console.error('Cron cleanup error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
