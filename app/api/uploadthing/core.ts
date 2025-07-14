import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
 
const f = createUploadthing();
 
// Lógica de autenticação (ex: quem pode fazer upload?)
const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new UploadThingError("Unauthorized");
  // Aqui poderíamos verificar se o usuário é admin
  // const user = await clerkClient.users.getUser(userId);
  // if (user.publicMetadata.role !== 'admin') throw new UploadThingError("Unauthorized");
  return { userId };
}
 
// Definição do nosso FileRouter
export const ourFileRouter = {
  // Definimos um "endpoint" de upload com um nome
  portfolioImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Definimos as permissões e o que pode ser feito com o arquivo
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      // Este código RODA NO SERVIDOR após o upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
 
      // !!! O que for retornado aqui será enviado de volta para o cliente
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter; 