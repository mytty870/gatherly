import { z } from 'zod'

export const displayNameFormSchema = z.object({
  displayName: z
    .string({ required_error: '表示名を入力してください' })
    .max(25, { message: '表示名は25字以内にしてください' }),
})

export type DisplayNameFormTypes = z.infer<typeof displayNameFormSchema>
