'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { useCreateOrder, useUpdateOrder } from '@/hooks/queries/use-orders'
import { useClients } from '@/hooks/queries/use-clients'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Client } from '@prisma/client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Schema de validação com Zod
const orderSchema = z.object({
  totalValue: z.coerce.number().min(1, 'Valor deve ser maior que zero'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  description: z.string().optional(),
  clientId: z.string().min(1, 'Cliente é obrigatório')
})

type OrderFormValues = z.infer<typeof orderSchema>

interface OrderFormProps {
  defaultValues?: Partial<OrderFormValues>
  orderId?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function OrderForm({
  defaultValues = {
    totalValue: 0,
    category: '',
    description: '',
    clientId: ''
  },
  orderId,
  onSuccess,
  onCancel,
}: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const isEditMode = Boolean(orderId)

  // Buscar lista de clientes para o select
  const { data: clients = [], isLoading: isLoadingClients } = useClients()

  // Hooks do TanStack Query para criar e atualizar orçamentos
  const createOrder = useCreateOrder()
  const updateOrder = orderId ? useUpdateOrder(orderId) : null

  // React Hook Form com validação Zod
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues,
  })

  // Handler de submit do formulário
  const onSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true)
    
    try {
      if (isEditMode && updateOrder) {
        // Atualizar orçamento existente
        await updateOrder.mutateAsync(data)
        toast({
          title: 'Orçamento atualizado',
          description: 'O orçamento foi atualizado com sucesso.',
        })
      } else {
        // Criar novo orçamento
        await createOrder.mutateAsync(data)
        toast({
          title: 'Orçamento criado',
          description: 'O orçamento foi cadastrado com sucesso.',
        })
        form.reset() // Limpar formulário após criar
      }
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Erro ao salvar orçamento:', error)
      toast({
        title: 'Erro ao salvar',
        description: (error as Error)?.message || 'Ocorreu um erro ao salvar o orçamento.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const categorias = [
    'Aliança',
    'Anel',
    'Brinco',
    'Colar',
    'Pulseira',
    'Pingente',
    'Conserto',
    'Banho',
    'Outro'
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente*</FormLabel>
              <Select
                disabled={isSubmitting || isLoadingClients}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients.map((client: Client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria*</FormLabel>
              <Select
                disabled={isSubmitting}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor Total (R$)*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detalhes do orçamento"
                  className="resize-none"
                  {...field}
                  value={field.value || ''}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting 
              ? 'Salvando...' 
              : isEditMode 
                ? 'Atualizar Orçamento' 
                : 'Criar Orçamento'
            }
          </Button>
        </div>
      </form>
    </Form>
  )
} 