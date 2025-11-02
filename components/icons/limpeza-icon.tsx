import React from 'react';
import { cn } from '@/lib/utils';

interface LimpezaIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function LimpezaIcon({ className, size = 24, color = 'currentColor' }: LimpezaIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('', className)}
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Ícone de gota d'água (Droplet) */}
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}
