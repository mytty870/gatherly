import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading Component', () => {
  test('renders correctly', () => {
    render(<Heading>見出し</Heading>)

    const headingElement = screen.getByRole('heading', { name: '見出し' })

    expect(headingElement).toBeDefined()
  })

  test('renders with different heading levels', () => {
    render(<Heading level={2}>Heading Level 2</Heading>)

    expect(screen.getByText('Heading Level 2').nodeName).toBe('H2')
  })

  test('renders with different sizes', () => {
    render(<Heading size="sm">Heading Size SM</Heading>)

    expect(
      screen.getByText('Heading Size SM').classList.contains('text-sm'),
    ).toBe(true)
  })
})
