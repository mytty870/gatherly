import type { Metadata } from 'next'
import { inter } from './fonts'
import './globals.css'
import React from 'react'

export const metadata: Metadata = {
  title: 'Gatherly',
  description:
    'Gatherlyは、Zenn、Qiita、Note、しずかなインターネットの技術記事を集約し、簡単にアクセスできるプラットフォームです。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
