# Cícero Joias - Design System

> [!IMPORTANT]
> Este é o **único** documento de referência para o Design System. Use os tokens e padrões aqui definidos, não valores arbitrários.

> Última atualização: **20/10/2026** — dourado de texto em dois tons com contraste AA (seção 3.1), regras de acessibilidade, fontes enxutas (só as usadas, WOFF2), imagens (seção 11) e remoção do loading global. Ver também `docs/PLANO-OTIMIZACAO.md`.
>
> Atualização anterior: **17/08/2026** — fundações, Home, `/servicos`, `/servicos/aliancas-personalizadas`, `/servicos/consertos`, `/servicos/banho-de-ouro`, `/servicos/joias-sob-medida`, `/servicos/lentes-de-oculos`, `/servicos/limpeza-de-joias`, `/portfolio`, `/portfolio/[slug]`, `/sobre`, `/pronta-entrega`, `/pronta-entrega/[id]` e as páginas auxiliares (`/termos-uso`, `/politica-privacidade`, `/acesso-negado`, `/sign-in`, `/sign-up`, `not-found`, `error`) concluídos. Migração das páginas públicas cadastradas está completa; só falta o painel administrativo (fora de escopo por enquanto).

---

## 1. Princípios Visuais

- **Premium & Artesanal**: A estética deve refletir os 40 anos de história, usando texturas sutis (noise, luz) e fontes elegantes.
- **Glassmorphism Refinado**: Uso de desfoques (`backdrop-blur`) e transparências para criar profundidade sem perder legibilidade.
- **Mobile-First & Responsivo**: Tudo deve funcionar perfeitamente no mobile, com upscaling elegante para desktops.
- **Ritmo de seções**: Na Home, as seções devem alternar entre fundos escuros e claros. Evite duas seções consecutivas com o mesmo tom.
- **Referência de composição**: A página pública atual define a estrutura, o conteúdo e o comportamento das seções. O HTML do Design System especifica apenas a linguagem visual, os tokens e os componentes; ele não deve ser usado como modelo de landing page.
- **Micro-interações**: Elementos interativos devem ter feedback visual (hover, scale, glow).

---

## 2. Tipografia

| Família | Token Tailwind | Uso |
| :--- | :--- | :--- |
| **Libre Caslon Text** | `font-heading` | Títulos editoriais, headings e nomes de serviços. |
| **Jost** | `font-sans` | Corpo, navegação, rótulos, botões e interface. |
| **Marcellus** | `font-numeric` | Números, preços e estatísticas. |

### Pesos da Libre Caslon

| Variante | Uso recomendado |
| :--- | :--- |
| **Regular 400** | Títulos grandes e editoriais, quando a escala já oferece destaque suficiente. |
| **Medium 500** | Peso padrão de headings, títulos de seção e cards. |
| **SemiBold 600** | Ênfase em títulos menores ou sobre fundos com contraste mais exigente. |
| **Bold 700** | Uso pontual; evitar em grandes blocos para preservar o refinamento. |
| **Italic 400–500** | Palavras de acento editorial e composições especiais, nunca para texto de interface. |

Os arquivos variáveis regular e itálico são auto-hospedados em `app/fonts/libre-caslon` (licença SIL OFL 1.1), em **WOFF2 com subconjunto latino** (todos os acentos do português; 295 KB → 89 KB). O eixo de peso 400–700 é preservado.

### Carregamento das fontes (regra)

- O site público carrega **apenas** Jost, Libre Caslon e Marcellus. Não introduza outra família sem revisar o peso: cada família pré-carregada custa pontos de desempenho.
- **Inter** e **Playfair Display** são do painel admin (tema padrão) e usam `preload: false`, para não pesar no site público.
- **Montserrat, Philosopher e Cormorant Garamond foram removidas** (20/10/2026). As classes `font-montserrat`/`font-philosopher`/`font-cormorant` não existem mais: use `font-sans` e `font-heading`.

---

## 3. Cores & Tokens

### Cores Principais (Marca)

| Nome | Token | Hex (Ref) | Descrição |
| :--- | :--- | :--- | :--- |
| **Esmeralda 700** | `brand-emerald-700` / `action-primary` | `#184434` | Cor primária da marca. Sofisticação e tradição. |
| **Ouro 600** | `brand-gold-600` / `action-strong` | `#C79A34` | Fundos de botões de ação, bordas, detalhes nobres. **Como cor de texto em fundo claro, vira um dos tons da seção 3.1.** |
| **Ouro 300** | `brand-gold-300` / `action-on-dark` | `#D5B367` | Texto, ícones e acentos dourados **sobre fundos escuros** (esmeralda). |
| **Marfim** | `brand-ivory` / `surface-page` | `#F7F5F0` | Fundo principal das seções claras. |
| **Grafite** | `brand-graphite` / `text-body` | `#2E363D` | Texto principal sobre fundos claros. |
| **Texto secundário** | `brand-text-secondary` / `text-secondary` | `#5C6B62` | Apoio, descrições e metadados. |

> [!TIP]
> Use sempre os tokens semânticos (`bg-surface-page`, `text-primary`) em vez dos nomes das cores.

### 3.1 Dourado em texto e contraste (WCAG AA)

O `#C79A34` sobre marfim/branco tem contraste de só 2,4–2,6:1. Para manter a identidade **e** passar em acessibilidade, a classe `text-action-strong` (texto dourado em fundo claro) é resolvida em `app/globals.css` em **dois tons** — decisão aprovada em 20/10/2026 após comparar opções na própria página (um tom único `#896A24` foi rejeitado por parecer latão/bronze):

| Onde | Cor resultante | Variável CSS | Contraste mínimo exigido |
| :--- | :--- | :--- | :--- |
| Dourado dentro de **títulos** (`h1`–`h3`) e **ícones** (`svg`) | `#B1860E` | `--ds-action-strong-heading` | 3:1 (texto grande / elemento gráfico) |
| Dourado em **texto pequeno** (etiquetas, links, datas, rótulos) | `#8F6A0C` | `--ds-action-strong-text` | 4,5:1 |
| Fundos, bordas, botões (`bg-`, `border-`, `shadow-`) | `#C79A34` | `--ds-action-strong` | — |

