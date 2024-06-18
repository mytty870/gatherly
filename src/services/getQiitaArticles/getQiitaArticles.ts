import { Parser } from 'xml2js'
import { Article } from '../types'

export const getQiitaRSSData = async (userName: string): Promise<string> => {
  const QIITA_RSS_URL = `https://qiita.com/${userName}/feed`

  try {
    if (!userName) {
      throw new Error('userName is required')
    }

    const response = await fetch(QIITA_RSS_URL, {
      next: {
        revalidate: 3600,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Qiita RSS')
    }
    const text = await response.text()

    if (!text.startsWith('<?xml')) {
      throw new Error('Invalid RSS feed format')
    }

    return text
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }

    throw error
  }
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  return `${year}/${month}/${day}`
}

export const getQiitaArticles = async (
  userName: string,
): Promise<Article[]> => {
  try {
    const qiitaRSSData = await getQiitaRSSData(userName)

    const parser = new Parser({ explicitArray: false, trim: true })

    const xmlToJson = await parser.parseStringPromise(qiitaRSSData)
    let array = xmlToJson.feed.entry

    if (!Array.isArray(array)) {
      array = [array]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articles: Article[] = array.map((article: any) => {
      const publishedDate = new Date(article.published)
      const isNewly =
        new Date().getTime() - publishedDate.getTime() <=
        30 * 24 * 60 * 60 * 1000 // 1ヶ月以内かどうかをチェック

      return {
        title: article.title,
        url: article.url,
        publishedDate: formatDate(publishedDate),
        isNewly,
      }
    })

    return articles
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }
    return []
  }
}
