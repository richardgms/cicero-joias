
import { NextResponse } from 'next/server';
import prisma, { executeWithRetry } from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';

// GET /api/admin/trash - List deleted items
export async function GET() {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        const deletedItems = await executeWithRetry(async () => {
            return await prisma.portfolioItem.findMany({
                where: {
                    deletedAt: { not: null }
                },
                orderBy: { deletedAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    mainImage: true,
                    deletedAt: true,
                    status: true
                }
            });
        });

        return NextResponse.json({ items: deletedItems });
    } catch (error) {
        console.error('Error listing trash items:', error);
        return NextResponse.json(
            { error: 'Erro ao listar lixeira' },
            { status: 500 }
        );
    }
}

// POST /api/admin/trash - Restore item
export async function POST(request: Request) {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    const { userId } = authResult;

    try {
        const { id, action } = await request.json();

        if (!id || action !== 'RESTORE') {
            return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
        }

        const restoredItem = await executeWithRetry(async () => {
            return await prisma.portfolioItem.update({
                where: { id },
                data: { deletedAt: null }
            });
        });

        // Log Activity
        await executeWithRetry(async () => {
            return await prisma.activityLog.create({
                data: {
                    action: 'RESTORE',
                    entity: 'PortfolioItem',
                    entityId: id,
                    description: `Item "${restoredItem.title}" restaurado da lixeira`,
                    userId
                }
            });
        });

        return NextResponse.json({ message: 'Item restaurado com sucesso', item: restoredItem });

    } catch (error) {
        console.error('Error restoring item:', error);
        return NextResponse.json(
            { error: 'Erro ao restaurar item' },
            { status: 500 }
        );
    }
}


// DELETE /api/admin/trash - Permanent Delete
export async function DELETE(request: Request) {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    const { userId } = authResult;

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
        }

        // Check item
        const item = await prisma.portfolioItem.findUnique({ where: { id } });
        if (!item) {
            return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
        }

        // Delete dependencies first (Favorites)
        await executeWithRetry(async () => {
            return await prisma.favorite.deleteMany({
                where: { portfolioItemId: id }
            });
        });

        // Permanent delete
        await executeWithRetry(async () => {
            return await prisma.portfolioItem.delete({
                where: { id }
            });
        });

        // Log Activity
        await executeWithRetry(async () => {
            return await prisma.activityLog.create({
                data: {
                    action: 'PERMANENT_DELETE',
                    entity: 'PortfolioItem',
                    entityId: id,
                    description: `Item "${item.title}" excluído permanentemente`,
                    userId
                }
            });
        });

        return NextResponse.json({ message: 'Item excluído permanentemente' });

    } catch (error) {
        console.error('Error deleting item permanently:', error);
        return NextResponse.json(
            { error: 'Erro ao excluir item permanentemente' },
            { status: 500 }
        );
    }
}
