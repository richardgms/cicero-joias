---
id: plan-005
title: Downgrade de React 19 para React 18.2.0
createdAt: 2024-06-10
author: Assistant
status: draft
---

## 🧩 Escopo

Realizar o downgrade da aplicação Cícero Joias de React 19 para React 18.2.0 para resolver conflitos de compatibilidade com o pacote @clerk/nextjs e outras bibliotecas, garantindo estabilidade durante a implementação do sistema de autenticação.

## ✅ Requisitos Funcionais

- Remover as versões atuais do React 19 e React DOM 19
- Instalar as versões específicas React 18.2.0 e React DOM 18.2.0
- Resolver quaisquer dependências relacionadas afetadas pelo downgrade
- Garantir que a aplicação funcione corretamente após o downgrade
- Implementar o Clerk para autenticação após o downgrade bem-sucedido

## ⚙️ Requisitos Não-Funcionais

- Performance: Manter o desempenho atual da aplicação após o downgrade
- Compatibilidade: Garantir compatibilidade com todas as bibliotecas existentes
- Estabilidade: Evitar regressões ou comportamentos inesperados
- Manutenibilidade: Documentar o processo para facilitar atualizações futuras

## 📚 Diretrizes e Pacotes

- Versões específicas a serem usadas:
  - react@18.2.0 (MIT License)
  - react-dom@18.2.0 (MIT License)
  - @types/react@18.2.0 (para projetos TypeScript) (MIT License)
  - @types/react-dom@18.2.0 (para projetos TypeScript) (MIT License)
  - @clerk/nextjs (para autenticação após downgrade) (MIT License)

## 🔐 Modelo de Ameaça

- Incompatibilidades subtis: Podem existir diferenças de comportamento entre React 19 e 18.2.0
- Dependências transitivas: Pacotes que dependem do React podem ser afetados
- Features perdidas: Recursos do React 19 que não estarão mais disponíveis
- Regressões de tipos: Possíveis problemas com definições de tipos TypeScript

## 🔢 Plano de Execução

1. **Preparação e Backup**
   - Criar um commit ou branch no sistema de controle de versão antes das alterações
   - Fazer backup do package.json e package-lock.json atuais
   - Parar qualquer servidor de desenvolvimento em execução

2. **Remoção do React 19**
   ```bash
   npm uninstall react react-dom
   ```
   - Para projetos TypeScript, também remover definições de tipos:
   ```bash
   npm uninstall @types/react @types/react-dom
   ```

3. **Instalação do React 18.2.0**
   ```bash
   npm install --save-exact react@18.2.0 react-dom@18.2.0
   ```
   - Para projetos TypeScript, também instalar definições de tipos compatíveis:
   ```bash
   npm install --save-dev --save-exact @types/react@18.2.0 @types/react-dom@18.2.0
   ```

4. **Atualização de Dependências Relacionadas**
   - Verificar se há versões específicas de outras bibliotecas que precisam ser ajustadas:
   ```bash
   npm list | grep react
   ```
   - Ajustar dependências conflitantes conforme necessário

5. **Verificação de Compatibilidade**
   - Iniciar servidor de desenvolvimento para verificar se a aplicação carrega sem erros:
   ```bash
   npm run dev
   ```
   - Verificar console do navegador para erros ou avisos relacionados ao React
   - Testar funcionalidades principais da aplicação

6. **Instalação e Configuração do Clerk**
   - Instalar o pacote Clerk após confirmação de que o downgrade foi bem-sucedido:
   ```bash
   npm install @clerk/nextjs
   ```
   - Configurar variáveis de ambiente necessárias para o Clerk
   - Implementar os componentes de autenticação conforme planejado anteriormente

7. **Documentação das Alterações**
   - Documentar o processo realizado para referência futura
   - Registrar quaisquer modificações específicas feitas durante o downgrade
   - Anotar considerações para quando for planejado atualizar para React 19 no futuro
