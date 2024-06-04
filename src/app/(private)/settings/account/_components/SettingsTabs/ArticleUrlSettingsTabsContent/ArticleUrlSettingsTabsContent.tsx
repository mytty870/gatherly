'use client'
import { Card } from '@/components/ui/card/Card'
import { Profile } from '@/types'
import { ServiceUrlSettingForm } from './ServiceUrlSettingForm'
import {
  NoteUrlSettingFormTypes,
  QuiitaUrlSettingFormTypes,
  noteUrlSettingFormSchema,
  quiitaUrlSettingFormSchema,
  ZennUrlSettingFormTypes,
  zennUrlSettingFormSchema,
} from './ServiceUrlSettingForm/schema'

type ArticleUrlSettingsTabsContentProps = {
  zennUserName: Profile['zennUserName']
  quiitaUserName: Profile['quiitaUserName']
  noteUserName: Profile['noteUserName']
}

export const ArticleUrlSettingsTabsContent = ({
  zennUserName,
  quiitaUserName,
  noteUserName,
}: ArticleUrlSettingsTabsContentProps) => {
  return (
    <>
      <Card>
        <ServiceUrlSettingForm<ZennUrlSettingFormTypes>
          service="Zenn"
          userNameKey="zennUserName"
          userName={zennUserName ?? ''}
          schema={zennUrlSettingFormSchema}
        />
      </Card>
      <Card>
        <ServiceUrlSettingForm<QuiitaUrlSettingFormTypes>
          service="Quiita"
          userNameKey="quiitaUserName"
          userName={quiitaUserName ?? ''}
          schema={quiitaUrlSettingFormSchema}
        />
      </Card>
      <Card>
        <ServiceUrlSettingForm<NoteUrlSettingFormTypes>
          service="Note"
          userNameKey="noteUserName"
          userName={noteUserName ?? ''}
          schema={noteUrlSettingFormSchema}
        />
      </Card>
    </>
  )
}
