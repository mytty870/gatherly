'use client'
import { GithubIcon } from '../icons/GithubIcon'
import { GoogleIcon } from '../icons/GoogleIcon'
import { Button } from '../ui/button/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { signIn } from 'next-auth/react'

export const LoginButton = () => {
  const handleGoogleAuthenticationClick = () => {
    signIn('google', { callbackUrl: 'https://localhost:8080' })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="p-10 sm:max-w-[425px]">
        <DialogHeader className="gap-3">
          <DialogTitle className="text-4xl">Gatherly</DialogTitle>
          <DialogDescription>
            Gatherly に登録すれば、あなたの
            Zenn、Qiita、Note、しずかなインターネットなどの記事を Gatherly
            に集約することができます。
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
