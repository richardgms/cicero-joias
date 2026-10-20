import { UTApi } from 'uploadthing/server';
import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';

const utapi = new UTApi();

// Só arquivos hospedados no UploadThing (fotos antigas em base64 ou caminhos
// /assets não têm arquivo para apagar).
function fileKeyFromUrl(url: string): string | null {
  try {
    const { hostname, pathname } = new URL(url);
    if (!hostname.endsWith('.ufs.sh') && hostname !== 'utfs.io') return null;
    const match = pathname.match(/^\/f\/([^/]+)$/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

async function isStillReferenced(url: string): Promise<boolean> {
  const [portfolio, products] = await Promise.all([
    prisma.portfolioItem.count({ where: { OR: [{ mainImage: url }, { images: { has: url } }] } }),
    prisma.product.count({ where: { OR: [{ mainImage: url }, { images: { has: url } }] } }),
  ]);
  return portfolio + products > 0;
}

// Apaga do UploadThing as imagens que nenhum item usa mais. Chamar depois de
// gravar no banco. Falhas só vão para o log: o item já foi salvo/excluído e um
// arquivo órfão não deve quebrar a operação do admin.
export async function deleteUnusedImages(urls: Array<string | null | undefined>): Promise<void> {
  const unique = Array.from(new Set(urls.filter((u): u is string => !!u)));
  const keys: string[] = [];

  for (const url of unique) {
    const key = fileKeyFromUrl(url);
    if (key && !(await isStillReferenced(url))) keys.push(key);
  }

  if (keys.length === 0) return;

  try {
    await utapi.deleteFiles(keys);
    logger.debug(`UploadThing: ${keys.length} imagem(ns) sem uso apagada(s)`);
  } catch (error) {
    logger.error('UploadThing: falha ao apagar imagens sem uso', error);
  }
}

// Imagens que estavam no registro antes e não estão mais.
export function removedImages(
  before: { mainImage?: string | null; images?: string[] | null },
  after: { mainImage?: string | null; images?: string[] | null },
): string[] {
  const now = new Set([after.mainImage, ...(after.images ?? [])].filter(Boolean));
  return [before.mainImage, ...(before.images ?? [])].filter(
    (u): u is string => !!u && !now.has(u),
  );
}
