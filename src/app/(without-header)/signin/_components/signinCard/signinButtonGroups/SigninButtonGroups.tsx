'use client'
import React from 'react'

import { signIn } from 'next-auth/react'
import { GoogleIcon, GithubIcon } from '@/components/icons'
import { Button } from '@/components/ui/button/Button'

export const SigninButtonGroups = () => {
  const callbackUrl = '/signin/welcome'
  const handleGoogleAuthenticationClick = () => {
    signIn('google', { callbackUrl: callbackUrl })
  }

  const handleGithubAuthenticationClick = () => {
    signIn('github', { callbackUrl: callbackUrl })
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
        onClick={handleGithubAuthenticationClick}
      >
        Github アカウントでログイン
      </Button>
    </div>
  )
}
