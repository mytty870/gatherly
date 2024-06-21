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
  isMyPage: boolean
  zennUserName: string | null
  sizuUserName: string | null
  qiitaUserName: string | null
  noteUserName: string | null
}

export const ArticlesTabs = ({
  zennArticles,
  sizuArticles,
  qiitaArticles,
  noteArticles,
  isMyPage,
  zennUserName,
  sizuUserName,
  qiitaUserName,
  noteUserName,
}: ArticleTabsProps) => {
  return (
    <>
      <Tabs
        defaultValue="zenn"
        className="mb-10 mt-5 w-[88vw] max-w-[400px] md:w-[692px] md:max-w-[832px] lg:w-[832px]"
      >
        <TabsList className="mb-10">
          <TabsTrigger value="zenn">Zenn</TabsTrigger>
          <TabsTrigger value="qiita">Qiita</TabsTrigger>
          <TabsTrigger value="note">Note</TabsTrigger>
          <TabsTrigger value="sizu">Sizu</TabsTrigger>
        </TabsList>
        <TabsContent value="zenn">
          <Articles
            articles={zennArticles}
            mediaIcon={<ZennFullIcon />}
            isMyPage={isMyPage}
            userName={zennUserName}
            mediaName="Zenn"
          />
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
            isMyPage={isMyPage}
            userName={sizuUserName}
            mediaName="しずかなインターネット"
          />
        </TabsContent>
        <TabsContent value="qiita">
          <Articles
            articles={qiitaArticles}
            mediaIcon={
              <div className="rounded-md bg-limeGreen px-2.5 py-1.5 text-white">
                <QiitaIcon />
              </div>
            }
            isMyPage={isMyPage}
            userName={qiitaUserName}
            mediaName="Qiita"
          />
        </TabsContent>
        <TabsContent value="note">
          <Articles
            articles={noteArticles}
            mediaIcon={<NoteIcon />}
            isMyPage={isMyPage}
            userName={noteUserName}
            mediaName="Note"
          />
        </TabsContent>
      </Tabs>
    </>
  )
}
