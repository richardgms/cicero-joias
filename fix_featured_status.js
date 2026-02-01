const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function publishFeatured() {
    try {
        const updated = await prisma.portfolioItem.updateMany({
            where: {
                isFeatured: true,
            },
            data: {
                status: 'PUBLISHED',
                isActive: true
            }
        });
        console.log(`Updated ${updated.count} featured items to PUBLISHED status.`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

publishFeatured();
