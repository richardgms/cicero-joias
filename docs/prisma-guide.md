# Guia de Uso do Prisma ORM no Projeto Cícero Joias

Este guia explica como utilizar o Prisma ORM para interagir com o banco de dados PostgreSQL no projeto Cícero Joias.

## O que é o Prisma?

Prisma é um ORM (Object-Relational Mapping) moderno para Node.js e TypeScript que simplifica o acesso ao banco de dados com:

- **Type Safety**: Todas as consultas são totalmente tipadas, oferecendo autocompletion no editor.
- **Declarativo**: Substitui consultas SQL complexas por métodos simples e intuitivos.
- **Migrations**: Gerencia alterações no esquema do banco de dados de forma segura.

## Estrutura do Prisma no Projeto

- **prisma/schema.prisma**: Define todos os modelos de dados e relacionamentos.
- **lib/prisma.ts**: Configuração do cliente Prisma (singleton para evitar múltiplas conexões).

## Principais Modelos de Dados

O projeto utiliza os seguintes modelos principais:

- **User**: Usuários do sistema (admin, cliente)
- **Client**: Clientes da joalheria
- **Order**: Pedidos e serviços
- **QuoteRequest**: Solicitações de orçamento
- **Product**: Produtos disponíveis

## Como Usar o Prisma nos Componentes

### Em Server Components (Componentes do Servidor)

```tsx
import prisma from '@/lib/prisma'

export default async function MeuComponente() {
  // Buscar dados diretamente
  const clients = await prisma.client.findMany({
    where: {
      loyaltyLevel: 'VIP'
    },
    include: {
      orders: true
    }
  })
  
  return (
    <div>
      {/* Renderizar os dados */}
    </div>
  )
}
```

### Em Route Handlers (APIs)

```tsx
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true
    }
  })
  
  return NextResponse.json({ products })
}
```

## Operações Comuns com Prisma

### Buscar Registros

```ts
// Buscar todos os registros
const clients = await prisma.client.findMany()

// Buscar um registro único
const client = await prisma.client.findUnique({
  where: { id: 'client_id' }
})

// Buscar com filtros
const vipClients = await prisma.client.findMany({
  where: {
    loyaltyLevel: 'VIP',
    loyaltyPoints: {
      gte: 100 // maior ou igual a 100
    }
  }
})

// Buscar com relacionamentos
const clientWithOrders = await prisma.client.findUnique({
  where: { id: 'client_id' },
  include: {
    orders: true
  }
})

// Seleção de campos específicos
const clientNames = await prisma.client.findMany({
  select: {
    id: true,
    name: true
  }
})
```

### Criar Registros

```ts
// Criar um registro simples
const newClient = await prisma.client.create({
  data: {
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '11987654321'
  }
})

// Criar com relacionamentos
const newOrder = await prisma.order.create({
  data: {
    totalValue: 1500.00,
    category: 'JEWELRY_SALES',
    description: 'Compra de aliança',
    client: {
      connect: { id: 'client_id' }
    }
  }
})
```

### Atualizar Registros

```ts
// Atualizar um registro
const updatedClient = await prisma.client.update({
  where: { id: 'client_id' },
  data: {
    loyaltyPoints: {
      increment: 10 // aumentar 10 pontos
    }
  }
})

// Atualizar ou criar (upsert)
const upsertClient = await prisma.client.upsert({
  where: { email: 'maria@email.com' },
  update: {
    loyaltyPoints: 50
  },
  create: {
    name: 'Maria Santos',
    email: 'maria@email.com',
    loyaltyPoints: 50
  }
})
```

### Excluir Registros

```ts
// Excluir um registro
await prisma.client.delete({
  where: { id: 'client_id' }
})
```

### Consultas Agregadas

```ts
// Contar registros
const totalClients = await prisma.client.count()

// Contar com filtros
const vipClientsCount = await prisma.client.count({
  where: { loyaltyLevel: 'VIP' }
})

// Agrupamento e totais
const ordersByCategory = await prisma.order.groupBy({
  by: ['category'],
  _count: {
    id: true
  },
  _sum: {
    totalValue: true
  }
})
```

## Comandos Úteis do Prisma CLI

```bash
# Gerar cliente Prisma após alterações no schema
npx prisma generate

# Criar uma nova migration (após alterações no schema)
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações em produção
npx prisma migrate deploy

# Visualizar banco de dados via Prisma Studio
npx prisma studio
```

## Boas Práticas

1. **Transações**: Use `prisma.$transaction()` para operações que precisam ser atômicas.
2. **Seleção de Campos**: Sempre selecione apenas os campos necessários para otimizar performance.
3. **Relacionamentos**: Carregue relacionamentos apenas quando necessário usando `include`.
4. **Validação**: Sempre valide os dados antes de enviá-los ao Prisma.
5. **Tratamento de Erros**: Sempre trate erros nas operações do banco de dados.

## Exemplos Práticos no Projeto

1. **API de Clientes**: `app/api/clients/route.ts`
2. **API de Cliente por ID**: `app/api/clients/[id]/route.ts`
3. **Listagem de Clientes**: `app/clientes/page.tsx`

## Recursos Adicionais

- [Documentação Oficial do Prisma](https://www.prisma.io/docs)
- [Prisma Examples](https://github.com/prisma/prisma-examples)
- [Prisma Day Talks](https://www.prisma.io/day) 