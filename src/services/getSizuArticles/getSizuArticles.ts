import { Parser } from 'xml2js'
import { Article } from '../types'

export const getSizuRSSData = async (userName: string) => {
  const SIZU_RSS_URL = `https://sizu.me/${userName}/rss`

  try {
    if (!userName) {
      throw new Error('userName is required')
    }

    const response = await fetch(SIZU_RSS_URL, {
      next: {
        revalidate: 3600,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Sizu RSS')
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

export const getSizuArticles = async (userName: string): Promise<Article[]> => {
  try {
    const sizuRSSData = await getSizuRSSData(userName)

    const parser = new Parser({ explicitArray: false, trim: true })

    const xmlToJson = await parser.parseStringPromise(sizuRSSData)

    let array = xmlToJson.rss.channel.item

    if (!Array.isArray(array)) {
      array = [array]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articles: Article[] = array.map((article: any) => {
      const publishedDate = new Date(article.pubDate)

      const isNewly =
        new Date().getTime() - publishedDate.getTime() <=
        30 * 24 * 60 * 60 * 1000

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
