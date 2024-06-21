import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import React from 'react'
import { Heading } from '@/components/ui/heading/Heading'
import { UserRegisterForm } from './_components/UserRegisterForm'
import { Card } from '@/components/ui/card/Card'

export default async function WelcomePage() {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect('/signin')
  }

  if (session.user?.userName) {
    redirect(`/${session.user?.userName}`)
  }

  return (
    <div className="mt-10 px-4 py-10">
      <Card
        padding="lg"
        shadow="lg"
        alignItems="none"
        fullWidth
        className="mx-auto max-w-[428px] gap-4"
      >
        <Heading level={1} fontWeight="normal" align="center">
          アカウントを作成します
        </Heading>
        <UserRegisterForm />
      </Card>
    </div>
  )
}
