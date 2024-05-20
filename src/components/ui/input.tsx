import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', autoComplete = 'off', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full bg-[#f5f9fc] focus:border-[#8d9298] focus:outline-none focus:shadow-[0_0_0_2.5px_#d8dadf] text-base rounded-lg border border-[#d6e3ed] px-2.5 py-2 text-base',
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
