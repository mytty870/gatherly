'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/Form'
import { useForm } from 'react-hook-form'
import { DisplayNameFormTypes, displayNameFormSchema } from './schema'
import { useState } from 'react'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { Text } from '@/components/ui/text/Text'
import { Profile } from '@/types'

type DisplayNameFormProps = {
  displayName: Profile['displayName']
}

export const DisplayNameForm = ({ displayName }: DisplayNameFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<DisplayNameFormTypes>({
    resolver: zodResolver(displayNameFormSchema),
    mode: 'onChange',
    defaultValues: {
      displayName: displayName,
    },
  })

  const { isValid, isDirty } = form.formState

  const isSubmitDisabled = !isDirty || !isValid

  // const handleSubmit = (values: DisplayNameFormTypes) => {
  //   console.log(values)

  //   setIsEditing(false)
  // }

  const handleCancel = () => {
    form.reset({
      displayName: displayName,
    })
    setIsEditing(false)
  }

  return (
    <div className="">
      <Form {...form}>
        <form
        // onSubmit={isSubmitDisabled ? undefined : form.handleSubmit(handleSubmit)}
        >
          <FormField
            key="displayName"
            control={form.control}
            name="displayName"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-4">
                <FormLabel fontWeight="semibold">表示名</FormLabel>
                {isEditing ? (
                  <>
                    <FormControl>
                      <Input
                        placeholder="表示名を入力"
                        {...field}
                        hasError={fieldState.invalid}
                      />
                    </FormControl>
                    <FormMessage />
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
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
