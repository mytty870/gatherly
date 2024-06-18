import { Heading } from '@/components/ui/heading/Heading'
import { SettingsTabs } from './_components/SettingsTabs/SettingsTabs'
import { getServerSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { getProfileFromUserId } from '@/services/getProfile/getProfile'

export default async function Page() {
  const session = await getServerSession()

  if (!session || !session.user || !session.user.userName) {
    // 仮で
    notFound()
  }

  const profile = await getProfileFromUserId(session.user.id)

  return (
    <div className="mt-10">
      <div className="mx-auto w-[88vw] max-w-[600px]">
        <Heading align="left" size="xl" fontWeight="semibold" level={2}>
          Settings
        </Heading>
      </div>
      <div className="flex flex-col items-center">
        <SettingsTabs profile={profile} />
      </div>
    </div>
  )
}
