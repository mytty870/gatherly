import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <>
      <header className="bg-red-300">
        <div className="mx-6 py-3">
          <div>
            <Link href="/" className="text-5xl font-bold">
              Gaterly
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
