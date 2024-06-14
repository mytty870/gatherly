import { z } from 'zod'

export const zennUrlSettingFormSchema = z.object({
  zennUserName: z.string({ required_error: 'ユーザー名は必須です' }),
})
