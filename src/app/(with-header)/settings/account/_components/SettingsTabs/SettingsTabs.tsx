import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs/Tabs'
import { Profile } from '@/types'
import { BasicSettingsTabsContent } from './BasicSettingsTabsContent'
import { ArticleUrlSettingsTabsContent } from './ArticleUrlSettingsTabsContent'

export type SettingsTabsProps = {
  profile: Profile
}

export const SettingsTabs = ({ profile }: SettingsTabsProps) => {
  const defaultTabName = 'article-settings'

  return (
    <Tabs
      defaultValue={defaultTabName}
      className="mb-10 mt-5 w-[88vw] max-w-[600px]"
    >
      <TabsList className="mb-10">
        <TabsTrigger value="article-settings">記事設定</TabsTrigger>
        <TabsTrigger value="basic-settings">基本設定</TabsTrigger>
      </TabsList>
      <TabsContent value="article-settings" className="flex flex-col gap-6">
        <ArticleUrlSettingsTabsContent
          zennUserName={profile?.zennUserName ?? ''}
          quiitaUserName={profile?.quiitaUserName ?? ''}
          noteUserName={profile?.noteUserName ?? ''}
          sizuUserName={profile?.sizuUserName ?? ''}
        />
      </TabsContent>
      <TabsContent value="basic-settings" className="flex flex-col gap-6">
        <BasicSettingsTabsContent
          displayName={profile?.displayName ?? ''}
          bio={profile?.bio ?? ''}
          avatarUrl={profile?.avatarUrl ?? ''}
        />
      </TabsContent>
    </Tabs>
  )
}
