'use server'
import { parseWithZod } from '@conform-to/zod'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
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

  await prisma.profile.update({
    where: { userId },
    data: {
      noteUserName: noteUserName,
    },
  })

  revalidatePath('/settings/account')

  return { status: submission.status }
}
