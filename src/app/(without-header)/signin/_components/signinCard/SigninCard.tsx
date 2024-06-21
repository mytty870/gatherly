import React from 'react'
import { SigninButtonGroups } from './signinButtonGroups'
import { Heading } from '@/components/ui/heading/Heading'
import { Text } from '@/components/ui/text/Text'
import { notoSerifJP } from '@/app/fonts'
import Link from 'next/link'

export const SigninCard = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full rounded-2xl border border-powderBlue bg-white p-10 text-center shadow-4xl shadow-darkIndigo sm:max-w-[425px]">
          <div className="flex flex-col gap-3 text-center">
            <Heading
              size="4xl"
              fontWeight="semibold"
              className={`tracking-tight ${notoSerifJP.className}`}
            >
              <Link href="/">Gatherly</Link>
            </Heading>
            <Text
              variantColor="slateGray"
              size="md"
              align="left"
              className="leading-6"
            >
              Gatherly に登録すれば、あなたの
              Zenn、Qiita、Note、しずかなインターネットなどの記事を Gatherly
              に集約することができます。
            </Text>
            <SigninButtonGroups />
          </div>
        </div>
      </div>
    </>
  )
}
