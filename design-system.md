# DESIGN SYSTEM — CÍCERO JOIAS

## VISÃO GERAL

O Design System da **Cícero Joias** reflete a união entre **tradição** (desde 1985) e **modernidade**. A identidade visual transmite confiança, elegância e a expertise artesanal de uma oficina própria com 40 anos de história.

**Proposta Visual:**
*   **Sofisticação Acessível:** Uso de tons de **Esmeralda** (seriedade, frescor) e **Ouro** (nobreza, clássico), equilibrados com **Marfim** (leveza).
*   **Tipografia Refinada:** Combinação de fontes com serifa (Philosopher) para títulos marcantes e sans-serif (Montserrat/Jost) para legibilidade e modernidade.
*   **Elementos Orgânicos:** Uso de "blobs", luzes e brilhos sutis que remetem ao brilho das joias e metais preciosos.

---

## CORES

Valores exatos extraídos de `globals.css` e presets.

### Texto

*   **text-primary** (`#184434` / Esmeralda): Títulos, cabeçalhos e elementos de marca forte.
*   **text-secondary** (`#2E363D` / Grafite): Textos corridos, descrições e legendas.
*   **text-muted** (`#2d6854` / Esmeralda Light): Detalhes menos importantes, labels sutis.
*   **text-on-dark** (`#F5F3EE` / Marfim): Texto sobre fundos Esmeralda ou escuros.
*   **text-on-brand** (`#184434` / Esmeralda): Texto sobre fundos Ouro (para contraste máximo).

### Superfícies (Fundos)

*   **surface-page** (`#F8F5F0` / Marfim/Off-white): Fundo principal das páginas públicas.
*   **surface-section** (`#FFFFFF` / Branco): Seções alternadas ou áreas de conteúdo limpo.
*   **surface-card** (`rgba(255, 255, 255, 0.6)` / Glass): Cartões com efeito glassmorphism suave.
*   **surface-subtle** (`rgba(24, 68, 52, 0.05)` / Esmeralda Ultra-Light): Fundos de badges ou áreas de destaque leve.
*   **surface-hero** (`linear-gradient` Esmeralda): Fundo rico característico das seções Hero (ver `Preset Background Esmeralda`).

### Ações

*   **action-primary** (`#184434` / Esmeralda): Botões de navegação, ações padrão ("Ver todos").
*   **action-primary-hover** (`#04160f` / Esmeralda Dark): Estado hover de action-primary.
*   **action-strong** (`#CF9A24` / Ouro): CTAs de alta conversão ("Solicitar Orçamento", "Whatsapp").
*   **action-strong-hover** (`#B88820`): Estado hover de action-strong (90% do original).
*   **action-secondary** (`transparent`): Botões secundários (bordas ou ghost).

### Bordas

*   **border-default** (`rgba(166, 166, 166, 0.2)`): Divisores sutis.
*   **border-subtle** (`rgba(207, 154, 36, 0.3)` / Ouro Low Opacity): Bordas decorativas refinadas.
*   **border-focus** (`#CF9A24` / Ouro): Foco em inputs e elementos interativos.

---

## ESPAÇAMENTO

Sistema espacial baseado em grid de 4px (Tailwind).

*   **space-1**: 4px (`gap-1`, `p-1`) - Ajustes finos.
*   **space-2**: 8px (`gap-2`, `p-2`) - Ícones e textos.
*   **space-3**: 12px (`gap-3`, `p-3`) - Espaçamento interno compacto.
*   **space-4**: 16px (`gap-4`, `p-4`) - Padding padrão de componentes.
*   **space-6**: 24px (`gap-6`, `p-6`) - Padding de cards e containers.
*   **space-8**: 32px (`gap-8`, `p-8`) - Separação entre blocos de conteúdo.
*   **space-12**: 48px (`gap-12`, `p-12`) - Margem entre seções médias.
*   **space-16**: 64px (`gap-16`, `p-16`) - Margem vertical padrão de seções.
*   **space-20**: 80px (`gap-20`, `p-20`) - Espaçamento em Heros e áreas nobres.

---

## TIPOGRAFIA

### Famílias

*   **Títulos**: `Philosopher` (Serifada, elegante, clássica).
*   **Corpo**: `Montserrat` (Sans-serif, geométrica, moderna).
*   **UI/Labels**: `Jost` (Sans-serif, funcional, clean).

### Tamanhos

*   **text-xs**: 12px (Badges, breadcrumbs).
*   **text-sm**: 14px (Texto de apoio, botões densos).
*   **text-base**: 16px (Corpo de texto padrão).
*   **text-lg**: 18px (Lead text, introduções).
*   **text-xl**: 20px (Títulos de cards).
*   **text-2xl**: 24px (Subtítulos de seção).
*   **text-3xl**: 30px (Títulos de seção menores/mobile).
*   **text-4xl**: 36px (Títulos de seção padrão).
*   **text-5xl**: 48px (Headlines Hero).

### Pesos

