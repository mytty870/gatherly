import { Inter, Noto_Serif_JP, Zen_Kaku_Gothic_New } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })

export const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
})
