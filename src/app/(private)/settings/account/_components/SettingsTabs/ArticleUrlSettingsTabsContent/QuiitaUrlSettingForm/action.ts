'use server'
import { parseWithZod } from '@conform-to/zod'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { quiitaUrlSettingFormSchema } from './schema'

export const quiitaUserNameRegister = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: quiitaUrlSettingFormSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const session = await getServerSession()

  const quiitaUserName = String(formData.get('quiitaUserName') ?? '')

  const userId = session?.user.id

  await prisma.profile.update({
    where: { userId },
    data: {
      quiitaUserName: quiitaUserName,
    },
  })

  revalidatePath('/settings/account')

  return { status: submission.status }
}
