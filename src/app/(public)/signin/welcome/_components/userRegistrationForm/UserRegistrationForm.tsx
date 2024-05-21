'use client'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Text } from '@/components/ui/text'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'

const userRegistrationFormSchema = z.object({
  userName: z
    .string()
    .min(2, { message: 'ユーザー名は2文字以上にしてください' })
    .max(14, { message: 'ユーザー名は14字以内にしてください' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        'ユーザー名には半角英数字とアンダースコア（ _ ）のみを使用できます',
    })
    .superRefine((val, ctx) => {
      const forbiddenWords = ['login', 'signin', 'signout', 'enter', 'welcome']
      if (forbiddenWords.includes(val.toLowerCase())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'この単語はユーザー名として使用することはできません',
        })
      }
    })
    .superRefine((val, ctx) => {
      if (val.startsWith('_')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'ユーザー名の先頭にアンダースコアを使用することはできません',
        })
      }
    })
    .superRefine((val, ctx) => {
      if (val.endsWith('_')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'ユーザー名の末尾にアンダースコアを使用することはできません',
        })
      }
    }),
  displayName: z
    .string()
    .min(1, { message: '表示名は1文字以上にしてください' })
    .max(25, { message: '表示名は25字以内にしてください' }),
})

export type UserRegistrationFormTypes = z.infer<
  typeof userRegistrationFormSchema
>

export const UserRegistrationForm = () => {
  const form = useForm<UserRegistrationFormTypes>({
    resolver: zodResolver(userRegistrationFormSchema),
    mode: 'onChange',
  })

  // const onSubmit = (values: UserRegistrationFormTypes) => {
  //   console.log(values)
  // }

  return (
    <Form {...form}>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field, fieldState }) => {
            return (
              <FormItem>
                <FormLabel size="sm" fontWeight="bold">
                  ユーザー名
                  <Text
                    as="span"
                    size="xs"
                    variantColor="slateGray"
                    className="ml-3"
                  >
                    登録後は変更することができません
                  </Text>
                </FormLabel>
                <div className="flex items-center gap-2">
                  <FormLabel
                    color="slateGray"
                    fontWeight="normal"
                    className="tracking-[.02em]"
                  >
                    gatherly.com/
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example"
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
        <FormField
          control={form.control}
          name="displayName"
          render={({ field, fieldState }) => {
            return (
              <FormItem>
                <FormLabel size="sm" fontWeight="bold">
                  表示名
                  <Text
                    as="span"
                    size="xs"
                    variantColor="slateGray"
                    className="ml-3"
                  >
                    後に変更可能です
                  </Text>
                </FormLabel>
                <div className="flex items-center gap-2">
                  {/* <FormLabel color="slateGray" fontWeight="normal" className='tracking-[.02em]'>gatherly.com/</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="example"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
