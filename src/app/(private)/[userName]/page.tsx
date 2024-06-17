import { ArticlesTabs } from './_components/articlesTabs/ArticlesTabs'
import { UserProfile } from './_components/userProfile/UserProfile'
import { getProfileFromScreenName } from './dataFetch'

export default async function Page({
  params,
}: {
  params: { userName: string }
}) {
  const userName = params.userName

  const profile = await getProfileFromScreenName(userName)

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
