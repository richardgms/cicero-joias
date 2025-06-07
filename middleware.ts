import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicRoutes = createRouteMatcher([
  "/",
  "/sobre-nos",
  "/portfolio", 
  "/pronta-entrega",
  "/orcamento",
  "/api/webhook",
]);

export default clerkMiddleware((auth, req) => {
  if (!publicRoutes(req)) {
    // Proteger rotas não-públicas
    // auth.protect(); // Descomente para exigir autenticação
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};