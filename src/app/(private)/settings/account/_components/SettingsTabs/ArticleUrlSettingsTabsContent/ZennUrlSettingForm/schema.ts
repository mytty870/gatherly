import { z } from 'zod'

export const zennUrlSettingFormSchema = z.object({
  zennUserName: z
    .string()
    .max(25, { message: 'Zennのユーザー名は25字以内のはずです' }),
})

export type ZennUrlSettingFormTypes = z.infer<typeof zennUrlSettingFormSchema>
