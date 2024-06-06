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
import { useState } from 'react'
import { Button } from '@/components/ui/button/Button'
import { Text } from '@/components/ui/text/Text'
import { Profile } from '@/types'
import { Textarea } from '@/components/ui/textarea'
import { BioFormTypes, bioFormSchema } from './schema'

type BioFormProps = {
  bio: Profile['bio']
}

export const BioForm = ({ bio }: BioFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<BioFormTypes>({
    resolver: zodResolver(bioFormSchema),
    mode: 'onChange',
    defaultValues: {
      bio: bio ?? '',
    },
  })

  const { isValid, isDirty } = form.formState

  const isSubmitDisabled = !isDirty || !isValid

  const handleSubmit = async (values: BioFormTypes) => {
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
    form.reset({
      bio: bio ?? '',
    })
    setIsEditing(false)
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={
            isSubmitDisabled ? undefined : form.handleSubmit(handleSubmit)
          }
        >
          <FormField
            key="bio"
            control={form.control}
            name="bio"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-4">
                <FormLabel fontWeight="semibold">自己紹介文</FormLabel>
                {isEditing ? (
                  <>
                    <FormControl>
                      <Textarea
                        placeholder="自己紹介文を入力"
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
                    <Text variantColor="slateGray">
                      {bio
                        ? bio
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
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
