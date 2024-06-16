import { Card } from '@/components/ui/card/Card'
import { Profile } from '@/types'
import { BioForm } from './BioForm'
import { DisplayNameForm } from './DisplayNameForm'
import { AvatarUploader } from './AvatarUploader'

type BasicSettingsTabsContentProps = {
  displayName: Profile['displayName']
  bio: Profile['bio']
  avatarUrl: Profile['avatarUrl']
}

export const BasicSettingsTabsContent = ({
  displayName,
  bio,
  avatarUrl,
}: BasicSettingsTabsContentProps) => {
  return (
    <>
      <Card>
        <AvatarUploader avatarUrl={avatarUrl} />
      </Card>
      <Card>
        <DisplayNameForm displayName={displayName} />
      </Card>
      <Card>
        <BioForm bio={bio} />
      </Card>
    </>
  )
}
