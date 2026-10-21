# Plano de Otimização — Cícero Joias

> Criado em 20/10/2026. Documento vivo: atualizar o status de cada item conforme for resolvido.

## Método

1. **Investigar tudo** antes de mexer (feito em 20/10/2026, ver Diagnóstico).
2. **Definir etapas** por risco e impacto.
3. **Resolver ponto a ponto**, um commit por item ou grupo pequeno, medindo antes e depois.
4. Etapas que mexem em **banco de produção** ou **deploy** só avançam com aprovação explícita.

---

## ▶ Estado atual / passagem (20/10/2026, fim do dia)

O trabalho continua em outro agente (Claude Code no app Orca). Tudo commitado e publicado até `0146d01`.

**Onde trabalhar:** pasta principal (`Documentos\Workspace\cicero-joias`, branch `main`) no dia a dia; worktree do Orca só quando houver dois chats em paralelo no projeto (cada worktree completa ocupa ~1,5 GB e o disco C: está quase cheio). Numa worktree: trazer o que estiver na `main` sem push, copiar o `.env` da pasta principal (sem exibir), ligar `node_modules` à pasta principal por junção (`New-Item -ItemType Junction`) em vez de reinstalar, e publicar com `git push origin HEAD:main`. Fechar a worktree ao terminar.

**Concluído e em produção:** Etapas 0 (exceto nada pendente), 1, 2, 3, 4 e 5, mais correções de segurança S1–S6. Resultado no site publicado: desempenho 90–95 em todas as páginas públicas (Pronta-entrega 86, adiada), Acessibilidade/Boas práticas/SEO 100. Admin testado pelo usuário após React 19 e após o upload pelo UploadThing: tudo ok.

**Próximo: Etapa 6 — Vigilância** (ver lista na seção Etapas). Ainda não iniciada. Propor os passos ao usuário antes de mexer.

**Pendências opcionais (não bloqueiam):** P4 (rever `'use client'`/animações), P9 (cache da verificação de visibilidade), P10 (pronta-entrega no servidor — adiado: página oculta e sem produtos).

