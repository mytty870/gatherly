'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ZennUrlSettingFormTypes, zennUrlSettingFormSchema } from './schema'
import { Profile } from '@/types'
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

type ZennUrlSettingFormProps = {
  zennUserName: Profile['zennUserName']
}

export const ZennUrlSettingForm = ({
  zennUserName,
}: ZennUrlSettingFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<ZennUrlSettingFormTypes>({
    resolver: zodResolver(zennUrlSettingFormSchema),
    mode: 'onChange',
    defaultValues: {
      zennUserName: zennUserName ?? '',
    },
  })

  const { isValid, isDirty } = form.formState

  const isSubmitDisabled = !isDirty || !isValid

  const handleCancel = () => {
    form.reset({
      zennUserName: zennUserName ?? '',
    })
    setIsEditing(false)
  }

  return (
    <Form {...form}>
      <form
      // onSubmit={isSubmitDisabled ? undefined : form.handleSubmit(handleSubmit)}
      >
        <FormField
          key="zennUserName"
          control={form.control}
          name="zennUserName"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-4">
              <FormLabel fontWeight="semibold">
                Zennのユーザー名
                <Text
                  as="span"
                  size="xs"
                  variantColor="slateGray"
                  className="ml-3"
                >
                  入力完了後Zennの記事が表示されます
                </Text>
              </FormLabel>

              <div className="flex items-center gap-2">
                <FormLabel
                  color="slateGray"
                  fontWeight="normal"
                  className="tracking-[.02em]"
                >
                  zenn.dev/
                </FormLabel>
                {isEditing || !zennUserName ? (
                  <FormControl>
                    <Input
                      placeholder="Zennのユーザー名を入力"
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
                    {zennUserName}
                  </Text>
                )}
              </div>
              <FormMessage />
              {!zennUserName && (
                <Button
                  type="submit"
                  radius="full"
                  size="md"
                  disabled={isSubmitDisabled}
                >
                  登録する
                </Button>
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
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
