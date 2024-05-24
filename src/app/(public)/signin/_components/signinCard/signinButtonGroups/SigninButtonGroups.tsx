'use client'
import React from 'react'

import { Button } from '../../../../../../components/ui/button/Button'
import { GoogleIcon } from '../../../../../../components/icons/GoogleIcon'
import { GithubIcon } from '../../../../../../components/icons/GithubIcon'
import { signIn } from 'next-auth/react'

export const SigninButtons = () => {
  const handleGoogleAuthenticationClick = () => {
    signIn('google', { callbackUrl: 'https://localhost:8080' })
  }

  return (
    <div className="grid gap-4">
      <Button
        className="text-[0.95rem]"
        variant="basic"
        radius="full"
        size="sz"
        fullWidth
        startContent={<GoogleIcon />}
        onClick={handleGoogleAuthenticationClick}
      >
        Google アカウントでログイン
      </Button>
      <Button
        className="text-[0.95rem]"
        variant="basic"
        radius="full"
        size="sz"
        fullWidth
        startContent={<GithubIcon width="1.4rem" height="1.4rem" />}
      >
        Github アカウントでログイン
      </Button>
    </div>
  )
}
