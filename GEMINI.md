# Contexto do Projeto: Cícero Joias

## Visão Geral
Sistema de gestão e website para a joalheria Cícero Joias.
O projeto unifica o site institucional e o sistema administrativo.

## Stack Tecnológica
- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + Shadcn/UI
- **Banco de Dados**: PostgreSQL (via Prisma ORM)
- **Autenticação**: Clerk (@clerk/nextjs)
- **Validação**: Zod
- **Formulários**: React Hook Form
- **Ícones**: Lucide React + Ícones personalizados (SVG)

## Estrutura de Pastas Importantes
- `/app`: Rotas da aplicação (App Router).
- `/components`: Componentes React.
  - `/components/ui`: Componentes Shadcn/UI.
  - `/components/icons`: Ícones personalizados.
- `/lib`: Utilitários e configurações (ex: `prisma.ts`).
- `/prisma`: Schema do banco de dados e seeds.
- `/public`: Arquivos estáticos.

## Comandos Principais
- `npm run dev`: Inicia servidor de desenvolvimento (porta 3000).
- `npm run build`: Build de produção.
- `npx prisma generate`: Gera o cliente Prisma (necessário após alterações no schema).
- `npx prisma migrate deploy`: Aplica migrações ao banco.
- `npm run db:check`: Verifica conexão com banco.

## Padrões e Convenções
- **Componentes**: Preferir componentes funcionais e Server Components por padrão no Next.js 15. Use `'use client'` apenas quando necessário (interatividade, hooks).
- **Estilos**: Utilizar classes utilitárias do Tailwind. Para componentes complexos, usar `cn()` (clsx + tailwind-merge).
- **Ícones**: Priorizar `lucide-react`. Se não houver, verificar `/components/icons`.
- **Formulários**: Usar `react-hook-form` com `zod` para validação.

## Notas Adicionais
- O projeto usa `next-themes` para tema claro/escuro.
- Upload de arquivos via `uploadthing`.
