import { ClientList } from './client-list'
import { ClientDialog } from './client-dialog'

export default function ClientesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <ClientDialog 
          triggerLabel="Adicionar Cliente" 
          mode="create" 
        />
      </div>
      
      <ClientList />
      
      <div className="mt-6">
        <p className="text-gray-600 text-sm">
          * Esta página utiliza o TanStack Query para gerenciamento de estado e cache dos dados.
        </p>
      </div>
    </div>
  )
} 