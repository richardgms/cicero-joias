import { Order, Prisma, OrderStatus } from '@prisma/client';
import { BaseRepository } from './base-repository';

// Tipos específicos para operações com Pedido
export type OrderCreateInput = Prisma.OrderCreateInput;
export type OrderUpdateInput = Prisma.OrderUpdateInput;

// Repositório específico para a entidade Pedido
export class OrderRepository extends BaseRepository<Order, OrderCreateInput, OrderUpdateInput> {
  constructor() {
    super('order'); // Nome do modelo no Prisma
  }

  // Métodos específicos para Pedido
  
  // Buscar pedidos de um cliente específico
  async findByClientId(clientId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Buscar pedidos com dados do cliente
  async findWithClient(id: string): Promise<Order & { client: any } | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });
  }
  
  // Buscar pedidos por status
  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { status },
      orderBy: { updatedAt: 'desc' },
      take: 50,
    });
  }
  
  // Atualizar status de um pedido e registrar no histórico
  async updateStatus(id: string, status: OrderStatus, description?: string): Promise<Order> {
    return this.prisma.$transaction(async (tx) => {
      // Criar registro no histórico
      await tx.orderStatusHistory.create({
        data: {
          status,
          description,
          order: { connect: { id } },
        },
      });
      
      // Atualizar status do pedido
      return tx.order.update({
        where: { id },
        data: { 
          status,
          updatedAt: new Date(), 
        },
      });
    });
  }
  
  // Buscar pedidos com histórico de status e anexos
  async findWithDetails(id: string): Promise<Order & { statusHistory: any[]; attachments: any[] } | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'desc' },
        },
        attachments: true,
        client: true,
        quoteRequest: true,
      },
    });
  }
}

// Instância singleton do repositório
export const orderRepository = new OrderRepository(); 