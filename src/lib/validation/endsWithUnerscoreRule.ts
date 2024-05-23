import { z } from 'zod'

type Refinement<Value> = (value: Value, ctx: z.RefinementCtx) => void

const ERROR_MESSAGE =
  'ユーザー名の末尾にアンダースコアを使用することはできません'

export const endsWithUnderscoreRule = ({
  message = ERROR_MESSAGE,
}: {
  message?: string
}): Refinement<string> => {
  return (value, ctx) => {
    if (value.endsWith('_')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      })
    }
  }
}
