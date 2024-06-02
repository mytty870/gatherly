import { render, screen } from '@testing-library/react'
import { DisplayNameForm } from './DisplayNameForm'
import { profileFixture } from '@/test/fixtures/profile'
import userEvent from '@testing-library/user-event'

describe('DisplayNameForm Component', () => {
  test('renders correctly', () => {
    render(<DisplayNameForm displayName={profileFixture.displayName} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '変更する' })).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'キャンセル' }),
    ).not.toBeInTheDocument()
  })

  test('become editable when edit button is clicked', async () => {
    render(<DisplayNameForm displayName={profileFixture.displayName} />)

    const editModeButton = screen.getByRole('button', { name: '変更する' })

    await userEvent.click(editModeButton)

    const input = screen.getByPlaceholderText('表示名を入力')

    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('John Doe')
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '変更する' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'キャンセル' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存する' })).toBeInTheDocument()
  })

  test('cancels eit mod when cancel button is clicked', async () => {
    render(<DisplayNameForm displayName={profileFixture.displayName} />)

    const editModeButton = screen.getByRole('button', { name: '変更する' })

    await userEvent.click(editModeButton)

    const cancelButton = screen.getByRole('button', { name: 'キャンセル' })
    await userEvent.click(cancelButton)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText('表示名を入力'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'キャンセル' }),
    ).not.toBeInTheDocument()
  })

  test('invalid input', async () => {
    render(<DisplayNameForm displayName={profileFixture.displayName} />)

    const changeButton = screen.getByRole('button', { name: '変更する' })
    await userEvent.click(changeButton)

    const input = screen.getByPlaceholderText('表示名を入力')
    await userEvent.clear(input)

    expect(screen.getByText('表示名を入力してください')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存する' })).toBeDisabled()

    await userEvent.type(input, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    expect(
      screen.getByText('表示名は25字以内にしてください'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存する' })).toBeDisabled()

    await userEvent.clear(input)
    await userEvent.type(input, '孫悟空')
    expect(
      screen.queryByText('表示名は25字以内にしてください'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('表示名を入力してください'),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存する' })).toBeEnabled()
  })
})
