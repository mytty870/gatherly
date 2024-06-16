import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ArticlesTabs } from './_components/articlesTabs/ArticlesTabs'
import { UserProfile } from './_components/userProfile/UserProfile'

export default async function Page({
  params,
}: {
  params: { userName: string }
}) {
  const userName = params.userName

  const profile = await prisma.profile.findFirst({
    where: { userName: userName },
  })

  if (!profile) {
    notFound()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <UserProfile
        avatarUrl={profile.avatarUrl}
        bio={profile.bio}
        displayName={profile.displayName}
      />
      <ArticlesTabs />
    </div>
  )
}
