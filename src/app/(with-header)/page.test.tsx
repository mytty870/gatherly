import { screen, render, waitFor } from '@testing-library/react'
import Home from './page'
import { Session } from 'next-auth'
import { redirect } from 'next/navigation'
import userEvent from '@testing-library/user-event'

let mockedSession: Session | null = null
describe('Home Page Component', () => {
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
    const user = userEvent.setup()

    const result = await Home()

    render(result)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Gatherly')

    const button = screen.getByRole('button', { name: 'はじめる' })
    expect(button).toBeInTheDocument()

    await user.click(button)

    await waitFor(() => {
      const button2 = screen.getByRole('button', {
        name: /Google アカウントでログイン/,
      })
      expect(button2).toBeInTheDocument()
    })
  })

  test('redirects to user page if session exists', async () => {
    mockedSession = {
      expires: 'expires',
      user: {
        id: '1',
        userName: 'mytty',
      },
    }

    const result = await Home()

    render(result)

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/mytty')
    })
  })
})
