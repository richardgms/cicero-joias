# Style Presets - Cícero Joias

Este documento contém presets de estilo reutilizáveis para o projeto Cícero Joias. Use estes presets para manter consistência visual em todo o site.

---

## Preset Background Esmeralda

Background escuro e elegante com gradiente esmeralda e overlays dourados/brancos sutis. Ideal para seções de destaque que precisam de contraste alto com texto marfim.

### Composição

O preset consiste em 3 camadas:

1. **Gradiente base**: Transição diagonal do verde esmeralda claro para o verde escuro/preto
2. **Overlay dourado (topo)**: Glow sutil de ouro no topo, criando sofisticação
3. **Overlay branco (inferior)**: Glow branco discreto no canto inferior esquerdo para profundidade

### Código Completo

```tsx
{/* Preset Background Esmeralda */}
<section className="relative overflow-hidden bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#0b1f18] py-10 sm:py-16 text-marfim">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]" />
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

  {/* Seu conteúdo aqui */}
</section>
```

### Classes Individuais

Para usar apenas camadas específicas:

```tsx
// Gradiente base esmeralda escuro
className="bg-gradient-to-br from-esmeralda via-esmeralda-dark to-[#0b1f18]"

// Overlay glow dourado (topo central)
className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.15),transparent_50%)]"

// Overlay glow branco (canto inferior esquerdo)
className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_40%)]"
```

### Quando Usar

✅ **Recomendado para:**
- Seções hero de serviços
- Seções de diferenciais/benefícios
- FAQs e seções informativas
- Áreas que precisam de alto contraste com texto claro

❌ **Evitar em:**
- Áreas com muitas imagens coloridas (pode conflitar)
- Seções que já têm background de imagem forte
- Mobile quando há background de imagem (usar overlay adaptado)

### Cores do Projeto

Referência das cores usadas no preset:

```css
/* Tailwind config */
esmeralda: '#184434'         /* Verde principal */
esmeralda-dark: '#0f2b21'    /* Verde escuro */
esmeralda-light: '#2d6854'   /* Verde claro */
#0b1f18: Preto esverdeado    /* Tom mais escuro */

ouro: '#CF9A24'              /* Dourado (usado no overlay) */
marfim: '#F5F3EE'            /* Texto sobre o fundo escuro */
```

### Variações

#### Variação Mais Clara
Para um fundo menos intenso, ajuste o gradiente base:

```tsx
className="bg-gradient-to-br from-esmeralda-light via-esmeralda to-esmeralda-dark"
```

#### Variação Com Mais Dourado
Para destacar ainda mais o overlay dourado:

```tsx
className="bg-[radial-gradient(circle_at_50%_0%,rgba(207,154,36,0.25),transparent_50%)]"
```

### Exemplos no Projeto

Este preset está sendo usado em:

- `/components/services/banho-ouro/hero-section.tsx` (desktop)
- `/components/services/banho-ouro/differentials-section.tsx`
- `/components/services/banho-ouro/faq-section.tsx`
- `/components/home/hero-section.tsx` (overlays adicionais)
- `/components/home/portfolio-preview-section.tsx` (seção Nossos Trabalhos)
- `/components/home/final-cta-section.tsx` (seção CTA Final)

### Acessibilidade

