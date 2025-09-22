import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    console.log('Iniciando criação das tabelas...');

    // Executar prisma db push via código
    const { stdout, stderr } = await execAsync('npx prisma db push --accept-data-loss', {
      cwd: process.cwd(),
      env: process.env
    });

    console.log('Prisma stdout:', stdout);
    if (stderr) console.log('Prisma stderr:', stderr);

    return NextResponse.json({
      status: 'success',
      message: 'Tabelas criadas com sucesso',
      output: stdout,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao criar tabelas:', error);

    return NextResponse.json({
      status: 'error',
      message: 'Erro ao criar tabelas',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}