'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ClientForm } from './client-form'
import { useClient } from '@/hooks/queries/use-clients'
import { Skeleton } from '@/components/ui/skeleton'

interface ClientDialogProps {
  clientId?: string
  triggerLabel: string
  mode: 'create' | 'edit'
}

export function ClientDialog({ clientId, triggerLabel, mode }: ClientDialogProps) {
  const [open, setOpen] = useState(false)
  
  // Só busca os dados se estiver em modo de edição e tiver ID
  const { data: client, isLoading } = useClient(
    clientId || '', 
    false // não incluir pedidos
  )

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant={mode === 'create' ? 'default' : 'outline'}
          size={mode === 'create' ? 'default' : 'sm'}
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Cadastrar Novo Cliente' : 'Editar Cliente'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Preencha os campos abaixo para cadastrar um novo cliente.'
              : 'Edite os dados do cliente conforme necessário.'
            }
          </DialogDescription>
        </DialogHeader>

        {mode === 'edit' && isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <ClientForm 
            clientId={clientId}
            defaultValues={mode === 'edit' ? {
              name: client?.name || '',
              email: client?.email || '',
              phone: client?.phone || '',
              whatsapp: client?.whatsapp || ''
            } : undefined}
            onSuccess={handleSuccess}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
} 