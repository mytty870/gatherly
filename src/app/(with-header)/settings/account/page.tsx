import { Heading } from '@/components/ui/heading/Heading'
import { SettingsTabs } from './_components/SettingsTabs/SettingsTabs'
import { getServerSession } from '@/lib/auth'
import { getProfileFromUserId } from '@/services/getProfile/getProfile'
import { redirect } from 'next/navigation'
import { unstable_cache } from 'next/cache'

export default async function Page() {
  const session = await getServerSession()

  if (!session || !session.user || !session.user.userName) {
    redirect('/signin')
  }

  const userId = session.user.id

  const getProfile = unstable_cache(
    async (userId: string) => getProfileFromUserId(userId),
    [`profile/${userId}`],
    { tags: [`profile/${userId}`] },
  )

  const profile = await getProfile(userId)

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
