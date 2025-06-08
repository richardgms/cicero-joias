'use client';

import { AlertTriangle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmModalProps {
  title?: string;
  description?: string;
  itemName?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  trigger?: React.ReactNode;
  variant?: 'default' | 'destructive';
}

export function DeleteConfirmModal({
  title,
  description,
  itemName,
  isLoading = false,
  onConfirm,
  onCancel,
  trigger,
  variant = 'destructive',
}: DeleteConfirmModalProps) {
  const defaultTitle = title || 'Confirmar exclusão';
  const defaultDescription = description || 
    `Tem certeza que deseja deletar ${itemName ? `"${itemName}"` : 'este item'}? Esta ação não pode ser desfeita.`;

  const defaultTrigger = (
    <Button variant={variant} size="sm">
      <Trash2 className="h-4 w-4 mr-2" />
      Deletar
    </Button>
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || defaultTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-lg font-semibold">
              {defaultTitle}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600 mt-2">
            {defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={isLoading}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deletando...
              </div>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Deletar
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Versão simplificada para uso inline
export function useDeleteConfirm() {
  const confirm = (
    title: string,
    description?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const result = window.confirm(
        description || `Tem certeza que deseja deletar "${title}"? Esta ação não pode ser desfeita.`
      );
      resolve(result);
    });
  };

  return { confirm };
}

// Hook para modal mais avançado
export function useDeleteModal() {
  const showDeleteModal = (
    onConfirm: () => void,
    options?: {
      title?: string;
      description?: string;
      itemName?: string;
    }
  ) => {
    // Esta é uma implementação simplificada
    // Em uma implementação real, você poderia usar um context provider
    // para gerenciar modals globalmente
    const result = window.confirm(
      options?.description || 
      `Tem certeza que deseja deletar ${options?.itemName ? `"${options.itemName}"` : 'este item'}? Esta ação não pode ser desfeita.`
    );
    
    if (result) {
      onConfirm();
    }
  };

  return { showDeleteModal };
} 