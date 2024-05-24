import React from 'react'
import { SigninButtons } from './signinButtonGroups/SigninButtonGroups'
import { Heading } from '@/components/ui/heading/Heading'
import { Text } from '@/components/ui/text/Text'

export const SigninCard = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full rounded-2xl border border-[#e4edf4]  bg-white p-10 text-center shadow-[0_5px_20px_#00166721] sm:max-w-[425px]">
          <div className="flex flex-col gap-3 text-center">
            <Heading
              size="4xl"
              fontWeight="semibold"
              className="tracking-tight"
            >
              Gatherly
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
            <SigninButtons />
          </div>
        </div>
      </div>
    </>
  )
}
