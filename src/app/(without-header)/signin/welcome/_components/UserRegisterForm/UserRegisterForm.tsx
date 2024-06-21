'use client'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { userRegisterFormSchema } from './schema'
import { userRegister } from './action'
import { Label } from '@/components/ui/label/Label'
import { Input } from '@/components/ui/input/Input'
import { Text } from '@/components/ui/text/Text'
import { SubmitButton } from './SubmitButton'

export const UserRegisterForm = () => {
  const [lastResult, action] = useFormState(userRegister, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userRegisterFormSchema })
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  })

  const isSubmitDisabled =
    !form.valid || !fields.userName.dirty || !fields.displayName.dirty

  return (
    <form
      {...getFormProps(form)}
      action={action}
      onSubmit={form.onSubmit}
      className="space-y-8"
    >
      <div className="space-y-2">
        <Label size="sm" htmlFor={fields.userName.id} fontWeight="bold">
          ユーザー名
          <Text as="span" size="xs" variantColor="slateGray" className="ml-3">
            登録後は変更することができません
          </Text>
        </Label>
        <div className="flex items-center gap-2">
          <Label
            color="slateGray"
            fontWeight="normal"
            className="tracking-[.02em]"
            htmlFor={fields.userName.id}
          >
            gatherly.com/
          </Label>
          <Input
            placeholder="user_name"
            hasError={!!fields.userName.errors}
            {...getInputProps(fields.userName, { type: 'text' })}
          />
        </div>
        {fields.userName.errors && (
          <Text
            id={fields.userName.errorId}
            variantColor="alert"
            size="sm"
            fontWeight="medium"
          >
            {fields.userName.errors}
          </Text>
        )}
      </div>
      <div className="space-y-2">
        <Label size="sm" htmlFor={fields.displayName.id} fontWeight="bold">
          表示名
          <Text as="span" size="xs" variantColor="slateGray" className="ml-3">
            後に変更可能です
          </Text>
        </Label>
        <div className="flex items-center gap-2">
          <Input
            placeholder="表示名を入力"
            hasError={!!fields.displayName.errors}
            {...getInputProps(fields.displayName, { type: 'text' })}
          />
        </div>
        {fields.displayName.errors && (
          <Text
            id={fields.displayName.errorId}
            variantColor="alert"
            size="sm"
            fontWeight="medium"
          >
            {fields.displayName.errors}
          </Text>
        )}
      </div>
      <SubmitButton isSubmitDisabled={isSubmitDisabled} />
      {form.errors && (
        <div className="space-y-4">
          {form.errors.map(error => (
            <Text variantColor="alert" key={error}>
              {error}
            </Text>
          ))}
        </div>
      )}
    </form>
  )
}