Regras:

- **Fundo claro** → texto dourado com `text-action-strong` (o tom correto é aplicado automaticamente).
- **Fundo escuro** (esmeralda, cards `variant="dark"`, gradientes escuros) → `text-action-on-dark`. **Nunca** `text-action-strong` em fundo escuro: lá ele fica escuro demais.
- Destaque dourado grande fora de `h1`–`h3` recebe o tom de texto pequeno (mais escuro). Se precisar do tom claro, coloque o destaque dentro do título.
- **Texto secundário** (`text-text-secondary`, `#5C6B62`) sempre em **opacidade total** sobre fundo claro. As variações `/60`, `/70` e `/80` reprovam em contraste (3,0–3,6:1) e foram removidas.
- Mudança de cor de marca: mostre as opções aplicadas na página real antes de publicar.

---

## 4. Elementos de UI Padronizados

### 4.1 Botão CTA Dourado (Primário)

> [!IMPORTANT]
> **PADRÃO OBRIGATÓRIO** - Todos os botões de ação principal DEVEM seguir este padrão.

```tsx
<motion.a /* ou motion.div wrapper */
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <Button 
    className="group rounded-full bg-action-strong text-text-on-brand 
      shadow-button-primary 
      transition-all duration-500 
      hover:bg-action-strong/90 hover:shadow-button-gold-strong hover:-translate-y-0.5"
  >
    <span>Texto do Botão</span>
    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
  </Button>
</motion.a>
```

| Propriedade | Base | Hover |
| :--- | :--- | :--- |
| **Background** | `bg-action-strong` | `hover:bg-action-strong/90` |
| **Cor do Texto** | `text-text-on-brand` | (sem mudança) |
| **Sombra** | `shadow-button-primary` | `hover:shadow-button-gold-strong` |
| **Elevação** | - | `hover:-translate-y-0.5` |
| **Transição** | `transition-all duration-500` | - |
| **Framer Motion** | - | `whileHover={{ scale: 1.02 }}` |
| **Framer Tap** | - | `whileTap={{ scale: 0.98 }}` |
| **Ícone** | `<ArrowRight>` sempre presente | `group-hover:translate-x-1` |

---

### 4.2 Botão Secundário / Outline (Fundo Escuro)

```tsx
<Button 
  variant="outline"
  className="group rounded-full border-white/20 bg-white/[0.03] text-white/[0.65] backdrop-blur-sm
    shadow-none transition-all duration-500 
    hover:text-white hover:bg-white/[0.07] hover:border-ouro/30 hover:shadow-lg"
>
  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-ouro/20 rounded-full blur-2xl 
    opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  <span className="relative z-10">Texto do Botão</span>
</Button>
```

---

### 4.3 Link Terciário (Texto com Borda)

```tsx
<a className="group inline-flex items-center gap-2 
  font-jost text-xs font-bold uppercase tracking-widest 
  text-ouro border-b border-ouro/30 pb-0.5 
  hover:border-ouro transition-all duration-300"
>
  <span>Texto do Link</span>
  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
</a>
```

| Propriedade | Padrão |
| :--- | :--- |
| **Transição** | `duration-300` (mais rápido que botões) |
| **Ícone** | `<ArrowRight>` sempre presente |
| **Animação da Seta** | `group-hover:translate-x-1` |

---

### 4.4 Card com Hover

```tsx
<Card
  variant="light"
  interactive
  className="group hover:border-action-strong"
>
  {/* Conteúdo */}
</Card>
```



| Propriedade | Base | Hover |
| :--- | :--- | :--- |
| **Borda** | `border-border-default` | `hover:border-action-strong` |
| **Sombra** | `shadow-card` | `hover:shadow-card-hover` |
| **Elevação** | - | `hover:-translate-y-1` |
| **Transição base** | `duration-200` | - |
| **Glow opcional** | `opacity-0` | `group-hover:opacity-100 duration-700` |
| **Contorno do ícone (Serviços)** | `border-action-primary/30` | `group-hover:border-action-strong` |
| **Fundo do ícone (Serviços em card claro)** | `bg-surface-subtle` | `group-hover:bg-action-strong` |
| **Cor do ícone (Serviços)** | `text-text-primary` | `group-hover:text-text-on-dark` |

Nos cards claros de serviços, o círculo do ícone assume obrigatoriamente fundo dourado no hover, com ícone branco. Não use `bg-action-primary` nesse estado.

Em seções escuras, use `Card variant="dark"` com `border-border-on-dark`, `bg-surface-dark-elevated` e `hover:border-action-on-dark`. Títulos e descrições usam `text-text-on-dark`; o círculo do ícone parte de `border-border-on-dark` e assume fundo dourado somente no hover.

`interactive` fornece elevação e sombra de hover por padrão. Quando a composição pedir apenas borda e deslocamento, mantenha a sombra-base com `hover:shadow-sm`, como nos depoimentos da Home.

---

### 4.5 Badge / Tag de Seção

Use sempre o componente fundamental `Badge`; não remonte o estilo com cores locais na seção.

```tsx
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

<Badge variant="sectionLight" className="gap-2">
  <Star className="h-3 w-3 fill-current" aria-hidden="true" />
  Nossos serviços
</Badge>
```

| Contexto | Variante | Comportamento visual |
| :--- | :--- | :--- |
| **Fundo claro** (marfim ou branco) | `sectionLight` | Texto, fundo sutil e borda esmeralda; é estático e não apresenta mudança visual no hover. |
| **Fundo escuro** (esmeralda) | `dark` | Contraste claro com acento adequado ao fundo escuro; permanece estático no hover. |
| **Destaque deliberadamente dourado** | `gold` | Use apenas quando o badge for o destaque dourado da composição. |

Regras de uso:

- Em seções claras, prefira `sectionLight`; por ser um rótulo informativo, ele permanece estático no hover, como o badge do Hero.
- Não use `outline` como tag de seção, pois essa variante genérica pode assumir o acento dourado no hover.
- Reserve o dourado para destaques tipográficos e ações principais quando já houver esses elementos na composição.
- Ícones devem usar `currentColor` (`fill-current` quando preenchidos), herdando os estados da variante.
- Ajustes cromáticos reutilizáveis devem ser feitos em `components/ui/badge.tsx`, não com valores hexadecimais ou combinações repetidas nas páginas.

