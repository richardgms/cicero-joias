import { OrderList } from '../order-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ListarOrcamentosPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orçamentos</h1>
        <Button asChild>
          <Link href="/orcamento">Novo Orçamento</Link>
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <OrderList />
      </div>
      
      <div className="mt-6">
        <p className="text-gray-600 text-sm">
          * Esta página utiliza o TanStack Query para gerenciamento de estado e cache dos dados.
        </p>
      </div>
    </div>
  )
} 