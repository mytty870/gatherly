import { screen, render, waitFor } from '@testing-library/react'
import SignInPage from './page'
import { Session } from 'next-auth'
import { redirect } from 'next/navigation'

let mockedSession: Session | null = null
describe('Signin Page Component', () => {
  beforeEach(() => {
    vi.mock('@/lib/auth', () => ({
      getServerSession: vi.fn(() => Promise.resolve(mockedSession)),
    }))

    vi.mock('next/navigation', () => ({
      redirect: vi.fn(),
    }))
  })

  afterEach(() => {
    mockedSession = null
    vi.clearAllMocks()
  })

  test('renders correctly', async () => {
    const result = await SignInPage()

    render(result)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toHaveTextContent('Gatherly')
  })

  test('redirects to user page if session exists', async () => {
    mockedSession = {
      expires: 'expires',
      user: {
        id: '1',
        userName: 'mytty',
      },
    }

    const result = await SignInPage()

    render(result)

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/mytty')
    })
  })
})
