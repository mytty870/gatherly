import { ArticlesTabs } from './_components/ArticlesTabs'
import { UserProfile } from './_components/userProfile/UserProfile'
import { Profile } from '@/types'
import { Article } from '@/services/types'

type _UserPageProps = {
  profile: Profile
  zennArticles: Article[]
  sizuArticles: Article[]
  qiitaArticles: Article[]
  noteArticles: Article[]
  isMyPage: boolean
}

export function _UserPage({
  profile,
  zennArticles,
  sizuArticles,
  qiitaArticles,
  noteArticles,
  isMyPage,
}: _UserPageProps) {
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