---

### 4.6 Input Glass (Filtros e Buscas)

```tsx
<div className="flex items-center gap-3 rounded-full border border-ouro/20 bg-white/50 px-4 py-2 transition-colors focus-within:border-ouro/50">
  <Icon className="h-4 w-4 text-ouro" />
  <Input className="border-none bg-transparent focus-visible:ring-0..." />
</div>
```

### 4.7 Lista de Especificações (Data Display)

Used in product details or technical specifications.

```tsx
<dl>
  <div className="flex flex-col gap-1 border-l-2 border-ouro/20 pl-4">
    <dt className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Label</dt>
    <dd className="font-sans text-sm font-medium text-text-primary">Value</dd>
  </div>
</dl>
```

> [!IMPORTANT]
> Em `<dl>`, o `<dt>` vem **antes** do `<dd>` (cada par pode ficar dentro de uma `<div>`). Se o visual pedir o valor acima do rótulo (ex.: números grandes nos heros de serviço), não use `<dl>`: use parágrafos (`<p>`) — `<dd>` antes de `<dt>` é inválido e reprova em acessibilidade.

### 4.8 Card de Depoimento (Fundo Claro)

A Home preserva quatro depoimentos. No mobile eles passam em uma esteira horizontal contínua; a partir de `md`, aparecem em uma grade de duas colunas.

| Elemento | Padrão |
| :--- | :--- |
| **Card** | `Card variant="light" interactive` |
| **Borda** | `border-border-default` com `hover:border-action-strong` |
| **Avaliação** | Estrelas em `text-action-strong`; são decorativas e a nota deve existir em `aria-label` |
| **Ícone de citação** | Aspas pequenas apenas em contorno (`strokeWidth` entre `1.25` e `1.5`), baixa opacidade e sem animação |
| **Relato** | Jost em itálico, `text-text-body`, dentro de `blockquote` |
| **Autoria** | Nome em `font-heading`; local em Jost, caixa alta e `text-text-secondary` |
| **Avatar** | Iniciais em círculo com borda e fundo esmeralda semântico |
| **Hover** | Borda dourada e leve elevação; a sombra permanece em `shadow-sm` |
| **Mobile** | Autoplay suave; pressionar pausa, arrastar navega e soltar retoma |

O badge da seção usa `sectionLight` e permanece estático. O dourado fica reservado para “Brilham”, estrelas e borda de hover; textos pequenos mantêm os tokens de maior contraste.

A esteira respeita `prefers-reduced-motion`, usa `touch-pan-y`, mantém 4px de folga superior para não recortar a borda durante a elevação e expõe apenas uma cópia semântica dos depoimentos às tecnologias assistivas.

### 4.9 CTA Final da Home (Fundo Escuro)

O CTA final preserva a composição da Home pública: título, descrição, três benefícios e uma única ação principal para o WhatsApp.

| Elemento | Padrão |
| :--- | :--- |
| **Seção** | `Section tone="dark" spacing="lg"` após uma seção clara |
| **Título e descrição** | `SectionHeading tone="dark"`, centralizado |
| **Benefícios** | `Badge variant="dark"`, estático, com ícone em contorno |
| **Ação principal** | `Button variant="goldOnDark" size="lg"` com o link dinâmico existente |
| **Mobile** | Benefícios quebram em linhas; botão mantém pelo menos 44px de altura |

A aparência `home-dark` é ativada pela Home. A rota `/servicos/aliancas-personalizadas` usa `service-light` para preservar a alternância clara/escura; páginas ainda não migradas permanecem na variante legada.

### 4.10 Timeline de Processo (Linha do Tempo)

Usada em seções de "nosso processo" (`/servicos/consertos`, `/servicos/banho-de-ouro`): lista numerada com linha tracejada central, alternando esquerda/direita no desktop e empilhada no mobile.

| Elemento | Padrão |
| :--- | :--- |
| **Linha central** | `border-l border-dashed border-border-default`, vertical no desktop (`lg:block`), à esquerda dos cards no mobile |
| **Selo do ícone** | Círculo/quadrado `bg-action-primary text-text-on-dark`; etapa de destaque do processo usa `bg-action-strong` (dourado) |
| **Card da etapa** | `Card variant="light"` com fase, título (`font-heading`) e descrição |
| **Número editorial** | `font-numeric text-5xl text-action-strong`, posicionado decorativamente no canto do card, **em opacidade total (sem `opacity-*`)** — não usar transparência nesse número |

> [!IMPORTANT]
> O número da timeline é sempre dourado sólido (`text-action-strong`, sem opacidade reduzida). Não reintroduzir `opacity-20` ou similar nesse elemento.

Estrutura semântica: `<ol>` → `<li>` → `AnimatedSection` (a animação fica **dentro** do item). Um `<div>` de animação entre `<ol>` e `<li>` torna a lista inválida.

### 4.11 Footer do tema público

O footer público usa `bg-brand-emerald-950`, preserva as informações e destinos existentes e mantém contraste, foco visível e alvos de toque mínimos de 44px.

| Elemento | Padrão |
| :--- | :--- |
| **Estrutura padrão** | Duas colunas no desktop e uma no mobile: marca/serviços e contato/redes |
| **Tipografia** | Marca em `font-heading`; corpo, navegação e rótulos em `font-sans` |
| **Links** | `text-text-on-dark/75` com `hover:text-action-on-dark` |
| **Contato** | Telefone e e-mail com `min-h-control`; endereço e horário permanecem informativos |
| **Redes sociais** | Círculos de 44×44px, contorno semântico e rótulo acessível |
| **Encerramento** | Copyright em `font-numeric` e links legais separados por borda semântica |
| **Radius de pílula/círculo** | Sempre `rounded-pill` (token `--radius-pill`), nunca `rounded-full` — mesmo resultado visual (9999px), mas vindo do token do design system |
| **Mobile (todas as páginas do tema público)** | Footer compacto: conteúdo centralizado, serviços em duas colunas e contato condensado, sem remover dados ou destinos |

