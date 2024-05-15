import React from 'react'

type Article = {
  title: string
  mediaName: string
  url: string
  mediaIcon: React.ReactNode
}

type Articles = {
  articles: Article[]
}

export const Articles = ({ articles }: Articles) => {
  return (
    <>
      {articles.map((article, index) => (
        <article
          key={index}
          className="flex min-h-[180px] w-[88vw] max-w-[400px] cursor-pointer flex-col text-wrap rounded-lg border bg-white p-6 shadow-md hover:bg-[#f5fbff] md:w-[330px] lg:w-[400px]"
        >
          <div className="flex">
            <h3 className="line-clamp-3 break-all text-xl font-medium">
              {article.title}
            </h3>
          </div>
          <div className="mt-auto flex items-center justify-between text-center">
            <div className="flex items-center gap-1 text-center">
              {article.mediaIcon}
              <span className="text-sm">{article.mediaName}</span>
            </div>
            <div>
              <span className="text-sm">2021/04/01</span>
            </div>
          </div>
        </article>
      ))}
    </>
  )
}
