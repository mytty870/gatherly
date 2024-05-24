import { Badge } from '@/components/ui/badge/Badge'
import React from 'react'
import { Heading } from '../ui/heading/Heading'

type Article = {
  title: string
  mediaName: string
  url: string
  mediaIcon: React.ReactNode
  createdDate: string
  new?: boolean
}

type Articles = {
  articles: Article[]
}

export const Articles = ({ articles }: Articles) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {articles.map((article, index) => (
        <article
          key={index}
          className="relative flex min-h-[180px] w-[88vw] max-w-[400px] cursor-pointer flex-col text-wrap rounded-lg border bg-white p-6 shadow-md hover:bg-[#f5fbff] md:w-[330px] lg:w-[400px]"
        >
          {article.new && (
            <Badge className="absolute left-0 top-0 -translate-x-3 -translate-y-2 -rotate-[20deg] bg-red-500">
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
              {article.mediaIcon}
              <span className="text-sm">{article.mediaName}</span>
            </div>
            <div>
              <span className="text-sm">{article.createdDate}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
