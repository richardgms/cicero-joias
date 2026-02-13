'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Edit, Trash2, Eye, MoreHorizontal, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface AdminProductItem {
    id: string;
    name: string;
    description?: string;
    price: number | null;
    category: string;
    isActive: boolean;
    isReadyDelivery: boolean;
    mainImage: string | null;
    stock: number;
    code: string | null;
    createdAt: string;
    _count: {
        portfolioItems: number;
    };
}

interface AdminProductsClientProps {
    initialProducts: AdminProductItem[];
}

const categoryLabels = {
    JEWELRY: 'Joias',
    RINGS: 'Anéis',
    NECKLACES: 'Colares',
    EARRINGS: 'Brincos',
    BRACELETS: 'Pulseiras',
    WATCHES: 'Relógios',
    ACCESSORIES: 'Acessórios',
};

export function AdminProductsClient({ initialProducts }: AdminProductsClientProps) {
    const [products, setProducts] = useState<AdminProductItem[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [stockFilter, setStockFilter] = useState<string>('all');
    const { toast } = useToast();
    const router = useRouter();

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Tem certeza que deseja deletar "${name}"?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Optimistic UI update
                setProducts(prev => prev.filter(product => product.id !== id));
                toast({
                    title: "Produto deletado",
                    description: `"${name}" foi removido com sucesso.`,
                });
                router.refresh();
            } else {
                const error = await response.json();
                toast({
                    title: "Erro ao deletar",
                    description: error.error || "Erro ao deletar produto",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Erro ao deletar:', error);
            toast({
                title: "Erro ao deletar",
                description: "Ocorreu um erro ao tentar deletar o produto.",
                variant: "destructive",
            });
        }
    };

    // Memoize filtered products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.code?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
            const matchesStatus = statusFilter === 'all' ||
                (statusFilter === 'active' && product.isActive) ||
                (statusFilter === 'inactive' && !product.isActive);
            const matchesStock = stockFilter === 'all' ||
                (stockFilter === 'in_stock' && product.stock > 0) ||
                (stockFilter === 'out_of_stock' && product.stock === 0);

            return matchesSearch && matchesCategory && matchesStatus && matchesStock;
        });
    }, [products, searchTerm, categoryFilter, statusFilter, stockFilter]);

    // Memoize stats
    const stats = useMemo(() => ({
        totalValue: products.reduce((sum, product) => sum + (product.price || 0) * product.stock, 0),
        lowStockProducts: products.filter(product => product.stock > 0 && product.stock <= 5).length,
        totalActive: products.filter(p => p.isActive).length,
        totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    }), [products]);

    return (
        <div className="space-y-6">
            {/* Stats - Memoized for performance */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{products.length}</div>
                        <p className="text-xs text-muted-foreground">Total de Produtos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{stats.totalActive}</div>
                        <p className="text-xs text-muted-foreground">Ativos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{stats.totalStock}</div>
                        <p className="text-xs text-muted-foreground">Itens em Estoque</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-red-600">{stats.lowStockProducts}</div>
                        <p className="text-xs text-muted-foreground">Estoque Baixo</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">
                            R$ {stats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-muted-foreground">Valor Total</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Buscar produtos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas as categorias</SelectItem>
                                {Object.entries(categoryLabels).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-32">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="active">Ativos</SelectItem>
                                <SelectItem value="inactive">Inativos</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={stockFilter} onValueChange={setStockFilter}>
                            <SelectTrigger className="w-full md:w-36">
                                <SelectValue placeholder="Estoque" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="in_stock">Em Estoque</SelectItem>
                                <SelectItem value="out_of_stock">Sem Estoque</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Produtos ({filteredProducts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Imagem</TableHead>
                                <TableHead>Produto</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Preço</TableHead>
                                <TableHead>Estoque</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Código</TableHead>
                                <TableHead className="w-16">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                            {product.mainImage ? (
                                                <Image
                                                    src={product.mainImage}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package className="h-6 w-6 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{product.name}</div>
                                            {product.description && (
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {product.description}
                                                </div>
                                            )}
                                            {product._count.portfolioItems > 0 && (
                                                <div className="text-xs text-blue-600 mt-1">
                                                    {product._count.portfolioItems} no portfólio
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {categoryLabels[product.category as keyof typeof categoryLabels]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {product.price !== null ? (
                                            <span className="font-medium">
                                                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className={`font-medium ${product.stock <= 5 && product.stock > 0 ? 'text-orange-600' : product.stock === 0 ? 'text-red-600' : ''}`}>
                                                {product.stock}
                                            </span>
                                            {product.stock <= 5 && product.stock > 0 && (
                                                <Badge variant="outline" className="text-orange-600 border-orange-600">
                                                    Baixo
                                                </Badge>
                                            )}
                                            {product.stock === 0 && (
                                                <Badge variant="outline" className="text-red-600 border-red-600">
                                                    Esgotado
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <Badge variant={product.isActive ? "default" : "secondary"}>
                                                {product.isActive ? "Ativo" : "Inativo"}
                                            </Badge>
                                            {product.isReadyDelivery && (
                                                <Badge variant="outline" className="text-green-600 border-green-600">
                                                    Pronta Entrega
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-gray-500">
                                            {product.code || '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/products/${product.id}`}>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        Visualizar
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/products/${product.id}/edit`}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Editar
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Deletar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Nenhum produto encontrado</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
