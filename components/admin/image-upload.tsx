'use client';

import { useState, useCallback } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  height?: string;
  accept?: string;
  multiple?: boolean;
}

interface MultipleImageUploadProps {
  label?: string;
  values: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
  maxImages?: number;
  className?: string;
  accept?: string;
}

// Componente para upload de uma única imagem
export function ImageUpload({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  height = 'h-48',
  accept = 'image/*',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  const clearImage = () => {
    onChange('');
  };

  return (
    <div className={className}>
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="mt-2">
        {value ? (
          <div className={`relative w-full ${height} border-2 border-dashed border-gray-300 rounded-lg overflow-hidden group`}>
            <Image
              src={value}
              alt={label || 'Imagem'}
              fill
              className="object-cover"
            />
            {!disabled && (
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={clearImage}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <label 
            className={`flex flex-col items-center justify-center w-full ${height} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${
              isDragging ? 'border-blue-400 bg-blue-50' : ''
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
              </p>
              <p className="text-xs text-gray-500">PNG, JPG ou JPEG</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleInputChange}
              disabled={disabled}
            />
          </label>
        )}
      </div>
    </div>
  );
}

// Componente para upload de múltiplas imagens
export function MultipleImageUpload({
  label,
  values,
  onChange,
  disabled = false,
  maxImages = 10,
  className = '',
  accept = 'image/*',
}: MultipleImageUploadProps) {
  const handleFileUpload = useCallback((file: File) => {
    if (!file || values.length >= maxImages) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange([...values, result]);
    };
    reader.readAsDataURL(file);
  }, [values, onChange, maxImages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    // Reset input value to allow uploading the same file again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const canAddMore = values.length < maxImages;

  return (
    <div className={className}>
      {label && (
        <Label className="text-sm font-medium">{label}</Label>
      )}
      
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {values.map((image, index) => (
          <div key={index} className="relative group">
            <div className="relative w-full h-24 rounded-lg overflow-hidden border">
              <Image
                src={image}
                alt={`Imagem ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
        
        {canAddMore && !disabled && (
          <label className="flex flex-col items-center justify-center h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Adicionar</span>
            </div>
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleInputChange}
            />
          </label>
        )}
      </div>
      
      {maxImages && (
        <p className="text-xs text-gray-500 mt-2">
          {values.length} de {maxImages} imagens
        </p>
      )}
    </div>
  );
}

// Componente simples para preview de imagem
export function ImagePreview({ 
  src, 
  alt, 
  className = 'w-12 h-12 rounded-lg' 
}: { 
  src?: string; 
  alt: string; 
  className?: string; 
}) {
  if (!src) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center border`}>
        <ImageIcon className="h-4 w-4 text-gray-400" />
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden border`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
} 