import { Parser } from 'xml2js'
import { Article } from '../types'

export const getNoteRSSData = async (userName: string): Promise<string> => {
  const NOTE_RSS_URL = `https://note.com/${userName}/rss/`

  try {
    const response = await fetch(NOTE_RSS_URL, {
      next: {
        revalidate: 3600,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Note RSS')
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
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export const getNoteArticles = async (userName: string): Promise<Article[]> => {
  try {
    const noteRSSData = await getNoteRSSData(userName)

    const parser = new Parser({ explicitArray: false, trim: true })

    const xmlToJson = await parser.parseStringPromise(noteRSSData)
    let items = xmlToJson.rss.channel.item

    if (!Array.isArray(items)) {
      items = [items]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articles: Article[] = items.map((item: any) => {
      const publishedDate = new Date(item.pubDate)
      const isNewly =
        new Date().getTime() - publishedDate.getTime() <=
        30 * 24 * 60 * 60 * 1000 // 1ヶ月以内かどうかをチェック

      return {
        title: item.title,
        description: item.description,
        url: item.link,
        publishedDate: formatDate(publishedDate),
        creatorName: item['note:creatorName'],
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
