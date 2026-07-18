import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 public:h-auto public:min-h-control public:rounded-control public:px-4 public:py-3 public:font-sans public:ring-offset-0 public:placeholder:text-text-muted public:aria-[invalid=true]:border-error public:aria-[invalid=true]:ring-error/20',
  {
    variants: {
      tone: {
        light:
          'public:border-border-default public:bg-surface-card public:text-text-body public:focus-visible:border-border-focus public:focus-visible:ring-focus-ring',
        dark:
          'border-border-on-dark bg-surface-dark-elevated text-text-on-dark placeholder:text-text-on-dark/60 focus-visible:border-action-on-dark focus-visible:ring-action-on-dark',
        error:
          'border-error bg-error/5 text-text-body focus-visible:border-error focus-visible:ring-error',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
)
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, tone, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ tone }), className)}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
