import React from 'react'
import { Button } from '@/components/ui/button/Button'
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  isSubmitDisabled: boolean
  buttonLabel?: string
  loadingButtonLabel?: string
}

export const SubmitButton = ({
  isSubmitDisabled,
  buttonLabel = '保存する',
  loadingButtonLabel = '保存中...',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      radius="full"
      size="md"
      disabled={isSubmitDisabled || pending}
      isLoading={pending}
    >
      {pending ? loadingButtonLabel : buttonLabel}
    </Button>
  )
}
