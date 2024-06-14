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
      <Card>
        <ZennUrlSettingForm zennUserName={zennUserName} />
      </Card>
      <Card>
        <QuiitaUrlSettingForm quiitaUserName={quiitaUserName} />
      </Card>
      <Card>
        <NoteUrlSettingForm noteUserName={noteUserName} />
      </Card>
      <Card>
        <SizuUrlSettingForm sizuUserName={sizuUserName} />
      </Card>
    </>
  )
}
