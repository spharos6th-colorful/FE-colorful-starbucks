import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none h-12 py-3 text-button1",
  {
    variants: {
      variant: {
        default: 'bg-primary-100 text-white shadow-xs hover:bg-primary-100/90',
        starbucks: 'bg-primary-200 text-white shadow-xs hover:bg-primary-200/90',
        secondary: 'bg-secondary-100 text-white shadow-xs hover:bg-secondary-100/80',
        wooden: 'bg-secondary-200 text-white shadow-xs hover:bg-secondary-200/90',
        destructive: 'bg-error text-white shadow-xs hover:bg-error/90',
        outline: 'border border-border-100 bg-white text-text-800 shadow-xs hover:bg-gray-300',
        ghost: 'text-text-800 hover:bg-gray-300',
        link: 'text-primary-100 underline-offset-4 hover:underline',
        disabled: 'bg-disabled text-text-400 cursor-not-allowed',
      },
      width: {
        auto: 'px-6',
        full: 'w-full px-6',
        half: 'w-1/2 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      width: 'auto',
    },
  },
);

function Button({
  className,
  variant,
  width,
  asChild = false,
  disabled,
  style,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  const buttonVariant = disabled ? 'disabled' : variant;

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant: buttonVariant, width, className }))}
      disabled={disabled}
      style={style}
      {...props}
    />
  );
}

export { Button, buttonVariants };
