const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkFeatured() {
    try {
        const featuredCount = await prisma.portfolioItem.count({
            where: {
                isFeatured: true,
            },
        });
        console.log(`Total Featured items: ${featuredCount}`);

        const publishedFeaturedCount = await prisma.portfolioItem.count({
            where: {
                isFeatured: true,
                isActive: true,
                status: 'PUBLISHED'
            },
        });
        console.log(`Published & Active Featured items: ${publishedFeaturedCount}`);

        const items = await prisma.portfolioItem.findMany({
            where: { isFeatured: true },
            select: { id: true, title: true, isFeatured: true, isActive: true, status: true },
            take: 5
        });
        console.log('Sample featured items:', items);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkFeatured();
