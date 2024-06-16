import Link from 'next/link'
import { Heading } from '@/components/ui/heading/Heading'
import { getServerSession } from '@/lib/auth'
import { LoginButton } from './LoginButton/LoginButton'
import { prisma } from '@/lib/prisma'
import { UserDropdownMenu } from './UserDropdownMenu'
import { UrlObject } from 'url'

export const Header = async () => {
  const session = await getServerSession()

  const profile = await prisma.profile.findFirst({
    where: {
      userId: session?.user.id,
    },
  })

  const homeLink: UrlObject = {
    pathname:
      session && session.user && session.user.userName
        ? `/${session.user.userName}`
        : '/',
  }

  return (
    <>
      <header className="relative border-b border-[#eaeaea] bg-white">
        <div className="mx-4 flex min-h-12 items-center justify-between sm:mx-6 sm:min-h-16">
          <Heading size="xl" fontWeight="medium">
            <Link href={homeLink}>Gatherly</Link>
          </Heading>
          {session && session.user && session.user.userName ? (
            <UserDropdownMenu
              avatarUrl={profile?.avatarUrl ?? ''}
              userName={profile?.userName ?? ''}
              displayName={profile?.displayName ?? ''}
            />
          ) : (
            <LoginButton />
          )}
        </div>
      </header>
    </>
  )
}
