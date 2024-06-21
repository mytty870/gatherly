import { render, screen } from '@testing-library/react'
import NotFound from './not-found'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import userEvent from '@testing-library/user-event'

describe('Not Found Component', () => {
  test('renders correctly', () => {
    render(<NotFound />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toHaveTextContent('404')
  })

  test('redirects to home page when "ホームに戻る" button is clicked', async () => {
    const user = userEvent.setup()

    render(<NotFound />, { wrapper: MemoryRouterProvider })

    const button = screen.getByRole('button', { name: 'ホームに戻る' })

    await user.click(button)
    expect(mockRouter.asPath).toEqual('/')
  })
})
