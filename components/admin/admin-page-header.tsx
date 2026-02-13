'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AdminPageHeaderProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export function AdminPageHeader({ title, description, children }: AdminPageHeaderProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.refresh();
        setTimeout(() => {
            setIsRefreshing(false);
            toast({
                title: "Atualizado",
                description: "Lista atualizada.",
            });
        }, 1000);
    };

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    size="sm"
                >
                    {isRefreshing ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    {isRefreshing ? 'Atualizando...' : 'Atualizar'}
                </Button>
                {children}
            </div>
        </div>
    );
}
