'use client';

import { useState, useEffect } from 'react';

interface SiteConfig {
  // Hero Sections
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  portfolioHeroTitle: string;
  portfolioHeroSubtitle: string;
  contactHeroTitle: string;
  contactHeroSubtitle: string;
  
  // SEO Global
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  siteAuthor: string;
  
  // Contact Info
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyWhatsapp: string;
  companyAddress: string;
  
  // Social Media
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  
  // Appearance
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  
  // Features
  enableBlog: boolean;
  enableTestimonials: boolean;
  enableNewsletter: boolean;
  maintenanceMode: boolean;
}

const getDefaultConfig = (): SiteConfig => ({
  homeHeroTitle: 'Cícero Joias - Tradição em Ouro',
  homeHeroSubtitle: 'Há mais de 30 anos criando joias exclusivas com qualidade e tradição familiar',
  portfolioHeroTitle: 'Nosso Portfólio',
  portfolioHeroSubtitle: 'Conheça alguns dos nossos trabalhos mais especiais',
  contactHeroTitle: 'Entre em Contato',
  contactHeroSubtitle: 'Estamos prontos para criar a joia dos seus sonhos',
  
  siteTitle: 'Cícero Joias - Joias Exclusivas e Personalizadas',
  siteDescription: 'Especializada em anéis de formatura, alianças de casamento, joias personalizadas e serviços de ourivesaria com mais de 30 anos de tradição.',
  siteKeywords: 'joias, anéis de formatura, alianças, ourivesaria, ouro, prata, joias personalizadas',
  siteAuthor: 'Cícero Joias',
  
  companyName: 'Cícero Joias',
  companyEmail: 'contato@cicerojoias.com.br',
  companyPhone: '(83) 98807-3784',
  companyWhatsapp: '5583988073784',
  companyAddress: 'Rua das Joias, 123 - Centro, João Pessoa - PB',
  
  facebookUrl: '',
  instagramUrl: '',
  linkedinUrl: '',
  
  primaryColor: '#D97706',
  secondaryColor: '#1F2937',
  fontFamily: 'Inter',
  
  enableBlog: false,
  enableTestimonials: true,
  enableNewsletter: false,
  maintenanceMode: false,
});

// Cache global das configurações
let configCache: SiteConfig | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(getDefaultConfig());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        // Verificar cache
        const now = Date.now();
        if (configCache && (now - cacheTimestamp) < CACHE_DURATION) {
          setConfig(configCache);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/admin/site-config');
        if (response.ok) {
          const data = await response.json();
          
          // Atualizar cache
          configCache = data;
          cacheTimestamp = now;
          
          setConfig(data);
        } else {
          throw new Error('Erro ao carregar configurações');
        }
      } catch (err) {
        console.warn('Erro ao carregar configurações do site, usando padrão:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        // Manter configuração padrão em caso de erro
        setConfig(getDefaultConfig());
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  // Função helper para gerar link do WhatsApp
  const getWhatsAppLink = (message?: string) => {
    const defaultMessage = 'Olá! Gostaria de saber mais sobre os serviços da Cícero Joias.';
    const encodedMessage = encodeURIComponent(message || defaultMessage);
    return `https://wa.me/${config.companyWhatsapp}?text=${encodedMessage}`;
  };

  // Função helper para verificar se WhatsApp está configurado
  const isWhatsAppConfigured = () => {
    return config.companyWhatsapp && config.companyWhatsapp.length >= 10;
  };

  return {
    config,
    loading,
    error,
    getWhatsAppLink,
    isWhatsAppConfigured,
    // Configurações específicas mais usadas
    whatsapp: config.companyWhatsapp,
    companyName: config.companyName,
    companyEmail: config.companyEmail,
    companyPhone: config.companyPhone,
    primaryColor: config.primaryColor,
    secondaryColor: config.secondaryColor,
  };
}

// Função para invalidar cache (útil após salvar configurações)
export function invalidateSiteConfigCache() {
  configCache = null;
  cacheTimestamp = 0;
} 