'use server'
import { parseWithZod } from '@conform-to/zod'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath, revalidateTag } from 'next/cache'
import { noteUrlSettingFormSchema } from './schema'

export const noteUserNameRegister = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: noteUrlSettingFormSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const session = await getServerSession()

  const noteUserName = String(formData.get('noteUserName') ?? '')

  const userId = session?.user.id

  try {
    await prisma.profile.update({
      where: { userId },
      data: {
        noteUserName: noteUserName,
      },
    })

    revalidatePath('/settings/account')
    revalidateTag(`profile/${userId}`)

    return { status: submission.status }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }

    return submission.reply({
      formErrors: [
        'Noteのユーザー名の更新に失敗しました。もう一度お試しください。',
      ],
    })
  }
}
