# Portfólio com fotos de estúdio feitas por IA

Fluxo para transformar fotos antigas de alianças (Drive, pasta PRODUTOS › ALIANÇAS) em itens do portfólio com fundo branco de estúdio, sem cadastrar à mão no admin. Fonte única deste processo: os outros arquivos só apontam para cá.

## Onde ficam os arquivos (fora do repositório)
`Documentos\Cícero Joias - Fotos IA\`
- `originais\`: fotos baixadas do Drive. É uma cópia, o acervo continua no Drive.
- `geradas\`: todas as versões criadas com IA. O `textos.json` diz qual foi aprovada.
- `referencias\estilo-portfolio.png`: foto do portfólio atual usada como referência de estilo. `heart-a.png` é um exemplo de zoom de detalhe.
- `textos.json`: um item por foto. Campos: `key`, `original`, `generated`, textos, `specifications`, SEO, `customCategory`, `confirmar` (lista do que falta o dono confirmar) e `nota` (opcional, aparece na página de aprovação).
- `prompts-lote1.md`: os prompts usados no 1º lote, inclusive os que falharam.
- `aprovacao\portfolio\gen.js`: gera a **página única das alianças** (`aliancas.html`): lote em andamento, reservas, peças no site e histórico. Link fixo: https://claude.ai/artifact/1NDUaFai6qAKam2e1NzvT6. **Nunca criar outra página:** a cada etapa, edite os dados no topo do `gen.js` (`ATUAL`, `RESERVAS`, `LOTES`), rode `node gen.js` e publique com `url` = esse link (em conversa nova, ler a página com `action: read` antes). Molde e versões do GPT entram em `ATUAL.pecas`/seção do lote atual, não em páginas separadas.
- `aprovacao\` (`montar.js`, `template.html`), `aprovacao\lote3\` e `aprovacao\lote4\`: geradores antigos dos lotes 1 a 4, só como referência de layout (as páginas deles foram apagadas em 2026-10-28 e o conteúdo útil foi para a página única).
- `drive\`: `drive-ids.json` (nome da foto no Drive → ID), miniaturas `cand-*.jpg` e folhas de contato. Assim não é preciso listar o Drive de novo.
- `blender\`: moldes 3D e scripts (ver "Molde no Blender").

## Passo a passo
1. **Baixar do Drive.**
   - O conector do Drive não lista imagens. Use o Chrome, que está logado na conta dona da pasta.
   - Baixe cada foto pela miniatura em alta: `https://drive.google.com/thumbnail?id=<ID>&sz=w2400`, via `fetch` com credenciais e download por blob.
   - O Chrome às vezes deixa o arquivo como `.tmp` em Downloads. Identifique pelo tamanho, copie e renomeie.
   - Faça o `fetch` numa aba aberta em `https://drive.google.com/robots.txt` (mesma origem, sem bloqueio). Na página de busca do Drive o `fetch` falha, e a captura de tela da extensão trava. Para achar os IDs, busque `ALIANÇAS <n>` no Drive e leia o atributo `data-id` dos itens; a busca não lista a pasta inteira de uma vez.
   - As fotos 26, 26(2) e 19 (1º arquivo) deram erro no `fetch` da miniatura em 2026-10-26 (as 26 já tinham sido baixadas no 1º lote).
2. **Escolher** modelos que ainda não estão no portfólio e com a peça bem visível.
   - Monte uma folha de contato (miniaturas lado a lado) para comparar.
   - Compare com os itens que já estão no site (páginas públicas) para não repetir modelo.
   - **Antes de gerar qualquer imagem, faça ao dono as perguntas da seção "Perguntar antes de criar".** Nunca invente esses dados.
