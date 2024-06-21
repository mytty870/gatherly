import { z } from 'zod'

export const noteUrlSettingFormSchema = z.object({
  noteUserName: z
    .string({ required_error: 'ユーザー名は必須です' })
    .min(3, { message: 'ユーザー名は3文字以上にしてください' })
    .max(16, { message: 'Noteのユーザー名は16字以内のはずです' })
    .regex(/^[a-z0-9_]+$/, {
      message:
        'ユーザー名には半角英数字とアンダースコア（ _ ）のみ使用できます',
    }),
})