As aparências `home-dark` e `service-compact` renderizam o mesmo footer compacto no mobile e o footer padrão no desktop — a distinção entre os dois nomes é apenas histórica (mantida por compatibilidade), o comportamento visual é idêntico. Ativa em `/`, `/servicos`, `/servicos/aliancas-personalizadas`, `/servicos/consertos`, `/servicos/banho-de-ouro`, `/servicos/joias-sob-medida`, `/servicos/lentes-de-oculos` e `/servicos/limpeza-de-joias`. As páginas ainda não migradas continuam no footer legado até sua própria fase.

### 4.12 Carrossel de Cards no Mobile (Diferenciais, Planos)

Usado sempre que uma grade de cards (diferenciais, planos, etc.) vira carrossel horizontal abaixo do breakpoint `sm`.

| Elemento | Padrão |
| :--- | :--- |
| **Largura do card** | `min-w-[85%]` (nunca `min-w-full`) — deixa ~15% do próximo card visível, sinalizando que há mais itens |
| **Scroll** | `overflow-x-auto snap-x snap-mandatory touch-pan-x` — nunca `touch-pan-y` num carrossel horizontal sem JS de arraste próprio (bloqueia o gesto nativo de swipe) |
| **Dots** | Botões com `[-webkit-tap-highlight-color:transparent]` (evita o realce azul padrão do navegador ao tocar) |
| **Cards informativos sem link** | Estáticos — sem `interactive`/hover que promete clique (ver 4.4) |

> [!IMPORTANT]
> `min-w-full` em carrosséis mobile é considerado um bug de UX (esconde que há mais cards). Sempre usar `min-w-[85%]`.

### 4.13 Card de Produto (listagem de e-commerce)

Padrão consolidado em `/pronta-entrega` para cards de produto com foto, preço e estoque. A regra central: **a foto do produto fica limpa** — nenhuma badge posicionada por cima da imagem, porque badges em cantos opostos de uma imagem estreita inevitavelmente colidem com textos longos, e a joia é o herói visual do card.

| Elemento | Padrão |
| :--- | :--- |
| **Imagem** | Sem overlays informativos. Única exceção: estado "Sem estoque" (scrim `bg-black/50` + `Badge variant="dark"` centralizada, comunicando indisponibilidade da peça inteira) |
| **Categoria** | `Badge variant="gold"` **acima do título**, como eyebrow editorial (`mb-3 self-start` no grid) — nunca sobre a foto |
| **Hierarquia do conteúdo** | categoria → título (`font-heading`, hover dourado) → descrição (`line-clamp-2`) → divisor → preço + meta → CTA |
| **Preço** | Ponto focal da área de comércio: `font-numeric text-2xl font-bold text-text-primary`, separado da narrativa por `border-t border-border-default/60 pt-4` |
| **Meta (código/estoque)** | De-enfatizada por tamanho e posição: `text-xs text-text-secondary` (sem opacidade — ver seção 3.1), alinhada à direita, rótulos curtos ("Cód." em vez de "Código:") |
| **Urgência de estoque** | Texto discreto `text-xs font-semibold text-error` ("Últimas unidades") junto da linha de estoque — **não** uma badge sobre a imagem nem badge destrutiva no meta |
| **Altura uniforme** | `flex h-full flex-col` no Card + `mt-auto` antes do bloco de preço — CTAs alinham na base mesmo com descrições de tamanhos diferentes |

> [!IMPORTANT]
> Não posicionar badges de status/urgência sobre fotos de produto. Informação de estoque pertence à área de dados do card (junto de "Estoque: X"), não à imagem.

---

## 5. Animações Padronizadas

### 5.1 Framer Motion - Entrada de Elementos

```tsx
// Variantes padrão para stagger reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};
```

### 5.2 Durações Padrão

| Tipo | Duração | Uso |
| :--- | :--- | :--- |
| **Controles fundamentais** | `duration-200` | `Button`, `Card`, campos e estados de foco/hover |
| **Links / Micro-interações editoriais** | `duration-300` | Links de texto, ícones pequenos |
| **Imagens / Composições especiais** | `duration-500` | Zoom de portfólio e CTAs editoriais existentes |
| **Glow / Blur effects** | `duration-700` | Efeitos decorativos de luz |

### 5.3 Animações de Hover - Padrão

| Elemento | Animação CSS | Framer Motion |
| :--- | :--- | :--- |
| **Botão CTA** | `-translate-y-0.5` | `scale: 1.02 / 0.98` |
| **Card** | `-translate-y-1` | - |
| **Seta (ArrowRight)** | `translate-x-1` | - |
| **Ícone decorativo** | `scale-110`, `rotate-6` | - |

---

## 6. Sombras (Shadows)

| Token | Uso |
| :--- | :--- |
| `shadow-card` | Sombra suave para cards em repouso |
| `shadow-card-hover` | Sombra mais projetada para hover, apenas quando a elevação for desejada |
| `shadow-card-sm` | Sombra leve para cards sobre fundo escuro |
| `shadow-button-primary` | "Glow" dourado para botões (default) |
| `shadow-button-gold-strong` | "Glow" dourado intenso (hover) |

---

## 7. Layout e Espaçamento

- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Seções**: `py-12 sm:py-16 md:py-20`
- **Gap entre elementos dentro de seção**: `gap-12` ou `gap-16`

### 7.1 Hero Section Standard (Simetria Visual)

Para garantir que o conteúdo do Hero tenha o mesmo espaçamento visual no topo e na base (considerando o overlap de `-mt-16` da seção seguinte):

- **Padding Top**: `pt-16` (4rem)
- **Padding Bottom**: `pb-32` (8rem) -> *8rem total - 4rem overlap = 4rem visível*
- **Visual Resultante**: 4rem de respiro em cima e embaixo.

---

## 8. Loading States

Para manter a consistência e a percepção de performance premium, usamos um único componente: `<LoadingScreen />`.
**IMPORTANTE**: Sempre forneça uma mensagem contextual na *prop* `message` (ex: "Carregando usuários...", "Salvando alterações...").

### 8.1 Fullscreen Loading (somente admin)

