import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicRoutes = [
  "/",
  "/sobre-nos",
  "/portfolio", 
  "/pronta-entrega",
  "/orcamento",
  "/api/webhook/clerk",
  "/sign-in",
  "/sign-up",
  "/acesso-negado",
];

// Rotas que precisam de autenticação
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/dashboard(.*)',
  '/cliente(.*)',
]);

export default clerkMiddleware((auth, req) => {
  const pathName = req.nextUrl.pathname;
  
  // Permitir todas as rotas públicas
  if (publicRoutes.includes(pathName)) {
    return NextResponse.next();
  }

  // Permitir rotas de arquivos estáticos
  if (pathName.includes('.') || pathName.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Só proteger rotas específicas que realmente precisam de auth
  if (isProtectedRoute(req)) {
    auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};