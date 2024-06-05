'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FieldValues, DefaultValues, Path } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form/Form'
import { Text } from '@/components/ui/text/Text'
import { Button } from '@/components/ui/button/Button'
import { useState } from 'react'
import { Input } from '@/components/ui/input/Input'
import { ZodType } from 'zod'

type ServiceUrlSettingFormProps<T extends FieldValues> = {
  service: 'Zenn' | 'Quiita' | 'Note'
  userNameKey: Path<T>
  userName: string
  schema: ZodType<T>
}

export const ServiceUrlSettingForm = <T extends FieldValues>({
  service,
  userNameKey,
  userName,
  schema,
}: ServiceUrlSettingFormProps<T>) => {
  const [isEditing, setIsEditing] = useState(false)

  const defaultValues = { [userNameKey]: userName ?? '' } as DefaultValues<T>

  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  })

  const { isValid, isDirty } = form.formState

  const isSubmitDisabled = !isDirty || !isValid

  const handleSubmit = async (values: T) => {
    const response = await fetch('/api/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    form.reset(defaultValues)
    setIsEditing(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={
          isSubmitDisabled ? undefined : form.handleSubmit(handleSubmit)
        }
      >
        <FormField
          key={userNameKey as string}
          control={form.control}
          name={userNameKey}
          render={({ field, fieldState }) => (
            <FormItem className="space-y-4">
              <FormLabel fontWeight="semibold">
                {service}のユーザー名
                <Text
                  as="span"
                  size="xs"
                  variantColor="slateGray"
                  className="ml-3"
                >
                  入力完了後{service}の記事が表示されます
                </Text>
              </FormLabel>

              <div className="flex items-center gap-2">
                <FormLabel
                  color="slateGray"
                  fontWeight="normal"
                  className="tracking-[.02em]"
                >
                  {service.toLowerCase()}.dev/
                </FormLabel>
                {isEditing || !userName ? (
                  <FormControl>
                    <Input
                      placeholder={`${service}のユーザー名を入力`}
                      {...field}
                      hasError={fieldState.invalid}
                    />
                  </FormControl>
                ) : (
                  <Text
                    variantColor="slateGray"
                    fontWeight="normal"
                    className="border-b-2 border-dotted border-gray-300"
                  >
                    {userName}
                  </Text>
                )}
              </div>
              <FormMessage />
              {!userName && (
                <Button
                  type="submit"
                  radius="full"
                  size="md"
                  disabled={isSubmitDisabled}
                >
                  登録する
                </Button>
              )}
              {userName && isEditing && (
                <div className="flex justify-end gap-3">
                  <Button
                    variant="basic"
                    size="md"
                    radius="full"
                    onClick={handleCancel}
                  >
                    キャンセル
                  </Button>
                  <Button
                    type="submit"
                    radius="full"
                    size="md"
                    disabled={isSubmitDisabled}
                  >
                    保存する
                  </Button>
                </div>
              )}
              {userName && !isEditing && (
                <Button
                  variant="basic"
                  radius="full"
                  size="md"
                  onClick={() => setIsEditing(true)}
                >
                  変更する
                </Button>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
