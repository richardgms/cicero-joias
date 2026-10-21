'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical, Palette, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface Category {
    id: string;
    name: string;
    color: string;
    type: 'PORTFOLIO' | 'PRODUCT';
    order: number;
    isActive: boolean;
    itemCount: number;
    createdAt: string;
}

interface AdminCategoriesClientProps {
    initialCategories: Category[];
}

const colorPresets = [
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Roxo', value: '#8B5CF6' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Laranja', value: '#F59E0B' },
    { name: 'Vermelho', value: '#EF4444' },
    { name: 'Cinza', value: '#6B7280' },
    { name: 'Dourado', value: '#D97706' },
];

// Celular e tablet: lista compacta com editar/excluir à vista (a tabela fica no desktop)
function MobileCategoryList({
    categories,
    onEdit,
    onDelete,
}: {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: string, name: string) => void;
}) {
    return (
        <ul className="divide-y divide-gray-200 lg:hidden">
            {categories.map((category) => (
                <li key={category.id} className="flex items-center gap-3 py-2">
                    <span
                        className="h-6 w-6 shrink-0 rounded-full border"
                        style={{ backgroundColor: category.color }}
                        aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="font-medium leading-snug text-gray-900">{category.name}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            <Badge variant={category.isActive ? "default" : "secondary"}>
                                {category.isActive ? "Ativa" : "Inativa"}
                            </Badge>
                            <span className="text-xs text-gray-600">
                                {category.itemCount} itens · ordem {category.order}
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 shrink-0"
                        onClick={() => onEdit(category)}
                        aria-label={`Editar ${category.name}`}
                    >
                        <Edit className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 shrink-0 text-red-600 hover:text-red-700"
                        onClick={() => onDelete(category.id, category.name)}
                        aria-label={`Excluir ${category.name}`}
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </li>
            ))}
        </ul>
    );
}

export function AdminCategoriesClient({ initialCategories }: AdminCategoriesClientProps) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        color: '#3B82F6',
        type: 'PORTFOLIO' as 'PORTFOLIO' | 'PRODUCT',
    });

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingCategory
                ? `/api/admin/categories/${editingCategory.id}`
                : '/api/admin/categories';

            const method = editingCategory ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchCategories();
                setIsDialogOpen(false);
                resetForm();
            }
        } catch (error) {
            console.error('Erro ao salvar categoria:', error);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            color: category.color,
            type: category.type,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Tem certeza que deseja deletar a categoria "${name}"?`)) {
            try {
                const response = await fetch(`/api/admin/categories/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchCategories();
                }
            } catch (error) {
                console.error('Erro ao deletar categoria:', error);
            }
        }
    };

    const resetForm = () => {
        setEditingCategory(null);
        setFormData({
            name: '',
            color: '#3B82F6',
            type: 'PORTFOLIO',
        });
    };

    const portfolioCategories = categories.filter(c => c.type === 'PORTFOLIO');
    const productCategories = categories.filter(c => c.type === 'PRODUCT');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Categorias</h1>
                    <p className="text-gray-600 mt-2">
                        Gerencie as categorias de portfólio e produtos
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="h-4 w-4 mr-2" />
                            Nova Categoria
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
                        <DialogHeader>
                            <DialogTitle>
                                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nome da Categoria</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ex: Anéis de Formatura"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="type">Tipo</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData({ ...formData, type: value as 'PORTFOLIO' | 'PRODUCT' })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PORTFOLIO">Portfólio</SelectItem>
                                        <SelectItem value="PRODUCT">Produto</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="color">Cor</Label>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    {colorPresets.map((preset) => (
                                        <button
                                            key={preset.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, color: preset.value })}
                                            className={`w-full h-10 rounded-lg border-2 transition-all ${formData.color === preset.value
                                                ? 'border-gray-900 scale-110'
                                                : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                            style={{ backgroundColor: preset.value }}
                                            title={preset.name}
                                        />
                                    ))}
                                </div>
                                <Input
                                    id="color"
                                    type="color"
                                    value={formData.color}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    className="mt-2 h-12"
                                />
                            </div>

                            <div className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:items-center">
                                <Button type="submit" className="h-11 sm:h-10 sm:flex-1">
                                    <Save className="h-4 w-4 mr-2" />
                                    {editingCategory ? 'Atualizar' : 'Criar'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-11 sm:h-10"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{categories.length}</div>
                        <p className="text-xs text-muted-foreground">Total de Categorias</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{portfolioCategories.length}</div>
                        <p className="text-xs text-muted-foreground">Portfólio</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{productCategories.length}</div>
                        <p className="text-xs text-muted-foreground">Produtos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">
                            {categories.filter(c => c.isActive).length}
                        </div>
                        <p className="text-xs text-muted-foreground">Ativas</p>
                    </CardContent>
                </Card>
            </div>

            {/* Portfolio Categories */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Palette className="h-5 w-5 mr-2" />
                        Categorias de Portfólio ({portfolioCategories.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <MobileCategoryList categories={portfolioCategories} onEdit={handleEdit} onDelete={handleDelete} />
                    <div className="hidden lg:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">Ordem</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Cor</TableHead>
                                <TableHead>Itens</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-24">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {portfolioCategories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                                            <span className="text-sm">{category.order}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{category.name}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-6 h-6 rounded-full border"
                                                style={{ backgroundColor: category.color }}
                                            />
                                            <span className="text-sm text-gray-500">{category.color}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{category.itemCount} itens</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={category.isActive ? "default" : "secondary"}>
                                            {category.isActive ? "Ativa" : "Inativa"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(category)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(category.id, category.name)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                    {!portfolioCategories.length && (
                        <div className="text-center py-8 text-gray-500">
                            Nenhuma categoria de portfólio encontrada
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Product Categories */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Palette className="h-5 w-5 mr-2" />
                        Categorias de Produtos ({productCategories.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <MobileCategoryList categories={productCategories} onEdit={handleEdit} onDelete={handleDelete} />
                    <div className="hidden lg:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">Ordem</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Cor</TableHead>
                                <TableHead>Itens</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-24">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productCategories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                                            <span className="text-sm">{category.order}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{category.name}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-6 h-6 rounded-full border"
                                                style={{ backgroundColor: category.color }}
                                            />
                                            <span className="text-sm text-gray-500">{category.color}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{category.itemCount} itens</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={category.isActive ? "default" : "secondary"}>
                                            {category.isActive ? "Ativa" : "Inativa"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(category)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(category.id, category.name)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                    {!productCategories.length && (
                        <div className="text-center py-8 text-gray-500">
                            Nenhuma categoria de produto encontrada
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