3. **Gerar** com a skill `gerar-imagem` (~40 s cada). Se errar a geometria da peça (frisos, bordas, simetria), use o agy (seção "Gerar com o agy"). Passe como `-Referencia` a foto original (ou várias, se for a mesma peça em ângulos diferentes) e `referencias\estilo-portfolio.png`.
   - Modelo do prompt, em inglês:
     - *Recreate the exact pair of wedding rings from the first reference photo as a professional jewelry studio product photo.*
     - *Keep the rings IDENTICAL: <largura, perfil, acabamento, detalhes>. Do not add or remove details.*
     - *Only change the setting and lighting: seamless pure white to very light gray background, soft diffused studio lighting, subtle soft contact shadow.*
     - *Composition like the second reference photo (style only, do not copy its rings)… 1:1 square, no text, no watermark, no hands, no box, no props.*
   - Exemplos completos em `prompts-lote1.md`.
4. **Fidelidade à foto vem antes do prompt.** O dono pediu que a IA reproduza a proporção real da peça. Antes de gerar, meça na original: largura da faixa em relação ao diâmetro do anel e a porcentagem de cada acabamento (ex.: na foto 3, diamantada ~20% de cada lado e espelhada ~50% no centro). Escreva essas porcentagens no prompt e comece com "Above all, be faithful to the reference photo". Pedidos vagos ("mais estreita 20%") erram: saiu fina demais (12 v2); estimar a olho também errou (3 v1: diamantada larga demais).
5. **Conferir** cada imagem ampliada, recortando o detalhe da original e da gerada lado a lado.
   - A IA erra a **contagem de pedras** e deixa pedras de tamanhos diferentes ou "derretidas". Conte na foto original antes.
   - **O que funciona:** editar a imagem quase certa passando só ela como referência e descrevendo a diferença exata. Por exemplo: *"it currently has 8 stones in rows of 2, 3, 2, 1. Make it exactly 10, in rows of 2, 3, 2, 2, 1… make every stone slightly smaller… Count carefully: 2+3+2+2+1 = 10"*.
   - **O que não funcionou:** gerar do zero com a contagem pedida, ou editar passando várias referências. Saíram 8 pedras ou pedras desiguais.
6. **Aprovar** na página única das alianças (link e regra em "Onde ficam os arquivos"), com original × criada e os textos.
   - O dono responde "aprovo N" ou "refazer N: …".
7. **Cadastrar** com `scripts/portfolio-lote.mjs`.
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
8. **Ativar** no admin, item por item.
   - A página `/portfolio` atualiza na hora quando o admin salva.
   - Itens gravados direto pelo script aparecem em até 10 minutos (`revalidate = 600`).

## Fotos do Drive: o que já foi usado (atualize a cada lote)
| Foto | Status |
|---|---|
| 16, 26 e 26(2) (mesma peça), 35 | Criadas com IA (1º lote), no site |
| 39(2), 33, 18 | Criadas com IA (2º lote), no site |
| 12, 3, 21 | Criadas no Blender + GPT (3º lote); 12 e 3 ativas, 21 rascunho |
| 1(3) e ALIANÇA 1, 11, 5, 19 (2º arquivo), 4 | Já estavam no site, subidas à mão em fev/2026 (tabela no histórico) |
| 10 | Reserva: ouro, mesma linha da prata chanfrada (11) do site |
| 9, 36, 39 (1º arquivo) | Criadas no Blender + GPT (5º lote), aprovadas em 2026-10-29 (versão B); gravar com `--apply` e ativar no admin |
| 28, 15, 40 | 6º lote, escolhidas em 2026-10-29 (confirmar medidas). 28: ouro polido com friso central e 1 pedra; 15: prata diamantada com friso polido fora do centro (desenho parecido com a 9); 40: ouro diamantado com corte central polido (parecido com a 21) |
| 24, 20, 22(2) | Criadas no Blender + GPT (4º lote), rascunhos na produção desde 2026-10-28; a ativar no admin |
| 7 | Abaulada lisa, reserva |
| 34 | Abaulada lisa, reserva |
| 19 (1º arquivo) | Não baixou pela miniatura; olhar no Drive |

