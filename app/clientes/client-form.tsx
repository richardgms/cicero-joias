'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { useCreateClient, useUpdateClient } from '@/hooks/queries/use-clients'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// Schema de validação com Zod
const clientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientFormProps {
  defaultValues?: Partial<ClientFormValues>
  clientId?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function ClientForm({
  defaultValues = {
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
  },
  clientId,
  onSuccess,
  onCancel,
}: ClientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const isEditMode = Boolean(clientId)

  // Hooks do TanStack Query para criar e atualizar clientes
  const createClient = useCreateClient()
  const updateClient = clientId ? useUpdateClient(clientId) : null

  // React Hook Form com validação Zod
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  })

  // Handler de submit do formulário
  const onSubmit = async (data: ClientFormValues) => {
    setIsSubmitting(true)
    
    try {
      if (isEditMode && updateClient) {
        // Atualizar cliente existente
        await updateClient.mutateAsync(data)
        toast({
          title: 'Cliente atualizado',
          description: 'Os dados do cliente foram atualizados com sucesso.',
        })
      } else {
        // Criar novo cliente
        await createClient.mutateAsync(data)
        toast({
          title: 'Cliente criado',
          description: 'O cliente foi cadastrado com sucesso.',
        })
        form.reset() // Limpar formulário após criar
      }
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
      toast({
        title: 'Erro ao salvar',
        description: (error as Error)?.message || 'Ocorreu um erro ao salvar os dados do cliente.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome completo"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="(00) 0000-0000"
                  {...field}
                  value={field.value || ''}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp</FormLabel>
              <FormControl>
                <Input
                  placeholder="(00) 00000-0000"
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
                ? 'Atualizar Cliente' 
                : 'Cadastrar Cliente'
            }
          </Button>
        </div>
      </form>
    </Form>
  )
} 