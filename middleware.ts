import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicRoutes = [
  "/",
  "/sobre-nos",
  "/portfolio", 
  "/pronta-entrega",
  "/orcamento",
  "/api/webhook",
  "/sign-in",
  "/sign-up",
  "/acesso-negado", // Página de acesso negado
];

// Matcher para rotas que requerem role ADMIN
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  const pathName = req.nextUrl.pathname;
  
  // Verifica se a rota está na lista de rotas públicas
  if (publicRoutes.some(route => 
    pathName === route || 
    (route.endsWith('*') && pathName.startsWith(route.slice(0, -1)))
  )) {
    return;
  }

  // Se for rota administrativa, verificar autenticação primeiro
  if (isAdminRoute(req)) {
    // Proteger a rota - usuário deve estar autenticado
    auth.protect();
    
    // Para verificação de role, usaremos um componente/middleware separado
    // pois não podemos fazer calls async aqui facilmente
    // A verificação de role será feita no layout da área admin
  }

  // Proteger rotas não-públicas
  auth.protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};