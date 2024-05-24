import React from 'react'
import { SigninButtons } from './signinButtonGroups/SigninButtonGroups'

export const SigninCard = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full rounded-2xl border border-[#e4edf4]  bg-white p-10 text-center shadow-[0_5px_20px_#00166721] sm:max-w-[425px]">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-4xl font-semibold tracking-tight">Gaterly</h2>
            <p className="text-left text-[0.95rem] leading-6 text-[#696f73]">
              Gatherly に登録すれば、あなたの
              Zenn、Qiita、Note、しずかなインターネットなどの記事を Gatherly
              に集約することができます。
            </p>
            <SigninButtons />
          </div>
        </div>
      </div>
    </>
  )
}
