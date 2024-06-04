import { render, screen } from '@testing-library/react'
import { BasicSettingsTabsContent } from './BasicSettingsTabsContent'

describe('BasicSettingsTabsContent Component', () => {
  test('renders correctly', () => {
    render(<BasicSettingsTabsContent displayName="John Dou" bio="こんにちは" />)

    expect(screen.getByText('表示名')).toBeInTheDocument()

    expect(screen.getByText('自己紹介文')).toBeInTheDocument()
  })
})
