
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🧹 Cleaning up orphaned data...');

    try {
        // Delete 'orcamento' page visibility entry if it exists
        const deleted = await prisma.pageVisibility.deleteMany({
            where: {
                slug: 'orcamento'
            }
        });

        console.log(`✅ Deleted ${deleted.count} 'orcamento' page visibility entries.`);

    } catch (error) {
        console.error('❌ Error cleaning up data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
