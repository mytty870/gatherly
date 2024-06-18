import { getProfileFromScreenName } from '@/services/getProfile/getProfile'
import { ArticlesTabs } from './_components/ArticlesTabs'
import { UserProfile } from './_components/userProfile/UserProfile'
import { getZennArticles } from '@/services/getZennArticles/getZennArticles'
import { getSizuArticles } from '@/services/getSizuArticles/getSizuArticles'
import { getQiitaArticles } from '@/services/getQiitaArticles/getQiitaArticles'
import { getNoteArticles } from '@/services/getNoteArticles/getNoteArticles'
import { getServerSession } from '@/lib/auth'

export default async function Page({
  params,
}: {
  params: { userName: string }
}) {
  const userName = params.userName
  const session = await getServerSession()

  const profile = await getProfileFromScreenName(userName)

  const [zennArticles, sizuArticles, qiitaArticles, noteArticles] =
    await Promise.all([
      getZennArticles(profile.zennUserName ?? ''),
      getSizuArticles(profile.sizuUserName ?? ''),
      getQiitaArticles(profile.quiitaUserName ?? ''),
      getNoteArticles(profile.noteUserName ?? ''),
    ])

  const isMyPage = userName === session?.user.userName

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <UserProfile
        avatarUrl={profile.avatarUrl}
        bio={profile.bio}
        displayName={profile.displayName}
      />
      <ArticlesTabs
        zennArticles={zennArticles}
        sizuArticles={sizuArticles}
        qiitaArticles={qiitaArticles}
        noteArticles={noteArticles}
        isMyPage={isMyPage}
        zennUserName={profile.zennUserName}
        sizuUserName={profile.sizuUserName}
        qiitaUserName={profile.quiitaUserName}
        noteUserName={profile.noteUserName}
      />
    </div>
  )
}
