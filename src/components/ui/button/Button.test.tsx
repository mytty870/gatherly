import { render } from '@testing-library/react'
import { Button } from './Button'
import { describe, test, expect } from 'vitest'

describe('Buttonの確認', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Button>クリック</Button>)

    expect(getByText('クリック')).toBeDefined()
  })

  test('renders with left icon', () => {
    const { getByText } = render(
      <Button startContent={<>icon</>}>クリック</Button>,
    )
    expect(getByText('icon')).toBeDefined()
  })
})
