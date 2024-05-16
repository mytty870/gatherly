'use client'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { SizuIcon } from '../icons/SizuIcon'
import { ZennIcon } from '../icons/ZennIcon'
import { Articles } from '../articles/Articles'
import { NoteIcon } from '../icons/NoteIcon'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const ArticleSection = () => {
  const items = [
    {
      title: 'Next.js プロジェクトで NextUI を使用してみた',
      mediaName: 'Zenn',
      url: 'https://zenn.dev/',
      mediaIcon: <ZennIcon />,
      createdDate: '2021/01/23',
    },
    {
      title: 'bbb',
      mediaName: 'note',
      url: 'https://zenn.dev/',
      mediaIcon: <NoteIcon />,
      createdDate: '2021/01/21',
      new: true,
    },
    {
      title: 'ccc',
      mediaName: 'しずかなインターネット',
      url: 'https://sizu.me/',
      mediaIcon: <SizuIcon />,
      createdDate: '2021/01/22',
    },
  ]
  return (
    <>
      {/* <Tabs defaultValue="zenn">
        <TabsList className="mb-10 w-[88vw] max-w-[400px] border-b md:w-[692px] md:max-w-[832px] lg:w-[832px]">
          <TabsTrigger
            value="zenn"
            className="border-b border-white font-medium data-[state=active]:border-black data-[state=inactive]:text-[#08131A]"
          >
            Zenn
          </TabsTrigger>
          <TabsTrigger value="sizu" className="w-[100px]">
            Sizu
          </TabsTrigger>
        </TabsList>
        <TabsContent value="zenn">
          <Articles articles={items} />
        </TabsContent>
        <TabsContent value="sizu"></TabsContent>
      </Tabs> */}

      <Tabs
        defaultValue="zenn"
        className="mt-5 w-[88vw] max-w-[400px] md:w-[692px] md:max-w-[832px] lg:w-[832px]"
      >
        <TabsList className="mb-10">
          <TabsTrigger value="zenn">Zenn</TabsTrigger>
          <TabsTrigger value="sizu">Sizu</TabsTrigger>
        </TabsList>
        <TabsContent value="zenn">
          <Articles articles={items} />
        </TabsContent>
        <TabsContent value="sizu"></TabsContent>
      </Tabs>
    </>
  )
}
