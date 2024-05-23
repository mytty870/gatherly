import { z } from 'zod'
type Refinement<Value> = (val: Value, ctx: z.RefinementCtx) => void

const ERROR_MESSAGE = '使用することはできません'

export const forbiddenWordsRule = ({
  message = ERROR_MESSAGE,
  forbiddenWords,
}: {
  message?: string
  forbiddenWords: string[]
}): Refinement<string> => {
  return (val, ctx) => {
    if (forbiddenWords.includes(val.toLowerCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      })
    }
  }
}
