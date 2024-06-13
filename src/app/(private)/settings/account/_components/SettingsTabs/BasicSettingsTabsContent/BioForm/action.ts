'use server'
import { bioFormSchema } from './schema'
import { parseWithZod } from '@conform-to/zod'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const bioRegister = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: bioFormSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const session = await getServerSession()

  const bio = String(formData.get('bio') ?? '')

  const userId = session?.user.id

  await prisma.profile.update({
    where: { userId },
    data: {
      bio: bio,
    },
  })

  revalidatePath('/settings/account')

  return { status: submission.status }
}
