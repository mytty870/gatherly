import { UserRegistrationForm } from './UserRegistrationForm'

import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'page/welcome/_components/UserRegistrationForm',
  component: UserRegistrationForm,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof UserRegistrationForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <UserRegistrationForm />
    </div>
  ),
}
