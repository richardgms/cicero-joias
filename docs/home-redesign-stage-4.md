# Home Redesign - Etapa 4 · Produção de Ativos & UX Micro

## 1. Produção de conteúdo visual e textual
| Seção | Entregas necessárias | Responsável sugerido | Prazo recomendado |
| --- | --- | --- | --- |
| Hero | Foto hero (desktop/mobile), headline refinada, badge de credencial, CTA copy final | Fotógrafo/Designer + Redator | 7 dias |
| Provas rápidas | Ícones customizados, microcopy (≤40 caracteres), dados de comprovação | UI Designer + Redator | 5 dias |
| Diferenciais | Textos dor/benefício validados, fotos de bastidores ou render 3D, estatísticas | Redator + Marketing | 7 dias |
| Processo | Ícones/ilustrações, cronograma visual, prazos médios confirmados | UI Designer + Produção | 6 dias |
| Portfólio | 3 estudos de caso (fotos, narrativa, resultado), CTA “Ver mais” | Marketing + Fotografia | 10 dias |
| Depoimentos | Versões curtas (≤140 caracteres), fotos autorizadas, cargo/contexto | Comercial + Redator | 5 dias |
| FAQ | 3 perguntas/respostas aprovadas, link para atendimento | Comercial + Redator | 3 dias |
| CTA final | Formulário (campos definidos), texto de urgência, badges (selos) | Produto + Design | 5 dias |

**Checklist de revisão de conteúdo:**
- Aprovação de direitos de uso de todas as imagens.
- Conferência ortográfica/acentuação antes da implementação.
- Dados e métricas validados pelo time de operações.

## 2. Microinterações e performance
**Animações:**
- Hero: transição suave de opacidade na imagem + fade-in do texto (0.6s). Evitar partículas pesadas no mobile.
- Provas rápidas: hover com leve elevação (+4px) e mudança de cor de ícone.
- Diferenciais/Processo: utilizar `framer-motion` com delays curtos (≤120ms) para não comprometer performance.
- Carrosséis (depoimentos/portfólio mobile): autoplay opcional, pausa ao receber foco/hover, setas somente em desktop.

**Performance & Acessibilidade:**
- Imagens otimizadas (WebP/AVIF), lazy-load abaixo da dobra.
- Garantir contraste mínimo 4.5:1 em textos.
- Teclado: todos CTAs e carrosséis navegáveis com tab/enter.
- Prefetch leve dos links principais (`/portfolio`, `/orcamento`).

## 3. Workflow de colaboração
1. **Kick-off interno** (Design, Marketing, Comercial): alinhar responsabilidades e prazos.
2. **Produção**: cada responsável entrega conteúdo em pasta compartilhada (`/content/home-redesign/etapa4`).
3. **Revisão 1** (Redator + Comercial): ajustar tone of voice e dados.
4. **Revisão 2** (Design Lead + Produto): validar consistência visual e UX.
5. **Handoff**: designer entrega arquivos Figma + assets exportados + especificações (spacing, estados de hover).
6. **Checklist final**: aplicar lista da Etapa 3 antes de iniciar implementação.
7. **Aprovação**: CEO/Stakeholder assina a versão final para seguir com desenvolvimento.

---
**Próximo passo (Etapa 5):** iniciar ajustes no front-end com base no wireframe e nos ativos produzidos, garantindo que as diretrizes de UX/Acessibilidade sejam respeitadas.
