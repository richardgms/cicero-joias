'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between">
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className="flex items-center space-x-1">
              <Badge
                variant={trend.isPositive ? 'default' : 'destructive'}
                className="text-xs"
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Badge>
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface InfoCardProps {
  title: string;
  subtitle?: string;
  description: string;
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
}

export function InfoCard({
  title,
  subtitle,
  description,
  badge,
  icon: Icon,
  className,
  onClick,
}: InfoCardProps) {
  return (
    <Card 
      className={cn(
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {badge && (
              <Badge variant={badge.variant || 'default'}>
                {badge.label}
              </Badge>
            )}
            {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
  };
  format?: 'number' | 'currency' | 'percentage';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  format = 'number',
  size = 'md',
  className,
}: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(val));
    }
    if (format === 'percentage') {
      return `${val}%`;
    }
    return val.toString();
  };

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={cn('space-y-2', className)}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className={cn('font-bold', sizeClasses[size])}>{formatValue(value)}</p>
      {change && (
        <div className="flex items-center space-x-1">
          <Badge
            variant={change.value >= 0 ? 'default' : 'destructive'}
            className="text-xs"
          >
            {change.value >= 0 ? '+' : ''}{change.value}%
          </Badge>
          <span className="text-xs text-muted-foreground">{change.period}</span>
        </div>
      )}
    </div>
  );
}

interface StatusCardProps {
  title: string;
  status: 'active' | 'inactive' | 'pending' | 'error';
  description: string;
  lastUpdate?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function StatusCard({
  title,
  status,
  description,
  lastUpdate,
  actions,
  className,
}: StatusCardProps) {
  const statusConfig = {
    active: { color: 'bg-green-500', label: 'Ativo', variant: 'default' as const },
    inactive: { color: 'bg-gray-500', label: 'Inativo', variant: 'secondary' as const },
    pending: { color: 'bg-yellow-500', label: 'Pendente', variant: 'outline' as const },
    error: { color: 'bg-red-500', label: 'Erro', variant: 'destructive' as const },
  };

  const config = statusConfig[status];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className={cn('w-2 h-2 rounded-full', config.color)} />
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between">
          {lastUpdate && (
            <p className="text-xs text-muted-foreground">
              Última atualização: {lastUpdate}
            </p>
          )}
          {actions && <div className="flex space-x-2">{actions}</div>}
        </div>
      </CardContent>
    </Card>
  );
} 