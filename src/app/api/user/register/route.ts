import { getServerSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect('/signin')
  }
  try {
    const { userName, displayName } = await request.json()

    const existingUserName = await prisma?.profile.findUnique({
      where: { userName },
    })

    if (existingUserName) {
      return NextResponse.json(
        {
          error: { message: `ユーザー名「${userName}」は既に使用されています` },
        },
        { status: 400 },
      )
    }

    const user = await prisma?.user.update({
      where: { id: session.user.id },
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
    })
    return Response.json({ user })
  } catch (e) {
    console.error('error', e)
  }
}
