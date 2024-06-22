import { Article } from '@/services/types'

export const zennArticlesFixture: Article[] = [
  {
    title: 'Zenn Article 1',
    url: 'https://zenn.example.com',
    publishedDate: '2022-01-01',
    isNewly: true,
  },
]

export const sizuArticlesFixture: Article[] = [
  {
    title: 'Sizu Article 1',
    url: 'https://sizu.example.com',
    publishedDate: '2022-02-01',
    isNewly: false,
  },
]

export const qiitaArticlesFixture: Article[] = [
  {
    title: 'Qiita Article 1',
    url: 'https://qiita.example.com',
    publishedDate: '2022-03-01',
    isNewly: true,
  },
]

export const noteArticlesFixture: Article[] = [
  {
    title: 'Note Article 1',
    url: 'https://note.example.com',
    publishedDate: '2022-04-01',
    isNewly: false,
  },
]
