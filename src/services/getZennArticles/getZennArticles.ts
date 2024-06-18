import { Parser } from 'xml2js'
import { Article } from '../types'

export const getZennRSSData = async (userName: string): Promise<string> => {
  const ZENN_RSS_URL = `https://zenn.dev/${userName}/feed`

  try {
    const response = await fetch(ZENN_RSS_URL, {
      next: {
        revalidate: 3600,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Zenn RSS')
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

export const getZennArticles = async (userName: string): Promise<Article[]> => {
  try {
    const zennRSSData = await getZennRSSData(userName)

    const parser = new Parser({ explicitArray: false, trim: true })

    const xmlToJson = await parser.parseStringPromise(zennRSSData)
    let array = xmlToJson.rss.channel.item

    if (!Array.isArray(array)) {
      array = [array]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articles: Article[] = array.map((article: any) => {
      const publishedDate = new Date(article.pubDate)
      const isNewly =
        new Date().getTime() - publishedDate.getTime() <=
        30 * 24 * 60 * 60 * 1000 // 1ヶ月以内かどうかをチェック

      return {
        title: article.title,
        url: article.link,
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
