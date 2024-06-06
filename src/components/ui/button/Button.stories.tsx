import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'ui/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Hover: Story = {
  render: () => (
    <>
      <div className="flex gap-3">
        <Button variant="primary" data-test="hover">
          primary
        </Button>
        <Button variant="basic" data-test="hover">
          basic
        </Button>
      </div>
    </>
  ),
}
