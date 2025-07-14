import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema para configurações como objeto completo
const siteConfigSchema = z.object({
  // Hero Sections
  homeHeroTitle: z.string().default('Cícero Joias - Tradição em Ouro'),
  homeHeroSubtitle: z.string().default('Há mais de 30 anos criando joias exclusivas com qualidade e tradição familiar'),
  portfolioHeroTitle: z.string().default('Nosso Portfólio'),
  portfolioHeroSubtitle: z.string().default('Conheça alguns dos nossos trabalhos mais especiais'),
  contactHeroTitle: z.string().default('Entre em Contato'),
  contactHeroSubtitle: z.string().default('Estamos prontos para criar a joia dos seus sonhos'),
  
  // SEO Global
  siteTitle: z.string().default('Cícero Joias - Joias Exclusivas e Personalizadas'),
  siteDescription: z.string().default('Especializada em anéis de formatura, alianças de casamento, joias personalizadas e serviços de ourivesaria com mais de 30 anos de tradição.'),
  siteKeywords: z.string().default('joias, anéis de formatura, alianças, ourivesaria, ouro, prata, joias personalizadas'),
  siteAuthor: z.string().default('Cícero Joias'),
  
  // Contact Info
  companyName: z.string().default('Cícero Joias'),
  companyEmail: z.string().email().default('contato@cicerojoias.com.br'),
  companyPhone: z.string().default('(11) 99999-9999'),
  companyWhatsapp: z.string().default('5511999999999'),
  companyAddress: z.string().default('Rua das Joias, 123 - Centro, São Paulo - SP'),
  
  // Social Media
  facebookUrl: z.string().default(''),
  instagramUrl: z.string().default(''),
  linkedinUrl: z.string().default(''),
  
  // Appearance
  primaryColor: z.string().default('#D97706'),
  secondaryColor: z.string().default('#1F2937'),
  fontFamily: z.string().default('Inter'),
  
  // Features
  enableBlog: z.boolean().default(false),
  enableTestimonials: z.boolean().default(true),
  enableNewsletter: z.boolean().default(false),
  maintenanceMode: z.boolean().default(false),
});

async function checkAdminAuth() {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'Não autorizado', status: 401 };
  }

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userRole = (user.publicMetadata?.role as string)?.toLowerCase();

    if (userRole !== 'admin') {
      return { error: 'Acesso negado', status: 403 };
    }

    return { userId };
  } catch (error) {
    return { error: 'Erro de autenticação', status: 500 };
  }
}

// GET /api/admin/site-config - Buscar configurações como objeto
export async function GET() {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Buscar todas as configurações
    const settings = await prisma.siteSettings.findMany({
      orderBy: { key: 'asc' }
    });

    // Converter array de configurações para objeto
    const configObject = settings.reduce((acc: any, setting: any) => {
      try {
        // Tentar parsear como JSON primeiro (para booleans, etc.)
        acc[setting.key] = JSON.parse(setting.value);
      } catch {
        // Se não for JSON, usar como string
        acc[setting.key] = setting.value;
      }
      return acc;
    }, {});

    // Aplicar defaults para propriedades não encontradas
    const defaultConfig = siteConfigSchema.parse({});
    const mergedConfig = { ...defaultConfig, ...configObject };

    return NextResponse.json(mergedConfig);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    
    // Se houver erro, retornar configuração padrão
    const defaultConfig = siteConfigSchema.parse({});
    return NextResponse.json(defaultConfig);
  }
}

// POST /api/admin/site-config - Atualizar configurações como objeto
export async function POST(request: Request) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = authResult;
    const body = await request.json();

    // Validar configuração
    const validatedConfig = siteConfigSchema.parse(body);

    const updatedSettings = [];
    
    // Converter objeto para formato chave-valor e salvar
    for (const [key, value] of Object.entries(validatedConfig)) {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      const type = typeof value === 'boolean' ? 'JSON' : 'TEXT';
      
      const updatedSetting = await prisma.siteSettings.upsert({
        where: { key },
        update: {
          value: stringValue,
          type,
          description: `Configuração: ${key}`,
        },
        create: {
          key,
          value: stringValue,
          type,
          description: `Configuração: ${key}`,
        },
      });
      updatedSettings.push(updatedSetting);
    }

    // Log da atividade
    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entity: 'SiteSettings',
        entityId: 'site-config',
        description: `Configurações gerais do site atualizadas`,
        userId,
      },
    });

    return NextResponse.json(validatedConfig);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao atualizar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 