import { render, screen } from '@testing-library/react'
import { ServiceUrlSettingForm } from './ServiceUrlSettingForm'
import { zennUrlSettingFormSchema } from './schema'
// import userEvent from '@testing-library/user-event'

describe('ServiceUrlSettingForm Component', () => {
  test('renders form with initial values when userName exists'),
    () => {
      render(
        <ServiceUrlSettingForm
          service="Zenn"
          userNameKey="zennUserName"
          userName="john_doe"
          schema={zennUrlSettingFormSchema}
        />,
      )
      expect(screen.getByText('Zennのユーザー名')).toBeInTheDocument()
      expect(screen.getByText('john-doe')).toBeInTheDocument()
      expect(screen.getByText('変更する')).toBeInTheDocument()
      expect(screen.queryByText('キャンセル')).not.toBeInTheDocument()
      expect(screen.getByText('キャンセル')).toBeInTheDocument()
      expect(screen.queryByText('保存する')).not.toBeInTheDocument()
    }

  // test('allows editing the user name when userName exists', async() => {
  //   render(
  //     <ServiceUrlSettingForm
  //       service="Zenn"
  //       userNameKey="zennUserName"
  //       userName="john_doe"
  //       schema={zennUrlSettingFormSchema}
  //     />,
  //   )

  //   await userEvent.click(screen.getByText('変更する'))

  // })
})
