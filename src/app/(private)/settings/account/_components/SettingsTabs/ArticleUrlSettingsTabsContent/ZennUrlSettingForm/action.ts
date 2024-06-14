'use server'
import { parseWithZod } from '@conform-to/zod'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { zennUrlSettingFormSchema } from './schema'

export const zennUserNameRegister = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: zennUrlSettingFormSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const session = await getServerSession()

  const zennUserName = String(formData.get('zennUserName') ?? '')

  const userId = session?.user.id

  await prisma.profile.update({
    where: { userId },
    data: {
      zennUserName: zennUserName,
    },
  })

  revalidatePath('/settings/account')

  return { status: submission.status }
}
