---
id: plan-002
title: Implementação de Acesso ao Banco de Dados com Prisma
createdAt: 2025-06-06
author: Richard
status: in-progress
---

## 🧩 Escopo

Migrar a aplicação Cícero Joias de dados simulados (mock) para um banco de dados PostgreSQL real usando Prisma ORM. O sistema deve armazenar e recuperar dados de clientes, orçamentos, pedidos e produtos de forma eficiente e segura, garantindo que todas as funcionalidades existentes continuem operando sem interrupções.

## ✅ Requisitos Funcionais

- Implementar acesso ao banco de dados para todas as entidades do sistema (clientes, pedidos, orçamentos, produtos)
- Criar APIs RESTful para operações CRUD em todas as entidades
- Implementar autenticação e autorização baseada em papéis (admin, cliente)
- Migrar todos os dados mock existentes (se existirem) para o banco de dados
- Implementar validação de dados nas operações de escrita
- Criar funcionalidade de busca e filtragem nos dados
- Implementar paginação nas listagens de dados
- Desenvolver sistema de logs para rastreamento de atividades

## 📚 Diretrizes & Pacotes

### Diretrizes
- Seguir o padrão de Repository Pattern para acesso ao banco de dados
- Implementar validação de dados com Zod
- Utilizar Server Components do Next.js 15 para consultas diretas ao banco
- Implementar tratamento de erros centralizado
- Seguir os princípios SOLID no desenvolvimento
- Documentar todas as APIs e modelos de dados
- Utilizar TanStack Query v5 para gerenciamento de estado e cache no frontend

### Pacotes
- **@prisma/client**: ORM para comunicação com banco de dados (MIT)
- **bcryptjs**: Criptografia de senhas (MIT)
- **jose**: Manipulação de JWT (MIT)
- **@tanstack/react-query**: Gerenciamento de estado e cache (MIT)
- **@tanstack/react-query-devtools**: Ferramentas de desenvolvimento para debug (MIT)

# 🔢 Plano de Execução

## Fase 1: Configuração Básica
- [ ] Resolver o problema do arquivo `.env` com a URL de conexão do Supabase
- [ ] Executar `npx prisma generate` para gerar o cliente Prisma
- [ ] Implementar a configuração do cliente Prisma em `lib/prisma.ts` (singleton)
- [ ] Configurar TanStack Query Provider e DevTools

## Fase 2: Implementação de Repositórios
- [ ] Criar pasta `repositories` dentro de `lib`
- [ ] Implementar repositório base com operações CRUD genéricas
- [ ] Criar repositórios específicos para cada entidade:
  - [ ] Cliente
  - [ ] Pedido
  - [ ] Produto

## Fase 3: APIs e Server Components
- [ ] Desenvolver APIs REST em `app/api` para cada entidade
- [ ] Implementar validação de entrada nas APIs
- [ ] Criar componentes de servidor que usam os repositórios diretamente
- [ ] Implementar hooks personalizados com TanStack Query para cada entidade

## Fase 4: Autenticação Básica
- [ ] Configurar modelo de usuário e autenticação
- [ ] Implementar login e proteção de rotas
- [ ] Integrar gerenciamento de estado de autenticação com TanStack Query

## Fase 5: Integração com Frontend
- [ ] Atualizar componentes do frontend para usar dados reais via TanStack Query
- [ ] Implementar formulários com validação
- [ ] Adicionar feedback visual de operações
- [ ] Configurar cache e invalidação de queries

## Fase 6: Testes e Refinamentos
- [ ] Testar todos os fluxos de dados
- [ ] Implementar tratamento de erros
- [ ] Otimizar consultas ao banco de dados
- [ ] Configurar estratégias de cache e revalidação

> Este plano é direto e focado, permitindo implementar o acesso ao banco de dados com Prisma e gerenciamento de estado com TanStack Query de maneira organizada e modular.