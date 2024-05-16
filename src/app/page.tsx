import { ArticleSection } from '@/components/articleSection/ArticleSection'
import { Header } from '@/components/header/Header'
// import { fetchZennPosts } from '@/lib/data'

export default async function Home() {
  // const data = await fetchZennPosts()

  return (
    <>
      <Header />
      <main className="h-screen">
        <div>
          <h2 className="">Zenn</h2>
          <div className="flex justify-center">
            <ArticleSection />
          </div>
        </div>
      </main>
    </>
  )
}
