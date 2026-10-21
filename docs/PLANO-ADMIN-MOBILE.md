# Plano — Painel admin no celular

> Início: 21/10/2026. Escopo: só o layout responsivo do `/admin` (menu, tabelas, formulários, fotos, modais, botões, textos). Fora do escopo: login/permissões (Clerk, `checkAdminAuth`), APIs, banco e site público. O site público não pode ficar mais pesado (`lighthouserc.json`).
>
> Página de acompanhamento: https://claude.ai/artifact/94ddxB1q4BQ5pjMQiYCoqj

## ▶ Estado atual

**21/10/2026 — etapas 1 a 5 concluídas e publicadas.** Testado no admin publicado (Chrome do PC já logado, a pedido do usuário, que estava no celular) em 360, 390, 768 px e desktop, etapa por etapa, antes de publicar a seguinte.

- Deploys da Vercel: todos "Ready". Vigilância (Lighthouse) do último push (`cb86c8a`): aprovada. Páginas públicas principais respondem 200.
- Peso do site público: CSS +560 bytes comprimido (17 067 → 17 627 B), porque o Tailwind gera um único CSS para o site todo. JavaScript público inalterado.
- Ajuste feito durante o teste: margens das listas menores no celular (os botões dos cartões ficavam apertados a 360 px) e cabeçalho das telas empilhado até 1024 px.
- Envio de várias fotos (3.5): testado no "Novo Projeto" com 3 fotos de uma vez; as 3 subiram para o UploadThing e apareceram. Saí sem salvar (o portfólio continua com 7 projetos). As 3 fotos de teste ficaram soltas no UploadThing (nomes `teste-*.webp`); podem ser apagadas pelo painel do UploadThing.
- Foto "quebrada" do projeto Banho de Ouro 18k em Pulseira: verificado que **não** está quebrada (é a pulseira de prata antes do banho). Nada foi removido.

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

## Etapas (aprovadas em 21/10/2026)

### Etapa 1 — Estrutura do painel (todas as telas) · risco baixo
- [x] 1.1 Abaixo de 1024 px o menu lateral vira gaveta aberta pelo ☰, com as 7 telas, "Ver site" e a conta. O conteúdo passa a usar a largura toda. Desktop igual ao de hoje.
- [x] 1.2 Cabeçalho do celular: "Admin" + ☰ de 44 px; espaçamento de 16 px no celular (24 px no desktop).
- [x] 1.3 Cabeçalho de cada tela: título em cima, botões embaixo e quebrando linha; a ação principal ("Novo …") sempre visível.

### Etapa 2 — Listas · risco baixo/médio
- [x] 2.1 Portfólio: no celular e tablet a tabela vira lista de cartões (foto, título, categoria, status, destaque) com botões Editar / Ver / Excluir de 44 px. Tabela continua no desktop.
- [x] 2.2 Produtos: mesmo padrão (sem o botão "Ver": a rota `/admin/products/[id]` do menu antigo não existe, dá 404).
- [x] 2.3 Categorias e Usuários: mesmo padrão.
- [x] 2.4 Cartões de números com 2 por linha no celular.

### Etapa 3 — Formulários e fotos · risco baixo (não muda o envio das fotos)
- [x] 3.1 Campos com letra de 16 px no celular, só no admin (sem efeito no site público).
- [x] 3.2 Teclado numérico em estoque e ordem. Preço e peso ficaram como estão: o teclado decimal brasileiro usa vírgula, que o campo numérico não aceita.
- [x] 3.3 Barra fixa "Salvar / Cancelar" no rodapé, no celular, nos 4 formulários.
- [x] 3.4 Fotos: botão remover de 44 px e sempre visível, miniaturas maiores; voltar (←) de 44 px; descrição detalhada mais alta.
- [x] 3.5 Escolher várias fotos adicionais de uma vez (mesmo envio de antes, uma após a outra). Commit separado; push só com ok.

### Etapa 4 — Modais e telas secundárias · risco baixo
- [x] 4.1 Modais (categoria, confirmar exclusão) com altura máxima e rolagem; botões empilhados.
- [x] 4.2 Health e Lixeira: ajustes finos.
- [x] 4.3 Setup-database removida (aprovado).

### Etapa 5 — Verificação final
- [x] Medir todas as telas em 360/390/768/1280 e conferir o peso do site público (Lighthouse). Falta só o seu teste no celular real.

## Antes × depois

| Medida | Antes | Depois |
|---|---|---|
| Área útil a 360 px | 89 px | 345 px |
| Área útil a 390 px | 119 px | 375 px |
| Área útil a 768 px | 512 px | 753 px |
| Navegar entre telas do admin no celular | não dá | gaveta pelo ☰ |
| Botões fora da tela — Portfólio a 360 px | 10 | 0 |
| Botões fora da tela — Categorias a 360 px | 11 | 0 |
| Letra dos campos | 14 px (zoom no iPhone) | 16 px |
| Botão remover foto | 24 px | 40 px |
| Salvar no formulário | só no fim da rolagem | barra fixa no rodapé |
| CSS do site público (comprimido) | 17 067 B | 17 627 B |

## Regras desta rodada
- Um commit por item (português); push por etapa. Push sem perguntar só para CSS/layout/texto/docs já testado; o item 3.5 (upload) pede ok.
- Build com `NEXT_DIST_DIR=.next-after`, depois `git checkout -- tsconfig.json next-env.d.ts` e apagar a pasta.
- Depois de cada push: deploy da Vercel até "Ready", ação "Vigilância (Lighthouse)" no GitHub e teste do site e do admin publicados.
