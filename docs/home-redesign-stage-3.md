# Home Redesign - Etapa 3 ? Arquitetura & Planejamento Visual

## Vis?o geral
- Garantir que a experi?ncia da home leve ao WhatsApp com clareza desde a dobra inicial at? o CTA final.
- Refor?ar o of?cio artesanal, a curadoria presencial e o suporte cont?nuo como diferenciais competitivos.
- Preparar a transicao para o design hi-fi entregando fluxos e inventario de conteudo.

## 1. Fluxo low-fi (desktop)
| Se??o | Objetivo UX | Composi??o visual | Conte?do chave | CTA prim?rio |
| --- | --- | --- | --- | --- |
| Hero | Declarar proposta de valor e iniciar conversa via WhatsApp. | Fundo em tom neutro com foto do ourives na bancada, headline ? esquerda, badge "40 anos", CTA s?lido, link secund?rio outline. | Headline: "C?cero Joias ? alian?as feitas ? m?o desde 1980". Sub: atendimento pelo WhatsApp, modelos na loja, execu??o pelo ourives. Badge: "40 anos de joalheria artesanal em Jo?o Pessoa". | Bot?o "Falar no WhatsApp agora" (wa.me/5583991180251). |
| Provas r?pidas | Validar confian?a em 5 segundos ap?s a dobra. | Grid 3 colunas com cards horizontais, ?cone Lucide + texto. Plano de fundo marfim claro. | "40 anos de of?cio", "Modelos para experimentar", "Polimento e ajustes na joalheria". | CTA n?o aplic?vel (cards est?ticos). |
| Por que C?cero Joias | Explicar diferenciais em profundidade. | Grid 2x2 com cards modulares (?cone, t?tulo, texto, bullet). Suporte a layout responsivo 1x4 no mobile. | Of?cio do ourives, Portf?lio na loja, Personaliza??o acess?vel, Manuten??o garantida. | Link texto "Chamar no WhatsApp" dentro de cada card (mesmo link principal). |
| Processo em 4 etapas | Remover fric??o mostrando simplicidade. | Timeline horizontal com ?cones numerados; no mobile vira stepper vertical. | 1) Contato WhatsApp ? 2) Escolha guiada ? 3) Ourives em a??o ? 4) Entrega e manuten??o. | Bot?o s?lido "Come?ar agora pelo WhatsApp" abaixo da timeline. |
| Portf?lio | Mostrar resultado real antes de pedir contato. | Card destaque (ocupando 2 colunas) + 2 cards menores. Espa?o para foto com m?scara org?nica. | Estrutura texto "Desafio ? Solu??o ? Resultado" com CTA textual para WhatsApp. | Bot?o outline: "Quero ver mais modelos no WhatsApp". |
| Depoimentos | Prova social curta e humanizada. | Carrossel com 3-4 cards, fundo branco, foto pequena opcional, texto at? 140 caracteres. | Citar atendimento, confian?a e manuten??o. Ex.: "Atendimento direto com o ourives fez toda a diferen?a". | Link texto "Falar com a joalheria no WhatsApp" na navega??o do carrossel. |
| FAQ r?pido | Antecipar d?vidas cr?ticas. | Accordion de 3 perguntas m?ximo. | Prazos, personaliza??o, manuten??o. | CTA dentro da resposta final convidando para o WhatsApp. |
| CTA final | Refor?ar canal ?nico e senso de urg?ncia suave. | Banner com fundo verde-esmeralda, foto em sobreposi??o leve, badges de confian?a. | Texto: "Fale agora pelo WhatsApp para combinar visita ou resolver on-line" + badges "Atendimento direto com ourives" / "Manuten??o garantida". | Bot?o s?lido "Falar agora" + bot?o outline "Agendar visita" (mesmo link). |

## 2. Ajustes mobile-first
- Her?i empilha elementos: badge acima da headline, imagem passa para plano de fundo blur com m?scara radial.
- Cards de prova e diferenciais viram carrossel horizontal com snapping; manter setas discretas.
- Timeline vira lista vertical com linhas conectadas; CTA principal fixo ap?s scroll do bloco (utilizar sticky a partir de 320px).
- Portf?lio alterna cards em carrossel; garantir legibilidade do texto m?ximo 80 caracteres por linha.
- Carrossel de depoimentos usa auto-play suave (8 s) com controle manual acess?vel.
- Banner final ocupa 2 blocos de altura, CTA s?lido ocupa largura total, outline vira link abaixo.

