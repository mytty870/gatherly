import { Slider } from './Slider'
import { render, screen } from '@testing-library/react'

// RadixUI の Slider コンポーネントでは、内包的にResizeObserver を使用しているため、テストの際にはモックしておく必要がある
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver

describe('Slider Component', () => {
  test('renders correctly', () => {
    render(<Slider />)
    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
  })
})
