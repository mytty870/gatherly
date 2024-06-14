// import { getServerSession } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { NextRequest } from 'next/server'

// type UpdateProfileData = {
//   displayName?: string
//   bio?: string
//   quiitaUserName?: string
//   zennUserName?: string
//   noteUserName?: string
// }

// export async function POST(request: NextRequest) {
//   try {
//   const session = await getServerSession()

//   if (!session || !session.user) {
//     redirect('/signin')
//   }

//   const userId = session.user.id

//   const { displayName, bio, zennUserName, quiitaUserName, noteUserName } = await request.json()

//   const updateData: UpdateProfileData = {}

//   if (bio !== undefined) {
//     updateData.bio = bio
//   }

//   if (displayName !== undefined) {
//     updateData.displayName = displayName
//   }

//   if (zennUserName !== undefined) {
//     updateData.zennUserName = zennUserName
//   }

//   if (quiitaUserName !== undefined) {
//     updateData.quiitaUserName = quiitaUserName
//   }

//   if (noteUserName !== undefined) {
//     updateData.noteUserName = noteUserName
//   }

//   const profile = await prisma.profile.upsert({
//     where: { userId: userId },
//     update: updateData,
//     create: { userId, ...updateData}
//   })

//   await revalidatePath('/settings/account')

//   return new Response(JSON.stringify(profile), {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })

// } catch (error) {
//   return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//     status: 500,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }

// }
import { getServerSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { post } from './_contracts'

export const POST = post.handler(async ({ input }) => {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect('/signin')
  }

  const userId = session.user.id
  const updateData = { ...input }

  const profile = await prisma.profile.upsert({
    where: { userId },
    update: updateData,
    create: { userId, ...updateData },
  })

  revalidatePath('/settings/account')

  return { success: true, profile }
})