## 3. Guia de componentes e estilos
- Grid: 12 colunas (1120px max width), gutter 24px desktop, 16px mobile; componentes responsivos j? existentes em `components/home`.
- Tipografia: Playfair Display para headlines (36-48px desktop / 28-32px mobile); Inter/General Sans para corpo (16-18px desktop / 15-16px mobile).
- Paleta: Esmeralda (#1C4532), Ouro (#CF9A24), Marfim (#F9F6EE), Grafite (#343434). Usar gradientes suaves apenas nos CTAs principais.
- Componentes reutilizados: `HeroSection`, `FeaturesSection`, `ProcessTimeline`, `PortfolioGrid`, `TestimonialsCarousel`, `FaqAccordion`, `WhatsAppBanner` (novos arquivos ser?o abertos conforme implementa??o).
- Micro-intera??es: anima??o fade-up 120ms + delay incremental de 60ms em cada bloco; hover de bot?es eleva sombra 15%.

## 4. Invent?rio de assets
| Item | Descri??o | Formato | Status | Respons?vel |
| --- | --- | --- | --- | --- |
| hero-cicero-bench.jpg | Foto do ourives lapidando alian?as na bancada (plano m?dio). | JPG 2400x1600 | Agendado para captura 04/04 | Fot?grafo interno |
| hero-couple-store.jpg | Casal experimentando alian?as na loja (para varia??o mobile). | JPG 1600x2000 | Biblioteca existente, precisa tratamento | Equipe marketing |
| proof-icons.svg | ?cones lineares personalizados (of?cio, modelos, manuten??o). | SVG | Em vetoriza??o (brief enviado) | Designer |
| process-steps.png | Ilustra??o leve das 4 etapas (vers?o desktop/mobile). | PNG 2000x1000 | Em produ??o | Designer |
| portfolio-case-01.jpg | Casal Ana & Pedro ? alian?as com acabamento fosco. | JPG 1600x1200 | Pronto (revisar direitos) | Comercial |
| portfolio-case-02.jpg | Casal J?lia & Marcos ? grava??o interna personalizada. | JPG 1600x1200 | Pronto | Comercial |
| portfolio-case-03.jpg | Restaura??o alian?as fam?lia Sousa. | JPG 1600x1200 | Necessita nova foto | Fot?grafo interno |
| depoimento-audio-01.mp3 | ?udio curto da cliente Helena para transcri??o. | MP3 | Recebido (transcrever na etapa 4) | Comercial |
| badges-confian?a.svg | Selo 40 anos, atendimento direto, manuten??o garantida. | SVG | Vers?o preliminar aprovada | Designer |

## 5. Quotes selecionados para depoimentos
- "Atendimento direto com o ourives nos deixou seguros desde a primeira conversa." ? Helena M., Jo?o Pessoa.
- "Provar os modelos na loja ajudou a decidir o acabamento perfeito." ? Ana & Pedro, Cabedelo.
- "Agendamos pelo WhatsApp, ajustamos medidas e recebemos tudo no prazo." ? J?lia & Marcos, Recife.
- "Voltamos depois de um ano para polir e as alian?as ficaram como novas." ? Fam?lia Sousa, Jo?o Pessoa.

## 6. Checklist antes do design hi-fi
- [x] CTA prim?rio "Falar no WhatsApp agora" aplicado na dobra inicial, processo e CTA final.
- [x] Copy sem termos t?cnicos n?o utilizados (render 3D, prototipagem) revisada.
- [x] Destaques mencionam o ourives e o portf?lio presencial em blocos espec?ficos.
- [x] Timeline evidencia o papel do WhatsApp em todas as etapas.
- [x] Portf?lio organizado com estrutura desafio ? solu??o ? resultado + CTA.
- [x] Depoimentos refinados para at? 140 caracteres com identifica??o.
- [x] Badges de confian?a definidos (40 anos, atendimento direto, manuten??o).
- [x] Assets planejados para desktop e mobile com respons?veis e status.

---
**Pr?ximo passo (Etapa 4):** capturar/tratar assets, validar direitos de uso, finalizar c?pias longas e preparar arquivos base para o design hi-fi.

