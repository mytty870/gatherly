'use client'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form/Form'
import { Text } from '@/components/ui/text/Text'
import { Input } from '@/components/ui/input/Input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button/Button'
import { UserRegistrationFormTypes, userRegistrationFormSchema } from './schema'
import { useRouter } from 'next/navigation'

const formItems: Record<
  keyof UserRegistrationFormTypes,
  {
    label: string
    placeholder: string
    labelDescription: string
    subLabel?: string
  }
> = {
  userName: {
    label: 'ユーザー名',
    placeholder: 'user_name',
    labelDescription: '登録後は変更することができません',
    subLabel: 'gatherly.com/',
  },
  displayName: {
    label: '表示名',
    placeholder: '表示名を入力',
    labelDescription: '後に変更可能です',
  },
}

export const UserRegistrationForm = () => {
  const [serverError, setServerError] = useState(null)

  const form = useForm<UserRegistrationFormTypes>({
    resolver: zodResolver(userRegistrationFormSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      displayName: '',
    },
  })
  const { isValid, isDirty } = form.formState

  const isSubmitDisabled = !isDirty || !isValid

  const router = useRouter()

  const onSubmit = async (values: UserRegistrationFormTypes) => {
    setServerError(null)
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const res = await response.json()

      if (!response.ok) {
        setServerError(res.error.message)
        throw new Error(res)
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={isSubmitDisabled ? undefined : form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* <form className="space-y-8"> */}
        {Object.entries(formItems).map(([name, item]) => {
          return (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof UserRegistrationFormTypes}
              render={({ field, fieldState }) => {
                return (
                  <FormItem>
                    <FormLabel size="sm" fontWeight="bold">
                      {item.label}
                      <Text
                        as="span"
                        size="xs"
                        variantColor="slateGray"
                        className="ml-3"
                      >
                        {item.labelDescription}
                      </Text>
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      {item.subLabel && (
                        <FormLabel
                          color="slateGray"
                          fontWeight="normal"
                          className="tracking-[.02em]"
                        >
                          {item.subLabel}
                        </FormLabel>
                      )}
                      <FormControl>
                        <Input
                          placeholder={item.placeholder}
                          {...field}
                          hasError={fieldState.invalid}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          )
        })}
        <Button fullWidth radius="lg" type="submit" disabled={isSubmitDisabled}>
          Submit
        </Button>
        {serverError && <Text variantColor="alert">{serverError}</Text>}
      </form>
    </Form>
  )
}
