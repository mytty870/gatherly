import { z } from 'zod'

export const quiitaUrlSettingFormSchema = z.object({
  quiitaUserName: z.string({ required_error: 'ユーザー名は必須です' }),
})
