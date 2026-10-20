# Plano de Otimização — Cícero Joias

> Criado em 20/10/2026. Documento vivo: atualizar o status de cada item conforme for resolvido.

## Método

1. **Investigar tudo** antes de mexer (feito em 20/10/2026, ver Diagnóstico).
2. **Definir etapas** por risco e impacto.
3. **Resolver ponto a ponto**, um commit por item ou grupo pequeno, medindo antes e depois.
4. Etapas que mexem em **banco de produção** ou **deploy** só avançam com aprovação explícita.

---

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
| D4 | As fotos do banco vão para o UploadThing (já configurado no projeto) ou outro storage? | Etapa 4 |

---

## Etapas

Cada item: `[ ]` pendente · `[~]` em andamento · `[x]` feito (com commit).

### Etapa 0 — Preparação
- [x] Diagnóstico completo e linha de base (20/10/2026)
- [x] I1 — `.env` local atualizado (20/10/2026): banco, Clerk, UploadThing e `CRON_SECRET` validados; build local passa. Atenção: a URL do Supabase na porta 6543 precisa de `?pgbouncer=true&connection_limit=1`, senão o build falha com "prepared statement already exists"
- [x] Backup do banco (20/10/2026): `pg_dump` 17.11 portátil em `C:\Users\joalh\tools\pgsql17`; backup do schema `public` (formato custom, 9,4 MB) em `C:\Users\joalh\Documentos\Cícero Joias - Backups\`. Contagem de registros conferida tabela a tabela. Banco: PostgreSQL 17.4, 28 MB (14 MB só em `portfolio_items`). **Refazer o backup imediatamente antes da Etapa 4.**
  - Restaurar (em um banco de testes, nunca direto em produção sem decidir): `pg_restore --no-owner --no-privileges --clean --if-exists -d "<URL>" "<arquivo>.dump"`
- [ ] Banco de testes separado (branch/cópia no Supabase) para não testar contra produção — recomendado antes da Etapa 4

> Nota (20/10/2026): as variáveis na Vercel são do tipo *Secret* e não podem ser baixadas com `vercel env pull` (vêm como `[SENSITIVE]`). Os valores do `.env` local precisam vir dos painéis: Supabase (`DATABASE_URL`, `DIRECT_URL`), Clerk (chaves e webhook secret), UploadThing (`UPLOADTHING_TOKEN`); `CRON_SECRET` local pode ser qualquer valor.

### Etapa 1 — Limpeza e organização · risco: nenhum para o site
- [x] O1 — `public/` de 40 MB → 7,5 MB. Apagados o `.zip` de cópias e o `hero.svg` duplicado; 92 arquivos sem uso (no código e no banco) movidos para `Documentos\Cícero Joias - Acervo de imagens`, com cópia conferida byte a byte
- [x] O2 — Imagem da home movida de `photosproducts/aliancas/hero.webp` para `assets/home/aliancas.webp`; regras obsoletas removidas do `.gitignore` e `.vercelignore`
- [x] O3 — `artifacts/`: `print/tools/` (177 MB) apagado e o resto movido para `Documentos\Cícero Joias - Impressos`; 2 worktrees antigos (62 MB, já incorporados ao `main`) removidos; mockup do Design System (jul/2026, já incorporado em `design-system-cj.md`) movido para `Documentos\Cícero Joias - Design System`
- [x] O4 — `rules/` e o guia de regras de IDE movidos para `docs/regras-ia/`; índice em `docs/README.md`; Gemini CLI removido do projeto (`GEMINI.md`) a pedido
- [x] O5 — 7 scripts avulsos removidos (duplicatas do portfólio e DNS do WSL); mantidos `check-database.ts`, `cleanup-orphaned-data.ts` e `optimize-images.mjs`
- Medido: `public/` 40 MB → 7,5 MB; pasta do projeto ~280 MB mais leve; build passando

### Etapa 2 — Ganhos rápidos nas páginas públicas · risco: baixo
- [ ] P1 — Remover/ajustar o `app/loading.tsx` global (corrige CLS de todas as páginas internas)
- [ ] P3 — Listagem do portfólio sem o campo `images`
- [ ] P7 — Converter `hero.svg` de 5 MB, redimensionar `sobre-nos-hero`, monograma em tamanho de ícone
- [ ] P8 — Corrigir o erro de hidratação das datas
- [ ] P11 — Resolver as 5 imagens inexistentes referenciadas no código
- [ ] P6 — Reduzir as fontes às famílias realmente usadas; Libre Caslon em woff2
- Medir: Lighthouse em todas as páginas

### Etapa 3 — JavaScript · risco: médio
- [ ] P5 — Clerk só onde precisa (conforme D2)
- [ ] P4 — Revisar componentes `'use client'` desnecessários e o uso de `framer-motion` (LazyMotion / CSS)
- [ ] P9 — Cachear a verificação de visibilidade de páginas
- [ ] P10 — Avaliar renderizar a pronta-entrega no servidor
- Medir: TBT e tamanho de JS por rota (`npm run analyze`)

### Etapa 4 — Fotos fora do banco · risco: alto (produção), requer aprovação
- [ ] Backup do banco
- [ ] P2 — Admin passa a enviar arquivo (UploadThing) em vez de base64 (D4)
- [ ] P2 — Script de migração: base64 → arquivo → URL, com modo simulação primeiro
- [ ] Reduzir o limite de 50 MB da API
- Medir: tamanho do HTML do portfólio e do banco

### Etapa 5 — Infraestrutura e dependências · risco: médio
- [ ] I2 — Remover configuração Netlify (D3) e unificar headers de segurança
- [ ] O6 — Remover dependências sem uso
- [ ] I3 — Avaliar React 19
- [ ] I4 — Atualizar browserslist

### Etapa 6 — Vigilância · risco: nenhum
- [ ] I5 — Ativar Vercel Speed Insights
- [ ] Orçamento de peso por página (ex.: HTML < 200 KB, JS < 300 KB, LCP < 2,5 s)
- [ ] Lighthouse automático a cada deploy

---

## Registro de progresso

| Data | Item | Commit | Antes → Depois |
|---|---|---|---|
| 20/10/2026 | Diagnóstico | — | Linha de base registrada |
| 20/10/2026 | Etapa 1 — limpeza e organização (O1–O5) | ver commit "chore: etapa 1" | `public/` 40 → 7,5 MB; −177 MB de ferramentas, −62 MB de worktrees; docs reunidas em `docs/`; 7 scripts avulsos e Gemini CLI removidos |
| 20/10/2026 | Backup do banco | — (fora do repositório) | Sem backup → backup íntegro de 9,4 MB, 12 tabelas conferidas |
| 20/10/2026 | I1 — ambiente local | — (`.env` não versionado) | Build local falhava → passa. JS inicial por página: 102 KB compartilhado + 177–224 KB por rota pública (sem contar o Clerk, carregado de `clerk.cicerojoias.com`) |
