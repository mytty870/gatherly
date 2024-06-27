import { getProfileFromScreenName } from '@/services/getProfile/getProfile'
import { getZennArticles } from '@/services/getZennArticles/getZennArticles'
import { getSizuArticles } from '@/services/getSizuArticles/getSizuArticles'
import { getQiitaArticles } from '@/services/getQiitaArticles/getQiitaArticles'
import { getNoteArticles } from '@/services/getNoteArticles/getNoteArticles'
import { getServerSession } from '@/lib/auth'
import { _UserPage } from './_page'
import { unstable_cache } from 'next/cache'

type UserPageProps = {
  params: {
    userName: string
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const userName = params.userName
  const session = await getServerSession()

  const userId = session?.user.id

  const getProfile = unstable_cache(
    async (userName: string) => getProfileFromScreenName(userName),
    [`profile/${userId}`],
    { tags: [`profile/${userId}`] },
  )

  const profile = await getProfile(userName)

  const [zennArticles, sizuArticles, qiitaArticles, noteArticles] =
    await Promise.all([
      getZennArticles(profile.zennUserName ?? ''),
      getSizuArticles(profile.sizuUserName ?? ''),
      getQiitaArticles(profile.quiitaUserName ?? ''),
      getNoteArticles(profile.noteUserName ?? ''),
    ])

  const isMyPage = userName === session?.user.userName

  return (
    <_UserPage
      profile={profile}
      zennArticles={zennArticles}
      sizuArticles={sizuArticles}
      qiitaArticles={qiitaArticles}
      noteArticles={noteArticles}
      isMyPage={isMyPage}
    />
  )
}
