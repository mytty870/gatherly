import Link from 'next/link'
import { Heading } from '@/components/ui/heading/Heading'
import { getServerSession } from '@/lib/auth'
import { SigninDialog } from './SigninDialog'
import { prisma } from '@/lib/prisma'
import { UserDropdownMenu } from './UserDropdownMenu'
import { UrlObject } from 'url'
import { notoSerifJP } from '@/app/fonts'
import { Button } from '@/components/ui/button/Button'

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
      <header className="relative border-b border-lightGray bg-white">
        <div className="mx-4 flex min-h-12 items-center justify-between sm:mx-6 sm:min-h-16">
          <Heading
            className={notoSerifJP.className}
            size="xl"
            fontWeight="bold"
          >
            <Link href={homeLink}>Gatherly</Link>
          </Heading>
          {session && session.user && session.user.userName ? (
            <UserDropdownMenu
              avatarUrl={profile?.avatarUrl ?? ''}
              userName={profile?.userName ?? ''}
              displayName={profile?.displayName ?? ''}
            />
          ) : (
            <SigninDialog>
              <Button size="sm">Sign In</Button>
            </SigninDialog>
          )}
        </div>
      </header>
    </>
  )
}
