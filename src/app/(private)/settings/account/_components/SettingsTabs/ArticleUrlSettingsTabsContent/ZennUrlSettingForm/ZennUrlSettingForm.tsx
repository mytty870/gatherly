'use client'
import { Profile } from '@/types'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { parseWithZod } from '@conform-to/zod'
import { useForm, getFormProps, getInputProps } from '@conform-to/react'
import { Label } from '@/components/ui/label/Label'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { Text } from '@/components/ui/text/Text'
import { zennUrlSettingFormSchema } from './schema'
import { zennUserNameRegister } from './action'
import { SubmitButton } from '../../SubmitButton'

type ZennUrlSettingFormProps = {
  zennUserName: Profile['zennUserName']
}

export const ZennUrlSettingForm = ({
  zennUserName,
}: ZennUrlSettingFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const [lastResult, action] = useFormState(zennUserNameRegister, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: zennUrlSettingFormSchema })
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  })

  const isSubmitDisabled = !form.valid || !fields.zennUserName.dirty

  useEffect(() => {
    if (lastResult?.status === 'success') {
      setIsEditing(false)
      lastResult.status = undefined
    }
  }, [lastResult?.status])

  const handleCancel = () => {
    form.reset({
      name: fields.zennUserName.name,
    })
    setIsEditing(false)
  }

  return (
    <form {...getFormProps(form)} action={action} onSubmit={form.onSubmit}>
      <div className="space-y-4">
        <Label
          htmlFor={fields.zennUserName.id}
          fontWeight="semibold"
          className="flex flex-col"
        >
          <Text as="span" fontWeight="semibold">
            Zennのユーザー名
          </Text>
          <Text as="span" size="xs" variantColor="slateGray">
            ※ 入力完了後Zennの記事が表示されます
          </Text>
        </Label>

        <div className="flex items-center gap-2">
          <Label
            htmlFor={fields.zennUserName.id}
            color="slateGray"
            fontWeight="normal"
            className="tracking-[.02em]"
          >
            zenn.dev/
          </Label>
          {isEditing || !zennUserName ? (
            <>
              <Input
                placeholder="Zennのユーザー名を入力"
                defaultValue={zennUserName ?? ''}
                {...getInputProps(fields.zennUserName, { type: 'text' })}
                hasError={!!fields.zennUserName.errors}
              />
            </>
          ) : (
            <Text
              variantColor="slateGray"
              fontWeight="normal"
              className="border-b-2 border-dotted border-gray-300"
            >
              {zennUserName}
            </Text>
          )}
        </div>
        {fields.zennUserName.errors && (
          <Text
            id={fields.zennUserName.errorId}
            variantColor="alert"
            size="sm"
            fontWeight="medium"
          >
            {fields.zennUserName.errors}
          </Text>
        )}
        {!zennUserName && (
          <SubmitButton
            isSubmitDisabled={isSubmitDisabled}
            buttonLabel="登録する"
            loadingButtonLabel="登録中..."
          />
        )}
        {zennUserName && isEditing && (
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
        )}
        {form.errors && (
          <div className="space-y-4">
            {form.errors.map(error => (
              <Text variantColor="alert" key={error}>
                {error}
              </Text>
            ))}
          </div>
        )}
        {zennUserName && !isEditing && (
          <Button
            variant="basic"
            radius="full"
            size="md"
            onClick={() => setIsEditing(true)}
          >
            変更する
          </Button>
        )}
      </div>
    </form>
  )
}
