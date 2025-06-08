'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface BaseFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

interface TextareaFieldProps extends BaseFieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

interface SwitchFieldProps extends BaseFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

// Componente base para wrapper dos campos
function FieldWrapper({ 
  label, 
  required, 
  error, 
  description, 
  className, 
  children 
}: BaseFieldProps & { children: React.ReactNode }) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {children}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// Campo de input
export function InputField({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  min,
  max,
  step,
  ...wrapperProps
}: InputFieldProps) {
  return (
    <FieldWrapper {...wrapperProps}>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        min={min?.toString()}
        max={max?.toString()}
        step={step?.toString()}
        className={wrapperProps.error ? 'border-red-500 focus:border-red-500' : ''}
      />
    </FieldWrapper>
  );
}

// Campo de textarea
export function TextareaField({
  placeholder,
  value,
  onChange,
  disabled = false,
  rows = 4,
  ...wrapperProps
}: TextareaFieldProps) {
  return (
    <FieldWrapper {...wrapperProps}>
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={rows}
        className={wrapperProps.error ? 'border-red-500 focus:border-red-500' : ''}
      />
    </FieldWrapper>
  );
}

// Campo de select
export function SelectField({
  placeholder,
  value,
  onChange,
  disabled = false,
  options,
  ...wrapperProps
}: SelectFieldProps) {
  return (
    <FieldWrapper {...wrapperProps}>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={wrapperProps.error ? 'border-red-500 focus:border-red-500' : ''}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldWrapper>
  );
}

// Campo de switch
export function SwitchField({
  checked,
  onChange,
  disabled = false,
  ...wrapperProps
}: SwitchFieldProps) {
  return (
    <FieldWrapper {...wrapperProps}>
      <div className="flex items-center space-x-2">
        <Switch
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
        />
        {wrapperProps.label && (
          <Label className="text-sm font-normal cursor-pointer">
            {wrapperProps.label}
            {wrapperProps.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
      </div>
    </FieldWrapper>
  );
}

// Campo de moeda (Real brasileiro)
export function CurrencyField({
  value,
  onChange,
  ...props
}: Omit<InputFieldProps, 'type' | 'value' | 'onChange'> & {
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  const handleChange = (stringValue: string) => {
    const numericValue = parseFloat(stringValue);
    onChange(isNaN(numericValue) ? null : numericValue);
  };

  return (
    <InputField
      {...props}
      type="number"
      step={0.01}
      min={0}
      value={value?.toString() || ''}
      onChange={handleChange}
      placeholder="0,00"
    />
  );
}

// Campo de número inteiro
export function NumberField({
  value,
  onChange,
  ...props
}: Omit<InputFieldProps, 'type' | 'value' | 'onChange'> & {
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  const handleChange = (stringValue: string) => {
    const numericValue = parseInt(stringValue, 10);
    onChange(isNaN(numericValue) ? null : numericValue);
  };

  return (
    <InputField
      {...props}
      type="number"
      value={value?.toString() || ''}
      onChange={handleChange}
      placeholder="0"
    />
  );
}

// Grupo de campos em linha
export function FieldGroup({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      {children}
    </div>
  );
}

// Seção de formulário com título
export function FormSection({ 
  title, 
  description, 
  children,
  className 
}: { 
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
} 