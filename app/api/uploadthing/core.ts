import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { checkAdminAuthStrict } from '@/lib/check-admin';
import { logger } from '@/lib/logger';

const f = createUploadthing();

// Só admins podem enviar arquivos (antes bastava estar logado)
const handleAuth = async () => {
  const result = await checkAdminAuthStrict();
  if ('error' in result) throw new UploadThingError("Unauthorized");
  return { userId: result.userId };
}

// Definição do nosso FileRouter
export const ourFileRouter = {
  // Definimos um "endpoint" de upload com um nome
  portfolioImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Definimos as permissões e o que pode ser feito com o arquivo
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      // Este código RODA NO SERVIDOR após o upload
      logger.debug("Upload complete for userId:", metadata.userId);
      logger.debug("file url", file.url);

      // !!! O que for retornado aqui será enviado de volta para o cliente
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 