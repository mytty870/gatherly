import { render, screen } from '@testing-library/react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './Dialog'
import userEvent from '@testing-library/user-event'

describe('Dialog Component', () => {
  test('opens and closes the dialog', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    )

    const openButton = screen.getByText('Open Dialog')

    // トリガーボタンが存在することを確認
    expect(openButton).toBeInTheDocument()

    // ダイアログが開いていなければ、タイトルと説明が存在しないことを確認
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Dialog Description')).not.toBeInTheDocument()

    // // トリガーボタンをクリックしてダイアログを開く
    await userEvent.click(openButton)

    // ダイアログが開き、タイトルと説明が表示されていることを確認
    expect(screen.getByText('Dialog Title')).toBeInTheDocument()
    expect(screen.getByText('Dialog Description')).toBeInTheDocument()

    const closeButton = screen.getByRole('button')

    // ダイアログを閉じる
    await userEvent.click(closeButton)

    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
  })

  test('does not render close button when withCloseButton is false'),
    async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent withCloseButton={false}>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogContent>
        </Dialog>,
      )

      const openButton = screen.getByText('Open Dialog')

      // トリガーボタンをクリックしてダイアログを開く
      await userEvent.click(openButton)

      const closeButton = screen.queryByTestId('close-button')

      expect(closeButton).not.toBeInTheDocument()
    }
})
