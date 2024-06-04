import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full focus:outline-none text-base rounded-lg border px-2.5 py-2 text-base resize-none',
          hasError
            ? 'bg-white border-destructive focus:shadow-[0_0_0_2.5px_#FECACA]'
            : 'bg-[#f5f9fc] border-[#d6e3ed] focus:border-[#8d9298] focus:shadow-[0_0_0_2.5px_#d8dadf]',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
