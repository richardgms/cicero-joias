import { Product, Prisma } from '@prisma/client';
import { BaseRepository } from './base-repository';

// Tipos específicos para operações com Produto
export type ProductCreateInput = Prisma.ProductCreateInput;
export type ProductUpdateInput = Prisma.ProductUpdateInput;

// Repositório específico para a entidade Produto
export class ProductRepository extends BaseRepository<Product, ProductCreateInput, ProductUpdateInput> {
  constructor() {
    super('product'); // Nome do modelo no Prisma
  }

  // Métodos específicos para Produto
  
  // Buscar produtos ativos
  async findActive(options?: { skip?: number; take?: number }): Promise<Product[]> {
    const { skip = 0, take = 100 } = options || {};
    return this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' },
      skip,
      take,
    });
  }

  // Buscar produtos de pronta entrega
  async findReadyDelivery(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { 
        isActive: true,
        isReadyDelivery: true 
      },
      orderBy: { updatedAt: 'desc' },
    });
  }
  
  // Buscar produtos com itens de portfólio relacionados
  async findWithPortfolioItems(id: string): Promise<Product & { portfolioItems: any[] } | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        portfolioItems: true,
      },
    });
  }
  
  // Buscar produtos por termo de busca (nome ou descrição)
  async findBySearchTerm(term: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
        ],
      },
      take: 20,
    });
  }
  
  // Ativar ou desativar um produto
  async toggleActive(id: string, isActive: boolean): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: { isActive },
    });
  }
}

// Instância singleton do repositório
export const productRepository = new ProductRepository(); 