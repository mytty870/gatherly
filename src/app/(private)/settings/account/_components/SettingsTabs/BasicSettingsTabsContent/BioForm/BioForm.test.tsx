import { render, screen } from '@testing-library/react'
import { BioForm } from './BioForm'
import { profileFixture } from '@/test/fixtures/profile'
import userEvent from '@testing-library/user-event'

describe('BioForm Component', () => {
  test('renders correctly', () => {
    render(<BioForm bio={profileFixture.bio} />)

    expect(
      screen.getByText('私の名前は johndoe です。gorigori 大学出身です。'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '変更する' })).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'キャンセル' }),
    ).not.toBeInTheDocument()
  })

  test('become editable when edit button is clicked', async () => {
    render(<BioForm bio={profileFixture.bio} />)

    const editButton = screen.getByRole('button', { name: '変更する' })

    await userEvent.click(editButton)

    const textarea = screen.getByPlaceholderText('自己紹介文を入力')

    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveValue(
      '私の名前は johndoe です。gorigori 大学出身です。',
    )

    expect(
      screen.getByRole('button', { name: 'キャンセル' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存する' })).toBeInTheDocument()
  })
})
