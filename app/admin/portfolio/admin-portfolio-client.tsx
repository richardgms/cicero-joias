'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useDeletePortfolioItem } from '@/hooks/use-portfolio';
import { useRouter } from 'next/navigation';
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

export interface AdminPortfolioItem {
    id: string;
    title: string;
    category: string;
    mainImage: string;
    isActive: boolean;
    isFeatured: boolean;
    order: number;
    createdAt: string;
}

interface AdminPortfolioClientProps {
    initialItems: AdminPortfolioItem[];
}

const categoryLabels = {
    WEDDING_RINGS: 'Alianças de Casamento',
    REPAIRS_BEFORE_AFTER: 'Consertos (Antes/Depois)',
    GOLD_PLATING: 'Banho de Ouro',
    CUSTOM_JEWELRY: 'Joias Personalizadas',
    GRADUATION_RINGS: 'Anéis de Formatura',
};

export function AdminPortfolioClient({ initialItems }: AdminPortfolioClientProps) {
    const [items, setItems] = useState<AdminPortfolioItem[]>(initialItems);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const { toast } = useToast();
    const router = useRouter();

    const deletePortfolioMutation = useDeletePortfolioItem();

    const portfolioStats = useMemo(() => {
        const total = items.length;
        const totalActive = items.filter(item => item.isActive).length;
        const totalInactive = total - totalActive;
        const totalCategories = new Set(items.map(item => item.category)).size;

        return {
            total,
            totalActive,
            totalInactive,
            totalCategories,
        };
    }, [items]);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Tem certeza que deseja deletar "${title}"?`)) {
            return;
        }

        try {
            await deletePortfolioMutation.mutateAsync(id);

            // Optimistic UI update: remove item immediately from local state
            setItems(prev => prev.filter(item => item.id !== id));

            toast({
                title: "Projeto deletado",
                description: `"${title}" foi removido do portfólio com sucesso.`,
            });

            // Refresh router in background to ensure server consistency
            router.refresh();
        } catch (error: any) {
            console.error('❌ Erro ao deletar projeto:', error);

            toast({
                title: "Erro ao deletar",
                description: error.message || "Não foi possível deletar o projeto. Tente novamente.",
                variant: "destructive",
            });
        }
    };

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
            const matchesStatus = statusFilter === 'all' ||
                (statusFilter === 'active' && item.isActive) ||
                (statusFilter === 'inactive' && !item.isActive);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [items, searchTerm, categoryFilter, statusFilter]);

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{portfolioStats.total}</div>
                        <p className="text-xs text-muted-foreground">Total de Projetos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{portfolioStats.totalActive}</div>
                        <p className="text-xs text-muted-foreground">Ativos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{portfolioStats.totalInactive}</div>
                        <p className="text-xs text-muted-foreground">Inativos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{portfolioStats.totalCategories}</div>
                        <p className="text-xs text-muted-foreground">Categorias</p>
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
                                placeholder="Buscar projetos..."
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
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Projetos ({filteredItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Imagem</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Destaque</TableHead>
                                <TableHead>Ordem</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className="w-16">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.mainImage}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{item.title}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {categoryLabels[item.category as keyof typeof categoryLabels]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.isActive ? "default" : "secondary"}>
                                            {item.isActive ? "Ativo" : "Inativo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {item.isFeatured ? (
                                            <Badge className="bg-amber-100 text-amber-900 border-amber-300">
                                                ⭐ Destaque
                                            </Badge>
                                        ) : (
                                            <span className="text-gray-400 text-xs">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{item.order}</TableCell>
                                    <TableCell>
                                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
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
                                                    <Link href={`/portfolio/${item.id}`}>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        Visualizar
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/portfolio/${item.id}/edit`}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Editar
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(item.id, item.title)}
                                                    className="text-red-600"
                                                    disabled={deletePortfolioMutation.isPending}
                                                >
                                                    {deletePortfolioMutation.isPending ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                                                            Deletando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Deletar
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Nenhum projeto encontrado</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div >
    );
}