**Decisões tomadas:** D1 arquivos fora do repo em `Documentos\Cícero Joias - <tipo>` · D2 sem login de cliente (Clerk só em `/admin` e telas de entrar) · D3 só Vercel · D4 fotos no UploadThing · dourado em texto = opção D em dois tons (#B1860E títulos/ícones, #8F6A0C texto pequeno) · React 19.2.8 (linha estável; evitar versões com < 2 semanas).

**Cuidados para quem continuar:**
- Leia `CLAUDE.md` do projeto (stack, comandos, regras críticas) e `docs/design-system-cj.md` antes de mexer em interface.
- Build local: `NEXT_DIST_DIR=.next-after npx next build`; o build **reescreve `tsconfig.json` e `next-env.d.ts`** → `git checkout -- tsconfig.json next-env.d.ts` e apagar `.next-after`. Se aparecer erro de tipos de rota removida, apagar `.next/types`. Um erro interno ocasional do build some ao repetir.
- No Windows o build local não gera preload de fontes; conferir em produção.
- Medir antes e depois **no mesmo ambiente**; decidir pela mediana de algumas medições (uma medição isolada já enganou).
- Autonomia: um commit por item; push por etapa; push sem perguntar só em baixo risco já testado (texto, imagem, CSS, docs); perguntar antes de push com banco, segurança, login/permissões ou pagamento; nada no banco de produção sem ok explícito e backup verificado; nunca exibir valores do `.env` (só "ok/erro").
- Depois de todo push: acompanhar o deploy na Vercel até "Ready"/"Error" (`vercel ls cicero-joias --prod`) e testar as páginas/APIs principais no site publicado. Deploy de rollback conhecido: `cicero-joias-ou3ble9q1-cicerojoias-projects.vercel.app` (antes do React 19).
- Encerrar servidores locais (`next start`) e tarefas em segundo plano ao terminar cada teste.
- Página de acompanhamento no celular: https://claude.ai/artifact/Vg2iF4AgwNHCAdQLo14F4A — se o novo ambiente não tiver a ferramenta de Artifact, atualizar só este arquivo e avisar o usuário.

**Depois do plano:** sugerir ao usuário um chat novo para otimizar o **layout do painel admin para celular** (hoje feito para desktop).

## Linha de base (20/10/2026)

Lighthouse 12, celular (4G lento + CPU 4x mais lenta), site publicado em `cicerojoias.com`.

| Página | Performance | Acessibilidade | Boas práticas | SEO | LCP | TBT | CLS | Peso |
|---|---|---|---|---|---|---|---|---|
| `/` | 50 | 93 | 96 | 100 | 5,4 s | 3,1 s | 0 | 1,3 MB |
| `/sobre` | 13 | 96 | 100 | 100 | 8,8 s | 3,4 s | 1,26 | 1,3 MB |
| `/servicos` | 21 | 97 | 100 | 100 | 8,9 s | 3,4 s | 0,89 | 1,4 MB |
| `/pronta-entrega` | 21 | 90 | 96 | 100 | 9,0 s | 3,4 s | 0,89 | 1,4 MB |
| `/portfolio` | **1** | 90 | **0** | 100 | 71,6 s | 4,7 s | 0,89 | **14,3 MB** |

Metas: Performance ≥ 90, LCP < 2,5 s, TBT < 200 ms, CLS < 0,1, Acessibilidade ≥ 95.

### Após a Etapa 2 (20/10/2026, site publicado, mesmas condições)

| Página | Performance | Acessib. | Boas prát. | SEO | LCP | TBT | CLS | Peso |
|---|---|---|---|---|---|---|---|---|
| `/` | 50 → **83** | 93 | 100 | 100 | 5,4 → 4,5 s | 3,1 s → **130 ms** | 0 | 2,4 MB |
| `/sobre` | 13 → **74** | 96 | 100 | 100 | 8,8 → 5,8 s | 3,4 s → **190 ms** | 1,26 → **0** | 0,8 MB |
| `/servicos` | 21 → **75** | 97 | 100 | 100 | 8,9 → 6,1 s | 3,4 s → **100 ms** | 0,89 → **0** | 0,8 MB |
| `/pronta-entrega` | 21 → **72** | 100 | 100 | 100 | 9,0 → 6,0 s | 3,4 s → **160 ms** | 0,89 → **0** | 3,6 MB |
| `/portfolio` | 1 → **45** | 90 | — ¹ | 100 | 71,6 → 54,9 s | 4,7 s → **420 ms** | 0,89 → **0** | 10,1 MB |
| `/servicos/aliancas-personalizadas` | 49 ² → **70** | 90 | 100 | 100 | 14,6 s | 140 ms | 0 | 2,4 MB |

### Após a Etapa 4 — fotos fora do banco (20/10/2026, site publicado)

| Página | Início do plano → Etapa 2 → **Agora** | Boas prát. | LCP | TBT | CLS | Peso |
|---|---|---|---|---|---|---|
| `/` | 50 → 83 → **80** | 100 | 4,6 s | 180 ms | 0 | 2,4 → **0,8 MB** |
| `/sobre` | 13 → 74 → **82** | 100 | 4,5 s | 180 ms | 0 | 0,8 MB |
| `/servicos` | 21 → 75 → **90** | 100 | 3,5 s | 130 ms | 0 | 0,8 MB |
| `/pronta-entrega` | 21 → 72 → **86** | 100 | 3,6 s | 170 ms | 0 | 3,6 → **0,8 MB** |
| `/portfolio` | 1 → 45 → **83** | — → **100** | 54,9 → **4,5 s** | 130 ms | 0 | 10,1 → **0,9 MB** |
| `/servicos/aliancas-personalizadas` | 49 → 70 → **82** | 100 | 14,6 → **4,5 s** | 150 ms | 0,055 | 2,4 → **0,8 MB** |

HTML do portfólio 12,5 MB → 101 KB. Banco: fotos 9,3 MB → 0 (URLs). O que segura o LCP agora (~4,5 s no 4G simulado) é a imagem principal de cada página + JS do Clerk — Etapa 3.

### Após P5 — login só no admin (20/10/2026, site publicado)

| Página | Início → Etapa 4 → **Agora** | Acessib. | LCP | TBT | Peso |
|---|---|---|---|---|---|
| `/` | 50 → 80 → **90** | 93 | 3,3 s | 140 ms | **449 KB** |
| `/sobre` | 13 → 82 → **91** | 96 | 3,1 s | 50 ms | **423 KB** |
| `/servicos` | 21 → 90 → **91** | 97 | 3,2 s | 60 ms | **446 KB** |
| `/pronta-entrega` | 21 → 86 → **85** | 100 | 3,3 s | 140 ms | **447 KB** |
| `/portfolio` | 1 → 83 → **92** | 90 | 3,2 s | 130 ms | **536 KB** |
| `/servicos/aliancas-personalizadas` | 49 → 82 → **90** | 90 | 3,1 s | 190 ms | **449 KB** |

Falta para as metas: LCP < 2,5 s (imagem principal), Acessibilidade ≥ 95 em início/portfólio/alianças, pronta-entrega ≥ 90.

¹ Sem nota: o HTML de 12,5 MB é grande demais para o Lighthouse ler. ² Medido em 20/10 antes do P7.
Fontes pré-carregadas por página: 11 arquivos (~550 KB) → 4 (129 KB). O que ainda segura o LCP e o peso é a foto em base64 (P2): portfólio 10 MB, pronta-entrega 3,6 MB (1 produto), home e alianças 2,4 MB (destaques do portfólio via API).

---

## Diagnóstico

Severidade: 🔴 crítico · 🟠 alto · 🟡 médio · ⚪ baixo

### A. Desempenho

| ID | Sev. | Problema | Evidência | Efeito |
|---|---|---|---|---|
| P1 | 🔴 | `app/loading.tsx` global mostra uma tela "Carregando..." em tela cheia (`fixed inset-0 z-[9999]`) antes do conteúdo | O HTML de `/sobre` chega com o `<main>` contendo só o fallback; o conteúdo real vem depois no stream e substitui a tela | Rodapé "pula" ~5000 px (CLS 0,89 em todas as páginas internas) e LCP atrasa. Testado: **não** é causado por fontes |
| P2 | 🔴 | Fotos do portfólio e produtos salvas **no banco como base64** | Admin usa `reader.readAsDataURL` (portfolio new/edit, products new/edit, `image-upload.tsx`); API aceita até 50 MB; HTML de `/portfolio` = 12,9 MB com 17 imagens embutidas | Portfólio leva 70+ s no celular; banco e painel admin pesados; piora a cada foto nova |
| P3 | 🔴 | Listagem do portfólio envia `images` (galeria inteira) de cada item, mas só usa `mainImage` | `app/portfolio/page.tsx` seleciona `images: true`; `portfolio-listing.tsx` usa só `mainImage` | Multiplica o peso do item P2 |
| P4 | 🟠 | JavaScript pesado em todas as páginas | TBT 3,1–4,7 s; 109 arquivos `'use client'`; `framer-motion` em 21 arquivos; chunk da home leva 1,1 s para executar | Site trava ~3–4 s no celular antes de responder |
| P5 | 🟠 | Clerk (login) carregado em **todas** as páginas públicas | `ClerkProvider` em `app/providers.tsx`; header usa Clerk (`header.tsx`, `home-header.tsx`, `header-auth.tsx`); ~300 KB de JS de `clerk.cicerojoias.com` | Parte relevante do TBT. Depende da decisão D2 |
| P6 | 🟠 | 8 famílias de fontes no layout raiz | Inter, Playfair, Jost, Cormorant, Libre Caslon (TTF variável, 312 KB, sem compressão woff2), Marcellus, Philosopher, Montserrat | Download extra; várias parecem sobra de testes de estilo |
| P7 | 🟠 | Imagens estáticas grandes | `services/aliancas/hero.svg` = **5,3 MB** (foto embutida em SVG); `images/sobre-nos-hero.webp` = 1,3 MB; `circle-monogram.webp` = 191 KB usado como ícone/logo de 40 px | LCP alto em Serviços/Alianças e Sobre |
| P8 | 🟡 | Erro de hidratação React #418 no portfólio | Console de `/portfolio`; datas formatadas com `new Date(...)` em `portfolio-listing.tsx:313` e `portfolio-detail.tsx:126` (servidor em UTC × navegador em -03) | Nota 0 em Boas práticas; React re-renderiza o trecho |
| P9 | 🟡 | `checkPageVisibility` consulta o banco em toda página pública | `lib/page-visibility.ts` | Latência extra; ponto único de falha |
| P10 | ⚪ | Pronta-entrega carrega produtos pelo navegador (via API) | HTML de 52 KB sem produtos | Conteúdo aparece tarde e é pior para SEO. Verificar |
| P11 | 🟡 | 5 imagens referenciadas no código que não existem (404 em produção) | `components/home/home-data.ts` (`home/portfolio/case-01..03.webp`) e `components/ui/lazy-image.tsx` (`images/home-services.webp`, `images/jewelry-workshop-hero.webp`). Achado na Etapa 1; já faltavam antes da limpeza | Imagens quebradas ou requisições desperdiçadas |

### B. Organização do repositório

| ID | Sev. | Problema | Detalhe |
|---|---|---|---|
| O1 | 🟠 | `public/` com 40 MB, maior parte sem uso | `iloveimg-resized.zip` (12,5 MB, versionado no git); `Gemini_Generated_Image_*.png` (7 MB); `photosproducts/aliancas/hero.svg` (duplicata de 5,3 MB); pasta `AI/`; PNGs do ChatGPT; ~60 fotos `ALIANÇAS N.webp` / `ANEIS FORMATURA N.webp` sem referência no código |
| O2 | 🟠 | `.gitignore` contraditório | Ignora `public/assets/photosproducts/`, mas a home usa `photosproducts/aliancas/hero.webp` (funciona só porque foi versionado antes) |
| O3 | 🟡 | Raiz bagunçada (fora do git) | `artifacts/` 187 MB (`print/` = 180 MB); `.claude/worktrees` 62 MB; pasta `Design system Cícero Joias/` |
| O4 | 🟡 | Documentação espalhada | `GEMINI.md`, `docs/` e `rules/` separados, com regras de IDE misturadas a docs do projeto |
| O5 | 🟡 | `scripts/` com 10 scripts avulsos de correção pontual | `fix_duplicates.js`, `inspect_remaining.js`, `cleanup_portfolio.js`, `fix-wsl-dns.sh`… |
| O6 | 🟡 | Dependências instaladas sem uso | `@hookform/resolvers`, `@next/swc-wasm-nodejs`, `@radix-ui/react-{aspect-ratio,collapsible,context-menu,hover-card,menubar,navigation-menu,toggle-group}`, `date-fns`, `input-otp`, `react-resizable-panels`, `vaul` (confirmar cada uma antes de remover); `eslint-config-next` e `@types/node` em `dependencies` em vez de `devDependencies` |

### C. Infraestrutura e ambiente

| ID | Sev. | Problema | Detalhe |
|---|---|---|---|
| I1 | 🔴 | `.env` local desatualizado | Banco inacessível ("tenant/user not found"), faltam `UPLOADTHING_TOKEN` e `CRON_SECRET`. **Build local falha**, então não dá para testar com dados reais |
| I2 | 🟡 | Configuração de dois provedores | Site roda na **Vercel**, mas há `netlify.toml` + `@netlify/plugin-nextjs` (com Node 18, já sem suporte) e headers de segurança duplicados/divergentes |
| I3 | 🟡 | React 18.2 com Next 15.5 | Verificar compatibilidade e avaliar React 19 |
| I4 | ⚪ | `browserslist`/`caniuse-lite` desatualizados | Aviso no build |
| I5 | 🟡 | Sem monitoramento de desempenho | O portfólio chegou a 14 MB sem ninguém perceber |
| I6 | 🔴 ✅ | Senha do banco desatualizada na Vercel | Achado no deploy da Etapa 1 (20/10/2026): APIs públicas (portfólio, categorias, pronta-entrega) davam 500, admin sem banco e todo deploy falhava. **Resolvido** atualizando `DATABASE_URL`/`DIRECT_URL` na Vercel e refazendo o deploy |
| S1 | 🟠 ✅ | APIs expõem detalhes internos de erro | Respostas 500 das APIs públicas incluíam `details` com a mensagem do Prisma e uma dica sobre o Supabase. **Resolvido**: mensagem genérica, detalhe só no log do servidor |
| S2 | 🔴 ✅ | API do admin não verificava se o usuário é admin | `checkAdminAuth()` (usado pelas 11 rotas `/api/admin` e pelas páginas do admin que leem o banco) só checava se havia sessão; o role ADMIN era verificado apenas na tela (`AdminGuard`). Qualquer conta logada podia criar/editar/apagar portfólio e produtos, mudar visibilidade e listar usuários (com e-mails) chamando a API direto — e `/sign-up` é público. **Resolvido**: `checkAdminAuth()` agora exige `publicMetadata.role === 'admin'` (mesma regra do `AdminGuard`) |
| S3 | 🟠 ✅ | Proteção do middleware para `/admin` não funcionava | `auth.protect()` sem `await` (assíncrono no Clerk v6). **Resolvido**: visitante sem login vai para `/sign-in` antes de qualquer conteúdo do admin |
| S4 | 🟠 ✅ | Rota pública executava DDL no banco | `POST /api/create-activity-logs` rodava `CREATE TABLE` em produção sem autenticação (o middleware libera todo `/api`). Nenhum código a usava e a tabela já existe. **Resolvido**: rota removida |

---

## Decisões pendentes

| ID | Pergunta | Afeta |
|---|---|---|
| D1 | O que fazer com `artifacts/` (187 MB), `Design system Cícero Joias/` e as fotos de produto sem uso: apagar, mover para fora do projeto ou arquivar? | Etapa 1 |

**D1 — decidido em 20/10/2026 (parte `artifacts/`):** `artifacts/` são materiais impressos (cartões de garantia e orçamento, flyer A6), não o site. Executar na Etapa 1:
- Apagar `artifacts/print/tools/` (177 MB de Ghostscript/7-Zip, baixáveis de novo).
- Mover todo o resto de `artifacts/` para `C:\Users\joalh\Documentos\Cícero Joias - Impressos\`.
- Deixar `artifacts/` vazia/removida no projeto.
- Fotos sem uso: mover para `Documentos\Cícero Joias - Acervo de imagens` (decidido e feito).
- Pasta `Design system Cícero Joias/`: era o mockup de julho, já incorporado em `docs/design-system-cj.md`; movida para `Documentos\Cícero Joias - Design System` (feito).
| D2 | O site público precisa de login de cliente (favoritos, conta)? Se não, o Clerk pode carregar só no `/admin` | Etapa 3 |
| D3 | A hospedagem oficial é a Vercel? (remover Netlify) | Etapa 5 |
| D4 | ✅ UploadThing (decidido em 20/10/2026) | Etapa 4 |

**D2 — decidido em 20/10/2026:** site público **sem login de cliente**. Remover "Entrar" do menu público e a função de favoritos; Clerk carrega só em `/admin` e `/sign-in`. Sugerido desativar novos cadastros no painel do Clerk.
**D3 — decidido em 20/10/2026:** hospedagem **só Vercel**. Remover `netlify.toml` e `@netlify/plugin-nextjs`; unificar cabeçalhos de segurança no `next.config`.

**Depois do plano:** otimizar o layout do **painel admin para celular** (hoje feito para desktop) — em um chat novo, a pedido do usuário.

---

## Etapas

Cada item: `[ ]` pendente · `[~]` em andamento · `[x]` feito (com commit).

### Etapa 0 — Preparação
- [x] Diagnóstico completo e linha de base (20/10/2026)
- [x] I1 — `.env` local atualizado (20/10/2026): banco, Clerk, UploadThing e `CRON_SECRET` validados; build local passa. Atenção: a URL do Supabase na porta 6543 precisa de `?pgbouncer=true&connection_limit=1`, senão o build falha com "prepared statement already exists"
- [x] Backup do banco (20/10/2026): `pg_dump` 17.11 portátil em `C:\Users\joalh\tools\pgsql17`; backup do schema `public` (formato custom, 9,4 MB) em `C:\Users\joalh\Documentos\Cícero Joias - Backups\`. Contagem de registros conferida tabela a tabela. Banco: PostgreSQL 17.4, 28 MB (14 MB só em `portfolio_items`). **Refazer o backup imediatamente antes da Etapa 4.**
  - Restaurar (em um banco de testes, nunca direto em produção sem decidir): `pg_restore --no-owner --no-privileges --clean --if-exists -d "<URL>" "<arquivo>.dump"`
- [x] Banco de testes separado (20/10/2026): PostgreSQL 17.11 portátil local (`C:\Users\joalh\tools\pgsql17-full`, dados em `C:\Users\joalh\tools\pgdata-cicero-teste`, porta 5433, só localhost), banco `cicero_teste` restaurado do backup — o que também validou que o backup restaura. Conexão em `.env.teste` (ignorado pelo git). Iniciar: `pg_ctl -D C:\Users\joalh\tools\pgdata-cicero-teste -o "-p 5433" start`

> Nota (20/10/2026): as variáveis na Vercel são do tipo *Secret* e não podem ser baixadas com `vercel env pull` (vêm como `[SENSITIVE]`). Os valores do `.env` local precisam vir dos painéis: Supabase (`DATABASE_URL`, `DIRECT_URL`), Clerk (chaves e webhook secret), UploadThing (`UPLOADTHING_TOKEN`); `CRON_SECRET` local pode ser qualquer valor.

### Etapa 1 — Limpeza e organização · risco: nenhum para o site
- [x] O1 — `public/` de 40 MB → 7,5 MB. Apagados o `.zip` de cópias e o `hero.svg` duplicado; 92 arquivos sem uso (no código e no banco) movidos para `Documentos\Cícero Joias - Acervo de imagens`, com cópia conferida byte a byte
- [x] O2 — Imagem da home movida de `photosproducts/aliancas/hero.webp` para `assets/home/aliancas.webp`; regras obsoletas removidas do `.gitignore` e `.vercelignore`
- [x] O3 — `artifacts/`: `print/tools/` (177 MB) apagado e o resto movido para `Documentos\Cícero Joias - Impressos`; 2 worktrees antigos (62 MB, já incorporados ao `main`) removidos; mockup do Design System (jul/2026, já incorporado em `design-system-cj.md`) movido para `Documentos\Cícero Joias - Design System`
- [x] O4 — `rules/` e o guia de regras de IDE movidos para `docs/regras-ia/` (depois substituída pelo `CLAUDE.md` do projeto, 20/10/2026: regras genéricas/desatualizadas removidas, o que importava foi incorporado); índice em `docs/README.md`; Gemini CLI removido do projeto (`GEMINI.md`) a pedido
- [x] O5 — 7 scripts avulsos removidos (duplicatas do portfólio e DNS do WSL); mantidos `check-database.ts`, `cleanup-orphaned-data.ts` e `optimize-images.mjs`
- Medido: `public/` 40 MB → 7,5 MB; pasta do projeto ~280 MB mais leve; build passando

### Etapa 2 — Ganhos rápidos nas páginas públicas · risco: baixo
- [x] P1 — Removido o `app/loading.tsx` global e o `PageVisibilityGuard` passou a renderizar o conteúdo imediatamente (antes mostrava "Verificando disponibilidade..." em tela cheia e **o HTML de Sobre, Serviços e Pronta-entrega saía sem o conteúdo da página**). Páginas ocultas pelo admin continuam ocultas, mas o conteúdo aparece por um instante antes da troca
- [x] P3 — Campo `images` (galeria) removido da listagem do portfólio, da API pública do portfólio e da API da pronta-entrega (nenhuma listagem usava). O que sobra de peso é a `mainImage` em base64 — só some com o P2 (Etapa 4)
- [x] P7 — `services/aliancas/hero.svg` (5,3 MB, foto PNG embutida que o `next/image` não otimiza) → `hero.webp` 2560 px (112 KB); `sobre-nos-hero.webp` 6720 px → 2560 px (1,3 MB → 69 KB); monograma 6000 px → 512 px (191 KB → 10 KB) + `favicon-48.png` (2 KB) e `apple-touch-icon.png` (9 KB), que eram o arquivo de 6000 px; nova `og-image.jpg` 800×800 (24 KB). Originais guardados em `Documentos\Cícero Joias - Acervo de imagens\originais-alta-resolucao`. `public/` 7,5 MB → 1 MB
- [x] P7b — `og:image` corrigida: a home e o portfólio não tinham imagem de compartilhamento (o `openGraph` da página substituía o do layout) e os detalhes do portfólio/pronta-entrega usavam a foto em base64 (inválida e duplicada no `<head>`)
- [x] P8 — Novo `formatDate()` em `lib/utils.ts` (fuso fixo `America/Sao_Paulo`) aplicado no portfólio (listagem e detalhe) e no detalhe da pronta-entrega; faixa de preço da pronta-entrega com `toLocaleString('pt-BR')`. Erro #418 confirmado sumido com o servidor em UTC (como na Vercel). Obs.: a nota 0 em "Boas práticas" do portfólio continua, mas por outro motivo — o HTML de 12,5 MB é grande demais para o Lighthouse ler (auditoria `charset` falha e a categoria fica sem nota); resolve com o P2
- [x] P11 — As 5 imagens estavam em código morto (nunca executado, sem 404 para o visitante): removidos `portfolioCases` de `components/home/home-data.ts` e o componente não usado `components/ui/lazy-image.tsx`
- [x] Termos de uso e Política de privacidade: "Última atualização" fixada em 12/02/2026 (criação dos textos no git; o commit de 17/08 só mudou imports), em vez da data de cada deploy
- [x] P6 — Levantamento no navegador: o público vê só Jost (texto), Libre Caslon (títulos) e Marcellus (números); Inter/Playfair só no admin; Montserrat, Philosopher e Cormorant em lugar nenhum — mas as 8 eram pré-carregadas em toda página (~550 KB). Removidas Montserrat, Philosopher e Cormorant (classes antigas → `font-sans`/`font-heading`); Inter/Playfair com `preload: false`; Libre Caslon TTF → WOFF2 com subconjunto latino (295 → 89 KB, eixo de peso intacto, acentos conferidos). Visual idêntico (prints antes/depois). Obs.: o build local no Windows não gera os preloads de fonte (manifesto vazio) — conferir no deploy
- Medir: Lighthouse em todas as páginas

### Etapa 3 — JavaScript · risco: médio
- [x] P5 — Clerk só em `/admin` e nas telas de login (D2); menu público sem "Entrar"; isAdmin do menu via API; removidos LegacyHeader, header-auth, auth-provider e `/api/favorites` (commit 9fa8a98). Produção: 0 requisições ao Clerk nas páginas públicas, peso ~810 → ~450 KB, notas 90–92 em 5 de 6 páginas
- [x] S5 — API do admin sem `debug`/`X-Debug-Info`, erros no log do servidor, validação recusa base64, config morta de 50 MB removida (commit 3859ce3)
- [x] Acessibilidade (20/10/2026, commits feb45fb e ad2ec10): nomes acessíveis (estrelas, botões do portfólio, seletor, logo), ordem de títulos (portfólio, termos, privacidade), `<dl>` inválidas nos 6 heros de serviço, `<ol>` com `<li>` dentro de animação nos 5 serviços; **contraste aprovado pelo usuário**: texto dourado em fundo claro — primeiro `#896A24` (ficou com cara de latão/bronze), depois **opção D em dois tons**, escolhida pelo usuário: títulos e ícones `#B1860E` (WCAG 3:1) e texto pequeno `#8F6A0C` (4,5:1), variáveis `--ds-action-strong-heading`/`--ds-action-strong-text` (commit d2e6c63), cinzas `text-secondary/60–80` → cor cheia. Resultado: **100 de acessibilidade em todas as páginas públicas**
- [x] Diagnóstico de LCP: com fontes bloqueadas a nota iria a 98 e o LCP a 2,3 s — as 4 fontes pré-carregadas são o último freio, mas fazem parte da identidade visual; mantidas. Lição: uma medição isolada chegou a mostrar FCP de 2,6 s que não se repetiu — decidir pela mediana de várias medições
- [ ] P4 — Revisar componentes `'use client'` desnecessários e o uso de `framer-motion` (LazyMotion / CSS) — opcional: notas já 90–95
- [ ] P9 — Cachear a verificação de visibilidade de páginas — opcional
- [x] S1 — APIs públicas devolvem mensagem genérica em erro (sem `details` do Prisma)
- [x] S2/S3/S4 — Autorização do admin na API, `await auth.protect()` no middleware e remoção da rota de setup pública (achados durante o S1)
- [ ] S5 — Rotas do admin ainda devolvem `stack`/`debug` em erro (agora só para admins); limpar quando mexer nessas rotas na Etapa 4
- [ ] P10 — Renderizar a pronta-entrega no servidor (nota 86). **Adiado**: a página está oculta no menu e sem produtos; fazer quando ela voltar a ser usada

**Medição após a Etapa 3 (20/10/2026, site publicado):** desempenho Início 90, Sobre 93, Serviços 95, Pronta-entrega 86, Portfólio 92, Alianças 93, Consertos 92; Acessibilidade, Boas práticas e SEO **100 em todas**.
- Medir: TBT e tamanho de JS por rota (`npm run analyze`)

### Etapa 4 — Fotos fora do banco · risco: alto (produção), requer aprovação
D4 decidido (20/10/2026): **UploadThing** — conta ativa (0 arquivos, limite 2 GB), chave/rota/pacotes já no projeto; Supabase Storage exigiria configurar tudo do zero.
- [x] S6 — Rota de upload do UploadThing exige role admin (antes: qualquer logado)
- [x] P2 — Admin envia arquivo ao UploadThing (redimensionado no navegador, até 2400 px WebP) em vez de base64; exclusão/troca de foto apaga o arquivo sem uso (commit 2475173)
- [x] P2 — Script `scripts/migrate-images-to-uploadthing.mjs` (simulação por padrão, `--apply`, idempotente por hash). Ensaiado 2× no banco de testes: 11 fotos, 9,5 MB → 730 KB; 2ª cópia limpa reaproveitou as 11 sem reenviar; HTML do portfólio 12,5 MB → 96 KB
- [x] Produção (20/10/2026): push do código (d663a0b) → backup novo `cicero-joias-public-*-antes-migracao-fotos.dump` (8 MB, contagens conferidas) → simulação → `--apply` (10 fotos, todas reaproveitadas do ensaio, 0 base64 restante, 10/10 URLs abrindo) → arquivo órfão do produto "Teste" (apagado pelo admin) removido do UploadThing → redeploy → medição
- [x] Upload no admin validado pelo usuário no celular e no PC (20/10/2026). Primeiro teste revelou demora sem feedback: `awaitServerData` (padrão `true` na v7) fazia o navegador esperar a volta do servidor; corrigido com `awaitServerData: false`, progresso "Enviando X%", Salvar bloqueado durante o envio e limite de 90 s (commit 08204b6). Limpeza automática confirmada: fotos removidas na edição foram apagadas do UploadThing
- [ ] Reduzir o limite de 50 MB da API e limpar `stack`/`debug` das rotas do admin (S5)
- Medir: tamanho do HTML do portfólio e do banco

### Etapa 5 — Infraestrutura e dependências · risco: médio · ✅ concluída 20/10/2026
- [x] I2 — `netlify.toml` e `@netlify/plugin-nextjs` removidos (D3); `Permissions-Policy` e `Referrer-Policy: strict-origin-when-cross-origin` trazidos para o `next.config` (commits f6cf632, 6c9283e)
- [x] O6 — 21 componentes de `components/ui` sem uso removidos (modelos do shadcn) e 30 dependências sem uso desinstaladas; `typescript`/`@types/node` só em devDependencies. Pacotes diretos 63 → 44, `node_modules` −106 MB
- [x] I3 — React 18.2 → **19.2.8** (o App Router do Next 15 espera o 19), tipos 19.2, Radix atualizado, sonner 1 → 2; removidos `@ts-expect-error Server Component`; `AnimatedSection` sem eventos conflitantes (commit da1e847). Versões com menos de 2 semanas evitadas por cautela. Deploy anterior anotado para reverter: `cicero-joias-ou3ble9q1`
- [x] I4 — `caniuse-lite` atualizado (aviso do build sumiu)
- [x] Bug achado: `toast()` do sonner nunca aparecia (Toaster não montado) — avisos de erro do admin (visibilidade, saúde) e "Link copiado" dos detalhes. Montado no layout do admin e nos layouts dos detalhes

### Etapa 6 — Vigilância · risco: nenhum · ▶ PRÓXIMA
- [ ] I5 — Ativar Vercel Speed Insights (pacote `@vercel/speed-insights` + componente no layout; ativar no painel da Vercel — passo do usuário). Avaliar peso extra no site público
- [ ] Orçamento de peso por página. Referência atual: ~450 KB por página pública no celular; JS inicial compartilhado 102 KB; LCP ~3 s no 4G simulado
- [ ] Lighthouse automático a cada deploy (ex.: GitHub Action com Lighthouse CI contra o deploy, ou checagem agendada) — definir com o usuário onde receber o aviso

---

## Registro de progresso

| Data | Item | Commit | Antes → Depois |
|---|---|---|---|
| 20/10/2026 | Diagnóstico | — | Linha de base registrada |
| 20/10/2026 | S1–S4 — segurança | ver commit "fix(security)" | Usuário logado não-admin: acesso total à API do admin → bloqueado (403). `/admin` sem login: página servida → redireciona ao login. Rota pública com `CREATE TABLE` → removida. Erros públicos sem detalhes internos |
| 20/10/2026 | P6 — fontes | ver commit "perf(P6)" | 8 → 5 famílias declaradas; pré-carregadas no público: 11 arquivos (~550 KB) → esperado 4 arquivos (~180 KB), a confirmar após deploy. Libre Caslon 295 → 89 KB |
| 20/10/2026 | P7 — imagens fixas, ícones e og:image | ver commit "perf(P7)" | Serviços › Alianças: maior imagem 3,9 MB → 18 KB, peso 6,9 → 3,1 MB, desempenho 49 → 67 (o resto são 2,2 MB da API de destaques, P2). Sobre: 74. HTML do detalhe do portfólio 13,2 → 11,4 MB. `og:image` válida em todas as páginas |
| 20/10/2026 | P8 + P11 — datas e código morto | ver commit "fix(P8,P11)" | Erros no console do portfólio: 1 (React #418) → 0. −49 linhas de dados mortos e 1 componente não usado |
| 20/10/2026 | P3 — galeria fora das listagens | ver commit "perf(P3)" | HTML `/portfolio` 16,9 → 12,5 MB (−26%); `/api/public/portfolio` 10,6 → 6,2 MB (−41%). Home (destaques) e pronta-entrega sem mudança: o peso ali é só a `mainImage` (o produto "Teste" da pronta-entrega tem 1,9 MB de foto) |
| 20/10/2026 | P1 — tela de carregamento e guarda de visibilidade | ver commit "perf(P1)" | Local, Lighthouse celular: Sobre 15→48, Serviços 21→50, Pronta-entrega 24→46; CLS 0,89→0; LCP 7,9→5,2 s (Sobre). JS inicial: Serviços 186→141 KB, Sobre 194→156 KB. Conteúdo agora presente no HTML |
| 20/10/2026 | I6 — senha do banco na Vercel | — (config Vercel) | Deploy falhando e APIs 500 → deploy ok e APIs 200. Medido após deploy: HTML `/portfolio` 17,7 MB, `/api/public/portfolio` 11 MB, `/api/public/products/ready-delivery` 2 MB (1 produto) |
| 20/10/2026 | Etapa 1 — limpeza e organização (O1–O5) | ver commit "chore: etapa 1" | `public/` 40 → 7,5 MB; −177 MB de ferramentas, −62 MB de worktrees; docs reunidas em `docs/`; 7 scripts avulsos e Gemini CLI removidos |
| 20/10/2026 | Backup do banco | — (fora do repositório) | Sem backup → backup íntegro de 9,4 MB, 12 tabelas conferidas |
| 20/10/2026 | I1 — ambiente local | — (`.env` não versionado) | Build local falhava → passa. JS inicial por página: 102 KB compartilhado + 177–224 KB por rota pública (sem contar o Clerk, carregado de `clerk.cicerojoias.com`) |
