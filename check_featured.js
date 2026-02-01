const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkFeatured() {
    try {
        const featuredCount = await prisma.portfolioItem.count({
            where: {
                isFeatured: true,
            },
        });
        console.log(`Featured items count: ${featuredCount}`);

        const allItems = await prisma.portfolioItem.findMany({
            select: { id: true, title: true, isFeatured: true },
            take: 5
        });
        console.log('Sample items:', allItems);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkFeatured();
