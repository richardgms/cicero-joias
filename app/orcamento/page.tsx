'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Clock, CheckCircle2, Gem } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OrderForm } from './order-form'

const quoteTypes = [
  { value: 'alianças', label: 'Alianças de Casamento', description: 'Alianças personalizadas para o seu grande dia' },
  { value: 'consertos', label: 'Consertos de Joias', description: 'Restauração e reparo de suas peças preciosas' },
  { value: 'banho-ouro', label: 'Banho de Ouro', description: 'Renovação com acabamento dourado premium' },
  { value: 'anel-formatura', label: 'Anel de Formatura', description: 'Anel personalizado para sua conquista' },
  { value: 'joia-personalizada', label: 'Joia Personalizada', description: 'Criação única baseada na sua ideia' },
  { value: 'lente-oculos', label: 'Lente de Óculos', description: 'Orçamento para lentes oftálmicas' }
];

const whatsappMessages = {
  'alianças': 'Olá! Vim pelo site da Cícero Joias e gostaria de solicitar um orçamento para Alianças de Casamento.',
  'consertos': 'Olá! Vim pelo site da Cícero Joias e gostaria de solicitar um orçamento para Consertos de Joias.',
  'banho-ouro': 'Olá! Vim pelo site da Cícero Joias e gostaria de solicitar um orçamento para Banho de Ouro.',
  'anel-formatura': 'Olá! Vim pelo site da Cícero Joias e gostaria de solicitar um orçamento para Anel de Formatura.',
  'joia-personalizada': 'Olá! Vim pelo site da Cícero Joias e gostaria de solicitar um orçamento para Joia Personalizada.',
  'lente-oculos': 'Olá! Vim pelo site da Cícero Joias e gostaria de solicitar um orçamento para Lente de Óculos.'
};

function OrcamentoForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    type: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial quote type from URL params
  useEffect(() => {
    const tipo = searchParams.get('tipo');
    if (tipo && quoteTypes.find(qt => qt.value === tipo)) {
      setFormData(prev => ({ ...prev, type: tipo }));
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.type) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate saving to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Orçamento solicitado com sucesso!",
        description: "Você será redirecionado para o WhatsApp para continuar o atendimento.",
      });

      // Redirect to WhatsApp
      const selectedType = quoteTypes.find(qt => qt.value === formData.type);
      const message = whatsappMessages[formData.type as keyof typeof whatsappMessages] || 
                     'Olá! Vim pelo site da Cícero Joias e gostaria de solicitar um orçamento.';
      
      const whatsappUrl = `https://wa.me/5583988073784?text=${encodeURIComponent(message)}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1500);

    } catch (error) {
      toast({
        title: "Erro ao enviar orçamento",
        description: "Tente novamente ou entre em contato diretamente pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo *</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Seu nome completo"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(83) 99999-9999"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            placeholder="(83) 99999-9999 (opcional)"
          />
        </div>
      </div>

      {/* Quote Type */}
      <div className="space-y-2">
        <Label htmlFor="type">Tipo de Orçamento *</Label>
        <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de serviço" />
          </SelectTrigger>
          <SelectContent>
            {quoteTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div>
                  <div className="font-medium">{type.label}</div>
                  <div className="text-sm text-slate-500">{type.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description for repairs */}
      {formData.type === 'consertos' && (
        <div className="space-y-2">
          <Label htmlFor="description">Descreva o conserto necessário</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Descreva detalhadamente o tipo de conserto que sua joia precisa..."
            rows={4}
          />
        </div>
      )}

      {/* General description for other types */}
      {formData.type && formData.type !== 'consertos' && (
        <div className="space-y-2">
          <Label htmlFor="description">Informações adicionais (opcional)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Conte-nos mais sobre o que você tem em mente..."
            rows={4}
          />
        </div>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Enviando...
          </>
        ) : (
          <>Solicitar Orçamento</>
        )}
      </Button>
    </form>
  );
}

export default function OrcamentoPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Novo Orçamento</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <OrderForm />
      </div>
      
      <div className="mt-6">
        <p className="text-gray-600 text-sm">
          * Esta página utiliza o TanStack Query para gerenciamento de estado e cache dos dados.
        </p>
      </div>
    </div>
  )
}