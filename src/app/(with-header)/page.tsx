import { getServerSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button/Button'
import { Heading } from '@/components/ui/heading/Heading'
import { notoSerifJP } from '@/app/fonts'
import { Text } from '@/components/ui/text/Text'
import { SigninDialog } from '@/components/layout/Header/SigninDialog'

export default async function Home() {
  const session = await getServerSession()

  if (session?.user.userName) {
    redirect(`/${session.user.userName}`)
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-50px)] flex-col items-center  justify-center bg-white p-6 text-center sm:min-h-[calc(100vh-68px)]">
        <div className="max-w-2xl">
          <Heading
            level={2}
            fontWeight="bold"
            size="5xl"
            className={`${notoSerifJP.className} mb-8`}
          >
            Gatherly
          </Heading>
          <Text variantColor="charcoalGray" size="xl" className="mb-8">
            Gatherlyは、Zenn、Qiita、Note、しずかなインターネットから技術記事を集約し、管理することができるプラットフォームです。
          </Text>
          <SigninDialog>
            <Button
              variant="basic"
              radius="full"
              size="lg"
              className="mb-6 px-6"
            >
              はじめる
            </Button>
          </SigninDialog>
        </div>
      </div>
    </>
  )
}
