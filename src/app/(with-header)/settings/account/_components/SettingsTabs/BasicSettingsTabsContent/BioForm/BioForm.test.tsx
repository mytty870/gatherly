import { render, screen } from '@testing-library/react'
import { BioForm } from './BioForm'
import { profileFixture } from '@/test/fixtures/profile'
import userEvent from '@testing-library/user-event'

describe('BioForm Component', () => {
  test('renders correctly', () => {
    render(<BioForm bio={profileFixture.bio} />)

    expect(screen.getByText('Bio text')).toBeInTheDocument()
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
    expect(textarea).toHaveValue('Bio text')

    expect(
      screen.getByRole('button', { name: 'キャンセル' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存する' })).toBeInTheDocument()
  })

  it('should display an error message if the bio input exceeds 150 characters', async () => {
    const user = userEvent.setup()
    render(<BioForm bio={profileFixture.bio} />)
    await user.click(screen.getByText('変更する'))

    const textarea = screen.getByPlaceholderText('自己紹介文を入力')
    await user.clear(textarea)
    await user.type(textarea, 'a'.repeat(151))

    await user.click(screen.getByText('保存する'))

    expect(
      screen.getByText('自己紹介文は150字以内にしてください'),
    ).toBeInTheDocument()
  })
})
