# Cícero Joias — instruções do projeto

Site institucional + painel admin da joalheria Cícero Joias (`cicerojoias.com`).

## Stack
- Next.js 15 (App Router) · React 19.2 · TypeScript · Tailwind 3 · framer-motion
- PostgreSQL no Supabase via Prisma 5 (`import prisma, { executeWithRetry } from '@/lib/prisma'`)
- Clerk (login **só** no `/admin` e telas de entrar) · UploadThing (fotos do admin)
- Hospedagem: **Vercel** (push no `main` publica em produção)

## Comandos
- `npm run dev` (porta 3000) · `npm run build` (roda `prisma generate`) · `npm run lint` · `npm run db:check`
- Migração: editar `prisma/schema.prisma` → `prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --script` (o `migrate dev` falha fora do terminal interativo) → salvar em `prisma/migrations/<data>_<nome>/migration.sql` → ensaiar com `migrate deploy` no banco de testes → produção só com backup verificado e ok do dono. A Vercel **não** roda migração: código compatível vai antes. Nunca alterar o banco de produção à mão.
- Build de teste sem tocar no `.next` do dev: `NEXT_DIST_DIR=.next-after npx next build`; depois `git checkout -- tsconfig.json next-env.d.ts` (o build reescreve) e apague a pasta.

## Ambiente
- `.env` não é versionado; as variáveis "Secret" da Vercel não saem com `vercel env pull` (valores vêm dos painéis do Supabase, Clerk e UploadThing). Nunca exibir valores, só "ok/erro".
- `DATABASE_URL` (porta 6543) precisa de `?pgbouncer=true&connection_limit=1`; `DIRECT_URL` (5432) para migrações.
- Banco de testes local (cópia da produção): `.env.teste` + PostgreSQL portátil em `C:\Users\joalh\tools\pgsql17-full` (dados em `C:\Users\joalh\tools\pgdata-cicero-teste`, porta 5433). Backups em `Documentos\Cícero Joias - Backups`.

## Regras que importam neste projeto
- **Design system**: `docs/design-system-cj.md` é a fonte da verdade. Texto dourado em fundo claro = `text-action-strong` (vira #B1860E em títulos/ícones e #8F6A0C em texto pequeno); em fundo escuro = `text-action-on-dark`. `text-text-secondary` sem opacidade. Fontes do público: só Jost, Libre Caslon, Marcellus.
- **Imagens nunca no banco** (base64): fotos do admin vão para o UploadThing via `lib/upload-image.ts`; a API recusa base64. Imagens fixas em WebP no tamanho de exibição.
- **Prisma**: `select` só com os campos que a tela usa (a galeria inteira em listagens já deixou o portfólio com 12 MB); evitar N+1 (`include`/consultas em lote); usar o singleton de `lib/prisma.ts`.
- **Segurança**: o middleware libera todo `/api` — cada rota se protege. Rotas do admin usam `checkAdminAuth()` (checa o **papel** admin no servidor, não só a sessão). Erros públicos sem detalhes internos. Validar entrada com Zod.
- **Páginas públicas**: conteúdo no HTML (sem `loading.tsx` global nem guarda que bloqueie a renderização); `openGraph` de cada página repete `images`; datas com `formatDate()` de `lib/utils.ts` (fuso fixo, evita erro de hidratação).
- **Clerk** só dentro de `components/auth/clerk-scope.tsx` (admin e `(auth)`); não reintroduzir login no site público.
- Avisos do admin usam `toast` do **sonner** (o `<Toaster>` está no layout do admin e dos detalhes).

## Como trabalhar aqui
- Plano e histórico de otimização: `docs/PLANO-OTIMIZACAO.md` (medir antes e depois, um commit por item; receita de backup na Etapa 0).
- Novas peças no portfólio com foto de estúdio por IA: `docs/PORTFOLIO-COM-IA.md`.
- Vigilância: `lighthouserc.json` é o orçamento de peso/notas das páginas públicas; `.github/workflows/lighthouse.yml` mede a cada push na `main` (espera o deploy da Vercel), toda segunda e pelo botão. Se reprovar, corrigir ou ajustar o orçamento com justificativa. Speed Insights fica só na parte pública (`app/conditional-layout.tsx`).
- Onde trabalhar e worktrees do Orca: seguir a seção "Worktrees" das instruções globais (`~/.claude/CLAUDE.md`). Não ligar `node_modules` por junção.
- Antes de remover ou trocar algo, procurar quem usa. Conferir build e as páginas principais antes de publicar; depois do push, acompanhar o deploy até "Ready" e testar o site publicado.
