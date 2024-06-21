'use server'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'

export const avatarUpload = async (formData: FormData) => {
  const session = await getServerSession()

  const { data } = await supabase.storage
    .from('gatherly-avatar')
    .upload(`${uuidv4()}`, formData.get('profileImage') as File)
  const imageUrl = data?.path ?? ''

  const { data: aa } = supabase.storage
    .from('gatherly-avatar')
    .getPublicUrl(imageUrl)

  const url = aa?.publicUrl ?? ''

  const userId = session?.user.id

  await prisma.profile.update({
    where: { userId },
    data: {
      avatarUrl: url,
    },
  })

  // if (submission.status !== 'success') {
  //   return submission.reply();
  // }

  revalidatePath('/settings/account')

  return { status: 'success' }

  // const session = await getServerSession();
  // const profileImage = formData.get('profileImage') as File | null;

  // // if (!profileImage) {
  // //   return { status: 'error', message: 'No file provided' };
  // // }

  // const { data, error } = await supabase.storage.from('gatherly-avatar').upload(`${uuidv4()}`, profileImage);
  // // const { error, data } = await supabase.storage.from('gatherly-avatar').upload(`${uuidv4()}`, profileImage);

  // if (error) {
  //   console.error('Error uploading file:', error.message);
  //   // return { status: 'error', message: 'Error uploading file' };
  // }

  // const imageUrl = data.path ?? '';
  // const userId = session?.user.id;

  // await prisma.profile.update({
  //   where: { userId },
  //   data: {
  //     avatarUrl: imageUrl,
  //   },
  // });

  // revalidatePath('/settings/account');

  // return { status: submission.status };
}
