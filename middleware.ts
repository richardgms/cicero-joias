import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Rotas públicas que não precisam de autenticação
  publicRoutes: [
    "/",
    "/sobre-nos",
    "/portfolio",
    "/pronta-entrega",
    "/orcamento",
    "/api/webhook",
  ],
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};