import * as React from 'react';
import { LoaderCircle } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 public:gap-2 public:rounded-control public:font-sans public:text-xs public:font-bold public:uppercase public:tracking-label public:transition-[background-color,border-color,color,box-shadow,transform] public:duration-200 public:focus-visible:ring-focus-ring public:disabled:cursor-not-allowed public:data-[loading=true]:cursor-wait public:motion-reduce:transform-none',
  {
    variants: {
      variant: {
        default:
          'bg-esmeralda text-marfim hover:bg-esmeralda-light public:bg-action-primary public:text-text-on-dark public:hover:bg-action-primary-hover',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 public:bg-error public:text-brand-ivory public:hover:bg-error/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground public:border-border-default public:bg-transparent public:text-text-primary public:hover:border-action-strong public:hover:bg-surface-subtle public:hover:text-text-primary',
        outlineDark:
          'border border-border-on-dark bg-transparent text-text-on-dark hover:border-action-on-dark hover:text-action-on-dark focus-visible:ring-action-on-dark',
        secondary:
          'bg-ouro text-grafite hover:bg-ouro-light public:bg-action-strong public:text-text-on-brand public:hover:bg-action-strong/90',
        gold:
          'bg-ouro text-grafite hover:bg-ouro-light public:bg-action-strong public:text-text-on-brand public:hover:bg-action-strong/90',
        goldOnDark:
          'bg-action-on-dark text-brand-emerald-900 shadow-button-primary hover:bg-action-on-dark/90 hover:-translate-y-0.5 focus-visible:ring-action-on-dark',
        emerald:
          'bg-esmeralda text-marfim hover:bg-esmeralda-light public:bg-action-primary public:text-text-on-dark public:hover:bg-action-primary-hover',
        ghost:
          'hover:bg-marfim-dark hover:text-esmeralda public:text-text-primary public:hover:bg-surface-subtle public:hover:text-text-primary',
        ghostDark:
          'text-text-on-dark hover:bg-brand-white/10 hover:text-action-on-dark focus-visible:ring-action-on-dark',
        link:
          'text-esmeralda underline-offset-4 hover:underline public:text-text-primary public:decoration-action-strong',
        whatsapp:
          'bg-whatsapp text-brand-emerald-900 hover:bg-whatsapp/90',
      },
      size: {
        default:
          'h-10 px-4 py-2 public:h-auto public:min-h-control public:px-5 public:py-3',
        sm: 'h-9 rounded-md px-3 public:h-auto public:min-h-control public:rounded-control public:px-4 public:py-2',
        lg: 'h-11 rounded-md px-8 public:h-auto public:min-h-12 public:rounded-control public:py-4',
        icon:
          'h-10 w-10 public:h-control public:w-control public:min-h-control public:p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      disabled,
      loading = false,
      loadingText,
      size,
      variant,
      ...props
    },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={classes}
          aria-busy={loading || undefined}
          aria-disabled={disabled || loading || undefined}
          data-loading={loading || undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...props}
        disabled={disabled || loading}
      >
        {loading && (
          <LoaderCircle
            className="h-4 w-4 animate-spin motion-reduce:animate-none"
            aria-hidden="true"
          />
        )}
        {loading && loadingText ? loadingText : children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