> [!WARNING]
> **Não use tela de carregamento em tela cheia nas páginas públicas.** O antigo `app/loading.tsx` global foi removido em 20/10/2026: ele entrava no HTML antes do conteúdo, fazia o rodapé "pular" (CLS 0,89), atrasava a imagem principal e deixava páginas vazias para o Google. Pelo mesmo motivo, guardas de visibilidade não podem bloquear a renderização: o conteúdo é mostrado de imediato e só é trocado se a página estiver oculta.

O variant `fullscreen` fica restrito a fluxos do admin (ex.: verificação de permissões no `AdminGuard`). O `app/admin/loading.tsx` usa o variant `inline`.

```tsx
<LoadingScreen variant="fullscreen" message="Verificando permissões..." />
```

### 8.2 Inline Loading (Conteúdo Assíncrono)

Usado dentro de cards, grades ou seções que carregam dados dinâmicos. Possui fundo opaco (`bg-surface-page`) para evitar "piscadas" (flashing) visuais ao substituir o conteúdo anterior.

```tsx
<div className="flex h-48 items-center justify-center">
    <LoadingScreen variant="inline" message="Carregando produtos..." />
</div>
```

**Tokens Visuais:**
- **Animação**: `pulse` circular duplo + rotação suave + `shine` effect.
- **Cores**: `border-ouro/30` (anel externo) e `border-ouro/50` (anel interno).
- **Ícone**: `shine.svg` (Brilho da marca) centralizado.
- **Tipografia**: `font-jost` uppercase para mensagens.

---

## 9. Checklist de Consistência

Antes de finalizar qualquer componente, verifique:

- [ ] Botões CTA usam `bg-action-strong` (não `bg-ouro` diretamente)
- [ ] Botões CTA usam o componente `Button` sempre que a composição permitir
- [ ] Botões CTA têm `<ArrowRight>` com `group-hover:translate-x-1` quando houver seta
- [ ] Hover de botões usa `hover:bg-action-strong/90` (escurece, não clareia)
- [ ] Sombras usam tokens e só aumentam no hover quando a composição exigir
- [ ] Controles fundamentais usam `duration-200`
- [ ] Transições de links usam `duration-300`
- [ ] Animação de seta usa `translate-x-1` (não `translate-x-2`)
- [ ] Cards usam bordas semânticas (`border-border-*` / `hover:border-action-*`)
- [ ] Badges informativos permanecem estáticos no hover
- [ ] Alvos de toque têm pelo menos 44×44px e estados `focus-visible`
- [ ] Animações respeitam `prefers-reduced-motion`
- [ ] Páginas não introduzem valores hexadecimais ou espaçamentos arbitrários
- [ ] Texto dourado: `text-action-strong` só em fundo claro; em fundo escuro, `text-action-on-dark` (seção 3.1)
- [ ] `text-text-secondary` sem opacidade (`/60`–`/80`) sobre fundo claro
- [ ] Títulos em ordem (`h1` → `h2` → `h3`), sem pular nível só pelo tamanho visual (o tamanho vem da classe)
- [ ] Botões só com ícone têm `aria-label`; `aria-label` em `div` exige `role` (ex.: estrelas com `role="img"`)
- [ ] Nome acessível de links contém o texto visível (prefira não usar `aria-label` quando já há texto)
- [ ] Listas válidas: `<ol>/<ul>` só com `<li>` como filhos; `<dl>` com `<dt>` antes de `<dd>`
- [ ] Imagens seguem a seção 11 (WebP, tamanho de exibição, nunca base64)
- [ ] Nenhuma fonte nova sem revisar o impacto no carregamento (seção 2)

---

## 10. Estado da Migração

### 10.1 Concluído

