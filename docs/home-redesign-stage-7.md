# Home Redesign - Etapa 7 · Jornada de Conversão & CTAs

## 1. Hierarquia de CTAs e jornada
1. **CTA primário (Agendar consultoria)**
   - Aparece na dobra inicial, após a seção de processo e no CTA final.
   - Sempre estilo sólido/gradiente, texto consistente.
2. **CTA secundário (Conversar no WhatsApp)**
   - Posicionado na dobra inicial (link discreto), CTA final (botão outline) e nos micro cards de suporte.
3. **CTA terciário (Ver portfólio / casos)**
   - Link em hero, seção de portfólio e depoimentos (caso completo). Estilo texto ou ícone seta.
4. **Jornada esperada:**
   - Hero → Diferenciais/Processo → Provas (portfólio/depoimentos) → CTA final com formulário.
   - Para visitantes quentes: CTA WhatsApp disponível em todo o scroll (sticky no mobile opcional).

## 2. Formulários e integrações
- **Formulário principal (CTA final):** campos sugeridos
  - Nome completo
  - E-mail
  - WhatsApp
  - Tipo de projeto (selecionar: alianças, joia personalizada, restauração, outro)
  - Mensagem/descrição breve
- **Requisitos:**
  - Validação de campos com feedback acessível.
  - Máscara para telefone (DDD obrigatório).
  - Consentimento LGPD (checkbox “Aceito receber contato da Cícero Joias”).
  - Integração com CRM ou planilha (via webhook/API) + tag “Lead Home”.
  - Envio automático de e-mail de confirmação para lead e notificação interna.
- **WhatsApp CTA:** usar link com parâmetro UTM (`?text=Ol%C3%A1,+vi+o+site+...`) para rastreamento.

## 3. Microcopy e mensagens de urgência
- Banner CTA final: “Agenda limitada a X projetos simultâneos. Garanta seu horário.”
- Mensagem pós-envio de formulário: “Recebemos sua ideia! Um especialista retorna em até 2 horas úteis.”
- Tooltip opcional na seção de processo: “Nossas vagas esgotam rápido em meses de alta demanda (nov/mai).”

## 4. Monitoramento e otimização
- **Eventos GA4/Pixel:**
  - `cta_agendar_consultoria_click`
  - `cta_whatsapp_click`
  - `form_submission_home`
- **Funil em analytics:**
  - Scroll depth (50%/75%)
  - Clique em portfólio/depoimento
  - Submissão de formulário
- **Feedback qualitativo:**
  - Campo “Como nos encontrou?” no formulário (opcional).
  - Tags no CRM para leads oriundos do site.
- **Testes pós-lançamento:**
  - A/B de ordenação das seções (Diferenciais vs Processo).
  - Teste de variação no CTA secundário (“Falar com especialista” vs “Conversar no WhatsApp”).
  - Avaliar sticky button no mobile (WhatsApp) após 30 dias com base em métricas.

## 5. Checklist antes do go-live
- [ ] Todos os CTAs utilizam textos e estilos consistentes conforme hierarquia.
- [ ] Formulário envia dados ao CRM e e-mails de confirmação corretamente.
- [ ] Links de WhatsApp incluem UTMs e abrem em nova aba.
- [ ] Notificações internas configuradas (e-mail/Slack) para novos leads.
- [ ] Consentimento LGPD armazenado junto ao lead.
- [ ] Eventos GA4 validados via preview/debug.
- [ ] Plano de testes A/B documentado com hipóteses e sucesso esperado.

---
**Próximo passo (Etapa 8):** realizar QA completo, publicar em staging/produção e monitorar resultados conforme os KPIs definidos.
