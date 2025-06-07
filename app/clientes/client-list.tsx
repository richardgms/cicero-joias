'use client'

import { useClients, useDeleteClient } from '@/hooks/queries/use-clients'
import { useState } from 'react'
import { LoyaltyLevel, Client } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { ClientDialog } from './client-dialog'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2 } from "lucide-react"

export function ClientList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [clientToDelete, setClientToDelete] = useState<string | null>(null)
  const pageSize = 10
  const { toast } = useToast()
  
  // Usar o hook de TanStack Query para buscar clientes
  const { 
    data: clients = [], 
    isLoading, 
    isError, 
    error 
  } = useClients({ 
    skip: page * pageSize, 
    take: pageSize, 
    search: searchQuery 
  })

  // Hook para exclusão de cliente
  const deleteClient = useDeleteClient(clientToDelete || '')

  // Função auxiliar para formatar o nível de fidelidade
  function formatLoyaltyLevel(level: LoyaltyLevel) {
    const levels = {
      CLIENT: 'Cliente',
      SPECIAL: 'Especial',
      VIP: 'VIP'
    }
    return levels[level] || level
  }

  const handleSearch = () => {
    setSearchQuery(searchTerm)
    setPage(0) // Resetar para a primeira página ao buscar
  }

  const handleNextPage = () => {
    setPage(prev => prev + 1)
  }

  const handlePreviousPage = () => {
    setPage(prev => Math.max(0, prev - 1))
  }

  const handleDeleteClick = (clientId: string) => {
    setClientToDelete(clientId)
  }

  const handleConfirmDelete = async () => {
    if (!clientToDelete) return
    
    try {
      await deleteClient.mutateAsync()
      toast({
        title: "Cliente excluído",
        description: "O cliente foi excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir cliente:", error)
      toast({
        title: "Erro ao excluir",
        description: (error as Error)?.message || "Ocorreu um erro ao excluir o cliente.",
        variant: "destructive",
      })
    } finally {
      setClientToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setClientToDelete(null)
  }

  if (isError) {
    toast({
      title: 'Erro ao carregar clientes',
      description: (error as Error)?.message || 'Ocorreu um erro desconhecido',
      variant: 'destructive'
    })
  }

  return (
    <div className="space-y-4">
      {/* Barra de pesquisa */}
      <div className="flex gap-2">
        <Input
          placeholder="Buscar por nome ou email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : clients.length === 0 ? (
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <p className="text-yellow-700">
            {searchQuery ? 'Nenhum cliente encontrado para esta busca.' : 'Nenhum cliente cadastrado ainda.'}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Nome</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Telefone</th>
                  <th className="py-3 px-4 text-left">Pontos</th>
                  <th className="py-3 px-4 text-left">Nível</th>
                  <th className="py-3 px-4 text-left">Data de Cadastro</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client: Client) => (
                  <tr key={client.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{client.name}</td>
                    <td className="py-3 px-4">{client.email}</td>
                    <td className="py-3 px-4">{client.phone || '-'}</td>
                    <td className="py-3 px-4">{client.loyaltyPoints}</td>
                    <td className="py-3 px-4">{formatLoyaltyLevel(client.loyaltyLevel)}</td>
                    <td className="py-3 px-4">
                      {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <ClientDialog 
                          clientId={client.id} 
                          triggerLabel="Editar" 
                          mode="edit" 
                        />
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteClick(client.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o cliente "{client.name}"?
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={handleCancelDelete}>
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={handleConfirmDelete}>
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="flex justify-between items-center mt-4">
            <Button 
              onClick={handlePreviousPage} 
              disabled={page === 0}
              variant="outline"
            >
              Anterior
            </Button>
            <span>Página {page + 1}</span>
            <Button 
              onClick={handleNextPage} 
              disabled={clients.length < pageSize}
              variant="outline"
            >
              Próxima
            </Button>
          </div>
        </>
      )}
      
      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={!!clientToDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 