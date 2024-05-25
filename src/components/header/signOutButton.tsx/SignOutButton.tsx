'use client'
import { Button } from '@/components/ui/button/Button'
import { signOut } from 'next-auth/react'

export const SignOutButton = () => {
  const handleSignOut = () => {
    signOut()
  }

  return <Button onClick={handleSignOut}>サインアウト</Button>
}