## Perguntar antes de criar (toda aliança)
Pergunte de uma vez, antes da primeira imagem, com a sua estimativa pela foto ao lado de cada item para o dono só confirmar:
1. **Material e teor:** prata 990, ouro 16k (mais avermelhado) ou 18k.
2. **Largura** da faixa em mm.
3. **Lateral do aro (espessura da borda):** a faixa reta entre o chanfro e o interior, que dá a sensação de peso. Três níveis:
   - **fina:** quase um filete (0,15 mm no Blender). É a da prata 12.
   - **média:** 0,35 mm.
   - **grossa:** 0,6 mm, a peça parece pesada.
4. **Perfil:** reto (flat), abaulado ou boleado. **Interior:** liso, abaulado (conforto) ou com gravação (a gravação não se reproduz).
5. **Bordas:** chanfradas (o corte inclinado entre a face e a lateral) ou retas, polidas ou diamantadas.
6. **Faixas e acabamentos:** quantas faixas, de que lado, e a proporção entre elas (ex.: na 3, três faixas iguais: diamantada, espelhada, diamantada). Frisos: quantos e onde.
7. **Pedras:** quantas e como estão distribuídas.
8. **O par:** as duas iguais ou diferentes (ex.: uma lisa e uma diamantada) e se a feminina é menor.
9. **Composição:** a de referência é a da 12 v1 da IA (uma em pé e a outra encostada, na frente e à direita).
10. **Cor:** se a cor da foto original é a real (luz e filtro enganam; ver "Armadilhas").

