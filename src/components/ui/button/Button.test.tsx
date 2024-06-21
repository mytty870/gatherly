import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button Component', () => {
  test('renders correctly', () => {
    render(<Button>クリック</Button>)

    const button = screen.getByRole('button', { name: 'クリック' })

    expect(button).toBeInTheDocument()
  })

  test('applies the correct classes for variant, size, radius, and fullWidth props', () => {
    render(
      <Button variant="primary" size="lg" radius="lg" fullWidth={true}>
        クリック
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'クリック' })

    expect(button).toHaveClass(
      'bg-skyBlue',
      'px-4',
      'py-3',
      'rounded-lg',
      'w-full',
    )
  })

  test('renders with startContent and endContent props', () => {
    render(
      <Button
        startContent={<span>Start Content</span>}
        endContent={<span>End Content</span>}
      >
        クリック
      </Button>,
    )
    const startContent = screen.getByText('Start Content')
    const endContent = screen.getByText('End Content')

    expect(startContent).toBeInTheDocument()
    expect(endContent).toBeInTheDocument()
  })
})
