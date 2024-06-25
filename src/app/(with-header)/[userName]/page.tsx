import { getProfileFromScreenName } from '@/services/getProfile/getProfile'
import { getZennArticles } from '@/services/getZennArticles/getZennArticles'
import { getSizuArticles } from '@/services/getSizuArticles/getSizuArticles'
import { getQiitaArticles } from '@/services/getQiitaArticles/getQiitaArticles'
import { getNoteArticles } from '@/services/getNoteArticles/getNoteArticles'
import { getServerSession } from '@/lib/auth'
import { _UserPage } from './_page'

type UserPageProps = {
  params: {
    userName: string
  }
}

export default async function UserPage({ params }: UserPageProps) {
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
