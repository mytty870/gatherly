import { z } from 'zod'

type Refinement<Value> = (value: Value, ctx: z.RefinementCtx) => void

const ERROR_MESSAGE =
  'ユーザー名の先頭にアンダースコア（ _ ）およびハイフン（ - ）を使用することはできません'

export const startsWithUnderscoreOrHyphenRule = ({
  message = ERROR_MESSAGE,
}: {
  message?: string
}): Refinement<string> => {
  return (value, ctx) => {
    if (value.endsWith('_') || value.endsWith('-')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      })
    }
  }
}
