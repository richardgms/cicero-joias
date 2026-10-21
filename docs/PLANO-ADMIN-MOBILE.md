# Plano — Painel admin no celular

> Início: 21/10/2026. Escopo: só o layout responsivo do `/admin` (menu, tabelas, formulários, fotos, modais, botões, textos). Fora do escopo: login/permissões (Clerk, `checkAdminAuth`), APIs, banco e site público. O site público não pode ficar mais pesado (`lighthouserc.json`).
>
> Página de acompanhamento: https://claude.ai/artifact/94ddxB1q4BQ5pjMQiYCoqj

## ▶ Estado atual

**Fase: diagnóstico pronto — aguardando aprovação das etapas.** Nada de código foi alterado.

## Como foi medido

- Admin publicado (`cicerojoias.com/admin`), logado no Chrome do usuário, só olhando (nenhum salvar/excluir).
- Cada tela aberta em molduras de 360, 390 e 768 px (o Chrome não diminui a janela abaixo de 500 px) e no desktop (1284 px).
- Para achar os problemas de cada tela, além do menu, o menu lateral foi escondido só na moldura (simulação; nada mudou no site).
- Testes das mudanças: servidor local com o **banco de testes** (porta 5433) e o Clerk de desenvolvimento. Nada no banco de produção.

## Diagnóstico

### Problemas gerais (todas as telas)

| # | Problema | 360 px | 390 px | 768 px |
|---|---|---|---|---|
| G1 | Menu lateral fixo de 256 px sempre aberto; o conteúdo começa depois dele | área útil **89 px** | **119 px** | 512 px |
| G2 | O botão ☰ do celular mostra só links do site público (Início, Serviços, Portfólio…), não as telas do admin | sem navegação | sem navegação | — |
| G3 | Cabeçalho de 73 px com área vazia; botão ☰ com 38 px (mínimo recomendado: 44 px) | | | |
| G4 | Espaçamento duplo (24 px da página + 24 px do cartão): em 360 px os campos ficam com ~250 px | | | |
| G5 | Campos com letra de 14 px: no iPhone a tela dá zoom sozinha ao tocar num campo | | | |

### Por tela (com o menu já corrigido na simulação)

| Tela | O que acontece no celular | Urgência |
|---|---|---|
| Dashboard | Funciona. Cartões de números um por linha (rolagem longa) | baixa |
| Portfólio (lista) | **Botão "Novo Projeto" fica fora da tela.** Tabela de 8 colunas: em 360 px aparecem 2 colunas e o menu ⋯ (Editar/Excluir) fica no fim de uma rolagem lateral; em 768 px a coluna de ações também some. 4 cartões de números ocupam uma tela inteira | **alta** |
| Novo / Editar projeto | Formulário em 1 coluna ok. Salvar só no fim (~2 500 px de rolagem). Descrição detalhada numa caixa de 4 linhas com rolagem interna. Botão de remover foto adicional com **24 px** (fácil apagar a foto errada). Voltar (←) com 36 px. Fotos só uma por vez | **alta** |
| Produtos (lista) | **"Novo Produto" cortado.** Mesma tabela de 8 colunas do portfólio. (Hoje há 0 produtos) | **alta** |
| Novo / Editar produto | Preço, estoque e peso sem teclado numérico adequado; letra 14 px; mesmos pontos de fotos e salvar | **alta** |
| Categorias | Tabela de 6 colunas: Editar/Excluir escondidos. Modal "Nova categoria" sem limite de altura: com o teclado aberto, o Salvar pode ficar inacessível | média |
| Usuários | Tabela de 4 colunas cortada (contato fora da tela) | baixa |
| Health | Tabela de variáveis passa da largura | baixa |
| Visibilidade | Funciona bem | — |
| Lixeira | Ok (vazia hoje) | baixa |
| Setup-database | Os dois botões chamam APIs que foram removidas na etapa de segurança: a tela não funciona mais (não está no menu) | decisão |

Mais urgente para o uso real (cadastrar produto/foto, editar portfólio): **G1 + G2** (bloqueiam tudo), depois **botão "Novo" e ações das listas**, depois **formulário e fotos**.

Visto de passagem, fora do escopo: a foto adicional do projeto "Banho de Ouro 18k em Pulseira de Prata 925" aparece como "imagem não encontrada" (é dado, não layout).

## Etapas propostas (aguardando aprovação)

### Etapa 1 — Estrutura do painel (todas as telas) · risco baixo
- [ ] 1.1 Abaixo de 1024 px o menu lateral vira gaveta aberta pelo ☰, com as 7 telas, "Ver site" e a conta. O conteúdo passa a usar a largura toda. Desktop igual ao de hoje.
- [ ] 1.2 Cabeçalho do celular: "Admin" + ☰ de 44 px; espaçamento de 16 px no celular (24 px no desktop).
- [ ] 1.3 Cabeçalho de cada tela: título em cima, botões embaixo e quebrando linha; a ação principal ("Novo …") sempre visível.

### Etapa 2 — Listas · risco baixo/médio
- [ ] 2.1 Portfólio: no celular e tablet a tabela vira lista de cartões (foto, título, categoria, status, destaque) com botões Editar / Ver / Excluir de 44 px. Tabela continua no desktop.
- [ ] 2.2 Produtos: mesmo padrão.
- [ ] 2.3 Categorias e Usuários: mesmo padrão.
- [ ] 2.4 Cartões de números com 2 por linha no celular.

### Etapa 3 — Formulários e fotos · risco baixo (não muda o envio das fotos)
- [ ] 3.1 Campos com letra de 16 px no celular, só no admin (sem efeito no site público).
- [ ] 3.2 Teclado numérico em preço, estoque, peso e ordem.
- [ ] 3.3 Barra fixa "Salvar / Cancelar" no rodapé, no celular, nos 4 formulários.
- [ ] 3.4 Fotos: botão remover de 44 px e sempre visível, miniaturas maiores; voltar (←) de 44 px; descrição detalhada mais alta.
- [ ] 3.5 (opcional — mexe no fluxo de upload, pede ok separado) escolher várias fotos de uma vez.

### Etapa 4 — Modais e telas secundárias · risco baixo
- [ ] 4.1 Modais (categoria, confirmar exclusão) com altura máxima e rolagem; botões empilhados.
- [ ] 4.2 Health e Lixeira: ajustes finos.
- [ ] 4.3 Setup-database: decidir (recomendação: remover a tela morta).

### Etapa 5 — Verificação final
- [ ] Medir todas as telas em 360/390/768/1280, conferir o peso do site público (Lighthouse) e testar no celular real.

## Antes × depois

| Medida | Antes | Depois |
|---|---|---|
| Área útil a 360 px | 89 px | — |
| Área útil a 390 px | 119 px | — |
| Área útil a 768 px | 512 px | — |
| Navegar entre telas do admin no celular | não dá | — |
| Botões fora da tela — Portfólio a 360 px | 10 | — |
| Botões fora da tela — Categorias a 360 px | 11 | — |
| Letra dos campos | 14 px (zoom no iPhone) | — |
| Botão remover foto | 24 px | — |

## Regras desta rodada
- Um commit por item (português); push por etapa. Push sem perguntar só para CSS/layout/texto/docs já testado; o item 3.5 (upload) pede ok.
- Build com `NEXT_DIST_DIR=.next-after`, depois `git checkout -- tsconfig.json next-env.d.ts` e apagar a pasta.
- Depois de cada push: deploy da Vercel até "Ready", ação "Vigilância (Lighthouse)" no GitHub e teste do site e do admin publicados.
