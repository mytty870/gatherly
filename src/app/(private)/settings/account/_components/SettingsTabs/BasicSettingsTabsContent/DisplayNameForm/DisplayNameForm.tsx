'use client'
import { useFormState } from 'react-dom'
import { displayNameFormSchema } from './schema'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { Text } from '@/components/ui/text/Text'
import { displayNameRegister } from './action'
import { parseWithZod } from '@conform-to/zod'
import { SubmitButton } from '../../SubmitButton'
import { Label } from '@/components/ui/label/Label'

type DisplayNameFormProps = {
  displayName: string
}

export const DisplayNameForm = ({ displayName }: DisplayNameFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const [lastResult, action] = useFormState(displayNameRegister, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: displayNameFormSchema })
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  })

  const isSubmitDisabled = !form.valid

  useEffect(() => {
    if (lastResult?.status === 'success') {
      setIsEditing(false)
      lastResult.status = undefined
    }
  }, [lastResult?.status])

  const handleCancel = () => {
    form.reset({
      name: fields.displayName.name,
    })
    setIsEditing(false)
  }

  return (
    <form {...getFormProps(form)} action={action} onSubmit={form.onSubmit}>
      <div className="space-y-4">
        <Label htmlFor={fields.displayName.id} fontWeight="semibold">
          表示名
        </Label>
        {isEditing ? (
          <>
            <div>
              <Input
                placeholder="表示名を入力"
                defaultValue={displayName ?? ''}
                hasError={!!fields.displayName.errors}
                {...getInputProps(fields.displayName, { type: 'text' })}
              />
            </div>
            <Text
              id={fields.displayName.errorId}
              variantColor="alert"
              size="sm"
              fontWeight="medium"
            >
              {fields.displayName.errors}
            </Text>
            <div className="flex justify-end gap-3">
              <Button
                variant="basic"
                size="md"
                radius="full"
                onClick={handleCancel}
              >
                キャンセル
              </Button>
              <SubmitButton isSubmitDisabled={isSubmitDisabled} />
            </div>
          </>
        ) : (
          <>
            <Text variantColor="slateGray">{displayName}</Text>
            <Button
              variant="basic"
              fullWidth={false}
              radius="full"
              size="md"
              onClick={() => setIsEditing(true)}
            >
              変更する
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
