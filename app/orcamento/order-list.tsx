'use client'

import { useOrders, useDeleteOrder } from '@/hooks/queries/use-orders'
import { useState } from 'react'
import { OrderStatus } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
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
import { Trash2, Eye } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function OrderList() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const [page, setPage] = useState(0)
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null)
  const pageSize = 10
  const { toast } = useToast()
  
  // Usar o hook de TanStack Query para buscar orçamentos
  const { 
    data: orders = [], 
    isLoading, 
    isError, 
    error 
  } = useOrders({ 
    skip: page * pageSize, 
    take: pageSize, 
    status: statusFilter === 'ALL' ? undefined : statusFilter
  })

  // Hook para exclusão de orçamento
  const deleteOrder = useDeleteOrder(orderToDelete || '')

  // Função auxiliar para formatar o status
  function formatStatus(status: OrderStatus) {
    const statusMap: Record<string, { label: string, variant: 'default' | 'outline' | 'secondary' | 'destructive' }> = {
      PENDING: { label: 'Pendente', variant: 'default' },
      IN_PROGRESS: { label: 'Em Progresso', variant: 'secondary' },
      COMPLETED: { label: 'Concluído', variant: 'outline' },
      CANCELLED: { label: 'Cancelado', variant: 'destructive' }
    }
    
    return statusMap[status] || { label: status, variant: 'default' }
  }

  const handleNextPage = () => {
    setPage(prev => prev + 1)
  }

  const handlePreviousPage = () => {
    setPage(prev => Math.max(0, prev - 1))
  }

  const handleDeleteClick = (orderId: string) => {
    setOrderToDelete(orderId)
  }

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return
    
    try {
      await deleteOrder.mutateAsync()
      toast({
        title: "Orçamento excluído",
        description: "O orçamento foi excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir orçamento:", error)
      toast({
        title: "Erro ao excluir",
        description: (error as Error)?.message || "Ocorreu um erro ao excluir o orçamento.",
        variant: "destructive",
      })
    } finally {
      setOrderToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setOrderToDelete(null)
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as OrderStatus | 'ALL')
    setPage(0) // Resetar para a primeira página ao filtrar
  }

  if (isError) {
    toast({
      title: 'Erro ao carregar orçamentos',
      description: (error as Error)?.message || 'Ocorreu um erro desconhecido',
      variant: 'destructive'
    })
  }

  return (
    <div className="space-y-4">
      {/* Filtro de status */}
      <div className="flex justify-end">
        <Select
          value={statusFilter}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os status</SelectItem>
            <SelectItem value="PENDING">Pendente</SelectItem>
            <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
            <SelectItem value="COMPLETED">Concluído</SelectItem>
            <SelectItem value="CANCELLED">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <p className="text-yellow-700">
            {statusFilter !== 'ALL' 
              ? `Nenhum orçamento com status "${formatStatus(statusFilter as OrderStatus).label}" encontrado.` 
              : 'Nenhum orçamento cadastrado ainda.'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Cliente</th>
                  <th className="py-3 px-4 text-left">Categoria</th>
                  <th className="py-3 px-4 text-left">Valor</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Data</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{order.client?.name || 'Cliente não informado'}</td>
                    <td className="py-3 px-4">{order.category}</td>
                    <td className="py-3 px-4">{formatCurrency(order.totalValue)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={formatStatus(order.status).variant}>
                        {formatStatus(order.status).label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/orcamento/${order.id}`}>
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteClick(order.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir este orçamento?
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
              disabled={orders.length < pageSize}
              variant="outline"
            >
              Próxima
            </Button>
          </div>
        </>
      )}
      
      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={!!orderToDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este orçamento?
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