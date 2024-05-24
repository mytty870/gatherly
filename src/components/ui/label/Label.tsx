'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const labelVariants = cva('leading-none', {
  variants: {
    color: {
      black: 'text-black',
      slateGray: 'text-[#65717b]',
    },
    size: {
      xs: 'text-[0.78rem]',
      sm: 'text-[0.85rem]',
      md: 'text-[0.95rem]',
      base: 'text-base',
    },
    fontWeight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    color: 'black',
    size: 'base',
    fontWeight: 'medium',
  },
})

export type LabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> &
  VariantProps<typeof labelVariants>

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, color, size, fontWeight, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ color, size, fontWeight }), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label, labelVariants }
