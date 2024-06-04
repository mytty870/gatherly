import { Card } from '@/components/ui/card/Card'
import { Profile } from '@/types'
import { AvatarEditor } from '../../AvatarEditor/AvatarEditor'
import { BioForm } from './BioForm'
import { DisplayNameForm } from './DisplayNameForm'

type BasicSettingsTabsContentProps = {
  displayName: Profile['displayName']
  bio: Profile['bio']
}

export const BasicSettingsTabsContent = ({
  displayName,
  bio,
}: BasicSettingsTabsContentProps) => {
  return (
    <>
      <Card>
        <AvatarEditor />
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
