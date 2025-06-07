---
id: plan-001
title: Your Plan Title
createdAt: 2025-06-06
author: Richard
status: draft
---

## 🧩 Scope

Planejar e executar o upgrade da aplicação Cicero Joias de Next.js 14 para Next.js 15, garantindo compatibilidade e correção de breaking changes.

## ✅ Functional Requirements

- Atualizar dependências Next.js para versão 15.
- Elevar React e React-DOM para versão 19.
- Implementar codemods oficiais do Next.js.
- Ajustar chamadas assíncronas de APIs de headers, cookies e draftMode.
- Atualizar configuração de `next.config.js` conforme novas chaves.
- Validar build e testes automatizados sem regressões.

## ⚙️ Non-Functional Requirements

- Performance: manter ou melhorar tempos de build e runtime.
- Security: garantir que não haja vulnerabilidades introduzidas no processo.
- Scalability: upgrade deve suportar escalonamento horizontal sem mudanças infra.
- Maintainability: código legível e bem documentado.

## 📚 Guidelines & Packages

- Seguir guia oficial de upgrade Next.js 15 (https://nextjs.org/docs/upgrading/version-15).
- Usar `npx @next/codemod@canary upgrade latest`.
- Pacotes principais:
  - next@^15.0.0 (MIT)
  - react@^19.0.0 (MIT)
  - eslint-config-next@^15.0.0 (MIT)

## 🔢 Execution Plan

2. Verificar versão do Node.js (≥18.x) e ajustar ambiente.
3. Executar codemod oficial:
   ```bash
   npx @next/codemod@canary upgrade latest
   ```
4. (Opcional) Atualização manual:
   ```bash
   npm install next@latest react@latest react-dom@latest eslint-config-next@latest
   npm install -D @types/react@latest @types/react-dom@latest
   ```
5. Ajustes de breaking changes:
   - Converter chamadas de `cookies()`, `headers()`, `draftMode()` para `await`.
   - Atualizar `runtime` para `edge` no `next.config.js`.
   - Configurar cache de `fetch` e `fetchCache`.
   - Renomear `bundlePagesExternals` e `serverComponentsExternalPackages`.
   - Remover/integrar Speed Insights e geolocalização de `NextRequest`.
6. Executar `npm run lint`, `npm run build` e `npm start`, corrigir erros.
7. Validar testes unitários e E2E.
8. Atualizar README, commit, abrir PR e deploy em staging.
