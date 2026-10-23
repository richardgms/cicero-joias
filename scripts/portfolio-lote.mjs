// Cadastra um lote de itens no portfólio a partir de uma pasta com fotos e textos.
// Os itens entram como RASCUNHO (isActive: false, status DRAFT): só aparecem no
// site depois de ativados no admin.
//
// A pasta precisa ter:
//   textos.json  → lista de itens (title, description, detailedDescription,
//                  specifications, seoTitle, seoDescription, keywords,
//                  customCategory, generated = nome do arquivo em geradas/)
//   geradas/     → as imagens aprovadas
//
// Uso (simulação, não grava nada):
//   node --env-file=.env scripts/portfolio-lote.mjs "C:\...\Cícero Joias - Fotos IA"
// Aplicar de verdade:
//   node --env-file=.env scripts/portfolio-lote.mjs "<pasta>" --apply
// Contra o banco de testes local (o segundo arquivo sobrescreve o banco):
//   node --env-file=.env --env-file=.env.teste scripts/portfolio-lote.mjs "<pasta>" --apply
//
// Idempotente: a foto recebe customId = hash do conteúdo (reaproveitada se já
// foi enviada) e um item com o mesmo título que não esteja na lixeira é pulado.

import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const { UTApi, UTFile } = await import(
  pathToFileURL(path.join(process.cwd(), 'node_modules/uploadthing/server/index.js')).href
);

const APPLY = process.argv.includes('--apply');
const folder = process.argv.slice(2).find((a) => !a.startsWith('--'));
if (!folder) {
  console.error('Informe a pasta do lote. Ex.: node --env-file=.env scripts/portfolio-lote.mjs "C:\\...\\Fotos IA"');
  process.exit(1);
}

// As fotos do portfólio são exibidas em até ~1000 px; 1024 x 1024 basta.
const SIDE = 1024;
const CATEGORY = 'WEDDING_RINGS';

const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
const dbHost = new URL(dbUrl).hostname;
const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });
const utapi = new UTApi();

const token = JSON.parse(Buffer.from(process.env.UPLOADTHING_TOKEN.replace(/^['"]|['"]$/g, ''), 'base64').toString());
const fileUrl = (key) => `https://${token.appId}.ufs.sh/f/${key}`;
const kb = (n) => `${Math.round(n / 1024)} KB`;

async function existingByCustomId() {
  const map = new Map();
  let offset = 0;
  for (;;) {
    const { files, hasMore } = await utapi.listFiles({ limit: 500, offset });
    for (const f of files) if (f.customId) map.set(f.customId, f.key);
    if (!hasMore) break;
    offset += files.length;
  }
  return map;
}

async function main() {
  const items = JSON.parse(readFileSync(path.join(folder, 'textos.json'), 'utf8'));
  console.log(`Banco: ${dbHost} | modo: ${APPLY ? 'APLICAR' : 'simulação (use --apply para gravar)'} | itens no lote: ${items.length}\n`);

  const uploaded = await existingByCustomId();
  const last = await prisma.portfolioItem.aggregate({ _max: { order: true } });
  let order = (last._max.order ?? 0) + 1;
  let created = 0, skipped = 0;

  for (const item of items) {
    const exists = await prisma.portfolioItem.findFirst({
      where: { title: item.title, deletedAt: null },
      select: { id: true },
    });
    if (exists) {
      console.log(`  pulado (já existe) | ${item.title}`);
      skipped++;
      continue;
    }

    const original = readFileSync(path.join(folder, 'geradas', item.generated));
    const webp = await sharp(original)
      .resize({ width: SIDE, height: SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toBuffer();
    const customId = 'cj-' + createHash('sha256').update(webp).digest('hex').slice(0, 40);

    let key = uploaded.get(customId);
    let status = key ? 'foto reaproveitada' : 'foto simulada';
    if (!key && APPLY) {
      const res = await utapi.uploadFiles(new UTFile([webp], `${customId}.webp`, { customId, type: 'image/webp' }));
      if (res.error) throw new Error(`upload falhou (${item.title}): ${res.error.message}`);
      key = res.data.key;
      uploaded.set(customId, key);
      status = 'foto enviada';
    }

    if (APPLY) {
      const row = await prisma.portfolioItem.create({
        data: {
          title: item.title,
          description: item.description,
          detailedDescription: item.detailedDescription,
          category: CATEGORY,
          customCategory: item.customCategory,
          mainImage: fileUrl(key),
          images: [],
          specifications: item.specifications,
          seoTitle: item.seoTitle,
          seoDescription: item.seoDescription,
          keywords: item.keywords,
          relatedProjects: [],
          isActive: false,
          isFeatured: false,
          status: 'DRAFT',
          order: order++,
        },
        select: { id: true },
      });
      console.log(`  criado (rascunho)  | ${item.title} | ${kb(original.length)} → ${kb(webp.length)} | ${status} | id ${row.id}`);
    } else {
      console.log(`  criaria (rascunho) | ${item.title} | ${kb(original.length)} → ${kb(webp.length)} | ${status}`);
    }
    created++;
  }

  console.log(`\n${APPLY ? 'Criados' : 'Seriam criados'}: ${created} | pulados: ${skipped}`);
}

main()
  .catch((error) => { console.error('ERRO:', error.message); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
