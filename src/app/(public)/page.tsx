import { ArticleSection } from '@/components/articleSection/ArticleSection'
import { Header } from '@/components/header/Header'
// import { getServerSession } from '@/lib/auth'
// import { fetchZennPosts } from '@/lib/data'

export default async function Home() {
  // const data = await fetchZennPosts()
  // const session = await getServerSession()
  // console.log('aa',session)

  return (
    <>
      <Header />
      <main className="h-screen">
        <div>
          <div className="flex justify-center">
            <ArticleSection />
          </div>
        </div>
      </main>
    </>
  )
}
