import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Exporta o handler da rota para a API do Next.js
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
}); 