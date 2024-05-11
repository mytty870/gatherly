import { Articles } from '@/components/articles/Articles'
import { Header } from '@/components/header/Header'
import { fetchZennPosts } from '@/lib/data'

export default async function Home() {
  const data = await fetchZennPosts()

  return (
    <>
      <Header />
      <main className="h-screen">
        <div>
          <h2 className="">Zenn</h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Articles articles={data} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
