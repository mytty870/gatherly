import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'ui/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Disabled: Story = {
  render: () => (
    <>
      <div className="flex gap-3">
        <Button variant="primary" disabled>
          primary
        </Button>
        <Button variant="basic" disabled>
          basic
        </Button>
      </div>
    </>
  ),
}
