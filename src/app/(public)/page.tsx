import { Header } from '@/components/layout/Header/Header'

export default async function Home() {
  return (
    <>
      <Header />
      <main className="h-screen">
        <div>Home Page</div>
      </main>
    </>
  )
}
