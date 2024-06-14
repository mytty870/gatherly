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
import { sizuUrlSettingFormSchema } from './schema'
import { sizuUserNameRegister } from './action'
import { SubmitButton } from '../../SubmitButton'

type SizuUrlSettingFormProps = {
  sizuUserName: Profile['sizuUserName']
}

export const SizuUrlSettingForm = ({
  sizuUserName,
}: SizuUrlSettingFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const [lastResult, action] = useFormState(sizuUserNameRegister, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: sizuUrlSettingFormSchema })
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
      name: fields.sizuUserName.name,
    })
    setIsEditing(false)
  }

  return (
    <form {...getFormProps(form)} action={action} onSubmit={form.onSubmit}>
      <div className="space-y-4">
        <Label htmlFor={fields.sizuUserName.id} fontWeight="semibold">
          しずかなインターネットのユーザー名
          <Text as="span" size="xs" variantColor="slateGray" className="ml-3">
            入力完了後しずかなインターネットの記事が表示されます
          </Text>
        </Label>

        <div className="flex items-center gap-2">
          <Label
            htmlFor={fields.sizuUserName.id}
            color="slateGray"
            fontWeight="normal"
            className="tracking-[.02em]"
          >
            sizu.dev/
          </Label>
          {isEditing || !sizuUserName ? (
            <>
              <Input
                placeholder="しずかなインターネットのユーザー名を入力"
                defaultValue={sizuUserName ?? ''}
                {...getInputProps(fields.sizuUserName, { type: 'text' })}
                hasError={!!fields.sizuUserName.errors}
              />
            </>
          ) : (
            <Text
              variantColor="slateGray"
              fontWeight="normal"
              className="border-b-2 border-dotted border-gray-300"
            >
              {sizuUserName}
            </Text>
          )}
        </div>
        <Text
          id={fields.sizuUserName.errorId}
          variantColor="alert"
          size="sm"
          fontWeight="medium"
        >
          {fields.sizuUserName.errors}
        </Text>
        {!sizuUserName && (
          <SubmitButton
            isSubmitDisabled={isSubmitDisabled}
            buttonLabel="登録する"
            loadingButtonLabel="登録中..."
          />
        )}
        {sizuUserName && isEditing && (
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
        {sizuUserName && !isEditing && (
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
