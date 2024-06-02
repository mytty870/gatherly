import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import React from 'react'

const ButtonIconWrapper = ({ children }: { children: React.ReactNode }) => {
  return <span className="inline-flex items-center">{children}</span>
}

const buttonVariants = cva(
  'disabled:hover inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition duration-200 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:opacity-50 focus:disabled:ring-0',
  {
    variants: {
      variant: {
        primary:
          'bg-[#3ea8ff] text-white hover:bg-[#0f83fd] focus:ring-[#98c7ff] hover:disabled:bg-[#3ea8ff]',
        basic:
          'border border-[#d6e3ed] bg-white hover:bg-[#f5fbff] focus:ring-[#bfdcff] hover:disabled:bg-white ',
      },
      size: {
        sm: 'px-3 py-2 text-[0.95rem]',
        md: 'px-3.5 py-2.5 text-[0.95rem]',
        lg: 'px-4 py-3 text-[0.95rem]',
        icon: 'size-10',
      },
      fullWidth: {
        true: 'w-full',
      },
      radius: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      radius: 'sm',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  startContent?: React.ReactElement
  endContent?: React.ReactElement
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      startContent,
      endContent,
      className,
      variant,
      size,
      radius,
      fullWidth,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, radius, fullWidth, className }),
        )}
        ref={ref}
        type="button"
        {...props}
      >
        {startContent && <ButtonIconWrapper>{startContent}</ButtonIconWrapper>}
        {children}
        {endContent && <ButtonIconWrapper>{endContent}</ButtonIconWrapper>}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
