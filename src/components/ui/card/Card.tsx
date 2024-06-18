import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const cardVariants = cva('flex flex-col rounded-xl border', {
  variants: {
    padding: {
      none: '',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    },
    shadow: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
    fullWidth: {
      true: 'w-full',
    },
    alignItems: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
  },
  defaultVariants: {
    padding: 'md',
    shadow: 'none',
    alignItems: 'start',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, shadow, fullWidth, alignItems, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          cardVariants({ padding, shadow, fullWidth, alignItems, className }),
        )}
        {...props}
      />
    )
  },
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col px-6 pt-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

export { Card }
