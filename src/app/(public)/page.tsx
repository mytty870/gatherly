import { Header } from '@/components/layout/Header/Header'
import { getServerSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession()

  if (session?.user.userName) {
    redirect(`/${session.user.userName}`)
  }

  return (
    <>
      <Header />
      <main className="h-screen">
        <div>Home Page</div>
      </main>
    </>
  )
}
