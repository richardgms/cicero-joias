# Portfólio com fotos de estúdio feitas por IA

Fluxo para transformar fotos antigas de alianças (Drive, pasta PRODUTOS › ALIANÇAS) em itens do portfólio com fundo branco de estúdio, sem cadastrar à mão no admin.

## Onde ficam os arquivos (fora do repositório)
`Documentos\Cícero Joias - Fotos IA\`
- `originais\` — fotos baixadas do Drive (cópia; o Drive continua sendo o acervo)
- `geradas\` — imagens criadas com IA (todas as versões; o `textos.json` diz qual foi aprovada)
- `textos.json` — título, descrições, especificações e SEO de cada item

## Passo a passo
1. **Escolher** modelos que ainda não estão no portfólio e com a peça bem visível na foto.
2. **Gerar** com a skill `gerar-imagem` (Codex/ChatGPT), passando a foto original e uma foto do portfólio atual (estilo) como referência. O prompt pede para manter largura, espessura, perfil e detalhes, e mudar só fundo e luz.
3. **Conferir** cada imagem ampliada. A IA erra contagem de pedras e detalhes pequenos: contar na foto original e, se errar, editar a imagem quase certa pedindo só a correção ("hoje tem 8, deixe 10") — funciona melhor que gerar do zero.
4. **Aprovar** numa página Artifact com original × criada, zoom dos detalhes e os textos. Material, largura e pedras vêm do cliente, nunca inventados.
5. **Cadastrar** com `scripts/portfolio-lote.mjs`: converte para WebP 1024 px, envia ao UploadThing e cria os itens como **rascunho** (`isActive: false`; o que decide se aparece no site é só o `isActive`). Simulação por padrão; `--apply` grava. Idempotente (foto por hash, item pulado se o título já existe).
   - Ensaiar antes no banco de testes: `node --env-file=.env --env-file=.env.teste scripts/portfolio-lote.mjs "<pasta>" --apply`
   - Produção: backup verificado antes e ok explícito do dono.
6. **Ativar** no admin, item por item, depois de revisar. A página `/portfolio` atualiza na hora quando o admin salva; itens gravados direto pelo script aparecem em até 10 minutos.

## Padrão dos textos (igual aos itens publicados)
- Título: `Aliança em <Material> – <largura>mm <perfil/acabamento> com <detalhe>`
- `description`: 1–2 frases objetivas; `detailedDescription`: 2 parágrafos
- `specifications`: Material, Largura, Perfil Externo, Interior, Acabamento, Detalhe, Origem ("Oficina Própria Cícero Joias")
- `seoTitle` até ~60 caracteres, `seoDescription` até ~155, 6–7 palavras-chave terminando em "cicero joias"
- Categoria `WEDDING_RINGS`; `customCategory` "Alianças Trabalhadas" ou "Alianças Clássicas"

## Histórico
- 2026-10-23 — 1º lote: fotos 16 (ouro 18k 9mm abaulada), 26 (ouro 18k 6mm coração com 10 zircônias) e 35 (prata 990 6mm coração vazado). Ensaiado no banco de testes.
- 2026-10-23 — Removido o campo `status` (Rascunho/Publicado/Arquivado), que não tinha efeito: só o `isActive` controla o site. Backup antes: `Documentos\Cícero Joias - Backups\cicero-joias-public-20261023-1800-antes-remover-status.dump`.
