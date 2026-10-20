// Migra as fotos guardadas no banco como base64 (data:image/...) para o
// UploadThing e troca o campo pela URL do arquivo.
//
// Uso (simulação, não grava nada):
//   node --env-file=.env scripts/migrate-images-to-uploadthing.mjs
// Aplicar de verdade:
//   node --env-file=.env scripts/migrate-images-to-uploadthing.mjs --apply
// Contra o banco de testes local (o segundo arquivo sobrescreve o banco):
//   node --env-file=.env --env-file=.env.teste scripts/migrate-images-to-uploadthing.mjs --apply
//
// Idempotente: cada foto recebe customId = hash do conteúdo. Se o arquivo já
// existe no UploadThing (rodada anterior, banco de testes), é reaproveitado.

import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const { UTApi, UTFile } = await import(
  pathToFileURL(path.join(process.cwd(), 'node_modules/uploadthing/server/index.js')).href
);

const APPLY = process.argv.includes('--apply');
const MAX_SIDE = 2400;

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

async function convert(dataUrl) {
  const match = dataUrl.match(/^data:image\/[a-z0-9.+-]+;base64,(.+)$/is);
  if (!match) throw new Error('data URL inválida');
  const original = Buffer.from(match[1].replace(/\s/g, ''), 'base64');
  const customId = 'cj-' + createHash('sha256').update(original).digest('hex').slice(0, 40);
  const webp = await sharp(original, { animated: false })
    .rotate()
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toBuffer();
  return { original, webp, customId };
}

async function main() {
  console.log(`Banco: ${dbHost} | modo: ${APPLY ? 'APLICAR' : 'simulação (use --apply para gravar)'}`);
  const uploaded = await existingByCustomId();
  console.log(`UploadThing: ${uploaded.size} arquivo(s) com customId já existentes\n`);

  const sources = [
    { label: 'portfólio', model: prisma.portfolioItem, name: 'title' },
    { label: 'produto', model: prisma.product, name: 'name' },
  ];

  let totalBefore = 0, totalAfter = 0, converted = 0, reused = 0, sent = 0;

  for (const src of sources) {
    const rows = await src.model.findMany({ select: { id: true, [src.name]: true, mainImage: true, images: true } });

    for (const row of rows) {
      const fields = [['mainImage', row.mainImage], ...row.images.map((v, i) => [`images[${i}]`, v])];
      const pending = fields.filter(([, v]) => typeof v === 'string' && v.startsWith('data:image/'));
      if (pending.length === 0) continue;

      const replacements = new Map();
      for (const [field, value] of pending) {
        const { original, webp, customId } = await convert(value);
        totalBefore += original.length; totalAfter += webp.length; converted++;

        let key = uploaded.get(customId);
        let status = 'simulado';
        if (key) {
          reused++;
          status = 'reaproveitado';
        } else if (APPLY) {
          const res = await utapi.uploadFiles(new UTFile([webp], `${customId}.webp`, { customId, type: 'image/webp' }));
          if (res.error) throw new Error(`upload falhou (${field} de "${row[src.name]}"): ${res.error.message}`);
          key = res.data.key;
          uploaded.set(customId, key);
          sent++;
          status = 'enviado';
        }
        replacements.set(value, key ? fileUrl(key) : `(enviaria ${customId}.webp)`);
        console.log(`  ${src.label} | ${String(row[src.name]).slice(0, 40).padEnd(40)} | ${field.padEnd(10)} | ${kb(original.length)} → ${kb(webp.length)} | ${status}`);
      }

      if (APPLY) {
        const mainImage = replacements.get(row.mainImage) ?? row.mainImage;
        const images = row.images.map((v) => replacements.get(v) ?? v);
        await src.model.update({ where: { id: row.id }, data: { mainImage, images } });
      }
    }
  }

  console.log(`\nFotos em base64: ${converted} | ${kb(totalBefore)} → ${kb(totalAfter)} em WebP`);
  console.log(`Enviadas agora: ${sent} | reaproveitadas: ${reused}`);

  const left = await prisma.$queryRawUnsafe(`
    select (select count(*) from portfolio_items where "mainImage" like 'data:image/%' or array_to_string(images, ' ') like '%data:image/%')
         + (select count(*) from products where "mainImage" like 'data:image/%' or array_to_string(images, ' ') like '%data:image/%') as n`);
  console.log(`Registros que ainda têm base64: ${left[0].n}`);
}

main()
  .catch((error) => { console.error('ERRO:', error.message); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
