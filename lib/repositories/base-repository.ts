import prisma from '../prisma';
import { PrismaClient } from '@prisma/client';

// Interface para operações CRUD genéricas
export interface IBaseRepository<T, CreateInput, UpdateInput> {
  findAll(options?: { skip?: number; take?: number }): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: CreateInput): Promise<T>;
  update(id: string, data: UpdateInput): Promise<T>;
  delete(id: string): Promise<T>;
  count(): Promise<number>;
}

// Classe base para repositórios que implementa operações CRUD genéricas
export abstract class BaseRepository<T, CreateInput, UpdateInput> implements IBaseRepository<T, CreateInput, UpdateInput> {
  protected readonly prisma: PrismaClient;
  protected readonly modelName: string;

  constructor(modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  // Método auxiliar para acessar o modelo Prisma dinamicamente
  protected get model(): any {
    return this.prisma[this.modelName as keyof typeof prisma];
  }

  // Implementação dos métodos CRUD

  async findAll(options?: { skip?: number; take?: number }): Promise<T[]> {
    const { skip = 0, take = 100 } = options || {};
    return this.model.findMany({ skip, take }) as Promise<T[]>;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
    }) as Promise<T | null>;
  }

  async create(data: CreateInput): Promise<T> {
    return this.model.create({
      data,
    }) as Promise<T>;
  }

  async update(id: string, data: UpdateInput): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    }) as Promise<T>;
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({
      where: { id },
    }) as Promise<T>;
  }

  async count(): Promise<number> {
    return this.model.count();
  }
} 