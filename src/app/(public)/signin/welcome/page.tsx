import { redirect } from 'next/navigation'
// import { getServerSession } from '../../../../lib/auth'
import { getServerSession } from '@/lib/auth'
import React from 'react'
import { Heading } from '@/components/ui/heading/Heading'
import { UserRegistrationForm } from './_components/userRegistrationForm/UserRegistrationForm'

export default async function WelcomePage() {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect('/signin')
  }

  /**
   * 仮でルートにリダイレクトするように設定
   */
  if (session.user?.userName) {
    redirect('/')
  }

  return (
    <div className="py-10">
      <div className="mx-auto grid w-full max-w-[428px] gap-4 px-6">
        <Heading level={1} fontWeight="normal" align="center">
          アカウントを作成します
        </Heading>
        {/* <div>
          <label className='text-[0.85rem] font-bold mb-2' htmlFor='username-field'>
            ユーザー名
            <Text as="span" size="xs" variantColor="slateGray" className='ml-3'>登録後は変更することができません</Text>
          </label>
          <div className='flex items-center gap-2'>
            <label className='text-[#65717b] tracking-[.02em]' htmlFor='username-field'>
              gatherly.com/
            </label>
            <Input placeholder='example' id="username-field" type="text" required aria-required="true" />

          </div>
        </div> */}
        <UserRegistrationForm />
      </div>
    </div>
  )
}
