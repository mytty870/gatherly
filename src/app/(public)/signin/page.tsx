import React from 'react'
import { SigninCard } from './_components/signinCard/SigninCard'
import { getServerSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession()

  if (session?.user.userName) {
    return redirect(`/${session.user.userName}`)
  }

  return (
    <>
      <SigninCard />
    </>
  )
}
