
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspectItems() {
    try {
        const items = await prisma.portfolioItem.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                createdAt: true
            }
        });

        console.log(`\nFound ${items.length} items in total:\n`);
        items.forEach((item, index) => {
            console.log(`[${index}] ID: ${item.id}`);
            console.log(`    Title: "${item.title}"`);
            console.log(`    Status: ${item.status}`);
            console.log(`    Created: ${item.createdAt.toISOString()}`);
            console.log('-------------------------------------------');
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

inspectItems();
