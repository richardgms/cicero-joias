import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 public:rounded-pill public:px-4 public:py-2 public:font-sans public:text-[0.625rem] public:font-bold public:uppercase public:tracking-label public:focus-visible:outline-none public:focus-visible:ring-focus-ring',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80 public:bg-action-primary public:text-text-on-dark public:hover:bg-action-primary-hover',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 public:bg-action-strong public:text-text-on-brand public:hover:bg-action-strong/90',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 public:bg-error/10 public:text-error public:hover:bg-error/15',
        outline:
          'text-foreground public:border-border-default public:bg-transparent public:text-text-primary public:hover:border-action-strong',
        // Eyebrow informativo para seções marfim/brancas: estático, como o badge do Hero.
        sectionLight:
          'border-action-primary/25 bg-action-primary/5 text-text-primary focus-visible:ring-action-primary',
        gold:
          'border-action-strong bg-action-strong/10 text-text-primary hover:bg-action-strong/15',
        dark:
          'border-border-on-dark bg-action-on-dark/10 text-action-on-dark focus-visible:ring-action-on-dark',
        muted:
          'border-transparent bg-surface-subtle text-text-secondary',
        whatsapp:
          'border-transparent bg-whatsapp text-brand-emerald-900 hover:bg-whatsapp/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
