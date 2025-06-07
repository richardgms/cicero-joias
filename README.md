# Cícero Joias - Sistema de Gestão de Joalheria

Este é um sistema de gestão para joalheria, desenvolvido com Next.js 15, TypeScript, Tailwind CSS e Prisma ORM.

## Tecnologias Utilizadas

- **Next.js 15**: Framework React com renderização híbrida
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Prisma ORM**: ORM para acesso ao banco de dados PostgreSQL

## Configuração do Banco de Dados

O projeto utiliza Prisma ORM para interagir com o banco de dados PostgreSQL. Para configurar:

1. Crie um arquivo `.env` na raiz do projeto com a URL de conexão ao PostgreSQL:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/cicerojoias"
```

2. Execute as migrações do Prisma:
```
npx prisma migrate deploy
```

3. Gere o cliente Prisma:
```
npx prisma generate
```

## Estrutura do Projeto

```
/app            # Rotas e páginas da aplicação (Next.js App Router)
/components     # Componentes React reutilizáveis
/lib            # Utilitários e configurações
  /prisma.ts    # Configuração do cliente Prisma
/prisma         # Configuração do Prisma ORM
  /schema.prisma # Definição do schema do banco de dados
/docs           # Documentação do projeto
  /prisma-guide.md # Guia de uso do Prisma ORM
```

## Documentação

- [Guia do Prisma ORM](./docs/prisma-guide.md): Instruções detalhadas sobre como usar o Prisma no projeto

## Executando o Projeto

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Construir para produção
npm run build

# Executar em produção
npm start
```

## Funcionalidades

- Gestão de clientes
- Controle de orçamentos
- Gerenciamento de pedidos
- Acompanhamento de status de serviços
- Portfólio de produtos e serviços

## Informações Técnicas

- **Framework**: Next.js 15
- **UI**: Tailwind CSS + Shadcn/UI
- **Linguagem**: TypeScript
- **Deploy**: Export estático

## Instruções de Desenvolvimento

### Requisitos

- Node.js 18.17.0 ou superior

### Comandos

```bash
# Instalação de dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm start
```

## Atualizações

- **Outubro 2024**: Atualizado para Next.js 15 com suporte a React 19

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/richardgms/cicerojoias)