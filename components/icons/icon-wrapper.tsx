import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon | React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  containerClassName?: string;
  iconClassName?: string;
  containerStyle?: React.CSSProperties;
}

export function IconWrapper({
  icon: Icon,
  size = 'md',
  className,
  containerClassName,
  iconClassName,
  containerStyle,
  ...props
}: IconWrapperProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        'bg-esmeralda rounded-lg flex items-center justify-center',
        containerClassName
      )}
      style={containerStyle}
      {...props}
    >
      <Icon className={cn(iconSizeClasses[size], 'text-ouro', iconClassName)} />
    </div>
  );
} 