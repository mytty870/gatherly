import Link from 'next/link'
import React from 'react'
import { LoginButton } from './LoginButton'
import { Heading } from '@/components/ui/heading/Heading'

export const Header = () => {
  return (
    <>
      <header className="relative border-b border-[#eaeaea] bg-white">
        {/* <div className="mx-6 flex min-h-12 items-center justify-between sm:min-h-14"> */}
        <div className="mx-4 flex min-h-12 items-center justify-between sm:mx-6 sm:min-h-16">
          <Heading size="xl" fontWeight="medium">
            <Link href="/">Gatherly</Link>
          </Heading>
          <LoginButton />
        </div>
      </header>
    </>
  )
}
