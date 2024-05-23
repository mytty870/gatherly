import { z } from 'zod'

type Refinement<Value> = (value: Value, ctx: z.RefinementCtx) => void

const ERROR_MESSAGE =
  'ユーザー名の先頭にアンダースコアを使用することはできません'

export const startsWithUnderscoreRule = ({
  message = ERROR_MESSAGE,
}: {
  message?: string
}): Refinement<string> => {
  return (value, ctx) => {
    if (value.startsWith('_')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      })
    }
  }
}
