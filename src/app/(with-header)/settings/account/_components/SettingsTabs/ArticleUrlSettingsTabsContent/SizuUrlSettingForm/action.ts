'use server'
import { parseWithZod } from '@conform-to/zod'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { sizuUrlSettingFormSchema } from './schema'

export const sizuUserNameRegister = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: sizuUrlSettingFormSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const session = await getServerSession()

  const sizuUserName = String(formData.get('sizuUserName') ?? '')

  const userId = session?.user.id

  try {
    await prisma.profile.update({
      where: { userId },
      data: {
        sizuUserName: sizuUserName,
      },
    })

    revalidatePath('/settings/account')

    return { status: submission.status }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }

    return submission.reply({
      formErrors: [
        'しずかなインターネットのユーザー名の登録に失敗しました。もう一度お試しください。',
      ],
    })
  }
}
