// import { getProfileFromScreenName } from '@/services/getProfile/getProfile'
// import { ArticlesTabs } from './_components/ArticlesTabs'
// import { UserProfile } from './_components/userProfile/UserProfile'
// import { getZennArticles } from '@/services/getZennArticles/getZennArticles'
// import { getSizuArticles } from '@/services/getSizuArticles/getSizuArticles'
// import { getQiitaArticles } from '@/services/getQiitaArticles/getQiitaArticles'
// import { getNoteArticles } from '@/services/getNoteArticles/getNoteArticles'
// import { getServerSession } from '@/lib/auth'

// export default async function UserPage({
//   params,
// }: {
//   params: { userName: string }
// }) {
//   const userName = params.userName
//   const session = await getServerSession()

//   const profile = await getProfileFromScreenName(userName)

//   const [zennArticles, sizuArticles, qiitaArticles, noteArticles] =
//     await Promise.all([
//       getZennArticles(profile.zennUserName ?? ''),
//       getSizuArticles(profile.sizuUserName ?? ''),
//       getQiitaArticles(profile.quiitaUserName ?? ''),
//       getNoteArticles(profile.noteUserName ?? ''),
//     ])

//   const isMyPage = userName === session?.user.userName

//   return (
//     <div className="mt-10 flex flex-col items-center justify-center">
//       <UserProfile
//         avatarUrl={profile.avatarUrl}
//         bio={profile.bio}
//         displayName={profile.displayName}
//       />
//       <ArticlesTabs
//         zennArticles={zennArticles}
//         sizuArticles={sizuArticles}
//         qiitaArticles={qiitaArticles}
//         noteArticles={noteArticles}
//         isMyPage={isMyPage}
//         zennUserName={profile.zennUserName}
//         sizuUserName={profile.sizuUserName}
//         qiitaUserName={profile.quiitaUserName}
//         noteUserName={profile.noteUserName}
//       />
//     </div>
//   )
// }

/* src/app/[userName]/page.tsx */

import { getProfileFromScreenName } from '@/services/getProfile/getProfile'
import { getZennArticles } from '@/services/getZennArticles/getZennArticles'
import { getSizuArticles } from '@/services/getSizuArticles/getSizuArticles'
import { getQiitaArticles } from '@/services/getQiitaArticles/getQiitaArticles'
import { getNoteArticles } from '@/services/getNoteArticles/getNoteArticles'
import { getServerSession } from '@/lib/auth'
import { ArticlesTabs } from './_components/ArticlesTabs'
import { UserProfile } from './_components/userProfile/UserProfile'
import { Profile } from '@/types'
import { Article } from '@/services/types'

type UserPagePresentationProps = {
  profile: Profile
  zennArticles: Article[]
  sizuArticles: Article[]
  qiitaArticles: Article[]
  noteArticles: Article[]
  isMyPage: boolean
}

export function UserPagePresentation({
  profile,
  zennArticles,
  sizuArticles,
  qiitaArticles,
  noteArticles,
  isMyPage,
}: UserPagePresentationProps) {
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
    <UserPagePresentation
      profile={profile}
      zennArticles={zennArticles}
      sizuArticles={sizuArticles}
      qiitaArticles={qiitaArticles}
      noteArticles={noteArticles}
      isMyPage={isMyPage}
    />
  )
}
