import React from 'react'
import { SigninCard } from './_components/signinCard/SigninCard'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession()

  if (session?.user.userName) {
    /**
     * 仮でルートにリダイレクトするように設定している
     */
    redirect(`/${session.user.userName}`)
  }

  return (
    <>
      <SigninCard />
    </>
  )
}
