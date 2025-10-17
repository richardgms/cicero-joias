#!/usr/bin/env ts-node

/**
 * Script de diagnóstico do banco de dados
 *
 * Verifica a conectividade e status do banco de dados PostgreSQL
 *
 * Uso: npx ts-node scripts/check-database.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

interface DatabaseStatus {
  connected: boolean;
  version?: string;
  error?: string;
  latency?: number;
  tables?: string[];
  portfolioCount?: number;
}

async function checkDatabaseConnection(): Promise<DatabaseStatus> {
  const status: DatabaseStatus = {
    connected: false,
  };

  try {
    console.log('🔍 Verificando conexão com o banco de dados...\n');

    // Testar conexão básica
    const startTime = Date.now();
    await prisma.$connect();
    const endTime = Date.now();

    status.connected = true;
    status.latency = endTime - startTime;

    console.log('✅ Conexão estabelecida com sucesso!');
    console.log(`⏱️  Latência: ${status.latency}ms\n`);

    // Obter versão do PostgreSQL
    try {
      const result: any[] = await prisma.$queryRaw`SELECT version()`;
      if (result && result[0]) {
        status.version = result[0].version;
        console.log('📊 Versão do PostgreSQL:');
        console.log(`   ${status.version}\n`);
      }
    } catch (error) {
      console.warn('⚠️  Não foi possível obter a versão do banco');
    }

    // Verificar tabelas existentes
    try {
      const tables: any[] = await prisma.$queryRaw`
        SELECT tablename
        FROM pg_catalog.pg_tables
        WHERE schemaname = 'public'
        ORDER BY tablename
      `;

      status.tables = tables.map((t) => t.tablename);
      console.log('📋 Tabelas encontradas no schema público:');
      status.tables.forEach((table) => console.log(`   - ${table}`));
      console.log('');

      // Verificar se a tabela portfolio_items existe
      if (status.tables.includes('portfolio_items')) {
        console.log('✅ Tabela portfolio_items encontrada');

        // Contar itens do portfólio
        try {
          const count = await prisma.portfolioItem.count();
          status.portfolioCount = count;
          console.log(`📊 Total de itens no portfólio: ${count}`);

          // Contar itens ativos
          const activeCount = await prisma.portfolioItem.count({
            where: { isActive: true }
          });
          console.log(`✨ Itens ativos: ${activeCount}`);

          // Mostrar algumas informações sobre os itens
          const items = await prisma.portfolioItem.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              title: true,
              category: true,
              isActive: true,
              createdAt: true,
            },
          });

          if (items.length > 0) {
            console.log('\n📝 Últimos itens (máx. 5):');
            items.forEach((item, index) => {
              console.log(`   ${index + 1}. [${item.isActive ? '✓' : '✗'}] ${item.title} (${item.category})`);
            });
          }
        } catch (error) {
          console.error('❌ Erro ao consultar itens do portfólio:', error);
        }
      } else {
        console.log('⚠️  Tabela portfolio_items NÃO encontrada');
        console.log('   Execute: npx prisma migrate deploy');
      }

    } catch (error) {
      console.warn('⚠️  Não foi possível listar as tabelas');
    }

  } catch (error) {
    status.connected = false;
    status.error = error instanceof Error ? error.message : 'Erro desconhecido';

    console.error('\n❌ Falha ao conectar ao banco de dados\n');
    console.error('Detalhes do erro:');
    console.error(`   ${status.error}\n`);

    // Diagnóstico específico por tipo de erro
    const errorMsg = status.error.toLowerCase();

    if (errorMsg.includes('enotfound') || errorMsg.includes('econnrefused')) {
      console.log('💡 Possíveis causas:');
      console.log('   1. O servidor do banco está offline ou inacessível');
      console.log('   2. Firewall bloqueando a conexão');
      console.log('   3. URL de conexão incorreta no .env');
      console.log('   4. Projeto Supabase pausado por inatividade\n');
      console.log('🔧 Soluções:');
      console.log('   - Verifique https://supabase.com/dashboard');
      console.log('   - Reative o projeto se estiver pausado');
      console.log('   - Verifique a DATABASE_URL no arquivo .env');
    } else if (errorMsg.includes('authentication') || errorMsg.includes('password')) {
      console.log('💡 Possíveis causas:');
      console.log('   1. Senha incorreta na DATABASE_URL');
      console.log('   2. Usuário não existe ou sem permissões\n');
      console.log('🔧 Soluções:');
      console.log('   - Verifique as credenciais no Supabase Dashboard');
      console.log('   - Atualize a DATABASE_URL no arquivo .env');
    } else if (errorMsg.includes('timeout')) {
      console.log('💡 Possíveis causas:');
      console.log('   1. Servidor respondendo muito lentamente');
      console.log('   2. Problemas de rede');
      console.log('   3. Servidor sobrecarregado\n');
      console.log('🔧 Soluções:');
      console.log('   - Tente novamente em alguns minutos');
      console.log('   - Verifique sua conexão com a internet');
    }

    console.log('\n📚 Documentação:');
    console.log('   - Supabase: https://supabase.com/docs');
    console.log('   - Prisma: https://www.prisma.io/docs/reference/api-reference/error-reference');
  } finally {
    await prisma.$disconnect();
  }

  return status;
}

// Executar diagnóstico
checkDatabaseConnection()
  .then((status) => {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO DO DIAGNÓSTICO');
    console.log('='.repeat(60));
    console.log(`Status: ${status.connected ? '✅ CONECTADO' : '❌ DESCONECTADO'}`);
    if (status.latency) console.log(`Latência: ${status.latency}ms`);
    if (status.tables) console.log(`Tabelas: ${status.tables.length}`);
    if (status.portfolioCount !== undefined) console.log(`Itens no portfólio: ${status.portfolioCount}`);
    if (status.error) console.log(`Erro: ${status.error}`);
    console.log('='.repeat(60) + '\n');

    process.exit(status.connected ? 0 : 1);
  })
  .catch((error) => {
    console.error('❌ Erro fatal no diagnóstico:', error);
    process.exit(1);
  });
