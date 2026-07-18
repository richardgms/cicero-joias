import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const sectionHeadingVariants = cva('flex flex-col', {
  variants: {
    align: {
      left: 'items-start text-left',
      center: 'items-center text-center',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});

const eyebrowVariants = cva(
  'mb-3 font-sans text-xs font-bold uppercase tracking-eyebrow',
  {
    variants: {
      tone: {
        light: 'text-text-primary',
        dark: 'text-action-on-dark',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
);

const titleVariants = cva(
  'text-balance font-heading text-4xl font-medium leading-none sm:text-5xl lg:text-6xl',
  {
    variants: {
      tone: {
        light: 'text-text-primary',
        dark: 'text-text-on-dark',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
);

const descriptionVariants = cva(
  'mt-4 max-w-2xl font-sans text-base leading-relaxed sm:text-lg',
  {
    variants: {
      tone: {
        light: 'text-text-secondary',
        dark: 'text-text-on-dark/75',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
);

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof sectionHeadingVariants> {
  as?: 'h1' | 'h2' | 'h3';
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  titleId?: string;
  tone?: 'light' | 'dark';
}

const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      align,
      as: Title = 'h2',
      className,
      description,
      eyebrow,
      title,
      titleId,
      tone = 'light',
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(sectionHeadingVariants({ align }), className)}
      {...props}
    >
      {eyebrow && (
        <span className={eyebrowVariants({ tone })}>{eyebrow}</span>
      )}
      <Title id={titleId} className={titleVariants({ tone })}>
        {title}
      </Title>
      {description && (
        <p
          className={cn(
            descriptionVariants({ tone }),
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
);
SectionHeading.displayName = 'SectionHeading';

export {
  SectionHeading,
  descriptionVariants,
  eyebrowVariants,
  sectionHeadingVariants,
  titleVariants,
};