- Fundações: primitivas oficiais, tokens semânticos, tema público isolado em `.public-theme`, Libre Caslon Text, Jost e Marcellus.
- Componentes fundamentais: `Button`, `Input`, `Textarea`, `Badge`, `Card`, `Container`, `Section` e `SectionHeading`.
- Home `/`: header, hero, confiança, serviços, alianças, portfólio, depoimentos, CTA e footer.
- Serviços `/servicos`: header e footer do tema público, hero, catálogo de seis serviços e CTA final; conteúdo, destinos e comportamento existentes foram preservados.
- Alianças personalizadas `/servicos/aliancas-personalizadas`: composição e conteúdo existentes migrados para os tokens e componentes fundamentais; portfólio dinâmico, WhatsApp e destinos preservados; avaliações em tema escuro com carrossel mobile; autoridade compacta, prazo de resposta em 24h e footer mobile centralizado e reduzido.
- Consertos especializados `/servicos/consertos`: composição, conteúdo e destinos existentes migrados para os tokens e componentes fundamentais; hero com imagem de fundo e estatísticas no padrão da Home; seções refinadas uma a uma (cards com ícone alinhado ao título, número editorial na linha do tempo, diferenciais em 2×2 com carrossel no mobile); avaliações em tema escuro no padrão da Home/alianças, com carrossel mobile e link do perfil no Google; alternância clara/escura fechada com Cuidados em tema escuro; WhatsApp, link do Maps e destinos preservados. Header e footer do tema público ativados apenas para a rota exata, com footer `home-dark` (não `service-compact`).
- Banho de ouro profissional `/servicos/banho-de-ouro`: composição, conteúdo e destinos existentes migrados para os tokens e componentes fundamentais; hero full-bleed com imagem de banho de galvanoplastia e estatísticas no padrão da Home/consertos; planos de banho (Básico/Intermediário/Avançado) e diferenciais migrados para carrossel horizontal com dots no mobile e grade no desktop/tablet, reduzindo a altura de rolagem; timeline de processo com número editorial dourado sólido (ver 4.10); FAQ e CTA final em tokens semânticos, com boxes de fechamento redundantes removidos. Header e footer do tema público ativados apenas para a rota exata, com footer `home-dark`.
- Joias sob medida `/servicos/joias-sob-medida`: página **criada do zero** (antes era um placeholder "Página em construção", sem conteúdo real) com conteúdo de negócio validado com o cliente — fabricam apenas anéis e pingentes sob medida (não brincos/colares), ouro 18k e prata 990, garantia eterna, orçamento sempre sob consulta (sem valor exibido), prazo combinado por peça (sem número fixo). Hero full-bleed com imagem gerada por IA (mestre ourives esboçando um anel); diferenciais em carrossel horizontal com dots no mobile; timeline de processo em 5 etapas sem "prazo médio" fixo; FAQ com 10 perguntas; CTA final. Corrigida também a descrição desse serviço em `/servicos` e na Home (removida menção a brincos/colares, que não são fabricados). Header e footer do tema público ativados apenas para a rota exata, com footer `service-compact`.
- Lentes de óculos `/servicos/lentes-de-oculos`: página **criada do zero** (antes era um placeholder "Página em construção"). Trocam lentes e também vendem/trocam armações (loja própria, marcas variadas). Sem menção a garantia na página, por decisão do cliente. Trabalham 5 tipos de lente (monofocal, multifocal/progressiva, antirreflexo, fotossensível, blue light), receita oftalmológica obrigatória, lentes fabricadas por laboratório parceiro (não produção interna), prazo combinado por caso. Hero full-bleed com imagem gerada por IA; diferenciais institucionais (sem narrativa de "mestre ourives", já que esse serviço não é feito por Cícero pessoalmente); timeline de processo em 4 etapas sem prazo fixo; FAQ com 8 perguntas. Corrigida também a descrição desse serviço em `/servicos` e na Home (agora menciona armações, não só lentes). Header e footer do tema público ativados apenas para a rota exata.
- Limpeza de joias `/servicos/limpeza-de-joias`: página **criada do zero** (rota antes referenciada na Home/footer/`/servicos` sem nenhuma página, 404 em produção). Mesmo processo já usado no acabamento de consertos ("limpeza de cortesia"), agora vendido separadamente. Limpeza **manual** (procedimentos adequados e profissionais, feitos pelos ourives — nunca descrever como "ultrassônica"); polimento **não é automático**, é avaliado e só confirmado após ver a peça ("quando indicado", nunca "é realizado"/incluso); pode haver pontos de difícil acesso que não ficam 100% limpos em peças com desenho elaborado. Diferencial real: processo rápido, muitas vezes pronto no mesmo dia. Hero full-bleed com imagem gerada por IA (flanela polindo anel com pedra — evitar imagens com cuba/vapor/escova de aço, que sugerem técnica que a loja não usa); processo em 3 etapas (mais curto que as outras páginas, condizente com um serviço rápido); FAQ com 7 perguntas, incluindo "Toda peça recebe polimento?". Header e footer do tema público ativados apenas para a rota exata.
- Portfólio `/portfolio` e `/portfolio/[slug]`: migração pura (composição, filtros, busca, paginação client-side e conteúdo dinâmico via Prisma preservados) para os tokens e componentes fundamentais, feita bloco a bloco com aprovação visual a cada etapa. Listagem: hero com `Section`/`Container`/`SectionHeading` reaproveitando o asset `portfolio-hero.webp` (já existia no projeto, nunca estava conectado); filtros (busca, badges de categoria, grid/list, ordenar) migrados para `Badge`/`Button` com tokens; grid/lista de cards em `Card variant="light" interactive`. Detalhe: hero usa a própria imagem principal do projeto como fundo desfocado; especificações em `Card`; CTAs no padrão 4.1/4.2; projetos relacionados reaproveitando o padrão já aprovado do `PortfolioPreviewSection`. Removida referência morta a `/assets/noise.webp` (nunca existiu no projeto, 404 herdado do código original) nos dois heróis. Botões de ação sobre a imagem principal (compartilhar, tela cheia) trocados de `Button variant="secondary"` — que dentro de `.public-theme` sempre resolve para o dourado sólido, ignorando classes customizadas — para botões nativos em vidro escuro semitransparente, consistentes entre si. `Header`/`Footer` do tema público ativados para as rotas de portfólio (antes ficavam no legado, apesar do conteúdo migrado) e `FinalCTASection` corrigido para `appearance="home-dark"` nas duas páginas (antes caía no branch `legacy` sem prop). Scroll progress e botão flutuante do WhatsApp, antes restritos à Home e `/servicos`, agora acompanham todas as páginas migradas do tema público.
- Sobre nós `/sobre`: página estática (sem dados dinâmicos) migrada bloco a bloco para os tokens e componentes fundamentais, preservando integralmente composição e textos. Hero reaproveita o asset já existente `sobre-nos-hero.webp`; grid de números e os 4 cards da história (1985/Crescimento/2000/Hoje, o último com destaque dourado) em `Card variant="light" interactive`; bloco de citação em destaque em `Card variant="dark"`; timeline de 3 colunas própria da página (estrutura diferente da timeline vertical documentada em 4.10) mantida, só com tokens migrados; CTA final com composição própria (citação + dois botões) preservada, usando `Button variant="goldOnDark"`/`"outlineDark"`. `Header`/`Footer` do tema público ativados para a rota (antes ficava no legado).
- Pronta entrega `/pronta-entrega`: migração para os tokens e componentes fundamentais (hero, busca/ordenar/grid-list, sidebar de filtros, grid/lista de produtos, paginação), preservando filtros dinâmicos via Prisma (categoria, material, faixa de preço, disponibilidade), busca local e paginação server-side. Corrigido hex literal (`style={{backgroundColor: '#133629'}}`) no hero. Dois componentes compartilhados nunca tinham variante `public:` (mesmo bug de especificidade do `Button variant="secondary"` encontrado no portfólio) e foram corrigidos na fonte: `Slider` (herdava cinza do admin) e `SelectTrigger` (ficava preso em `h-10` fixo, desalinhado de `Input`/`Button`). Categoria `WEDDING_RINGS`/`JEWELRY` do enum `ProductCategory` estavam faltando no mapa de labels da página (mostravam o valor cru do enum em inglês) — corrigido. Card de produto redesenhado (ver 4.13): badge de categoria saiu de cima da imagem (colidia com a badge de estoque baixo em cards estreitos) para virar eyebrow acima do título; aviso de "últimas unidades" virou texto discreto junto da linha de estoque. Criada também a página de detalhe `/pronta-entrega/[id]` (rota que nunca existiu — os cards linkavam para um 404 desde antes da migração), no mesmo padrão visual do detalhe do portfólio: galeria com miniaturas e modal fullscreen, preço com suporte a preço promocional riscado, especificações (material/tamanho/peso/código/prazo), CTA de WhatsApp com nome e código da peça na mensagem, peças relacionadas. Header e footer do tema público ativados para as duas rotas.
- Conteúdo dinâmico, Clerk, Prisma/Supabase, UploadThing, links, WhatsApp e rotas públicas existentes foram preservados.
- O ícone oficial do WhatsApp substituiu símbolos genéricos nos pontos auditados.
- A rota `/home-v2`, seus componentes e seu ativo exclusivo foram removidos definitivamente e não devem ser restaurados.
- Páginas auxiliares `/termos-uso` e `/politica-privacidade`: corrigido um bug real de **header/footer duplicado** — as páginas importavam `<Header/>`/`<Footer/>` diretamente, além do `ConditionalLayout` já envolver toda página não-admin com header/footer por fora; removido o import próprio de cada página. Migradas para `Section`/`Container` e tokens semânticos; limpas classes mortas (`bg-antique-white`, não definida no Tailwind config; `prose prose-stone`, plugin `@tailwindcss/typography` nunca instalado).
- Página auxiliar `/acesso-negado`: migrada de cores cruas (`bg-white`, `text-gray-900`, `bg-amber-*`, `bg-esmeralda` via className solto) para `Card`/`Button` com tokens e variants; corrigida frase redundante "A página esta página está..." quando a URL não tem `?page=` (agora usa "Esta página está...").
- `/sign-in` e `/sign-up`: botão primário do widget do Clerk trocado de `bg-amber-600` (cor genérica) para `bg-action-strong` (dourado da marca); página em si é gerenciada pelo Clerk, fora de escopo de redesign.
- `not-found.tsx` e `error.tsx` (404 e boundary de erro globais) migrados para `Section`/`Container`/`Card`/`Button` com tokens semânticos — antes eram os únicos lugares que ainda usavam estilos não migrados (`bg-primary`, `text-muted-foreground` etc).
- `conditional-layout.tsx` simplificado: como toda rota pública cadastrada já usa o tema novo, a lista de ~15 flags de rota foi substituída por `usesPublicDesignSystem = !isAdminRoute` — o tema novo é o padrão para qualquer coisa que não seja `/admin`, incluindo 404s e caminhos não mapeados (que antes caíam no header/footer legado).
- O painel administrativo continua fora do novo tema visual.

