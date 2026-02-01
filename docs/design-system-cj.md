# Cícero Joias - Design System

> [!IMPORTANT]
> Este é o **único** documento de referência para o Design System. Use os tokens e padrões aqui definidos, não valores arbitrários.

---

## 1. Princípios Visuais

- **Premium & Artesanal**: A estética deve refletir os 40 anos de história, usando texturas sutis (noise, luz) e fontes elegantes.
- **Glassmorphism Refinado**: Uso de desfoques (`backdrop-blur`) e transparências para criar profundidade sem perder legibilidade.
- **Mobile-First & Responsivo**: Tudo deve funcionar perfeitamente no mobile, com upscaling elegante para desktops.
- **Micro-interações**: Elementos interativos devem ter feedback visual (hover, scale, glow).

---

## 2. Tipografia

| Família | Token Tailwind | Uso |
| :--- | :--- | :--- |
| **Philosopher** | `font-philosopher` | Títulos, Headings, Ênfase de marca. |
| **Montserrat** | `font-montserrat` | Texto corrido, Descrições, Corpo. |
| **Jost** | `font-jost` | Overlines, Labels, Botões (Uppercase). |

---

## 3. Cores & Tokens

### Cores Principais (Marca)

| Nome | Token | Hex (Ref) | Descrição |
| :--- | :--- | :--- | :--- |
| **Esmeralda** | `esmeralda` / `text-primary` | `#184434` | Cor primária da marca. Sofisticação e tradição. |
| **Ouro** | `ouro` / `action-strong` | `#CF9A24` | Acentos, botões de ação e detalhes nobres. |
| **Marfim** | `marfim` / `surface-page` | `#F8F5F0` | Fundo principal da página (Light theme). |
| **Grafite** | `grafite` / `text-secondary` | `#2E363D` | Texto secundário e contrastes suaves. |

> [!TIP]
> Use sempre os tokens semânticos (`bg-surface-page`, `text-primary`) em vez dos nomes das cores.

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
<div className="group relative 
  bg-surface-section rounded-xl 
  border border-ouro/15 
  shadow-card
  transition-all duration-500
  hover:border-ouro/50 hover:shadow-card-hover hover:-translate-y-1"
>
  {/* Glow decorativo opcional */}
  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-ouro/20 rounded-full blur-3xl 
    opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  
  {/* Conteúdo */}
</div>
```

| Propriedade | Base | Hover |
| :--- | :--- | :--- |
| **Borda** | `border-ouro/15` | `hover:border-ouro/50` |
| **Sombra** | `shadow-card` | `hover:shadow-card-hover` |
| **Elevação** | - | `hover:-translate-y-1` |
| **Transição** | `duration-500` | - |
| **Glow** | `opacity-0` | `group-hover:opacity-100 duration-700` |

---

### 4.5 Badge / Tag de Seção

```tsx
<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-lg">
  <Star className="w-3 h-3 text-ouro fill-ouro" />
  <span className="font-jost text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ouro/90">
    Texto do Badge
  </span>
</div>
```

| Elemento | Token/Valor |
| :--- | :--- |
| **Borda** | `border-white/10` |
| **Background** | `bg-white/5` + `backdrop-blur-md` |
| **Texto** | `font-jost` uppercase `tracking-[0.2em]` |
| **Ícone** | `<Star>` size 3 (`w-3 h-3`) preenchido |

| **Ícone** | `<Star>` size 3 (`w-3 h-3`) preenchido |

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
<div className="flex flex-col gap-1 border-l-2 border-ouro/20 pl-4">
  <dt className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">Label</dt>
  <dd className="font-montserrat text-sm font-medium text-text-primary">Value</dd>
</div>
```

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
| **Links / Micro-interações** | `duration-300` | Links de texto, ícones pequenos |
| **Botões / Cards** | `duration-500` | CTAs, cards, elementos principais |
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
| `shadow-card-hover` | Sombra mais projetada para hover |
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

- **Visual Resultante**: 4rem de respiro em cima e embaixo.

---

### 8. Loading States (Novo Padrão)

Para manter a consistência e a percepção de performance premium, usamos um único componente: `<LoadingScreen />`.
**IMPORTANTE**: Sempre forneça uma mensagem contextual na *prop* `message` (ex: "Carregando usuários...", "Salvando alterações...").

### 8.1 Fullscreen Loading (Transição de Páginas)

Usado em `app/loading.tsx` e `app/admin/loading.tsx`. Fundo sólido (Esmeralda Deep) para evitar "piscar" de conteúdo branco.

```tsx
<LoadingScreen variant="fullscreen" message="Carregando..." />
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
- [ ] Botões CTA têm `<ArrowRight>` com `group-hover:translate-x-1`
- [ ] Botões CTA estão envoltos em `motion.a/div` com `scale: 1.02 / 0.98`
- [ ] Hover de botões usa `hover:bg-action-strong/90` (escurece, não clareia)
- [ ] Sombras usam tokens (`shadow-button-primary`, `shadow-card`)
- [ ] Transições de botões usam `duration-500`
- [ ] Transições de links usam `duration-300`
- [ ] Animação de seta usa `translate-x-1` (não `translate-x-2`)
- [ ] Cards têm `hover:-translate-y-1` e `hover:border-ouro/50`
