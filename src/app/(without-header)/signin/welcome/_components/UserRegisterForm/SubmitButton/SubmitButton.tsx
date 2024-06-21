import React from 'react'
import { Button } from '@/components/ui/button/Button'
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  isSubmitDisabled: boolean
}

export const SubmitButton = ({ isSubmitDisabled }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      fullWidth
      radius="lg"
      disabled={isSubmitDisabled || pending}
      isLoading={pending}
    >
      {pending ? '登録中...' : '登録する'}
    </Button>
  )
}
