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
import { noteUrlSettingFormSchema } from './schema'
import { noteUserNameRegister } from './action'
import { SubmitButton } from '../../SubmitButton'

type NoteUrlSettingFormProps = {
  noteUserName: Profile['noteUserName']
}

export const NoteUrlSettingForm = ({
  noteUserName,
}: NoteUrlSettingFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const [lastResult, action] = useFormState(noteUserNameRegister, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: noteUrlSettingFormSchema })
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  })

  const isSubmitDisabled = !form.valid || !fields.noteUserName.dirty

  useEffect(() => {
    if (lastResult?.status === 'success') {
      setIsEditing(false)
      lastResult.status = undefined
    }
  }, [lastResult?.status])

  const handleCancel = () => {
    form.reset({
      name: fields.noteUserName.name,
    })
    setIsEditing(false)
  }

  return (
    <form {...getFormProps(form)} action={action} onSubmit={form.onSubmit}>
      <div className="space-y-4">
        <Label
          htmlFor={fields.noteUserName.id}
          fontWeight="semibold"
          className="flex flex-col"
        >
          <Text as="span" fontWeight="semibold">
            Noteのユーザー名
          </Text>
          <Text as="span" size="xs" variantColor="slateGray">
            ※ 入力完了後Noteの記事が表示されます
          </Text>
        </Label>

        <div className="flex items-center gap-2">
          <Label
            htmlFor={fields.noteUserName.id}
            color="slateGray"
            fontWeight="normal"
            className="tracking-[.02em]"
          >
            note.com/
          </Label>
          {isEditing || !noteUserName ? (
            <>
              <Input
                placeholder="Noteのユーザー名を入力"
                defaultValue={noteUserName ?? ''}
                {...getInputProps(fields.noteUserName, { type: 'text' })}
                hasError={!!fields.noteUserName.errors}
              />
            </>
          ) : (
            <Text
              variantColor="slateGray"
              fontWeight="normal"
              className="border-b-2 border-dotted border-gray-300"
            >
              {noteUserName}
            </Text>
          )}
        </div>
        {fields.noteUserName.errors && (
          <Text
            id={fields.noteUserName.errorId}
            variantColor="alert"
            size="sm"
            fontWeight="medium"
          >
            {fields.noteUserName.errors}
          </Text>
        )}
        {!noteUserName && (
          <SubmitButton
            isSubmitDisabled={isSubmitDisabled}
            buttonLabel="登録する"
            loadingButtonLabel="登録中..."
          />
        )}
        {noteUserName && isEditing && (
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
        {noteUserName && !isEditing && (
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
