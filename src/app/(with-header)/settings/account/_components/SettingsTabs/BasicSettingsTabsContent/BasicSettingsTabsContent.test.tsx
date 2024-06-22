import { render, screen } from '@testing-library/react'
import { BasicSettingsTabsContent } from './BasicSettingsTabsContent'
import { profileFixture } from '@/test/fixtures/profile'

describe('BasicSettingsTabsContent', () => {
  it('should render AvatarUploader, DisplayNameForm, and BioForm components with correct props', () => {
    render(
      <BasicSettingsTabsContent
        displayName={profileFixture.displayName}
        bio={profileFixture.bio}
        avatarUrl={profileFixture.avatarUrl}
      />,
    )

    const avatarImage = screen.getByAltText('Avatar Icon')
    expect(avatarImage.getAttribute('src')).toContain(
      encodeURIComponent(
        'https://storage.googleapis.com/zenn-user-upload/avatar/5d4555fc05.jpeg',
      ),
    )
    expect(screen.getByText('プロフィール画像を変更')).toBeInTheDocument()

    expect(screen.getByText('John Doe')).toBeInTheDocument()

    expect(screen.getByText('Bio text')).toBeInTheDocument()
  })
})
