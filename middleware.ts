import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicRoutes = [
  "/",
  "/sobre-nos",
  "/portfolio", 
  "/pronta-entrega",
  "/orcamento",
  "/api/webhook",
  "/sign-in",
  "/sign-up",
];

export default clerkMiddleware((auth, req) => {
  const pathName = req.nextUrl.pathname;
  
  // Verifica se a rota está na lista de rotas públicas
  if (publicRoutes.some(route => 
    pathName === route || 
    (route.endsWith('*') && pathName.startsWith(route.slice(0, -1)))
  )) {
    return;
  }
  
  // Proteger rotas não-públicas
  auth.protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};