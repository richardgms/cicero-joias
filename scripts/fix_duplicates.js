
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixDuplicates() {
    console.log('Fixing duplicates...');
    try {
        const items = await prisma.portfolioItem.findMany({
            orderBy: { createdAt: 'desc' },
            select: { id: true, title: true, createdAt: true }
        });

        if (items.length <= 1) {
            console.log('No duplicates to fix (1 or 0 items).');
            return;
        }

        console.log(`Found ${items.length} items. Keeping the newest one:`);
        console.log(`Keep: ${items[0].title} (${items[0].id})`);

        const toDelete = items.slice(1);
        const deleteIds = toDelete.map(i => i.id);

        console.log(`Deleting ${deleteIds.length} duplicates...`);

        // Delete dependencies first
        await prisma.favorite.deleteMany({
            where: { portfolioItemId: { in: deleteIds } }
        });

        // Delete items
        await prisma.portfolioItem.deleteMany({
            where: { id: { in: deleteIds } }
        });

        console.log('Duplicates deleted. Portfolio now has 1 item.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fixDuplicates();
