import { render, screen } from '@testing-library/react'
import { ServiceUrlSettingForm } from './ServiceUrlSettingForm'
import { zennUrlSettingFormSchema } from './schema'
import { userEvent } from '@testing-library/user-event'

describe('ServiceUrlSettingForm Component', () => {
  test('renders form with initial values when userName exists', () => {
    render(
      <ServiceUrlSettingForm
        service="Zenn"
        userNameKey="zennUserName"
        userName="john_doe"
        schema={zennUrlSettingFormSchema}
      />,
    )
    expect(screen.getByText('Zennのユーザー名')).toBeInTheDocument()

    expect(screen.getByText('john_doe')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: '変更する' })).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'キャンセル' }),
    ).not.toBeInTheDocument()

    expect(screen.queryByText('保存する')).not.toBeInTheDocument()

    expect(screen.queryByText('登録する')).not.toBeInTheDocument()
  })

  test('allows editing the user name when userName exists', async () => {
    const user = userEvent.setup()
    render(
      <ServiceUrlSettingForm
        service="Zenn"
        userNameKey="zennUserName"
        userName="john_doe"
        schema={zennUrlSettingFormSchema}
      />,
    )

    await user.click(screen.getByText('変更する'))

    const input = screen.getByPlaceholderText('Zennのユーザー名を入力')

    expect(input).toBeInTheDocument()

    expect(input).toHaveValue('john_doe')

    expect(
      screen.queryByRole('button', { name: '変更する' }),
    ).not.toBeInTheDocument()

    expect(screen.getByRole('button', { name: '保存する' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'キャンセル' }),
    ).toBeInTheDocument()
  })

  test('invalid input when userName exists', async () => {
    const user = userEvent.setup()
    render(
      <ServiceUrlSettingForm
        service="Zenn"
        userNameKey="zennUserName"
        userName="john_doe"
        schema={zennUrlSettingFormSchema}
      />,
    )

    await user.click(screen.getByText('変更する'))

    await user.clear(screen.getByPlaceholderText('Zennのユーザー名を入力'))

    expect(
      screen.getByPlaceholderText('Zennのユーザー名を入力'),
    ).not.toHaveValue('john-doe')

    expect(screen.getByText('ユーザー名は必須です')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存する' })).toBeDisabled()

    await user.type(
      screen.getByPlaceholderText('Zennのユーザー名を入力'),
      'Zennのユーザー名を15文字以上入力するぞーーーーーーーー',
    )

    expect(
      screen.getByText('Zennのユーザー名は15字以内のはずです'),
    ).toBeInTheDocument()

    await user.clear(screen.getByPlaceholderText('Zennのユーザー名を入力'))

    await user.type(
      screen.getByPlaceholderText('Zennのユーザー名を入力'),
      'samurai',
    )

    expect(screen.getByRole('button', { name: '保存する' })).not.toBeDisabled()
  })
})
