'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const categoryOptions = {
  WEDDING_RINGS: 'Alianças de Casamento',
  REPAIRS_BEFORE_AFTER: 'Consertos (Antes/Depois)',
  GOLD_PLATING: 'Banho de Ouro',
  CUSTOM_JEWELRY: 'Joias Personalizadas',
  GRADUATION_RINGS: 'Anéis de Formatura',
};

const statusOptions = {
  DRAFT: 'Rascunho',
  PUBLISHED: 'Publicado',
  FEATURED: 'Destaque',
};

interface Specification {
  key: string;
  value: string;
}

interface FormData {
  title: string;
  description: string;
  detailedDescription: string;
  category: 'WEDDING_RINGS' | 'REPAIRS_BEFORE_AFTER' | 'GOLD_PLATING' | 'CUSTOM_JEWELRY' | 'GRADUATION_RINGS' | '';
  customCategory: string;
  mainImage: string;
  images: string[];
  isActive: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'FEATURED';
  order: number;
  specifications: Specification[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  relatedProjects: string[];
}

export default function NewPortfolioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    detailedDescription: '',
    category: '',
    customCategory: '',
    mainImage: '',
    images: [],
    isActive: true,
    status: 'DRAFT',
    order: 0,
    specifications: [],
    seoTitle: '',
    seoDescription: '',
    keywords: [],
    relatedProjects: [],
  });
  const [newKeyword, setNewKeyword] = useState('');

  // Validação em tempo real
  const validateField = (field: keyof FormData, value: any) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'title':
        if (!value.trim()) {
          newErrors.title = 'Título é obrigatório';
        } else if (value.length > 255) {
          newErrors.title = 'Título muito longo (máx 255 caracteres)';
        } else {
          delete newErrors.title;
        }
        break;
      case 'category':
        if (!value) {
          newErrors.category = 'Categoria é obrigatória';
        } else {
          delete newErrors.category;
        }
        break;
      case 'mainImage':
        if (!value) {
          newErrors.mainImage = 'Imagem principal é obrigatória';
        } else {
          delete newErrors.mainImage;
        }
        break;
      case 'seoTitle':
        if (value && value.length > 60) {
          newErrors.seoTitle = 'Título SEO deve ter no máximo 60 caracteres';
        } else {
          delete newErrors.seoTitle;
        }
        break;
      case 'seoDescription':
        if (value && value.length > 160) {
          newErrors.seoDescription = 'Descrição SEO deve ter no máximo 160 caracteres';
        } else {
          delete newErrors.seoDescription;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.mainImage) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o título, categoria e imagem principal.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Converter especificações para JSON
      const specifications = formData.specifications.reduce((acc, spec) => {
        if (spec.key && spec.value) {
          acc[spec.key] = spec.value;
        }
        return acc;
      }, {} as Record<string, string>);

      // Preparar payload com conversão de strings vazias para null
      const payload = {
        ...formData,
        description: formData.description.trim() || null,
        detailedDescription: formData.detailedDescription.trim() || null,
        customCategory: formData.customCategory.trim() || null,
        seoTitle: formData.seoTitle.trim() || null,
        seoDescription: formData.seoDescription.trim() || null,
        specifications: Object.keys(specifications).length > 0 ? specifications : null,
      };

      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Projeto criado!",
          description: "O projeto foi adicionado ao portfólio com sucesso.",
        });
        router.push('/admin/portfolio');
      } else {
        const error = await response.json();
        toast({
          title: "Erro ao criar projeto",
          description: error.details ? 
            `Problemas de validação: ${error.details.map((d: any) => d.message).join(', ')}` : 
            error.error || "Erro desconhecido",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar com o servidor. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isMain = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validação de arquivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "Arquivo muito grande",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);

    // Simular upload - em produção usar UploadThing ou similar
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      
      if (isMain) {
        setFormData(prev => ({ ...prev, mainImage: result }));
        validateField('mainImage', result);
      } else {
        setFormData(prev => ({ 
          ...prev, 
          images: [...prev.images, result] 
        }));
      }
      
      setUploadingImage(false);
      toast({
        title: "Imagem carregada",
        description: `Imagem ${isMain ? 'principal' : 'adicional'} carregada com sucesso.`,
      });
    };
    
    reader.onerror = () => {
      setUploadingImage(false);
      toast({
        title: "Erro no upload",
        description: "Não foi possível carregar a imagem. Tente novamente.",
        variant: "destructive",
      });
    };
    
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }));
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/portfolio">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Projeto</h1>
          <p className="text-gray-600 mt-2">
            Adicione um novo projeto ao portfólio
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({ ...prev, title: value }));
                      validateField('title', value);
                    }}
                    placeholder="Nome do projeto"
                    className={errors.title ? 'border-red-500' : ''}
                    required
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Descrição Breve</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição resumida do projeto..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="detailedDescription">Descrição Detalhada</Label>
                  <Textarea
                    id="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, detailedDescription: e.target.value }))}
                    placeholder="Descrição completa e detalhada do projeto, processo de criação, materiais utilizados..."
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoria *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, category: value as FormData['category'] }));
                        validateField('category', value);
                      }}
                      required
                    >
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryOptions).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="customCategory">Categoria Personalizada</Label>
                    <Input
                      id="customCategory"
                      value={formData.customCategory}
                      onChange={(e) => setFormData(prev => ({ ...prev, customCategory: e.target.value }))}
                      placeholder="Ex: Joias Especiais"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="order">Ordem de Exibição</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Especificações Técnicas */}
            <Card>
              <CardHeader>
                <CardTitle>Especificações Técnicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Nome da especificação"
                      value={spec.key}
                      onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Valor"
                        value={spec.value}
                        onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeSpecification(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSpecification}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Especificação
                </Button>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>Otimização SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">Título SEO</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="Título otimizado para motores de busca"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.seoTitle.length}/60 caracteres recomendados
                  </p>
                </div>

                <div>
                  <Label htmlFor="seoDescription">Descrição SEO</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="Descrição para motores de busca"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.seoDescription.length}/160 caracteres recomendados
                  </p>
                </div>

                <div>
                  <Label>Palavras-chave</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Adicionar palavra-chave"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    />
                    <Button type="button" onClick={addKeyword} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="hover:text-blue-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Imagens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main Image */}
                <div>
                  <Label>Imagem Principal *</Label>
                  {errors.mainImage && (
                    <p className="text-sm text-red-500 mt-1">{errors.mainImage}</p>
                  )}
                  <div className="mt-2">
                    {formData.mainImage ? (
                      <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={formData.mainImage}
                          alt="Imagem principal"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/images/placeholder-jewelry.svg';
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => setFormData(prev => ({ ...prev, mainImage: '' }))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg ${uploadingImage ? 'cursor-not-allowed opacity-50' : 'cursor-pointer bg-gray-50 hover:bg-gray-100'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {uploadingImage ? (
                            <>
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mb-4"></div>
                              <p className="mb-2 text-sm text-gray-500">Carregando imagem...</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mb-4 text-gray-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Clique para fazer upload</span>
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG ou JPEG (máx 5MB)</p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          disabled={uploadingImage}
                          onChange={(e) => handleImageUpload(e, true)}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Additional Images */}
                <div>
                  <Label>Imagens Adicionais</Label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Imagem ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/images/placeholder-jewelry.svg';
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Adicionar</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, false)}
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status e Publicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as FormData['status'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusOptions).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Projeto Ativo</Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button type="submit" className="w-full" disabled={loading || uploadingImage}>
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Salvando projeto...
                    </div>
                  ) : uploadingImage ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Aguarde o upload...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Projeto
                    </>
                  )}
                </Button>
                
                <Button type="button" variant="outline" className="w-full" asChild>
                  <Link href="/admin/portfolio">
                    Cancelar
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
          </div>
    );
} 