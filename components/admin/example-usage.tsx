'use client';

// Este arquivo demonstra como usar os componentes reutilizáveis
// Não será usado em produção, apenas para documentação

import { useState } from 'react';
import { Package, TrendingUp, Users, AlertCircle } from 'lucide-react';
import {
  InputField,
  TextareaField,
  SelectField,
  SwitchField,
  CurrencyField,
  NumberField,
  FieldGroup,
  FormSection,
  ImageUpload,
  MultipleImageUpload,
  ImagePreview,
  DeleteConfirmModal,
  StatsCard,
  InfoCard,
  MetricCard,
  StatusCard,
} from './index';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

// Exemplo de uso dos campos de formulário
export function FormFieldsExample() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    isActive: true,
    price: null as number | null,
    stock: null as number | null,
    mainImage: '',
    images: [] as string[],
  });

  return (
    <div className="space-y-8 p-6">
      <FormSection
        title="Informações Básicas"
        description="Dados principais do produto"
      >
        <FieldGroup>
          <InputField
            label="Nome do Produto"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Digite o nome do produto"
            required
          />
          
          <SelectField
            label="Categoria"
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            placeholder="Selecione uma categoria"
            options={[
              { value: 'JEWELRY', label: 'Joias' },
              { value: 'RINGS', label: 'Anéis' },
              { value: 'NECKLACES', label: 'Colares' },
            ]}
            required
          />
        </FieldGroup>

        <TextareaField
          label="Descrição"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Descreva o produto..."
          rows={4}
        />
      </FormSection>

      <FormSection
        title="Preço e Estoque"
        description="Informações comerciais"
      >
        <FieldGroup>
          <CurrencyField
            label="Preço"
            value={formData.price}
            onChange={(value) => setFormData({ ...formData, price: value })}
            required
          />
          
          <NumberField
            label="Estoque"
            value={formData.stock}
            onChange={(value) => setFormData({ ...formData, stock: value })}
            min={0}
          />
        </FieldGroup>

        <SwitchField
          label="Produto Ativo"
          checked={formData.isActive}
          onChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
      </FormSection>

      <FormSection
        title="Imagens"
        description="Fotos do produto"
      >
        <ImageUpload
          label="Imagem Principal"
          value={formData.mainImage}
          onChange={(value) => setFormData({ ...formData, mainImage: value })}
          required
        />
        
        <MultipleImageUpload
          label="Galeria de Imagens"
          values={formData.images}
          onChange={(values) => setFormData({ ...formData, images: values })}
          maxImages={5}
        />
      </FormSection>
    </div>
  );
}

// Exemplo de uso dos cards de estatísticas
export function StatsCardsExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <StatsCard
        title="Total de Produtos"
        value="156"
        description="Produtos cadastrados"
        icon={Package}
        trend={{
          value: 12.5,
          label: "este mês",
          isPositive: true,
        }}
      />
      
      <StatsCard
        title="Vendas"
        value="R$ 45.231"
        description="Receita total"
        icon={TrendingUp}
        trend={{
          value: -2.1,
          label: "último mês",
          isPositive: false,
        }}
      />
      
      <MetricCard
        label="Taxa de Conversão"
        value={3.2}
        format="percentage"
        change={{
          value: 0.8,
          period: "último mês",
        }}
      />
      
      <StatusCard
        title="Sistema"
        status="active"
        description="Todos os serviços operando normalmente"
        lastUpdate="2 minutos atrás"
      />
    </div>
  );
}

// Exemplo de uso do modal de confirmação
export function DeleteModalExample() {
  const handleDelete = () => {
    alert('Item deletado!');
  };

  return (
    <div className="p-6">
      <DeleteConfirmModal
        title="Deletar Produto"
        description="Esta ação não pode ser desfeita. O produto será removido permanentemente."
        itemName="Anel de Ouro 18k"
        onConfirm={handleDelete}
      />
    </div>
  );
}

// Exemplo de uso da DataTable
export function DataTableExample() {
  const data = [
    { id: 1, name: 'Produto 1', price: 199.99, stock: 10 },
    { id: 2, name: 'Produto 2', price: 299.99, stock: 5 },
    { id: 3, name: 'Produto 3', price: 399.99, stock: 0 },
  ];

  const columns = [
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'price',
      header: 'Preço',
      cell: ({ row }: any) => {
        const price = row.getValue('price');
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price);
      },
    },
    {
      accessorKey: 'stock',
      header: 'Estoque',
    },
  ];

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Buscar produtos..."
      />
    </div>
  );
}

// Preview de imagem
export function ImagePreviewExample() {
  return (
    <div className="flex space-x-4 p-6">
      <ImagePreview
        src="/placeholder-image.jpg"
        alt="Produto 1"
        className="w-20 h-20"
      />
      <ImagePreview
        src=""
        alt="Sem imagem"
        className="w-20 h-20"
      />
    </div>
  );
} 