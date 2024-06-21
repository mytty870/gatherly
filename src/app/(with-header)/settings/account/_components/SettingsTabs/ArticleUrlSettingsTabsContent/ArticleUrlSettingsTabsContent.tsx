'use client'
import { Card } from '@/components/ui/card/Card'
import { Profile } from '@/types'
import { NoteUrlSettingForm } from './NoteUrlSettingForm'
import { QuiitaUrlSettingForm } from './QuiitaUrlSettingForm'
import { ZennUrlSettingForm } from './ZennUrlSettingForm'
import { SizuUrlSettingForm } from './SizuUrlSettingForm'

type ArticleUrlSettingsTabsContentProps = {
  zennUserName: Profile['zennUserName']
  quiitaUserName: Profile['quiitaUserName']
  noteUserName: Profile['noteUserName']
  sizuUserName: Profile['sizuUserName']
}

export const ArticleUrlSettingsTabsContent = ({
  zennUserName,
  quiitaUserName,
  noteUserName,
  sizuUserName,
}: ArticleUrlSettingsTabsContentProps) => {
  return (
    <>
      <Card padding="lg">
        <ZennUrlSettingForm zennUserName={zennUserName} />
      </Card>
      <Card padding="lg">
        <QuiitaUrlSettingForm quiitaUserName={quiitaUserName} />
      </Card>
      <Card padding="lg">
        <NoteUrlSettingForm noteUserName={noteUserName} />
      </Card>
      <Card padding="lg">
        <SizuUrlSettingForm sizuUserName={sizuUserName} />
      </Card>
    </>
  )
}
