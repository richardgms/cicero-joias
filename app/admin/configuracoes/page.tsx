'use client';

import { useState, useEffect } from 'react';
import { Save, Eye, Monitor, Smartphone, Globe, Search, Settings, Palette, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

export default function AdminConfigPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/admin/site-settings');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      } else {
        // Carregar configurações padrão se não existirem
        setConfig(getDefaultConfig());
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      setConfig(getDefaultConfig());
    } finally {
      setLoading(false);
    }
  };

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
    companyPhone: '(11) 99999-9999',
    companyWhatsapp: '5511999999999',
    companyAddress: 'Rua das Joias, 123 - Centro, São Paulo - SP',
    
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

  const handleSave = async () => {
    if (!config) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/site-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        alert('Configurações salvas com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (key: keyof SiteConfig, value: any) => {
    if (!config) return;
    setConfig({ ...config, [key]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  if (!config) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações do Site</h1>
          <p className="text-gray-600 mt-2">
            Personalize a aparência e conteúdo do seu site
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero" className="flex items-center space-x-2">
            <Type className="h-4 w-4" />
            <span>Hero Sections</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>SEO</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Contato</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Recursos</span>
          </TabsTrigger>
        </TabsList>

        {/* Hero Sections */}
        <TabsContent value="hero" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Página Inicial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="homeHeroTitle">Título Principal</Label>
                <Input
                  id="homeHeroTitle"
                  value={config.homeHeroTitle}
                  onChange={(e) => updateConfig('homeHeroTitle', e.target.value)}
                  placeholder="Título da página inicial"
                />
              </div>
              <div>
                <Label htmlFor="homeHeroSubtitle">Subtítulo</Label>
                <Textarea
                  id="homeHeroSubtitle"
                  value={config.homeHeroSubtitle}
                  onChange={(e) => updateConfig('homeHeroSubtitle', e.target.value)}
                  placeholder="Descrição da página inicial"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Página de Portfólio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="portfolioHeroTitle">Título do Portfólio</Label>
                <Input
                  id="portfolioHeroTitle"
                  value={config.portfolioHeroTitle}
                  onChange={(e) => updateConfig('portfolioHeroTitle', e.target.value)}
                  placeholder="Título da página de portfólio"
                />
              </div>
              <div>
                <Label htmlFor="portfolioHeroSubtitle">Subtítulo do Portfólio</Label>
                <Textarea
                  id="portfolioHeroSubtitle"
                  value={config.portfolioHeroSubtitle}
                  onChange={(e) => updateConfig('portfolioHeroSubtitle', e.target.value)}
                  placeholder="Descrição da página de portfólio"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Página de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactHeroTitle">Título do Contato</Label>
                <Input
                  id="contactHeroTitle"
                  value={config.contactHeroTitle}
                  onChange={(e) => updateConfig('contactHeroTitle', e.target.value)}
                  placeholder="Título da página de contato"
                />
              </div>
              <div>
                <Label htmlFor="contactHeroSubtitle">Subtítulo do Contato</Label>
                <Textarea
                  id="contactHeroSubtitle"
                  value={config.contactHeroSubtitle}
                  onChange={(e) => updateConfig('contactHeroSubtitle', e.target.value)}
                  placeholder="Descrição da página de contato"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteTitle">Título do Site</Label>
                <Input
                  id="siteTitle"
                  value={config.siteTitle}
                  onChange={(e) => updateConfig('siteTitle', e.target.value)}
                  placeholder="Título que aparece na aba do navegador"
                />
              </div>
              <div>
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Textarea
                  id="siteDescription"
                  value={config.siteDescription}
                  onChange={(e) => updateConfig('siteDescription', e.target.value)}
                  placeholder="Descrição para mecanismos de busca"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="siteKeywords">Palavras-chave</Label>
                <Input
                  id="siteKeywords"
                  value={config.siteKeywords}
                  onChange={(e) => updateConfig('siteKeywords', e.target.value)}
                  placeholder="Palavras-chave separadas por vírgula"
                />
              </div>
              <div>
                <Label htmlFor="siteAuthor">Autor</Label>
                <Input
                  id="siteAuthor"
                  value={config.siteAuthor}
                  onChange={(e) => updateConfig('siteAuthor', e.target.value)}
                  placeholder="Nome do autor/empresa"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    value={config.companyName}
                    onChange={(e) => updateConfig('companyName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="companyEmail">E-mail</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={config.companyEmail}
                    onChange={(e) => updateConfig('companyEmail', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="companyPhone">Telefone</Label>
                  <Input
                    id="companyPhone"
                    value={config.companyPhone}
                    onChange={(e) => updateConfig('companyPhone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="companyWhatsapp">WhatsApp</Label>
                  <Input
                    id="companyWhatsapp"
                    value={config.companyWhatsapp}
                    onChange={(e) => updateConfig('companyWhatsapp', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="companyAddress">Endereço</Label>
                <Textarea
                  id="companyAddress"
                  value={config.companyAddress}
                  onChange={(e) => updateConfig('companyAddress', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="instagramUrl">Instagram</Label>
                <Input
                  id="instagramUrl"
                  value={config.instagramUrl}
                  onChange={(e) => updateConfig('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/cicerojoias"
                />
              </div>
              <div>
                <Label htmlFor="facebookUrl">Facebook</Label>
                <Input
                  id="facebookUrl"
                  value={config.facebookUrl}
                  onChange={(e) => updateConfig('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/cicerojoias"
                />
              </div>
              <div>
                <Label htmlFor="linkedinUrl">LinkedIn</Label>
                <Input
                  id="linkedinUrl"
                  value={config.linkedinUrl}
                  onChange={(e) => updateConfig('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/company/cicerojoias"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cores do Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => updateConfig('primaryColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={config.primaryColor}
                      onChange={(e) => updateConfig('primaryColor', e.target.value)}
                      placeholder="#D97706"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Cor Secundária</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={config.secondaryColor}
                      onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                      placeholder="#1F2937"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="fontFamily">Fonte</Label>
                <Select value={config.fontFamily} onValueChange={(value) => updateConfig('fontFamily', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recursos do Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableBlog">Blog</Label>
                  <p className="text-sm text-gray-500">Ativar sistema de blog</p>
                </div>
                <Switch
                  id="enableBlog"
                  checked={config.enableBlog}
                  onCheckedChange={(checked) => updateConfig('enableBlog', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableTestimonials">Depoimentos</Label>
                  <p className="text-sm text-gray-500">Exibir seção de depoimentos</p>
                </div>
                <Switch
                  id="enableTestimonials"
                  checked={config.enableTestimonials}
                  onCheckedChange={(checked) => updateConfig('enableTestimonials', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableNewsletter">Newsletter</Label>
                  <p className="text-sm text-gray-500">Ativar inscrição na newsletter</p>
                </div>
                <Switch
                  id="enableNewsletter"
                  checked={config.enableNewsletter}
                  onCheckedChange={(checked) => updateConfig('enableNewsletter', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Modo Manutenção</Label>
                  <p className="text-sm text-gray-500">Ativar página de manutenção</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={config.maintenanceMode}
                  onCheckedChange={(checked) => updateConfig('maintenanceMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 