- **Contraste**: Garante WCAG AAA com texto marfim (#F5F3EE)
- **Legibilidade**: Fundo escuro facilita leitura de textos longos
- **Overlays sutis**: Não interferem na percepção de elementos interativos

---

## Preset Botão Principal (CTA Primário)

Botão de call-to-action primário com background dourado sólido, shadow elegante e animação suave. Ideal para ações principais e conversões.

### Composição

O preset consiste em:

1. **Estilo visual**: Background dourado sólido, texto verde esmeralda, shadow proeminente
2. **Animação hover**: Movimento suave 3px para direita usando Framer Motion
3. **Feedback tap**: Leve redução de escala (0.97) ao clicar
4. **Background hover**: Escurecimento do dourado (90% opacidade)
5. **Ícone animado**: ArrowRight com animação própria no grupo

### Código Completo

```tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

<motion.a
  href="/link-destino"
  target="_blank"
  rel="noopener noreferrer"
  className="font-jost group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ouro px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)] transition-colors hover:bg-ouro/90 sm:w-auto"
  whileHover={{ x: 3 }}
  whileTap={{ scale: 0.97 }}
>
  Texto do Botão
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</motion.a>
```

### Classes Detalhadas

Breakdown de cada classe usada:

```tsx
// Tipografia
font-jost                    // Fonte Jost (clean e moderna)
text-sm                      // Tamanho 14px
font-semibold                // Peso 600
uppercase                    // Texto em maiúsculas
tracking-[0.26em]            // Letter-spacing aumentado (elegância)

// Layout
inline-flex                  // Inline flex container
w-full sm:w-auto             // Full width mobile, auto desktop
items-center justify-center  // Centralização vertical e horizontal
gap-2                        // Espaço entre texto e ícone
group                        // Grupo para animações coordenadas

// Visual
rounded-full                 // Bordas completamente arredondadas
bg-ouro                      // Background dourado sólido (#CF9A24)
px-6 py-3                    // Padding horizontal 24px, vertical 12px
text-esmeralda               // Texto verde esmeralda (#184434)
shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)]  // Shadow dourado elegante

// Interação
transition-colors            // Transição suave de cores
hover:bg-ouro/90             // Background dourado escurecido no hover
```

### Animações Framer Motion

```tsx
// Hover: movimento para direita
whileHover={{ x: 3 }}

// Tap/Click: leve redução de escala
whileTap={{ scale: 0.97 }}
```

### Ícone com Animação

```tsx
<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
```

**Explicação:**
- `h-4 w-4`: Tamanho 16x16px
- `transition-transform`: Transição suave da transformação
- `group-hover:translate-x-1`: Move 4px para direita quando o grupo (botão) recebe hover

### Quando Usar

✅ **Recomendado para:**
- Ação principal de conversão (ex: "Solicitar orçamento", "Comprar agora")
- CTAs em seções hero
- Formulários de contato/lead
- Primeira ação que você quer que o usuário tome

❌ **Evitar em:**
- Múltiplas ações na mesma seção (use apenas 1 botão principal)
- Ações secundárias ou informativas (use botão secundário)
- Em backgrounds muito claros sem contraste

### Variações

#### Variação Maior (Large)
Para mais destaque:

```tsx
className="... px-8 py-4 text-base ..."
```

#### Variação Menor (Small)
Para uso mais discreto:

```tsx
className="... px-4 py-2 text-xs tracking-[0.3em] ..."
whileHover={{ x: 2 }}  // Movimento menor
```

#### Variação Sem Ícone
Para textos mais longos:

```tsx
<motion.a className="...">
  Texto do Botão Mais Longo
</motion.a>
```

#### Variação Modo Claro (Invertido)
Para usar em backgrounds claros:

```tsx
className="... bg-esmeralda text-marfim hover:bg-esmeralda/90 shadow-[0_25px_45px_-20px_rgba(24,68,52,0.45)] ..."
```

#### Variação Com Ícone Diferente
Para diferentes contextos:

```tsx
import { Send, Download, Phone } from 'lucide-react';

// Enviar
<Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />

// Download
<Download className="h-4 w-4 transition-transform group-hover:translate-y-1" />

// Telefone
<Phone className="h-4 w-4 transition-transform group-hover:scale-110" />
```

### Hierarquia de Botões

Combine com o botão secundário para criar hierarquia clara:

```tsx
<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
  {/* Botão Principal - Ação primária */}
  <motion.a className="... bg-ouro text-esmeralda ...">
    Ação Principal
    <ArrowRight />
  </motion.a>

  {/* Botão Secundário - Ação complementar */}
  <motion.a className="... border border-ouro/50 text-ouro/90 ...">
    Ação Secundária
  </motion.a>
</div>
```

### Shadow Customizada

A shadow é crucial para o efeito premium:

```css
shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)]
```

**Breakdown:**
- `0`: Offset horizontal (centralizado)
- `25px`: Offset vertical (para baixo)
- `45px`: Blur radius (suavidade)
- `-20px`: Spread radius (compacta a sombra)
- `rgba(207,154,36,0.45)`: Cor dourada com 45% opacidade

### Exemplos no Projeto

Este preset está sendo usado em:

- `/components/services/banho-ouro/hero-section.tsx` - Botão "Solicitar orçamento"
- Pode ser copiado para outros CTAs principais em páginas de serviços

### Acessibilidade

- **Contraste**: WCAG AAA com texto esmeralda (#184434) em fundo dourado (#CF9A24)
- **Área de toque**: 48px de altura (py-3) atende requisitos mobile WCAG
- **Feedback visual**: Animações claras indicam interatividade
- **Foco**: Elementos `<a>` mantêm outline padrão para navegação por teclado
- **Hierarquia visual**: Shadow e cores destacam como ação principal

### Performance

- **Framer Motion**: Animações otimizadas com GPU acceleration
- **Transition**: Apenas `colors` para performance (não `all`)
- **Transform**: Hardware accelerated (translate, scale)

### Dependências

```bash
npm install framer-motion lucide-react
```

```tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
```

---

## Preset Botão CTA Secundário

Botão de call-to-action secundário com borda dourada, animação suave de movimento e feedback visual. Ideal para ações complementares ao CTA principal.

### Composição

O preset consiste em:

1. **Estilo visual**: Borda dourada translúcida, sem background sólido, texto dourado
2. **Animação hover**: Movimento suave 3px para direita usando Framer Motion
3. **Feedback tap**: Leve redução de escala (0.97) ao clicar
4. **Transição de cores**: Transição suave com `transition-colors`
5. **Background hover**: Overlay dourado muito sutil (10% opacidade)

### Código Completo

```tsx
import { motion } from 'framer-motion';

<motion.a
  href="/link-destino"
  target="_blank"
  rel="noopener noreferrer"
  className="font-jost inline-flex w-full items-center justify-center gap-2 rounded-full border border-ouro/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-ouro/90 transition-colors hover:bg-ouro/10 sm:w-auto"
  whileHover={{ x: 3 }}
  whileTap={{ scale: 0.97 }}
>
  Texto do Botão
</motion.a>
```

### Classes Detalhadas

Breakdown de cada classe usada:

```tsx
// Tipografia
font-jost                    // Fonte Jost (clean e moderna)
text-sm                      // Tamanho 14px
font-semibold                // Peso 600
uppercase                    // Texto em maiúsculas
tracking-[0.26em]            // Letter-spacing aumentado (elegância)

// Layout
inline-flex                  // Inline flex container
w-full sm:w-auto             // Full width mobile, auto desktop
items-center justify-center  // Centralização vertical e horizontal
gap-2                        // Espaço entre ícone/texto

// Visual
rounded-full                 // Bordas completamente arredondadas
border border-ouro/50        // Borda dourada 50% opacidade
px-6 py-3                    // Padding horizontal 24px, vertical 12px
text-ouro/90                 // Texto dourado 90% opacidade

// Interação
transition-colors            // Transição suave de cores
hover:bg-ouro/10             // Background dourado 10% no hover
```

### Animações Framer Motion

```tsx
// Hover: movimento para direita
whileHover={{ x: 3 }}

// Tap/Click: leve redução de escala
whileTap={{ scale: 0.97 }}
```

### Quando Usar

✅ **Recomendado para:**
- Ações secundárias ao lado de um CTA principal
- Links informativos importantes (ex: "Saiba mais", "Tirar dúvidas")
- Botões de navegação alternativa
- Ações complementares em seções hero

❌ **Evitar em:**
- Como único CTA na página (use botão primário)
- Em backgrounds muito claros (baixo contraste)
- Quando precisa de maior destaque visual

### Variações

#### Variação Maior (Large)
Para mais destaque:

```tsx
className="... px-8 py-4 text-base ..."
```

#### Variação Menor (Small)
Para uso mais discreto:

```tsx
className="... px-4 py-2 text-xs tracking-[0.3em] ..."
```

#### Variação com Ícone
Adicione um ícone para reforçar a ação:

```tsx
import { ArrowRight } from 'lucide-react';

<motion.a className="... gap-2 ...">
  Texto do Botão
  <ArrowRight className="h-4 w-4" />
</motion.a>
```

#### Variação Borda Verde (para fundos claros)
Para usar em backgrounds claros:

```tsx
className="... border-esmeralda/50 text-esmeralda/90 hover:bg-esmeralda/10 ..."
```

### Preset Botão CTA Primário

Para referência, o botão primário complementar a este preset:

```tsx
<motion.a
  href="/link-destino"
  className="font-jost group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ouro px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-esmeralda shadow-[0_25px_45px_-20px_rgba(207,154,36,0.45)] transition-colors hover:bg-ouro/90 sm:w-auto"
  whileHover={{ x: 3 }}
  whileTap={{ scale: 0.97 }}
>
  Ação Principal
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</motion.a>
```

**Diferenças do Primário:**
- Background sólido dourado (vs. transparente com borda)
- Texto verde esmeralda (vs. dourado)
- Shadow proeminente (vs. sem shadow)
- Hover escurece o fundo (vs. adiciona overlay)
- Ícone com animação própria no grupo

### Exemplos no Projeto

Este preset está sendo usado em:

- `/components/services/banho-ouro/hero-section.tsx` - Botão "Tirar dúvidas"
- Pode ser copiado para outros CTAs secundários em páginas de serviços

### Acessibilidade

- **Contraste**: WCAG AA+ com texto dourado em fundos escuros
- **Área de toque**: 48px de altura (py-3 + border) atende requisitos mobile
- **Feedback visual**: Animações claras indicam interatividade
- **Foco**: Elementos `<a>` mantêm outline padrão para navegação por teclado

### Dependências

```bash
npm install framer-motion
```

```tsx
import { motion } from 'framer-motion';
```

---

## Como Adicionar Novos Presets

Ao criar um novo preset de estilo:

1. Documente o propósito e contexto de uso
2. Forneça código completo e classes individuais
3. Liste onde está sendo usado no projeto
4. Adicione considerações de acessibilidade
5. Inclua variações comuns se aplicável
