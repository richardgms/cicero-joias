import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 public:min-h-28 public:resize-y public:rounded-control public:px-4 public:py-3 public:font-sans public:leading-relaxed public:ring-offset-0 public:placeholder:text-text-muted public:aria-[invalid=true]:border-error public:aria-[invalid=true]:ring-error/20',
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
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, tone, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ tone }), className)}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
