# Portfólio com fotos de estúdio feitas por IA

Fluxo para transformar fotos antigas de alianças (Drive, pasta PRODUTOS › ALIANÇAS) em itens do portfólio com fundo branco de estúdio, sem cadastrar à mão no admin. Fonte única deste processo: os outros arquivos só apontam para cá.

## Onde ficam os arquivos (fora do repositório)
`Documentos\Cícero Joias - Fotos IA\`
- `originais\`: fotos baixadas do Drive. É uma cópia, o acervo continua no Drive.
- `geradas\`: todas as versões criadas com IA. O `textos.json` diz qual foi aprovada.
- `referencias\estilo-portfolio.png`: foto do portfólio atual usada como referência de estilo. `heart-a.png` é um exemplo de zoom de detalhe.
- `textos.json`: um item por foto. Campos: `key`, `original`, `generated`, textos, `specifications`, SEO, `customCategory`, `confirmar` (lista do que falta o dono confirmar) e `nota` (opcional, aparece na página de aprovação).
- `prompts-lote1.md`: os prompts usados no 1º lote, inclusive os que falharam.
- `aprovacao\`: `template.html` e `montar.js`, que geram a página de aprovação.

## Passo a passo
1. **Baixar do Drive.**
   - O conector do Drive não lista imagens. Use o Chrome, que está logado na conta dona da pasta.
   - Baixe cada foto pela miniatura em alta: `https://drive.google.com/thumbnail?id=<ID>&sz=w2400`, via `fetch` com credenciais e download por blob.
   - O Chrome às vezes deixa o arquivo como `.tmp` em Downloads. Identifique pelo tamanho, copie e renomeie.
2. **Escolher** modelos que ainda não estão no portfólio e com a peça bem visível.
   - Monte uma folha de contato (miniaturas lado a lado) para comparar.
   - Pergunte ao dono o que a foto não mostra: material (ouro 18k, prata 990...), largura, interior e número de pedras.
   - **Nunca invente** esses dados.
3. **Gerar** com a skill `gerar-imagem` (~40 s cada). Se errar a geometria da peça (frisos, bordas, simetria), use o agy (seção "Gerar com o agy"). Passe como `-Referencia` a foto original (ou várias, se for a mesma peça em ângulos diferentes) e `referencias\estilo-portfolio.png`.
   - Modelo do prompt, em inglês:
     - *Recreate the exact pair of wedding rings from the first reference photo as a professional jewelry studio product photo.*
     - *Keep the rings IDENTICAL: <largura, perfil, acabamento, detalhes>. Do not add or remove details.*
     - *Only change the setting and lighting: seamless pure white to very light gray background, soft diffused studio lighting, subtle soft contact shadow.*
     - *Composition like the second reference photo (style only, do not copy its rings)… 1:1 square, no text, no watermark, no hands, no box, no props.*
   - Exemplos completos em `prompts-lote1.md`.
4. **Conferir** cada imagem ampliada, recortando o detalhe da original e da gerada lado a lado.
   - A IA erra a **contagem de pedras** e deixa pedras de tamanhos diferentes ou "derretidas". Conte na foto original antes.
   - **O que funciona:** editar a imagem quase certa passando só ela como referência e descrevendo a diferença exata. Por exemplo: *"it currently has 8 stones in rows of 2, 3, 2, 1. Make it exactly 10, in rows of 2, 3, 2, 2, 1… make every stone slightly smaller… Count carefully: 2+3+2+2+1 = 10"*.
   - **O que não funcionou:** gerar do zero com a contagem pedida, ou editar passando várias referências. Saíram 8 pedras ou pedras desiguais.
5. **Aprovar** numa página Artifact com original × criada e os textos.
   - De dentro do repositório: `node "C:/Users/joalh/Documentos/Cícero Joias - Fotos IA/aprovacao/montar.js"` gera `aprovacao\pagina.html`.
   - Publique com a ferramenta Artifact. O 1º lote ficou em https://claude.ai/artifact/1KhjLVreVLJ4tJELtsgxgp.
   - O dono responde "aprovo N" ou "refazer N: …".
6. **Cadastrar** com `scripts/portfolio-lote.mjs`.
   - O script converte para WebP 1024 px, envia ao UploadThing e cria os itens como **rascunho** (`isActive: false`).
   - Só o `isActive` decide se o item aparece no site.
   - Simulação por padrão; `--apply` grava. É idempotente: a foto é identificada por hash e o item é pulado se o título já existe.
   - `--only=39-2,33` cadastra só os itens com essas chaves do `textos.json` (útil quando o dono aprova parte do lote).
   - O `montar.js` aceita as mesmas chaves como argumentos para a página de aprovação.
   - Ensaio no banco de testes: `node --env-file=.env --env-file=.env.teste scripts/portfolio-lote.mjs "<pasta>" --apply`. O segundo arquivo troca o banco.
   - Produção:
     - Backup verificado antes, como descrito em `docs/PLANO-OTIMIZACAO.md` (Etapa 0).
     - Ok explícito do dono.
     - A trava do auto mode costuma bloquear o `--apply`. Nesse caso o dono roda o comando com `!`.
7. **Ativar** no admin, item por item.
   - A página `/portfolio` atualiza na hora quando o admin salva.
   - Itens gravados direto pelo script aparecem em até 10 minutos (`revalidate = 600`).

