'use server'
import { displayNameFormSchema } from './schema'
import { parseWithZod } from '@conform-to/zod'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const displayNameRegister = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, { schema: displayNameFormSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const session = await getServerSession()

  const displayName = String(formData.get('displayName') ?? '')

  const userId = session?.user.id

  await prisma.profile.update({
    where: { userId },
    data: {
      displayName: displayName,
    },
  })

  revalidatePath('/settings/account')

  return { status: submission.status }
}
