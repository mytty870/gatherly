import { Badge } from '@/components/ui/badge/Badge'
import React from 'react'
import { Heading } from '@/components/ui/heading/Heading'

type Article = {
  title: string
  url: string
  publishedDate: string
  isNewly: boolean
}

type Articles = {
  articles: Article[]
  mediaIcon: JSX.Element
}

export const Articles = ({ articles, mediaIcon }: Articles) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {articles.map((article, index) => (
        <article
          key={index}
          className="relative flex min-h-[180px] w-[88vw] max-w-[400px] cursor-pointer flex-col text-wrap rounded-lg border bg-white p-6 shadow-md hover:bg-[#f5fbff] md:w-[330px] lg:w-[400px]"
        >
          {article.isNewly && (
            <Badge className="absolute left-0 top-0 -translate-x-3 -translate-y-2 -rotate-[20deg]">
              New
            </Badge>
          )}
          <a href={article.url} key={index} className="absolute inset-0"></a>
          <div className="flex">
            <Heading
              level={3}
              fontWeight="medium"
              size="lg"
              align="left"
              className="line-clamp-3 break-all"
            >
              {article.title}
            </Heading>
          </div>
          <div className="mt-auto flex items-center justify-between text-center">
            <div className="flex items-center gap-2 text-center">
              {mediaIcon}
            </div>
            <div>
              <span className="text-sm">{article.publishedDate}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
