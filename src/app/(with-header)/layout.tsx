import { Header } from '@/components/layout/Header/Header'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
