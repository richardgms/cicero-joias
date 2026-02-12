'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RotateCcw, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LoadingScreen } from '@/components/ui/loading-screen';

interface DeletedItem {
    id: string;
    title: string;
    mainImage: string | null;
    deletedAt: string;
    status: string;
}

export default function TrashPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [items, setItems] = useState<DeletedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/trash');
            if (!response.ok) throw new Error('Falha ao carregar lixeira');
            const data = await response.json();
            setItems(data.items);
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível carregar os itens da lixeira.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleRestore = async (id: string) => {
        setProcessing(id);
        try {
            const response = await fetch('/api/admin/trash', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action: 'RESTORE' }),
            });

            if (!response.ok) throw new Error('Falha ao restaurar');

            toast({
                title: "Sucesso",
                description: "Item restaurado com sucesso.",
                className: "bg-green-500 text-white",
            });
            fetchItems(); // Refresh list
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao restaurar item.",
                variant: "destructive",
            });
        } finally {
            setProcessing(null);
        }
    };

    const handlePermanentDelete = async (id: string, title: string) => {
        if (!confirm(`Tem certeza que deseja excluir "${title}" PERMANENTEMENTE? Esta ação não pode ser desfeita.`)) return;

        setProcessing(id);
        try {
            const response = await fetch(`/api/admin/trash?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Falha ao excluir');

            toast({
                title: "Item excluído",
                description: "O item foi removido permanentemente do banco de dados.",
            });
            fetchItems(); // Refresh list
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao excluir item.",
                variant: "destructive",
            });
        } finally {
            setProcessing(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <LoadingScreen variant="inline" message="Carregando lixeira..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/portfolio">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Lixeira</h1>
                    <p className="text-muted-foreground">
                        Itens deletados nos últimos 30 dias.
                    </p>
                </div>
            </div>

            {items.length === 0 ? (
                <Card className="bg-muted/50">
                    <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                        <Trash2 className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Lixeira Vazia</h3>
                        <p className="text-sm text-muted-foreground">Não há itens deletados recentemente.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {/* Desktop Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b">
                        <div className="col-span-5">Item</div>
                        <div className="col-span-3">Deletado em</div>
                        <div className="col-span-4 text-right">Ações</div>
                    </div>

                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="grid md:grid-cols-12 gap-4 p-4 items-center">

                                    {/* Item Info */}
                                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-md bg-muted overflow-hidden relative shrink-0">
                                            {item.mainImage ? (
                                                <Image
                                                    src={item.mainImage}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-secondary">
                                                    <span className="text-xs text-muted-foreground">Sem img</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-medium truncate">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground truncate md:hidden">
                                                Deletado: {new Date(item.deletedAt).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Meta Info (Desktop) */}
                                    <div className="hidden md:block col-span-3 text-sm text-muted-foreground">
                                        {new Date(item.deletedAt).toLocaleDateString('pt-BR')} às {new Date(item.deletedAt).toLocaleTimeString('pt-BR')}
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-12 md:col-span-4 flex items-center justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRestore(item.id)}
                                            disabled={!!processing}
                                            className="w-full md:w-auto"
                                        >
                                            {processing === item.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            ) : (
                                                <RotateCcw className="h-4 w-4 mr-2" />
                                            )}
                                            Restaurar
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handlePermanentDelete(item.id, item.title)}
                                            disabled={!!processing}
                                            className="w-full md:w-auto"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only md:not-sr-only md:ml-2">Excluir</span>
                                        </Button>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
