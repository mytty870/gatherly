import { Badge } from '@/components/ui/badge/Badge'
import React from 'react'
import { Heading } from '@/components/ui/heading/Heading'
import { Text } from '@/components/ui/text/Text'
import { EmptyStateIcon } from '@/components/icons'
import Link from 'next/link'
import { Button } from '@/components/ui/button/Button'
import { Article } from '@/services/types'
import { Card } from '@/components/ui/card/Card'

type ArticlesProps = {
  articles: Article[]
  mediaIcon: JSX.Element
  isMyPage: boolean
  userName: string | null
  mediaName: string
}

export const Articles = ({
  articles,
  mediaIcon,
  isMyPage,
  userName,
  mediaName,
}: ArticlesProps) => {
  if (articles.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center space-y-4 px-4">
        {isMyPage && userName === null ? (
          <Card shadow="md" fullWidth alignItems="center" className="space-y-4">
            <EmptyStateIcon width="60" height="60" />
            <Text
              as="span"
              size="lg"
              fontWeight="medium"
              variantColor="slateGray"
              align="left"
              className="px-4"
            >
              {mediaName}の記事を表示するには、{mediaName}
              のユーザー名を設定する必要があります。
            </Text>
            <Link href="/settings/account">
              <Button variant="primary">ユーザー名を設定する</Button>
            </Link>
          </Card>
        ) : isMyPage ? (
          <Card shadow="md" fullWidth alignItems="center" className="space-y-4">
            <EmptyStateIcon width="60" height="60" />
            <Text
              as="span"
              size="lg"
              fontWeight="medium"
              variantColor="slateGray"
              align="left"
              className="px-4"
            >
              {mediaName}の記事が存在しません。まだ投稿がないか、{mediaName}
              のユーザー名が間違っている可能性があります。
            </Text>
            <Link href="/settings/account" passHref>
              <Button variant="primary">再設定する</Button>
            </Link>
          </Card>
        ) : (
          <Card shadow="md" fullWidth alignItems="center" className="space-y-4">
            <EmptyStateIcon width="60" height="60" />
            <Text
              as="span"
              size="lg"
              fontWeight="medium"
              variantColor="slateGray"
              align="left"
              className="px-4"
            >
              {mediaName}の記事がありません
            </Text>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {articles.map((article, index) => (
        <article
          key={index}
          className="relative flex min-h-[180px] w-[88vw] max-w-[400px] cursor-pointer flex-col text-wrap rounded-lg border bg-white p-6 shadow-md hover:bg-iceBlue md:w-[330px] lg:w-[400px]"
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
