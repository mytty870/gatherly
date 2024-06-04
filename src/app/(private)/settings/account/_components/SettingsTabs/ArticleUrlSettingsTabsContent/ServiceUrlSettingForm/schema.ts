import { z } from 'zod'

export const zennUrlSettingFormSchema = z.object({
  zennUserName: z
    .string()
    .min(1, 'ユーザー名は必須です')
    .max(15, 'Zennのユーザー名は15字以内のはずです'),
})

export const quiitaUrlSettingFormSchema = z.object({
  quiitaUserName: z.string().min(1, 'ユーザー名は必須です'),
})

export const noteUrlSettingFormSchema = z.object({
  noteUserName: z.string().min(1, 'ユーザー名は必須です'),
})

// 各サービスごとのフォーム
export type ZennUrlSettingFormTypes = z.infer<typeof zennUrlSettingFormSchema>
export type QuiitaUrlSettingFormTypes = z.infer<
  typeof quiitaUrlSettingFormSchema
>
export type NoteUrlSettingFormTypes = z.infer<typeof noteUrlSettingFormSchema>
