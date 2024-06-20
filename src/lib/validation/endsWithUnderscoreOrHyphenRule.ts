import { z } from 'zod'

type Refinement<Value> = (value: Value, ctx: z.RefinementCtx) => void

const ERROR_MESSAGE =
  'ユーザー名の先頭にアンダースコア（ _ ）およびハイフン（ - ）を使用することはできません'

export const endsWithUnderscoreOrHyphenRule = ({
  message = ERROR_MESSAGE,
}: {
  message?: string
}): Refinement<string> => {
  return (value, ctx) => {
    if (value.startsWith('_') || value.startsWith('-')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      })
    }
  }
}
