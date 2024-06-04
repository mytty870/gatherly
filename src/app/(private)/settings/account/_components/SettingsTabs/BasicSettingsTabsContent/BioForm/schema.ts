import { z } from 'zod'

export const bioFormSchema = z.object({
  bio: z.string().max(150, { message: '自己紹介文は150字以内にしてください' }),
})

export type BioFormTypes = z.infer<typeof bioFormSchema>
