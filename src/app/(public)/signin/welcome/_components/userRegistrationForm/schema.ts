import { forbiddenWordsRule } from '@/lib/validation/forbiddenWordsRule'
import { z } from 'zod'
import { FORBIDDEN_WORDS } from './constants'
import { startsWithUnderscoreRule } from '@/lib/validation/startsWithUnderscoreRule'
import { endsWithUnderscoreRule } from '@/lib/validation/endsWithUnerscoreRule'

export const userRegistrationFormSchema = z.object({
  userName: z
    .string()
    .min(1, { message: 'ユーザー名を入力してください' })
    .min(2, { message: 'ユーザー名は2文字以上にしてください' })
    .max(14, { message: 'ユーザー名は14字以内にしてください' })
    .regex(/^[a-z0-9_]+$/, {
      message:
        'ユーザー名には半角英数字とアンダースコア（ _ ）のみ使用できます',
    })
    .superRefine(
      forbiddenWordsRule({
        forbiddenWords: FORBIDDEN_WORDS,
        message: 'ユーザー名に使用することができません',
      }),
    )
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
  displayName: z
    .string()
    .min(1, { message: '表示名を入力してください' })
    .max(25, { message: '表示名は25字以内にしてください' }),
})

export type UserRegistrationFormTypes = z.infer<
  typeof userRegistrationFormSchema
>
