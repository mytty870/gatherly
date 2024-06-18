import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      autoComplete = 'off',
      hasError = false,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full focus:outline-none text-base rounded-lg border px-2.5 py-2 text-base',
          hasError
            ? 'bg-white border-destructive focus:shadow-[0_0_0_2.5px_#FECACA]'
            : 'bg-iceWhite border-silverBlue focus:border-stoneGray focus:shadow-[0_0_0_2.5px_#d8dadf]',
          className,
        )}
        autoComplete={autoComplete}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
