type Article = {
  title: string
  description: string
  url: string
  publishedDate: Date
  creatorName: string
}

type Articles = {
  articles: Article[]
}

export const Articles = ({ articles }: Articles) => {
  return (
    <>
      {articles.map((article, index) => (
        <a key={index} href={article.url}>
          <article className="min-h-[150px] w-[70vw] max-w-[440px] cursor-pointer text-wrap rounded-lg border border-[#d6e3ed] bg-white p-6 shadow-md hover:bg-[#f5fbff] md:w-[330px] ">
            <div className="flex">
              <h2 className="line-clamp-3 break-all text-xl font-medium">
                {article.title}
              </h2>
            </div>
          </article>
        </a>
      ))}
    </>
  )
}
