# Home Redesign - Etapa 8 · QA, Lançamento & Monitoramento

## 1. QA antes do lançamento
- **Funcionalidade:**
  - Testar formulários (envio, validação, LGPD) em desktop/mobile.
  - Verificar navegação dos carrosséis e botões (hero, depoimentos, CTA final).
  - Garantir que fallback estático do portfólio renderiza sem API.
- **Conteúdo:**
  - Revisar ortografia, acentuação e consistência de tom em toda a página.
  - Conferir se pessoais/serviços citados estão atualizados e autorizados.
  - Validar que as provas sociais têm fonte e estão atualizadas.
- **Performance:**
  - Lighthouse ≥90 (mobile/desktop), Core Web Vitals (LCP ≤2.5s, CLS ≤0.1).
  - Checar tamanho das imagens e regras de lazy-load.
- **Acessibilidade:**
  - Audit com Lighthouse + checklist manual (aria-labels, foco visível, contraste).
  - Teste com leitor de tela (NVDA/VoiceOver) em trechos críticos.
- **Responsividade:**
  - Verificar em 320, 375, 768, 1024, 1440px e zoom 80–125%.
  - Garantir que sticky WhatsApp (se implementado) não cobre CTAs.

## 2. Checklist de deploy
1. Branch `feature/home-redesign` sincronizada com `main`.
2. Code review aprovado por Design, Marketing e Engenharia.
3. Build/testes automatizados verdes (`npm run lint`, `npm run build`).
4. Checklist Etapas 6 e 7 marcados.
5. Criar release notes destacando mudanças e riscos.
6. Deploy em staging → testes de fumaça → aprovação final.
7. Deploy em produção fora do horário de pico (preferência manhã).
8. Plano de rollback: manter versão anterior preparada (tag ou release). Se métricas críticas caírem 20% ou houver bugs, reverter em até 30 min.

## 3. Monitoramento pós-lançamento
- **Primeiras 24h:**
  - Confirmar recebimento de leads e notificações internas.
  - Validar eventos GA4/Pixel (debugView).
  - Monitorar uptime/erros via logs.
- **Primeira semana:**
  - Comparar CTR de CTAs e conversões com baseline.
  - Recolher feedback de time comercial e alguns clientes.
  - Ajustar copy/posicionamento se surgirem objeções novas.
- **Primeiro mês:**
  - Relatório de desempenho (leads, tempo na página, scroll depth).
  - Priorizar otimizações A/B planejadas.
  - Atualizar provas sociais (cases/depoimentos) conforme novos dados.

## 4. Documentação e handoff
- Atualizar Confluence/Notion com links para arquivos, assets e decisões.
- Inserir checklist e métricas no repositório (`docs/home-redesign/README.md`).
- Agendar retrospectiva com stakeholders para identificar lições aprendidas e backlog futuro.

---
**Status final:** todas as etapas planejadas (1 a 8) concluídas e documentadas; projeto pronto para QA, lançamento e acompanhamento contínuo.
