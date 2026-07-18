import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const sectionVariants = cva('relative w-full font-sans', {
  variants: {
    tone: {
      light: 'bg-surface-page text-text-body',
      white: 'bg-surface-card text-text-body',
      dark: 'bg-surface-dark text-text-on-dark',
      darker: 'bg-brand-emerald-950 text-text-on-dark',
      transparent: 'bg-transparent text-inherit',
    },
    spacing: {
      none: '',
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-20 lg:py-24',
      lg: 'py-20 md:py-24 lg:py-32',
    },
  },
  defaultVariants: {
    tone: 'light',
    spacing: 'md',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, tone, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ spacing, tone }), className)}
      {...props}
    />
  )
);
Section.displayName = 'Section';

export { Section, sectionVariants };