Validação do checkpoint de 18/07/2026: ESLint, `tsc --noEmit` e build de produção concluídos; 43 páginas foram geradas com sucesso.

Validação de `/servicos/aliancas-personalizadas` em 19/07/2026: revisão visual desktop/mobile aprovada; ESLint e `tsc --noEmit --incremental false` concluídos; `npm run build` bloqueado localmente pelo Windows no rename da DLL do Prisma (`EPERM`), e `npx next build` concluído com 43 páginas.

Validação de `/servicos/consertos` em 22/07/2026: revisão visual desktop/mobile por seção aprovada; ESLint e `tsc --noEmit --incremental false` concluídos; build de produção concluído em dist isolado (`NEXT_DIST_DIR=.next-preview`) para não interferir no `.next` do servidor de desenvolvimento, com `/servicos/consertos` gerada como estática. O `distDir` configurável por variável de ambiente (default `.next`) foi adicionado ao `next.config.js` para isolar previews.

Validação de `/servicos/banho-de-ouro` em 26/07/2026: revisão visual desktop/mobile por seção aprovada; ESLint e `tsc --noEmit --incremental false` concluídos; build de produção em dist isolado (`NEXT_DIST_DIR=.next-preview`) concluído com 43 páginas, `/servicos/banho-de-ouro` gerada como estática; `.next` do servidor de desenvolvimento preservado. Refinos de UX mobile aplicados após a aprovação inicial: carrossel horizontal com dots para planos e diferenciais (reduzindo a altura de rolagem), e correção de `touch-action`/tap-highlight nos carrosséis nativos sem arraste por JS — replicada também em `/servicos/consertos` e `/servicos/aliancas-personalizadas`, que usavam o mesmo padrão.

Validação de `/servicos/joias-sob-medida` em 06/08/2026: revisão visual desktop/mobile por seção aprovada; ESLint e `tsc --noEmit --incremental false` concluídos; build de produção em dist isolado concluído com 43 páginas, `/servicos/joias-sob-medida` gerada como estática; `.next` do servidor de desenvolvimento preservado. Refinos aplicados após a aprovação inicial: cards de diferenciais tornados estáticos (sem `interactive`/hover-lift, que cortava o topo do card no carrossel mobile ao ficar "preso" em `:hover` no toque); `hover:underline` legado removido do `AccordionTrigger` compartilhado; borda do FAQ trocada de `hover:` para `[&[data-state=open]]:` (a sintaxe `data-[state=open]:` não é suportada nesta versão do Tailwind, 3.3.3); tap-highlight-color suprimido nos dots de carrossel e no trigger do accordion; footer compacto (antes exclusivo de alianças) unificado para **todas** as páginas do tema público no mobile; `rounded-full` trocado por `rounded-pill` no footer ativo (ver 4.11); rótulos "Restauração de joias" e "Anéis de formatura" corrigidos no footer para "Consertos" e "Joias sob medida".

Validação de `/servicos/lentes-de-oculos` em 12/08/2026: revisão visual desktop/mobile por seção aprovada; ESLint e `tsc --noEmit --incremental false` concluídos; build de produção em dist isolado concluído com 43 páginas, `/servicos/lentes-de-oculos` gerada como estática; `.next` do servidor de desenvolvimento preservado. Componentes já nasceram sem os bugs de carrossel/accordion corrigidos no checkpoint anterior (touch-action, tap-highlight, cards estáticos, borda por `data-state`). Ajuste pós-aprovação no hero: card de estatística "Atendimento Personalizado" tinha o destaque e a legenda invertidos (corrigido); card "5 tipos de lente" passou a mostrar a descrição também no mobile (os outros dois stats seguem sem descrição no mobile, para não inflar a altura do hero).

