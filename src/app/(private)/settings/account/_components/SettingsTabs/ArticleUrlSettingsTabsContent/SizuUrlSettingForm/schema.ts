import { z } from 'zod'

export const sizuUrlSettingFormSchema = z.object({
  sizuUserName: z.string({ required_error: 'ユーザー名は必須です' }),
})