## Padrão dos textos (igual aos itens publicados)
- Título: `Aliança em <Material> – <largura>mm <perfil/acabamento> com <detalhe>`
- `description`: 1–2 frases objetivas. `detailedDescription`: 2 parágrafos.
- `specifications`: Material, Largura, Perfil Externo, Interior, Acabamento, Detalhe, Origem ("Oficina Própria Cícero Joias").
- `seoTitle` com até ~60 caracteres, `seoDescription` com até ~155, e 6–7 palavras-chave terminando em "cicero joias".
- Categoria `WEDDING_RINGS`. `customCategory`: "Alianças Trabalhadas" ou "Alianças Clássicas".

## Armadilhas já vistas
- **Item ativado não aparecia no site.**
  - Causa: o `/portfolio` era página estática.
  - Correção: `revalidatePath('/portfolio')` nas rotas do admin, mais `revalidate = 600`.
  - Rota nova do admin que mude o portfólio também precisa chamar `revalidatePath`.
- **"Exibindo 9 de 10" no site** é a paginação (9 por página), não um item sumido.
- **O antigo campo `status` (Rascunho/Publicado/Arquivado) não tinha efeito.** Foi removido em 2026-10-23. Não recriar.
- **Antes de afirmar algo sobre os dados** (quantos itens, o que aparece no admin), confira no banco ou na tela.

- **A foto original engana no acabamento e na cor.** Luz e filtro fazem polido espelhado parecer fosco escovado, e o ouro 16k (mais avermelhado) sair amarelo vivo. Pergunte ao dono o acabamento e o teor do ouro e descreva a cor no prompt. A correção funcionou editando a imagem quase certa (39(2) v1 → v2).
- **Contagem certa não basta, a geometria também precisa ser fiel.** No 2º lote o Codex errou em peças com frisos: na 33 os 3 frisos finos ficaram centralizados e com ângulo errado (na original ficam agrupados de um lado, com uma faixa larga do outro, inclinados pela curvatura), a parte de trás do anel saiu mais estreita que a frente, e na 18 uma borda espelhada ficou mais larga que a outra (devem ser simétricas e largas).
- **Antigravity (`agy`) gera imagem e acertou essas peças.** Veja "Gerar com o agy" abaixo.
- **Ajuste de cor:** para trocar só o tom/saturação, use `sharp(...).modulate({ saturation, hue })`. Não muda o desenho e é instantâneo (a 33 ficou em 70%, a 18 em +10%). Peça de ouro 16k é mais quente que a de 18k.

## Gerar com o agy (Antigravity)
- Não há modelo de imagem na lista de `agy models`: a imagem vem de um subagente interno `image-generator` (o modelo exato não aparece). Gera JPG 1024 px, aceita fotos de referência e leva 2 a 3 min.
- O sandbox não deixa gravar na pasta do projeto. A imagem fica em `~\.gemini\antigravity-cli\brain\<id-da-conversa>\` (o id vem no `--output-format stream-json`); copie de lá.
- Comando: `agy --sandbox --add-dir "<pasta Fotos IA>" --print-timeout 400s --output-format stream-json -p "Use o subagente image-generator para gerar UMA imagem, usando como referência <original> e o recorte <detalhe>. Prompt (em inglês): ... Responda só com o caminho do arquivo."`
- **O que funcionou:** passar a original + um recorte ampliado de uma peça, e escrever no prompt a geometria exata (largura relativa de cada faixa, de que lado ficam os frisos, bordas simétricas, "a parte de trás do anel tem a mesma largura da frente"). Rodar as peças em paralelo (`Start-Job`).
- Use o Codex (`gerar-imagem`) para ajustes rápidos de cor ou quando a peça é simples; use o agy quando o Codex errar a geometria.
- `pg_ctl start` dentro de um pipe (`| Select`) trava o comando, porque o servidor segura a saída. Inicie com `Start-Process -WindowStyle Hidden`.

## Histórico
- 2026-10-23: 1º lote com as fotos 16 (ouro 18k 9mm abaulada), 26 (ouro 18k 6mm, coração com 10 zircônias, aprovada a v4) e 35 (prata 990 6mm, coração vazado). Ensaiado no banco de testes, criado como rascunho e ativado pelo dono. Fotos reserva para o próximo lote: 39(2), 33 e 18.
- 2026-10-24: 2º lote, só a 39(2) aprovada (v2: ouro 16k, centro polido espelhado, bordas diamantadas, 6mm). Criada como rascunho na produção (id `cmvmqc9jw000012otwm29lqqy`), a ativar no admin. Backup: `Documentos\Cícero Joias - Backups\cicero-joias-public-20261024-antes-portfolio-lote2.dump` (restaurado numa cópia, 12 tabelas conferidas).
- 2026-10-24 (tarde): a 33 (ouro 16k, 5mm, 3 frisos, saturação 70%) e a 18 (ouro 18k, 10mm, unidade, +10% de saturação) foram refeitas pelo agy, aprovadas e criadas como rascunho na produção (ids `cmvmtmmw60000lndl2cck8qzs` e `cmvmtmnf20001lndlfh8zvgfw`), a ativar no admin. Backup: `cicero-joias-public-20261024-antes-portfolio-lote2b.dump` (restaurado, 12 tabelas conferidas). O portfólio passou a ter 13 itens. Fotos reserva do Drive para o próximo lote: 39 (a primeira), escolher outras.
- 2026-10-23: removido o campo `status`. Backup antes: `Documentos\Cícero Joias - Backups\cicero-joias-public-20261023-1800-antes-remover-status.dump`.
