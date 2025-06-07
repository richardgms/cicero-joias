---
id: plan-004
title: Implementação de Autenticação com Clerk no Next.js
createdAt: 2025-06-07
author: Richard
status: draft
---

## 🧩 Escopo

Implementar autenticação completa na aplicação utilizando Clerk, uma solução moderna de autenticação e gerenciamento de usuários que se integra perfeitamente ao Next.js e oferece recursos avançados de segurança e personalização.

## ✅ Requisitos Funcionais

- Adicionar autenticação com email/senha
- Implementar autenticação social (Google, Facebook)
- Criar páginas personalizadas de login e cadastro
- Proteger rotas privadas da aplicação
- Implementar controle de acesso baseado em funções (RBAC)
- Exibir informações do usuário logado no cabeçalho
- Implementar funcionalidade de logout
- Sincronizar dados entre Clerk e o modelo Prisma existente
- Manter relacionamento User-Client intacto

## ⚙️ Requisitos Não-Funcionais

- UI/UX: Interface de usuário consistente com o design atual (Tailwind + Radix)
- Performance: Minimizar impacto no carregamento inicial
- Segurança: Garantir proteção adequada de rotas e dados
- Manutenção: Código legível e bem documentado

## 📚 Diretrizes e Pacotes

- Seguir documentação oficial do Clerk para Next.js App Router
- Pacotes a utilizar: 
  - @clerk/nextjs (MIT License)
  - zod (já instalado)
  - @prisma/client (já instalado)

## 🔢 Plano de Execução Revisado

1. **Preparação e Instalação**
   - Instalar o pacote Clerk: `npm install @clerk/nextjs`
   - Criar conta no Clerk Dashboard e configurar a aplicação
   - Definir variáveis de ambiente no arquivo .env.local:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   CLERK_WEBHOOK_SECRET=whsec_...
   ```
   - Configurar provedores de autenticação social (Google, Facebook)

2. **Criar Serviço de Sincronização**
   - Desenvolver serviço para sincronizar dados entre Clerk e Prisma
   - Mapear roles do Clerk para o modelo User existente

```typescript
// lib/services/user-sync.ts
import { prisma } from '@/lib/prisma';

export async function syncUserWithPrisma(clerkUser: any) {
  // Extrair dados do usuário Clerk
  const email = clerkUser.emailAddresses[0].emailAddress;
  const role = clerkUser.publicMetadata.role || 'CLIENT';
  
  // Sincronizar com o modelo User do Prisma
  const user = await prisma.user.upsert({
    where: { email },
    update: { role },
    create: {
      email,
      password: '', // Senha não necessária com Clerk
      role,
    },
  });
  
  // Verificar se já existe um Client associado
  const existingClient = await prisma.client.findUnique({
    where: { email },
  });
  
  // Criar Client se não existir e associar ao User
  if (!existingClient) {
    await prisma.client.create({
      data: {
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        email,
        userId: user.id,
      },
    });
  } else if (!existingClient.userId) {
    // Associar Client existente ao User se ainda não estiver associado
    await prisma.client.update({
      where: { id: existingClient.id },
      data: { userId: user.id },
    });
  }
  
  return user;
}
```

3. **Implementar Middleware do Clerk**
   - Criar arquivo `middleware.ts` na raiz do projeto
   - Configurar proteção de rotas públicas e privadas
   - Adicionar lógica de redirecionamento baseada em roles

```typescript
// middleware.ts
import { authMiddleware, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  // Rotas que não exigem autenticação
  publicRoutes: [
    "/",
    "/sobre",
    "/portfolio",
    "/pronta-entrega",
    "/orcamento",
    "/api/webhook/clerk",
    "/api/products(.*)",
    "/api/quote-requests(.*)",
  ],
  
  // Lógica personalizada após verificação de autenticação
  async afterAuth(auth, req, evt) {
    // Rota atual
    const path = req.nextUrl.pathname;
    
    // Se não estiver autenticado e tentar acessar rota protegida
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    // Se estiver autenticado
    if (auth.userId) {
      // Obter detalhes do usuário do Clerk
      const user = await clerkClient.users.getUser(auth.userId);
      const role = user.publicMetadata.role || "CLIENT";
      
      // Verificar permissões baseadas em role
      if (path.startsWith("/admin") && role !== "ADMIN") {
        // Redirecionar usuários não-admin para área de cliente
        return NextResponse.redirect(new URL("/cliente", req.url));
      }
    }
    
    return NextResponse.next();
  },
});

// Configurar quais rotas o middleware deve processar
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
```

4. **Implementar Webhook Handler**
   - Criar endpoint para receber eventos do Clerk
   - Processar eventos de usuário para sincronização com Prisma

```typescript
// app/api/webhook/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { syncUserWithPrisma } from "@/lib/services/user-sync";

export async function POST(req: Request) {
  // Verificar autenticidade do webhook
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Erro: cabeçalhos inválidos", { status: 400 });
  }
  
  // Obter o corpo da requisição
  const payload = await req.json();
  const body = JSON.stringify(payload);
  
  // Validar a assinatura
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
  
  try {
    const evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
    
    // Processar diferentes tipos de eventos
    const { type, data: eventData } = evt;
    
    if (type === "user.created" || type === "user.updated") {
      await syncUserWithPrisma(eventData);
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro no webhook:", err);
    return new Response("Erro ao verificar webhook", { status: 400 });
  }
}
```

5. **Adicionar ClerkProvider ao Layout**
   - Atualizar `app/layout.tsx` para incluir o ClerkProvider
   - Manter os componentes existentes e integrar com Clerk

```typescript
// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { QueryProvider } from "@/lib/query-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
        <body className="min-h-screen bg-background font-sans antialiased">
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

