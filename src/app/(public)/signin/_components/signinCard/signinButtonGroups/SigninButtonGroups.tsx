'use client'
import React from 'react'

import { signIn } from 'next-auth/react'
import { GoogleIcon, GithubIcon } from '@/components/icons'
import { Button } from '@/components/ui/button/Button'

export const SigninButtonGroups = () => {
  const handleGoogleAuthenticationClick = () => {
    signIn('google', { callbackUrl: '/signin/welcome' })
  }

  return (
    <div className="grid gap-4">
      <Button
        variant="basic"
        radius="full"
        size="lg"
        fullWidth
        startContent={<GoogleIcon />}
        onClick={handleGoogleAuthenticationClick}
      >
        Google アカウントでログイン
      </Button>
      <Button
        variant="basic"
        radius="full"
        size="lg"
        fullWidth
        startContent={<GithubIcon width="1.4rem" height="1.4rem" />}
      >
        Github アカウントでログイン
      </Button>
    </div>
  )
}
