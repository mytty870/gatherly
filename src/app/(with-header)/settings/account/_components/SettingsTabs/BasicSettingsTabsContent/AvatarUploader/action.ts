'use server'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath, revalidateTag } from 'next/cache'

export const avatarUpload = async (prevState: unknown, formData: FormData) => {
  try {
    const session = await getServerSession()

    const { data, error } = await supabase.storage
      .from('gatherly-avatar')
      .upload(`${uuidv4()}`, formData.get('profileImage') as File)

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`)
    }

    const imageUrl = data?.path ?? ''

    const { data: urlData } = supabase.storage
      .from('gatherly-avatar')
      .getPublicUrl(imageUrl)

    if (!urlData) {
      throw new Error('Error getting public url')
    }

    const url = urlData.publicUrl ?? ''

    const userId = session?.user.id

    await prisma.profile.update({
      where: { userId },
      data: {
        avatarUrl: url,
      },
    })

    revalidatePath('/settings/account')
    revalidateTag(`profile/${userId}`)

    return { status: 'success' }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }

    return {
      status: 'error',
      message:
        '画像アップロード中にエラーが発生しました。時間をあけてもう一度お試しください。',
    }
  }
}
