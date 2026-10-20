'use client';

import { generateReactHelpers } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

const { uploadFiles } = generateReactHelpers<OurFileRouter>();

// Lado maior máximo da foto enviada. As páginas exibem no máximo ~1200 px e o
// next/image gera as versões menores a partir deste original.
const MAX_SIDE = 2400;

function canvasToBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, 0.85));
}

// Redimensiona no próprio navegador e converte para WebP (ou JPEG, se o
// navegador não gerar WebP). Fotos de celular passam fácil do limite de 4 MB
// por arquivo do UploadThing; assim chegam com algumas centenas de KB.
async function prepareImage(file: File): Promise<File> {
  if (file.type === 'image/gif' || file.type === 'image/svg+xml') return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    let blob = await canvasToBlob(canvas, 'image/webp');
    if (!blob || blob.type !== 'image/webp') blob = await canvasToBlob(canvas, 'image/jpeg');
    if (!blob || blob.size >= file.size) return file;

    const extension = blob.type === 'image/webp' ? 'webp' : 'jpg';
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'imagem';
    return new File([blob], `${baseName}.${extension}`, { type: blob.type });
  } catch {
    return file;
  }
}

// Envia a imagem para o UploadThing e devolve a URL pública do arquivo.
// Substitui o antigo FileReader.readAsDataURL, que gravava a foto em base64 no banco.
export async function uploadImageFile(file: File): Promise<string> {
  const prepared = await prepareImage(file);
  const [uploaded] = await uploadFiles('portfolioImageUploader', { files: [prepared] });
  if (!uploaded?.ufsUrl) throw new Error('O upload não retornou uma URL');
  return uploaded.ufsUrl;
}
