import { endsWithUnderscoreOrHyphenRule } from '@/lib/validation/endsWithUnderscoreOrHyphenRule'
import { startsWithUnderscoreOrHyphenRule } from '@/lib/validation/startsWithUnderscoreOrHyphenRule'
import { z } from 'zod'

export const quiitaUrlSettingFormSchema = z.object({
  quiitaUserName: z
    .string({ required_error: 'ユーザー名は必須です' })
    .min(3, { message: 'ユーザー名は3文字以上にしてください' })
    .max(32, { message: 'Qiitaのユーザー名は32字以内のはずです' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'ユーザー名には半角英数字、アンダースコア（_）、およびハイフン（-）のみ使用できます',
    })
    .superRefine(
      startsWithUnderscoreOrHyphenRule({
        message:
          'ユーザー名の先頭にアンダースコア（ _ ）およびハイフン（ - ）を使用することはできません',
      }),
    )
    .superRefine(
      endsWithUnderscoreOrHyphenRule({
        message:
          'ユーザー名の末尾にアンダースコア（ _ ）およびハイフン（ - ）を使用することはできません',
      }),
    ),
})
