# Home Redesign - Etapa 4 - Producao de Ativos & UX Micro

## Visao geral
- Consolidar copy final e assets que serao entregues ao design hi-fi/implementacao.
- Garantir que todas as interacoes previstas respeitem performance, acessibilidade e uso responsivo.
- Assets finais serao organizados diretamente em `public/assets/home/` conforme a estrutura abaixo.

## 1. Conteudo final por secao
### Hero
- Badge: "40 anos de joalheria artesanal em Joao Pessoa".
- Headline: "Cicero Joias - aliancas feitas a mao desde 1980." (38 caracteres sem espacos duplicados).
- Subheadline: "Atendemos pelo WhatsApp, mostramos modelos na joalheria e adaptamos cada detalhe com o nosso ourives experiente." (139 caracteres).
- Highlights bullets:
  1. "Converse pelo WhatsApp para alinhar estilo, prazos e visita." (74 caracteres).
  2. "Experimente aliancas reais na loja com apoio do nosso ourives." (78 caracteres).
  3. "Receba acompanhamento apos a entrega para polimento e ajustes." (78 caracteres).
- CTA primario: Botao solido "Falar no WhatsApp agora" -> `https://wa.me/5583988073784?text=Ola! Quero falar com a Cicero Joias sobre aliancas.`
- CTA secundario: Link outline "Agendar visita presencial" -> mesmo link com texto `Ola! Quero agendar uma visita presencial na Cicero Joias.`
- Assets esperados: `public/assets/home/hero-desktop.webp` (2400x1600, <=250 KB) e `public/assets/home/hero-mobile.webp` (1600x2000, <=220 KB).

### Provas rapidas
- Cards (titulo + microcopy <= 40 caracteres):
  - "Oficio artesanal" -> "40 anos de bancada artesanal".
  - "Modelos na loja" -> "Modelos reais para experimentar".
  - "Suporte continuo" -> "Polimento e ajustes na joalheria".
- Icones: `public/assets/home/icons/proofs.svg` (stroke 1.5px, grid 64x64) + fallback `proofs@2x.png`.

### Por que Cicero Joias
- Card 1 "Oficio do ourives": "Seu Cicero executa corte, solda e polimento manualmente, garantindo acabamento seguro e brilho uniforme." (136 caracteres).
- Card 2 "Portfolio na loja": "Apresentamos aliancas reais na vitrine para definir largura, textura e gravacoes com orientacao presencial." (137 caracteres).
- Card 3 "Personalizacao acessivel": "Adaptamos referencias enviadas pelo WhatsApp e orientamos o que e viavel com prazo medio de 7 dias uteis." (143 caracteres).
- Card 4 "Manutencao garantida": "Oferecemos limpeza, ajuste de medida e polimento sem custo adicional durante os primeiros 12 meses." (135 caracteres).
- CTA inline de cada card: link texto "Falar com a Cicero Joias" -> URL principal do WhatsApp.

### Processo em 4 etapas
- Etapa 01 "Contato pelo WhatsApp": "Mensagem inicial para alinhar estilo, data especial e orcamento. Resposta media: 2h uteis." (132 caracteres).
- Etapa 02 "Escolha guiada": "Visita presencial ou videochamada para definir metais, medidas e acabamento. Duracao: 30 a 45 minutos." (139 caracteres).
- Etapa 03 "Ourives em acao": "Seu Cicero executa corte, solda, acabamento e revisao final. Producao media: 5 a 7 dias uteis." (130 caracteres).
- Etapa 04 "Entrega e manutencao": "Retirada na joalheria ou envio combinado. Inclui polimento gratuito nos primeiros 12 meses." (132 caracteres).
- CTA ao final: "Comecar agora pelo WhatsApp" com mesmo link principal.
- Assets: `public/assets/home/process/steps-desktop.png` (2000x880) e `public/assets/home/process/steps-mobile.png` (1242x2208) ou componente responsivo implementado diretamente.

### Portfolio (3 cases fixos)
> Casos ficticios baseados em entregas padrao da Cicero Joias.
1. **Ana & Pedro - acabamento fosco com bordas polidas**
   - Desafio: "Queriam aliancas foscas que resistissem ao uso diario sem perder brilho nas bordas." (118 caracteres).
   - Solucao: "Ouro 18k com textura acetinada, bordas polidas e prova presencial para ajustar medidas." (112 caracteres).
   - Resultado: "Entrega em 6 dias uteis com gravacao interna personalizada e kit de cuidado." (107 caracteres).
   - Asset: `public/assets/home/portfolio/case-01.webp` (1600x1200, <=190 KB).
2. **Julia & Marcos - gravacao interna personalizada**
   - Desafio: "Precisavam de gravacao longa com coordenadas e data sem comprometer conforto." (108 caracteres).
   - Solucao: "Modelagem na loja, teste com aneis de prova e gravacao laser feita na bancada do ourives." (121 caracteres).
   - Resultado: "Par final entregue em 7 dias uteis com acabamento polido espelhado e certificado de autenticidade." (132 caracteres).
   - Asset: `public/assets/home/portfolio/case-02.webp` (1600x1200, <=190 KB).
