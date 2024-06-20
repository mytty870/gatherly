'use client'
import { GithubIcon, GoogleIcon } from '@/components/icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/Dialog'
import { Button } from '@/components/ui/button/Button'
import { signIn } from 'next-auth/react'
import { notoSerifJP } from '@/app/fonts'

export const SigninDialog = () => {
  const handleGoogleAuthenticationClick = () => {
    signIn('google', { callbackUrl: '/signin/welcome' })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Sign In</Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}
        className="p-10 sm:max-w-[425px]"
      >
        <DialogHeader className="gap-3">
          <DialogTitle className={`text-4xl ${notoSerifJP.className}`}>
            Gatherly
          </DialogTitle>
          <DialogDescription>
            Gatherly に登録すれば、あなたの
            Zenn、Qiita、Note、しずかなインターネットなどの記事を Gatherly
            に集約することができます。
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
