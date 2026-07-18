# Cícero Joias - Design System

> [!IMPORTANT]
> Este é o **único** documento de referência para o Design System. Use os tokens e padrões aqui definidos, não valores arbitrários.

> Última atualização: **18/07/2026** — fundações e Home concluídas; próximas páginas públicas documentadas na seção 10.

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

Os arquivos variáveis regular e itálico são auto-hospedados em `app/fonts/libre-caslon` com licença SIL OFL 1.1. A Cormorant Garamond e as fontes anteriores permanecem cadastradas temporariamente para páginas legadas, mas o tema público resolve `font-heading` para Libre Caslon.

---

## 3. Cores & Tokens

### Cores Principais (Marca)

| Nome | Token | Hex (Ref) | Descrição |
| :--- | :--- | :--- | :--- |
| **Esmeralda 700** | `brand-emerald-700` / `action-primary` | `#184434` | Cor primária da marca. Sofisticação e tradição. |
| **Ouro 600** | `brand-gold-600` / `action-strong` | `#C79A34` | Acentos, botões de ação e detalhes nobres. |
| **Marfim** | `brand-ivory` / `surface-page` | `#F7F5F0` | Fundo principal das seções claras. |
| **Grafite** | `brand-graphite` / `text-body` | `#2E363D` | Texto principal sobre fundos claros. |
| **Texto secundário** | `brand-text-secondary` / `text-secondary` | `#5C6B62` | Apoio, descrições e metadados. |

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
| **Cor do ícone (Serviços)** | `text-text-primary` | `group-hover:text-text-on-dark` |

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
<div className="flex flex-col gap-1 border-l-2 border-ouro/20 pl-4">
  <dt className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">Label</dt>
  <dd className="font-montserrat text-sm font-medium text-text-primary">Value</dd>
</div>
```

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

A nova aparência é ativada pela Home. Páginas que reutilizam `FinalCTASection` permanecem na variante legada até sua fase de migração.

### 4.10 Footer da Home

O footer encerra a Home em `bg-brand-emerald-950`, um tom abaixo do CTA, e preserva toda a informação da página pública atual.

| Elemento | Padrão |
| :--- | :--- |
| **Estrutura** | Duas colunas no desktop e uma no mobile: marca/serviços e contato/redes |
| **Tipografia** | Marca em `font-heading`; corpo, navegação e rótulos em `font-sans` |
| **Links** | `text-text-on-dark/75` com `hover:text-action-on-dark` |
| **Contato** | Telefone e e-mail com `min-h-control`; endereço e horário permanecem informativos |
| **Redes sociais** | Círculos de 44×44px, contorno semântico e rótulo acessível |
| **Encerramento** | Copyright em `font-numeric` e links legais separados por borda semântica |

A variante `home-dark` é selecionada no `ConditionalLayout` somente para `/`. As demais páginas públicas e páginas legais mantêm o footer legado até sua própria fase.

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

---

## 10. Estado da Migração

### 10.1 Concluído

- Fundações: primitivas oficiais, tokens semânticos, tema público isolado em `.public-theme`, Libre Caslon Text, Jost e Marcellus.
- Componentes fundamentais: `Button`, `Input`, `Textarea`, `Badge`, `Card`, `Container`, `Section` e `SectionHeading`.
- Home `/`: header, hero, confiança, serviços, alianças, portfólio, depoimentos, CTA e footer.
- Conteúdo dinâmico, Clerk, Prisma/Supabase, UploadThing, links, WhatsApp e rotas públicas existentes foram preservados.
- O ícone oficial do WhatsApp substituiu símbolos genéricos nos pontos auditados.
- A rota `/home-v2`, seus componentes e seu ativo exclusivo foram removidos definitivamente e não devem ser restaurados.
- O painel administrativo continua fora do novo tema visual.

Validação do checkpoint de 18/07/2026: ESLint, `tsc --noEmit` e build de produção concluídos; 43 páginas foram geradas com sucesso.

Commits do checkpoint:

- `495a35d` — fundações do Design System público.
- `0ef8fa9` — migração da Home.
- `e3197b1` — consistência de WhatsApp.
- `e648121` — template do pooler Supabase.
- `b7c7a89` — remoção da `/home-v2`.

### 10.2 Próxima fase: páginas públicas

Migrar uma página por vez, nesta ordem:

1. `/servicos`
2. `/servicos/aliancas-personalizadas`
3. `/servicos/consertos`
4. `/servicos/banho-de-ouro`
5. `/servicos/joias-sob-medida`
6. `/servicos/lentes-de-oculos`
7. `/portfolio` e `/portfolio/[slug]`
8. `/sobre`
9. `/pronta-entrega`
10. Páginas auxiliares; painel administrativo somente ao final

### 10.3 Regras para continuar

- A página pública atual define composição, conteúdo e comportamento; o HTML do Design System é apenas especificação visual.
- Nunca importar ou copiar `support.js` para a aplicação.
- Preservar dados dinâmicos, autenticação, uploads, links, WhatsApp e comportamento existente.
- Usar tokens semânticos e os componentes fundamentais; não criar um Design System paralelo.
- Manter o tema novo restrito ao layout público enquanto o admin não for migrado.
- Alternar seções claras e escuras quando isso melhorar o ritmo, sem sacrificar a estrutura da página original.
- Antes de substituir ou remover código, localizar referências e consumidores.
- Fazer mudanças pequenas e reversíveis, com revisão desktop/mobile.
- Ao concluir cada página: ESLint, `tsc --noEmit`, build e commit próprio; não fazer push ou deploy sem autorização.
- Não versionar `.serena/`, screenshots, previews HTML, artefatos gerados nem a pasta da especificação visual, salvo decisão explícita.
