# Home Redesign - Etapa 5 · Implementação Front-end

## 1. Prioridades de implementação
1. **Atualizar estrutura do Hero**
   - Aplicar nova headline/subheadline e CTAs conforme Etapa 2.
   - Ajustar background para versão otimizada (desktop/mobile) e remover partículas pesadas em mobile.
2. **Refatorar seção de diferenciais**
   - Consolidar cards para 3–4 blocos com copy curta.
   - Reutilizar componente de card com altura equalizada e microprovas.
3. **Simplificar processo em 4 etapas**
   - Implementar timeline responsiva (horizontal desktop, vertical mobile).
   - Incluir prazos médios e CTA único ao final.
4. **Portfólio com cases fixos**
   - Garantir fallback estático caso API não retorne dados.
   - Incluir mini-storytelling (desafio → solução → resultado) com imagem otimizada.
5. **Depoimentos enxutos**
   - Ajustar carrossel para frases curtas, remover métricas redundantes.
   - Garantir acessibilidade: navegação por teclado e aria-labels.
6. **CTA final**
   - Formulário simplificado + botão WhatsApp, reforço de escassez e badges.
   - Validar integração com rastreamento (GA/Pixel) nos botões.

## 2. Backlog técnico sugerido
| Tarefa | Arquivos/componentes | Observações |
| --- | --- | --- |
| Refatorar HeroSection | `components/home/hero-section.tsx`, assets em `/public/assets` | Revisar useEffect/particles; garantir SSR-safe. |
| Atualizar FeaturesSection | `components/home/features-section.tsx` | Usar arrays agrupados (diferenciais) + microcopy. |
| Criar componente `ProcessTimeline` | Novo arquivo em `components/home` | Reaproveitar `GlassCard` onde fizer sentido; definir props para etapas. |
| Ajustar PortfolioPreview | `components/home/portfolio-preview.tsx` | Adicionar fallback estático e otimizar fetch com SWR ou `useEffect` seguro. |
| Revisar TestimonialsSection | `components/home/testimonials-section.tsx` | Limitar texto e garantir Embla configurado com aria. |
| Reconstruir CTASection | `components/home/cta-section.tsx` | Simplificar copy, dois CTAs principais, badges revisados. |
| Novos dados/constantes | `components/home/constants.ts` (sugerido) | Centralizar textos/dados reutilizados (40 anos, garantia etc.). |
| Estilos utilitários | `globals.css` ou tailwind config | Verificar tokens para cores/gradientes consistentes. |

## 3. Validação e testes
- **Visual**: comparar com wireframe (Etapa 3) em breakpoints principais (320, 768, 1024, 1440px).
- **Funcional**: testar CTAs (links, formulários, WhatsApp) incluindo tracking.
- **Performance**: Lighthouse ≥90 mobile/desktop; verificar carregamento de imagens e bundle.
- **Acessibilidade**: focus states visíveis, landmarks adequados, aria-labels em carrosséis.
- **Responsividade**: revisar comportamento dos grids/cards em zoom 80%–125%.
- **Cross-browser**: Chrome, Safari (iOS), Edge.
- **QA de conteúdo**: confirmar copy final sem caracteres quebrados, revisar ortografia.

## 4. Planejamento de deploy
1. Implementar em branch dedicada (`feature/home-redesign`).
2. Criar PR com checklist das etapas acima e screenshots dos principais breakpoints.
3. Solicitar revisão de design/comercial.
4. Após aprovação, rodar testes automatizados (lint, build). Resolver regressões.
5. Deploy escalonado (staging → produção) com monitoramento de métricas.
6. Revisar analytics 1 semana após lançamento para comparar KPIs.

---
**Próximo passo (Etapa 6):** reforçar prova social e confiança com novos depoimentos, selos e dados aprofundados antes do go-live definitivo.