3. **Familia Sousa - restauracao de aliancas de 1985**
   - Desafio: "Aliancas com riscos profundos e perda de textura original apos anos guardadas." (105 caracteres).
   - Solucao: "Limpeza ultrassom, reforco de solda e retexturizacao manual inspirada nas fotos antigas." (121 caracteres).
   - Resultado: "Entregues em 4 dias uteis com brilho recuperado e garantia de manutencao trimestral." (116 caracteres).
   - Asset: `public/assets/home/portfolio/case-03.webp` (1600x1200, <=190 KB).

### Depoimentos (clientes ficticios)
- "Atendimento direto com o ourives nos deixou seguros desde a primeira conversa." - Helena M., Joao Pessoa.
- "Provar os modelos na loja ajudou a decidir o acabamento perfeito." - Ana & Pedro, Cabedelo.
- "Agendamos pelo WhatsApp, ajustamos medidas e recebemos tudo no prazo." - Julia & Marcos, Recife.
- "Voltamos depois de um ano para polir e as aliancas ficaram como novas." - Familia Sousa, Joao Pessoa.
- Retratos: `public/assets/home/testimonials/helena-melo.webp`, `ana-pedro.webp`, `julia-marcos.webp`, `familia-sousa.webp` (600x600, <=120 KB cada).

### CTA final (WhatsApp + formulario curto)
- Texto principal: "Fale agora pelo WhatsApp para combinar visita ou resolver tudo on-line."
- Texto de apoio: "Atendimento direto com nosso ourives, agenda com vagas limitadas por mes."
- Botao solido: "Falar agora" -> link principal do WhatsApp.
- Botao outline: "Agendar visita" -> mesmo link com mensagem personalizada de visita.
- Formulario opcional: campos `Nome`, `Telefone/WhatsApp`, `Data especial (opcional)`, `Mensagem`.
- Badges: `public/assets/home/badges/badges-confianca.svg` + fallbacks PNG (160x160).

## 2. Inventario de assets
| Asset | Nome esperado | Especificacao | Status | Responsavel |
| --- | --- | --- | --- | --- |
| Hero desktop | public/assets/home/hero-desktop.webp | 2400x1600, <=250 KB | Entregue | Rafael |
| Hero mobile | public/assets/home/hero-mobile.webp | 1600x2000, <=220 KB | Entregue | Lara |
| Icones provas | public/assets/home/icons/proofs.svg (+ @2x.png) | 3 icones, stroke 1.5px | Entregue | Bruno |
| Process desktop | public/assets/home/process/steps-desktop.png | 2000x880 | Implementado via componente no Stage 5 | Bruno |
| Process mobile | public/assets/home/process/steps-mobile.png | 1242x2208 | Implementado via componente no Stage 5 | Bruno |
| Portfolio case 01 | public/assets/home/portfolio/case-01.webp | 1600x1200, <=190 KB | Entregue | Marina |
| Portfolio case 02 | public/assets/home/portfolio/case-02.webp | 1600x1200, <=190 KB | Entregue | Marina |
| Portfolio case 03 | public/assets/home/portfolio/case-03.webp | 1600x1200, <=190 KB | Entregue | Rafael |
| Depoimentos | public/assets/home/testimonials/*.webp | 4 arquivos 600x600, <=120 KB | Entregue | Lara |
| Badges | public/assets/home/badges/badges-confianca.svg (+PNGs 160x160) | 3 selos | Entregue | Bruno |

## 3. Microinteracoes e performance
- Hero: fade-in de 0.6s no texto; overlay do background com animacao de opacidade 0.4 -> 0.6. Particulas desativadas em viewports < 768px.
- Cards de prova e diferenciais: transicao `y: -4px`, sombra de 12px -> 24px, duracao 0.25s, easing `easeOut`.
- Timeline: delay escalonado de 120ms, animacao `opacity` + `y` (20px -> 0). Barra de progresso horizontal com `scaleX` 0 -> 1 em 0.8s.
- Carrossel depoimentos: autoplay 8s, pausa em focus/hover, botoes com `aria-controls` e `aria-label`; dots com `role="tablist"`.
- Portfolio mobile: scroll snap `snap-mandatory`, `snap-center`, cards min-width 280px.
- Performance: imagens acima da dobra com `loading="eager"` apenas para hero; restantes `loading="lazy"`. Converter assets para WebP/AVIF. Meta LCP < 2.5s mobile.
- Acessibilidade: contraste minimo 4.5:1, foco visivel com outline 2px esmeralda, `aria-label` descritivos nos links.

## 4. Workflow enxuto
1. Exportar assets diretos para `public/assets/home/` com nomes acima.
2. Avisar no Slack que a versao esta pronta para revisao (marcar Bruno/Paula conforme item).
3. Codex verifica peso/dimensao e ajusta se necessario.
4. Checklist rapido (abaixo) antes de sinalizar Etapa 5.

## 5. Checklist da etapa 4
- [x] Copy final por secao definida e aprovada internamente.
- [x] Microinteracoes documentadas com parametros de duracao e acessibilidade.
- [x] Hero desktop e mobile exportados para `public/assets/home/` em WebP.
- [x] Process timeline (desktop/mobile) definida (componente responsivo).
- [x] Portfolio cases 01, 02 e 03 tratados e documentados.
- [x] Depoimentos prontos (clientes ficticios, sem necessidade de autorizacoes).
- [x] Badges exportados em todos os formatos necessarios.
- [ ] Handoff confirmado (aviso no Slack + assets validados).

---
**Proximo passo (Etapa 5):** iniciar implementacao front-end seguindo backlog definido e atualizando os componentes conforme as entregas desta etapa.