Validação de `/servicos/limpeza-de-joias` em 13/08/2026: revisão visual desktop/mobile por seção aprovada; ESLint e `tsc --noEmit --incremental false` concluídos; build de produção em dist isolado concluído com 43 páginas, `/servicos/limpeza-de-joias` gerada como estática; `.next` do servidor de desenvolvimento preservado. Duas rodadas de correção de conteúdo após a primeira aprovação: (1) o texto e a imagem do hero descreviam limpeza "ultrassônica" — o processo real é manual, feito pelos ourives; imagem regenerada até chegar numa cena sem cuba/vapor/escova de aço nem poeira visível (flanela polindo um anel com pedra); (2) o polimento estava descrito como parte automática do processo — corrigido para deixar claro que é avaliado e só confirmado após ver a peça, com FAQ dedicada ("Toda peça recebe polimento?") e o cuidado de usar "pode ser realizado" em vez de "é realizado". Padronização cross-page nesta rodada: carrossel horizontal com `min-w-full` (sem indicar que há mais cards) trocado por `min-w-[85%]` em **todas** as páginas que usam esse padrão de carrossel — limpeza-de-joias, lentes-de-oculos, joias-sob-medida, consertos e alianças (banho-ouro já estava correto); documentado como regra do design system (ver 4.12).

Validação de `/portfolio` e `/portfolio/[slug]` em 14/08/2026: revisão visual desktop/mobile aprovada; ESLint e `tsc --noEmit --incremental false` concluídos; build de produção em dist isolado concluído com 44 páginas (`/portfolio` estática, `/portfolio/[slug]` dinâmica); `.next` do servidor de desenvolvimento preservado.

Validação de `/sobre` em 14/08/2026: revisão visual desktop/mobile aprovada; ESLint e `tsc --noEmit --incremental false` concluídos; build de produção em dist isolado concluído com 44 páginas, `/sobre` gerada como estática; `.next` do servidor de desenvolvimento preservado.

Validação de `/pronta-entrega` e `/pronta-entrega/[id]` em 16/08/2026: revisão visual aprovada (como admin, já que a página está com visibilidade desativada no banco — configuração existente, não alterada); ESLint e `tsc --noEmit --incremental false` concluídos; build de produção em dist isolado concluído com 45 páginas, `/pronta-entrega` estática e `/pronta-entrega/[id]` dinâmica; `.next` do servidor de desenvolvimento preservado.

Validação das páginas auxiliares em 17/08/2026 (`/termos-uso`, `/politica-privacidade`, `/acesso-negado`, `/sign-in`, `/sign-up`, `not-found`, `error`): revisão visual aprovada; ESLint e `tsc --noEmit --incremental false` concluídos; build de produção em dist isolado concluído com 44 páginas — `/termos-uso` e `/politica-privacidade` reduziram de 2.44 kB para 205 B de JS próprio ao pararem de duplicar o bundle do Header/Footer; `.next` do servidor de desenvolvimento preservado. Com essa rodada, a migração das páginas públicas cadastradas está completa.

Commits do checkpoint:

- `495a35d` — fundações do Design System público.
- `0ef8fa9` — migração da Home.
- `e3197b1` — consistência de WhatsApp.
- `e648121` — template do pooler Supabase.
- `b7c7a89` — remoção da `/home-v2`.

### 10.2 Próxima fase

Todas as páginas públicas cadastradas estão migradas. O que resta:

1. Painel administrativo (`/admin/**`) — fora do tema público por decisão deliberada até aqui; migrar só quando houver decisão explícita de estender o Design System ao admin.
2. Novas páginas públicas que venham a ser criadas devem nascer já usando os tokens e componentes fundamentais desta doc, não o padrão legado.

### 10.3 Regras para continuar

- A página pública atual define composição, conteúdo e comportamento; o HTML do Design System (mockup de jul/2026, hoje fora do repositório em `Documentos\Cícero Joias - Design System`) é apenas referência visual histórica. **Este documento é a fonte da verdade.**
- Nunca importar ou copiar `support.js` para a aplicação.
- Preservar dados dinâmicos, autenticação, uploads, links, WhatsApp e comportamento existente.
- Usar tokens semânticos e os componentes fundamentais; não criar um Design System paralelo.
- Manter o tema novo restrito ao layout público enquanto o admin não for migrado.
- Alternar seções claras e escuras quando isso melhorar o ritmo, sem sacrificar a estrutura da página original.
- Antes de substituir ou remover código, localizar referências e consumidores.
- Fazer mudanças pequenas e reversíveis, com revisão desktop/mobile.
- Ao concluir cada página: ESLint, `tsc --noEmit`, build e commit próprio; não fazer push ou deploy sem autorização.
- Não versionar `.serena/`, screenshots, previews HTML, artefatos gerados nem a pasta da especificação visual, salvo decisão explícita.

---

## 11. Imagens e Mídia

| Regra | Padrão |
| :--- | :--- |
| **Formato** | WebP para fotos. SVG só para vetores de verdade (logo, ícones): o `next/image` **não otimiza SVG**, então uma foto embutida em SVG chega crua (o hero de Alianças tinha 5,3 MB). |
| **Tamanho** | Arquivo no tamanho máximo de exibição (heros até 2560 px de largura; cards ~640 px). Fotos de 6000 px foram reduzidas sem perda visível. Guarde os originais em alta fora do repositório (`Documentos\Cícero Joias - Acervo de imagens\originais-alta-resolucao`). |
| **Fotos do admin** | Enviadas ao **UploadThing** (o banco guarda só a URL). O formulário reduz a foto no próprio aparelho (até 2400 px, WebP) antes do envio. **Nunca** salvar imagem em base64 no banco — a API recusa. |
| **Componente** | `next/image` com `sizes` coerente com o layout; `priority` só na imagem principal da primeira dobra. |
| **Ícones de site** | `favicon-48.png` e `apple-touch-icon.png` (180 px) em `public/assets/logos`. Nunca apontar favicon para arquivo grande. |
| **Compartilhamento** | `og-image.jpg` 800×800 (JPG, para funcionar no WhatsApp). Toda página com `openGraph` próprio precisa repetir `images` — o `openGraph` da página substitui o do layout. |
| **Peso por página** | Referência após a otimização (out/2026): ~450 KB por página pública no celular. Se uma página passar de ~1 MB, investigar antes de publicar. |
