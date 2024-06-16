import { Heading } from '@/components/ui/heading/Heading'
import { SettingsTabs } from './_components/SettingsTabs/SettingsTabs'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()

  const profile = await prisma.profile.findFirst({
    where: {
      userId: session?.user.id,
    },
  })

  if (!profile) {
    notFound()
  }

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
