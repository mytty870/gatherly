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

// cache が カナリアなため、type error が発生するため、mock する
//https://github.com/vercel/next.js/discussions/49304 を参考に
vi.mock('react', async importActual => {
  const testCache = <T extends (...args: Array<unknown>) => unknown>(func: T) =>
    func
  const actual = await importActual<typeof import('react')>()
  return {
    ...actual,
    cache: testCache,
  }
})

vi.mock('react-dom', async importActual => {
  const actual = await importActual<typeof import('react-dom')>()
  return {
    ...actual,
    useFormState: () => [null, vi.fn()],
    useFormStatus: () => ({ pending: false }),
  }
})

vi.mock('@/lib/supabase', () => ({
  auth: {
    signIn: vi.fn(),
    signOut: vi.fn(),
    getSession: vi.fn().mockResolvedValue({ data: null, error: null }),
  },
  storage: {
    from: vi.fn(() => ({
      upload: vi
        .fn()
        .mockResolvedValue({
          data: { path: 'mock/path/to/image' },
          error: null,
        }),
      getPublicUrl: vi.fn(() => ({
        publicUrl: 'https://example.com/path/to/image',
      })),
    })),
  },
  from: vi.fn(() => ({
    select: vi.fn().mockResolvedValue({ data: [], error: null }),
    insert: vi.fn().mockResolvedValue({ data: [], error: null }),
    update: vi.fn().mockResolvedValue({ data: [], error: null }),
    delete: vi.fn().mockResolvedValue({ data: [], error: null }),
  })),
}))
