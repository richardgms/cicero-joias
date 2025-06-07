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

# Cícero Joias - Website Oficial

Website institucional da Cícero Joias, joalheria com mais de 40 anos de tradição.

## Sistema de Ícones

O projeto utiliza dois tipos de ícones:

### 1. Ícones do Lucide React

Para ícones gerais, utilizamos a biblioteca [Lucide React](https://lucide.dev/), que oferece uma grande variedade de ícones modernos e de alta qualidade.

```jsx
import { Heart, Star, ArrowRight } from 'lucide-react';

// Utilizando o ícone
<Heart className="w-6 h-6 text-esmeralda" />
```

### 2. Ícones Personalizados

Para ícones específicos de joalheria, criamos componentes React a partir de SVGs personalizados.

#### Como usar ícones personalizados:

1. Adicione o arquivo SVG na pasta `public/assets/icons/`
2. Crie um componente para o ícone em `components/icons/[nome-do-icone]-icon.tsx`
3. Exporte o componente no arquivo `components/icons/index.ts`
4. Importe e use o ícone em seu componente:

```jsx
import { AliancasIcon } from '@/components/icons';

// Utilizando o ícone
<AliancasIcon className="w-6 h-6 text-esmeralda" />
```

#### Ou use o componente IconWrapper:

```jsx
import { IconWrapper } from '@/components/icons';
import { Heart } from 'lucide-react';
import { AliancasIcon } from '@/components/icons';

// Com ícone do Lucide
<IconWrapper icon={Heart} size="md" />

// Com ícone personalizado
<IconWrapper icon={AliancasIcon} size="md" />
```

Os tamanhos disponíveis para o IconWrapper são:
- sm: pequeno (32px x 32px)
- md: médio (40px x 40px) - padrão
- lg: grande (48px x 48px)
- xl: extra grande (64px x 64px)