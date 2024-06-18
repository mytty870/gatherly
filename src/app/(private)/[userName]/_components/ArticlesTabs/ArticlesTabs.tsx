'use client'
import { Articles } from './Articles'
import { ZennFullIcon, SizuIcon, NoteIcon, QiitaIcon } from '@/components/icons'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/Tabs'
import { Article } from '@/services/types'
import { Text } from '@/components/ui/text/Text'

type ArticleTabsProps = {
  zennArticles: Article[]
  sizuArticles: Article[]
  qiitaArticles: Article[]
  noteArticles: Article[]
}

export const ArticlesTabs = ({
  zennArticles,
  sizuArticles,
  qiitaArticles,
  noteArticles,
}: ArticleTabsProps) => {
  return (
    <>
      <Tabs
        defaultValue="zenn"
        className="mt-5 w-[88vw] max-w-[400px] md:w-[692px] md:max-w-[832px] lg:w-[832px]"
      >
        <TabsList className="mb-10">
          <TabsTrigger value="zenn">Zenn</TabsTrigger>
          <TabsTrigger value="sizu">Sizu</TabsTrigger>
          <TabsTrigger value="qiita">Qiita</TabsTrigger>
          <TabsTrigger value="note">Note</TabsTrigger>
        </TabsList>
        <TabsContent value="zenn">
          <Articles articles={zennArticles} mediaIcon={<ZennFullIcon />} />
        </TabsContent>
        <TabsContent value="sizu">
          <Articles
            articles={sizuArticles}
            mediaIcon={
              <>
                <SizuIcon />
                <Text as="span" size="sm" fontWeight="medium">
                  しずかなインターネット
                </Text>
              </>
            }
          />
        </TabsContent>
        <TabsContent value="qiita">
          <Articles
            articles={qiitaArticles}
            mediaIcon={
              <div className="rounded-md bg-[#67cb1b] px-2.5 py-1.5 text-white">
                <QiitaIcon />
              </div>
            }
          />
        </TabsContent>
        <TabsContent value="note">
          <Articles articles={noteArticles} mediaIcon={<NoteIcon />} />
        </TabsContent>
      </Tabs>
    </>
  )
}