6. **Atualizar Componente Header**
   - Modificar o Header para exibir estado de autenticação e botões de ação
   - Implementar elementos de UI para login/logout

```typescript
// components/layout/header.tsx modificações
'use client';

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dentro do componente Header
// Substituir links de login por componentes do Clerk

// Versão para mobile
<div className="flex flex-col space-y-2 pt-2">
  <SignedIn>
    <Link
      href="/cliente"
      className="text-sm text-slate-600 hover:text-primary transition-colors"
      onClick={() => setMobileMenuOpen(false)}
    >
      Portal do Cliente
    </Link>
    <UserButton afterSignOutUrl="/" />
  </SignedIn>
  <SignedOut>
    <SignInButton mode="modal">
      <Button variant="link" className="text-sm text-slate-600 hover:text-primary">
        Entrar / Cadastrar
      </Button>
    </SignInButton>
  </SignedOut>
</div>

// Versão para desktop (adicionar em local apropriado)
<div className="hidden md:flex items-center ml-4">
  <SignedIn>
    <Link href="/cliente" className="mr-4 text-sm hover:text-primary">
      Portal do Cliente
    </Link>
    <UserButton afterSignOutUrl="/" />
  </SignedIn>
  <SignedOut>
    <SignInButton mode="modal">
      <Button>Entrar</Button>
    </SignInButton>
  </SignedOut>
</div>
```

7. **Criar Páginas de Autenticação Personalizadas**
   - Implementar páginas sign-in e sign-up com estilo personalizado
   - Adicionar textos em português e branding da Cícero Joias

```typescript
// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">
            Acesse sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Entre para acessar o Portal do Cliente da Cícero Joias
          </p>
        </div>
        
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              footerActionLink: "text-primary hover:text-primary/90",
            },
          }}
          routing="path"
          path="/sign-in"
          redirectUrl="/cliente"
        />
      </div>
    </div>
  );
}

// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">
            Crie sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Cadastre-se para acompanhar seus pedidos e orçamentos
          </p>
        </div>
        
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              footerActionLink: "text-primary hover:text-primary/90",
            },
          }}
          routing="path"
          path="/sign-up"
          redirectUrl="/cliente"
        />
      </div>
    </div>
  );
}
```

8. **Implementar Controle de Acesso**
   - Criar componente RoleGate para proteção baseada em funções
   - Atualizar páginas protegidas para usar esse componente

```typescript
// components/auth/role-gate.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { ReactNode } from "react";

type RoleGateProps = {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
};

export function RoleGate({ children, allowedRoles, fallback }: RoleGateProps) {
  const { user, isLoaded } = useUser();
  
  // Aguardar carregamento dos dados do usuário
  if (!isLoaded) {
    return null;
  }
  
  // Obter role do usuário das metadados públicos
  const role = user?.publicMetadata.role as string || "CLIENT";
  
  // Verificar se o usuário tem permissão
  if (!allowedRoles.includes(role)) {
    return fallback || null;
  }
  
  // Renderizar conteúdo se tiver permissão
  return <>{children}</>;
}

// Uso em páginas protegidas
// app/admin/page.tsx
import { RoleGate } from "@/components/auth/role-gate";
import { redirect } from "next/navigation";

export default function AdminPage() {
  return (
    <RoleGate 
      allowedRoles={["ADMIN"]} 
      fallback={redirect("/cliente")}
    >
      {/* Conteúdo da página de admin */}
    </RoleGate>
  );
}
```

9. **Implementar Acesso a Dados do Usuário**
   - Criar hooks personalizados para acessar dados do usuário
   - Integrar com as APIs existentes

```typescript
// hooks/use-auth.ts
"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  
  // Buscar dados complementares do Prisma se necessário
  const { data: clientData } = useQuery({
    queryKey: ["client", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) return null;
      
      const res = await fetch(`/api/clients?email=${encodeURIComponent(email)}`);
      if (!res.ok) return null;
      
      return res.json();
    },
    enabled: !!isSignedIn && !!user?.primaryEmailAddress?.emailAddress,
  });
  
  return {
    user,
    isLoaded,
    isSignedIn,
    clientData: clientData?.client,
    role: user?.publicMetadata.role as string || "CLIENT",
  };
}
```

10. **Testes e Integração**
    - Testar fluxos completos de autenticação
    - Verificar sincronização de dados entre Clerk e Prisma
    - Validar proteção de rotas e controle de acesso
    - Verificar UI em diferentes dispositivos

## 📋 Checklist de Validação

- [ ] Instalação e configuração do Clerk completa
- [ ] Middleware configurado corretamente
- [ ] Webhook handler funcionando e processando eventos
- [ ] Sincronização entre Clerk e Prisma operacional
- [ ] UI de autenticação personalizada e responsiva
- [ ] Proteção de rotas funcionando conforme esperado
- [ ] Controle de acesso baseado em funções implementado
- [ ] Persistência da sessão funcionando corretamente
- [ ] Redirecionamentos após login/logout funcionando
- [ ] Testes em diferentes navegadores e dispositivos