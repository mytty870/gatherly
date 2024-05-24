import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const textVariants = cva('', {
  variants: {
    variantColor: {
      black: 'text-black',
      slateGray: 'text-[#65717b]',
      alert: 'text-destructive',
    },
    size: {
      xs: 'text-[0.78rem]',
      sm: 'text-[0.85rem]',
      md: 'text-[0.95rem]',
      base: 'text-base',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    fontWeight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variantColor: 'black',
    size: 'base',
    fontWeight: 'normal',
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span'
}

const Text = React.forwardRef<
  HTMLParagraphElement | HTMLSpanElement,
  TextProps
>(
  (
    {
      children,
      className,
      variantColor,
      size,
      align,
      fontWeight,
      as: Component = 'p',
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        className={cn(
          textVariants({ variantColor, size, align, fontWeight }),
          className,
        )}
        ref={ref as React.Ref<HTMLParagraphElement & HTMLSpanElement>}
        {...props}
      >
        {children}
      </Component>
    )
  },
)
Text.displayName = 'Text'

export { Text, textVariants }
