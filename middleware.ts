import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Rotas que sempre são públicas (nunca bloqueadas)
const alwaysPublicRoutes = [
  "/",
  "/api/webhook/clerk",
  "/sign-in",
  "/sign-up",
  "/acesso-negado",
];

// Páginas que podem ser controladas por visibilidade
const controllablePages = [
  "/sobre",
  "/portfolio", 
  "/pronta-entrega",
  "/orcamento",
];

// Rotas que precisam de autenticação
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/dashboard(.*)',
  '/cliente(.*)',
]);

function getPageSlugFromPath(pathname: string): string | null {
  if (pathname === '/sobre') return 'sobre';
  if (pathname === '/portfolio') return 'portfolio';
  if (pathname === '/pronta-entrega') return 'pronta-entrega';
  if (pathname === '/orcamento') return 'orcamento';
  return null;
}

export default clerkMiddleware(async (auth, req) => {
  const pathName = req.nextUrl.pathname;
  
  // Permitir todas as rotas sempre públicas
  if (alwaysPublicRoutes.includes(pathName)) {
    return NextResponse.next();
  }

  // Permitir rotas de arquivos estáticos e APIs
  if (pathName.includes('.') || pathName.startsWith('/_next') || pathName.startsWith('/api')) {
    return NextResponse.next();
  }

  // Proteger rotas administrativas primeiro
  if (isProtectedRoute(req)) {
    auth.protect();
  }

  // Verificar se é uma página controlável
  const pageSlug = getPageSlugFromPath(pathName);
  if (pageSlug && controllablePages.includes(pathName)) {
    // Por enquanto, vamos permitir todas as páginas e implementar a verificação no lado do cliente
    // Isso evita problemas de performance no middleware
    
    // TODO: Implementar verificação de visibilidade no componente da página
    // Para MVP, vamos usar uma abordagem mais simples
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};