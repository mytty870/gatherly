'use server'
import { parseWithZod } from '@conform-to/zod'
import { userRegisterFormSchema } from './schema'
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const userRegister = async (prevState: unknown, formData: FormData) => {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect('/signin')
  }

  const submission = parseWithZod(formData, {
    schema: userRegisterFormSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }
  const userName = String(formData.get('userName') ?? '')

  const displayName = String(formData.get('displayName') ?? '')

  const userId = session.user.id

  // ユーザー名がすでに存在するか確認
  const existingUserName = await prisma.profile.findUnique({
    where: { userName },
  })

  if (existingUserName) {
    return submission.reply({
      formErrors: [`ユーザー名「${userName}」は既に使用されています`],
    })
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      profile: {
        upsert: {
          create: {
            userName: userName,
            displayName: displayName,
          },
          update: {
            userName: userName,
            displayName: displayName,
          },
        },
      },
    },
    include: { profile: true },
  })

  if (!user.profile?.userName || !user.profile?.displayName) {
    return submission.reply({
      formErrors: ['ユーザー情報の登録に失敗しました。もう一度お試し下さい。'],
    })
  }

  return redirect(`/${user.profile.userName}`)
}
