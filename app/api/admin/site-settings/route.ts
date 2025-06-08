import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema para configurações por chave-valor (existente)
const settingsSchema = z.array(z.object({
  key: z.string().min(1, 'Chave é obrigatória'),
  value: z.string(),
  type: z.enum(['TEXT', 'HTML', 'JSON', 'IMAGE']).default('TEXT'),
  description: z.string().optional(),
}));

// Schema para configurações como objeto completo (novo)
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
    const { clerkClient } = await import('@clerk/nextjs/server');
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

// GET /api/admin/site-settings - Buscar configurações
export async function GET(request: Request) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format'); // 'object' or 'array'
    const section = searchParams.get('section'); // portfolio, home, etc.

    if (format === 'object') {
      // Retornar como objeto SiteConfig
      const settings = await prisma.siteSettings.findMany({
        orderBy: { key: 'asc' }
      });

      // Converter array de configurações para objeto
      const configObject = settings.reduce((acc: any, setting) => {
        try {
          // Tentar parsear como JSON primeiro
          acc[setting.key] = JSON.parse(setting.value);
        } catch {
          // Se não for JSON, usar como string
          acc[setting.key] = setting.value;
        }
        return acc;
      }, {});

      // Aplicar defaults
      const defaultConfig = siteConfigSchema.parse({});
      const mergedConfig = { ...defaultConfig, ...configObject };

      return NextResponse.json(mergedConfig);
    }

    // Formato original (array)
    let whereClause = {};
    if (section) {
      whereClause = {
        key: {
          startsWith: section
        }
      };
    }

    const settings = await prisma.siteSettings.findMany({
      where: whereClause,
      orderBy: { key: 'asc' }
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/admin/site-settings - Atualizar configurações
export async function POST(request: Request) {
  try {
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = authResult;
    const body = await request.json();

    // Verificar se é um objeto de configuração (novo formato) ou array (formato antigo)
    if (Array.isArray(body)) {
      // Formato antigo (array de configurações)
      const validatedData = settingsSchema.parse(body);

      const updatedSettings = [];
      
      for (const setting of validatedData) {
        const updatedSetting = await prisma.siteSettings.upsert({
          where: { key: setting.key },
          update: {
            value: setting.value,
            type: setting.type,
            description: setting.description,
          },
          create: {
            key: setting.key,
            value: setting.value,
            type: setting.type,
            description: setting.description,
          },
        });
        updatedSettings.push(updatedSetting);
      }

      await prisma.activityLog.create({
        data: {
          action: 'UPDATE',
          entity: 'SiteSettings',
          entityId: 'multiple',
          description: `Configurações do site atualizadas: ${validatedData.map(s => s.key).join(', ')}`,
          userId,
        },
      });

      return NextResponse.json({ settings: updatedSettings });
    } else {
      // Novo formato (objeto de configuração)
      const validatedConfig = siteConfigSchema.parse(body);

      const updatedSettings = [];
      
      // Converter objeto para formato chave-valor
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
    }
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