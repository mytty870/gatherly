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
import { quiitaUrlSettingFormSchema } from './schema'
import { quiitaUserNameRegister } from './action'
import { SubmitButton } from '../../SubmitButton'

type QuiitaUrlSettingFormProps = {
  quiitaUserName: Profile['quiitaUserName']
}

export const QuiitaUrlSettingForm = ({
  quiitaUserName,
}: QuiitaUrlSettingFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const [lastResult, action] = useFormState(quiitaUserNameRegister, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: quiitaUrlSettingFormSchema })
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  })

  const isSubmitDisabled = !form.valid || !fields.quiitaUserName.dirty

  useEffect(() => {
    if (lastResult?.status === 'success') {
      setIsEditing(false)
      lastResult.status = undefined
    }
  }, [lastResult?.status])

  const handleCancel = () => {
    form.reset({
      name: fields.quiitaUserName.name,
    })
    setIsEditing(false)
  }

  return (
    <form {...getFormProps(form)} action={action} onSubmit={form.onSubmit}>
      <div className="space-y-4">
        <Label
          htmlFor={fields.quiitaUserName.id}
          fontWeight="semibold"
          className="flex flex-col"
        >
          <Text as="span" fontWeight="semibold">
            Qiitaのユーザー名
          </Text>
          <Text as="span" size="xs" variantColor="slateGray">
            ※ 入力完了後Qiitaの記事が表示されます
          </Text>
        </Label>

        <div className="flex items-center gap-2">
          <Label
            htmlFor={fields.quiitaUserName.id}
            color="slateGray"
            fontWeight="normal"
            className="tracking-[.02em]"
          >
            qiita.com/
          </Label>
          {isEditing || !quiitaUserName ? (
            <>
              <Input
                placeholder="Qiitaのユーザー名を入力"
                defaultValue={quiitaUserName ?? ''}
                {...getInputProps(fields.quiitaUserName, { type: 'text' })}
                hasError={!!fields.quiitaUserName.errors}
              />
            </>
          ) : (
            <Text
              variantColor="slateGray"
              fontWeight="normal"
              className="border-b-2 border-dotted border-gray-300"
            >
              {quiitaUserName}
            </Text>
          )}
        </div>
        {fields.quiitaUserName.errors && (
          <Text
            id={fields.quiitaUserName.errorId}
            variantColor="alert"
            size="sm"
            fontWeight="medium"
          >
            {fields.quiitaUserName.errors}
          </Text>
        )}
        {!quiitaUserName && (
          <SubmitButton
            isSubmitDisabled={isSubmitDisabled}
            buttonLabel="登録する"
            loadingButtonLabel="登録中..."
          />
        )}
        {quiitaUserName && isEditing && (
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
        {quiitaUserName && !isEditing && (
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
