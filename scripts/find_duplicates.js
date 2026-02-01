
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findDuplicates() {
    try {
        const items = await prisma.portfolioItem.findMany({
            orderBy: { createdAt: 'desc' },
            select: { id: true, title: true, status: true, createdAt: true }
        });

        console.log(`Total items found: ${items.length}`);
        console.log('------------------------------------------------');
        items.forEach((item, index) => {
            console.log(`[${index}] ID: ${item.id} | Title: "${item.title}" | Status: ${item.status} | Created: ${item.createdAt}`);
        });
        console.log('------------------------------------------------');

        // Suggest items to keep (top 3)
        const keepIds = items.slice(0, 3).map(i => i.id);
        const deleteIds = items.slice(3).map(i => i.id);

        console.log(`Keep IDs: ${keepIds.join(', ')}`);
        console.log(`Delete IDs (${deleteIds.length}): ${deleteIds.join(', ')}`);

    } catch (error) {
        console.error('Error finding duplicates:', error);
    } finally {
        await prisma.$disconnect();
    }
}

findDuplicates();
