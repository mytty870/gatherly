import { z } from 'zod'

export const noteUrlSettingFormSchema = z.object({
  noteUserName: z.string({ required_error: 'ユーザー名は必須です' }),
})
