
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const outputPath = path.join(process.cwd(), 'debug_output.txt');

async function checkItem() {
    let output = 'QUERYING...\n';

    const specific = await prisma.portfolioItem.findFirst({
        where: {
            id: {
                endsWith: 'db7xzg'
            }
        }
    });

    if (specific) {
        output += `FOUND: ${specific.id}\n`;
        output += `Title: ${specific.title}\n`;
        output += `Has Product? ${specific.productId ? 'Yes' : 'No'}\n`;
    } else {
        output += 'NOT FOUND\n';
    }

    const all = await prisma.portfolioItem.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true }
    });
    output += `LAST 5 ITEMS:\n${JSON.stringify(all, null, 2)}\n`;

    fs.writeFileSync(outputPath, output);
    await prisma.$disconnect();
}

checkItem();