*   **font-normal**: 400 (Corpo padrão).
*   **font-medium**: 500 (Links, destaques sutis).
*   **font-semibold**: 600 (Botões, subtítulos).
*   **font-bold**: 700 (Headlines, números de destaque).

---

## BORDAS E SOMBRAS

### Border Radius

*   **radius-sm**: 6px (Badges pequenos).
*   **radius-md**: 8px (Cards internos).
*   **radius-lg**: 12px (Imagens).
*   **radius-xl**: 16px (Cards de serviços).
*   **radius-2xl**: 24px (Cards grandes, containers Hero).
*   **radius-full**: 9999px (Botões, pílulas, avatares).

### Sombras

*   **shadow-sm**: `shadow-sm` (Elementos clicáveis sutis).
*   **shadow-md**: `shadow-md` (Cards padrão).
*   **shadow-card**: `0 4px 20px -4px rgba(24,68,52,0.05)` (Cards de serviço).
*   **shadow-card-hover**: `0 20px 40px -12px rgba(24,68,52,0.15)` (Elevação ao passar o mouse).
*   **shadow-button-primary**: `0 25px 45px -20px rgba(207,154,36,0.45)` (Glow dourado para CTAs).

---

## COMPONENTES (Padrões Obrigatórios)

### Botões

1.  **Primary (Padrão de Navegação)**
    *   **Bg**: `action-primary` (Esmeralda).
    *   **Texto**: `text-on-dark` (Branco/Marfim).
    *   **Radius**: `radius-full`.
    *   **Hover**: Escurece para Esmeralda Dark, leve escala.
    *   *Uso*: "Ver todos os serviços", "Conferir portfólio".

2.  **Strong (CTA de Conversão)**
    *   **Bg**: `action-strong` (Ouro).
    *   **Texto**: `text-on-brand` (Esmeralda - para contraste alto).
    *   **Radius**: `radius-full`.
    *   **Shadow**: `shadow-button-primary`.
    *   **Typography**: Uppercase, tracking espaçado (`tracking-[0.26em]`).
    *   *Uso*: "Solicitar Orçamento", "Whatsapp", Hero CTA.

3.  **Secondary (Apoio)**
    *   **Bg**: `transparent` ou `surface-card`.
    *   **Texto**: `text-primary` ou `action-strong` (dependendo do fundo).
    *   **Borda**: `border-subtle` (Ouro 50%) ou `border-default`.
    *   *Uso*: "Saiba mais", botões de filtro.

4.  **Glass Dark (Hero/Métricas)**
    *   **Bg**: `white/[0.03]` (3%).
    *   **Texto**: `white/[0.65]` (65%) -> `white` (100% hover).
    *   **Borda**: `border-white/20`.
    *   **Hover**: `border-ouro/30`, `bg-white/[0.07]`, Glow interno dourado (`bg-ouro/20` blur).
    *   **Transição**: `duration-500` (Suave).
    *   *Uso*: Ações secundárias em fundos escuros e Cards de Estatísticas (Hero).

### Cards (Serviços/Portfólio)

*   **Background**: `surface-card` (Branco com opacidade/blur se sobre imagem, sólido se sobre página).
*   **Borda**: `border-white/60` (efeito vidro) ou `border-transparent`.
*   **Radius**: `radius-xl` ou `radius-3xl` (definido no componente).
*   **Padding**: `space-6` ou `space-8`.
*   **Hover**: Transição suave (`duration-500`), sobe (`-translate-y-1`), intensifica sombra (`shadow-card-hover`) e borda (`border-esmeralda/30`).

### Badges/Tags

*   **Background**: `surface-subtle` (Esmeralda 5%) ou `bg-ouro/10`.
*   **Texto**: `text-primary` (Esmeralda) ou `text-ouro`.
*   **Radius**: `radius-full`.
*   **Typography**: Uppercase, `text-xs`, `font-bold`, `tracking-widest`.

---

## PADRÕES DE LAYOUT (Estrutura)

### 1. Sister Page Hero (Serviços/Portfólio)

Padrão para páginas internas principais.
*   **Hero Container**: `pt-10 pb-24` (centralização visual).
*   **Background**: `bg-gradient-to-br from-esmeralda via-esmeralda-dark to-esmeralda-deep`.
*   **Conteúdo Sobreposto**: A seção seguinte deve ter margem negativa para subir sobre o Hero.
    *   Classes: `-mt-16 relative z-10 rounded-t-[48px] bg-surface-page`.

### 2. Glass Cards Container

Padrão para áreas de filtro ou destaque sobre fundo claro.
*   **Container**: `bg-surface-card` + `backdrop-blur-sm`.
*   **Borda**: `border border-white/60` (efeito vidro).
*   **Sombra**: `shadow-card`.

---

## ÍCONES E ASSETS

*   **Ícones de UI**: Lucide React (Stroke 2px).
*   **Ícones Ilustrativos**: Custom SVGs (Preenchimento sólido ou duotone).
*   **Imagens**: Sempre com `object-cover` e tratamento de `overlay` gradiente quando texto sobreposto.
