'use client'
import { Profile } from '@/types'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { bioRegister } from './action'
import { getFormProps, getTextareaProps, useForm } from '@conform-to/react'
import { Label } from '@/components/ui/label/Label'
import { parseWithZod } from '@conform-to/zod'
import { Button } from '@/components/ui/button/Button'
import { bioFormSchema } from './schema'
import { Text } from '@/components/ui/text/Text'
import { SubmitButton } from '../../SubmitButton'
import { Textarea } from '@/components/ui/textarea'

const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

type BioFormProps = {
  bio: Profile['bio']
}

export const BioForm = ({ bio }: BioFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const [lastResult, action] = useFormState(bioRegister, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bioFormSchema })
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
      name: fields.bio.name,
    })
    setIsEditing(false)
  }

  return (
    <form {...getFormProps(form)} action={action} onSubmit={form.onSubmit}>
      <div className="space-y-4">
        <Label htmlFor={fields.bio.id} fontWeight="semibold">
          自己紹介文
        </Label>
        {isEditing ? (
          <>
            <div>
              <Textarea
                placeholder="自己紹介文を入力"
                defaultValue={bio ?? ''}
                hasError={!!fields.bio.errors}
                {...getTextareaProps(fields.bio)}
              />
            </div>
            <Text
              id={fields.bio.errorId}
              variantColor="alert"
              size="sm"
              fontWeight="medium"
            >
              {fields.bio.errors}
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
            {form.errors && (
              <div className="space-y-4">
                {form.errors.map(error => (
                  <Text variantColor="alert" key={error}>
                    {error}
                  </Text>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <Text variantColor="slateGray">
              {bio
                ? linkify(bio)
                : '自己紹介文を入力すると、プロフィールに表示されます。'}
            </Text>
            <Button
              variant="basic"
              fullWidth={false}
              radius="full"
              size="md"
              onClick={() => setIsEditing(true)}
            >
              {bio ? '変更する' : '登録する'}
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
