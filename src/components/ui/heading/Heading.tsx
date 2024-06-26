import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const headingVariants = cva('', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      ml: 'text-[1.05rem]',
      lg: 'text-xl',
      xl: 'text-2xl',
      '2xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
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
    size: 'lg',
    align: 'center',
    fontWeight: 'bold',
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLAnchorElement>,
    VariantProps<typeof headingVariants> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const Heading = React.forwardRef<
  HTMLHeadElement | HTMLAnchorElement,
  HeadingProps
>(
  (
    { level = 1, children, className, size, align, fontWeight, ...props },
    ref,
  ) => {
    const tag = `h${level}`

    const classes = cn(headingVariants({ size, align, fontWeight }), className)
    return React.createElement(
      tag,
      { className: classes, ref, ...props },
      children,
    )
  },
)
Heading.displayName = 'Heading'

export { Heading, headingVariants }
