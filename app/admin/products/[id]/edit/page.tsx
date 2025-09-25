'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Upload, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const categoryOptions = {
  JEWELRY: 'Joias',
  RINGS: 'Anéis',
  NECKLACES: 'Colares',
  EARRINGS: 'Brincos',
  BRACELETS: 'Pulseiras',
  WATCHES: 'Relógios',
  ACCESSORIES: 'Acessórios',
};

interface FormData {
  name: string;
  description: string;
  price: number | null;
  category: string;
  isActive: boolean;
  isReadyDelivery: boolean;
  mainImage: string;
  images: string[];
  stock: number;
  weight: number | null;
  material: string;
  size: string;
  code: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: null,
    category: '',
    isActive: true,
    isReadyDelivery: false,
    mainImage: '',
    images: [],
    stock: 0,
    weight: null,
    material: '',
    size: '',
    code: '',
  });

  useEffect(() => {
    if (!productId) {
      return;
    }

    let isMounted = true;

    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/admin/products/${productId}`);

        if (!response.ok) {
          alert('Erro ao carregar produto');
          router.push('/admin/products');
          return;
        }

        const data = await response.json();
        const product = data.product;

        if (!isMounted) {
          return;
        }

        setFormData({
          name: product.name,
          description: product.description || '',
          price: product.price || null,
          category: product.category,
          isActive: product.isActive,
          isReadyDelivery: product.isReadyDelivery,
          mainImage: product.mainImage || '',
          images: product.images || [],
          stock: product.stock,
          weight: product.weight || null,
          material: product.material || '',
          size: product.size || '',
          code: product.code || '',
        });
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        if (isMounted) {
          alert('Erro ao carregar produto');
        }
        router.push('/admin/products');
      } finally {
        if (isMounted) {
          setInitialLoading(false);
        }
      }
    };

    void loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);

    try {
      // Função auxiliar para converter valores numéricos
      const toNumber = (value: any): number | undefined => {
        if (value === null || value === undefined || value === '') {
          return undefined;
        }
        const num = Number(value);
        return isNaN(num) ? undefined : num;
      };

      const submitData = {
        ...formData,
        // Garantir que campos boolean sejam enviados corretamente
        isActive: Boolean(formData.isActive),
        isReadyDelivery: Boolean(formData.isReadyDelivery),
        // Tratamento de strings - usar null para permitir limpeza de campos
        description: formData.description.trim() || null,
        mainImage: formData.mainImage.trim() || null,
        material: formData.material.trim() || null,
        size: formData.size.trim() || null,
        code: formData.code.trim() || null,
        // Tratamento de números - GARANTIR que sejam number ou undefined
        price: toNumber(formData.price),
        weight: toNumber(formData.weight),
        stock: toNumber(formData.stock) || 0, // stock não pode ser undefined, default 0
      };

      // Debug: log dos dados sendo enviados
      console.log('Dados sendo enviados para API:', submitData);
      console.log('Tipos dos campos numéricos:', {
        price: `${typeof submitData.price} (${submitData.price})`,
        weight: `${typeof submitData.weight} (${submitData.weight})`,
        stock: `${typeof submitData.stock} (${submitData.stock})`
      });
      console.log('Campos de texto sendo limpos:', {
        description: submitData.description === null ? 'LIMPANDO' : 'mantendo',
        mainImage: submitData.mainImage === null ? 'LIMPANDO' : 'mantendo',
        material: submitData.material === null ? 'LIMPANDO' : 'mantendo',
        size: submitData.size === null ? 'LIMPANDO' : 'mantendo',
        code: submitData.code === null ? 'LIMPANDO' : 'mantendo'
      });

      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        console.log('Produto atualizado com sucesso');
        router.push('/admin/products');
      } else {
        const error = await response.json();
        console.error('Erro HTTP:', response.status, response.statusText);
        console.error('Detalhes do erro:', error);

        // Mostrar erro mais detalhado para o usuário
        const errorMessage = error.details
          ? `${error.error}: ${error.details}`
          : error.error || 'Erro desconhecido';

        alert(`Erro ao atualizar produto: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isMain = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      
      if (isMain) {
        setFormData(prev => ({ ...prev, mainImage: result }));
      } else {
        setFormData(prev => ({ 
          ...prev, 
          images: [...prev.images, result] 
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Produto</h1>
          <p className="text-gray-600 mt-2">
            Edite as informações do produto
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome do produto"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva o produto..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoria *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryOptions).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="code">Código do Produto</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                      placeholder="ex: JOI001"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preço e Estoque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value ? parseFloat(e.target.value) : null }))}
                      placeholder="0,00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Estoque</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Produto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="weight">Peso (gramas)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.weight || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value ? parseFloat(e.target.value) : null }))}
                      placeholder="0,00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="material">Material</Label>
                    <Input
                      id="material"
                      value={formData.material}
                      onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                      placeholder="ex: Ouro 18k"
                    />
                  </div>

                  <div>
                    <Label htmlFor="size">Tamanho/Medida</Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                      placeholder="ex: 16, M, 2cm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Imagens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Imagem Principal</Label>
                  <div className="mt-2">
                    {formData.mainImage ? (
                      <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                        <Image
                          src={formData.mainImage}
                          alt="Imagem principal"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = '/assets/images/placeholder-jewelry.svg';
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
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Clique para fazer upload</span>
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG ou JPEG</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Imagens Adicionais</Label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="relative h-24 w-full">
                          <Image
                            src={image}
                            alt={`Imagem ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 768px) 50vw, 33vw"
                            unoptimized
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = '/assets/images/placeholder-jewelry.svg';
                            }}
                          />
                        </div>
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

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Produto Ativo</Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isReadyDelivery">Pronta Entrega</Label>
                  <Switch
                    id="isReadyDelivery"
                    checked={formData.isReadyDelivery}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isReadyDelivery: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
                
                <Button type="button" variant="outline" className="w-full" asChild>
                  <Link href="/admin/products">
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