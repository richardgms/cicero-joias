
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanupPortfolio() {
    console.log('Starting portfolio cleanup...');
    try {
        // 1. Get all items sorted by date (newest first)
        const items = await prisma.portfolioItem.findMany({
            orderBy: { createdAt: 'desc' },
            select: { id: true, title: true, createdAt: true }
        });

        console.log(`Found ${items.length} total items.`);

        if (items.length <= 3) {
            console.log('No cleanup needed (3 or fewer items).');
            return;
        }

        // 2. Identify items to delete (skip the first 3)
        const itemsToDelete = items.slice(3);
        const deleteIds = itemsToDelete.map(i => i.id);

        console.log(`Deleting ${deleteIds.length} old/duplicate items...`);

        // 3. Delete dependencies (Favorites) first to avoid foreign key errors
        await prisma.favorite.deleteMany({
            where: {
                portfolioItemId: { in: deleteIds }
            }
        });
        console.log('Deleted related favorites.');

        // 4. Delete the items
        const result = await prisma.portfolioItem.deleteMany({
            where: {
                id: { in: deleteIds }
            }
        });

        console.log(`Successfully deleted ${result.count} items.`);

        console.log('--------------------------------');
        console.log('Remaining items:');
        const remaining = await prisma.portfolioItem.findMany({
            orderBy: { createdAt: 'desc' },
            select: { id: true, title: true }
        });
        remaining.forEach(item => console.log(`- ${item.title} (${item.id})`));

    } catch (error) {
        console.error('Cleanup failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

cleanupPortfolio();
