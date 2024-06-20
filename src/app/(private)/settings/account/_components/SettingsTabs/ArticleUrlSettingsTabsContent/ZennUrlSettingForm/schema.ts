import { endsWithUnderscoreRule } from '@/lib/validation/endsWithUnerscoreRule'
import { startsWithUnderscoreRule } from '@/lib/validation/startsWithUnderscoreRule'
import { z } from 'zod'

export const zennUrlSettingFormSchema = z.object({
  zennUserName: z
    .string({ required_error: 'ユーザー名は必須です' })
    .min(2, { message: 'ユーザー名は2文字以上にしてください' })
    .max(15, { message: 'Zennのユーザー名は15字以内のはずです' })
    .regex(/^[a-z0-9_]+$/, {
      message:
        'ユーザー名には半角英数字とアンダースコア（ _ ）のみ使用できます',
    })
    .superRefine(
      startsWithUnderscoreRule({
        message: 'ユーザー名の先頭にアンダースコアを使用することはできません',
      }),
    )
    .superRefine(
      endsWithUnderscoreRule({
        message: 'ユーザー名の末尾にアンダースコアを使用することはできません',
      }),
    ),
})
