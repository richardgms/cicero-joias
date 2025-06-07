import { Client, Prisma } from '@prisma/client';
import { BaseRepository } from './base-repository';

// Tipos específicos para operações com Cliente
export type ClientCreateInput = Prisma.ClientCreateInput;
export type ClientUpdateInput = Prisma.ClientUpdateInput;

// Repositório específico para a entidade Cliente
export class ClientRepository extends BaseRepository<Client, ClientCreateInput, ClientUpdateInput> {
  constructor() {
    super('client'); // Nome do modelo no Prisma
  }

  // Métodos específicos para Cliente
  
  // Buscar cliente por email
  async findByEmail(email: string): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: { email },
    });
  }

  // Buscar clientes por termo de busca (nome ou email)
  async findBySearchTerm(term: string): Promise<Client[]> {
    return this.prisma.client.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { email: { contains: term, mode: 'insensitive' } },
        ],
      },
      take: 20,
    });
  }
  
  // Buscar clientes com seus pedidos
  async findWithOrders(id: string): Promise<Client & { orders: any[] } | null> {
    return this.prisma.client.findUnique({
      where: { id },
      include: {
        orders: true,
      },
    });
  }
  
  // Atualizar pontos de fidelidade de um cliente
  async updateLoyaltyPoints(id: string, points: number): Promise<Client> {
    return this.prisma.client.update({
      where: { id },
      data: { 
        loyaltyPoints: { increment: points },
        // Atualiza automaticamente o nível conforme pontos
        loyaltyLevel: 
          points >= 1000 ? 'VIP' : 
          points >= 500 ? 'SPECIAL' : 
          'CLIENT'
      },
    });
  }
}

// Instância singleton do repositório
export const clientRepository = new ClientRepository(); 