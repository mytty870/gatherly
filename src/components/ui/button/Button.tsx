import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import React from 'react'

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export const LoadingSpinner = ({
  size = 24,
  className,
  ...props
}: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('animate-spin', className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

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
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      startContent,
      endContent,
      isLoading,
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
        {isLoading && <LoadingSpinner size={22} />}
        {startContent && <ButtonIconWrapper>{startContent}</ButtonIconWrapper>}
        {children}
        {endContent && <ButtonIconWrapper>{endContent}</ButtonIconWrapper>}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