## Molde no Blender (quando a IA erra a geometria)
- A IA redesenha a peça a cada versão e erra largura, chanfro e espessura da borda. No Blender cada medida é um número e não muda sozinha. Ficou aprovado na 12 em 2026-10-26.
- Arquivos em `Documentos\Cícero Joias - Fotos IA\blender\`:
  - `anel12.py` monta a cena do zero: perfil, materiais (espelhado e diamantado), luz de estúdio clara, piso branco e câmera que enquadra o par.
  - `ajustar-perfil.py` muda só o perfil dentro de um `.blend` já posicionado (`--side` = lateral do aro, `--width`, `--wall`, `--chamfer`) e renderiza, sem desfazer a posição.
  - `render-blend.py` renderiza o `.blend` como está, depois que o dono ajustar à mão.
  - `checar-piso.py` confere se as alianças encostam no piso.
- Rodar sem abrir janela: `"C:\Program Files\Blender Foundation\Blender 5.1\blender.exe" -b <arquivo.blend> -P <script.py> -- <parâmetros>`.
- O dono pode abrir o `.blend` e ajustar a posição. Depois disso, nunca rode `anel12.py` por cima (ele refaz a cena): use `ajustar-perfil.py` ou `render-blend.py`, e faça cópia do `.blend` antes de alterar.
- Medidas da 12 aprovadas: faixa de 6 mm, parede de 0,95 mm, chanfro de 0,45 mm, lateral fina de 0,15 mm, diâmetro interno de 18,5 mm (masculina) e 16,5 mm (feminina).
- **Ajustes de medida ou posição: não renderize a cada rodada.** Monte e salve só o `.blend` (`anel3.py ... --norender 1`) e peça ao dono para abrir e conferir no Blender. Com o ok dele, renderize só a versão final. Renderizar cada tentativa gastou tempo dos dois (pedido em 2026-10-26).
- `anel3.py` serve para alianças flat de faixas (3 e 21): `--bands face,pol,face` (face = diamantada, pol = espelhada), `--rim` filete polido da borda (0 = sem), `--cut`/`--cutdepth` corte em V entre faixas, `--wall` parede, `--elev`/`--az` ângulo da câmera, `--bx`/`--by` posição da feminina. Medidas da 21 em teste: 6 mm, `--rim 0.55 --cut 0.55 --cutdepth 0.22`.
- **O dono aprova o render do Blender antes de ele ir ao ChatGPT.** Mostre o molde (original × referência de composição × Blender) e espere o ok. Só depois gere o acabamento.
- O que o Blender ainda não faz bem: o brilho de grão do diamantado e a sombra no piso. O plano é passar o render ao ChatGPT só para o acabamento, sem mexer em forma, posição e medidas.
- Para comparar, gere sempre a original, a versão anterior e a nova lado a lado na página de aprovação.

### 4º lote (24, 20 e 22(2)): medidas confirmadas pelo dono em 2026-10-27
Todas em ouro 16k, sem pedras, par igual com a feminina só menor (diâmetro interno 18,5 mm masculina e 16,5 mm feminina), lateral do aro fina, bordas polidas.
| Foto | Largura | Perfil | Detalhe |
|---|---|---|---|
| 24 | 3,5 mm | Abaulado, interior reto flat, sem chanfro | Sem faixas nem frisos |
| 20 | 5 mm | Abaulado, interior reto flat, sem chanfro | Sem faixas nem frisos |
| 22(2) | 4 mm (era 8 mm, alterado pelo dono em 2026-10-28) | Flat, interior liso reto polido | 1 friso fino em V perto de uma das bordas, nas duas |
- Script: `blender\anel-lote4.py` (copiado do `anel3.py`). `--shape dome --dome <altura do arco em mm>` faz o abaulado; `--shape flat --cutpos <fração da largura a partir da borda> --cut --cutdepth` faz o friso fora do centro. Moldes iniciais (a conferir pelo dono): 24 `--width 3.5 --wall 0.15 --dome 1.0`; 20 `--width 5 --wall 0.15 --dome 1.2`; 22(2) `--width 4 --wall 0.15 --cutpos 0.25 --cut 0.35 --cutdepth 0.12`. A altura do arco e a posição do friso foram estimadas pela foto.
- Lição: eu propus gerar a 24 e a 20 direto no GPT e o dono lembrou que o fluxo é Blender primeiro. Nas alianças, sempre começar pelo molde.
- **Aprovadas em 2026-10-28:** 24 versão A com saturação 80% (3,5 mm, arco 0,5 mm), 20 versão A com 80% (5 mm, arco 0,6 mm), 22(2) versão B em cor normal (4 mm, friso a 25% da borda). Medidas finais do molde da 24: arco de 0,5 mm (o primeiro de 1,0 mm ficou pesado e redondo demais).
- **Lição do arco:** use 48 a 64 segmentos no arco do abaulado para o render final. Com 16 (usados para o cálculo de posição ficar rápido) os reflexos saem com degraus serrilhados. Para montar o molde rápido use `N=16`; para renderizar, `N=64`.
- **Copiar o ajuste fino do dono para uma cena nova:** o dono às vezes move as **malhas filhas** dentro de `A`/`B` (deslocamento local), e não o objeto raiz. `copiar-cena-dump.py` grava as posições, o deslocamento das filhas e a lente num JSON, e `copiar-cena-aplicar.py` aplica numa cena regenerada. Sem isso o par sai mais afastado.
- **Manchas pretas na aliança = piso fora do lugar.** Em 2026-10-29 o "Plane" (piso) foi girado sem querer ao ajustar a 9 e atravessou as alianças. `blender\consertar-piso.py` volta o piso para (0,0,0) sem girar e, com `-- --save`, sobe cada aliança só o necessário para encostar no piso (sem mexer na câmera nem na posição). Ao ajustar no Blender, selecionar só `A`/`B` (ou as malhas filhas), nunca o piso.
- O arquivo `.blend` só vale se estiver **salvo** (asterisco no título = não salvo). Conferir a data do arquivo antes de renderizar.
- Cadastro: `Cícero Joias - Fotos IA\backup-e-simulacao-lote4.ps1` faz o backup da produção, prova que restaura e simula o cadastro (24, 20, 22). O auto mode bloqueia o acesso ao banco de produção, então o dono roda com `!`. Gravar (`--apply --only=24,20,22`) só depois do ok dele.

### 5º lote (9, 36 e 39): medidas confirmadas pelo dono em 2026-10-29
Todas em ouro 16k (9 e 39 com saturação 80%; 36 na cor normal), sem pedras, flat, interior liso e reto, bordas retas sem chanfro, feminina menor (diâmetro interno 18,5 / 16,5 mm).
| Foto | Largura | Lateral | Detalhe |
|---|---|---|---|
| 9 | 3,5 mm (a original é mais larga; o dono quis mais fina) | Fina | Toda diamantada até a borda; 1 friso polido em V um pouco à esquerda do centro |
| 36 | 5 mm | Média | Toda espelhada, sem friso; bordas polidas levemente arredondadas pelo polimento |
| 39 | 4,5 mm (o dono comparou 7, 6 e 4,5 mm e escolheu 4,5 em 2026-10-29) | Média | Centro espelhado largo, 2 frisos em V perto das bordas; feminina com as faixas das bordas diamantadas, masculina toda espelhada. Sem ranhuras atravessadas: as marcas horizontais da foto são reflexos da caixa |
- Script: `blender\anel-lote5.py` (cópia do `anel-lote4.py`) com `--face 1` (face externa diamantada, friso polido) e `--round <mm>` (canto externo arredondado). Moldes salvos sem render final: 9 `--width 3.5 --wall 0.15 --face 1 --cutpos 0.42 --cut 0.35 --cutdepth 0.12`; 36 `--width 5 --wall 0.35 --round 0.12` (o dono deitou as duas; desci alianças e câmera juntas 2,8 mm para encostarem no piso sem mudar o enquadramento); 39 `--width 7 --wall 0.35 --cutpos 0.15 --cutpos2 0.85 --cut 0.35 --cutdepth 0.15 --edgefaceb 1` (`--cutpos2` = 2º friso; `--edgefaceb 1` = faixas das pontas diamantadas só na feminina). Prompts do GPT em `prompts-lote5.md`.
- **Folga em volta (padrão a partir do 5º lote):** as alianças ocupam **72% do quadro** (medida da 36, enquadrada pelo dono). `blender\enquadrar.py` mede quanto as alianças ocupam e, com `-- --target 0.72 --save`, muda só a lente (zoom), sem mexer em posição nem ângulo. Fazer isso antes do render final; não pedir ao GPT para afastar. A 39 também ganhou versões de 6 mm (`aliancas-39-6mm.blend`) e 4,5 mm (`aliancas-39-4p5mm.blend`, mesmo comando com `--width 4.5`) para o dono comparar com a de 7 mm. O cadastro no site só acontece com as 3 aprovadas (pedido do dono). Prévias rápidas (700 px, 32 amostras) em `aliancas-9-previa.png` e `aliancas-36-previa.png`, para o dono conferir pelo celular.
- **GPT (2026-10-29):** renders finais (`render-blend.py`, 1600 px) das 3, com a 39 na posição e no afastamento que o dono ajustou (63% do quadro; respeitado). Prompts em `Fotos IAprompts-lote5.md`. Geradas em `geradasalianca-<n>-l5a/l5b.png` (A = só o render; B = render + original) e `-sat80` para 9 e 39. Todas saíram fiéis ao molde na 1ª tentativa; O dono aprovou as 3 na **versão B, cor normal** (sem os 80%). Textos no `textos.json` (chaves 9, 36, 39); ensaio no banco de testes ok (3 criadas, 2ª rodada pulou as 3, fotos webp abrindo). Backup e simulação: `Fotos IAackup-e-simulacao-lote5.ps1` (dump de 32 KB, restaurado, 12 tabelas conferidas, produção com 19 itens).

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
- **Aviso `[uploadthing][deprecated] file.url / file.appUrl` no `--apply` não é erro.** O upload e o cadastro funcionam. Só vira problema na v9 do UploadThing: aí trocar `scripts/portfolio-lote.mjs` para `file.ufsUrl` (conferir antes que a URL gravada bate com a dos itens já publicados).
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
- 2026-10-26: planejando o 3º lote. Alianças antigas (fev/2026), subidas à mão e já no site; não recriar. Pares conferidos pelo dono (foto do Drive, pasta ALIANÇAS):

  | No site | Foto do Drive |
  |---|---|
  | Ouro 16k – 8mm Flat com Frisos Laterais | 1(3) e "ALIANÇA 1" |
  | Prata 990 – Design Flat com Corte Central e Bordas Chanfradas | 11 |
  | Prata 990 com Fio de Ouro 18k – Detalhes Polidos | 5 |
  | Ouro 16k com Corte Central e Acabamento Diamantado | 19b (o 2º arquivo "ALIANÇAS 19") |
  | Ouro 18k – Boleada Diamantada com Cortes Laterais | 4 |

  3º lote: 12, 3 e 21 escolhidas. A IA sozinha não acertou a 12 (largura, chanfro, espessura da borda) nem a 3 (proporção das faixas); por isso nasceu o fluxo "Molde no Blender".
- 2026-10-26: a 12 (prata 990, 6mm, flat com bordas chanfradas, uma lisa e uma diamantada, interior liso e reto) foi feita no Blender + acabamento do GPT (versão A), aprovada e criada como rascunho na produção (id `cmvpjz3f5000020oikgy3ihko`), a ativar no admin. Backup: `cicero-joias-public-20261026-antes-portfolio-lote3.dump` (restaurado, 12 tabelas conferidas). Portfólio com 14 itens. Próximas: 3 e 21.
- 2026-10-26: a 3 (ouro 16k, 5mm, flat, interior liso e reto, 3 faixas iguais diamantada/espelhada/diamantada, 2 cortes em V, sem filete nas bordas, parede 0,35 mm) foi feita no Blender (`anel3.py`) + acabamento do GPT (versão A, cor normal), aprovada e criada como rascunho na produção (id `cmvppsx2x0000qemgcrthwi2b`), a ativar no admin. Backup: `cicero-joias-public-20261026-antes-portfolio-lote3b.dump` (restaurado, 12 tabelas conferidas). Portfólio com 15 itens. Próxima: 21.
- 2026-10-26: a 21 (ouro 18k, 6mm, flat, interior liso e reto, toda diamantada com corte central em V e filetes polidos nas bordas, filetes e corte de 0,55 mm, parede 0,35 mm) foi feita no Blender (`anel3.py --bands face,face`) + acabamento do GPT (versão A), aprovada e criada como rascunho na produção (id `cmvprfrcy000011jcel35koog`). Backup: `cicero-joias-public-20261026-antes-portfolio-lote3c.dump` (restaurado, 12 tabelas conferidas). O dono já ativou a 12 e a 3. Portfólio com 16 itens. 3º lote completo.
- 2026-10-28: 4º lote (24, 20 e 22(2), ouro 16k, Blender + GPT) aprovado e criado como rascunho na produção: 24 (3,5 mm abaulada, versão A 80%) id `cmvrkroxl00004lsbl00v7t9z`; 20 (5 mm abaulada, versão A 80%) id `cmvrkrpfz00014lsbkijgvysf`; 22(2) (4 mm flat com friso em V, versão B) id `cmvrkrpwr00024lsblj3w7ul0`. Backup: `cicero-joias-public-20261028-antes-portfolio-lote4.dump` (31,8 KB, restaurado, 12 tabelas conferidas). Portfólio com 19 itens. A ativar no admin. Reservas que sobram: 39 (1º arquivo), 9, 36, 34, 7, 10, 40.
