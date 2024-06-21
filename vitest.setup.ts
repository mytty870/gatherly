import '@testing-library/jest-dom'

import { vi } from 'vitest'

// next/font/google モジュールのモック設定
// https://github.com/vercel/next.js/issues/59701
// TypeError: Inter is not a function というエラーが発生したため、上記で解消
vi.mock('next/font/google', () => ({
  Inter: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
  Noto_Serif_JP: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
  Zen_Kaku_Gothic_New: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
}))
