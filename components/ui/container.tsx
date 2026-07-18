import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      full: 'max-w-none',
    },
    gutters: {
      true: 'px-4 sm:px-6 lg:px-12',
      false: '',
    },
  },
  defaultVariants: {
    size: 'lg',
    gutters: true,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, gutters, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ gutters, size }), className)}
      {...props}
    />
  )
);
Container.displayName = 'Container';

export { Container, containerVariants };
