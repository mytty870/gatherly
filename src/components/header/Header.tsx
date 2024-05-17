import Link from 'next/link'
import React from 'react'
import { LoginButton } from './LoginButton'

export const Header = () => {
  return (
    <>
      <header className="relative border-b border-[#eaeaea] bg-white">
        {/* <div className="mx-6 flex min-h-12 items-center justify-between sm:min-h-14"> */}
        <div className="mx-4 flex min-h-12 items-center justify-between sm:mx-6 sm:min-h-16">
          <h1 className="text-2xl font-medium">
            <Link href="/">Gatherly</Link>
          </h1>
          <LoginButton />
        </div>
      </header>
    </>
  )
}
