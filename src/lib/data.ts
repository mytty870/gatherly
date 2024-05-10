import axios from 'axios'
import { Parser } from 'xml2js'

export type Post = {
  title: string
  description: string
  url: string
  publishedDate: Date
  creatorName: string
}

const zennRSSUrl = 'https://zenn.dev/catnose99/feed'

export async function fetchZennPosts() {
  try {
    const res = await axios.get(zennRSSUrl)

    const parser = new Parser({ explicitArray: false, trim: true })

    const xmlToJson = await parser.parseStringPromise(res.data)

    let array = xmlToJson.rss.channel.item

    // Zenn の記事が一つしか存在しない場合、単なるobjectで返ってくるため、配列に含める
    if (!Array.isArray(array)) {
      array = [array]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts = array.map((post: any) => ({
      title: post.title,
      description: post.description,
      url: post.link,
      publishedDate: new Date(post.pubDate),
      creatorName: post['dc:creator'],
    }))

    return posts
  } catch (error) {
    console.error(error)
    console.error(error)
  }
}
